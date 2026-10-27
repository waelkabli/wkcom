@AGENTS.md

---

# Website: waelkabli.com

Personal website and blog for Wael A. Kabli — serial tech entrepreneur, digital health pioneer, strategic advisor. Built with Next.js 16, next-intl (i18n), Tailwind CSS v4, MDX blog.

## Site structure

```
app/
  layout.tsx               # Root layout (metadataBase: https://waelkabli.com)
  [locale]/
    layout.tsx             # Locale layout (ar/en), fonts, GTM, direction (dir=rtl/ltr)
    page.tsx               # Homepage
    blog/
      page.tsx             # Blog listing
      [slug]/
        page.tsx           # Blog post page
        opengraph-image.tsx # Dynamic OG image (branded card with cover photo)
components/                # Shared: Navigation, Footer, etc.
content/
  posts/ar/                # Arabic MDX posts
  posts/en/                # English MDX posts
  BLOG_GUIDE.md            # ← Blog writing rules (read this before writing posts)
lib/blog.ts                # Post parsing (MDX frontmatter + content)
messages/ar.json           # Arabic UI strings
messages/en.json           # English UI strings
public/images/             # All images (posts, profile, etc.)
app/globals.css            # Global CSS + Tailwind config (brand tokens, prose styles)
```

## Languages and direction

- `ar` = Arabic, RTL (`dir="rtl"`), Thmanyah font
- `en` = English, LTR (`dir="ltr"`), Poppins (headings) + Plus Jakarta Sans (body)
- Every page and post must exist in BOTH languages
- Bilingual rule: writing or editing one language → always update the other

## Design tokens (brand colors)

```css
--brand-red:         #ff325d   /* primary CTA, accents */
--brand-purple:      #2d185c   /* text, dark backgrounds */
--brand-deep-purple: #412384   /* secondary */
--brand-light-bg:    #f8f7ff   /* page background */
--brand-border:      #e8e4f5   /* borders */
```

## Blog posts — key rules

@content/BLOG_GUIDE.md

## What NOT to do

- Never put the same image in both `coverImage` frontmatter AND the post body
- Never add only one language — always do both AR and EN
- Never use `font-family` in inline styles — use CSS classes or globals.css
- Never touch `node_modules/` or generated files like `tsconfig.tsbuildinfo`
- Never hardcode colors — use brand tokens or Tailwind classes

---

## SEO & AI SEO Standards

These rules are enforced automatically: ESLint (structural) and pre-commit hooks (content/i18n). Read before writing any page, component, or post.

### Heading structure
- One `<h1>` per page — never more, never zero
- Never skip levels (H1 → H3 without H2)
- Headings must have text content — ESLint will error on empty headings

### Metadata character limits
| Field | Target | Hard limit |
|---|---|---|
| Page `<title>` / post `title` | 50–60 chars | Error at >70 if no `seoTitle` |
| `seoTitle` frontmatter override | ≤ 55 chars | Error if exceeded |
| `excerpt` / meta description | 80–165 chars | Warning if outside range |

### JSON-LD schema — required per page type
| Page | Required schemas |
|---|---|
| Homepage | `Person`, `WebSite` |
| Blog post | `BlogPosting`, `BreadcrumbList`, `speakable` |
| Service page | `Service`, `FAQPage`, `BreadcrumbList` |
| About page | `Person` |
| Media page | `VideoObject` and/or `PodcastEpisode` per item |

### MDX frontmatter — mandatory fields
- All posts: `type`, `date` (YYYY-MM-DD format), `tags[]`
- `article` type additionally: `title`, `excerpt`, `format`
- Recommended when applicable: `seoTitle` (when title > 60 chars), `coverImage`, `updatedAt`

### Bilingual parity
- Every page and post must exist in both `ar` and `en`
- `messages/en.json` and `messages/ar.json` must have matching keys — pre-commit will block mismatches
- `x-default` hreflang always points to `/ar` — matches the root `redirect('/ar')` in `app/page.tsx`

### Image alt text
- All `<Image>` and `<img>` elements require non-empty `alt` — enforced by ESLint
- Purely decorative images: `alt=""` with `role="presentation"`
- Never use `alt="image"`, `alt="photo"`, `alt="icon"`, or filenames as alt text

### Link quality
- No dead `href="#"` without purpose — ESLint will warn
- LinkedIn handle: `waelkabli` (2 l's — 3-l typo is blocked by pre-commit)

### RTL / Tailwind logical utilities
Use logical utilities so layout mirrors correctly in RTL:
| Avoid | Use instead |
|---|---|
| `ml-*`, `mr-*` | `ms-*`, `me-*` |
| `pl-*`, `pr-*` | `ps-*`, `pe-*` |
| `text-left`, `text-right` | `text-start`, `text-end` |

### sameAs profiles (Person schema)
Verified authoritative profiles for `sameAs` array:
- `https://www.linkedin.com/in/waelkabli`
- `https://x.com/waelkabli`
- Add Wikidata Q-number and Crunchbase URL when created (see SEO-AUDIT.md)

### AI SEO (GEO/AEO) requirements
- `public/llms.txt` must remain intact — signals to ChatGPT, Perplexity, Claude, Gemini crawlers
- `speakable` spec must stay on all `BlogPosting` schemas
- `FAQPage` must stay on all service pages
- Add TL;DR direct-answer block after opening paragraph for high-traffic posts:
  ```mdx
  > **In short:** [One direct sentence answering the post's central question.]
  ```
