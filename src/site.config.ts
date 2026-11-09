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
    'Product leader for platforms and AI. Product Director · 15 years · built and led product teams across four sectors.',
  /** Short line used on the home page social preview image. */
  ogLine: 'Product leader for platforms and AI',
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
  cloudflareAnalyticsToken: '',
  /**
   * When `true`, the "Work" nav item and the "See my work" button are hidden
   * while no case study exists. Pending decision (Aadeel, Phase 3).
   */
  hideWorkWhenEmpty: false,
} as const;

/** Main navigation. `requiresWork` items follow `hideWorkWhenEmpty`. */
export const navItems = [
  { label: 'Work', href: '/work/', requiresWork: true },
  { label: 'About', href: '/about/', requiresWork: false },
  { label: 'Resume', href: '/resume/', requiresWork: false },
] as const;
