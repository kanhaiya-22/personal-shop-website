import "server-only";

/** Reads an env var by exact name, or with any custom prefix Vercel integrations add (e.g. SKT_KV_REST_API_URL). */
export function envVar(name: string): string | undefined {
  if (process.env[name]) return process.env[name];
  const key = Object.keys(process.env).find((k) => k.endsWith(`_${name}`) && process.env[k]);
  return key ? process.env[key] : undefined;
}

export const redisConfig = () => {
  const url = envVar("UPSTASH_REDIS_REST_URL") ?? envVar("KV_REST_API_URL");
  const token = envVar("UPSTASH_REDIS_REST_TOKEN") ?? envVar("KV_REST_API_TOKEN");
  return url && token ? { url, token } : null;
};

// A custom Blob prefix replaces "BLOB" (e.g. SKT_READ_WRITE_TOKEN), so also match by the token's own format.
export const blobToken = () =>
  envVar("BLOB_READ_WRITE_TOKEN") ?? Object.values(process.env).find((v) => v?.startsWith("vercel_blob_rw_"));
