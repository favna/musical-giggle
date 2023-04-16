import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: false,
  entry: ['src/**/*.ts', '!src/**/*.d.ts'],
  format: ['cjs'],
  minify: false,
  skipNodeModulesBundle: true,
  sourcemap: true,
  target: 'es2019',
  tsconfig: 'tsconfig.json',
  bundle: false,
  shims: false,
  keepNames: true,
  splitting: false
});
