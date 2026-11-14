export async function onRequestGet({ env }) {
  try {
    const row = await env.DB.prepare(
      "SELECT content_json, updated_at FROM site_content WHERE id = 'public'"
    ).first();
    if (!row) {
      return Response.json({ error: "Site content has not been seeded yet." }, { status: 404 });
    }
    const media = await env.DB.prepare("SELECT asset_key FROM site_assets").all();
    const assetUrls = Object.fromEntries((media.results || []).map(({ asset_key }) => [
      `images/${asset_key}`,
      `/api/site-assets/${encodeURIComponent(asset_key)}`
    ]));
    return Response.json(
      { content: { ...JSON.parse(row.content_json), assets: assetUrls, updatedAt: row.updated_at } },
      { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } }
    );
  } catch {
    return Response.json({ error: "Site content could not be loaded." }, { status: 503 });
  }
}
