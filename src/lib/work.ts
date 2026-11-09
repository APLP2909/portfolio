/**
 * Helpers for the `work` (case study) collection.
 *
 * @packageDocumentation
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { MarkdownHeading } from 'astro';

export type WorkEntry = CollectionEntry<'work'>;

/**
 * Returns every case study, newest first.
 */
export async function getWork(): Promise<WorkEntry[]> {
  const entries = await getCollection('work');
  return entries.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

/**
 * Turns a collection entry ID into its URL slug.
 * A case study stored as `pvcase-platform/index.md` and one stored as
 * `pvcase-platform.md` both get the slug `pvcase-platform`.
 */
export function workSlug(entry: WorkEntry): string {
  return entry.id.replace(/\/index$/, '');
}

/** Body sections every case study MUST contain, in this order (positioning.md, section 7). */
export const REQUIRED_SECTIONS = [
  'Summary',
  'Context',
  'The problem',
  'My role',
  'Decisions and trade-offs',
  'What we shipped',
  'Outcome',
] as const;

/** Sections a case study MAY add after the required ones. */
export const OPTIONAL_SECTIONS = ["What I'd do differently"] as const;

const normalise = (text: string) => text.trim().replace(/[‘’]/g, "'").toLowerCase();

/**
 * Checks that a case study's level-2 headings match the template exactly:
 * every required section, in order, optionally followed by the optional ones.
 *
 * @throws Error naming the file and the problem, which fails the build.
 */
export function assertSections(entry: WorkEntry, headings: MarkdownHeading[]): void {
  const found = headings.filter((h) => h.depth === 2).map((h) => normalise(h.text));
  const required = REQUIRED_SECTIONS.map(normalise);
  const optional = OPTIONAL_SECTIONS.map(normalise);

  const head = found.slice(0, required.length);
  const tail = found.slice(required.length);
  const requiredOk = required.every((name, i) => head[i] === name);
  const tailOk = tail.length <= optional.length && tail.every((name, i) => name === optional[i]);

  if (!requiredOk || !tailOk) {
    throw new Error(
      `Case study "${entry.id}" does not follow the section template.\n` +
        `Expected "## " headings, in order: ${[...REQUIRED_SECTIONS].join(', ')}` +
        ` (then optionally: ${[...OPTIONAL_SECTIONS].join(', ')}).\n` +
        `Found: ${found.length ? found.join(', ') : 'none'}.`,
    );
  }
}
