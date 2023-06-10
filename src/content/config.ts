import { defineCollection, z } from 'astro:content';
import { docsSchema } from '@astrojs/starlight/schema';

const exams = z.object({
	date: z.date(),
});

const lectures = z.object({
	date: z.date(),
	contents: z.array(
		z.object({
			link: z.string().url(),
			name: z.string(),
		})
	),
});

const homeworks = z.object({
	due: z.date(),
	github_link: z.string().url().optional(),
	release: z.date()
});

export const collections = {
	docs: defineCollection({ schema: docsSchema() }),
};
