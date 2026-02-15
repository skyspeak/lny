# Deploy to Vercel (lny-gold.vercel.app)

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

4. **Deploy:** Click **Deploy**. Vercel will build and deploy; your site will be at **https://lny-gold.vercel.app**.

5. **Later deploys:** Every push to the `main` branch on GitHub will trigger a new deployment to lny-gold.vercel.app.

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

## Note on database

The app uses SQLite locally. On Vercel (serverless), the file-based SQLite database is not persistent. For production you can:

- Use **Vercel Postgres** (or another hosted DB), then set `POSTGRES_PRISMA_URL` (or your DB URL) in the project’s Environment Variables and point Prisma to that in production, or  
- Keep the current setup for a demo and accept that RSVPs may not persist across serverless invocations.

The `vercel.json` in this folder sets the project name to **lny-gold** so deployments use **lny-gold.vercel.app**.
