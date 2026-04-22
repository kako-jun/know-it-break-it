import type { CollectionEntry } from 'astro:content';

type Article = CollectionEntry<'articles'>;
type Domain = Article['data']['domain'];
type Difficulty = Article['data']['difficulty'];

export const domainLabels: Record<Domain, string> = {
  art: '美術',
  music: '音楽',
  manzai: '漫才',
  manga: '漫画',
  movie: '映画',
};

export const difficultyLabels: Record<Difficulty, string> = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
};

export const difficultyClasses: Record<Difficulty, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};
