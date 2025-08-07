export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            Conditions d'utilisation
          </h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 mb-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                1. Acceptation des conditions
              </h2>
              <p className="text-slate-700">
                En utilisant SignatureGen, vous acceptez d'être lié par ces conditions d'utilisation. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                2. Description du service
              </h2>
              <p className="text-slate-700 mb-4">
                SignatureGen est un service en ligne qui permet de créer des signatures email professionnelles. 
                Notre service inclut :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Générateur de signatures email</li>
                <li>Templates personnalisables</li>
                <li>Export HTML des signatures</li>
                <li>Stockage et gestion des signatures créées</li>
                <li>Support client</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                3. Inscription et compte utilisateur
              </h2>
              <p className="text-slate-700 mb-4">
                Pour utiliser notre service, vous devez :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Créer un compte avec des informations exactes</li>
                <li>Maintenir la confidentialité de vos identifiants</li>
                <li>Être responsable de toutes les activités de votre compte</li>
                <li>Nous informer immédiatement de toute utilisation non autorisée</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                4. Utilisation acceptable
              </h2>
              <p className="text-slate-700 mb-4">
                Vous vous engagez à utiliser notre service uniquement à des fins légales et appropriées. 
                Il est interdit de :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Utiliser le service pour des activités illégales</li>
                <li>Violer les droits de propriété intellectuelle</li>
                <li>Tenter de pirater ou compromettre la sécurité</li>
                <li>Spammer ou envoyer du contenu malveillant</li>
                <li>Utiliser le service pour harceler ou intimider</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                5. Contenu utilisateur
              </h2>
              <p className="text-slate-700 mb-4">
                Vous conservez la propriété de vos signatures créées. En utilisant notre service, vous :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Garantissez que vous avez les droits sur le contenu</li>
                <li>Nous accordez une licence pour stocker et traiter vos signatures</li>
                <li>Êtes responsable du contenu de vos signatures</li>
                <li>Ne pouvez pas utiliser notre service pour du contenu offensant</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                6. Abonnements et paiements
              </h2>
              <p className="text-slate-700 mb-4">
                Nos services sont proposés selon différents plans :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Plan gratuit avec limitations</li>
                <li>Plans payants avec fonctionnalités étendues</li>
                <li>Paiements récurrents pour les abonnements</li>
                <li>Possibilité d'annulation à tout moment</li>
                <li>Remboursement selon notre politique</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                7. Propriété intellectuelle
              </h2>
              <p className="text-slate-700 mb-4">
                SignatureGen et son contenu sont protégés par les droits de propriété intellectuelle. 
                Vous ne pouvez pas :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Copier ou reproduire notre code ou design</li>
                <li>Modifier ou décompiler notre logiciel</li>
                <li>Utiliser nos marques sans autorisation</li>
                <li>Extraire ou réutiliser nos données</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                8. Limitation de responsabilité
              </h2>
              <p className="text-slate-700">
                SignatureGen est fourni "en l'état" sans garanties. Nous ne serons pas responsables 
                des dommages indirects, accessoires ou consécutifs résultant de l'utilisation de notre service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                9. Résiliation
              </h2>
              <p className="text-slate-700 mb-4">
                Nous pouvons résilier ou suspendre votre compte dans les cas suivants :
              </p>
              <ul className="list-disc list-inside text-slate-700 space-y-2 ml-4">
                <li>Violation de ces conditions</li>
                <li>Utilisation frauduleuse du service</li>
                <li>Non-paiement des frais d'abonnement</li>
                <li>Activité préjudiciable à notre communauté</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                10. Modifications des conditions
              </h2>
              <p className="text-slate-700">
                Nous nous réservons le droit de modifier ces conditions à tout moment. 
                Les modifications prendront effet immédiatement après leur publication. 
                Votre utilisation continue du service constitue votre acceptation des nouvelles conditions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                11. Droit applicable
              </h2>
              <p className="text-slate-700">
                Ces conditions sont régies par le droit français. Tout litige sera soumis 
                à la compétence exclusive des tribunaux français.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                12. Contact
              </h2>
              <p className="text-slate-700">
                Pour toute question concernant ces conditions d'utilisation, 
                contactez-nous à : <a href="mailto:legal@signaturegen.com" className="text-blue-600 hover:text-blue-500">legal@signaturegen.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 