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
  if (!trimmed) return '';
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
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

function readIndentedYamlField(content, field) {
  const match = content.match(new RegExp(`^\\s{2}${field}:\\s*(.*)$`, 'm'));
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
  if (!Array.isArray(manifest.prerequisites)) report(`${id}: prerequisites must be an array`);
}

function validateOpenAiMetadata(skillDir) {
  const id = path.basename(skillDir);
  const metadataPath = path.join(skillDir, 'agents', 'openai.yaml');
  if (!fs.existsSync(metadataPath)) return;

  const content = fs.readFileSync(metadataPath, 'utf8');
  if (!/^interface:\s*$/m.test(content)) {
    report(`${id}: agents/openai.yaml missing interface block`);
  }

  const displayName = readIndentedYamlField(content, 'display_name');
  const shortDescription = readIndentedYamlField(content, 'short_description');
  const defaultPrompt = readIndentedYamlField(content, 'default_prompt');
  const iconSmall = readIndentedYamlField(content, 'icon_small');
  const iconLarge = readIndentedYamlField(content, 'icon_large');
  const allowImplicitInvocation = readIndentedYamlField(content, 'allow_implicit_invocation');

  if (typeof displayName !== 'string' || !displayName.trim()) {
    report(`${id}: agents/openai.yaml display_name must be a non-empty string`);
  }
  if (typeof shortDescription !== 'string' || !shortDescription.trim()) {
    report(`${id}: agents/openai.yaml short_description must be a non-empty string`);
  }
  if (typeof defaultPrompt !== 'string' || !defaultPrompt.trim()) {
    report(`${id}: agents/openai.yaml default_prompt must be a non-empty string`);
  } else if (!defaultPrompt.includes(`$${id}`)) {
    report(`${id}: agents/openai.yaml default_prompt must mention $${id}`);
  }
  if (iconSmall !== null && (typeof iconSmall !== 'string' || !iconSmall.trim())) {
    report(`${id}: agents/openai.yaml icon_small must be a non-empty string when present`);
  }
  if (iconLarge !== null && (typeof iconLarge !== 'string' || !iconLarge.trim())) {
    report(`${id}: agents/openai.yaml icon_large must be a non-empty string when present`);
  }
  if (allowImplicitInvocation !== null && typeof allowImplicitInvocation !== 'boolean') {
    report(`${id}: agents/openai.yaml allow_implicit_invocation must be true or false when present`);
  }
}

function validateSkill(skillDir) {
  const id = path.basename(skillDir);
  assertNoForbiddenFiles(skillDir);

  if (!fs.existsSync(path.join(skillDir, 'SKILL.md'))) {
    report(`${id}: missing SKILL.md`);
  }

  const manifestPath = path.join(skillDir, 'skill.json');
  if (!fs.existsSync(manifestPath)) {
    report(`${id}: missing skill.json`);
    return;
  }

  validateManifest(skillDir, readJson(manifestPath));
  validateOpenAiMetadata(skillDir);
}

function main() {
  if (!fs.existsSync(skillsRoot)) {
    report(`Missing skills directory: ${skillsRoot}`);
  } else {
    const skillDirs = fs.readdirSync(skillsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
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
