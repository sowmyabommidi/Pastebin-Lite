import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(_req: NextRequest) {
  const pastes = await prisma.paste.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(pastes, { status: 200 });
}
