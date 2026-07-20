# Blog Content Guide

## Adding a New Post

Create an `.mdx` file in the correct language folder:
- **Arabic posts**: `content/posts/ar/your-slug.mdx`
- **English posts**: `content/posts/en/your-slug.mdx`

**Bilingual rule**: Every post MUST exist in both languages. When you write or edit an Arabic post, you must also create/update the English version, and vice versa. The English post should begin with `> *This post is a translation of the original Arabic article.*` (or the reverse).

---

## Frontmatter

```mdx
---
type: article          # "article" for full posts, "micro" for short thoughts
title: "Post Title"
seoTitle: "Optional shorter SEO title"   # omit if same as title
excerpt: "One-sentence summary shown in listings and used as OG description."
date: "2025-11-01"     # YYYY-MM-DD
tags: ["Tag1", "Tag2"]
coverImage: "/images/posts/your-image.jpg"
---
```

**Cover image rule**: If you set a `coverImage` in the frontmatter, do NOT put the same image inside the post body. The cover image is rendered as a hero at the top of the page automatically. Repeating it in the content looks bad. Put the image ONLY in the frontmatter.

---

## Article (full post)

```mdx
---
type: article
title: "Your Title"
excerpt: "A one-sentence summary."
date: "2025-11-01"
tags: ["Tag1"]
coverImage: "/images/posts/your-image.jpg"
---

Opening paragraph that hooks the reader.

## Section heading

Body text here. Use **bold** for emphasis, *italic* sparingly.

## Another section

> A blockquote for a key insight or quote.
```

---

## Micro Post (short thought/note)

```mdx
---
type: micro
date: "2025-11-01"
tags: ["Thought"]
---

Just write your short thought here. No title needed.
These are like Twitter/X posts — brief, punchy, direct.
```

---

## Tone & Voice

- **Direct and confident**: State the point, don't hedge with "maybe" or "perhaps"
- **First person**: Write as Wael speaking directly to the reader
- **Thought leadership**: Share an opinion, take a stance — not neutral summaries
- **Accessible, not academic**: No jargon walls; explain concepts clearly
- **Structured**: Numbered sections or clear headings for articles over 400 words

### Arabic style
- Use accessible, semi-formal Arabic — closer to how educated Saudis speak and write online
- Avoid overly formal Modern Standard Arabic (فصحى) that feels stiff
- Use `##` for section headings; number them (1. 2. 3.) when the post is a list

### English style
- Natural and confident, not a literal word-for-word translation
- Match the directness of the Arabic original
- Add `> *This post is a translation of the original Arabic article.*` as the first line of translated posts

---

## Structure conventions

- **Slug** = filename (without `.mdx`). Lowercase with hyphens. Same slug for both languages.
- **Date** format: `YYYY-MM-DD`
- Posts are sorted newest first.
- Reading time is calculated automatically.
- Tags should match between Arabic and English versions (translated tags).

---

## Images

- Place images in `public/images/posts/`
- Reference them as `/images/posts/your-image.jpg` (absolute from `/public`)
- Only set an image in the frontmatter `coverImage` — do NOT repeat it in the body
- For inline images inside the post (different from cover), use standard markdown: `![Alt text](/images/posts/other-image.jpg)`

---

## Checklist before publishing

- [ ] Both Arabic and English versions created
- [ ] Cover image set only in frontmatter (not repeated in body)
- [ ] Excerpt is one sharp sentence
- [ ] Tags match between AR/EN versions
- [ ] Date is correct (YYYY-MM-DD)
- [ ] Slug is the same for both language files
