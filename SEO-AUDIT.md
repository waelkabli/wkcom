# SEO Audit — waelkabli.com

**Last audited:** October 27, 2026
**Site type:** Personal brand / executive portfolio (bilingual AR/EN, Next.js 16)
**Overall health:** Excellent. All technical and structural issues resolved. Remaining items are content/asset work only.

---

## All Fixes Applied (as of October 27, 2026)

### Session 1 (July 2026)
- LinkedIn typo in JSON-LD schema fixed
- x-default hreflang added everywhere
- next/font used (no render-blocking fonts)
- Blog page title fixed with keywords
- Not-found page created
- Security headers added
- Media page VideoObject/PodcastEpisode schema added
- OG images use real profile photo and cover-image branded cards

### Session 2 (October 27, 2026 — AM)
| Fix | Files |
|---|---|
| LinkedIn typo fixed (×3 occurrences) | `components/Contact.tsx`, `components/Footer.tsx` |
| Services pages added to sitemap | `app/sitemap.ts` |
| Sitemap date updated `2025-01-01` → `2026-10-27` | `app/sitemap.ts` |
| x-default aligned to `/ar` (matches root redirect) | 6 metadata files + sitemap |
| FAQPage + Service + BreadcrumbList schema on service pages | `app/[locale]/services/[slug]/page.tsx` |
| BreadcrumbList schema on blog posts | `app/[locale]/blog/[slug]/page.tsx` |
| Not-found page made locale-aware (AR/EN text + links) | `app/[locale]/not-found.tsx` |
| Non-functional SearchAction removed from WebSite schema | `app/[locale]/page.tsx` |
| `llms.txt` created for AI crawlers | `public/llms.txt` |

### Session 2 (October 27, 2026 — PM)
| Fix | Files |
|---|---|
| seoTitle added to 4 long-title EN posts | 4 MDX files |
| x.com/waelkabli added to sameAs | `app/[locale]/page.tsx` |
| speakable added to BlogPosting schema | `app/[locale]/blog/[slug]/page.tsx` |
| Dedicated `/about` page created (bilingual, Person schema, AI-crawlable) | `app/[locale]/about/page.tsx` |
| About page added to sitemap (priority 0.9) | `app/sitemap.ts` |

---

## What's Currently Done Well

- Canonical tags correct on all pages across locales
- Hreflang fully reciprocal with x-default (aligned to `/ar`) on all pages
- JSON-LD on: homepage (Person + WebSite), blog posts (BlogPosting + BreadcrumbList + speakable), media (VideoObject + PodcastEpisode), service pages (Service + FAQPage + BreadcrumbList), about page (Person)
- GA4 wired with `afterInteractive` — no performance impact
- OG + Twitter cards on every page including per-post branded cover images
- robots.txt clean — blocks only `/admin` and `/api/`
- Sitemap covers all pages: homepage, about, blog, media, 5 service pages, 43×2 blog posts
- Arabic content genuinely translated — not machine-duplicated
- RTL layout properly implemented (`dir`, locale-aware fonts, mirrored UI)
- next/font used — no render-blocking fonts
- next/image used throughout
- Security headers in vercel.json
- llms.txt at `/llms.txt` for AI crawlers (ChatGPT, Perplexity, Claude, Gemini)
- Locale-aware 404 page
- Dedicated `/about` page (bilingual, structured bio, AI-extractable facts)
- speakable spec on all blog posts for voice search
- x.com/waelkabli in sameAs (LinkedIn + Twitter + X)

---

## Remaining Work (content/asset only — no code needed)

### High value
1. **Add `coverImage` to 31 posts without one** — posts fall back to text-only OG card; posts with cover get the full branded split-panel card. Prioritize high-traffic posts (digital health, Cura, Saudi health system).

2. **Add TL;DR direct-answer blocks to top blog posts** — for AI citation and featured snippets. Add after the opening paragraph:
   ```mdx
   > **In short:** [One direct sentence answering the post's central question.]
   ```
   Priority posts: building-cura-lessons, ai-in-digital-health, gave-customer-100-sar, digital-health-companies-sell-outcomes, health-transformation-institutional-build.

### Medium value
3. **Create Wikidata entry** — the single highest-leverage AI entity fix. A verified Wikidata Q-number in `sameAs` enables ChatGPT/Perplexity/Claude to confidently cite Wael as a verified entity, not just a probable match.

4. **Add `updatedAt` frontmatter** when making significant edits to existing posts. This is already supported in code — just use it.

5. **Add HowTo schema to numbered-process posts** — "5 Lessons From Building Saudi Arabia's First Virtual Hospital", "How to Fail the Right Way". Requires reading each post and generating step-by-step schema.

### Nice to have
6. **Add authoritative external profiles to sameAs** — Crunchbase, Forbes ME profile URL, any alumni network profiles. Each addition strengthens entity graph for AI systems.

7. **Arabic TL;DR blocks** — same as item 2 but for Arabic posts.
