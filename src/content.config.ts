import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";
import { docsLoader } from "@astrojs/starlight/loaders";
import { glob } from 'astro/loaders';
import { calculateAbsoluteDate } from './utils/dateUtils';
import type { CourseConfig } from './types';
import { courseConfig } from './courseConfig';

// Relative date schema that can be reused
const relativeDateSchema = z.object({
  week: z.number(),
  day: z.number(),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
});

const exams = z.object({
  title: z.string(),
  date: z.string().optional(), // Make absolute date optional
  relative_date: relativeDateSchema.optional(), // Add relative date
  content: z.string(),
  notes: z.string().optional(),
  tentative: z.boolean().default(false),
});

const lectures = z.object({
  date: z.string().optional(), // Make absolute date optional
  relative_date: relativeDateSchema.optional(), // Add relative date
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
  due: z.string().optional(), // Make absolute date optional
  relative_due: relativeDateSchema.optional(), // Add relative due date
  github_link: z.string().url().optional(),
  release: z.string().optional(), // Make absolute date optional
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

// Transform function to handle relative dates
function transformContent(data: any) {
  const transformed = { ...data };
  console.log('Course config:', courseConfig);
  console.log('Original data:', data);

  // Handle lecture dates
  if (transformed.relative_date) {
    console.log('Transforming relative date:', transformed.relative_date);
    transformed.date = calculateAbsoluteDate(transformed.relative_date, courseConfig).toISOString();
    console.log('Transformed to:', transformed.date);
  }

  // Handle homework dates
  if (transformed.relative_release) {
    transformed.release = calculateAbsoluteDate(transformed.relative_release, courseConfig).toISOString();
  }
  if (transformed.relative_due) {
    transformed.due = calculateAbsoluteDate(transformed.relative_due, courseConfig).toISOString();
  }

  return transformed;
}

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: schema,
  }),
  exams: defineCollection({
    loader: glob({ pattern: '**/[^_]*.yaml', base: "./src/content/exams" }),
    schema: exams,
  }),
};
