import { type NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/server/auth";
import { getContent } from "@/server/store";

/** Downloads a full JSON backup of the site content. */
export async function GET(request: NextRequest) {
  if (!verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const content = await getContent();
  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(JSON.stringify({ exportedAt: new Date().toISOString(), content }, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="shri-kanhaiya-traders-backup-${date}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
