import assert from 'node:assert/strict';
import test from 'node:test';

import {
  searchCatalog,
  validateCatalog,
} from '../../skills/vsix-skill-finder/scripts/find-skills.mjs';

function requirements() {
  return {
    user: {
      systems: [], software: [], auth: [], services: [], hardware: [], resources: [], notes: [],
    },
    agent: { tools: [], packages: [] },
  };
}

test('searches unified Skill and plugin entries together', () => {
  const catalog = {
    schemaVersion: 1,
    skills: [],
    items: [
      {
        id: 'sample-skill',
        title: 'Sample Skill',
        descriptionZh: '处理普通代码任务。',
        category: '开发与代码',
        sourceUrl: 'https://example.com/skill',
        requirements: requirements(),
        distribution: {
          kind: 'skill',
          packageUrl: 'https://example.com/skill.zip',
          sha256Url: 'https://example.com/skill.sha256',
          sha256: 'a'.repeat(64),
        },
      },
      {
        id: 'product-design',
        title: 'Product Design',
        descriptionZh: '探索产品方向并构建交互原型。',
        category: '图片与设计',
        sourceUrl: 'https://example.com/plugin',
        requirements: requirements(),
        distribution: {
          kind: 'plugin',
          pluginId: 'product-design',
          qualifiedPluginId: 'product-design@vsix-skills',
          version: '1.0.0',
          marketplaceName: 'vsix-skills',
          marketplaceUrl: 'https://vsix.cc/marketplace/vsix-skills.git',
        },
      },
    ],
  };

  validateCatalog(catalog);
  const results = searchCatalog(catalog, { query: '产品 原型', category: '', limit: 5 });
  assert.equal(results[0].id, 'product-design');
  assert.equal(results[0].distribution.kind, 'plugin');
});

test('normalizes legacy Skill entries without distribution metadata', () => {
  const catalog = {
    schemaVersion: 1,
    skills: [{
      id: 'legacy-skill',
      title: 'Legacy Skill',
      descriptionZh: '旧版目录技能。',
      category: '其他',
      sourceUrl: 'https://example.com/legacy',
      requirements: requirements(),
      packageUrl: 'https://example.com/legacy.zip',
      sha256Url: 'https://example.com/legacy.sha256',
      sha256: 'b'.repeat(64),
      packageSize: 10,
    }],
  };

  validateCatalog(catalog);
  assert.equal(catalog.skills[0].distribution.kind, 'skill');
});

test('accepts a managed official plugin that tracks the Marketplace current version', () => {
  const catalog = {
    schemaVersion: 1,
    skills: [],
    items: [{
      id: 'figma',
      title: 'Figma',
      descriptionZh: '使用官方 Figma 工作流。',
      category: '图片与设计',
      sourceUrl: 'https://github.com/openai/plugins/tree/main/plugins/figma',
      requirements: requirements(),
      distribution: {
        kind: 'plugin',
        pluginId: 'figma',
        qualifiedPluginId: 'figma@openai-curated',
        versionPolicy: 'marketplace-current',
        marketplaceName: 'openai-curated',
        marketplaceAliases: ['openai-api-curated'],
        marketplaceUrl: 'https://github.com/openai/plugins.git',
        marketplaceManaged: true,
      },
    }],
  };

  validateCatalog(catalog);
  const [result] = searchCatalog(catalog, { query: 'Figma', category: '', limit: 1 });
  assert.equal(result.distribution.versionPolicy, 'marketplace-current');
  assert.deepEqual(result.distribution.marketplaceAliases, ['openai-api-curated']);
});
