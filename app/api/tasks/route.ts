import { NextRequest, NextResponse } from 'next/server'

// Placeholder in-memory store for hackathon demo
const TASKS: any[] = []

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lang = searchParams.get('lang') || undefined
  const tasks = TASKS.filter(t => !lang || t.target_lang === lang)
  return NextResponse.json({ tasks })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const { clipId, taskType, segmentIndex, sourceText, targetLang } = body
  if (!clipId || !taskType || segmentIndex == null) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  const task = { id: crypto.randomUUID(), clip_id: clipId, task_type: taskType, segment_index: segmentIndex, source_text: sourceText || null, target_lang: targetLang || null, status: 'open' }
  TASKS.push(task)
  return NextResponse.json({ task })
}
