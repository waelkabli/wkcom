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
