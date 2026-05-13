export async function DELETE({ params, locals }) {
  const id = params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing submission id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const req = await fetch(`https://api.webflow.com/v2/form_submissions/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${locals.access_token}` },
  });

  if (!req.ok) {
    const body = await req.text();
    return new Response(
      JSON.stringify({ error: `Webflow API ${req.status}: ${body}` }),
      { status: req.status, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(JSON.stringify({ status: "OK" }), {
    headers: { "Content-Type": "application/json" },
  });
}
