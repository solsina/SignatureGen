'use client'

import { SignIn } from '@clerk/nextjs'
import { Card, CardContent } from '@/components/ui/card'

export function LoginForm() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connexion à votre compte
          </h2>
          <p className="text-gray-600">
            Accédez à vos signatures email
          </p>
        </div>
        
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200',
              card: 'shadow-none',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              dividerLine: 'hidden',
              dividerText: 'hidden',
              formFieldInput: 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              formFieldLabel: 'block text-sm font-medium text-gray-700 mb-1',
              socialButtonsBlockButton: 'w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200',
              socialButtonsBlockButtonText: 'font-semibold',
              footerActionLink: 'text-blue-600 hover:text-blue-500 font-semibold',
              footerActionText: 'text-gray-600'
            }
          }}
          redirectUrl="/create"
          signUpUrl="/signup"
        />
      </CardContent>
    </Card>
  )
} 