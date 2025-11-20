export const ENV = {
  // Bible API
  BIBLE_API_ENDPOINT: process.env.BIBLE_API_ENDPOINT!,
  BIBLE_API_KEY: process.env.BIBLE_API_KEY!,
  BIBLE_API_ID: process.env.BIBLE_API_ID!,

  // Supabase
  SUPABASE_URI: process.env.NEXT_PUBLIC_SUPABASE_URI!,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  AUTH_REDIRECT: process.env.NEXT_PUBLIC_AUTH_REDIRECT!,
} as const;
