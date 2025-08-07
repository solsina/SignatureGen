'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const subjects = [
    'Support technique',
    'Question sur les plans',
    'Problème de facturation',
    'Suggestion d\'amélioration',
    'Autre'
  ]

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'support@signaturegen.com',
      subtitle: 'Réponse sous 24h'
    },
    {
      icon: '🕐',
      label: 'Horaires de support',
      value: 'Lundi - Vendredi',
      subtitle: '9h00 - 18h00 (CET)'
    },
    {
      icon: '🌐',
      label: 'Langues',
      value: 'Français, Anglais',
      subtitle: 'Support multilingue'
    }
  ]

  const faqs = [
    {
      question: 'Comment fonctionne SignatureGen ?',
      answer: 'Créez votre signature en quelques clics, personnalisez-la selon vos besoins et exportez-la en HTML.'
    },
    {
      question: 'Quels clients email sont supportés ?',
      answer: 'Gmail, Outlook, Apple Mail et tous les clients compatibles HTML.'
    },
    {
      question: 'Puis-je annuler mon abonnement ?',
      answer: 'Oui, vous pouvez annuler à tout moment depuis votre espace client.'
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulation d'envoi
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setFormData({ fullName: '', email: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-purple-200 hover:text-white">
                <span>←</span>
                <span>Retour</span>
              </Link>
              <div className="h-6 w-px bg-white/20"></div>
              <h1 className="text-xl font-semibold text-white">Contact</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Notre équipe est là pour vous aider. N'hésitez pas à nous contacter !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Envoyez-nous un message
            </h2>

            {success && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                <p className="text-green-300">
                  ✅ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-white placeholder-purple-300"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-white placeholder-purple-300"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Sujet *
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-white"
                >
                  <option value="">Choisir un sujet</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-white placeholder-purple-300 resize-none"
                  placeholder="Décrivez votre demande..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Envoi en cours...
                  </div>
                ) : (
                  'Envoyer le message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Informations de contact
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-2xl">{info.icon}</div>
                    <div>
                      <div className="font-semibold text-white mb-1">
                        {info.label}
                      </div>
                      <div className="text-purple-200 mb-1">
                        {info.value}
                      </div>
                      <div className="text-sm text-purple-300">
                        {info.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Questions fréquentes
              </h3>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-white mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-purple-200 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <Link
                  href="/upgrade"
                  className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                >
                  Voir tous nos plans →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Besoin d'aide supplémentaire ?
          </h3>
          <p className="text-purple-200 mb-6 max-w-2xl mx-auto">
            Consultez notre base de connaissances ou créez votre première signature
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">⚡</span>
              Créer ma signature
            </Link>
            <Link
              href="/upgrade"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-lg"
            >
              <span className="mr-2">💎</span>
              Voir nos plans
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 