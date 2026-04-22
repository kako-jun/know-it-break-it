import { describe, it, expect } from 'vitest';
import { getArticleSlug, formatDate, formatDateIso } from './i18n';

describe('getArticleSlug', () => {
  it('removes language suffix from slug', () => {
    const article = {
      slug: 'sample-ja',
      data: { lang: 'ja' },
    } as unknown as Parameters<typeof getArticleSlug>[0];
    expect(getArticleSlug(article)).toBe('sample');
  });

  it('removes -en suffix from slug', () => {
    const article = {
      slug: 'sample-en',
      data: { lang: 'en' },
    } as unknown as Parameters<typeof getArticleSlug>[0];
    expect(getArticleSlug(article)).toBe('sample');
  });

  it('returns slug as-is when no suffix matches', () => {
    const article = {
      slug: 'sample',
      data: { lang: 'ja' },
    } as unknown as Parameters<typeof getArticleSlug>[0];
    expect(getArticleSlug(article)).toBe('sample');
  });

  it('does not remove partial suffix match', () => {
    const article = {
      slug: 'sample-english',
      data: { lang: 'en' },
    } as unknown as Parameters<typeof getArticleSlug>[0];
    expect(getArticleSlug(article)).toBe('sample-english');
  });
});

describe('formatDateIso', () => {
  it('returns YYYY-MM-DD format', () => {
    const date = new Date('2024-01-15T12:00:00.000Z');
    expect(formatDateIso(date)).toBe('2024-01-15');
  });
});

describe('formatDate', () => {
  it('formats date in Japanese', () => {
    const date = new Date('2024-01-15T12:00:00.000Z');
    const result = formatDate(date, 'ja');
    expect(result).toContain('2024');
    expect(result).toContain('1');
    expect(result).toContain('15');
  });

  it('formats date in English', () => {
    const date = new Date('2024-01-15T12:00:00.000Z');
    const result = formatDate(date, 'en');
    expect(result).toContain('2024');
    expect(result.toLowerCase()).toContain('january');
  });
});
