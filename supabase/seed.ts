/**
 * Supabase Seed Runner
 *
 * Runs all `.sql` files in `supabase/seeders/` in order to populate
 * your database with initial data after migrations.
 *
 * Usage:
 * 1. Set environment variables: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * 2. Place seed files in `supabase/seeders/`
 * 3. Run: npx ts-node supabase/seed.ts
 *
 * Notes:
 * - Use ON CONFLICT DO NOTHING to avoid duplicates
 * - Run after migrations (supabase db push)
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSeeder(filePath: string) {
  const sql = fs.readFileSync(filePath, 'utf-8');

  // Split multiple statements by semicolon
  const statements = sql
    .split(';')
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);

  for (const stmt of statements) {
    const { error } = await supabase.rpc('execute_sql', { sql: stmt });
    if (error) console.error(`Error running ${filePath}:`, error);
  }

  console.log(`Seeded: ${filePath}`);
}

async function main() {
  const seedDir = path.join(__dirname, 'seeders');
  const files = fs.readdirSync(seedDir).sort(); // Ensure order

  for (const file of files) {
    if (file.endsWith('.sql')) {
      await runSeeder(path.join(seedDir, file));
    }
  }

  console.log('All seeders have been run!');
}

main().catch((err) => console.error(err));
