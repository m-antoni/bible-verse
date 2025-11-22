export const ENV = {
  // Bible API (server-side)
  BIBLE_API_ENDPOINT: process.env.BIBLE_API_ENDPOINT!,
  BIBLE_API_KEY: process.env.BIBLE_API_KEY!,
  BIBLE_API_ID: process.env.BIBLE_API_ID!,

  // Supabase (client-side + server-side)
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL!,
} as const;
