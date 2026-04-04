import { supabase } from './supabase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function request(path: string, options: RequestInit = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An unknown error occurred' }));
    throw new Error(error.error || 'Request failed');
  }

  // Handle empty responses (like 204 No Content)
  if (response.status === 204) return null;

  return response.json();
}

const api = {
  get: (path: string, options?: RequestInit) => request(path, { ...options, method: 'GET' }),
  post: (path: string, body: any, options?: RequestInit) => 
    request(path, { ...options, method: 'POST', body: JSON.stringify(body) }),
  patch: (path: string, body: any, options?: RequestInit) => 
    request(path, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  put: (path: string, body: any, options?: RequestInit) => 
    request(path, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  delete: (path: string, options?: RequestInit) => request(path, { ...options, method: 'DELETE' }),
};

export default api;
