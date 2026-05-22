import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iujsijmvukputcaffnxr.supabase.co';
const supabaseAnonKey = 'sb_publishable_oHbRxsbgA0IyERfABBCAlg_dzl98_79';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

