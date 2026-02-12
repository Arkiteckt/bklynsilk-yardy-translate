import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  // TODO: implement file upload (form-data) to storage (Supabase storage or local /uploads)
  // For now, accept JSON with { url, title, durationMs }
  const body = await req.json().catch(() => ({}))
  const { url, title, durationMs } = body
  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 })
  const clip = { id: crypto.randomUUID(), url, title: title || null, duration_ms: durationMs || null }
  return NextResponse.json({ clip })
}
