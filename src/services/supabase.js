
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zxdcpfocvounjuptxeqd.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4ZGNwZm9jdm91bmp1cHR4ZXFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc3ODcwNzIsImV4cCI6MjAxMzM2MzA3Mn0.nraYMfkXnWBgf9r9mkrUos3ZSe_vCkp9hdrM-_1IwCQ"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase