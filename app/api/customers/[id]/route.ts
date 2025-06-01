import { type NextRequest, NextResponse } from "next/server"
import { customerOperations } from "@/lib/db-operations"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Fix: Ensure params is properly awaited
    const id = params.id
    const customer = customerOperations.getById(Number.parseInt(id))
    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }
    return NextResponse.json(customer)
  } catch (error) {
    console.error("Error fetching customer:", error)
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Fix: Ensure params is properly awaited
    const id = params.id
    const customer = await request.json()
    customerOperations.update(Number.parseInt(id), customer)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating customer:", error)
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Fix: Ensure params is properly awaited
    const id = params.id
    try {
      customerOperations.delete(Number.parseInt(id))
      return NextResponse.json({ success: true })
    } catch (error) {
      console.error("Error deleting customer:", error)
      // If it's a foreign key constraint error, return a more specific message
      if (error.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
        return NextResponse.json(
          {
            error: "Cannot delete customer with existing orders. Delete the orders first or contact support.",
            code: "FOREIGN_KEY_CONSTRAINT",
          },
          { status: 400 },
        )
      }
      throw error
    }
  } catch (error) {
    console.error("Error in customer delete API:", error)
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 })
  }
}
