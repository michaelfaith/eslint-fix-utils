import { defineConfig } from 'vitest/config';

const config: ReturnType<typeof defineConfig> = defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      include: ['src'],
      reporter: ['html', 'lcov', 'text'],
    },
    exclude: ['lib', 'node_modules'],
    setupFiles: ['console-fail-test/setup'],
  },
});

export default config;
