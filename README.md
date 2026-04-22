# know-it-break-it

**あたまのネジとはずしかた**

Know It. Break It.

型を知って、武器にしろ。

## Concept

プロが見ているポイントがある。それは言語化できる。型を知らずに破っても、それはただの無知だ。型を知って破って初めて、それが個性になる。

## Domains

- 美術（構図・象徴・色彩）
- 音楽（コード進行・転調・外し）
- 漫才（転回・普遍性・評価軸）
- 漫画（編集者の評価軸）
- 映画（ストーリー構造）

## Tech

- Astro 5 + TypeScript + Tailwind CSS
- Cloudflare Pages
- AI生成コンテンツ + 人間確認 + 静的記事
- 正解のあるクイズ

## i18n

- `/ja/` — 日本語（デフォルト）
- `/en/` — English
- 言語切り替えUIは全ページに表示
- 記事も `lang` フィールドで言語別管理

## Content Guidelines

### 記事ファイル命名規約

- 日本語記事: `{slug}.md`（例: `sample.md`）
- 英語記事: `{slug}-en.md`（例: `sample-en.md`）
- `lang` frontmatter とファイル名サフィックスを一致させること
- URL スラグからは言語サフィックスが除去される（`sample-en` → `/en/articles/sample`）

### 多言語コンテンツの追加

1. `locales`（`src/lib/i18n.ts`）に言語を追加
2. `domainLabels` / `difficultyLabels` / `uiLabels` に該当言語のラベルを追加
3. 記事ファイルを `{slug}-{lang}.md` 形式で作成
4. frontmatter の `lang` を該当言語に設定

## Dev

```bash
pnpm install
pnpm dev
```

### テスト

```bash
pnpm test:unit
```

### ビルド

```bash
pnpm build
```

## Related Projects

- [大阪けんぽう](https://github.com/kako-jun/osaka-kenpo) — 法律の暗黙知
- [gilga](https://github.com/kako-jun/gilga) — 悪意の暗黙知
- [break-and-shift](https://github.com/kako-jun/break-and-shift) — 確率の暗黙知
