/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const { user } = await req.json();

    if (!user?.id) {
      return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.from('bible_users').upsert(
      [
        {
          auth_id: user.id,
          display_name: user.user_metadata.full_name || user.email,
        },
      ],
      { onConflict: 'auth_id', returning: 'representation' } as any,
    );

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
