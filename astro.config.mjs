// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Builds one self-hosted font variant from a Fontsource package in node_modules.
 * The files are copied into the build and served from aadeelp.com, so no
 * visitor request goes to a third-party font service.
 *
 * @param {string} pkg Fontsource package name, for example `ibm-plex-sans`.
 * @param {400 | 500 | 600 | 700} weight
 * @param {'normal' | 'italic'} style
 */
const plex = (pkg, weight, style = 'normal') => ({
  src: /** @type {[string]} */ ([`./node_modules/@fontsource/${pkg}/files/${pkg}-latin-${weight}-${style}.woff2`]),
  weight,
  style,
});

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
  fonts: [
    {
      // Display face: Archivo. This variable file carries the width and weight
      // axes; declaring the stretch range lets the design system's
      // `font-stretch: 112%` select the semi-expanded width.
      provider: fontProviders.local(),
      name: 'Archivo',
      cssVariable: '--font-archivo',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2'],
            weight: '100 900',
            stretch: '62% 125%',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-plex-sans',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          plex('ibm-plex-sans', 400),
          plex('ibm-plex-sans', 400, 'italic'),
          plex('ibm-plex-sans', 500),
          plex('ibm-plex-sans', 600),
          plex('ibm-plex-sans', 700),
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      fallbacks: ['monospace'],
      options: {
        variants: [plex('ibm-plex-mono', 400), plex('ibm-plex-mono', 500)],
      },
    },
  ],
});
