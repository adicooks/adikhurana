<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;

  function formatDate(value: string) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    }).format(new Date(value));
  }

  function formatDuration(seconds: number | null) {
    if (seconds === null) return "-";
    if (seconds < 60) return `${seconds}s`;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  function shortSessionId(sessionId: string) {
    if (sessionId.startsWith("event-")) return "unknown session";
    return sessionId.slice(0, 8);
  }
</script>

<svelte:head>
  <title>Resume Stats</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="min-h-screen bg-[#eeeeee] px-4 py-8 text-[#010313] sm:px-6 lg:px-8">
  <div class="mx-auto flex max-w-6xl flex-col gap-6">
    <header class="flex flex-col gap-4 border-b border-[#c5c7ca] pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <a class="text-sm font-bold text-[#010313]/50 transition hover:text-[#010313]" href="/">adi</a>
        <h1 class="mt-2 text-3xl font-bold">Resume stats</h1>
      </div>

      {#if data.authenticated}
        <form method="POST" action="?/logout">
          <button class="rounded-full bg-[#010313] px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-500">
            log out
          </button>
        </form>
      {/if}
    </header>

    {#if !data.passwordConfigured}
      <section class="rounded-lg border border-amber-300 bg-amber-50 p-5 text-amber-950">
        <h2 class="text-lg font-bold">Set a stats password</h2>
        <p class="mt-2 text-sm leading-6">
          Add a Vercel environment variable named <code>RESUME_STATS_PASSWORD</code>, then redeploy.
          This keeps the dashboard private.
        </p>
      </section>
    {:else if !data.authenticated}
      <section class="max-w-md rounded-lg border border-[#c5c7ca] bg-[#f7f7f7] p-5 shadow-sm">
        <h2 class="text-xl font-bold">Private dashboard</h2>
        <form class="mt-5 flex flex-col gap-3" method="POST" action="?/login">
          <label class="text-sm font-bold text-[#010313]/60" for="password">Password</label>
          <input
            class="rounded-lg border border-[#c5c7ca] bg-white px-4 py-3 text-base outline-none transition focus:border-blue-500"
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
          />
          <button class="rounded-lg bg-[#010313] px-4 py-3 font-bold text-white transition hover:bg-blue-500">
            enter
          </button>
        </form>
      </section>
    {:else if !data.databaseConfigured}
      <section class="rounded-lg border border-amber-300 bg-amber-50 p-5 text-amber-950">
        <h2 class="text-lg font-bold">Connect a database</h2>
        <p class="mt-2 text-sm leading-6">
          Add a Neon database to this Vercel project and make sure <code>DATABASE_URL</code> is set.
          The app will create the analytics table automatically when the first event arrives.
        </p>
      </section>
    {:else if data.summary}
      <section class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-lg border border-[#c5c7ca] bg-[#f7f7f7] p-4">
          <p class="text-sm font-bold text-[#010313]/45">views</p>
          <p class="mt-2 text-3xl font-bold">{data.summary.totalViews}</p>
        </div>
        <div class="rounded-lg border border-[#c5c7ca] bg-[#f7f7f7] p-4">
          <p class="text-sm font-bold text-[#010313]/45">viewers</p>
          <p class="mt-2 text-3xl font-bold">{data.summary.uniqueResumeViewers}</p>
        </div>
        <div class="rounded-lg border border-[#c5c7ca] bg-[#f7f7f7] p-4">
          <p class="text-sm font-bold text-[#010313]/45">clicks</p>
          <p class="mt-2 text-3xl font-bold">{data.summary.totalClicks}</p>
        </div>
        <div class="rounded-lg border border-[#c5c7ca] bg-[#f7f7f7] p-4">
          <p class="text-sm font-bold text-[#010313]/45">avg stay</p>
          <p class="mt-2 text-3xl font-bold">{formatDuration(data.summary.averageDurationSeconds)}</p>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-4">
        <div class="rounded-lg border border-[#c5c7ca] bg-[#f7f7f7] p-5">
          <h2 class="text-lg font-bold">Countries</h2>
          <div class="mt-4 flex flex-col gap-3">
            {#each data.summary.byCountry as item}
              <div class="flex items-center justify-between border-b border-[#c5c7ca]/70 pb-2">
                <span>{item.country}</span>
                <strong>{item.count}</strong>
              </div>
            {:else}
              <p class="text-sm text-[#010313]/50">No country data yet.</p>
            {/each}
          </div>
        </div>

        <div class="rounded-lg border border-[#c5c7ca] bg-[#f7f7f7] p-5">
          <h2 class="text-lg font-bold">Referrers</h2>
          <div class="mt-4 flex flex-col gap-3">
            {#each data.summary.byReferrer as item}
              <div class="flex items-center justify-between gap-3 border-b border-[#c5c7ca]/70 pb-2">
                <span class="truncate">{item.referrer}</span>
                <strong>{item.count}</strong>
              </div>
            {:else}
              <p class="text-sm text-[#010313]/50">No referrer data yet.</p>
            {/each}
          </div>
        </div>

        <div class="rounded-lg border border-[#c5c7ca] bg-[#f7f7f7] p-5">
          <h2 class="text-lg font-bold">Cities</h2>
          <div class="mt-4 flex flex-col gap-3">
            {#each data.summary.byCity as item}
              <div class="flex items-center justify-between gap-3 border-b border-[#c5c7ca]/70 pb-2">
                <span>{item.city}, {item.region}, {item.country}</span>
                <strong>{item.count}</strong>
              </div>
            {:else}
              <p class="text-sm text-[#010313]/50">No city data yet.</p>
            {/each}
          </div>
        </div>

        <div class="rounded-lg border border-[#c5c7ca] bg-[#f7f7f7] p-5">
          <h2 class="text-lg font-bold">Time on page</h2>
          <div class="mt-4 flex flex-col gap-3">
            {#each data.summary.durationBuckets as item}
              <div class="flex items-center justify-between border-b border-[#c5c7ca]/70 pb-2">
                <span>{item.bucket}</span>
                <strong>{item.count}</strong>
              </div>
            {:else}
              <p class="text-sm text-[#010313]/50">No duration data yet.</p>
            {/each}
          </div>
        </div>
      </section>

      <section class="rounded-lg border border-[#c5c7ca] bg-[#f7f7f7]">
        <div class="border-b border-[#c5c7ca] p-5">
          <h2 class="text-lg font-bold">Session timeline</h2>
        </div>
        <div class="grid gap-0 md:grid-cols-2">
          {#each data.summary.sessionTimelines as session}
            <article class="border-b border-[#c5c7ca]/70 p-5 md:border-r">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm font-bold text-[#010313]/45">{formatDate(session.startedAt)}</p>
                  <h3 class="mt-1 text-lg font-bold">{session.location}</h3>
                </div>
                <span class="rounded-full bg-[#dbdcdd] px-3 py-1 text-xs font-bold text-[#010313]/60">
                  {shortSessionId(session.sessionId)}
                </span>
              </div>

              <p class="mt-2 truncate text-sm text-[#010313]/50">from {session.referrer}</p>

              {#if !session.sessionId.startsWith("event-")}
                <form class="mt-4" method="POST" action="?/deleteSession">
                  <input type="hidden" name="sessionId" value={session.sessionId} />
                  <button
                    class="rounded-full border border-red-300 px-3 py-1 text-xs font-bold text-red-700 transition hover:bg-red-50"
                    type="submit"
                  >
                    delete session
                  </button>
                </form>
              {/if}

              <ol class="mt-4 flex flex-col gap-3">
                {#each session.events as event}
                  <li class="flex items-center justify-between gap-3 border-l-2 border-[#010313]/20 pl-3">
                    <div>
                      <p class="font-bold">{event.eventName}</p>
                      {#if event.source}
                        <p class="text-xs text-[#010313]/45">{event.source}</p>
                      {/if}
                    </div>
                    <div class="text-right text-sm text-[#010313]/55">
                      <p>{formatDate(event.createdAt)}</p>
                      {#if event.durationSeconds !== null}
                        <p class="font-bold text-[#010313]">{formatDuration(event.durationSeconds)}</p>
                      {/if}
                    </div>
                  </li>
                {/each}
              </ol>
            </article>
          {:else}
            <p class="p-5 text-sm text-[#010313]/50">No sessions yet.</p>
          {/each}
        </div>
      </section>

      <section class="overflow-hidden rounded-lg border border-[#c5c7ca] bg-[#f7f7f7]">
        <div class="border-b border-[#c5c7ca] p-5">
          <h2 class="text-lg font-bold">Recent events</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1080px] text-left text-sm">
            <thead class="bg-[#dbdcdd] text-[#010313]/60">
              <tr>
                <th class="px-4 py-3">time</th>
                <th class="px-4 py-3">event</th>
                <th class="px-4 py-3">duration</th>
                <th class="px-4 py-3">location</th>
                <th class="px-4 py-3">source</th>
                <th class="px-4 py-3">referrer</th>
                <th class="px-4 py-3">delete</th>
              </tr>
            </thead>
            <tbody>
              {#each data.summary.recentEvents as event}
                <tr class="border-t border-[#c5c7ca]/70">
                  <td class="px-4 py-3">{formatDate(event.created_at)}</td>
                  <td class="px-4 py-3 font-bold">{event.event_name}</td>
                  <td class="px-4 py-3">{formatDuration(event.duration_seconds)}</td>
                  <td class="px-4 py-3">
                    {event.city || "unknown"}, {event.region || "unknown"}, {event.country || "unknown"}
                  </td>
                  <td class="px-4 py-3">{event.source || "-"}</td>
                  <td class="max-w-[280px] truncate px-4 py-3">{event.referrer || "-"}</td>
                  <td class="px-4 py-3">
                    <form method="POST" action="?/deleteEvent">
                      <input type="hidden" name="eventId" value={event.id} />
                      <button class="font-bold text-red-700 transition hover:text-red-500" type="submit">
                        delete
                      </button>
                    </form>
                  </td>
                </tr>
              {:else}
                <tr>
                  <td class="px-4 py-6 text-[#010313]/50" colspan="7">No events yet.</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </section>
    {/if}
  </div>
</main>
