import { prisma } from "@/lib/db"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  const paste = await prisma.paste.findUnique({
    where: { id }
  })

  if (!paste) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  // Time check
  const now = new Date()
  if (paste.expiresAt && paste.expiresAt < now) {
    return Response.json({ error: "Expired" }, { status: 404 })
  }

  // View limit check
  if (paste.maxViews && paste.viewCount >= paste.maxViews) {
    return Response.json({ error: "Expired" }, { status: 404 })
  }

  // Increment view count
  const updated = await prisma.paste.update({
    where: { id },
    data: { viewCount: { increment: 1 } }
  })

  return Response.json({
    content: updated.content,
    remaining_views:
      updated.maxViews === null
        ? null
        : updated.maxViews - updated.viewCount,
    expires_at: updated.expiresAt
  })
}
