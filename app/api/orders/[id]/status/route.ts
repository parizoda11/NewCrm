import { type NextRequest, NextResponse } from "next/server"
import { orderOperations } from "@/lib/db-operations"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()
    orderOperations.updateStatus(Number.parseInt(params.id), status)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
}
