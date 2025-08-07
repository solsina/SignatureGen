import { NextResponse } from 'next/server'
import { supabaseAdmin, getUserSignatures } from '@/lib/supabase'
import { getTemplateByKey } from '@/lib/templates'

export async function POST(request) {
  try {
    const { templateKey, formData } = await request.json()

    // Vérifier l'authentification
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    // Vérifier les limites pour les utilisateurs gratuits
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('subscription_status, signatures_created, signatures_limit')
      .eq('id', user.id)
      .single()

    if (profile?.subscription_status === 'free') {
      const { data: signatures } = await getUserSignatures(user.id)
      if (signatures && signatures.length >= 3) {
        return NextResponse.json(
          { error: 'Limite de signatures gratuites atteinte' },
          { status: 403 }
        )
      }
    }

    // Générer la signature HTML
    const template = getTemplateByKey(templateKey)
    if (!template) {
      return NextResponse.json({ error: 'Template invalide' }, { status: 400 })
    }

    let htmlContent = template.html(formData)

    // Ajouter le badge si nécessaire
    if (formData.showBadge !== false) {
      htmlContent += `
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb; text-align: center;">
          <div style="font-size: 11px; color: #9ca3af; font-family: Arial, sans-serif;">
            Créé avec <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #3b82f6; text-decoration: none;">SignatureGen</a>
          </div>
        </div>
      `
    }

    // Sauvegarder la signature
    const { data: signature, error: saveError } = await supabaseAdmin
      .from('signatures')
      .insert({
        user_id: user.id,
        template_name: templateKey,
        html_content: htmlContent,
        form_data: formData,
        file_name: `signature-${formData.fullName?.replace(/\s+/g, '-').toLowerCase() || 'email'}`
      })
      .select()
      .single()

    if (saveError) {
      console.error('Erreur lors de la sauvegarde:', saveError)
      return NextResponse.json({ error: 'Erreur lors de la sauvegarde' }, { status: 500 })
    }

    // Mettre à jour le compteur de signatures
    await supabaseAdmin
      .from('profiles')
      .update({
        signatures_created: (profile?.signatures_created || 0) + 1
      })
      .eq('id', user.id)

    // Tracker l'événement
    await supabaseAdmin
      .from('analytics')
      .insert({
        user_id: user.id,
        event_type: 'signature_created',
        event_data: {
          template: templateKey,
          signature_id: signature.id
        }
      })

    return NextResponse.json({
      success: true,
      signature: {
        id: signature.id,
        html: htmlContent,
        template: templateKey,
        created_at: signature.created_at
      }
    })

  } catch (error) {
    console.error('Erreur API:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 