# Yardy Translate

Crowd-translate Jamaican dancehall lyrics into Spanish and Brazilian Portuguese with human-in-the-loop consensus and Solana rewards (devnet demo).

## Stack
- Next.js 14 (app router)
- API routes (server actions coming)
- Supabase/Postgres (schema in `sql/schema.sql`)
- OpenAI Whisper for transcription + segmentation
- AgentWallet for Solana devnet payouts

## Getting Started

1. Create a Supabase project and run `sql/schema.sql` (SQL Editor → paste and run).
2. Copy `.env.example` to `.env.local` and fill in values.
3. Install deps and run dev:

```bash
npm i
npm run dev
```

Open http://localhost:3004

### Required Environment
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
OPENAI_API_KEY=...
AGENTWALLET_USERNAME=orlandotyrell
AGENTWALLET_API_TOKEN=mf_...
PAYOUT_RECIPIENT_SOL=DEVNET_ADDRESS
```

## Payouts (Devnet)
- Set `AGENTWALLET_USERNAME` and `AGENTWALLET_API_TOKEN` from AgentWallet connect flow.
- Set `PAYOUT_RECIPIENT_SOL` to a devnet address for testing payouts.

## Roadmap (MVP)
- [ ] Audio upload + Whisper transcription (timestamps)
- [ ] Task creation (patois→en, en→es, en→pt-BR)
- [ ] Translator UI + submission
- [ ] Reviewer consensus (2/3)
- [ ] Devnet payout trigger via AgentWallet
- [ ] Basic reputation + anti-cheat checks

## License
MIT
