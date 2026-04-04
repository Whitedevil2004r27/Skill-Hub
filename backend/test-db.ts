import { supabase } from './src/lib/supabase';

async function testConnection() {
  console.log('Testing Supabase connection...');
  console.log('URL:', process.env.SUPABASE_URL);
  
  // Test 1: Simple count
  const { count, error: countError } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });
    
  if (countError) {
    console.error('Count error:', countError);
  } else {
    console.log('Total profiles in DB:', count);
  }

  // Test 2: Fetch all profiles to see what we have
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('*');

  if (profileError) {
    console.error('Profile fetch error:', profileError);
  } else {
    console.log('All profiles data:', JSON.stringify(profiles, null, 2));
  }

  // Test 3: Raw fetch all roles
  const { data: roles, error: rolesError } = await supabase
    .from('profiles')
    .select('role');
    
  if (rolesError) {
    console.error('Roles fetch error:', rolesError);
  } else {
    console.log('Unique roles found:', [...new Set((roles || []).map(r => r.role))]);
  }
}

testConnection();
