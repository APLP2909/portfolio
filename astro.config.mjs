// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Astro configuration for aadeelp.com.
 *
 * - `site` MUST be the final public address. The sitemap, canonical URLs
 *   and social preview image URLs are built from it.
 * - No `base` is set: the site is served from the root of the custom domain.
 */
export default defineConfig({
  site: 'https://aadeelp.com',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
});
