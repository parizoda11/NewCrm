import { type NextRequest, NextResponse } from "next/server"
import { customerOperations } from "@/lib/db-operations"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const location = searchParams.get("location")
    const minOrders = searchParams.get("minOrders")
    const maxOrders = searchParams.get("maxOrders")

    let customers
    if (search) {
      customers = customerOperations.search(search, {
        status,
        location,
        minOrders,
        maxOrders,
      })
    } else {
      customers = customerOperations.getAll()
    }

    return NextResponse.json(customers)
  } catch (error) {
    console.error("Error fetching customers:", error)
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const customer = await request.json()
    const result = customerOperations.create(customer)
    return NextResponse.json({ id: result.lastInsertRowid, ...customer })
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 })
  }
}
