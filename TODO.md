# ishanperera.com — Tomorrow's To-Do List

## Current State (Feb 23, 2026 — End of Day)

**Done today:**
- All pages built and compiling (0 TS errors)
- Real CV data populated: 11 publications, timeline, skills, ventures, bio
- Headshot wired up on `/about` page via `next/image`
- GitHub username set to `ishanperera` (repos auto-populating)
- Two commits on master branch
- Dev server and production build both pass

**What's live:**
- `/` — Landing page (hero, bento grid, featured work, CTA)
- `/about` — Real bio, timeline (14 events), skills (from CV), hobbies (6 cards)
- `/research` — 11 real publications with search/filter + 8 "in progress" items
- `/projects` — Ravana Solutions, EZ Inn, HOLO Labs + GitHub repos
- `/blog` — 1 sample post ("Why Neurosurgeons Should Learn to Code")
- `/contact` — Form (needs Resend API key to function)

---

## Priority 1: Content Refinement

### 1.1 Verify & Polish Content
- [ ] Review all publication entries for accuracy (check DOIs load correctly)
- [ ] Double-check timeline dates against CV (especially HOLO Labs founding date)
- [ ] Review bio text on `/about` for voice/tone — make it feel authentically you
- [ ] Verify social links are correct (LinkedIn URL, Twitter handle)

### 1.2 Featured Work Section
- [ ] Replace the three placeholder gray boxes on the landing page Featured Work with real visuals (screenshots, diagrams, or styled gradient cards)
- [ ] Consider linking the Chiari paper directly to the Frontiers DOI

### 1.3 Blog
- [ ] Write 1-2 more blog posts to populate the grid (or plan topics)
- [ ] Ideas from your background: "From EMT to Neurosurgeon", "Building DRPLAP", "Chiari Malformation Research Journey"

---

## Priority 2: Visual Polish

### 2.1 Images & Assets
- [ ] Create a custom favicon ("IP" monogram) — replace `src/app/favicon.ico`
- [ ] Consider adding a Ravana Solutions logo/screenshot to the venture showcase card
- [ ] Test headshot image quality at different sizes (it's 5MB — may want to optimize)

### 2.2 Responsive & Theme Testing
- [ ] Test on a real mobile device (not just browser resize)
- [ ] Check dark and light mode on every page
- [ ] Verify the bento grid card heights balance at tablet width
- [ ] Check text contrast for `text-muted` colors in light mode

### 2.3 Animations
- [ ] Review animation timing — are stagger delays too slow or fast?
- [ ] Test `prefers-reduced-motion` (should already work)
- [ ] Consider adding the scroll progress bar (not yet implemented)

---

## Priority 3: Functional Features

### 3.1 Contact Form
- [ ] Create a Resend account at https://resend.com
- [ ] Get API key, create `.env.local`:
  ```
  RESEND_API_KEY=re_xxxxx
  CONTACT_EMAIL=ishanperera07@gmail.com
  GITHUB_TOKEN=ghp_xxxxx  (optional, for higher rate limits)
  NEXT_PUBLIC_SITE_URL=https://ishanperera.com
  ```
- [ ] Test the contact form end-to-end

### 3.2 Active Nav Link Highlighting
- [ ] Highlight current page in the navbar using `usePathname()`

### 3.3 Scroll Progress Bar
- [ ] Add a thin progress bar at the top of the page (accent-primary color, grows with scroll)

---

## Priority 4: Performance & Accessibility

- [ ] Run Lighthouse audit — target 90+ across all categories
- [ ] Optimize headshot image (5MB is large — consider compressing or converting to WebP)
- [ ] Add `alt` text audit for all images
- [ ] Verify keyboard navigation (tab through nav, forms, links)
- [ ] Check color contrast ratios (WCAG AA)

---

## Priority 5: Deployment

### 5.1 GitHub
- [ ] Create GitHub repo
- [ ] `git remote add origin <url> && git branch -m main && git push -u origin main`

### 5.2 Vercel
- [ ] Import project on Vercel
- [ ] Add environment variables
- [ ] Deploy and verify all pages
- [ ] Configure custom domain `ishanperera.com`

### 5.3 Post-Deploy
- [ ] Test OG image (share link preview on Twitter/LinkedIn)
- [ ] Verify `ishanperera.com/sitemap.xml`
- [ ] Test contact form in production
- [ ] Run Lighthouse on deployed URL

---

## Priority 6: Nice-to-Haves (Future)

- [ ] JSON-LD structured data (Person schema)
- [ ] RSS feed for blog (`/feed.xml`)
- [ ] Analytics (Vercel Analytics or Plausible)
- [ ] Resume/CV download button on About page (serve the PDF)
- [ ] Publication links to PubMed/Google Scholar
- [ ] Site-wide search (cmd+K)
- [ ] Newsletter signup
- [ ] Poster presentations section on Research page (19 posters from CV)
- [ ] Grants section on Research page ($33K+ from CV)
- [ ] Product Development section on Projects page (DRPLAP, Naloxone Carrier, etc.)

---

## File Reference

| What | Where |
|------|-------|
| Site config (name, social, GitHub) | `src/data/site.ts` |
| Navigation links | `src/data/navigation.ts` |
| Publications (11 real + 8 in-progress) | `src/data/publications.ts` |
| Timeline (14 events) | `src/data/timeline.ts` |
| Skills (from CV) | `src/data/skills.ts` |
| Ventures (Ravana, EZ Inn, HOLO Labs) | `src/data/projects.ts` |
| Blog posts | `src/content/blog/*.mdx` |
| Color palette | `src/app/globals.css` |
| Headshot | `public/headshot.jpg` |
| CV source | `media/Current - Ishan - CV-3.pdf` |
| Environment vars | `.env.local` (create from `.env.local.example`) |
