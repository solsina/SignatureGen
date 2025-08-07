// Système d'A/B Testing pour SignatureGen

class ABTesting {
  constructor() {
    this.tests = new Map()
    this.userId = this.getUserId()
    this.init()
  }

  // Générer un ID utilisateur unique
  getUserId() {
    let userId = localStorage.getItem('ab_user_id')
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('ab_user_id', userId)
    }
    return userId
  }

  // Initialiser les tests
  init() {
    this.defineTests()
    this.loadResults()
  }

  // Définir les tests A/B
  defineTests() {
    // Test 1: CTA Principal
    this.tests.set('cta_main', {
      name: 'CTA Principal',
      variants: {
        A: {
          text: 'Créer ma signature',
          color: 'blue',
          size: 'large'
        },
        B: {
          text: 'Commencer gratuitement',
          color: 'purple',
          size: 'large'
        },
        C: {
          text: 'Générer maintenant',
          color: 'gradient',
          size: 'large'
        }
      },
      weight: [0.33, 0.33, 0.34] // Distribution des variants
    })

    // Test 2: Pricing Display
    this.tests.set('pricing_display', {
      name: 'Affichage des prix',
      variants: {
        A: {
          type: 'monthly',
          highlight: 'popular'
        },
        B: {
          type: 'annual',
          highlight: 'savings'
        },
        C: {
          type: 'both',
          highlight: 'popular'
        }
      },
      weight: [0.4, 0.3, 0.3]
    })

    // Test 3: Hero Section
    this.tests.set('hero_section', {
      name: 'Section Hero',
      variants: {
        A: {
          headline: 'Créez des signatures email qui convertissent',
          subheadline: 'Générez des signatures professionnelles en quelques clics',
          cta: 'primary'
        },
        B: {
          headline: 'Signatures email professionnelles en 2 minutes',
          subheadline: 'Plus de 15,000 signatures créées avec SignatureGen',
          cta: 'secondary'
        },
        C: {
          headline: 'Transformez vos emails en outils de conversion',
          subheadline: 'Templates optimisés pour tous les secteurs d\'activité',
          cta: 'gradient'
        }
      },
      weight: [0.4, 0.3, 0.3]
    })

    // Test 4: Social Proof
    this.tests.set('social_proof', {
      name: 'Preuve sociale',
      variants: {
        A: {
          type: 'numbers',
          text: 'Plus de 15,000 signatures créées'
        },
        B: {
          type: 'testimonials',
          text: '4.8/5 étoiles sur 500+ avis'
        },
        C: {
          type: 'logos',
          text: 'Utilisé par 1000+ entreprises'
        }
      },
      weight: [0.4, 0.3, 0.3]
    })

    // Test 5: Feature Highlight
    this.tests.set('feature_highlight', {
      name: 'Mise en avant des fonctionnalités',
      variants: {
        A: {
          primary: 'speed',
          secondary: 'templates'
        },
        B: {
          primary: 'templates',
          secondary: 'speed'
        },
        C: {
          primary: 'compatibility',
          secondary: 'speed'
        }
      },
      weight: [0.33, 0.33, 0.34]
    })
  }

  // Assigner un variant à un utilisateur
  getVariant(testId) {
    const test = this.tests.get(testId)
    if (!test) return null

    // Vérifier si l'utilisateur a déjà un variant assigné
    const storedVariant = localStorage.getItem(`ab_${testId}`)
    if (storedVariant && test.variants[storedVariant]) {
      return storedVariant
    }

    // Assigner un nouveau variant
    const variant = this.assignVariant(test.weight)
    localStorage.setItem(`ab_${testId}`, variant)
    
    // Track l'assignation
    this.trackAssignment(testId, variant)
    
    return variant
  }

  // Assigner un variant basé sur les poids
  assignVariant(weights) {
    const random = Math.random()
    let cumulativeWeight = 0
    
    for (let i = 0; i < weights.length; i++) {
      cumulativeWeight += weights[i]
      if (random <= cumulativeWeight) {
        return String.fromCharCode(65 + i) // A, B, C, etc.
      }
    }
    
    return 'A' // Fallback
  }

  // Obtenir les données d'un variant
  getVariantData(testId) {
    const variant = this.getVariant(testId)
    const test = this.tests.get(testId)
    
    if (!variant || !test) return null
    
    return {
      variant,
      data: test.variants[variant],
      testName: test.name
    }
  }

  // Track une conversion
  trackConversion(testId, goal, value = 1) {
    const variant = this.getVariant(testId)
    if (!variant) return

    const conversion = {
      testId,
      variant,
      goal,
      value,
      timestamp: new Date().toISOString(),
      userId: this.userId
    }

    // Sauvegarder localement
    this.saveConversion(conversion)

    // Envoyer à l'analytics
    this.sendToAnalytics('conversion', conversion)
  }

  // Track une assignation
  trackAssignment(testId, variant) {
    const assignment = {
      testId,
      variant,
      timestamp: new Date().toISOString(),
      userId: this.userId
    }

    this.sendToAnalytics('assignment', assignment)
  }

  // Sauvegarder une conversion localement
  saveConversion(conversion) {
    const conversions = this.getStoredConversions()
    conversions.push(conversion)
    localStorage.setItem('ab_conversions', JSON.stringify(conversions))
  }

  // Obtenir les conversions stockées
  getStoredConversions() {
    try {
      return JSON.parse(localStorage.getItem('ab_conversions') || '[]')
    } catch {
      return []
    }
  }

  // Charger les résultats
  loadResults() {
    const conversions = this.getStoredConversions()
    // Traitement des résultats locaux si nécessaire
  }

  // Envoyer à l'analytics
  sendToAnalytics(event, data) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', `ab_${event}`, {
        test_id: data.testId,
        variant: data.variant,
        goal: data.goal,
        value: data.value,
        user_id: data.userId
      })
    }
  }

  // Obtenir les statistiques d'un test
  getTestStats(testId) {
    const conversions = this.getStoredConversions()
    const testConversions = conversions.filter(c => c.testId === testId)
    
    const stats = {}
    const test = this.tests.get(testId)
    
    if (!test) return stats

    Object.keys(test.variants).forEach(variant => {
      const variantConversions = testConversions.filter(c => c.variant === variant)
      stats[variant] = {
        conversions: variantConversions.length,
        totalValue: variantConversions.reduce((sum, c) => sum + (c.value || 0), 0),
        conversionRate: 0 // À calculer avec le nombre d'assignations
      }
    })

    return stats
  }

  // Déterminer le gagnant d'un test
  getWinner(testId, confidenceLevel = 0.95) {
    const stats = this.getTestStats(testId)
    const variants = Object.keys(stats)
    
    if (variants.length < 2) return null

    // Calcul simple du gagnant basé sur le taux de conversion
    let winner = null
    let bestRate = 0

    variants.forEach(variant => {
      const rate = stats[variant].conversionRate
      if (rate > bestRate) {
        bestRate = rate
        winner = variant
      }
    })

    return winner
  }

  // Forcer un variant (pour les tests manuels)
  forceVariant(testId, variant) {
    localStorage.setItem(`ab_${testId}`, variant)
  }

  // Réinitialiser tous les tests
  reset() {
    const keys = Array.from(localStorage.keys())
    keys.forEach(key => {
      if (key.startsWith('ab_')) {
        localStorage.removeItem(key)
      }
    })
  }
}

// Instance globale
let abTestingInstance = null

export function getABTesting() {
  if (!abTestingInstance) {
    abTestingInstance = new ABTesting()
  }
  return abTestingInstance
}

// Hook React pour l'A/B testing
export function useABTest(testId) {
  const ab = getABTesting()
  const variantData = ab.getVariantData(testId)
  
  const trackConversion = (goal, value = 1) => {
    ab.trackConversion(testId, goal, value)
  }

  return {
    variant: variantData?.variant,
    data: variantData?.data,
    testName: variantData?.testName,
    trackConversion
  }
}

// Utilitaires pour les tests spécifiques
export const ABTests = {
  // Test CTA Principal
  CTA_MAIN: 'cta_main',
  
  // Test Pricing
  PRICING_DISPLAY: 'pricing_display',
  
  // Test Hero Section
  HERO_SECTION: 'hero_section',
  
  // Test Social Proof
  SOCIAL_PROOF: 'social_proof',
  
  // Test Feature Highlight
  FEATURE_HIGHLIGHT: 'feature_highlight'
}

// Exemple d'utilisation dans un composant :
/*
import { useABTest, ABTests } from '@/lib/abTesting'

function MyComponent() {
  const { variant, data, trackConversion } = useABTest(ABTests.CTA_MAIN)
  
  const handleClick = () => {
    trackConversion('cta_click', 1)
    // Logique du clic
  }
  
  return (
    <button 
      onClick={handleClick}
      className={`btn-${data.color} btn-${data.size}`}
    >
      {data.text}
    </button>
  )
}
*/ 