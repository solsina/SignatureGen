'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Copy, Check, ExternalLink } from 'lucide-react'

export function ExportOptions({ html }) {
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(html)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
    }
  }

  const downloadHtml = () => {
    setDownloading(true)
    
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'signature-email.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setTimeout(() => setDownloading(false), 1000)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Button 
          onClick={downloadHtml}
          disabled={downloading}
          className="flex-1"
        >
          <Download className="h-4 w-4 mr-2" />
          {downloading ? 'Téléchargement...' : 'Télécharger HTML'}
        </Button>
        
        <Button 
          onClick={copyToClipboard}
          variant="outline"
          className="flex-1"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copié !
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copier HTML
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Instructions d'installation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Gmail</h4>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Ouvrez Gmail et allez dans Paramètres</li>
              <li>Onglet "Général" → section "Signature"</li>
              <li>Collez le code HTML dans l'éditeur</li>
              <li>Cliquez sur "Modifier" pour activer l'éditeur HTML</li>
              <li>Sauvegardez vos modifications</li>
            </ol>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Outlook</h4>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Ouvrez Outlook et allez dans Fichier → Options</li>
              <li>Onglet "Courrier" → "Signatures"</li>
              <li>Créez une nouvelle signature</li>
              <li>Collez le code HTML dans l'éditeur</li>
              <li>Cliquez sur "OK" pour sauvegarder</li>
            </ol>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Apple Mail</h4>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Ouvrez Mail et allez dans Préférences</li>
              <li>Onglet "Signatures"</li>
              <li>Créez une nouvelle signature</li>
              <li>Collez le code HTML dans l'éditeur</li>
              <li>Fermez les préférences</li>
            </ol>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Conseil :</strong> Testez votre signature en vous envoyant un email avant de l'utiliser en production.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 