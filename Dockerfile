# ============================================================
# STAGE 1: Install ALL dependencies (dev + prod)
# ============================================================
FROM node:22-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --verbose --prefer-offline

# ============================================================
# STAGE 2: Build the app
# ============================================================
FROM node:22-alpine AS builder
WORKDIR /app

# Accept public env vars at build time
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_SITE_URL

# Promote args to env vars so Next.js inlines them
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ============================================================
# STAGE 3: Production runner (minimal image)
# ============================================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone server output (Next.js strips node_modules to only what's needed)
COPY --from=builder /app/.next/standalone ./

# Copy static assets (served directly, not bundled)
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
