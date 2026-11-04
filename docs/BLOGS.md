# Blogs: how it works and where the files are

All blogs come from **Strapi**. Nothing is written into the code any more. To add or change a blog, edit it in Strapi and click **Publish**. The website picks up the change within **60 seconds**.

- **Strapi API:** `http://43.204.46.6:1337/api/blogs`
- **Base URL setting:** `NEXT_PUBLIC_STRAPI_URL` in [.env](../.env)

---

## 1. Quick map: which file does what

| I want to change… | Open this file |
|---|---|
| The blog **listing page** (`/blogs`) | [src/app/blogs/page.jsx](../src/app/blogs/page.jsx) |
| The blog **detail page** (`/blogs/<slug>`) | [src/app/blogs/[slug]/page.jsx](../src/app/blogs/[slug]/page.jsx) |
| The article body, "In This Article" list, share buttons, career box | [src/components/blogs/BlogDetailContent.jsx](../src/components/blogs/BlogDetailContent.jsx) |
| The card grid and Blogs / News / Case Studies tabs on the listing page | [src/components/shared/PostListing.jsx](../src/components/shared/PostListing.jsx) |
| One blog card (image + title) | [src/components/shared/BlogListCard.jsx](../src/components/shared/BlogListCard.jsx) |
| The Blogs tab on `/insights` | [src/app/insights/page.jsx](../src/app/insights/page.jsx) and [src/components/insights/InsightsTabs.jsx](../src/components/insights/InsightsTabs.jsx) |
| Blogs in the site search | [src/app/search/page.jsx](../src/app/search/page.jsx) |
| The function that calls Strapi | [src/lib/catalog.js](../src/lib/catalog.js) → `fetchStrapi()` |
| How Strapi images load on the site | [next.config.mjs](../next.config.mjs) → the `/uploads` rewrite |
| Blog styles (CSS) | [public/assets/css/main.css](../public/assets/css/main.css) (search for `.blog-`) |

---

## 2. Strapi fields used

| Strapi field | Used for | If it's empty |
|---|---|---|
| `Heading` | Blog title | The blog is not shown |
| `slug` | The URL: `/blogs/<slug>` | The blog is **not shown**. Fill it and Publish. |
| `Content` | Article body (HTML). Each `<h2>` becomes an item in "In This Article". | Empty article |
| `Excerpt` | Short text on Related Article cards and the meta description | First 160 characters of the article |
| `Date` | Date shown on the page | `publishedAt` (changes each time you republish) |
| `ReadTime` | "X min read" | Worked out from word count (200 words a minute) |
| `MetaSection` → `MetaTitle`, `MetaDescription`, `MetaKeyword`, `MetaRobots` | SEO tags on the detail page | Title = `<Heading> \| EWAC`; description = Excerpt / first paragraph |
| `related_articles` | The "Related Articles" section (up to 3) | The section is **hidden** |
| `Banner` | *Not used.* The banner is the fixed image `blogs-banner.webp`. | — |
| `blogs` | *Not used.* It's the reverse side of `related_articles`. | — |

**Card image:** Strapi has no card image field, so each card uses the **first image inside the article** (`Content`). If an article has no image, the card shows `blogs-banner.webp`.

**Important:** the API only returns the **published** version of a blog. A change saved as a draft (Save without Publish) won't show on the site.

---

## 3. Listing page: `/blogs`

**File:** [src/app/blogs/page.jsx](../src/app/blogs/page.jsx)

| Part | Line | What it does |
|---|---|---|
| `metadata` | [7](../src/app/blogs/page.jsx#L7) | Page title and description for Google |
| `revalidate = 60` | [12](../src/app/blogs/page.jsx#L12) | Refreshes the data from Strapi every 60 seconds |
| `BlogsPage()` | [14](../src/app/blogs/page.jsx#L14) | The page itself |
| `fetchStrapi("/api/blogs?...")` | [15](../src/app/blogs/page.jsx#L15) | Gets all blogs, newest first, up to 100 |
| `cards = blogs.filter(...).map(...)` | 19 | Skips blogs without a Heading or slug, then builds `{ image, title, href }` for each card |

**API call:**
```
/api/blogs?sort=publishedAt:desc&pagination[pageSize]=100
```
`pagination[pageSize]=100` matters because Strapi returns only 25 by default.

**Flow:** Strapi → `cards` → `<PostListing cards={cards} />` → one `<BlogListCard />` per blog.

---

## 4. Detail page: `/blogs/<slug>`

**File:** [src/app/blogs/[slug]/page.jsx](../src/app/blogs/[slug]/page.jsx)

| Function | Line | What it does |
|---|---|---|
| `formatDate(iso, month, day)` | [14](../src/app/blogs/[slug]/page.jsx#L14) | Turns `2026-11-04` into "November 4, 2026" (or "Nov 04, 2026" on cards) |
| `toPost(blog)` | [23](../src/app/blogs/[slug]/page.jsx#L23) | Converts a Strapi blog into what the page needs (see below) |
| `getPost(slug)` | [49](../src/app/blogs/[slug]/page.jsx#L49) | Gets **one** blog by its slug, plus its related articles |
| `generateMetadata()` | [60](../src/app/blogs/[slug]/page.jsx#L60) | Sets the SEO tags (title, description, keywords, robots) from `MetaSection` |
| `BlogDetailPage()` | [73](../src/app/blogs/[slug]/page.jsx#L73) | The page itself. Shows a 404 page if the slug isn't found. |

**API call in `getPost`:**
```
/api/blogs?filters[slug][$eq]=<slug>&populate=*
```
- `filters[slug][$eq]=<slug>` finds the blog whose slug matches.
- `populate=*` also returns linked data (`MetaSection`, `related_articles`). Without it, Strapi leaves those out.

**What `toPost(blog)` returns:**

| Key | From |
|---|---|
| `slug`, `title` | `slug`, `Heading` |
| `image` | First `<img>` in `Content` |
| `date` | `Date`, or `publishedAt` |
| `readMinutes` | `ReadTime`, or word count ÷ 200 |
| `description` | `Excerpt`, or the first 160 characters |
| `meta` | `MetaSection[0]` |
| `blocks` | `Content` split at each `<h2>`: `{ type: "h2", html }` for headings, `{ type: "html", html }` for the text between |

`toPost` also changes image links from `http://43.204.46.6:1337/uploads/...` to `/uploads/...` (see section 7).

**Page sections, top to bottom:**
1. Banner (`/assets/images/blogs/blogs-banner.webp`, fixed)
2. Breadcrumb: Blogs › title
3. Title, date, read time, main image
4. `<BlogDetailContent />`: "In This Article", the article, share buttons and career box
5. **Related Articles**: only the blogs picked in `related_articles`, at most 3; hidden when none are picked
6. **More Topics**: fixed links to industry pages (the `topics` list in the same file)
7. Consult section

---

## 5. Article body component

**File:** [src/components/blogs/BlogDetailContent.jsx](../src/components/blogs/BlogDetailContent.jsx) (runs in the browser, `"use client"`)

| Part | Line | What it does |
|---|---|---|
| `getSectionTitle(html)` | [5](../src/components/blogs/BlogDetailContent.jsx#L5) | Strips tags from a heading for the "In This Article" list |
| `BlogDetailContent({ blocks, title })` | [14](../src/components/blogs/BlogDetailContent.jsx#L14) | Renders the 3 columns |
| `sections` (useMemo) | inside | List of `h2` blocks, which become "In This Article" |
| IntersectionObserver (useEffect) | inside | Highlights the heading you are reading while you scroll |
| `shareArticle(platform)` | inside | LinkedIn, Facebook and email share buttons |

---

## 6. Other places that show blogs

| Where | File | What it does |
|---|---|---|
| `/insights` Blogs tab | [src/app/insights/page.jsx](../src/app/insights/page.jsx) line [17](../src/app/insights/page.jsx#L17) | Gets the 9 newest blogs and passes them to `<InsightsTabs blogCards={...} />` |
| Tabs component | [src/components/insights/InsightsTabs.jsx](../src/components/insights/InsightsTabs.jsx) line [21](../src/components/insights/InsightsTabs.jsx#L21) | Blogs tab from Strapi; **News and Case Studies are still static** in [blogData.js](../src/components/blogs/blogData.js) |
| Site search | [src/app/search/page.jsx](../src/app/search/page.jsx) line [69](../src/app/search/page.jsx#L69) | Gets only `Heading` and `slug` of every blog and adds them to the search results |
| ⚠️ Homepage blog slider | [src/lib/insights.js](../src/lib/insights.js) → `getBlogPostCards()` line [13](../src/lib/insights.js#L13) | **Not dynamic yet.** It calls the old `/api/blog-posts` endpoint (403 error) and falls back to static `BLOG_CARDS` in `src/components/home/uniSliderData.js` |

---

## 7. Shared helpers

**`fetchStrapi(path)`** in [src/lib/catalog.js](../src/lib/catalog.js#L12)
- Calls `NEXT_PUBLIC_STRAPI_URL + path` and returns the `data` array.
- Caches for 60 seconds.
- Returns `[]` if Strapi is down or returns an error, so pages don't crash. The blog list will just be empty.

**`/uploads` rewrite** in [next.config.mjs](../next.config.mjs#L13)
- `/uploads/...` on our site is forwarded to Strapi's `/uploads/...`.
- This lets images load from our own domain, so HTTPS pages don't block `http://` Strapi images.

---

## 8. Styles (CSS)

All in [public/assets/css/main.css](../public/assets/css/main.css):

| Class | Line | Part |
|---|---|---|
| `.blog-page-banner` | [72](../public/assets/css/main.css#L72) | Banner height and crop |
| `.blog-toolbar` | [83](../public/assets/css/main.css#L83) | Breadcrumb bar |
| `.blog-list-card`, `.blog-list-title` | [159](../public/assets/css/main.css#L159) | Cards on the listing page |
| `.insights-tabs-section` | [243](../public/assets/css/main.css#L243) | Card grid and tabs wrapper |
| `.blog-detail-section` | [2034](../public/assets/css/main.css#L2034) | Detail page wrapper |
| `.blog-article-grid`, `.blog-article-toc` | [2310](../public/assets/css/main.css#L2310) | 3-column layout and "In This Article" |
| `.blog-article-content` | [2378](../public/assets/css/main.css#L2378) | Article text, lists and images |
| `.blog-article-aside` | [2432](../public/assets/css/main.css#L2432) | Share and career boxes |
| `.blog-related-section` | [2513](../public/assets/css/main.css#L2513) | Related Articles |
| `.blog-topics-section` | [2632](../public/assets/css/main.css#L2632) | More Topics |

Line numbers move as the file is edited. If one is off, search for the class name.

---

## 9. Common tasks

**Add a new blog:** in Strapi, create it, fill **Heading**, **slug** and **Content**, then **Publish**. It appears on `/blogs`, `/insights` and in search within a minute.

**Blog not showing?**
1. Is it **published**? Saving alone isn't enough.
2. Is **slug** filled in? Blogs without a slug are skipped.
3. Wait 60 seconds and refresh.
4. Open `http://43.204.46.6:1337/api/blogs` in the browser and check that the blog is there with its slug.

**Show related articles:** open the blog in Strapi, choose blogs in **related_articles**, then **Publish**.

**Change the date or read time shown:** fill **Date** or **ReadTime** in Strapi. Otherwise they're worked out automatically.

**Change SEO title or description:** fill **MetaSection → MetaTitle / MetaDescription**. Tip: don't put "EWAC Alloys Limited" as the MetaTitle on every blog, or they will all have the same Google title. Leave it empty to use the blog heading.

**Change how cards look:** edit [BlogListCard.jsx](../src/components/shared/BlogListCard.jsx) and the `.blog-list-*` CSS.
