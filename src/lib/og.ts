/**
 * Builds 1200 × 630 social preview images at build time, in the site's
 * "Engineered" style: graphite background, IBM Plex, one solar-amber rule.
 *
 * Fonts MUST be .woff, .ttf or .otf files (the image renderer cannot read .woff2).
 *
 * @packageDocumentation
 */
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);

/** Text shown on one preview image. */
export interface OgContent {
  /** Large text, usually the page or case-study title. */
  title: string;
  /** Small line under the title. */
  line?: string;
  /** Name shown at the top. */
  name: string;
}

interface Fonts {
  sans400: Buffer;
  sans700: Buffer;
  mono500: Buffer;
}

let fonts: Promise<Fonts> | undefined;

function loadFonts(): Promise<Fonts> {
  const file = (pkg: string, weight: number) =>
    readFile(require.resolve(`@fontsource/${pkg}/files/${pkg}-latin-${weight}-normal.woff`));
  fonts ??= Promise.all([file('ibm-plex-sans', 400), file('ibm-plex-sans', 700), file('ibm-plex-mono', 500)]).then(
    ([sans400, sans700, mono500]) => ({ sans400, sans700, mono500 }),
  );
  return fonts;
}

const colours = {
  background: '#16181d',
  text: '#e9ebee',
  muted: '#a8afba',
  accent: '#f5b330',
  rule: '#3a4049',
};

/** Minimal element helper, so this file needs no JSX or React. */
const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: { style, children },
});

/**
 * Renders one preview image.
 *
 * @returns PNG bytes.
 */
export async function renderOgImage({ title, line, name }: OgContent): Promise<Uint8Array> {
  const { sans400, sans700, mono500 } = await loadFonts();
  const mono = { fontFamily: 'IBM Plex Mono', fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase' };

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 80px',
      background: colours.background,
      fontFamily: 'IBM Plex Sans',
    },
    [
      h('div', { display: 'flex', width: 1040, justifyContent: 'space-between', fontSize: 26, color: colours.muted, ...mono }, [
        h('div', { display: 'flex' }, name),
        h('div', { display: 'flex' }, 'aadeelp.com'),
      ]),
      h('div', { display: 'flex', flexDirection: 'column', width: 1040 }, [
        h('div', { display: 'flex', width: 96, height: 8, background: colours.accent, marginBottom: 36 }),
        h(
          'div',
          {
            display: 'flex',
            width: 1040,
            fontSize: title.length > 60 ? 60 : 76,
            fontWeight: 700,
            color: colours.text,
            lineHeight: 1.08,
            letterSpacing: -1.5,
          },
          title,
        ),
        ...(line
          ? [h('div', { display: 'flex', width: 1040, marginTop: 28, fontSize: 34, color: colours.muted, lineHeight: 1.3 }, line)]
          : []),
      ]),
      h('div', { display: 'flex', width: 1040, height: 2, background: colours.rule }),
    ],
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'IBM Plex Sans', data: sans400, weight: 400, style: 'normal' },
      { name: 'IBM Plex Sans', data: sans700, weight: 700, style: 'normal' },
      { name: 'IBM Plex Mono', data: mono500, weight: 500, style: 'normal' },
    ],
  });

  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
