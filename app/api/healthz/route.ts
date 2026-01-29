import { NextResponse } from "next/server";

export const runtime = "nodejs"; // 🔴 VERY IMPORTANT

export async function GET() {
  return NextResponse.json(
    { status: "ok" },
    { status: 200 }
  );
}
