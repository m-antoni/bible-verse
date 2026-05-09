# Docker Setup for BibleVerse App

## Prerequisites

- Docker Desktop installed (or Docker Engine + docker-compose plugin)
- Node.js 22+ (only needed for local dev, not for Docker build)
- `.env.local` file with all required variables (already exists in this repo)

## Files Modified

| File | Change |
|---|---|
| `next.config.ts` | Added `output: 'standalone'` for minimal Docker image |

## Files Created

| File | Purpose |
|---|---|
| `Dockerfile` | Multi-stage production build (deps -> builder -> runner) |
| `Dockerfile.dev` | Development image with hot-reload support |
| `docker-compose.yml` | Defines the app service with ports, env vars, and build args |
| `.dockerignore` | Excludes unnecessary files from Docker build context |
| `.env` | Copy of `.env.local` for Docker Compose to auto-read (gitignored) |

## One-Time Setup

### 1. Create `.env` file

Docker Compose only reads `.env` automatically (not `.env.local`). Run this once:

```bash
# Windows PowerShell
Copy-Item .env.local .env

# or Linux/macOS
cp .env.local .env
```

This file is already in `.gitignore` so it won't be committed.

## Security Design

### Build-time (baked into image)
- `NEXT_PUBLIC_SUPABASE_URL` — public, already visible in browser JS
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public, already visible in browser JS
- `NEXT_PUBLIC_SITE_URL` — public, already visible in browser JS

### Runtime-only (injected via container env, NOT in image)
- `BIBLE_API_ENDPOINT`
- `BIBLE_API_KEY`
- `BIBLE_API_ID`
- `SUPABASE_SERVICE_ROLE_KEY`

All values are read from `.env.local` (already in `.gitignore`) at build/compose time.

## Step-by-Step Instructions

### 1. Verify `.env` exists

Ensure your `.env` file is present in the project root (created in One-Time Setup above).

```
BIBLE_API_ENDPOINT=https://rest.api.bible/v1/bibles
BIBLE_API_KEY=your-key
BIBLE_API_ID=your-id
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Build the Docker image

```bash
docker compose build
```

This runs the multi-stage build:
- **deps**: Installs all npm dependencies
- **builder**: Builds the Next.js app with standalone output
- **runner**: Creates a minimal production image (~120MB)

### 3. Start the container

```bash
docker compose up -d
```

### 4. Verify it's running

```bash
docker compose ps
# Or open in browser: http://localhost:3000
```

### 5. View logs

```bash
docker compose logs -f
```

### 6. Stop the container

```bash
docker compose down
```

## Running Locally (without Docker)

For development, run directly on your machine:

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

The app will be available at `http://localhost:3000` with hot-reload enabled.

## Development with Docker (no host Node.js needed)

Uses a separate `dev` service with hot-reload via volume mounts. Dependencies are installed inside the container from `package-lock.json`.

### 1. Build the dev image

```bash
docker compose build dev
```

### 2. Start the dev server with hot-reload

```bash
docker compose up dev
```

The app will be available at `http://localhost:3000`. Any code changes on your host will be reflected immediately inside the container (Next.js hot-reload).

### 3. Stop

```bash
docker compose down
```

## Pushing to Docker Hub

Before you begin, replace `your-dockerhub-username` in the commands below with your actual Docker Hub username.

### One-time setup

```bash
# Login to Docker Hub
docker login

# Tag the image with your Docker Hub username and repo name
docker tag bible-verse-app:latest your-dockerhub-username/bible-verse:latest
```

### Build and push workflow

Run these commands every time you make changes to the source code:

```bash
# 1. Rebuild the image with updated code
docker compose build

# (Optional) Test locally first
docker compose up -d
# Verify at http://localhost:3000, then stop with: docker compose down

# 2. Tag the new image (use version tags for production)
docker tag bible-verse-app:latest your-dockerhub-username/bible-verse:latest
docker tag bible-verse-app:latest your-dockerhub-username/bible-verse:v1.0.0

# 3. Push both tags to Docker Hub
docker push your-dockerhub-username/bible-verse:latest
docker push your-dockerhub-username/bible-verse:v1.0.0
```

### Deploy to Google Cloud Run

```bash
# Pull from Docker Hub on Cloud Run
docker pull your-dockerhub-username/bible-verse:latest

# Or deploy directly from Docker Hub via Cloud Run console/CLI:
# gcloud run deploy bible-verse --image your-dockerhub-username/bible-verse:latest --port 3000
```

> **Note:** The server-side secrets (`BIBLE_API_KEY`, `BIBLE_API_ID`, `SUPABASE_SERVICE_ROLE_KEY`) must be configured as **environment variables** in Cloud Run's console or CLI — they are not included in the pushed image.

## OAuth Configuration for Cloud Run

For Google OAuth to work on Cloud Run, you need to register the Cloud Run URL in three places:

### 1. Google Cloud Console

1. Go to **APIs & Services** → **Credentials**
2. Click your **OAuth 2.0 Web Client**
3. Under **Authorized Redirect URIs**, add:
   ```
   https://YOUR_CLOUD_RUN_URL/auth/callback
   ```
4. Click **Save**

### 2. Supabase Dashboard

1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to:
   ```
   https://YOUR_CLOUD_RUN_URL
   ```
3. Under **Redirect URLs**, add:
   ```
   https://YOUR_CLOUD_RUN_URL/**
   ```
4. Click **Save**

### 3. Cloud Run Environment Variables

Set `NEXT_PUBLIC_SITE_URL` in your Cloud Run service:
```
NEXT_PUBLIC_SITE_URL=https://YOUR_CLOUD_RUN_URL
```

**Note:** The code now uses `window.location.origin` for OAuth redirects, so it adapts to the deployed URL automatically. The above configuration is still required for Google and Supabase to whitelist the callback URL.

## Important Notes

- The app runs as a **non-root user** (`nextjs`) for security
- The `restart: unless-stopped` policy means the container auto-restarts on crash or host reboot
- For production deployment, consider using a reverse proxy (nginx, Caddy) in front
- To rebuild after code changes: `docker compose build && docker compose up -d`

## Troubleshooting

### Build fails with "Missing NEXT_PUBLIC_* env var"

Make sure `.env` has all required variables and run build again:

```bash
docker compose build --no-cache
```

### Container exits immediately

Check logs:

```bash
docker compose logs -f
```

### Port 3000 already in use

Change the host port in `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"
```
