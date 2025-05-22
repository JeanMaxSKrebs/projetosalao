'use client';

import { useSession } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session]);

  if (!session) return null;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Bem-vindo, {session.user.email}!</h1>
    </div>
  );
}
