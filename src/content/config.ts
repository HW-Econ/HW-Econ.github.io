import { defineCollection, z } from 'astro:content';

const sessionsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        start: z.string().regex(/^\d{2}:\d{2}$/),
        end: z.string().regex(/^\d{2}:\d{2}$/),
        speaker: z.string(),
        affiliation: z.string().optional(),
        series: z.string().optional(),
        location: z.string().optional(),
        tags: z.array(z.string()).optional(),
        links: z.object({
            slides: z.string().url().optional(),
            paper: z.string().url().optional(),
            repo: z.string().url().optional(),
            notes: z.string().url().optional(),
            video: z.string().url().optional(),
        }).optional(),
        feedback_wanted: z.array(z.string()).optional(),
        draft: z.boolean().optional(),
    }),
});

export const collections = {
    sessions: sessionsCollection,
};
