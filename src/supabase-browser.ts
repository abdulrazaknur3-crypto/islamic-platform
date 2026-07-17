'use client';

import { createBrowserClient } from '@supabase/ssr';

const FALLBACK_URL = 'https://aawwvhloaweemvllatng.supabase.co';
const FALLBACK_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhd3d2aGxvYXdlZW12bGxhdG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMDIwNjgsImV4cCI6MjA5OTg3ODA2OH0.CNMm1fmx5V8NLkCbiSLcSdZ_Oz3MKB3vPuOTPiZwfVM';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON
  );
}
