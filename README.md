# Shri Kanhaiya Traders — Website

Website and admin panel for **Shri Kanhaiya Traders**, a family-run building-materials & paints shop.
Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4**.

- Customer site: products, search, categories, paint guide, brands, about, contact, FAQs, festival greetings
- Enquiries & quotations: web form, "enquiry list" for many items, and pre-filled WhatsApp messages
- **Admin panel at `/admin`** — manage everything without touching code
- **English / Hindi** — switch the whole site from Admin → Settings
- **Automatic festival posters** for Hindu festivals (Diwali, Holi, Navratri, Chhath…)

---

## 1. Run it

Requires **Node.js 20.9+**.

```bash
npm install
cp .env.example .env      # then fill in the admin login (see below)
npm run dev               # http://localhost:3000   (development)

npm run build && npm start   # production
```

### `.env` — only the admin login

```env
ADMIN_LOGIN_MAIL=owner@example.com
ADMIN_LOGIN_PHONE=98XXXXXXXX
ADMIN_PASSWORD='your-strong-password'
```

- Sign in at **`/admin`** with either the email **or** the phone number, plus the password.
- Keep the password inside **single quotes** — otherwise a `#` or `$` in it breaks the file.
- Changing the password signs out every existing admin session.
- Optional: `DATA_DIR=/path/to/data` to store data outside the project, `SESSION_SECRET=…` for a separate cookie-signing secret.

Restart the server after editing `.env`.

---

## 2. Admin panel (`/admin`)

| Section | What you manage |
| --- | --- |
| **Dashboard** | New enquiries, a setup checklist, festival status, **Download backup** |
| **Enquiries** | Every form submission · status New → Contacted → Quoted → Completed · private notes · one-tap WhatsApp / call reply · export to Excel (CSV) |
| **Products** | Add / edit / delete / reorder · photos · English + Hindi text · featured · availability · search keywords |
| **Categories** | Building-material and paint categories, icons, descriptions |
| **Brands** | Brand names and logos (sample brands are marked *Sample* until you confirm them) |
| **Team** | Family members on the About page, with photos |
| **Reviews** | Genuine customer reviews (sample / hidden reviews never appear publicly) |
| **FAQs** | Questions and answers |
| **Festivals** | Switch individual festival posters on/off, preview & download posters |
| **Settings** | **Language**, phone, WhatsApp, email, address, Google Maps, business hours, announcement bar, homepage video, social links, website URL, enquiry webhook |

Every change appears on the website immediately — no rebuild needed.

---

## 3. Where data lives

```
storage/                 ← created automatically on first start (git-ignored)
  content.json           ← settings, products, categories, brands, team, reviews, FAQs
  enquiries.json         ← customer enquiries
  uploads/               ← images & videos uploaded in the admin panel
```

- **Back up `storage/`** regularly (or use *Download backup* in the dashboard).
- On first start the store is filled from the sample data in `src/data/*.ts`.
- Writes are atomic (temp file + rename) and serialised, so the JSON files never corrupt.
- To move to a database later, re-implement the functions in `src/server/store.ts` — pages and admin screens only use those functions.

---

## 4. Hosting

Because content is saved to disk, host it where the filesystem persists:

- **VPS / cloud VM** (any provider): `npm ci && npm run build && npm start` behind Nginx/Caddy, e.g. with `pm2`.
- **Railway / Render / Fly.io** with a persistent volume mounted at `storage/` (or set `DATA_DIR`).
- **Docker**: mount a volume for `/app/storage`.

Serverless hosts with a read-only filesystem (e.g. Vercel) will not keep admin changes.

After going live, set **Admin → Settings → Website address** to your real URL (used for Google, sitemap and share links).

---

## 5. Festival posters

- The calendar is in `src/data/festivals.ts` (dates from Drik Panchang, 2026–2028).
- A poster appears automatically *N* days before and after each festival (set in Admin → Settings).
- Posters are drawn in the browser on a canvas — Hindi text renders correctly, and customers can download or share them on WhatsApp.
- **Before the last year runs out, add the next year's dates** to each festival in `src/data/festivals.ts` (the admin dashboard reminds you).

---

## 6. Media & credits

- 3D icons: Microsoft **Fluent Emoji** (MIT licence) — `public/icons/3d/`
- Stock photos / video: free-licence sources, listed with authors in `public/media-credits.json`
- Replace sample photos with your own from Admin → Products (photos of your actual stock build more trust).

---

## 7. Project structure

```
src/
  app/(site)/        public pages (/, /products, /products/[product], /paints, /building-materials,
                     /brands, /about, /contact, /quote, /faq, /festivals, /privacy, /terms, 404)
  app/admin/         admin login + panel
  app/api/admin/     image/video upload, backup download
  app/uploads/       serves uploaded files (with range requests for video)
  components/        UI (catalog, enquiry, festival, home, layout, sections, ui)
  data/              seed data + festival calendar
  i18n/              English & Hindi UI text
  lib/               catalogue search, contact links, festivals, admin schema
  server/            store (file DB), auth, server actions
  proxy.ts           protects /admin
```

---

## 8. Things to review before launch

- [ ] Admin → Settings: phone, WhatsApp, email , address, map, hours
- [ ] Admin → Brands: keep only brands you actually sell, untick *Sample*
- [ ] Admin → Products: add your real products & photos, remove the samples you don't stock
- [ ] Admin → Team: upload photos of Girish Kumar Agrawal and Deepak Mittal
- [ ] Admin → Reviews: add genuine reviews (with customers' permission)
- [ ] Admin → Settings → Website address: your live domain
