import { defineCollection, z } from 'astro:content';

export const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    domain: z.enum(['art', 'music', 'manzai', 'manga', 'movie']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
    tags: z.array(z.string()),
    lang: z.enum(['ja', 'en']).default('ja'),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    description: z.string(),
  }),
});

const templates = defineCollection({
  type: 'content',
  schema: z.object({}).passthrough(),
});

export const collections = { articles, templates };
