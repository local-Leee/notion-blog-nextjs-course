import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // 여기에 추가적인 규칙을 설정할 수 있습니다
      'no-unused-vars': [
        'warn',
        {
          // 함수 파라미터에서 미사용 벼수 검사 비활성화 하겠다
          args: 'none',
        },
      ],
      // 콘솔 사용 시 경고
      // 'no-console': 'warn',
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
