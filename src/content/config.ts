import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

const exams = z.object({
  title: z.string(),
  date: z.string(),
  content: z.string(),
});

const lectures = z.object({
  date: z.string(),
  readings: z.array(
    z.object({
      link: z.string().url(),
      name: z.string(),
      optional: z.boolean().default(false),
      grad_only: z.boolean().default(false),
    })
  ),
  notes: z.string().optional(),
});

const homeworks = z.object({
  due: z.string(),
  github_link: z.string().url().optional(),
  release: z.string(),
});

const wrapper = (input: any) => {
  const result = docsSchema()(input);
  return result.merge(homeworks.partial()).merge(lectures.partial());
};

export const collections = {
  docs: defineCollection({ schema: wrapper }),
  exams: defineCollection({ schema: exams, type: "data" }),
};
