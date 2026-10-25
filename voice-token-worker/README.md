# whoax voice token worker

Gives the site's voice assistant a 30-second Deepgram token so the real API key stays on the server.

## Deploy (Cloudflare free plan)

1. Create a dedicated Deepgram key with Member permissions for this worker.
2. From this folder:
   ```
   npx wrangler login
   npx wrangler secret put DEEPGRAM_API_KEY
   npx wrangler deploy
   ```
3. Copy the printed URL (for example `https://whoax-voice-token.<you>.workers.dev`) into the site's `.env.local`:
   ```
   NEXT_PUBLIC_VOICE_TOKEN_URL=https://whoax-voice-token.<you>.workers.dev
   ```
4. Rebuild and publish the site.

Only `https://whoax.com`, `https://www.whoax.com` and `http://localhost:3000` can get tokens, and each visitor is limited to 4 calls a minute. Edit `ALLOWED_ORIGINS` in `src/index.js` and the limit in `wrangler.toml` to change that.
