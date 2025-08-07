'use client'

import { useState, useEffect, createContext, useContext } from 'react'
// import { useAnalytics } from '@/components/analytics/GoogleAnalytics'

// Fallback pour useAnalytics si le module n'est pas disponible
const useAnalytics = () => ({
  trackEvent: (eventName, parameters = {}) => {
    console.log('Analytics event:', eventName, parameters)
  }
})

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const { trackEvent } = useAnalytics()

  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      ...notification,
      timestamp: new Date()
    }
    
    setNotifications(prev => [...prev, newNotification])
    
    // Auto-remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }

    // Track notification
    trackEvent('notification_shown', {
      type: notification.type,
      title: notification.title,
      user_action: 'shown'
    })

    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const showSuccess = (title, message, duration = 5000) => {
    return addNotification({
      type: 'success',
      title,
      message,
      duration,
      icon: '✅'
    })
  }

  const showError = (title, message, duration = 7000) => {
    return addNotification({
      type: 'error',
      title,
      message,
      duration,
      icon: '❌'
    })
  }

  const showWarning = (title, message, duration = 6000) => {
    return addNotification({
      type: 'warning',
      title,
      message,
      duration,
      icon: '⚠️'
    })
  }

  const showInfo = (title, message, duration = 5000) => {
    return addNotification({
      type: 'info',
      title,
      message,
      duration,
      icon: 'ℹ️'
    })
  }

  const showUpgradePrompt = (message) => {
    return addNotification({
      type: 'upgrade',
      title: 'Upgrade vers Pro',
      message,
      duration: 0, // Ne pas auto-remove
      icon: '⭐',
      action: {
        label: 'Upgrade',
        href: '/upgrade'
      }
    })
  }

  const showTutorial = (title, message, action) => {
    return addNotification({
      type: 'tutorial',
      title,
      message,
      duration: 0,
      icon: '🎓',
      action
    })
  }

  const value = {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showUpgradePrompt,
    showTutorial
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

function NotificationContainer() {
  const { notifications, removeNotification } = useContext(NotificationContext)

  const getNotificationStyles = (type) => {
    const baseStyles = "p-4 rounded-lg shadow-lg border-l-4 max-w-sm w-full transform transition-all duration-300"
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border-green-500 text-green-800`
      case 'error':
        return `${baseStyles} bg-red-50 border-red-500 text-red-800`
      case 'warning':
        return `${baseStyles} bg-yellow-50 border-yellow-500 text-yellow-800`
      case 'info':
        return `${baseStyles} bg-blue-50 border-blue-500 text-blue-800`
      case 'upgrade':
        return `${baseStyles} bg-gradient-to-r from-purple-50 to-blue-50 border-purple-500 text-purple-800`
      case 'tutorial':
        return `${baseStyles} bg-indigo-50 border-indigo-500 text-indigo-800`
      default:
        return `${baseStyles} bg-gray-50 border-gray-500 text-gray-800`
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`${getNotificationStyles(notification.type)} animate-slide-in`}
          style={{
            animationDelay: `${index * 100}ms`,
            transform: `translateX(${index * 10}px)`
          }}
        >
          <div className="flex items-start gap-3">
            <div className="text-xl flex-shrink-0">
              {notification.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm mb-1">
                {notification.title}
              </h4>
              {notification.message && (
                <p className="text-sm opacity-90 leading-relaxed">
                  {notification.message}
                </p>
              )}
              
              {notification.action && (
                <div className="mt-3">
                  <a
                    href={notification.action.href}
                    className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    {notification.action.label}
                  </a>
                </div>
              )}
            </div>
            
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Hook pour les notifications intelligentes basées sur le comportement utilisateur
export function useSmartNotifications() {
  const { showSuccess, showError, showWarning, showInfo, showUpgradePrompt, showTutorial } = useNotifications()

  const notifySignatureCreated = (templateName) => {
    showSuccess(
      'Signature créée !',
      `Votre signature "${templateName}" a été générée avec succès.`,
      4000
    )
  }

  const notifySignatureCopied = () => {
    showSuccess(
      'Copié !',
      'Votre signature a été copiée dans le presse-papiers.',
      3000
    )
  }

  const notifySignatureDownloaded = (fileName) => {
    showSuccess(
      'Téléchargé !',
      `Votre signature "${fileName}" a été téléchargée.`,
      3000
    )
  }

  const notifyLimitReached = () => {
    showUpgradePrompt(
      'Vous avez atteint votre limite de 3 signatures gratuites. Passez en Pro pour créer des signatures illimitées !'
    )
  }

  const notifyUpgradeBenefit = (benefit) => {
    showInfo(
      'Fonctionnalité Pro',
      `En tant qu'utilisateur Pro, vous pouvez ${benefit}.`,
      5000
    )
  }

  const notifyWelcome = (userName) => {
    showSuccess(
      'Bienvenue !',
      `Bonjour ${userName}, ravi de vous revoir sur SignatureGen !`,
      4000
    )
  }

  const notifyTutorial = (feature) => {
    showTutorial(
      'Nouvelle fonctionnalité',
      `Découvrez comment utiliser ${feature} pour améliorer vos signatures.`,
      {
        label: 'Voir le tutoriel',
        href: '/tutorial'
      }
    )
  }

  return {
    notifySignatureCreated,
    notifySignatureCopied,
    notifySignatureDownloaded,
    notifyLimitReached,
    notifyUpgradeBenefit,
    notifyWelcome,
    notifyTutorial
  }
}

// Styles CSS pour les animations
const styles = `
  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .animate-slide-in {
    animation: slide-in 0.3s ease-out forwards;
  }
`

// Injecter les styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
} 