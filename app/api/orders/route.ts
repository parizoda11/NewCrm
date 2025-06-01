import { type NextRequest, NextResponse } from "next/server"
import { orderOperations } from "@/lib/db-operations"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")

    let orders
    if (search) {
      orders = orderOperations.search(search)
    } else {
      orders = orderOperations.getAll()
    }

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { order, items } = await request.json()
    const result = orderOperations.create(order, items)
    return NextResponse.json({ id: result.lastInsertRowid, ...order })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
