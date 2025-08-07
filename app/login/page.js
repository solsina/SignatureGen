import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            SignatureGen
          </h1>
          <p className="text-gray-600">
            Générateur de signatures email professionnelles
          </p>
          {/* Clerk Authentication - Google OAuth Only */}
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
      </div>
    </div>
  )
}
