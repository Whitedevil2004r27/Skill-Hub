
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: './backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnostic() {
  console.log('--- Database Diagnostic ---');
  
  const { data: profiles, error: pError } = await supabase.from('profiles').select('*');
  if (pError) console.error('Profiles Error:', pError);
  else console.log(`Profiles count: ${profiles?.length || 0}`);
  if (profiles && profiles.length > 0) {
    console.log('Sample Profile:', JSON.stringify(profiles[0], null, 2));
  }

  const { data: courses, error: cError } = await supabase.from('courses').select('*');
  if (cError) console.error('Courses Error:', cError);
  else console.log(`Courses count: ${courses?.length || 0}`);

  const { data: mentors, error: mError } = await supabase
    .from('profiles')
    .select('*')
    .or('role.eq.mentor,role.eq.both');
  if (mError) console.error('Mentors Filter Error:', mError);
  else console.log(`Mentors (filtered) count: ${mentors?.length || 0}`);
}

diagnostic();
