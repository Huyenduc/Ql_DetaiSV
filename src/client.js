import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fzcwotbqbzolyknivfmw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6Y3dvdGJxYnpvbHlrbml2Zm13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIxNjMxMzUsImV4cCI6MTk2NzczOTEzNX0.S6dKf9tmPC-RWtB8O7PE0VXYvVkLuiiwdUYDNlOqdwA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)