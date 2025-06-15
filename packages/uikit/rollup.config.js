import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
  },
  plugins: [
    resolve({
      preferBuiltins: false,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      rootDir: 'src',
      exclude: ['**/*.test.*', '**/*.stories.*', 'src/storybook/**/*']
    })
  ],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'styled-components',
    'framer-motion',
    'styled-system',
    'lodash',
    'lodash/throttle',
    'lodash/debounce',
    'lodash/uniqueId',
    'lodash/noop',
    'lodash/get',
    'lodash/kebabCase',
    'react-popper',
    'react-device-detect',
    'react-transition-group',
    '@popperjs/core'
  ]
};