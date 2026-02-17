# Deploy to Vercel (lny-gold.vercel.app)

## Database: Neon only

The app uses **Neon** (Postgres) as the only database. Set `DATABASE_URL` to your Neon connection string so RSVPs persist across deployments.

### 1. Get your Neon connection string

1. Create a database at [Neon](https://neon.tech) (or use an existing one).
2. In the Neon dashboard, copy the connection string (use the **pooled** one for serverless, e.g. `postgresql://...@...-pooler....neon.tech/neondb?sslmode=require`).

### 2. Set `DATABASE_URL` on Vercel

1. In the [Vercel Dashboard](https://vercel.com), open your project (**lny-gold**).
2. Go to **Settings** → **Environment Variables**.
3. Add **`DATABASE_URL`** with your Neon connection string.
4. Apply to **Production** (and **Preview** if you want). Save.

### 3. Redeploy

Redeploy so the env var is used (e.g. push a commit or **Deployments** → **⋯** → **Redeploy**). After that, RSVPs will persist.

### Local development

Add `DATABASE_URL` to `birthday/.env` (your Neon connection string), then:

```bash
cd birthday
npm install
npm run dev
```

---

## Deploy via Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)** and sign in.

2. **Import or open the project:**
   - If **lny-gold** exists: open it.
   - If not: **Add New… → Project** → **Import** the repo **skyspeak/lny**.

3. **Configure:**
   - **Root Directory:** Set to **`birthday`**.
   - **Project Name:** **lny-gold** (optional).
   - **Environment Variables:** Set **`DATABASE_URL`** to your Neon connection string.

4. **Deploy.** The site will be at **https://lny-gold.vercel.app**.

5. **Later:** Pushes to `main` trigger new deployments. RSVPs persist as long as `DATABASE_URL` points to Neon.

## Deploy via Vercel CLI

```bash
cd birthday
vercel link   # pick existing project "lny-gold" if asked
vercel --prod
```

The `vercel.json` in this folder sets the project name to **lny-gold** so the URL is **lny-gold.vercel.app**.
