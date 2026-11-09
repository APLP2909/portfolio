/**
 * Builds the favicon set: public/favicon.svg plus PNGs at 32, 180 and 192 px.
 *
 * The mark matches the design system's header mark (.ps-mark): "AP" in Archivo
 * bold, in the dark-theme accent (teal), on the surface colour with a 1px line border.
 * Letters are converted to shapes, so the icon never depends on installed fonts.
 * Edit the colours or letters below, then run `npm run favicons`.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);
const archivo = readFileSync(require.resolve('@fontsource/archivo/files/archivo-latin-700-normal.woff'));

const h = (style, children) => ({ type: 'div', props: { style, children } });

const tree = h(
  {
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#121a22',
    border: '2px solid rgba(230, 237, 242, 0.22)',
    borderRadius: 14,
  },
  [h({ display: 'flex', fontFamily: 'Archivo', fontWeight: 700, fontSize: 28, color: '#38e1d0', lineHeight: 1 }, 'AP')],
);

const svg = await satori(tree, {
  width: 64,
  height: 64,
  fonts: [{ name: 'Archivo', data: archivo, weight: 700, style: 'normal' }],
});

writeFileSync('public/favicon.svg', svg);
console.log('public/favicon.svg');

for (const size of [32, 180, 192]) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
  writeFileSync(`public/favicon-${size}.png`, png);
  console.log(`public/favicon-${size}.png`);
}
