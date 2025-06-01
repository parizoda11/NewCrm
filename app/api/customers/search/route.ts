import { type NextRequest, NextResponse } from "next/server"
import { customerOperations } from "@/lib/db-operations"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const filters = {
      status: searchParams.get("status"),
      location: searchParams.get("location"),
      minOrders: searchParams.get("minOrders"),
      maxOrders: searchParams.get("maxOrders"),
      minSpent: searchParams.get("minSpent"),
      maxSpent: searchParams.get("maxSpent"),
    }

    const customers = customerOperations.search(search, filters)
    return NextResponse.json(customers)
  } catch (error) {
    return NextResponse.json({ error: "Failed to search customers" }, { status: 500 })
  }
}
