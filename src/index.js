import { ESLint } from 'eslint'
import depend from 'eslint-plugin-depend'
import tseslint from 'typescript-eslint'
import * as jsoncParser from 'jsonc-eslint-parser'

const eslint = new ESLint({
  cwd: process.cwd(),
  overrideConfigFile: true,
  overrideConfig: {
    linterOptions: {
      reportUnusedDisableDirectives: false
    }
  },
  baseConfig: [
    {
      ignores: [
        // common ignores
        '**/node_modules/**',
        // output
        '**/dist/**',
        '**/build/**',
        // testing
        '**/coverage/**',
        '**/test-results/**',
        '**/tests/**',
        '**/test/**',
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/e2e/**',
        // vendoring
        '**/vendor/**',
        '**/repos/**'
      ]
    },
    {
      files: ['**/*.js', '**/*.jsx'],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        }
      },
      plugins: {
        depend
      },
      rules: {
        'depend/ban-dependencies': 'error'
      }
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      name: 'asdasd',
      languageOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        }
      },
      plugins: {
        '@typescript-eslint': tseslint.plugin,
        depend
      },
      rules: {
        'depend/ban-dependencies': 'error'
      }
    },
    {
      files: ['package.json'],
      languageOptions: {
        parser: jsoncParser
      },
      plugins: {
        depend
      },
      rules: {
        'depend/ban-dependencies': 'error'
      }
    }
  ]
})

const entries = process.argv.slice(2)[0] || './**/*.{js,ts,jsx,tsx}'
const results = await eslint.lintFiles([entries, '**/package.json'])

// --fix
if (process.argv.includes('--fix')) {
  await ESLint.outputFixes(results)
}

for (const result of results) {
  // Delete the `Definition for rule '*' was not found` error
  result.messages = result.messages.filter((message) => {
    if (
      message.message.includes('Definition for rule') &&
      message.message.includes('was not found')
    ) {
      return false
    }
    return true
  })
}

const formatter = await eslint.loadFormatter('stylish')
const resultText = formatter.format(results)

if (resultText) {
  console.log(resultText)
} else {
  const green = (text) => `\u001b[32m${text}\u001b[39m`
  console.log(green('✔ No linting errors!'))
}
