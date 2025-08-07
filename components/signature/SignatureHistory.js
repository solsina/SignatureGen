'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useSignature } from '@/hooks/useSignature'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  History, 
  Copy, 
  Download, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  Calendar,
  User
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

export function SignatureHistory() {
  const { user } = useAuth()
  const { getSignatures, deleteSignature, copyToClipboard, downloadSignature, loading, error } = useSignature()
  const [signatures, setSignatures] = useState([])
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    if (user) {
      loadSignatures()
    }
  }, [user, pagination.page])

  const loadSignatures = async () => {
    const result = await getSignatures(pagination.page, pagination.limit)
    if (result) {
      setSignatures(result.signatures || [])
      setPagination(prev => ({
        ...prev,
        total: result.pagination?.total || 0,
        totalPages: result.pagination?.totalPages || 0
      }))
    }
  }

  const handleDelete = async (signatureId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette signature ?')) {
      return
    }

    setDeletingId(signatureId)
    const success = await deleteSignature(signatureId)
    if (success) {
      // Recharger les signatures
      loadSignatures()
    }
    setDeletingId(null)
  }

  const handleDuplicate = (signature) => {
    // Préremplir le formulaire avec les données de la signature
    // Cette fonction sera passée au parent pour mettre à jour le formulaire
    if (window.location.pathname === '/create') {
      // Émettre un événement personnalisé pour préremplir le formulaire
      window.dispatchEvent(new CustomEvent('duplicateSignature', {
        detail: signature.signatureData
      }))
    } else {
      // Rediriger vers la page de création avec les données
      const params = new URLSearchParams({
        duplicate: signature.id,
        ...signature.signatureData
      })
      window.location.href = `/create?${params.toString()}`
    }
  }

  const handleEdit = (signature) => {
    // Rediriger vers la page de création en mode édition
    const params = new URLSearchParams({
      edit: signature.id,
      ...signature.signatureData
    })
    window.location.href = `/create?${params.toString()}`
  }

  const handleCopy = async (htmlContent) => {
    const success = await copyToClipboard(htmlContent)
    if (success) {
      // Optionnel : afficher un toast de succès
    }
  }

  const handleDownload = (htmlContent, fileName) => {
    downloadSignature(htmlContent, `${fileName}.html`)
  }

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }))
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Connectez-vous pour voir votre historique</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Historique des signatures
          </CardTitle>
          <CardDescription>
            Gérez vos signatures créées ({pagination.total} au total)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {loading && signatures.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">Chargement...</p>
            </div>
          ) : signatures.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">Aucune signature créée</p>
              <p className="text-sm text-gray-400 mt-1">
                Créez votre première signature pour commencer
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {signatures.map((signature) => (
                <Card key={signature.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {signature.fileName}
                          </h3>
                          <Badge variant="outline">
                            {signature.templateName}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(signature.createdAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {signature.signatureData?.fullName || 'Nom non défini'}
                          </div>
                        </div>

                        {/* Aperçu de la signature */}
                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                          <div 
                            className="signature-preview text-sm"
                            dangerouslySetInnerHTML={{ 
                              __html: signature.htmlContent.substring(0, 200) + '...' 
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopy(signature.htmlContent)}
                          className="w-full"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copier
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(signature.htmlContent, signature.fileName)}
                          className="w-full"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDuplicate(signature)}
                          className="w-full"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Dupliquer
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(signature)}
                          className="w-full"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Modifier
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(signature.id)}
                          disabled={deletingId === signature.id}
                          className="w-full"
                        >
                          {deletingId === signature.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>
                          ) : (
                            <>
                              <Trash2 className="h-4 w-4 mr-1" />
                              Supprimer
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                Page {pagination.page} sur {pagination.totalPages}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => changePage(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => changePage(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 