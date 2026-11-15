// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import postAudit from "@casoon/astro-post-audit";

const { SITE_URL, PUBLIC_DIR } = loadEnv(
  process.env.NODE_ENV ?? "development",
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  site: SITE_URL?.trim() || "http://localhost:4321",
  publicDir: PUBLIC_DIR?.trim() || "./public",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => new URL(page).pathname !== "/",
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          de: "de",
        },
      },
    }),
    postAudit({
      preset: "strict",
      failOn: "errors",
      strict: false,
      hints: {
        sourceFiles: true,
      },
      rules: {
        filters: {
          exclude: ["404.html", "500.html"],
        },
      },
    }),
  ],
});
