'use client'

import { useState } from 'react'
import { getTemplateByKey } from '@/lib/templates'

export default function SignaturePreview({ templateKey, formData, onExport }) {
  const [isCopied, setIsCopied] = useState(false)
  const template = getTemplateByKey(templateKey)

  if (!template || !formData) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aperçu de la signature</h3>
          <p className="text-gray-600">Remplissez le formulaire pour voir un aperçu de votre signature</p>
        </div>
      </div>
    )
  }

  const generateSignatureHTML = () => {
    let html = template.html(formData)
    
    // Ajouter le badge si nécessaire
    if (formData.showBadge !== false) {
      html += `
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb; text-align: center;">
          <div style="font-size: 11px; color: #9ca3af; font-family: Arial, sans-serif;">
            Créé avec <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #3b82f6; text-decoration: none;">SignatureGen</a>
          </div>
        </div>
      `
    }
    
    return html
  }

  const copyToClipboard = async () => {
    try {
      const html = generateSignatureHTML()
      await navigator.clipboard.writeText(html)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
    }
  }

  const downloadHTML = () => {
    const html = generateSignatureHTML()
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `signature-${formData.fullName?.replace(/\s+/g, '-').toLowerCase() || 'email'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const exportOptions = [
    {
      name: 'Copier HTML',
      icon: '📋',
      action: copyToClipboard,
      variant: 'primary'
    },
    {
      name: 'Télécharger HTML',
      icon: '💾',
      action: downloadHTML,
      variant: 'secondary'
    },
    {
      name: 'Voir le code',
      icon: '👁️',
      action: () => onExport('code'),
      variant: 'outline'
    }
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Aperçu de votre signature</h3>
              <p className="text-sm text-gray-600">Template: {template.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              {exportOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={option.action}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    option.variant === 'primary'
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                      : option.variant === 'secondary'
                      ? 'bg-gray-600 text-white hover:bg-gray-700 shadow-md hover:shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                >
                  <span className="mr-2">{option.icon}</span>
                  {option.name === 'Copier HTML' && isCopied ? 'Copié !' : option.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div 
                className="signature-preview"
                dangerouslySetInnerHTML={{ 
                  __html: generateSignatureHTML() 
                }}
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-1">Comment utiliser votre signature</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>1. Copiez le code HTML ou téléchargez le fichier</p>
                <p>2. Dans votre client email (Gmail, Outlook, etc.), allez dans les paramètres de signature</p>
                <p>3. Collez le code HTML ou importez le fichier téléchargé</p>
                <p>4. Sauvegardez vos paramètres</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compatibility Info */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Compatible avec tous les clients email</h4>
            <p className="text-sm text-blue-700">Gmail, Outlook, Apple Mail, Thunderbird, et plus encore</p>
          </div>
        </div>
      </div>
    </div>
  )
} 