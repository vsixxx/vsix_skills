import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const repositoryRoot = path.resolve(import.meta.dirname, '..');
const defaultSkillsRoot = path.join(repositoryRoot, 'skills');
const skillsRoot = path.resolve(process.env.SKILLS_SOURCE || defaultSkillsRoot);
const defaultOutputRoot = path.resolve(repositoryRoot, '../vsix_skills_site/public');
const publicRoot = path.resolve(process.env.SKILLS_OUTPUT_ROOT || defaultOutputRoot);
const catalogDir = path.join(publicRoot, 'catalog');
const packagesDir = path.join(publicRoot, 'packages');
const finderApiDir = path.join(publicRoot, 'api', 'v1');
const validateOnly = process.argv.includes('--validate-only');
const publicBasePath = `/${(process.env.SKILLS_PUBLIC_BASE || 'skills').replace(/^\/+|\/+$/g, '')}`;
const publicOrigin = (process.env.SKILLS_PUBLIC_ORIGIN || 'https://vsix.cc').replace(/\/+$/g, '');

const validTypes = new Set([
  'codex-skill',
  'agent-skill',
  'plugin-skill',
  'workflow-template',
]);

const validCategories = new Set([
  '内容创作',
  '图片与设计',
  '视频与音频',
  '办公与文档',
  '研究与知识',
  '商业与金融',
  '网页与前端',
  '开发与代码',
  '自动化与工作流',
  '部署与运维',
  '测试与安全',
  'Cloudflare',
  '其他',
]);

const requiredFields = [
  'id',
  'title',
  'descriptionZh',
  'type',
  'category',
  'requirements',
  'sourceUrl',
];

const userRequirementFields = [
  'systems',
  'software',
  'auth',
  'services',
  'hardware',
  'resources',
  'notes',
];

const agentRequirementFields = [
  'tools',
  'packages',
];

const forbiddenNames = new Set([
  '.env',
  '.git',
  'node_modules',
  '.DS_Store',
]);

function fail(message) {
  throw new Error(message);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(`Invalid JSON: ${file}\n${error.message}`);
  }
}

function assertNoForbiddenFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (forbiddenNames.has(entry.name)) {
      fail(`Forbidden file or directory: ${fullPath}`);
    }
    if (entry.isDirectory()) assertNoForbiddenFiles(fullPath);
  }
}

function validateManifest(skillDir, manifest) {
  const id = path.basename(skillDir);
  for (const field of requiredFields) {
    if (!(field in manifest)) fail(`${id}: missing required field "${field}"`);
  }
  if (manifest.id !== id) fail(`${id}: manifest id must match folder name`);
  if (!validTypes.has(manifest.type)) fail(`${id}: invalid type "${manifest.type}"`);
  if (!validCategories.has(manifest.category)) fail(`${id}: invalid category "${manifest.category}"`);
  if ('prerequisites' in manifest) fail(`${id}: use requirements instead of prerequisites`);
  if (!manifest.requirements || typeof manifest.requirements !== 'object' || Array.isArray(manifest.requirements)) {
    fail(`${id}: requirements must be an object`);
  }
  for (const group of Object.keys(manifest.requirements)) {
    if (!['user', 'agent'].includes(group)) fail(`${id}: unexpected requirements group "${group}"`);
  }
  for (const group of ['user', 'agent']) {
    if (!manifest.requirements[group] || typeof manifest.requirements[group] !== 'object' || Array.isArray(manifest.requirements[group])) {
      fail(`${id}: requirements.${group} must be an object`);
    }
  }
  for (const [group, fields] of [['user', userRequirementFields], ['agent', agentRequirementFields]]) {
    for (const field of Object.keys(manifest.requirements[group])) {
      if (!fields.includes(field)) fail(`${id}: unexpected requirements.${group} field "${field}"`);
    }
    for (const field of fields) {
      if (!(field in manifest.requirements[group])) fail(`${id}: requirements.${group} missing field "${field}"`);
      if (!Array.isArray(manifest.requirements[group][field])) {
        fail(`${id}: requirements.${group}.${field} must be an array`);
      }
      if (manifest.requirements[group][field].some((item) => typeof item !== 'string' || !item.trim())) {
        fail(`${id}: requirements.${group}.${field} must contain only non-empty strings`);
      }
    }
  }
  if (!fs.existsSync(path.join(skillDir, 'SKILL.md'))) fail(`${id}: missing SKILL.md`);
}

function packageSkill(skillDir, id) {
  const packagePath = path.join(packagesDir, `${id}.zip`);
  const zipResult = spawnSync('zip', ['-qr', packagePath, id], {
    cwd: path.dirname(skillDir),
    stdio: 'pipe',
    encoding: 'utf8',
  });
  if (zipResult.status !== 0) {
    fail(`zip failed for ${id}: ${zipResult.stderr || zipResult.stdout}`);
  }

  const data = fs.readFileSync(packagePath);
  const sha256 = crypto.createHash('sha256').update(data).digest('hex');
  fs.writeFileSync(path.join(packagesDir, `${id}.sha256`), `${sha256}  ${id}.zip\n`);
  const cacheKey = sha256.slice(0, 12);
  return {
    packageUrl: `${publicBasePath}/packages/${id}.zip?v=${cacheKey}`,
    sha256Url: `${publicBasePath}/packages/${id}.sha256?v=${cacheKey}`,
    sha256,
    packageSize: data.length,
  };
}

function listSkillDirs() {
  if (!fs.existsSync(skillsRoot)) fail(`Skills source not found: ${skillsRoot}`);
  return fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(skillsRoot, entry.name))
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b)));
}

function main() {
  const skillDirs = listSkillDirs();
  const catalog = [];

  if (!validateOnly) {
    fs.rmSync(catalogDir, { recursive: true, force: true });
    fs.rmSync(packagesDir, { recursive: true, force: true });
    fs.rmSync(finderApiDir, { recursive: true, force: true });
    fs.mkdirSync(catalogDir, { recursive: true });
    fs.mkdirSync(packagesDir, { recursive: true });
    fs.mkdirSync(finderApiDir, { recursive: true });
  }

  for (const skillDir of skillDirs) {
    const id = path.basename(skillDir);
    assertNoForbiddenFiles(skillDir);
    const manifestPath = path.join(skillDir, 'skill.json');
    if (!fs.existsSync(manifestPath)) fail(`${id}: missing skill.json`);
    const manifest = readJson(manifestPath);
    validateManifest(skillDir, manifest);

    const packageMeta = validateOnly ? {} : packageSkill(skillDir, id);
    catalog.push({
      ...manifest,
      ...packageMeta,
    });
  }

  catalog.sort((a, b) => a.title.localeCompare(b.title, 'zh-Hans-CN'));

  if (!validateOnly) {
    const generatedAt = new Date().toISOString();
    fs.writeFileSync(
      path.join(catalogDir, 'skills.json'),
      `${JSON.stringify({
        generatedAt,
        count: catalog.length,
        skills: catalog,
      }, null, 2)}\n`,
    );

    const finderSkills = catalog.map((skill) => ({
      id: skill.id,
      title: skill.title,
      descriptionZh: skill.descriptionZh,
      type: skill.type,
      category: skill.category,
      status: skill.status,
      sourceUrl: skill.sourceUrl,
      requirements: skill.requirements,
      packageUrl: `${publicOrigin}${skill.packageUrl}`,
      sha256Url: `${publicOrigin}${skill.sha256Url}`,
      sha256: skill.sha256,
      packageSize: skill.packageSize,
    }));

    fs.writeFileSync(
      path.join(finderApiDir, 'catalog.json'),
      `${JSON.stringify({
        schemaVersion: 1,
        generatedAt,
        count: finderSkills.length,
        categories: [...validCategories],
        skills: finderSkills,
      })}\n`,
    );
  }

  console.log(`${validateOnly ? 'Validated' : 'Synced'} ${catalog.length} skills`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
