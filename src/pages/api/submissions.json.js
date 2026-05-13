const listSubmissions = async (siteId, token) => {
  const items = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const url = `https://api.webflow.com/v2/sites/${siteId}/form_submissions?limit=${limit}&offset=${offset}`;
    const req = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!req.ok) {
      const body = await req.text();
      throw new Error(`Webflow API ${req.status}: ${body}`);
    }

    const data = await req.json();
    const batch = data.formSubmissions || data.items || [];
    items.push(...batch);

    const total = data.pagination?.total ?? items.length;
    offset += batch.length;
    if (batch.length === 0 || offset >= total) break;
  }

  return items;
};

export async function GET({ locals, request }) {
  const url = new URL(request.url);
  const siteId = url.searchParams.get("siteId");

  if (!siteId) {
    return new Response(JSON.stringify({ error: "Missing siteId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const submissions = await listSubmissions(siteId, locals.access_token);
    return new Response(JSON.stringify({ status: "OK", submissions }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message || "Failed to fetch submissions" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
