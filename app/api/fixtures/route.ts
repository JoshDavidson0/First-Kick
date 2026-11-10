import { NextResponse } from "next/server";
import { loadFixtures } from "@/lib/fixtures";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const team = searchParams.get("team");

  const { status, body } = await loadFixtures(team);

  // One line per outcome (visible in the terminal running npm run dev)
  console.log(`[API] fixtures team=${team ?? "-"} -> ${body.ok ? `ok (${body.fixtures.length})` : body.code} ${status}`);
  return NextResponse.json(body, { status });
}
