import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Checking...');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        // Test connection by getting auth config (this always exists)
        const { data, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        // Get Supabase config for verification
        const config = {
          supabaseUrl: process.env.REACT_APP_SUPABASE_URL || 'Not set',
          hasAnonKey: process.env.REACT_APP_SUPABASE_ANON_KEY ? 'Set' : 'Not set'
        };

        // Log for debugging
        console.log('Supabase Config:', {
          url: process.env.REACT_APP_SUPABASE_URL,
          hasKey: !!process.env.REACT_APP_SUPABASE_ANON_KEY
        });

        setConnectionStatus(`✅ Connected successfully!
          • URL: ${config.supabaseUrl}
          • API Key: ${config.hasAnonKey}
          • Session: ${data.session ? 'Active' : 'None'}`);
        
      } catch (err) {
        console.error('Supabase connection error:', err);
        setError(err.message);
        setConnectionStatus('❌ Connection failed');
        
        // Additional error context
        if (err.message.includes('fetch')) {
          setError('Cannot reach Supabase server. Check your URL and internet connection.');
        } else if (err.message.includes('JWT') || err.message.includes('key')) {
          setError('Invalid API key. Check your REACT_APP_SUPABASE_ANON_KEY.');
        } else {
          setError(`Connection error: ${err.message}`);
        }
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Supabase Connection Status</h2>
      <pre className={`text-sm whitespace-pre-wrap ${error ? 'text-red-500' : 'text-green-500'}`}>
        {connectionStatus}
      </pre>
      {error && (
        <div className="mt-2 text-sm text-red-500 border-t pt-2">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default SupabaseTest; 