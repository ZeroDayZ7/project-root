import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  // dts: true, 
  dts: {
    resolve: true,
  },
  clean: true,
  external: ['express'],
  sourcemap: true,
});
