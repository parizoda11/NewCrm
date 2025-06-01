"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, Search, HelpCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader className="pb-8">
          <div className="mx-auto mb-6">
            <div className="relative">
              <div className="text-8xl font-bold text-muted-foreground/20">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl text-foreground">Sahifa topilmadi</CardTitle>
          <CardDescription className="text-lg">
            Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan bo'lishi mumkin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-muted-foreground">
            <p>Bu xatolik quyidagi sabablarga ko'ra yuzaga kelgan bo'lishi mumkin:</p>
            <ul className="mt-2 text-sm list-disc list-inside space-y-1">
              <li>URL noto'g'ri terilgan</li>
              <li>Sahifa o'chirilgan yoki ko'chirilgan</li>
              <li>Linkga eski URL orqali kirilgan</li>
              <li>Sizda ushbu sahifaga kirish huquqi yo'q</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Bosh sahifaga qaytish
              </Link>
            </Button>

            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Orqaga qaytish
            </Button>

            <Button variant="outline" asChild>
              <Link href="/help">
                <HelpCircle className="h-4 w-4 mr-2" />
                Yordam
              </Link>
            </Button>
          </div>

          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Agar muammo davom etsa, iltimos{" "}
              <Link href="/help" className="text-blue-600 dark:text-blue-400 hover:underline">
                qo'llab-quvvatlash xizmati
              </Link>{" "}
              bilan bog'laning.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
