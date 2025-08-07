'use client'

import { useState, useEffect, createContext, useContext } from 'react'
// import { useAnalytics } from '@/components/analytics/GoogleAnalytics'

// Fallback pour useAnalytics si le module n'est pas disponible
const useAnalytics = () => ({
  trackEvent: (eventName, parameters = {}) => {
    console.log('Analytics event:', eventName, parameters)
  }
})

const AchievementContext = createContext()

export function AchievementProvider({ children }) {
  const [achievements, setAchievements] = useState([])
  const [userProgress, setUserProgress] = useState({})
  const [showAchievement, setShowAchievement] = useState(null)
  const { trackEvent } = useAnalytics()

  // Définir tous les achievements
  const allAchievements = {
    // Achievements de création
    first_signature: {
      id: 'first_signature',
      title: 'Première signature',
      description: 'Créez votre première signature email',
      icon: '🎉',
      points: 10,
      category: 'creation',
      condition: (progress) => progress.signaturesCreated >= 1
    },
    signature_master: {
      id: 'signature_master',
      title: 'Maître des signatures',
      description: 'Créez 10 signatures',
      icon: '👑',
      points: 50,
      category: 'creation',
      condition: (progress) => progress.signaturesCreated >= 10
    },
    template_explorer: {
      id: 'template_explorer',
      title: 'Explorateur de templates',
      description: 'Utilisez 3 templates différents',
      icon: '🔍',
      points: 25,
      category: 'exploration',
      condition: (progress) => progress.templatesUsed >= 3
    },
    template_master: {
      id: 'template_master',
      title: 'Maître des templates',
      description: 'Utilisez tous les templates disponibles',
      icon: '🎨',
      points: 100,
      category: 'exploration',
      condition: (progress) => progress.templatesUsed >= 6
    },
    
    // Achievements de rétention
    daily_user: {
      id: 'daily_user',
      title: 'Utilisateur quotidien',
      description: 'Connectez-vous 3 jours de suite',
      icon: '📅',
      points: 30,
      category: 'retention',
      condition: (progress) => progress.consecutiveDays >= 3
    },
    weekly_user: {
      id: 'weekly_user',
      title: 'Utilisateur hebdomadaire',
      description: 'Connectez-vous 7 jours de suite',
      icon: '📆',
      points: 75,
      category: 'retention',
      condition: (progress) => progress.consecutiveDays >= 7
    },
    
    // Achievements de partage
    sharer: {
      id: 'sharer',
      title: 'Partageur',
      description: 'Partagez votre première signature',
      icon: '📤',
      points: 15,
      category: 'social',
      condition: (progress) => progress.signaturesShared >= 1
    },
    influencer: {
      id: 'influencer',
      title: 'Influenceur',
      description: 'Partagez 5 signatures',
      icon: '🌟',
      points: 60,
      category: 'social',
      condition: (progress) => progress.signaturesShared >= 5
    },
    
    // Achievements de conversion
    premium_explorer: {
      id: 'premium_explorer',
      title: 'Explorateur Premium',
      description: 'Visitez la page d\'upgrade',
      icon: '💎',
      points: 5,
      category: 'conversion',
      condition: (progress) => progress.upgradePageVisited
    },
    upgrade_clicker: {
      id: 'upgrade_clicker',
      title: 'Candidat Premium',
      description: 'Cliquez sur un bouton d\'upgrade',
      icon: '⭐',
      points: 10,
      category: 'conversion',
      condition: (progress) => progress.upgradeClicks >= 1
    },
    
    // Achievements spéciaux
    speed_demon: {
      id: 'speed_demon',
      title: 'Démon de la vitesse',
      description: 'Créez une signature en moins de 30 secondes',
      icon: '⚡',
      points: 20,
      category: 'special',
      condition: (progress) => progress.fastestCreation <= 30
    },
    perfectionist: {
      id: 'perfectionist',
      title: 'Perfectionniste',
      description: 'Modifiez une signature 5 fois',
      icon: '✨',
      points: 25,
      category: 'special',
      condition: (progress) => progress.maxEdits >= 5
    },
    early_adopter: {
      id: 'early_adopter',
      title: 'Early Adopter',
      description: 'Rejoignez SignatureGen dans les 1000 premiers utilisateurs',
      icon: '🚀',
      points: 150,
      category: 'special',
      condition: (progress) => progress.userRank <= 1000
    }
  }

  useEffect(() => {
    loadUserProgress()
    checkAchievements()
  }, [])

  // Charger le progrès utilisateur
  const loadUserProgress = () => {
    try {
      const stored = localStorage.getItem('user_progress')
      if (stored) {
        setUserProgress(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Erreur lors du chargement du progrès:', error)
    }
  }

  // Sauvegarder le progrès utilisateur
  const saveUserProgress = (progress) => {
    try {
      localStorage.setItem('user_progress', JSON.stringify(progress))
      setUserProgress(progress)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du progrès:', error)
    }
  }

  // Mettre à jour le progrès
  const updateProgress = (key, value) => {
    const newProgress = {
      ...userProgress,
      [key]: value
    }
    saveUserProgress(newProgress)
    checkAchievements(newProgress)
  }

  // Incrémenter le progrès
  const incrementProgress = (key, amount = 1) => {
    const currentValue = userProgress[key] || 0
    updateProgress(key, currentValue + amount)
  }

  // Vérifier les achievements
  const checkAchievements = (progress = userProgress) => {
    const newAchievements = []
    
    Object.values(allAchievements).forEach(achievement => {
      if (!achievements.find(a => a.id === achievement.id) && 
          achievement.condition(progress)) {
        newAchievements.push(achievement)
      }
    })

    if (newAchievements.length > 0) {
      newAchievements.forEach(achievement => {
        unlockAchievement(achievement)
      })
    }
  }

  // Débloquer un achievement
  const unlockAchievement = (achievement) => {
    const newAchievement = {
      ...achievement,
      unlockedAt: new Date().toISOString()
    }
    
    setAchievements(prev => [...prev, newAchievement])
    setShowAchievement(newAchievement)
    
    // Track l'achievement
    trackEvent('achievement_unlocked', {
      achievement_id: achievement.id,
      achievement_title: achievement.title,
      points: achievement.points,
      category: achievement.category
    })

    // Masquer l'achievement après 5 secondes
    setTimeout(() => {
      setShowAchievement(null)
    }, 5000)
  }

  // Obtenir les statistiques
  const getStats = () => {
    const totalPoints = achievements.reduce((sum, a) => sum + a.points, 0)
    const totalAchievements = achievements.length
    const categories = achievements.reduce((acc, a) => {
      acc[a.category] = (acc[a.category] || 0) + 1
      return acc
    }, {})

    return {
      totalPoints,
      totalAchievements,
      categories,
      progress: userProgress
    }
  }

  // Obtenir les achievements par catégorie
  const getAchievementsByCategory = () => {
    const categories = {}
    
    Object.values(allAchievements).forEach(achievement => {
      if (!categories[achievement.category]) {
        categories[achievement.category] = []
      }
      
      const unlocked = achievements.find(a => a.id === achievement.id)
      categories[achievement.category].push({
        ...achievement,
        unlocked: !!unlocked,
        unlockedAt: unlocked?.unlockedAt
      })
    })

    return categories
  }

  const value = {
    achievements,
    userProgress,
    showAchievement,
    updateProgress,
    incrementProgress,
    getStats,
    getAchievementsByCategory,
    allAchievements
  }

  return (
    <AchievementContext.Provider value={value}>
      {children}
      <AchievementNotification />
    </AchievementContext.Provider>
  )
}

// Composant de notification d'achievement
function AchievementNotification() {
  const { showAchievement } = useContext(AchievementContext)

  if (!showAchievement) return null

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-2xl border-4 border-yellow-300 animate-bounce">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{showAchievement.icon}</div>
          <div>
            <h3 className="font-bold text-lg mb-1">
              Achievement débloqué !
            </h3>
            <p className="text-sm opacity-90">
              {showAchievement.title}
            </p>
            <p className="text-xs opacity-75">
              +{showAchievement.points} points
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook pour utiliser le système d'achievements
export function useAchievements() {
  const context = useContext(AchievementContext)
  if (!context) {
    throw new Error('useAchievements must be used within an AchievementProvider')
  }
  return context
}

// Composant d'affichage des achievements
export function AchievementDisplay() {
  const { getStats, getAchievementsByCategory } = useAchievements()
  const stats = getStats()
  const categories = getAchievementsByCategory()

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Vos achievements
        </h2>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">🏆</span>
            <span>{stats.totalAchievements} débloqués</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500">⭐</span>
            <span>{stats.totalPoints} points</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(categories).map(([category, achievements]) => (
          <div key={category}>
            <h3 className="font-semibold text-gray-900 mb-3 capitalize">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    achievement.unlocked
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          +{achievement.points} pts
                        </span>
                        {achievement.unlocked && (
                          <span className="text-xs text-green-600">
                            ✓ Débloqué
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Utilitaires pour tracker les actions
export const AchievementActions = {
  // Actions de création
  SIGNATURE_CREATED: 'signature_created',
  TEMPLATE_USED: 'template_used',
  
  // Actions de rétention
  DAILY_LOGIN: 'daily_login',
  
  // Actions de partage
  SIGNATURE_SHARED: 'signature_shared',
  
  // Actions de conversion
  UPGRADE_PAGE_VISITED: 'upgrade_page_visited',
  UPGRADE_CLICKED: 'upgrade_clicked',
  
  // Actions spéciales
  FAST_CREATION: 'fast_creation',
  SIGNATURE_EDITED: 'signature_edited'
}

// Hook pour tracker facilement les actions
export function useAchievementTracker() {
  const { incrementProgress, updateProgress } = useAchievements()

  const trackAction = (action, data = {}) => {
    switch (action) {
      case AchievementActions.SIGNATURE_CREATED:
        incrementProgress('signaturesCreated')
        if (data.template) {
          // Track template usage
          const templatesUsed = new Set(
            JSON.parse(localStorage.getItem('templates_used') || '[]')
          )
          templatesUsed.add(data.template)
          localStorage.setItem('templates_used', JSON.stringify([...templatesUsed]))
          updateProgress('templatesUsed', templatesUsed.size)
        }
        break
        
      case AchievementActions.TEMPLATE_USED:
        incrementProgress('templatesUsed')
        break
        
      case AchievementActions.DAILY_LOGIN:
        // Logique pour les connexions consécutives
        const lastLogin = localStorage.getItem('last_login')
        const today = new Date().toDateString()
        
        if (lastLogin !== today) {
          localStorage.setItem('last_login', today)
          incrementProgress('consecutiveDays')
        }
        break
        
      case AchievementActions.SIGNATURE_SHARED:
        incrementProgress('signaturesShared')
        break
        
      case AchievementActions.UPGRADE_PAGE_VISITED:
        updateProgress('upgradePageVisited', true)
        break
        
      case AchievementActions.UPGRADE_CLICKED:
        incrementProgress('upgradeClicks')
        break
        
      case AchievementActions.FAST_CREATION:
        const time = data.creationTime || 0
        const currentFastest = parseInt(localStorage.getItem('fastest_creation') || '999999')
        if (time < currentFastest) {
          localStorage.setItem('fastest_creation', time.toString())
          updateProgress('fastestCreation', time)
        }
        break
        
      case AchievementActions.SIGNATURE_EDITED:
        incrementProgress('signaturesEdited')
        const maxEdits = Math.max(
          parseInt(localStorage.getItem('max_edits') || '0'),
          data.editCount || 1
        )
        localStorage.setItem('max_edits', maxEdits.toString())
        updateProgress('maxEdits', maxEdits)
        break
    }
  }

  return { trackAction }
} 