import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import * as mdx from "eslint-plugin-mdx";

export default defineConfig([
  // Ignored paths must come first
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  // Next.js base configs (includes jsx-a11y recommended + React + TS rules)
  ...nextVitals,
  ...nextTs,

  // Elevate key a11y/SEO rules to error on TS/TSX files
  // eslint-config-next already registers jsx-a11y; this block just overrides rule severity
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Images must have descriptive alt text
      "jsx-a11y/alt-text": "error",
      // Anchors must have content
      "jsx-a11y/anchor-has-content": "error",
      // Anchors must be valid (no href="#" dead links)
      "jsx-a11y/anchor-is-valid": "error",
      // aria-hidden must not cover focusable elements
      "jsx-a11y/no-aria-hidden-on-focusable": "error",
      // Headings must have text content (catches empty <h1> tags)
      "jsx-a11y/heading-has-content": "error",
      // Avoid "image", "photo", "icon" as alt text
      "jsx-a11y/img-redundant-alt": "error",
      // No redundant ARIA roles that duplicate semantic HTML
      "jsx-a11y/no-redundant-roles": "error",
    },
  },

  // MDX linting — enables JSX rules inside .mdx files
  {
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({ lintCodeBlocks: false }),
  },
]);
