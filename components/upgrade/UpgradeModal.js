'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Check, Star, Zap, Infinity } from 'lucide-react'

export function UpgradeModal({ isOpen, onClose, trigger = 'limit' }) {
  const [isLoading, setIsLoading] = useState(false)

  const plans = [
    {
      name: 'Pro',
      price: '9.99',
      period: 'mois',
      features: [
        'Signatures illimitées',
        'Templates premium',
        'Sans badge "Créé avec SignatureGen"',
        'Support prioritaire',
        'Export en PDF',
        'Historique complet'
      ],
      popular: true
    },
    {
      name: 'Business',
      price: '29.99',
      period: 'mois',
      features: [
        'Tout du plan Pro',
        'Gestion d\'équipe (5 utilisateurs)',
        'Templates personnalisés',
        'API d\'intégration',
        'Analytics avancées',
        'Support dédié'
      ],
      popular: false
    }
  ]

  const handleUpgrade = async (planName) => {
    setIsLoading(true)
    // TODO: Intégrer Lemon Squeezy (Jour 4)
    console.log(`Upgrade vers ${planName}`)
    
    // Simulation d'un délai
    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 2000)
  }

  const getTriggerMessage = () => {
    switch (trigger) {
      case 'limit':
        return 'Vous avez atteint votre limite de signatures gratuites !'
      case 'badge':
        return 'Supprimez le badge "Créé avec SignatureGen" !'
      case 'features':
        return 'Débloquez toutes les fonctionnalités premium !'
      default:
        return 'Passez en premium pour plus de fonctionnalités !'
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Star className="h-6 w-6 text-yellow-500" />
                Passez en Premium
              </CardTitle>
              <CardDescription className="text-lg">
                {getTriggerMessage()}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Plans */}
          <div className="grid md:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.name}
                className={`relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                    <Star className="h-3 w-3 mr-1" />
                    Populaire
                  </Badge>
                )}
                
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handleUpgrade(plan.name)}
                    disabled={isLoading}
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Choisir {plan.name}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Comparaison avec le plan gratuit */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">Plan Gratuit vs Premium</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="font-semibold">Fonctionnalité</div>
                <div className="font-semibold text-center">Gratuit</div>
                <div className="font-semibold text-center">Premium</div>
                
                <div>Signatures</div>
                <div className="text-center">3</div>
                <div className="text-center flex items-center justify-center gap-1">
                  <Infinity className="h-4 w-4" />
                  Illimitées
                </div>
                
                <div>Badge "Créé avec"</div>
                <div className="text-center">Obligatoire</div>
                <div className="text-center text-green-600">Supprimé</div>
                
                <div>Templates</div>
                <div className="text-center">3 basiques</div>
                <div className="text-center">+ Premium</div>
                
                <div>Support</div>
                <div className="text-center">Email</div>
                <div className="text-center">Prioritaire</div>
              </div>
            </CardContent>
          </Card>

          {/* Garantie */}
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">
              🛡️ Garantie 30 jours
            </h3>
            <p className="text-sm text-green-700">
              Pas satisfait ? Remboursement complet sous 30 jours, sans question.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 