import { NextResponse } from "next/server"

export async function GET() {
  try {
    let categoryOperations
    try {
      const dbOps = await import("@/lib/db-operations")
      categoryOperations = dbOps.categoryOperations
    } catch (importError) {
      console.error("Failed to import db-operations:", importError)
      // Return default categories if database fails
      return NextResponse.json([
        { id: 1, name: "Erkaklar kiyimi" },
        { id: 2, name: "Ayollar kiyimi" },
        { id: 3, name: "Bolalar kiyimi" },
        { id: 4, name: "Aksessuarlar" },
      ])
    }

    const categories = await categoryOperations.getAll()
    return NextResponse.json(categories || [])
  } catch (error) {
    console.error("Categories API error:", error)
    // Return default categories on error
    return NextResponse.json([
      { id: 1, name: "Erkaklar kiyimi" },
      { id: 2, name: "Ayollar kiyimi" },
      { id: 3, name: "Bolalar kiyimi" },
      { id: 4, name: "Aksessuarlar" },
    ])
  }
}
