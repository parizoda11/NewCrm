import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Import with error handling
    let productOperations
    try {
      const dbOps = await import("@/lib/db-operations")
      productOperations = dbOps.productOperations
    } catch (importError) {
      console.error("Failed to import db-operations:", importError)
      return NextResponse.json([], { status: 200 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")

    let products
    if (search) {
      products = await productOperations.search(search)
    } else {
      products = await productOperations.getAll()
    }

    return NextResponse.json(products || [])
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json([], { status: 200 }) // Return empty array instead of error
  }
}

export async function POST(request: NextRequest) {
  try {
    const productOperations = (await import("@/lib/db-operations")).productOperations
    const body = await request.json()

    const result = await productOperations.create(body)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
