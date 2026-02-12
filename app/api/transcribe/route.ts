import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json().catch(() => ({}))
    if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 })

    // Fetch remote audio
    const resp = await fetch(url)
    if (!resp.ok) return NextResponse.json({ error: `fetch failed: ${resp.status}` }, { status: 400 })
    const arrayBuf = await resp.arrayBuffer()
    const blob = new Blob([arrayBuf], { type: resp.headers.get('content-type') || 'audio/mpeg' })

    // Transcribe with timestamps if available
    const file = new File([blob], 'audio.mp3', { type: blob.type })
    const tr = await openai.audio.transcriptions.create({
      model: 'whisper-1',
      file,
      response_format: 'verbose_json'
    } as any)

    return NextResponse.json({ ok: true, transcription: tr })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'transcription failed' }, { status: 500 })
  }
}
