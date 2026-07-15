import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const skillsRoot = path.join(repoRoot, 'skills');

const validTypes = new Set([
  'codex-skill',
  'agent-skill',
  'plugin-skill',
  'workflow-template',
]);

const validCategories = new Set([
  '写作与内容',
  '图片与视觉',
  '视频与动画',
  '文档与表格',
  '网页与前端',
  '部署与运维',
  'Cloudflare',
  '自动化与工作流',
  '知识库与模板',
  '开发辅助',
  '安全与验证',
  '其他',
]);

const validStatuses = new Set([
  'recommended',
  'experimental',
  'archived',
]);

const requiredFields = [
  'id',
  'title',
  'descriptionZh',
  'type',
  'category',
  'prerequisites',
  'sourceUrl',
];

const forbiddenNames = new Set([
  '.env',
  '.git',
  'node_modules',
  '.DS_Store',
]);

let errorCount = 0;

function report(message) {
  errorCount += 1;
  console.error(`ERROR: ${message}`);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    report(`Invalid JSON: ${file}\n${error.message}`);
    return null;
  }
}

function parseYamlScalar(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return null;
    }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replaceAll("''", "'");
  }
  return trimmed;
}

function readQuotedYamlField(content, field) {
  const match = content.match(new RegExp(`^\\s{2}${field}:\\s*(.+)$`, 'm'));
  if (!match) return null;
  return parseYamlScalar(match[1]);
}

function assertNoForbiddenFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (forbiddenNames.has(entry.name)) {
      report(`Forbidden file or directory: ${fullPath}`);
    }
    if (entry.isDirectory()) assertNoForbiddenFiles(fullPath);
  }
}

function validateManifest(skillDir, manifest) {
  const id = path.basename(skillDir);
  if (!manifest) return;

  for (const field of requiredFields) {
    if (!(field in manifest)) report(`${id}: missing required field "${field}"`);
  }

  if (manifest.id !== id) report(`${id}: manifest id must match folder name`);
  if (!validTypes.has(manifest.type)) report(`${id}: invalid type "${manifest.type}"`);
  if (!validCategories.has(manifest.category)) report(`${id}: invalid category "${manifest.category}"`);
  if (manifest.type !== 'codex-skill') report(`${id}: imported skills must use type "codex-skill"`);
  if (typeof manifest.title !== 'string' || !manifest.title.trim()) {
    report(`${id}: title must be a non-empty string`);
  }
  if (typeof manifest.descriptionZh !== 'string' || !manifest.descriptionZh.trim()) {
    report(`${id}: descriptionZh must be a non-empty string`);
  } else if (!/[\u3400-\u9fff]/u.test(manifest.descriptionZh)) {
    report(`${id}: descriptionZh must contain Chinese copy`);
  }
  if (!Array.isArray(manifest.prerequisites)) {
    report(`${id}: prerequisites must be an array`);
  } else if (manifest.prerequisites.some((item) => typeof item !== 'string' || !item.trim())) {
    report(`${id}: prerequisites entries must be non-empty strings`);
  }
  if (typeof manifest.sourceUrl !== 'string') {
    report(`${id}: sourceUrl must be a string`);
  } else {
    try {
      const sourceUrl = new URL(manifest.sourceUrl);
      if (sourceUrl.protocol !== 'https:') report(`${id}: sourceUrl must use HTTPS`);
    } catch {
      report(`${id}: sourceUrl must be a valid URL`);
    }
  }
  if ('status' in manifest && !validStatuses.has(manifest.status)) {
    report(`${id}: invalid status "${manifest.status}"`);
  }
  if ('updatedAt' in manifest && !/^\d{4}-\d{2}-\d{2}$/.test(manifest.updatedAt)) {
    report(`${id}: updatedAt must use YYYY-MM-DD`);
  }
}

function validateCodexSkill(skillDir) {
  const id = path.basename(skillDir);
  const skillPath = path.join(skillDir, 'SKILL.md');
  if (!fs.existsSync(skillPath)) {
    report(`${id}: missing SKILL.md`);
    return;
  }

  const content = fs.readFileSync(skillPath, 'utf8');
  const lineCount = content.split(/\r?\n/).length;
  if (lineCount > 500) report(`${id}: SKILL.md exceeds 500 lines (${lineCount})`);

  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    report(`${id}: invalid SKILL.md frontmatter`);
    return;
  }
  const frontmatter = frontmatterMatch[1];
  const keys = [...frontmatter.matchAll(/^([A-Za-z0-9_-]+):/gm)].map((match) => match[1]);
  const unexpected = keys.filter((key) => !['name', 'description'].includes(key));
  if (unexpected.length > 0) {
    report(`${id}: Codex frontmatter may only contain name and description; found ${unexpected.join(', ')}`);
  }
  if (!keys.includes('name')) report(`${id}: frontmatter missing name`);
  if (!keys.includes('description')) report(`${id}: frontmatter missing description`);

  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const name = nameMatch ? parseYamlScalar(nameMatch[1]) : null;
  if (name !== id) report(`${id}: frontmatter name must match folder name`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || id.length > 64) {
    report(`${id}: folder name must be valid Codex hyphen-case (max 64 characters)`);
  }

  const descriptionMatch = frontmatter.match(/^description:\s*(.*)$/m);
  if (!descriptionMatch || !descriptionMatch[1].trim()) {
    report(`${id}: frontmatter description must be non-empty`);
  } else if (/[<>]/.test(descriptionMatch[1])) {
    report(`${id}: frontmatter description cannot contain angle brackets`);
  }
}

function validateOpenAiMetadata(skillDir) {
  const id = path.basename(skillDir);
  const metadataPath = path.join(skillDir, 'agents', 'openai.yaml');
  if (!fs.existsSync(metadataPath)) {
    report(`${id}: missing agents/openai.yaml`);
    return;
  }
  const content = fs.readFileSync(metadataPath, 'utf8');
  if (!/^interface:\s*$/m.test(content)) report(`${id}: openai.yaml missing interface block`);

  const displayName = readQuotedYamlField(content, 'display_name');
  const shortDescription = readQuotedYamlField(content, 'short_description');
  const defaultPrompt = readQuotedYamlField(content, 'default_prompt');
  if (!displayName) report(`${id}: openai.yaml missing display_name`);
  if (!shortDescription || shortDescription.length < 25 || shortDescription.length > 64) {
    report(`${id}: openai.yaml short_description must be 25-64 characters`);
  }
  if (!defaultPrompt || !defaultPrompt.includes(`$${id}`)) {
    report(`${id}: openai.yaml default_prompt must mention $${id}`);
  }
}

function validateSkill(skillDir) {
  const id = path.basename(skillDir);
  assertNoForbiddenFiles(skillDir);
  validateCodexSkill(skillDir);
  validateOpenAiMetadata(skillDir);

  const manifestPath = path.join(skillDir, 'skill.json');
  if (!fs.existsSync(manifestPath)) {
    report(`${id}: missing skill.json`);
    return;
  }

  validateManifest(skillDir, readJson(manifestPath));
}

function main() {
  if (!fs.existsSync(skillsRoot)) {
    report(`Missing skills directory: ${skillsRoot}`);
  } else {
    const skillDirs = fs.readdirSync(skillsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(skillsRoot, entry.name))
      .sort((a, b) => path.basename(a).localeCompare(path.basename(b)));

    for (const skillDir of skillDirs) validateSkill(skillDir);

    console.log(`Checked ${skillDirs.length} skills`);
  }

  if (errorCount > 0) {
    console.error(`Validation failed with ${errorCount} error(s)`);
    process.exit(1);
  }

  console.log('Validation passed');
}

main();
