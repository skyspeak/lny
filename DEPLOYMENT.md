# Deploy to Vercel (lny-gold.vercel.app)

## Why the admin dashboard was empty after each deploy

The app used to store RSVPs in a SQLite file at `/tmp/lny-rsvp.db` when `DATABASE_URL` was not set on Vercel. On Vercel, `/tmp` is **ephemeral**: it is wiped on every new deployment and can differ between serverless invocations. So:

- Every new deployment → new instances → empty `/tmp` → no database file → admin dashboard showed 0 RSVPs.
- The dashboard page at `/admin` never “disappeared”; it was the **data** that was lost.

**Can you recover how many people had RSVP’d?** No. The app does not log RSVP counts anywhere (only `console.error` on failures). The only place that stored counts was the ephemeral SQLite file, so that number cannot be recovered from logs or the codebase.

## Fix: use a persistent database

The app now **requires** `DATABASE_URL` and uses **PostgreSQL** (e.g. Vercel Postgres). RSVPs are stored in that database and survive deployments.

### 1. Add a database on Vercel

1. In the [Vercel Dashboard](https://vercel.com), open your project (**lny-gold**).
2. Go to **Storage** → **Create Database** → choose **Postgres** (Vercel Postgres).
3. Create the database and connect it to your project (same project that has the `birthday` app).
4. Vercel will add env vars such as `POSTGRES_PRISMA_URL` or `POSTGRES_URL`. Use the one that works with Prisma (often the “Prisma” URL).

### 2. Set `DATABASE_URL`

1. In the project, go to **Settings** → **Environment Variables**.
2. Add (or override):
   - **Name:** `DATABASE_URL`
   - **Value:** the Postgres connection string (e.g. the value of `POSTGRES_PRISMA_URL` or `POSTGRES_URL` from the Storage tab).
3. Apply to **Production** (and Preview if you want RSVPs there too). Save.

### 3. Redeploy

Redeploy so the new env var is used (e.g. push a commit or trigger a redeploy from the Vercel dashboard). After that, RSVPs will persist and the admin dashboard will keep showing them across deployments.

### Local development

You need `DATABASE_URL` in `.env` as well (same Postgres URL or a local Postgres instance), for example:

```bash
# .env (do not commit real URLs)
DATABASE_URL="postgresql://..."   # from Vercel Postgres or your local Postgres
```

Then:

```bash
cd birthday
npm install
npm run dev
```

---

## Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)** and sign in (use the same account as **skyspeak-gmailcoms-projects**).

2. **Import or open the project:**
   - If **lny-gold** already exists: open it from your dashboard.
   - If not: click **Add New… → Project**, then **Import** the repo **skyspeak/lny**.

3. **Configure the project:**
   - **Root Directory:** Click **Edit** and set to **`birthday`** (the app lives in this folder).
   - **Project Name:** Set to **lny-gold** (so the URL is **lny-gold.vercel.app**).
   - **Framework Preset:** Next.js (auto-detected).
   - **Build Command:** `prisma generate && next build` (or leave default; `vercel.json` sets it).
   - **Install Command:** `npm install`.
   - **Environment Variables:** Ensure `DATABASE_URL` is set to your Vercel Postgres (or other Postgres) URL.

4. **Deploy:** Click **Deploy**. Vercel will build and deploy; your site will be at **https://lny-gold.vercel.app**.

5. **Later deploys:** Every push to the `main` branch on GitHub will trigger a new deployment to lny-gold.vercel.app. RSVPs will persist as long as `DATABASE_URL` points to a persistent Postgres database.

## Deploy via Vercel CLI (from your machine)

From your machine (with Vercel CLI and login already done):

```bash
cd birthday
vercel link --scope skyspeak-gmailcoms-projects   # pick existing project "lny-gold" when asked
vercel --prod
```

Or deploy and create/link in one go:

```bash
cd birthday
vercel --prod --scope skyspeak-gmailcoms-projects
```

When prompted for **Link to existing project?**, choose **lny-gold** if it already exists.

The `vercel.json` in this folder sets the project name to **lny-gold** so deployments use **lny-gold.vercel.app**.
