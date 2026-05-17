import { defineCollection, z } from 'astro:content';

const courseEntry = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  day: z.number().int().min(1).max(5).optional(),
  lesson: z.number().int().optional(),
  duration: z.string().optional(),
});

const curriculum = defineCollection({
  type: 'content',
  schema: courseEntry,
});

const capstone = defineCollection({
  type: 'content',
  schema: courseEntry,
});

const pages = defineCollection({
  type: 'content',
  schema: courseEntry,
});

export const collections = { curriculum, capstone, pages };
