/**
 * Social preview images, generated at build time.
 *
 * - /og/home.png, /og/about.png and so on: one per fixed page.
 * - /og/work/<slug>.png: one per case study, picked up automatically.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { site } from '../../site.config';
import { getWork, workSlug } from '../../lib/work';
import { renderOgImage, type OgContent } from '../../lib/og';

export const getStaticPaths = (async () => {
  const pages: { slug: string; content: OgContent }[] = [
    // Home: text only (title, name and a short line). No headshot.
    { slug: 'home', content: { name: site.name, title: site.ogLine, line: site.ogSupportingLine } },
    { slug: 'about', content: { name: site.name, title: 'About', line: site.ogLine } },
    { slug: 'resume', content: { name: site.name, title: 'Resume', line: site.ogLine } },
    { slug: 'work', content: { name: site.name, title: 'My work', line: site.ogLine } },
    { slug: 'privacy', content: { name: site.name, title: 'Privacy', line: site.ogLine } },
  ];

  for (const entry of await getWork()) {
    pages.push({
      slug: `work/${workSlug(entry)}`,
      content: {
        name: site.name,
        title: entry.data.title,
        line: entry.data.ogLine ?? `${entry.data.company} · ${entry.data.sector}`,
      },
    });
  }

  return pages.map(({ slug, content }) => ({ params: { slug }, props: { content } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ content: OgContent }> = async ({ props }) => {
  const png = await renderOgImage(props.content);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
