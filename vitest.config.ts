import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    // dist/ holds a compiled copy of every test; running those too would double every count and
    // fail on the ones vitest cannot read as suites. Only the sources are the tests.
    exclude: ["**/node_modules/**", "**/dist/**"],
    // .mjs alongside .ts: one test file here was already written for node:test and kept that
    // extension when it moved to vitest.
    include: ["src/**/*.test.{ts,mts,mjs}"]
  }
})
