// One-time: copies storage/content.json into Upstash Redis so the Vercel site keeps your admin edits.
// Usage: vercel env pull .env.local && node --env-file=.env.local scripts/push-content-to-redis.mjs
import { readFile } from "node:fs/promises";
import { Redis } from "@upstash/redis";

const file = process.argv[2] ?? "storage/content.json";
const content = JSON.parse(await readFile(file, "utf8"));
await Redis.fromEnv().set("site:content", content);
console.log(`Uploaded ${file} (${content.products?.length ?? 0} products) to Redis key "site:content".`);
