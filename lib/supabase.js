import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Client pour les opérations côté serveur
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Fonctions utilitaires
export const getUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const createSignature = async (signatureData) => {
  const { data, error } = await supabase
    .from('signatures')
    .insert(signatureData)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getUserSignatures = async (userId, page = 1, limit = 10) => {
  const from = (page - 1) * limit
  const to = from + limit - 1
  
  const { data, error, count } = await supabase
    .from('signatures')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .range(from, to)
  
  if (error) throw error
  return { data, count }
}

export const deleteSignature = async (signatureId, userId) => {
  const { error } = await supabase
    .from('signatures')
    .delete()
    .eq('id', signatureId)
    .eq('user_id', userId)
  
  if (error) throw error
  return true
}

export const trackEvent = async (eventType, eventData = {}) => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return
  
  const { error } = await supabase
    .from('analytics')
    .insert({
      user_id: user.id,
      event_type: eventType,
      event_data: eventData
    })
  
  if (error) console.error('Analytics error:', error)
} 