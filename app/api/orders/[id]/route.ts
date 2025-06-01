import { type NextRequest, NextResponse } from "next/server"
import { orderOperations } from "@/lib/db-operations"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const order = orderOperations.getById(Number.parseInt(params.id))
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const items = orderOperations.getOrderItems(Number.parseInt(params.id))
    return NextResponse.json({ ...order, items })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}
