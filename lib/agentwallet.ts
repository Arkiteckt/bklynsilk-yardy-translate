export type AgentWalletConfig = { username: string; apiToken: string }

async function aw(path: string, cfg: AgentWalletConfig, init?: RequestInit) {
  const url = `https://agentwallet.mcpay.tech${path}`
  const res = await fetch(url, {
    ...init,
    headers: {
      'Authorization': `Bearer ${cfg.apiToken}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  if (!res.ok) throw new Error(`AgentWallet error ${res.status}`)
  return res.json()
}

export async function faucetSOL(cfg: AgentWalletConfig) {
  return aw(`/api/wallets/${cfg.username}/actions/faucet-sol`, cfg, { method: 'POST', body: '{}' })
}

export async function transferSOL(cfg: AgentWalletConfig, to: string, lamports: string, network: 'devnet'|'mainnet' = 'devnet') {
  return aw(`/api/wallets/${cfg.username}/actions/transfer-solana`, cfg, {
    method: 'POST',
    body: JSON.stringify({ to, amount: lamports, asset: 'sol', network })
  })
}
