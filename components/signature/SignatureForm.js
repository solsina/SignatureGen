'use client'

import { useState } from 'react'

export default function SignatureForm({ formData, onFormDataChange, onSubmit, isLoading = false }) {
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Le nom complet est requis'
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide'
    }
    
    if (!formData.jobTitle?.trim()) {
      newErrors.jobTitle = 'Le poste est requis'
    }
    
    if (!formData.company?.trim()) {
      newErrors.company = 'L\'entreprise est requise'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field, value) => {
    onFormDataChange({
      ...formData,
      [field]: value
    })
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      })
    }
  }

  const inputFields = [
    {
      name: 'fullName',
      label: 'Nom complet',
      placeholder: 'Jean Dupont',
      required: true,
      icon: '👤'
    },
    {
      name: 'jobTitle',
      label: 'Poste',
      placeholder: 'Développeur Full Stack',
      required: true,
      icon: '💼'
    },
    {
      name: 'company',
      label: 'Entreprise',
      placeholder: 'TechCorp',
      required: true,
      icon: '🏢'
    },
    {
      name: 'email',
      label: 'Email professionnel',
      placeholder: 'jean.dupont@techcorp.com',
      required: true,
      type: 'email',
      icon: '📧'
    },
    {
      name: 'phone',
      label: 'Téléphone',
      placeholder: '+33 1 23 45 67 89',
      required: false,
      icon: '📞'
    },
    {
      name: 'website',
      label: 'Site web',
      placeholder: 'www.techcorp.com',
      required: false,
      icon: '🌐'
    },
    {
      name: 'address',
      label: 'Adresse',
      placeholder: '123 Rue de la Paix, 75001 Paris',
      required: false,
      icon: '📍'
    }
  ]

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">📝</span>
            Informations personnelles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map((field) => (
              <div key={field.name} className={field.name === 'address' ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.icon} {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                <div className="relative">
                  <input
                    type={field.type || 'text'}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                      errors[field.name] 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  />
                  
                  {errors[field.name] && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">⚙️</span>
            Options supplémentaires
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showBadge"
                checked={formData.showBadge !== false}
                onChange={(e) => handleInputChange('showBadge', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showBadge" className="ml-3 text-sm text-gray-700">
                Afficher le badge "Créé avec SignatureGen" 
                <span className="text-gray-500 ml-1">(gratuit uniquement)</span>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="includeSocial"
                checked={formData.includeSocial || false}
                onChange={(e) => handleInputChange('includeSocial', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="includeSocial" className="ml-3 text-sm text-gray-700">
                Inclure les réseaux sociaux
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Génération en cours...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Générer ma signature
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
} 