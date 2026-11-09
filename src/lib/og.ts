/**
 * Builds 1200 × 630 social preview images at build time, in the site's
 * portfolio design system (dark theme): bg, the violet/teal background halo, the
 * name in accent, Archivo titles and IBM Plex.
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
  display700: Buffer;
  mono500: Buffer;
}

let fonts: Promise<Fonts> | undefined;

/**
 * Loads fonts for the image renderer. Archivo here is the static, standard-width
 * cut: the renderer cannot apply the semi-expanded width used on the site.
 */
function loadFonts(): Promise<Fonts> {
  const file = (pkg: string, weight: number) =>
    readFile(require.resolve(`@fontsource/${pkg}/files/${pkg}-latin-${weight}-normal.woff`));
  fonts ??= Promise.all([file('ibm-plex-sans', 400), file('archivo', 700), file('ibm-plex-mono', 500)]).then(
    ([sans400, display700, mono500]) => ({ sans400, display700, mono500 }),
  );
  return fonts;
}

/** Dark-theme tokens from src/styles/tokens.css (the image renderer cannot read CSS variables). */
const colours = {
  background: '#0b1117',
  text: '#e6edf2',
  muted: '#9aa7b2',
  accent: '#38e1d0',
  line: 'rgba(230, 237, 242, 0.13)',
  // The halo: the system's only gradient, same stops as .ps-halo in bundle.css.
  halo:
    'radial-gradient(45% 70% at 85% 0%, rgba(168, 98, 224, 0.18), transparent 70%), radial-gradient(45% 70% at 10% 0%, rgba(56, 225, 208, 0.14), transparent 70%)',
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
  const { sans400, display700, mono500 } = await loadFonts();
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
      backgroundColor: colours.background,
      backgroundImage: colours.halo,
      fontFamily: 'IBM Plex Sans',
    },
    [
      h('div', { display: 'flex', width: 1040, justifyContent: 'space-between', fontSize: 24, ...mono }, [
        h('div', { display: 'flex', color: colours.accent }, name),
        h('div', { display: 'flex', color: colours.muted }, 'aadeelp.com'),
      ]),
      h('div', { display: 'flex', flexDirection: 'column', width: 1040 }, [
        h(
          'div',
          {
            display: 'flex',
            width: 1040,
            fontSize: title.length > 60 ? 60 : 76,
            fontWeight: 700,
            fontFamily: 'Archivo',
            color: colours.text,
            lineHeight: 1.08,
            letterSpacing: -0.5,
          },
          title,
        ),
        ...(line
          ? [h('div', { display: 'flex', width: 1040, marginTop: 28, fontSize: 34, color: colours.muted, lineHeight: 1.3 }, line)]
          : []),
      ]),
      h('div', { display: 'flex', width: 1040, height: 1, background: colours.line }),
    ],
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'IBM Plex Sans', data: sans400, weight: 400, style: 'normal' },
      { name: 'Archivo', data: display700, weight: 700, style: 'normal' },
      { name: 'IBM Plex Mono', data: mono500, weight: 500, style: 'normal' },
    ],
  });

  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
