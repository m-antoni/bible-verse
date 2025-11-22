import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/app/lib/supabase/server';

export async function POST() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut(); // clears server cookie
  return NextResponse.json({ success: true });
}
