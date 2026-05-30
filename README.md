# Learnova — Student Learning Dashboard

A high-fidelity, dark-mode student dashboard prototype built with **Next.js 15** (App Router), **Supabase**, **Tailwind CSS v4**, and **Framer Motion**. Fetches live course data from a Supabase PostgreSQL database and renders it in an animated Bento Grid layout.

---

## Architecture

### Server / Client Component Split

The application follows a deliberate server-first strategy:

| Layer | Component | Type | Rationale |
|-------|-----------|------|-----------|
| Data fetching | `page.tsx` → `DashboardContent` | **Server Component** | Fetches courses from Supabase at request time on the server. No client-side data fetching, no exposed API keys in the bundle. |
| Layout shell | `layout.tsx` | **Server Component** | Renders the HTML skeleton, loads fonts, sets metadata. |
| Loading state | `loading.tsx` | Server Component | Shows skeleton UI while the async server component streams. |
| Error boundary | `error.tsx` | **Client Component** | React error boundaries require client-side state (`reset` callback). |
| Sidebar | `Sidebar.tsx` | **Client Component** | Needs `useState` for active nav tracking and collapse state. Uses Framer Motion `layoutId` for animated indicator. |
| Bento Grid | `BentoGrid.tsx` | **Client Component** | Orchestrates staggered entrance animations via Framer Motion variants. |
| Course Tile | `CourseTile.tsx` | **Client Component** | Animated progress bar and hover interactions. |
| Hero Tile | `HeroTile.tsx` | **Client Component** | Hover scale animation. |
| Activity Tile | `ActivityTile.tsx` | **Client Component** | Staggered cell animation on the contribution grid. |
| Dynamic Icon | `DynamicIcon.tsx` | Server-compatible | Pure mapping function, no hooks. Works in both contexts. |

**Key principle:** Data flows **server → client**. The server component (`page.tsx`) fetches courses and passes them as serialized props to client components. This avoids waterfalls and keeps Supabase credentials server-side.

### Animation Strategy

All animations exclusively use `transform` and `opacity` to avoid layout shifts and browser repaints:

- **Staggered page load**: Parent `motion.div` uses `staggerChildren: 0.08` with children translating on Y-axis
- **Card hover**: `whileHover={{ scale: 1.012 }}` with spring physics (`stiffness: 300, damping: 20`)
- **Sidebar indicator**: `layoutId` prop enables Framer Motion's shared layout animation — the active background snaps between items
- **Progress bars**: Animate from `width: 0` to target width using spring physics, triggered by `useInView`
- **Contribution grid**: Each cell staggers in with `opacity` and `scale` transitions

### Responsive Breakpoints

| Breakpoint | Sidebar | Grid |
|------------|---------|------|
| Desktop (≥1024px) | Full sidebar with labels, collapsible | 3-column bento |
| Tablet (768–1024px) | Icon-only rail | 2-column bento |
| Mobile (<768px) | Bottom navigation bar + hamburger | Single column stack |

---

## Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd student-dashboard
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Open the SQL Editor and run the contents of `supabase-schema.sql`
3. Copy your project URL and anon key from **Settings → API**

### 3. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Tech Stack

- **Next.js 15** — App Router, Server Components, Suspense boundaries
- **Supabase** — PostgreSQL database with Row Level Security
- **Tailwind CSS v4** — Utility-first styling with CSS-native config
- **Framer Motion** — Spring-physics animations, layout animations
- **Lucide React** — Icon system with dynamic rendering
- **TypeScript** — Full type safety for database payloads

---

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Theme tokens, grain texture, skeleton shimmer
│   ├── layout.tsx        # Root layout (Server Component)
│   ├── page.tsx          # Dashboard page (Server Component, Supabase fetch)
│   ├── loading.tsx       # Skeleton loading state
│   └── error.tsx         # Error boundary (Client Component)
├── components/
│   ├── Sidebar.tsx       # Collapsible nav with layoutId animation
│   ├── BentoGrid.tsx     # Staggered tile grid
│   ├── HeroTile.tsx      # Welcome greeting + streak
│   ├── CourseTile.tsx    # Course card with progress bar
│   ├── ActivityTile.tsx  # Contribution heatmap
│   ├── DynamicIcon.tsx   # String → Lucide icon mapper
│   └── SkeletonTile.tsx  # Loading skeletons
├── lib/
│   └── supabase.ts       # Supabase client
└── types/
    └── database.ts       # TypeScript interfaces
```

---

## Challenges & Decisions

1. **Lucide icon dynamic rendering** — Lucide exports named components, not a lookup map. Built a converter that transforms kebab-case DB strings (`file-code-2`) to PascalCase component names (`FileCode2`) and performs a runtime lookup with a fallback.

2. **Tailwind v4 migration** — The project uses Tailwind v4's CSS-native configuration (`@theme inline` blocks) instead of the traditional `tailwind.config.ts`. Custom theme tokens are defined as CSS custom properties.

3. **Animation performance** — All Framer Motion animations are constrained to `transform` and `opacity` properties. The progress bar animates `width` but it's on an absolutely-positioned element inside a fixed-height track, so it doesn't trigger layout shifts.

4. **Sidebar responsiveness** — Rather than a single component that morphs, the sidebar renders three distinct navigation patterns (full sidebar, slide-in mobile menu, bottom bar) and toggles visibility via Tailwind responsive classes. Each has its own `layoutId` namespace to prevent cross-breakpoint animation conflicts.
