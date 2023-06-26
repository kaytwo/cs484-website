import { defineCollection, z } from "astro:content";
import { docsSchema } from "@astrojs/starlight/schema";

const exams = z.object({
  title: z.string(),
  date: z.date(),
  content: z.string(),
});

const lectures = z.object({
  date: z.date(),
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
  due: z.date(),
  github_link: z.string().url().optional(),
  release: z.date(),
});

const wrapper = (input: any) => {
  const result = docsSchema()(input);
  return result.merge(homeworks.partial()).merge(lectures.partial());
};

export const collections = {
  docs: defineCollection({ schema: wrapper }),
  exams: defineCollection({ schema: exams, type: "data" }),
};
