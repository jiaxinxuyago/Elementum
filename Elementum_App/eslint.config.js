import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // House pattern: token/context/icon modules deliberately export
      // components alongside constants and hooks (tokens.jsx, chartContext,
      // Icon.jsx, …). That trades per-file fast-refresh purity for
      // single-source-of-truth files — an accepted cost. allowConstantExport
      // covers the constant cases; allowExportNames can't enumerate ~60
      // mixed exports, so the rule is a warning (visible, non-blocking)
      // rather than an error. DEV_03_Code_Review_Standards §4-A1's hard 0-errors
      // gate is carried by everything else, above all no-restricted-imports.
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  // Node-side files (vite config, dev/QA tooling, workers) run outside the
  // browser — give them node globals so `process` etc. lint cleanly.
  {
    files: ['vite.config.js', 'tools/**/*.{js,mjs}', 'workers/**/*.js', 'showcase/**/*.mjs', '*.mjs'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  // ───────────────────────────────────────────────────────────────────────────
  // Module-boundary enforcement (architecture restructuring, 2026-07).
  // Cross-chunk imports MUST go through the chunk barrel (engine/index.js,
  // content/index.js, contract/index.js, content/reading/index.js), never a
  // deep source file. Same-folder sibling imports use './file.js' (no chunk
  // segment in the specifier) and are intentionally NOT matched here.
  // ───────────────────────────────────────────────────────────────────────────
  {
    files: ['src/**/*.{js,jsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: [
              // engine — import from engine/index.js
              '**/engine/calculator.js', '**/engine/buildEnergyChart.js',
              '**/engine/compatibility.js', '**/engine/dominanceWheel.js',
              '**/engine/energyRoles.js', '**/engine/temporal.js',
              // content root — import from content/index.js
              '**/content/archetypeSource.js', '**/content/resolveVariant.js',
              '**/content/tgNames.js', '**/content/dailyGuidance.js',
              '**/content/archetypeCoverage.js', '**/content/stemVariants.js',
              // contract — import from contract/index.js
              '**/contract/archetypeSchema.js',
              // reading copy — import from content/reading/index.js
              '**/content/reading/surfaceContent.js',
              '**/content/reading/facesContent.js',
              '**/content/reading/readingContent.js',
              // infra — import from infra/index.js
              '**/infra/endpoints.js', '**/infra/links.js',
            ],
            message:
              'Cross-chunk deep import. Import from the chunk barrel instead ' +
              '(engine/index.js, content/index.js, contract/index.js, ' +
              'content/reading/index.js).',
          },
        ],
      }],
    },
  },
])
