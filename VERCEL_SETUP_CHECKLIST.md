# Vercel Postgres setup checklist (do this once)

Do these steps in order. Takes about 2 minutes.

## 1. Open your project

→ **[Vercel Dashboard → Your Projects](https://vercel.com/dashboard)**  
→ Open project **lny-gold** (or whatever your project name is).

## 2. Create a Postgres database

→ In the project, click the **Storage** tab.  
→ **Create Database** → choose **Postgres** (or **Neon** if Vercel suggests it).  
→ Create it and **connect it to this project** when asked.  
→ After creation, open the new database and go to the ****.env** or **Variables** tab** — you’ll see something like `POSTGRES_PRISMA_URL` or `POSTGRES_URL`. Copy that value (the long URL).

## 3. Set DATABASE_URL

→ In the project, go to **Settings** → **Environment Variables**.  
→ **Add New**:  
  - **Key:** `DATABASE_URL`  
  - **Value:** paste the URL you copied (e.g. `POSTGRES_PRISMA_URL`)  
  - **Environments:** check Production (and Preview if you want).  
→ **Save**.

## 4. Redeploy

→ **Deployments** tab → open the latest deployment → **⋯** → **Redeploy** (no need to clear cache).  
Or push a new commit to trigger a deploy.

After this, the admin dashboard will keep RSVPs across deployments.
