import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function CreatePage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Créer votre signature
          </h1>
          <p className="text-gray-600 text-lg">
            Générez une signature email professionnelle en quelques clics
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              🚀 Fonctionnalité en cours de développement
            </h2>
            <p className="text-gray-600 mb-6">
              L'éditeur de signatures sera bientôt disponible !
            </p>
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg inline-block">
              SignatureGen - Prêt pour le déploiement
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
