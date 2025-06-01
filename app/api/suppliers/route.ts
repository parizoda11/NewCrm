import { NextResponse } from "next/server"

export async function GET() {
  try {
    let supplierOperations
    try {
      const dbOps = await import("@/lib/db-operations")
      supplierOperations = dbOps.supplierOperations
    } catch (importError) {
      console.error("Failed to import db-operations:", importError)
      // Return default suppliers if database fails
      return NextResponse.json([
        { id: 1, name: "Asosiy ta'minotchi", contact_person: "Admin", phone: "+998901234567" },
        { id: 2, name: "Mahalliy ishlab chiqaruvchi", contact_person: "Manager", phone: "+998901234568" },
      ])
    }

    const suppliers = await supplierOperations.getAll()
    return NextResponse.json(suppliers || [])
  } catch (error) {
    console.error("Suppliers API error:", error)
    // Return default suppliers on error
    return NextResponse.json([
      { id: 1, name: "Asosiy ta'minotchi", contact_person: "Admin", phone: "+998901234567" },
      { id: 2, name: "Mahalliy ishlab chiqaruvchi", contact_person: "Manager", phone: "+998901234568" },
    ])
  }
}
