import antfu from '@antfu/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'

export default antfu({
  stylistic: {
    indent: 2,
  },
})
  .overrides({
    'antfu/node/rules': {
      rules: {
        'node/prefer-global/process': ['error', 'always'],
        'node/prefer-global/buffer': ['error', 'always'],
      },
    },

    'antfu/perfectionist/setup': {
      ...perfectionist.configs['recommended-line-length'],
      rules: {
        'perfectionist/sort-imports': [
          'error',
          {
            groups: [
              'side-effect',
              'type',
              ['builtin-type', 'external-type'],
              ['builtin', 'external'],
              'internal-type',
              'internal',
              ['parent-type', 'sibling-type', 'index-type'],
              ['parent', 'sibling', 'index'],
              'object',
              'unknown',
            ],
            newlinesBetween: 'always',
            internalPattern: ['~/**'],
            sortSideEffects: true,
            ignoreCase: false,
            type: 'line-length',
            // order: 'asc',
          },
        ],
      },
    },
  })
