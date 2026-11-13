import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const about = defineCollection({
  loader: glob({
    base: "./src/content/about",
    pattern: "**/*.md",
  }),
});

const technologies = defineCollection({
  loader: file("src/content/technologies/index.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
  }),
});

const profile = defineCollection({
  loader: glob({
    base: "./src/content/profile",
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
  loader: file("src/content/socials/index.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    href: z.string().url(),
    icon: z.string(),
  }),
});

export const collections = { about, technologies, profile, socials };
