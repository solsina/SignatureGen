import Link from 'next/link'
import { SignInButton } from '@clerk/nextjs'

export default function HomePage() {
  const features = [
    {
      icon: '🎨',
      title: 'Templates variés',
      description: 'Choisissez parmi 7 templates professionnels, du classique au moderne'
    },
    {
      icon: '⚡',
      title: 'Création rapide',
      description: 'Générez votre signature en moins de 2 minutes avec notre interface intuitive'
    },
    {
      icon: '📱',
      title: 'Compatible partout',
      description: 'Fonctionne avec Gmail, Outlook, Apple Mail et tous les clients email'
    },
    {
      icon: '🔒',
      title: 'Sécurisé',
      description: 'Vos données sont protégées et vous gardez le contrôle total'
    },
    {
      icon: '💎',
      title: 'Premium disponible',
      description: 'Upgradez pour des templates exclusifs et des fonctionnalités avancées'
    },
    {
      icon: '📊',
      title: 'Analytics inclus',
      description: 'Suivez l\'utilisation de vos signatures et optimisez votre impact'
    }
  ]

  const testimonials = [
    {
      name: 'Marie Dubois',
      role: 'Directrice Marketing',
      company: 'TechStart',
      content: 'SignatureGen m\'a permis de créer une signature professionnelle en quelques minutes. Mes emails ont maintenant un impact beaucoup plus fort !',
      avatar: '👩‍💼'
    },
    {
      name: 'Thomas Martin',
      role: 'Développeur Senior',
      company: 'CodeCorp',
      content: 'Interface simple et templates modernes. Parfait pour donner une image professionnelle à mes communications.',
      avatar: '👨‍💻'
    },
    {
      name: 'Sophie Bernard',
      role: 'Consultante',
      company: 'ConsultPro',
      content: 'J\'utilise SignatureGen depuis 6 mois et mes clients me complimentent sur la qualité de mes signatures.',
      avatar: '👩‍💼'
    }
  ]

  const pricingPlans = [
    {
      name: 'Gratuit',
      price: '0€',
      period: 'pour toujours',
      features: [
        '3 signatures gratuites',
        '3 templates basiques',
        'Export HTML',
        'Badge "Créé avec"',
        'Support communautaire'
      ],
      cta: 'Commencer gratuitement',
      popular: false
    },
    {
      name: 'Pro',
      price: '9,99€',
      period: 'par mois',
      features: [
        'Signatures illimitées',
        '7 templates premium',
        'Sans badge',
        'Export PDF',
        'Support prioritaire',
        'Analytics avancées'
      ],
      cta: 'Essayer Pro',
      popular: true
    },
    {
      name: 'Business',
      price: '29,99€',
      period: 'par mois',
      features: [
        'Tout du plan Pro',
        'Gestion d\'équipe',
        'Templates personnalisés',
        'API d\'intégration',
        'Support dédié',
        'Formation incluse'
      ],
      cta: 'Contacter l\'équipe',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100">
      {/* Force Vercel deployment - Clerk Google OAuth only */}
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Créez des signatures email{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  professionnelles
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Générez des signatures email modernes et attrayantes en quelques clics. 
                Compatible avec tous les clients email. Commencez gratuitement !
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <SignInButton mode="modal">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                    Commencer gratuitement
                  </button>
                </SignInButton>
                <Link
                  href="/templates"
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                >
                  Voir les templates
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                ✨ Plus de 10,000 signatures créées • ⭐ 4.9/5 étoiles
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Pourquoi choisir SignatureGen ?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tout ce dont vous avez besoin pour créer des signatures email qui vous représentent
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ce que disent nos utilisateurs
              </h2>
              <p className="text-xl text-gray-600">
                Rejoignez des milliers de professionnels qui font confiance à SignatureGen
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role} chez {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Plans adaptés à vos besoins
              </h2>
              <p className="text-xl text-gray-600">
                Commencez gratuitement, upgradez quand vous en avez besoin
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`relative bg-white rounded-xl p-8 border-2 ${
                  plan.popular ? 'border-blue-500 shadow-xl' : 'border-gray-200'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Plus populaire
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <SignInButton mode="modal">
                    <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}>
                      {plan.cta}
                    </button>
                  </SignInButton>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Prêt à créer votre signature professionnelle ?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Rejoignez des milliers de professionnels qui utilisent SignatureGen
            </p>
            <SignInButton mode="modal">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg">
                Commencer maintenant
              </button>
            </SignInButton>
          </div>
        </section>
      </div>
    </div>
  )
} 