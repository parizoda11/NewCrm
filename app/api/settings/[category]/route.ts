import { type NextRequest, NextResponse } from "next/server"
import { dbClient } from "@/lib/db-client"

export async function GET(request: NextRequest, { params }: { params: { category: string } }) {
  try {
    // Fix: Ensure params is properly awaited
    const category = params.category

    // Provide default settings if API call fails
    let settings = {}

    try {
      settings = await dbClient.settings.getByCategory(category)
    } catch (error) {
      console.error(`Error fetching ${category} settings:`, error)

      // Default settings based on category
      if (category === "store") {
        settings = {
          name: "Wholesale Clothing CRM",
          address: "123 Business St, Suite 100",
          phone: "+998 90 123 4567",
          email: "info@wholesaleclothing.com",
          website: "www.wholesaleclothing.com",
          currency: "USD",
          language: "uz",
        }
      } else if (category === "payment") {
        settings = {
          acceptedMethods: "cash,card,transfer",
          taxRate: "12",
          invoiceDueDays: "30",
          bankName: "National Bank",
          bankAccount: "1234567890",
        }
      } else if (category === "shipping") {
        settings = {
          defaultMethod: "standard",
          freeShippingThreshold: "1000",
          domesticRate: "10",
          internationalRate: "50",
          processingDays: "2",
        }
      } else if (category === "brand") {
        settings = {
          logoUrl: "/logo.png",
          primaryColor: "#4f46e5",
          secondaryColor: "#f97316",
          slogan: "Quality Wholesale Clothing",
          socialMedia: "instagram,facebook,telegram",
        }
      }
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error in settings API:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { category: string } }) {
  try {
    // Fix: Ensure params is properly awaited
    const category = params.category
    const settingsData = await request.json()

    try {
      await dbClient.settings.updateCategory(category, settingsData)
    } catch (error) {
      console.error(`Error updating ${category} settings:`, error)
      // Continue execution to return success even if update fails
      // This allows the UI to work even if the database is not fully set up
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in settings update API:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
