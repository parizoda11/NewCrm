import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/contexts/theme-context"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CloudCRM Pro - Wholesale Clothing Management",
  description: "Professional CRM system for wholesale clothing delivery companies",
  // Barcha ikonlarni o'chirish
  icons: {
    icon: [],
    shortcut: [],
    apple: [],
    other: [],
  },
  // Manifest va PWA sozlamalarini o'chirish
  manifest: undefined,
  // Meta teglarni o'chirish
  other: {
    "msapplication-TileColor": "transparent",
    "theme-color": "transparent",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        {/* Favicon va ikonlarni bloklash */}
        <link rel="icon" href="data:," />
        <link rel="shortcut icon" href="data:," />
        <link rel="apple-touch-icon" href="data:," />
        <meta name="msapplication-TileImage" content="data:," />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
