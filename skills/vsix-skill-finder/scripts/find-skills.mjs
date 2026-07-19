#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DEFAULT_API_URL = 'https://vsix.cc/skills/api/v1/catalog.json';
const DEFAULT_TTL_MS = 10 * 60 * 1000;
const MAX_LIMIT = 20;

function usage() {
  console.log(`Usage: find-skills.mjs --query <text> [options]

Options:
  -q, --query <text>       Capability terms to search for
  -c, --category <name>    Restrict results to one catalog category
  -l, --limit <number>     Return 1-${MAX_LIMIT} results (default: 8)
      --refresh            Ignore a fresh cache and check the endpoint
  -h, --help               Show this help`);
}

function parseArgs(argv) {
  const options = { query: '', category: '', limit: 8, refresh: false };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '-h' || arg === '--help') return { ...options, help: true };
    if (arg === '--refresh') {
      options.refresh = true;
      continue;
    }
    const value = argv[index + 1];
    if (arg === '-q' || arg === '--query') options.query = value || '';
    else if (arg === '-c' || arg === '--category') options.category = value || '';
    else if (arg === '-l' || arg === '--limit') options.limit = Number(value);
    else throw new Error(`Unknown argument: ${arg}`);
    index += 1;
  }

  if (!options.query.trim() && !options.category.trim()) {
    throw new Error('Provide --query, --category, or both');
  }
  if (!Number.isInteger(options.limit) || options.limit < 1 || options.limit > MAX_LIMIT) {
    throw new Error(`--limit must be an integer from 1 to ${MAX_LIMIT}`);
  }
  return options;
}

function getCacheFile() {
  if (process.env.VSIX_SKILLS_CACHE_DIR) {
    return path.join(process.env.VSIX_SKILLS_CACHE_DIR, 'catalog-v1.json');
  }
  const root = process.platform === 'win32'
    ? process.env.LOCALAPPDATA || os.tmpdir()
    : process.env.XDG_CACHE_HOME || path.join(os.homedir(), '.cache');
  return path.join(root, 'vsix-skill-finder', 'catalog-v1.json');
}

function readCache(file) {
  try {
    const cache = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!cache.data || cache.data.schemaVersion !== 1) return null;
    return cache;
  } catch {
    return null;
  }
}

function writeCache(file, cache) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(cache)}\n`, { mode: 0o600 });
  if (process.platform === 'win32') fs.rmSync(file, { force: true });
  fs.renameSync(temporary, file);
}

async function fetchCatalog(apiUrl, cache, cacheFile, refresh) {
  const ttl = Number(process.env.VSIX_SKILLS_CACHE_TTL_MS) || DEFAULT_TTL_MS;
  if (!refresh && cache && Date.now() - cache.fetchedAt < ttl) {
    return { data: cache.data, source: 'fresh-cache', stale: false };
  }

  const headers = {
    Accept: 'application/json',
    'User-Agent': 'vsix-skill-finder/1',
  };
  if (cache?.etag) headers['If-None-Match'] = cache.etag;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(apiUrl, { headers, signal: controller.signal });
    if (response.status === 304 && cache) {
      const nextCache = { ...cache, fetchedAt: Date.now() };
      writeCache(cacheFile, nextCache);
      return { data: cache.data, source: 'validated-cache', stale: false };
    }
    if (!response.ok) throw new Error(`catalog request failed with HTTP ${response.status}`);

    const data = await response.json();
    validateCatalog(data);
    writeCache(cacheFile, {
      fetchedAt: Date.now(),
      etag: response.headers.get('etag') || '',
      data,
    });
    return { data, source: 'network', stale: false };
  } catch (error) {
    if (!cache) throw error;
    console.error(`Warning: ${error.message}; using stale cached catalog`);
    return { data: cache.data, source: 'stale-cache', stale: true };
  } finally {
    clearTimeout(timeout);
  }
}

function validateCatalog(data) {
  if (!data || data.schemaVersion !== 1 || !Array.isArray(data.skills)) {
    throw new Error('unsupported VSIX Skills catalog schema');
  }
  if (data.items !== undefined && !Array.isArray(data.items)) {
    throw new Error('invalid unified items array in VSIX Skills catalog');
  }
  for (const skill of data.items || data.skills) {
    const stringFields = [
      'id',
      'title',
      'descriptionZh',
      'category',
      'sourceUrl',
    ];
    if (!skill || stringFields.some((field) => typeof skill[field] !== 'string' || !skill[field])) {
      throw new Error('invalid capability entry in VSIX Skills catalog');
    }
    if (!skill.requirements?.user || !skill.requirements?.agent) {
      throw new Error('invalid capability requirements in VSIX Skills catalog');
    }
    const distribution = skill.distribution || (
      skill.packageUrl && skill.sha256Url && skill.sha256
        ? {
            kind: 'skill',
            packageUrl: skill.packageUrl,
            sha256Url: skill.sha256Url,
            sha256: skill.sha256,
            packageSize: skill.packageSize,
          }
        : null
    );
    if (distribution && !skill.distribution) skill.distribution = distribution;
    if (!distribution || !['skill', 'plugin'].includes(distribution.kind)) {
      throw new Error('invalid capability distribution in VSIX Skills catalog');
    }
    if (distribution.kind === 'skill') {
      for (const field of ['packageUrl', 'sha256Url', 'sha256']) {
        if (typeof distribution[field] !== 'string' || !distribution[field]) {
          throw new Error('invalid Skill integrity metadata in VSIX Skills catalog');
        }
      }
      if (!/^[a-f0-9]{64}$/i.test(distribution.sha256)) {
        throw new Error('invalid Skill SHA-256 in VSIX Skills catalog');
      }
    } else {
      for (const field of ['pluginId', 'qualifiedPluginId', 'marketplaceName', 'marketplaceUrl']) {
        if (typeof distribution[field] !== 'string' || !distribution[field]) {
          throw new Error('invalid plugin distribution metadata in VSIX Skills catalog');
        }
      }
      if (
        (typeof distribution.version !== 'string' || !distribution.version)
        && !(distribution.marketplaceManaged === true && distribution.versionPolicy === 'marketplace-current')
      ) {
        throw new Error('invalid plugin version metadata in VSIX Skills catalog');
      }
    }
  }
}

function normalize(value) {
  return String(value || '').normalize('NFKC').toLowerCase();
}

function tokenize(value) {
  const normalized = normalize(value);
  const tokens = new Set(normalized.split(/[^\p{L}\p{N}+#.-]+/u).filter(Boolean));
  if (typeof Intl.Segmenter === 'function') {
    const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' });
    for (const part of segmenter.segment(normalized)) {
      if (part.isWordLike && part.segment.length > 1) tokens.add(part.segment);
    }
  }
  return [...tokens];
}

function scoreSkill(skill, query, tokens) {
  const id = normalize(skill.id);
  const title = normalize(skill.title);
  const description = normalize(skill.descriptionZh);
  const category = normalize(skill.category);
  const fullQuery = normalize(query).trim();
  let score = skill.status === 'recommended' ? 1 : 0;

  if (fullQuery) {
    if (id === fullQuery || title === fullQuery) score += 100;
    else if (title.includes(fullQuery) || id.includes(fullQuery)) score += 28;
    if (description.includes(fullQuery)) score += 18;
    if (category === fullQuery) score += 16;
  }

  for (const token of tokens) {
    if (id.includes(token)) score += 10;
    if (title.includes(token)) score += 9;
    if (category.includes(token)) score += 6;
    if (description.includes(token)) score += 4;
  }
  return score;
}

function searchCatalog(data, options) {
  const category = normalize(options.category).trim();
  const tokens = tokenize(options.query);
  return (data.items || data.skills)
    .filter((skill) => skill.id !== 'vsix-skill-finder')
    .filter((skill) => !category || normalize(skill.category) === category)
    .map((skill) => ({ skill, score: scoreSkill(skill, options.query, tokens) }))
    .filter(({ score }) => !options.query.trim() || score > 1)
    .sort((left, right) => right.score - left.score || left.skill.title.localeCompare(right.skill.title, 'zh-Hans-CN'))
    .slice(0, options.limit)
    .map(({ skill, score }) => ({ matchScore: score, ...skill }));
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
    return;
  }

  const apiUrl = process.env.VSIX_SKILLS_API_URL || DEFAULT_API_URL;
  const cacheFile = getCacheFile();
  const cache = readCache(cacheFile);
  const catalog = await fetchCatalog(apiUrl, cache, cacheFile, options.refresh);
  const results = searchCatalog(catalog.data, options);
  console.log(JSON.stringify({
    schemaVersion: 1,
    query: options.query,
    category: options.category,
    catalogGeneratedAt: catalog.data.generatedAt,
    catalogSource: catalog.source,
    stale: catalog.stale,
    resultCount: results.length,
    results,
  }, null, 2));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`VSIX Skill Finder: ${error.message}`);
    process.exitCode = 1;
  });
}

export { searchCatalog, validateCatalog };
