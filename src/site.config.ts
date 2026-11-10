/**
 * Site-wide settings. Change values here, not in individual pages.
 *
 * @packageDocumentation
 */

export const site = {
  /** Full name, shown in the header, footer and social previews. */
  name: 'Aadeel Peerally',
  /** Default page title (browser tab, search results, link previews). */
  defaultTitle: 'Aadeel Peerally, Product Director: platforms and AI',
  /** Default meta description. */
  defaultDescription:
    'Product Director. I lead platforms and AI products. 15 years building and leading product teams across four sectors. Based in Berlin.',
  /** Tagline, used as the title of the home page social preview image. */
  ogLine: 'Product Director. I lead platforms and AI products.',
  /** Supporting line under the tagline, used on the home page social preview image. */
  ogSupportingLine: '15 years building and leading product teams across four sectors.',
  location: 'Berlin',
  /**
   * Public email address, stored backwards so bots that scan this public
   * repository cannot read it. Pages never print it as plain text either;
   * the EmailLink component assembles it in the browser.
   *
   * To change it, write the part before the @ and the part after it
   * backwards. Example: `jane.doe@example.com` becomes
   * `{ user: 'eod.enaj', domain: 'moc.elpmaxe' }`.
   */
  emailReversed: { user: '181092pleedaa', domain: 'moc.liamg' },
  linkedin: 'https://www.linkedin.com/in/aadeel-peerally-77826b17/',
  /**
   * Path of the downloadable resume in `public/`.
   * To replace the PDF, overwrite this file and keep the name.
   */
  resumePdf: '/Aadeel-Peerally-Resume.pdf',
  /**
   * Cloudflare Web Analytics site token. Leave empty to turn analytics off.
   * The script loads only in production builds.
   */
  cloudflareAnalyticsToken: '0881b74bf6184a739c4d38f755fb0ff6',
  /**
   * When `true`, the "Work" nav item and the "See my work" button are hidden
   * while no case study exists. Pending decision (Aadeel, Phase 3).
   */
  hideWorkWhenEmpty: false,
  /**
   * LAUNCH SWITCH. While `false`, every page carries `<meta name="robots"
   * content="noindex, nofollow">`, so search engines can reach the site but
   * will not list it. Set to `true` on launch day (after the final content
   * changes), commit and push. Search engines then pick the site up over the
   * following days. robots.txt deliberately stays open: crawlers must be able
   * to read a page to see its noindex tag.
   */
  allowIndexing: false,
} as const;

/** Main navigation. `requiresWork` items follow `hideWorkWhenEmpty`. */
export const navItems = [
  { label: 'About', href: '/about/', requiresWork: false },
  { label: 'Resume', href: '/resume/', requiresWork: false },
  { label: 'Work', href: '/work/', requiresWork: true },
] as const;
