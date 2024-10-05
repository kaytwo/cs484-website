import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

const exams = z.object({
  title: z.string(),
  date: z.string(),
  content: z.string(),
  notes: z.string().optional(),
  tentative: z.boolean().default(false),
});

const lectures = z.object({
  date: z.string(),
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
  due: z.string(),
  github_link: z.string().url().optional(),
  release: z.string(),
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
  docs: defineCollection({ schema: schema }),
  exams: defineCollection({ schema: exams, type: "data" }),
};
