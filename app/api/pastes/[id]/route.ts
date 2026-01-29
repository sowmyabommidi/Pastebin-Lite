import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  const { id } = await params;

  // Example response (replace with DB logic)
  return NextResponse.json(
    {
      id,
      content: "Sample paste content",
      createdAt: new Date(),
      expiresAt: null,
      maxViews: null,
      viewCount: 0,
    },
    { status: 200 }
  );
}
