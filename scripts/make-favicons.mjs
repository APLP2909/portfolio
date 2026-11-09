/**
 * Builds the favicon set: public/favicon.svg plus PNGs at 32, 180 and 192 px.
 *
 * The mark is "AP" in IBM Plex Mono on graphite with a solar-amber bar.
 * Letters are converted to shapes, so the icon never depends on installed fonts.
 * Edit the colours or letters below, then run `npm run favicons`.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const require = createRequire(import.meta.url);
const mono = readFileSync(require.resolve('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff'));

const h = (style, children) => ({ type: 'div', props: { style, children } });

const tree = h(
  {
    width: 64,
    height: 64,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    background: '#16181d',
    borderRadius: 4,
  },
  [
    h({ display: 'flex', fontFamily: 'IBM Plex Mono', fontWeight: 500, fontSize: 27, letterSpacing: 0, color: '#e9ebee', lineHeight: 1 }, 'AP'),
    h({ display: 'flex', width: 36, height: 5, background: '#f5b330' }),
  ],
);

const svg = await satori(tree, {
  width: 64,
  height: 64,
  fonts: [{ name: 'IBM Plex Mono', data: mono, weight: 500, style: 'normal' }],
});

writeFileSync('public/favicon.svg', svg);
console.log('public/favicon.svg');

for (const size of [32, 180, 192]) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
  writeFileSync(`public/favicon-${size}.png`, png);
  console.log(`public/favicon-${size}.png`);
}
