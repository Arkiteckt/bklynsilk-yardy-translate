import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get('lang') || undefined

  let query = supabase.from('tasks').select('*').order('created_at', { ascending: false })
  if (lang) query = query.eq('target_lang', lang)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ tasks: data })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { clipId, taskType, segmentIndex, sourceText, targetLang } = body
  if (!clipId || !taskType || segmentIndex == null) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const { data, error } = await supabase
    .from('tasks')
    .insert({ clip_id: clipId, task_type: taskType, segment_index: segmentIndex, source_text: sourceText || null, target_lang: targetLang || null })
    .select('*')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ task: data })
}
