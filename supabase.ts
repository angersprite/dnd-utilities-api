import { createClient } from '@supabase/supabase-js'

// moves these to env
const supabaseUrl = 'https://nlnfkvsjrayawvknouna.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sbmZrdnNqcmF5YXd2a25vdW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwNzM4MzEsImV4cCI6MjAxMjY0OTgzMX0.mZg7KIPxDqFzWKKgzWUsEseHNFXQEn8hkZqXdUd7OFU'

const getSupabase = (access_token: string) => {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    return supabase
}

export { getSupabase }