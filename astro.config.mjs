// @ts-check
import path from "path";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

process.env.SITE_URL = env.SITE_URL?.trim() || "http://localhost:4321";
process.env.CONTENT_DIR = env.CONTENT_DIR?.trim() || "./src/content";
process.env.PUBLIC_DIR = env.PUBLIC_DIR?.trim() || "./public";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL,
  publicDir: process.env.PUBLIC_DIR,
  adapter: vercel(),
  vite: {
    plugins: [
      {
        name: "tw-aliases",
        enforce: "pre",
        transform: (code) =>
          code
            .replace("@content", path.resolve(process.env.CONTENT_DIR ?? ""))
            .replace("@public", path.resolve(process.env.PUBLIC_DIR ?? "")),
      },
      tailwindcss(),
    ],
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
  ],
});
