import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bnwilfzccqbacjytuwzc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJud2lsZnpjY3FiYWNqeXR1d3pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxODE1MDMsImV4cCI6MjA3Mjc1NzUwM30.BuzczkPG9Se1R2kqJlBrmCUOYhnsZOypRo43gQmGl00'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)