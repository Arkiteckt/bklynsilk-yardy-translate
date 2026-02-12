import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { url, title, durationMs } = body
    if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 })

    const { data, error } = await supabase
      .from('clips')
      .insert({ url, title: title || null, duration_ms: durationMs || null })
      .select('*')
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ clip: data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'upload failed' }, { status: 500 })
  }
}
