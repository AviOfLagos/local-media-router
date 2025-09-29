'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BecomeASellerPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the simplified store owner signup flow
    router.replace('/us/account?signup=store-owner');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-3xl mb-4">🏪</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Become a Seller</h1>
        <p className="text-gray-600">Redirecting to store registration...</p>
      </div>
    </div>
  );
}