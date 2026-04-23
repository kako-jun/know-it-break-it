import type { CollectionEntry } from 'astro:content';

export const locales = ['ja', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ja';

type Article = CollectionEntry<'articles'>;
type Domain = Article['data']['domain'];
type Difficulty = Article['data']['difficulty'];

export const domainLabels: Record<Locale, Record<Domain, string>> = {
  ja: {
    art: '美術',
    music: '音楽',
    manzai: '漫才',
    manga: '漫画',
    movie: '映画',
  },
  en: {
    art: 'Art',
    music: 'Music',
    manzai: 'Comedy',
    manga: 'Manga',
    movie: 'Movie',
  },
};

export const difficultyLabels: Record<Locale, Record<Difficulty, string>> = {
  ja: {
    beginner: '初級',
    intermediate: '中級',
    advanced: '上級',
  },
  en: {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  },
};

export const difficultyClasses: Record<Difficulty, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

export const uiLabels: Record<
  Locale,
  {
    backToArticles: string;
    articleListTitle: string;
    articleListDescription: string;
    published: string;
    updated: string;
  }
> = {
  ja: {
    backToArticles: '← 記事一覧に戻る',
    articleListTitle: '記事一覧',
    articleListDescription: 'ドメイン別の記事一覧。型を知って、武器にしろ。',
    published: '公開',
    updated: '更新',
  },
  en: {
    backToArticles: '← Back to Articles',
    articleListTitle: 'Articles',
    articleListDescription: 'Domain-specific articles. Know the rules. Break them.',
    published: 'Published',
    updated: 'Updated',
  },
};

export function getArticleSlug(article: Article): string {
  const suffix = `-${article.data.lang}`;
  return article.slug.endsWith(suffix) ? article.slug.slice(0, -suffix.length) : article.slug;
}

export function getAlternateLocale(lang: Locale): Locale {
  return lang === 'ja' ? 'en' : 'ja';
}

export function getLocalizedPath(
  currentPath: string,
  currentLang: Locale,
  targetLang: Locale
): string {
  const normalizedPath = normalizePath(currentPath);

  if (normalizedPath === `/${currentLang}`) {
    return `/${targetLang}/`;
  }
  if (normalizedPath === `/${currentLang}/articles`) {
    return getArticleListHref(targetLang);
  }
  return `/${targetLang}/`;
}

export function getArticleHref(article: Article): string {
  return `/${article.data.lang}/articles/${getArticleSlug(article)}/`;
}

export function getArticleListHref(lang: Locale): string {
  return `/${lang}/articles/`;
}

export function findArticleTranslation(
  article: Article,
  articles: Article[],
  targetLang: Locale
): Article | undefined {
  const baseSlug = getArticleSlug(article);
  return articles.find(
    (candidate) => candidate.data.lang === targetLang && getArticleSlug(candidate) === baseSlug
  );
}

function normalizePath(path: string): string {
  return path.replace(/\/$/, '') || '/';
}

export function formatDate(date: Date, lang: Locale): string {
  return date.toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateIso(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getStaticPathsForLang() {
  return locales.map((lang) => ({ params: { lang } }));
}
