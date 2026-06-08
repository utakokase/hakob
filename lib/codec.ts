/**
 * フォームデータをgzip圧縮 → base64url エンコード
 * base64urlは +→- /→_ =除去 でURLエンコード不要
 */
export async function encodeData(data: object): Promise<string> {
  const json = JSON.stringify(data);
  const input = new TextEncoder().encode(json);

  const stream = new CompressionStream("gzip");
  const writer = stream.writable.getWriter();
  writer.write(input);
  writer.close();

  const buf = await new Response(stream.readable).arrayBuffer();
  const bytes = new Uint8Array(buf);

  // base64url（URL-safe、パディングなし）
  const base64 = btoa(String.fromCharCode(...bytes));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * base64url → gzip展開 → JSONパース
 */
export async function decodeData<T = unknown>(encoded: string): Promise<T> {
  // base64url → 標準base64に戻す
  const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));

  const stream = new DecompressionStream("gzip");
  const writer = stream.writable.getWriter();
  writer.write(bytes);
  writer.close();

  const buf = await new Response(stream.readable).arrayBuffer();
  return JSON.parse(new TextDecoder().decode(buf)) as T;
}
