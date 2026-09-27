// One-time: copies storage/content.json into Upstash Redis so the Vercel site keeps your admin edits.
// Usage: vercel env pull .env.local && node --env-file=.env.local scripts/push-content-to-redis.mjs
import { readFile } from "node:fs/promises";
import { Redis } from "@upstash/redis";

// Env vars may carry a custom prefix added by the Vercel integration (e.g. SKT_KV_REST_API_URL).
const env = (name) => process.env[name] ?? Object.entries(process.env).find(([k, v]) => k.endsWith(`_${name}`) && v)?.[1];
const url = env("UPSTASH_REDIS_REST_URL") ?? env("KV_REST_API_URL");
const token = env("UPSTASH_REDIS_REST_TOKEN") ?? env("KV_REST_API_TOKEN");
if (!url || !token) throw new Error("No Upstash Redis REST URL/token found in the environment.");

const file = process.argv[2] ?? "storage/content.json";
const content = JSON.parse(await readFile(file, "utf8"));
await new Redis({ url, token }).set("site:content", content);
console.log(`Uploaded ${file} (${content.products?.length ?? 0} products) to Redis key "site:content".`);
