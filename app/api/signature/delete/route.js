import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function DELETE(request) {
  try {
    const body = await request.json()
    const { signatureId } = body

    if (!signatureId) {
      return NextResponse.json(
        { error: 'ID de signature requis' },
        { status: 400 }
      )
    }

    // Récupérer l'utilisateur depuis le header d'autorisation
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token d\'authentification requis' },
        { status: 401 }
      )
    }

    const token = authHeader.split(' ')[1]
    
    // Vérifier le token avec Supabase
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      )
    }

    // Vérifier que la signature appartient à l'utilisateur
    const { data: signature, error: signatureError } = await supabaseAdmin
      .from('signatures')
      .select('*')
      .eq('id', signatureId)
      .eq('user_id', user.id)
      .single()

    if (signatureError || !signature) {
      return NextResponse.json(
        { error: 'Signature non trouvée ou accès non autorisé' },
        { status: 404 }
      )
    }

    // Supprimer la signature
    const { error: deleteError } = await supabaseAdmin
      .from('signatures')
      .delete()
      .eq('id', signatureId)
      .eq('user_id', user.id)

    if (deleteError) {
      console.error('Erreur lors de la suppression de la signature:', deleteError)
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de la signature' },
        { status: 500 }
      )
    }

    // Décrémenter le compteur de signatures créées
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('signatures_created')
      .eq('id', user.id)
      .single()

    if (!profileError && profile) {
      const newCount = Math.max(0, profile.signatures_created - 1)
      
      await supabaseAdmin
        .from('profiles')
        .update({ 
          signatures_created: newCount,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
    }

    // Enregistrer l'événement analytics
    await supabaseAdmin
      .from('analytics')
      .insert({
        user_id: user.id,
        event_type: 'signature_deleted',
        event_data: {
          signature_id: signatureId,
          template_name: signature.template_name
        }
      })

    return NextResponse.json({
      success: true,
      message: 'Signature supprimée avec succès'
    })

  } catch (error) {
    console.error('Erreur lors de la suppression de la signature:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 