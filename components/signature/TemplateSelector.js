'use client'

import { useState } from 'react'
import { getTemplateCategories } from '@/lib/templates'

export default function TemplateSelector({ selectedTemplate, onTemplateSelect, userSubscription = 'free' }) {
  const [activeCategory, setActiveCategory] = useState('free')
  const categories = getTemplateCategories()

  const handleTemplateSelect = (templateKey) => {
    const template = categories[activeCategory].find(t => t.key === templateKey)
    if (template.category === 'premium' && userSubscription === 'free') {
      // Rediriger vers la page d'upgrade
      window.location.href = '/upgrade'
      return
    }
    onTemplateSelect(templateKey)
  }

  const renderTemplatePreview = (template) => {
    const sampleData = {
      fullName: 'Jean Dupont',
      jobTitle: 'Développeur Full Stack',
      company: 'TechCorp',
      email: 'jean.dupont@techcorp.com',
      phone: '+33 1 23 45 67 89',
      website: 'www.techcorp.com',
      address: 'Paris, France'
    }

    return (
      <div 
        className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={() => handleTemplateSelect(template.key)}
      >
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300">
          {/* Preview */}
          <div className="p-4 bg-gray-50 border-b border-gray-100">
            <div 
              className="transform scale-75 origin-top-left"
              dangerouslySetInnerHTML={{ 
                __html: template.html(sampleData) 
              }}
            />
          </div>
          
          {/* Template Info */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
              {template.category === 'premium' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  Premium
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
            
            {/* Selection Indicator */}
            {selectedTemplate === template.key && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            {/* Premium Lock */}
            {template.category === 'premium' && userSubscription === 'free' && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                <div className="text-center text-white">
                  <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium">Upgrade requis</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Category Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setActiveCategory('free')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeCategory === 'free'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Templates Gratuits ({categories.free.length})
          </button>
          <button
            onClick={() => setActiveCategory('premium')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeCategory === 'premium'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Templates Premium ({categories.premium.length})
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories[activeCategory].map((template) => (
          <div key={template.key}>
            {renderTemplatePreview(template)}
          </div>
        ))}
      </div>

      {/* Premium Upgrade CTA */}
      {activeCategory === 'premium' && userSubscription === 'free' && (
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Débloquez tous les templates premium
            </h3>
            <p className="text-gray-600 mb-4">
              Accédez à des designs exclusifs et professionnels pour vos signatures email
            </p>
            <button
              onClick={() => window.location.href = '/upgrade'}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Voir les plans premium
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 