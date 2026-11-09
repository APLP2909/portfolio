/**
 * Content collections.
 *
 * The `work` collection holds case studies. The schema MUST reject a case
 * study with missing or invalid fields, so a bad file fails the build instead
 * of publishing a half-finished page.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { WORK_TAGS } from './lib/tags';

const nonEmpty = z.string().trim().min(1);

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: ({ image }) =>
    z
      .object({
        /** Case-study title. Shown on cards, the page heading and the social preview. */
        title: nonEmpty,
        /** One or two sentences for cards and search results. */
        description: nonEmpty.max(220),
        /** Sort key. Newest first on the home page and /work/. */
        publishDate: z.coerce.date(),

        // Context panel (positioning.md, section 7).
        role: nonEmpty,
        company: nonEmpty,
        sector: nonEmpty,
        timeframe: nonEmpty,
        team: nonEmpty.optional(),
        outcome: nonEmpty,
        tags: z.array(z.enum(WORK_TAGS)).min(1),

        /** Optional cover image, stored next to the content file. */
        cover: image().optional(),
        coverAlt: nonEmpty.optional(),

        /** Optional silent looping video, stored in public/videos/. */
        video: z
          .object({
            src: z.string().regex(/^\/videos\/[\w./-]+\.mp4$/, 'Use a path like /videos/name.mp4'),
            poster: z
              .string()
              .regex(/^\/videos\/[\w./-]+\.(jpg|jpeg|png|webp)$/, 'Use a path like /videos/name-poster.jpg'),
            width: z.number().int().positive(),
            height: z.number().int().positive(),
            /** Describes what the video shows, for screen readers. */
            label: nonEmpty,
            caption: nonEmpty.optional(),
          })
          .optional(),

        /** Optional short line for the social preview image. Defaults to the company and sector. */
        ogLine: nonEmpty.max(90).optional(),
      })
      .refine((d) => !d.cover || d.coverAlt, {
        message: 'coverAlt is required when cover is set',
        path: ['coverAlt'],
      }),
});

export const collections = { work };
