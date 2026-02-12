import { NextRequest, NextResponse } from 'next/server'
import { transferSOL } from '@/lib/agentwallet'

export async function POST(req: NextRequest) {
  try {
    const { to, lamports } = await req.json()
    if (!to || !lamports) return NextResponse.json({ error: 'Missing to/lamports' }, { status: 400 })

    const username = process.env.AGENTWALLET_USERNAME!
    const apiToken = process.env.AGENTWALLET_API_TOKEN!
    if (!username || !apiToken) return NextResponse.json({ error: 'AgentWallet not configured' }, { status: 500 })

    const res = await transferSOL({ username, apiToken }, to, String(lamports), 'devnet')
    return NextResponse.json({ ok: true, transfer: res })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'payout failed' }, { status: 500 })
  }
}
