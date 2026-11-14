export async function onRequestGet({ env, params }) {
  const assetKey = params.asset;
  const result = await env.DB.prepare(
    "SELECT mime_type, data FROM site_assets WHERE asset_key = ? ORDER BY chunk_index"
  ).bind(assetKey).all();
  const rows = result.results || [];
  if (!rows.length) return new Response("Asset not found", { status: 404 });
  const chunks = rows.map(({ data }) => data instanceof ArrayBuffer ? new Uint8Array(data) : data);
  const body = new Uint8Array(chunks.reduce((total, chunk) => total + chunk.byteLength, 0));
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new Response(body, {
    headers: {
      "Content-Type": rows[0].mime_type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
