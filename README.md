# Form Submission Viewer

A small Astro app that lists and manages Webflow form submissions for a chosen site.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in `CLIENT_ID` / `CLIENT_SECRET` from your Webflow OAuth app.
3. Set the redirect URL in the Webflow app config to match `REDIRECT_URL` (default: `http://localhost:4321/callback`).
4. The OAuth app needs the `sites:read`, `forms:read`, and `forms:write` scopes.
5. `npm run dev` and open http://localhost:4321
