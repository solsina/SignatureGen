import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request) {
  try {
    // Récupérer l'utilisateur depuis le header d'autorisation
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentification requise' },
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

    // Récupérer les paramètres de date
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30d' // 7d, 30d, 90d, all
    
    let dateFilter = ''
    if (period !== 'all') {
      const days = period === '7d' ? 7 : period === '30d' ? 30 : 90
      const date = new Date()
      date.setDate(date.getDate() - days)
      dateFilter = `created_at >= '${date.toISOString()}'`
    }

    // Récupérer les statistiques par type d'événement
    let query = supabaseAdmin
      .from('analytics')
      .select('event_type, event_data')
      .eq('user_id', user.id)

    if (dateFilter) {
      query = query.filter(dateFilter)
    }

    const { data: events, error } = await query

    if (error) {
      console.error('Erreur récupération analytics:', error)
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des analytics' },
        { status: 500 }
      )
    }

    // Grouper par type d'événement
    const summary = events.reduce((acc, event) => {
      if (!acc[event.event_type]) {
        acc[event.event_type] = {
          count: 0,
          details: []
        }
      }
      acc[event.event_type].count++
      acc[event.event_type].details.push(event.event_data)
      return acc
    }, {})

    // Calculer des statistiques supplémentaires
    const stats = {
      totalEvents: events.length,
      signaturesCreated: summary.signature_created?.count || 0,
      signaturesDeleted: summary.signature_deleted?.count || 0,
      templatesUsed: summary.signature_created?.details?.reduce((acc, detail) => {
        if (detail.template_name) {
          acc[detail.template_name] = (acc[detail.template_name] || 0) + 1
        }
        return acc
      }, {}) || {},
      period,
      lastActivity: events.length > 0 ? Math.max(...events.map(e => new Date(e.created_at).getTime())) : null
    }

    return NextResponse.json({
      summary,
      stats
    })

  } catch (error) {
    console.error('Erreur API analytics summary:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
} 