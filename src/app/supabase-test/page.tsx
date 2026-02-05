'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function SupabaseTestPage() {
  const [status, setStatus] = useState<string>('Testing connection...');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const supabase = createClient();
        
        // Test basic connection
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Auth error:', userError);
          setStatus(`Authentication error: ${userError.message}`);
          setError(userError.message);
        } else {
          setUser(user);
          setStatus(user ? 'Connected - User authenticated' : 'Connected - No user logged in');
        }
      } catch (err) {
        console.error('Connection test failed:', err);
        setStatus(`Connection failed: ${err instanceof Error ? err.message : String(err)}`);
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Supabase Connection Test</h1>
        
        <div className="mb-6 p-4 bg-blue-50 rounded border border-blue-200">
          <h2 className="text-xl font-semibold mb-2">Status:</h2>
          <p className={`font-mono text-sm ${error ? 'text-red-600' : 'text-green-600'}`}>
            {status}
          </p>
        </div>

        {user && (
          <div className="mb-6 p-4 bg-green-50 rounded border border-green-200">
            <h2 className="text-xl font-semibold mb-2">User Info:</h2>
            <pre className="whitespace-pre-wrap break-words text-sm">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded border border-red-200">
            <h2 className="text-xl font-semibold mb-2 text-red-700">Error Details:</h2>
            <pre className="whitespace-pre-wrap break-words text-sm text-red-600">
              {error}
            </pre>
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">What this test checks:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Environment variables are correctly loaded</li>
            <li>Supabase client can be instantiated</li>
            <li>Authentication service is accessible</li>
            <li>Current user status (if any)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}