import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const skillsRoot = path.join(repoRoot, 'skills');
const pluginsRoot = path.join(repoRoot, 'plugins');
const pluginCatalogRoot = path.join(repoRoot, 'catalog', 'plugins');
const marketplacePath = path.join(repoRoot, '.agents', 'plugins', 'marketplace.json');
const validSkillId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const validSemver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
const validInstallPolicies = new Set(['NOT_AVAILABLE', 'AVAILABLE', 'INSTALLED_BY_DEFAULT']);
const validAuthPolicies = new Set(['ON_INSTALL', 'ON_USE']);
const pluginManifestFields = new Set([
  'id', 'name', 'version', 'description', 'skills', 'apps', 'mcpServers', 'interface',
  'author', 'homepage', 'repository', 'license', 'keywords',
]);
const pluginInterfaceFields = new Set([
  'displayName', 'shortDescription', 'longDescription', 'developerName', 'category',
  'capabilities', 'websiteURL', 'privacyPolicyURL', 'termsOfServiceURL', 'brandColor',
  'composerIcon', 'logo', 'logoDark', 'screenshots', 'defaultPrompt', 'default_prompt',
]);
const pluginCatalogFields = new Set([
  'id', 'title', 'descriptionZh', 'category', 'requirements', 'sourceUrl',
  'homepage', 'author', 'status', 'updatedAt', 'distribution',
]);
const externalPluginDistributionFields = new Set([
  'kind', 'pluginId', 'qualifiedPluginId', 'version', 'versionPolicy', 'marketplaceName',
  'marketplaceUrl', 'marketplaceManaged', 'marketplaceAliases',
]);
const validStatuses = new Set(['recommended', 'experimental', 'archived']);

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
    if (entry.isSymbolicLink()) {
      report(`Symbolic links are not allowed: ${fullPath}`);
      continue;
    }
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
  if ('prerequisites' in manifest) report(`${id}: use requirements instead of prerequisites`);
  if (!manifest.requirements || typeof manifest.requirements !== 'object' || Array.isArray(manifest.requirements)) {
    report(`${id}: requirements must be an object`);
  } else {
    for (const group of Object.keys(manifest.requirements)) {
      if (!['user', 'agent'].includes(group)) report(`${id}: unexpected requirements group "${group}"`);
    }
    for (const group of ['user', 'agent']) {
      if (!manifest.requirements[group] || typeof manifest.requirements[group] !== 'object' || Array.isArray(manifest.requirements[group])) {
        report(`${id}: requirements.${group} must be an object`);
      }
    }
    for (const [group, fields] of [['user', userRequirementFields], ['agent', agentRequirementFields]]) {
      if (!manifest.requirements[group] || typeof manifest.requirements[group] !== 'object') continue;
      for (const field of Object.keys(manifest.requirements[group])) {
        if (!fields.includes(field)) report(`${id}: unexpected requirements.${group} field "${field}"`);
      }
      for (const field of fields) {
        if (!(field in manifest.requirements[group])) report(`${id}: requirements.${group} missing field "${field}"`);
        if (!Array.isArray(manifest.requirements[group][field])) {
          report(`${id}: requirements.${group}.${field} must be an array`);
        } else if (manifest.requirements[group][field].some((item) => typeof item !== 'string' || !item.trim())) {
          report(`${id}: requirements.${group}.${field} must contain only non-empty strings`);
        }
      }
    }
  }
}

function validateOpenAiMetadata(skillDir, requireSkillReference = true) {
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
  if (defaultPrompt === null && !requireSkillReference) {
    // Plugin-level interface metadata may provide the default prompt for internal Skills.
  } else if (typeof defaultPrompt !== 'string' || !defaultPrompt.trim()) {
    report(`${id}: agents/openai.yaml default_prompt must be a non-empty string`);
  } else if (requireSkillReference && !defaultPrompt.includes(`$${id}`)) {
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
  if (!validSkillId.test(id)) report(`${id}: folder name must use lowercase kebab-case`);
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

function listDirectories(root) {
  if (!fs.existsSync(root)) return [];
  const entries = fs.readdirSync(root, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isSymbolicLink()) report(`Symbolic links are not allowed in ${root}: ${entry.name}`);
  }
  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
    .map((entry) => path.join(root, entry.name))
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b)));
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function rejectUnknownFields(value, allowed, label) {
  if (!isPlainObject(value)) return;
  for (const field of Object.keys(value)) {
    if (!allowed.has(field)) report(`${label}: unexpected field "${field}"`);
  }
}

function requireString(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    report(`${label} must be a non-empty string`);
    return null;
  }
  return value;
}

function validateStringArray(value, label, { maxItems, maxLength } = {}) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || !item.trim())) {
    report(`${label} must be an array of non-empty strings`);
    return;
  }
  if (maxItems !== undefined && value.length > maxItems) report(`${label} must contain at most ${maxItems} items`);
  if (maxLength !== undefined && value.some((item) => typeof item === 'string' && item.length > maxLength)) {
    report(`${label} items must be at most ${maxLength} characters`);
  }
}

function validateHttpsUrl(value, label) {
  if (value === undefined) return;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:' || !parsed.hostname || parsed.username || parsed.password) throw new Error();
  } catch {
    report(`${label} must be an absolute HTTPS URL without embedded credentials`);
  }
}

function validateCatalogRequirements(value, label) {
  if (!isPlainObject(value)) {
    report(`${label} must be an object`);
    return;
  }
  rejectUnknownFields(value, new Set(['user', 'agent']), label);
  for (const [group, fields] of [['user', userRequirementFields], ['agent', agentRequirementFields]]) {
    const groupValue = value[group];
    if (!isPlainObject(groupValue)) {
      report(`${label}.${group} must be an object`);
      continue;
    }
    rejectUnknownFields(groupValue, new Set(fields), `${label}.${group}`);
    for (const field of fields) {
      if (!(field in groupValue)) report(`${label}.${group} missing field "${field}"`);
      else validateStringArray(groupValue[field], `${label}.${group}.${field}`);
    }
  }
}

function validateExternalPluginDistribution(value, id, label) {
  if (!isPlainObject(value)) {
    report(`${label} must be an object`);
    return;
  }
  rejectUnknownFields(value, externalPluginDistributionFields, label);
  for (const field of ['kind', 'pluginId', 'qualifiedPluginId', 'marketplaceName', 'marketplaceUrl']) {
    requireString(value[field], `${label}.${field}`);
  }
  if (value.kind !== 'plugin') report(`${label}.kind must be "plugin"`);
  if (value.pluginId !== id) report(`${label}.pluginId must match catalog id`);
  if (value.qualifiedPluginId !== `${id}@${value.marketplaceName}`) {
    report(`${label}.qualifiedPluginId must match pluginId@marketplaceName`);
  }
  if (value.version !== undefined && (typeof value.version !== 'string' || !validSemver.test(value.version))) {
    report(`${label}.version must use semantic versioning when present`);
  }
  if (value.versionPolicy !== undefined && value.versionPolicy !== 'marketplace-current') {
    report(`${label}.versionPolicy must be "marketplace-current" when present`);
  }
  if (value.version === undefined && !(value.marketplaceManaged === true && value.versionPolicy === 'marketplace-current')) {
    report(`${label} requires a semantic version or a managed marketplace-current policy`);
  }
  validateHttpsUrl(value.marketplaceUrl, `${label}.marketplaceUrl`);
  if (value.marketplaceManaged !== undefined && typeof value.marketplaceManaged !== 'boolean') {
    report(`${label}.marketplaceManaged must be true or false when present`);
  }
  if (value.marketplaceAliases !== undefined) {
    validateStringArray(value.marketplaceAliases, `${label}.marketplaceAliases`);
    if (value.marketplaceAliases.includes(value.marketplaceName)) {
      report(`${label}.marketplaceAliases must not repeat marketplaceName`);
    }
  }
}

function resolvePluginPath(pluginDir, value, label, expectedType = 'any') {
  if (typeof value !== 'string' || !value.startsWith('./')) {
    report(`${label} must be a relative path beginning with "./"`);
    return null;
  }
  const normalized = path.posix.normalize(value);
  if (normalized === '..' || normalized.startsWith('../') || path.posix.isAbsolute(normalized)) {
    report(`${label} must stay inside the plugin directory`);
    return null;
  }
  const resolved = path.resolve(pluginDir, normalized);
  if (resolved !== pluginDir && !resolved.startsWith(`${pluginDir}${path.sep}`)) {
    report(`${label} resolves outside the plugin directory`);
    return null;
  }
  if (!fs.existsSync(resolved)) {
    report(`${label} does not exist: ${value}`);
    return null;
  }
  if (expectedType === 'file' && !fs.statSync(resolved).isFile()) report(`${label} must point to a file`);
  if (expectedType === 'directory' && !fs.statSync(resolved).isDirectory()) report(`${label} must point to a directory`);
  return resolved;
}

function validatePluginInterface(pluginDir, value, id) {
  if (!isPlainObject(value)) {
    report(`${id}: plugin interface must be an object`);
    return;
  }
  rejectUnknownFields(value, pluginInterfaceFields, `${id}: plugin interface`);
  for (const field of ['displayName', 'shortDescription', 'longDescription', 'developerName', 'category']) {
    requireString(value[field], `${id}: plugin interface.${field}`);
  }
  validateStringArray(value.capabilities, `${id}: plugin interface.capabilities`);
  if ('defaultPrompt' in value) {
    validateStringArray(value.defaultPrompt, `${id}: plugin interface.defaultPrompt`, { maxItems: 3, maxLength: 128 });
  }
  else if ('default_prompt' in value) requireString(value.default_prompt, `${id}: plugin interface.default_prompt`);
  else report(`${id}: plugin interface requires defaultPrompt or default_prompt`);
  for (const field of ['websiteURL', 'privacyPolicyURL', 'termsOfServiceURL']) {
    validateHttpsUrl(value[field], `${id}: plugin interface.${field}`);
  }
  if (value.brandColor !== undefined && (typeof value.brandColor !== 'string' || !/^#[0-9A-F]{6}$/i.test(value.brandColor))) {
    report(`${id}: plugin interface.brandColor must use #RRGGBB`);
  }
  for (const field of ['composerIcon', 'logo', 'logoDark']) {
    if (value[field] !== undefined) resolvePluginPath(pluginDir, value[field], `${id}: plugin interface.${field}`, 'file');
  }
  if (value.screenshots !== undefined) {
    validateStringArray(value.screenshots, `${id}: plugin interface.screenshots`);
    if (Array.isArray(value.screenshots)) {
      for (const [index, screenshot] of value.screenshots.entries()) {
        if (typeof screenshot === 'string' && !screenshot.toLowerCase().endsWith('.png')) {
          report(`${id}: plugin interface.screenshots[${index}] must be a PNG file`);
        }
        if (typeof screenshot === 'string') resolvePluginPath(pluginDir, screenshot, `${id}: plugin interface.screenshots[${index}]`, 'file');
      }
    }
  }
}

function validatePlugin(pluginDir) {
  const id = path.basename(pluginDir);
  if (!validSkillId.test(id)) report(`${id}: plugin folder name must use lowercase kebab-case`);
  assertNoForbiddenFiles(pluginDir);

  const manifestPath = path.join(pluginDir, '.codex-plugin', 'plugin.json');
  if (!fs.existsSync(manifestPath)) {
    report(`${id}: missing .codex-plugin/plugin.json`);
    return;
  }
  const manifest = readJson(manifestPath);
  if (!manifest) return;
  rejectUnknownFields(manifest, pluginManifestFields, `${id}: plugin manifest`);
  if (manifest.name !== id) report(`${id}: plugin manifest name must match folder name`);
  if (manifest.id !== undefined && manifest.id !== id) report(`${id}: plugin manifest id must match folder name when present`);
  if (typeof manifest.version !== 'string' || !validSemver.test(manifest.version)) {
    report(`${id}: plugin manifest version must use semantic versioning`);
  }
  requireString(manifest.description, `${id}: plugin manifest description`);
  if (!isPlainObject(manifest.author)) report(`${id}: plugin manifest author must be an object`);
  else {
    rejectUnknownFields(manifest.author, new Set(['name', 'email', 'url']), `${id}: plugin manifest author`);
    requireString(manifest.author.name, `${id}: plugin manifest author.name`);
    if (manifest.author.email !== undefined) requireString(manifest.author.email, `${id}: plugin manifest author.email`);
    validateHttpsUrl(manifest.author.url, `${id}: plugin manifest author.url`);
  }
  validateHttpsUrl(manifest.homepage, `${id}: plugin manifest homepage`);
  validateHttpsUrl(manifest.repository, `${id}: plugin manifest repository`);
  if (manifest.keywords !== undefined) validateStringArray(manifest.keywords, `${id}: plugin manifest keywords`);
  if (manifest.license !== undefined) requireString(manifest.license, `${id}: plugin manifest license`);
  if (!fs.existsSync(path.join(pluginDir, 'LICENSE'))) report(`${id}: plugin package must include LICENSE`);
  if (manifest.skills !== './skills/') report(`${id}: plugin manifest skills must be "./skills/"`);
  else resolvePluginPath(pluginDir, manifest.skills, `${id}: plugin manifest skills`, 'directory');
  if (manifest.apps !== undefined) resolvePluginPath(pluginDir, manifest.apps, `${id}: plugin manifest apps`, 'file');
  if (typeof manifest.mcpServers === 'string') {
    resolvePluginPath(pluginDir, manifest.mcpServers, `${id}: plugin manifest mcpServers`, 'file');
  } else if (manifest.mcpServers !== undefined && !isPlainObject(manifest.mcpServers)) {
    report(`${id}: plugin manifest mcpServers must be a path or object`);
  }
  validatePluginInterface(pluginDir, manifest.interface, id);

  const internalSkillsRoot = path.join(pluginDir, 'skills');
  const internalSkills = listDirectories(internalSkillsRoot);
  if (internalSkills.length === 0) report(`${id}: plugin must contain at least one internal skill`);
  for (const skillDir of internalSkills) {
    const skillId = path.basename(skillDir);
    if (!validSkillId.test(skillId)) report(`${id}/${skillId}: internal skill name must use lowercase kebab-case`);
    if (!fs.existsSync(path.join(skillDir, 'SKILL.md'))) report(`${id}/${skillId}: missing SKILL.md`);
    validateOpenAiMetadata(skillDir, false);
  }
}

function validateMarketplace(pluginDirs) {
  const marketplace = readJson(marketplacePath);
  if (!marketplace) return;
  if (typeof marketplace.name !== 'string' || !marketplace.name.trim()) {
    report('marketplace.json name must be a non-empty string');
  }
  rejectUnknownFields(marketplace, new Set(['name', 'interface', 'plugins']), 'marketplace.json');
  if (!isPlainObject(marketplace.interface)) report('marketplace.json interface must be an object');
  else {
    rejectUnknownFields(marketplace.interface, new Set(['displayName']), 'marketplace.json interface');
    requireString(marketplace.interface.displayName, 'marketplace.json interface.displayName');
  }
  if (!Array.isArray(marketplace.plugins)) {
    report('marketplace.json plugins must be an array');
    return;
  }

  const entries = new Map();
  for (const entry of marketplace.plugins) {
    if (!entry || typeof entry.name !== 'string' || !entry.name.trim()) {
      report('marketplace.json plugin entries must have a non-empty name');
      continue;
    }
    if (entries.has(entry.name)) report(`${entry.name}: duplicate marketplace entry`);
    rejectUnknownFields(entry, new Set(['name', 'source', 'policy', 'category']), `${entry.name}: marketplace entry`);
    if (!validSkillId.test(entry.name)) report(`${entry.name}: marketplace plugin name must use lowercase kebab-case`);
    requireString(entry.category, `${entry.name}: marketplace category`);
    if (!isPlainObject(entry.source)) report(`${entry.name}: marketplace source must be an object`);
    else rejectUnknownFields(entry.source, new Set(['source', 'path']), `${entry.name}: marketplace source`);
    if (!isPlainObject(entry.policy)) report(`${entry.name}: marketplace policy must be an object`);
    else {
      rejectUnknownFields(entry.policy, new Set(['installation', 'authentication', 'products']), `${entry.name}: marketplace policy`);
      if (!validInstallPolicies.has(entry.policy.installation)) report(`${entry.name}: invalid installation policy`);
      if (!validAuthPolicies.has(entry.policy.authentication)) report(`${entry.name}: invalid authentication policy`);
      if (entry.policy.products !== undefined) validateStringArray(entry.policy.products, `${entry.name}: marketplace policy.products`);
    }
    entries.set(entry.name, entry);
  }

  const pluginIds = new Set(pluginDirs.map((dir) => path.basename(dir)));
  for (const pluginId of pluginIds) {
    const entry = entries.get(pluginId);
    if (!entry) {
      report(`${pluginId}: missing marketplace entry`);
      continue;
    }
    if (entry.source?.source !== 'local' || entry.source?.path !== `./plugins/${pluginId}`) {
      report(`${pluginId}: marketplace source must point to ./plugins/${pluginId}`);
    }
  }
  for (const entryName of entries.keys()) {
    if (!pluginIds.has(entryName)) report(`${entryName}: marketplace entry has no matching plugin directory`);
  }
}

function validatePluginCatalog(pluginDirs) {
  const pluginIds = new Set(pluginDirs.map((dir) => path.basename(dir)));
  if (!fs.existsSync(pluginCatalogRoot)) {
    if (pluginIds.size > 0) report(`Missing plugin catalog directory: ${pluginCatalogRoot}`);
    return new Set();
  }

  const catalogIds = new Set();
  const externalIds = new Set();
  for (const entry of fs.readdirSync(pluginCatalogRoot, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) {
      report(`Symbolic links are not allowed in plugin catalog: ${entry.name}`);
      continue;
    }
    if (!entry.isFile() || !entry.name.endsWith('.json')) {
      report(`Unexpected plugin catalog entry: ${entry.name}`);
      continue;
    }

    const id = entry.name.slice(0, -'.json'.length);
    catalogIds.add(id);
    const manifest = readJson(path.join(pluginCatalogRoot, entry.name));
    if (!manifest) continue;
    rejectUnknownFields(manifest, pluginCatalogFields, `${id}: plugin catalog`);
    for (const field of ['id', 'title', 'descriptionZh', 'category', 'sourceUrl']) {
      requireString(manifest[field], `${id}: plugin catalog.${field}`);
    }
    if (manifest.id !== id) report(`${id}: plugin catalog id must match filename`);
    if (!validSkillId.test(id)) report(`${id}: plugin catalog filename must use lowercase kebab-case`);
    if (!validCategories.has(manifest.category)) report(`${id}: invalid plugin catalog category "${manifest.category}"`);
    validateCatalogRequirements(manifest.requirements, `${id}: plugin catalog.requirements`);
    validateHttpsUrl(manifest.sourceUrl, `${id}: plugin catalog.sourceUrl`);
    validateHttpsUrl(manifest.homepage, `${id}: plugin catalog.homepage`);
    if (manifest.author !== undefined) requireString(manifest.author, `${id}: plugin catalog.author`);
    if (manifest.status !== undefined && !validStatuses.has(manifest.status)) {
      report(`${id}: invalid plugin catalog status "${manifest.status}"`);
    }
    if (manifest.updatedAt !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(manifest.updatedAt)) {
      report(`${id}: plugin catalog.updatedAt must use YYYY-MM-DD`);
    }
    if (manifest.distribution !== undefined) {
      if (pluginIds.has(id)) report(`${id}: hosted plugin catalog must not define distribution manually`);
      else {
        validateExternalPluginDistribution(manifest.distribution, id, `${id}: plugin catalog.distribution`);
        externalIds.add(id);
      }
    }
  }

  for (const pluginId of pluginIds) {
    if (!catalogIds.has(pluginId)) report(`${pluginId}: missing catalog/plugins/${pluginId}.json`);
  }
  for (const catalogId of catalogIds) {
    if (!pluginIds.has(catalogId) && !externalIds.has(catalogId)) {
      report(`${catalogId}: plugin catalog has no matching plugin directory or external distribution`);
    }
  }
  return catalogIds;
}

function main() {
  let checkedSkills = 0;
  if (!fs.existsSync(skillsRoot)) {
    report(`Missing skills directory: ${skillsRoot}`);
  } else {
    const entries = fs.readdirSync(skillsRoot, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isSymbolicLink()) report(`Symbolic links are not allowed in skills root: ${entry.name}`);
    }
    const skillDirs = listDirectories(skillsRoot);

    for (const skillDir of skillDirs) validateSkill(skillDir);
    checkedSkills = skillDirs.length;
  }

  if (fs.existsSync(pluginsRoot)) {
    for (const entry of fs.readdirSync(pluginsRoot, { withFileTypes: true })) {
      if (!entry.isDirectory() && !entry.isSymbolicLink() && entry.name !== '.gitkeep') {
        report(`Unexpected file in plugins root: ${entry.name}`);
      }
    }
  }
  const pluginDirs = listDirectories(pluginsRoot);
  for (const pluginDir of pluginDirs) validatePlugin(pluginDir);
  validateMarketplace(pluginDirs);
  const pluginCatalogIds = validatePluginCatalog(pluginDirs);

  const skillIds = new Set(listDirectories(skillsRoot).map((dir) => path.basename(dir)));
  for (const pluginId of pluginCatalogIds) {
    if (skillIds.has(pluginId)) report(`${pluginId}: Skill and plugin ids must be unique across the catalog`);
  }

  console.log(`Checked ${checkedSkills} skills and ${pluginDirs.length} plugins`);

  if (errorCount > 0) {
    console.error(`Validation failed with ${errorCount} error(s)`);
    process.exit(1);
  }

  console.log('Validation passed');
}

main();
