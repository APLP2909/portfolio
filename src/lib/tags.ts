/**
 * The only tags a case study may use. They match the four differentiators
 * in the positioning. Adding a tag here is a content decision, not a code fix.
 */
export const WORK_TAGS = ['Platform', 'Payments', 'AI', 'Founder'] as const;

export type WorkTag = (typeof WORK_TAGS)[number];
