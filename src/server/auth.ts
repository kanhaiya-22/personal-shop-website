import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Admin authentication. Accounts come from `.env` — one or more, each with
 * an email and/or phone (sign in with either) plus a password:
 *
 *   ADMIN_LOGIN_MAIL_1 / ADMIN_LOGIN_PHONE_1 / ADMIN_PASSWORD_1
 *   ADMIN_LOGIN_MAIL_2 / ADMIN_LOGIN_PHONE_2 / ADMIN_PASSWORD_2   … and so on
 *
 * The un-numbered ADMIN_LOGIN_MAIL / ADMIN_LOGIN_PHONE / ADMIN_PASSWORD also work.
 * Sessions are stateless signed cookies (HMAC-SHA256). Changing any admin
 * password signs out every existing session.
 */

export const SESSION_COOKIE = "skt_admin";
const SESSION_DAYS = 7;

const sha256 = (v: string) => createHash("sha256").update(v).digest();
const phoneDigits = (v?: string) => (v ?? "").replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");

interface Account {
  email: string;
  phone: string;
  password: string;
}

function accounts(): Account[] {
  const env = process.env;
  const suffixes = new Set<string>([""]);
  for (const key of Object.keys(env)) {
    const m = key.match(/^ADMIN_(?:LOGIN_MAIL|LOGIN_PHONE|PASSWORD)(_\d+)$/);
    if (m) suffixes.add(m[1]);
  }
  return [...suffixes]
    .sort()
    .map((sfx) => ({
      email: (env[`ADMIN_LOGIN_MAIL${sfx}`] ?? "").trim().toLowerCase(),
      phone: phoneDigits(env[`ADMIN_LOGIN_PHONE${sfx}`]),
      password: env[`ADMIN_PASSWORD${sfx}`] ?? "",
    }))
    .filter((acc) => acc.password && (acc.email || acc.phone));
}

function secret() {
  const all = accounts();
  return process.env.SESSION_SECRET || `skt-session:${all.map((x) => `${x.email}:${x.phone}:${x.password}`).join("|")}`;
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");

function safeEqual(a: string, b: string) {
  return timingSafeEqual(sha256(a), sha256(b));
}

export const isAdminConfigured = () => accounts().length > 0;

export function checkCredentials(identifier: string, password: string) {
  const id = identifier.trim().toLowerCase();
  let ok = false;
  // Check every account (no early exit) so timing doesn't reveal which one matched.
  for (const acc of accounts()) {
    const idOk = (acc.email !== "" && safeEqual(id, acc.email)) || (acc.phone !== "" && safeEqual(phoneDigits(id), acc.phone));
    const passOk = safeEqual(password, acc.password);
    if (idOk && passOk) ok = true;
  }
  return ok;
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_DAYS * 86_400_000;
  const payload = `admin.${expires}`;
  return { token: `${payload}.${sign(payload)}`, expires: new Date(expires) };
}

export function verifySessionToken(token?: string) {
  if (!token || !isAdminConfigured()) return false;
  const lastDot = token.lastIndexOf(".");
  if (lastDot < 0) return false;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  if (!safeEqual(signature, sign(payload))) return false;
  const expires = Number(payload.split(".")[1]);
  return Number.isFinite(expires) && expires > Date.now();
}

export async function isAdmin() {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}

/** Call at the top of every admin page and server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

// ─── Login rate limiting (per IP, in memory) ───────────────
const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 15 * 60_000;
const MAX_ATTEMPTS = 8;

export function isRateLimited(ip: string) {
  const entry = attempts.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    attempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function recordFailedLogin(ip: string) {
  const entry = attempts.get(ip);
  if (!entry || Date.now() - entry.first > WINDOW_MS) attempts.set(ip, { count: 1, first: Date.now() });
  else entry.count += 1;
}

export const clearFailedLogins = (ip: string) => attempts.delete(ip);
