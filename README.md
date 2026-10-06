# SPOOL

Solana investigation desk. Original pixel-art identity; real read-only mint and market requests; source-linked JSON reports and browser-local history. No financial transactions or token gating.

## Run

Node 24. `npm ci`, `npm run dev`. Preview: http://127.0.0.1:5251

`npm test`, `npm run qa`, `npm run build`, `npm run assets`.
Chrome is required for QA/art rendering; ffmpeg-static renders three silent eight-second videos. Marketing files remain outside the public navigation.

## Source boundaries

The server requests mainnet genesis identity and finalized jsonParsed mint data, and DEX Screener token-pairs data independently. Base mint and chain must match exactly. A source failure creates a visibly partial report; values are never invented. Market coverage is capped at 30 base-token pairs sorted by reported USD liquidity. Upstream data age is unknown. These are observations, not recommendations or a safety assessment.

Inspection is on demand, not an unattended agent. Browser history is explicitly local. Export preserves the whole evidence snapshot and its SHA-256 body checksum. No user content is executed.

## Launch identity

No wallet or CA is inherited from reference projects. CA remains soon. `src/config.mjs` TOKEN_CA is an explicit owner override and always takes precedence. A configured CA is not labeled verified without a matching creation proof.

`api/watch.mjs` is an authenticated daily Vercel cron (09:00 UTC), independent of browser visits. Private Blob persists its cursor, lease, proof and observed scheduler time. Without a dedicated developer address the watcher remains inactive. Activate through `scripts/provision.mjs PUBLIC_DEV_WALLET` with server-side production environment loaded. Activation captures the finalized start slot.

The adapted reference Pump decoder requires the expected SPOOL name, official program, developer signature and creator/user roles, finalized creation transaction and an initialized six-decimal SPL mint. Transfers and buys cannot qualify. Multiple qualifying creations, missing history, unsupported transactions and histories over the bounded transaction budget fail closed. Explicit owner selection resolves ambiguity. An existing proof remains pinned. The watcher does not launch a token or spend funds.

Private Blob uses conditional writes and expiring leases. No production fallback to local disk. Required runtime storage: BLOB_STORE_ID with Vercel OIDC or BLOB_READ_WRITE_TOKEN. CRON_SECRET protects cron. SOLANA_RPC_URL is optional and server-only. Never publish environment files.

## Deployment

Separate project: spool-desk, scope rosniecekdavi-4979s-projects. No plan upgrades or other project modifications. Daily cadence limits default worker frequency. Provider/hosting quotas still apply. Public RPC may throttle requests.

## Sources

- https://solana.com/docs/rpc/http/getaccountinfo
- https://docs.dexscreener.com/api/reference
- https://github.com/pump-fun/pump-public-docs/blob/main/idl/pump.json

Pump decoding and conditional storage patterns adapted from the user-supplied BEACON reference. No reference wallet, CA or brand asset reused.

Production: https://spool-desk.vercel.app
Source: https://github.com/rosniecek/spool-desk
