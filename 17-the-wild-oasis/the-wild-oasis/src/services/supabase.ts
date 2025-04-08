import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pnpquugbfqrgydfbppvx.supabase.co";

// uncomment next line for testing errors
// const supabaseUrl = "https://pnpquudfasfdgbfqrgydfbppvx.supabase.co";

// key can actually be exposed because the RLS (Row Level Security)
// of Supabase is handling the access
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
