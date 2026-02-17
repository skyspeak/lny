# Neon + Vercel setup checklist (do this once)

## 1. Open your project

→ **[Vercel Dashboard](https://vercel.com/dashboard)**  
→ Open project **lny-gold** (or your project name).

## 2. Get Neon connection string

→ **[Neon Console](https://console.neon.tech)**  
→ Create or open a project → copy the **connection string** (use the **pooled** URL for serverless).

## 3. Set DATABASE_URL on Vercel

→ In the Vercel project: **Settings** → **Environment Variables**.  
→ **Add New**:  
  - **Key:** `DATABASE_URL`  
  - **Value:** your Neon connection string  
  - **Environments:** Production (and Preview if you want).  
→ **Save**.

## 4. Redeploy

→ **Deployments** → latest deployment → **⋯** → **Redeploy**.  
Or push a new commit.

After this, the admin dashboard will keep RSVPs across deployments.
