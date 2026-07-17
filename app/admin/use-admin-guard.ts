'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/src/supabase-browser';

export function useAdminGuard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin');
        return;
      }
      const { data: admin } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();
      if (!admin) {
        await supabase.auth.signOut();
        router.push('/admin');
        return;
      }
      setReady(true);
    })();
  }, [router]);

  return ready;
}
