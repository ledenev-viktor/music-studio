import { createClient } from '@supabase/supabase-js';
import supabaseConfig from '~lib/supabase';

const supabase = createClient(supabaseConfig.apiUrl, supabaseConfig.apiKey);

export default supabase;
