import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const paste = await prisma.paste.findUnique({
    where: { id },
  })

  if (!paste) notFound()

  const now = new Date()
  if (paste.expiresAt && paste.expiresAt < now) notFound()
  if (paste.maxViews && paste.viewCount >= paste.maxViews) notFound()

  // ✅ increment view count
  await prisma.paste.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  })

  return (
    <main style={{ padding: "2rem", fontFamily: "monospace" }}>
      <pre>{paste.content}</pre>
    </main>
  )
}
