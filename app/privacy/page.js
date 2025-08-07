export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            Politique de confidentialité
          </h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                1. Informations que nous collectons
              </h2>
              <p className="text-slate-700 mb-4">
                Nous collectons les informations que vous nous fournissez directement, notamment :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Nom et adresse email lors de l'inscription</li>
                <li>Informations de profil (poste, entreprise, téléphone)</li>
                <li>Contenu des signatures email créées</li>
                <li>Données d'utilisation et interactions avec notre service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                2. Comment nous utilisons vos informations
              </h2>
              <p className="text-slate-700 mb-4">
                Nous utilisons vos informations pour :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Fournir et améliorer notre service de génération de signatures</li>
                <li>Gérer votre compte et vos abonnements</li>
                <li>Vous contacter concernant votre compte ou le service</li>
                <li>Analyser l'utilisation pour améliorer notre plateforme</li>
                <li>Prévenir la fraude et assurer la sécurité</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                3. Partage des informations
              </h2>
              <p className="text-slate-700 mb-4">
                Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. 
                Nous pouvons partager vos informations uniquement dans les cas suivants :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Avec votre consentement explicite</li>
                <li>Avec nos prestataires de services (hébergement, paiements)</li>
                <li>Pour respecter les obligations légales</li>
                <li>Pour protéger nos droits et notre sécurité</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                4. Sécurité des données
              </h2>
              <p className="text-slate-700 mb-4">
                Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Chiffrement SSL/TLS pour toutes les transmissions</li>
                <li>Stockage sécurisé avec chiffrement au repos</li>
                <li>Accès restreint aux données personnelles</li>
                <li>Surveillance continue de la sécurité</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                5. Vos droits
              </h2>
              <p className="text-slate-700 mb-4">
                Vous avez le droit de :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Accéder à vos informations personnelles</li>
                <li>Corriger des informations inexactes</li>
                <li>Demander la suppression de vos données</li>
                <li>Vous opposer au traitement de vos données</li>
                <li>Exporter vos données dans un format portable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                6. Cookies et technologies similaires
              </h2>
              <p className="text-slate-700 mb-4">
                Nous utilisons des cookies et des technologies similaires pour :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Améliorer l'expérience utilisateur</li>
                <li>Analyser l'utilisation du site</li>
                <li>Personnaliser le contenu</li>
                <li>Assurer la sécurité</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                7. Conservation des données
              </h2>
              <p className="text-slate-700">
                Nous conservons vos informations personnelles aussi longtemps que nécessaire 
                pour fournir nos services et respecter nos obligations légales. 
                Vous pouvez demander la suppression de votre compte à tout moment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                8. Modifications de cette politique
              </h2>
              <p className="text-slate-700">
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. 
                Nous vous informerons de tout changement important par email ou via notre site web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                9. Nous contacter
              </h2>
              <p className="text-slate-700">
                Si vous avez des questions concernant cette politique de confidentialité, 
                contactez-nous à : <a href="mailto:privacy@signaturegen.com" className="text-blue-600 hover:text-blue-500">privacy@signaturegen.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 