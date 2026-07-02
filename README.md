# create-svelte

## Resume analytics

The app records resume clicks, resume page views, and time-on-page events through
`/api/resume-event`, then shows them at `/resume-stats`.

Required Vercel environment variables:

- `DATABASE_URL`: Neon/Postgres connection string. The first event creates the
  `resume_analytics_events` table automatically.
- `RESUME_STATS_PASSWORD`: Password for the private `/resume-stats` dashboard.

## Spotify card

The homepage Spotify card calls `/api/spotify-last-played`, which uses the
Spotify Web API recently played endpoint.

Required Vercel environment variables:

- `SPOTIFY_CLIENT_ID`: Spotify app client ID.
- `SPOTIFY_CLIENT_SECRET`: Spotify app client secret.
- `SPOTIFY_REFRESH_TOKEN`: Refresh token created with the
  `user-read-recently-played` scope.

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
