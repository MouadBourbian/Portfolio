import { loadEnv, normalizePath } from "vite";

const { CONTENT_DIR, PUBLIC_DIR } = loadEnv(
  process.env.NODE_ENV ?? "development",
  process.cwd(),
  "",
);

const contentDir = normalizePath(CONTENT_DIR?.trim() || "./src/content");
const publicDir = normalizePath(PUBLIC_DIR?.trim() || "./public");

export default {
  content: [`${contentDir}/**/*`, `${publicDir}/**/*`],
};
