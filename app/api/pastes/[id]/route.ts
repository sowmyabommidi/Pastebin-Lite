import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Paste ID is required" },
      { status: 400 }
    );
  }

  const paste = await prisma.paste.findUnique({
    where: { id }
  });

  if (!paste) {
    return NextResponse.json(
      { error: "Paste not found" },
      { status: 404 }
    );
  }

  // Optional: increment view count
  await prisma.paste.update({
    where: { id },
    data: { viewCount: { increment: 1 } }
  });

  return NextResponse.json({
    id: paste.id,
    content: paste.content,
    views: paste.viewCount + 1,
    createdAt: paste.createdAt,
    expiresAt: paste.expiresAt
  });
}
