'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function GoogleAnalytics() {
  const pathname = usePathname()
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    // Charger Google Analytics
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag(...args) {
      window.dataLayer.push(args)
    }
    gtag('js', new Date())
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })

    return () => {
      document.head.removeChild(script)
    }
  }, [GA_MEASUREMENT_ID])

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return

    // Tracker les changements de page
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname,
      page_title: document.title,
    })
  }, [pathname, GA_MEASUREMENT_ID])

  // Fonction pour tracker les événements personnalisés
  const trackEvent = (action, category, label, value) => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }

  // Exposer la fonction globalement
  if (typeof window !== 'undefined') {
    window.trackGAEvent = trackEvent
  }

  return null
} 