const CACHE = "public, s-maxage=3600, stale-while-revalidate=86400";

function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

export async function GET(): Promise<Response> {
  try {
    const hosts = env("POSTHOG_GAME_HOSTS")
      .split(",")
      .map((h) => `'${h.trim().replace(/'/g, "")}'`)
      .join(", ");
    const apiHost = process.env.POSTHOG_API_HOST || "https://us.posthog.com";

    const res = await fetch(`${apiHost}/api/projects/${env("POSTHOG_PROJECT_ID")}/query/`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${env("POSTHOG_PERSONAL_API_KEY")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query: {
          kind: "HogQLQuery",
          query: `select count(distinct person_id), count(distinct properties.$geoip_country_code)
                  from events where properties.$host in (${hosts})`,
        },
      }),
    });
    if (!res.ok) throw new Error(`PostHog said ${res.status}`);

    const body = (await res.json()) as { results: [[number, number]] };
    const [[players, countries]] = body.results;

    return Response.json({ players, countries }, { headers: { "cache-control": CACHE } });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "stats unavailable" }, { status: 502 });
  }
}
