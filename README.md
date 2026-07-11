# Smart Electronics 🛍️

Chikkamagaluru's premier destination for premium electronics. Built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion, and Lucide React.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix primitives)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** GitHub Pages

## Pages

| Page     | Route      | Description                           |
| -------- | ---------- | ------------------------------------- |
| Home     | `/`        | Hero, features, categories, products, brands, offers, services, testimonials, FAQ |
| Products | `/products` | Full catalog with search, filters, sorting, grid/list views |
| Brands   | `/brands`  | All partnered brands with collections |
| Offers   | `/offers`  | Current promotions and deals          |
| Services | `/services`| Repair, installation, and support services |
| About    | `/about`   | Company story, team, values           |
| Contact  | `/contact` | Contact form, map, quick links        |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start development server   |
| `npm run build`   | Build for production       |
| `npm run start`   | Start production server    |
| `npm run lint`    | Run ESLint                 |
| `npm run type-check` | Run TypeScript checks   |

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions on every push to `main`.

## Design System

- **Colors:** Graphite, Slate, Soft white, Muted blue, Soft cyan
- **Mode:** Light/Dark support via Tailwind `dark:` variant
- **Accessibility:** Skip-to-content, aria labels, focus-visible rings, reduced-motion support
- **SEO:** Open Graph, Twitter Cards, JSON-LD structured data, sitemap
