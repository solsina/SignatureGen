import { supabaseAdmin } from './supabase'
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Fonction pour vérifier les limites utilisateur
export async function checkUserLimits(userId) {
  try {
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('signatures_created, subscription_status')
      .eq('id', userId)
      .single()

    if (error) {
      throw error
    }

    const isFreeUser = !profile.subscription_status || profile.subscription_status === 'free'
    const signaturesLimit = isFreeUser ? 3 : Infinity
    const allowed = profile.signatures_created < signaturesLimit

    return {
      allowed,
      created: profile.signatures_created,
      limit: signaturesLimit,
      subscriptionStatus: profile.subscription_status,
      message: allowed ? null : 'Limite de signatures atteinte. Passez en premium pour créer plus de signatures.'
    }
  } catch (error) {
    console.error('Erreur lors de la vérification des limites:', error)
    return {
      allowed: false,
      created: 0,
      limit: 3,
      subscriptionStatus: 'free',
      message: 'Erreur lors de la vérification des limites'
    }
  }
}

// Fonction pour formater les dates
export function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

// Fonction pour générer un nom de fichier pour la signature
export function generateSignatureFileName(fullName, templateName) {
  const timestamp = Date.now()
  const cleanName = fullName.replace(/[^a-zA-Z0-9\s-]/g, '').replace(/\s+/g, '-').toLowerCase()
  return `${cleanName}-${templateName}-${timestamp}.html`
}

// Fonction pour valider une URL
export function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

// Fonction pour tronquer le texte
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
} 