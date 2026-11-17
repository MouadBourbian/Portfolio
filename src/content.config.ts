import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const contentDir = process.env.CONTENT_DIR;

const about = defineCollection({
  loader: glob({
    base: `${contentDir}/about`,
    pattern: "**/*.md",
  }),
});

const technologies = defineCollection({
  loader: file(`${contentDir}/technologies/index.json`),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
  }),
});

const profile = defineCollection({
  loader: glob({
    base: `${contentDir}/profile`,
    pattern: "**/*.json",
  }),
  schema: z.union([
    z.object({
      name: z.string(),
      portrait: z.string(),
    }),
    z.object({
      role: z.string(),
      bio: z.string(),
    }),
  ]),
});

const socials = defineCollection({
  loader: file(`${contentDir}/socials/index.json`),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    href: z.url(),
    icon: z.string(),
  }),
});

export const collections = { about, technologies, profile, socials };
