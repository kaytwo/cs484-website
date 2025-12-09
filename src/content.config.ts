import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";

// Relative date schema that can be reused
const relativeDateSchema = z.object({
  week: z.number(),
  day: z.number().or(z.string()),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .optional(),
});

const exams = z.object({
  title: z.string(),
  relative_date: relativeDateSchema,
  content: z.string(),
  notes: z.string().optional(),
  tentative: z.boolean().default(false),
});

const lectures = z.object({
  relative_date: relativeDateSchema,
  readings: z.array(
    z.object({
      link: z.string(),
      name: z.string(),
      optional: z.boolean().default(false),
      grad_only: z.boolean().default(false),
    }),
  ),
  notes: z.string().optional(),
  tentative: z.boolean().default(false),
});

const homeworks = z.object({
  relative_due: relativeDateSchema.optional(),
  github_link: z.string().url().optional(),
  relative_release: relativeDateSchema.optional(), // Add relative release date
  notes: z.string().optional(),
  tentative: z.boolean().default(false),
});

const readings = z.object({
  bibliography: z
    .array(
      z.object({
        link: z.string(),
        name: z.string(),
        optional: z.boolean().default(false),
        grad_only: z.boolean().default(false),
      }),
    )
    .optional()
    .default([]),
  module: z.string().optional(),
  title: z.string().optional(),
  order: z.number().optional(),
});

const schema = docsSchema({
  extend: homeworks
    .partial()
    .merge(lectures.partial())
    .merge(readings.partial()),
});

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: schema,
  }),
  exams: defineCollection({
    loader: glob({ pattern: "**/[^_]*.yaml", base: "./src/content/exams" }),
    schema: exams,
  }),
};
