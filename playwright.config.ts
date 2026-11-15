import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:4321",
  },
  webServer: {
    command: "npm run dev -- --port 4321",
    url: "http://localhost:4321/en/",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
