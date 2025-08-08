import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    entry: './src/index.ts',
    resolve: true,
  },
  tsconfig: './tsconfig.json',
  clean: true,
  external: ['express'],
  sourcemap: true,
});
