import { describe, it, expect } from 'vitest';
import {
  findArticleTranslation,
  formatDate,
  formatDateIso,
  getAlternateLocale,
  getArticleHref,
  getArticleListHref,
  getArticleSlug,
  getLocalizedPath,
} from './i18n';

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

describe('getAlternateLocale', () => {
  it('returns the other supported locale', () => {
    expect(getAlternateLocale('ja')).toBe('en');
    expect(getAlternateLocale('en')).toBe('ja');
  });
});

describe('getLocalizedPath', () => {
  it('switches the locale prefix for home pages', () => {
    expect(getLocalizedPath('/ja/', 'ja', 'en')).toBe('/en/');
    expect(getLocalizedPath('/en', 'en', 'ja')).toBe('/ja/');
  });

  it('switches the locale prefix for nested paths', () => {
    expect(getLocalizedPath('/ja/articles/', 'ja', 'en')).toBe('/en/articles/');
  });

  it('falls back to the target locale root outside localized paths', () => {
    expect(getLocalizedPath('/unexpected', 'ja', 'en')).toBe('/en/');
  });

  it('falls back to the target locale root for unknown nested localized paths', () => {
    expect(getLocalizedPath('/ja/unknown/', 'ja', 'en')).toBe('/en/');
  });
});

describe('article href helpers', () => {
  it('builds localized article and article-list hrefs', () => {
    const article = {
      slug: 'sample-en',
      data: { lang: 'en' },
    } as unknown as Parameters<typeof getArticleHref>[0];
    expect(getArticleHref(article)).toBe('/en/articles/sample/');
    expect(getArticleListHref('ja')).toBe('/ja/articles/');
  });
});

describe('findArticleTranslation', () => {
  it('finds a counterpart by normalized slug and target language', () => {
    const jaArticle = {
      slug: 'sample',
      data: { lang: 'ja' },
    } as unknown as Parameters<typeof findArticleTranslation>[0];
    const enArticle = {
      slug: 'sample-en',
      data: { lang: 'en' },
    } as unknown as Parameters<typeof findArticleTranslation>[1][number];

    expect(findArticleTranslation(jaArticle, [jaArticle, enArticle], 'en')).toBe(enArticle);
  });

  it('returns undefined when no counterpart exists', () => {
    const jaArticle = {
      slug: 'sample',
      data: { lang: 'ja' },
    } as unknown as Parameters<typeof findArticleTranslation>[0];

    expect(findArticleTranslation(jaArticle, [jaArticle], 'en')).toBeUndefined();
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
