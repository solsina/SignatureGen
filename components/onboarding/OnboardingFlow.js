'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
// import { useAnalytics } from '@/components/analytics/GoogleAnalytics'

// Fallback pour useAnalytics si le module n'est pas disponible
const useAnalytics = () => ({
  trackEvent: (eventName, parameters = {}) => {
    console.log('Analytics event:', eventName, parameters)
  }
})

export function OnboardingFlow({ user, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()
  const { trackEvent } = useAnalytics()

  const steps = [
    {
      id: 'welcome',
      title: 'Bienvenue sur SignatureGen !',
      description: 'Créons ensemble votre première signature professionnelle',
      icon: '👋',
      action: 'Commencer',
      actionLink: '/create'
    },
    {
      id: 'templates',
      title: 'Découvrez nos templates',
      description: 'Choisissez parmi 6 templates professionnels adaptés à tous les secteurs',
      icon: '🎨',
      action: 'Voir les templates',
      actionLink: '/templates'
    },
    {
      id: 'features',
      title: 'Fonctionnalités premium',
      description: 'Débloquez des signatures illimitées et des templates exclusifs',
      icon: '⭐',
      action: 'Voir les plans',
      actionLink: '/upgrade'
    },
    {
      id: 'complete',
      title: 'Vous êtes prêt !',
      description: 'Commencez à créer des signatures qui convertissent',
      icon: '🚀',
      action: 'Créer ma signature',
      actionLink: '/create'
    }
  ]

  useEffect(() => {
    // Afficher l'onboarding après 2 secondes pour les nouveaux utilisateurs
    const timer = setTimeout(() => {
      setIsVisible(true)
      trackEvent('onboarding_started', {
        user_id: user?.id,
        step: 'welcome'
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [user])

  const handleStepComplete = (stepId) => {
    trackEvent('onboarding_step_completed', {
      user_id: user?.id,
      step: stepId,
      step_number: currentStep + 1
    })

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleOnboardingComplete()
    }
  }

  const handleOnboardingComplete = () => {
    trackEvent('onboarding_completed', {
      user_id: user?.id,
      total_steps: steps.length
    })
    
    setIsVisible(false)
    if (onComplete) onComplete()
    
    // Marquer l'onboarding comme terminé dans localStorage
    localStorage.setItem('onboarding_completed', 'true')
  }

  const handleSkip = () => {
    trackEvent('onboarding_skipped', {
      user_id: user?.id,
      step: currentStep
    })
    handleOnboardingComplete()
  }

  if (!isVisible) return null

  const currentStepData = steps[currentStep]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Étape {currentStep + 1} sur {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">{currentStepData.icon}</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {currentStepData.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {currentStepData.description}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Passer
          </button>
          <button
            onClick={() => handleStepComplete(currentStepData.id)}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
          >
            {currentStepData.action}
          </button>
        </div>

        {/* Skip all */}
        <button
          onClick={handleSkip}
          className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-4 transition-colors"
        >
          Ne plus afficher
        </button>
      </div>
    </div>
  )
}

// Hook pour gérer l'état d'onboarding
export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false)

  useEffect(() => {
    const completed = localStorage.getItem('onboarding_completed')
    setHasCompletedOnboarding(!!completed)
  }, [])

  const startOnboarding = () => {
    setShowOnboarding(true)
  }

  const completeOnboarding = () => {
    setShowOnboarding(false)
    setHasCompletedOnboarding(true)
    localStorage.setItem('onboarding_completed', 'true')
  }

  return {
    showOnboarding,
    hasCompletedOnboarding,
    startOnboarding,
    completeOnboarding
  }
} 