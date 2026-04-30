# Blog Content Guide

## Adding a New Post

Create an `.mdx` file in the correct language folder:
- **Arabic posts**: `content/posts/ar/your-slug.mdx`
- **English posts**: `content/posts/en/your-slug.mdx`

---

## Article (full post)

```mdx
---
type: article
title: "Your Article Title"
excerpt: "A one-sentence summary shown in the blog listing."
date: "2025-11-01"
tags: ["Tag1", "Tag2"]
coverImage: "/images/your-cover.jpg"
---

Your full article content in Markdown here.

## Heading 2

Paragraph text, **bold**, *italic*, [links](https://example.com).

> Blockquote
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

## Tips

- **Slug** = the filename (without `.mdx`). Use lowercase with hyphens.
- **Date** format: `YYYY-MM-DD`
- Posts are sorted by date — newest first.
- Reading time is calculated automatically.
- For Arabic posts, write the content in Arabic naturally — RTL is handled automatically.
