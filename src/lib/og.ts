/**
 * Builds 1200 × 630 social preview images at build time.
 *
 * PRE-DESIGN PLACEHOLDER: colours and font are neutral stand-ins until Phase 3.
 * The font MUST be a .woff, .ttf or .otf file (the image renderer cannot read .woff2).
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

let fonts: Promise<{ regular: Buffer; bold: Buffer }> | undefined;

function loadFonts() {
  fonts ??= Promise.all([
    readFile(require.resolve('@fontsource/inter/files/inter-latin-400-normal.woff')),
    readFile(require.resolve('@fontsource/inter/files/inter-latin-700-normal.woff')),
  ]).then(([regular, bold]) => ({ regular, bold }));
  return fonts;
}

const colours = {
  background: '#ffffff',
  text: '#1a1a1a',
  muted: '#4d4d4d',
  accent: '#1f4fbf',
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
  const { regular, bold } = await loadFonts();

  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      background: colours.background,
      borderLeft: `24px solid ${colours.accent}`,
      fontFamily: 'Inter',
    },
    [
      h('div', { fontSize: 34, fontWeight: 700, color: colours.muted }, name),
      h('div', { display: 'flex', flexDirection: 'column', gap: 24, width: 1000 }, [
        h(
          'div',
          { display: 'flex', width: 1000, fontSize: title.length > 60 ? 56 : 68, fontWeight: 700, color: colours.text, lineHeight: 1.1 },
          title,
        ),
        ...(line ? [h('div', { display: 'flex', width: 1000, fontSize: 34, color: colours.muted, lineHeight: 1.3 }, line)] : []),
      ]),
      h('div', { fontSize: 28, color: colours.accent }, 'aadeelp.com'),
    ],
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: regular, weight: 400, style: 'normal' },
      { name: 'Inter', data: bold, weight: 700, style: 'normal' },
    ],
  });

  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
