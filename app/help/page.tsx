"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HelpCircle,
  BookOpen,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Video,
  Search,
  ExternalLink,
  Download,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function HelpPage() {
  const faqItems = [
    {
      question: "CRM tizimiga qanday kirish mumkin?",
      answer:
        "Tizimga kirish uchun admin tomonidan berilgan email va parolingizni kiriting. Agar parolni unutgan bo'lsangiz, 'Parolni unutdim' tugmasini bosing.",
    },
    {
      question: "Yangi mijoz qanday qo'shiladi?",
      answer:
        "Mijozlar bo'limiga o'ting va 'Yangi mijoz' tugmasini bosing. Kerakli ma'lumotlarni to'ldiring va saqlang.",
    },
    {
      question: "Buyurtma holatini qanday o'zgartirish mumkin?",
      answer: "Buyurtmalar ro'yxatida kerakli buyurtmani toping va holat ustunida yangi holatni tanlang.",
    },
    {
      question: "Ma'lumotlarni qanday export qilish mumkin?",
      answer:
        "Har bir sahifada 'Export' tugmasi mavjud. Bu tugma orqali ma'lumotlarni Excel yoki CSV formatida yuklab olishingiz mumkin.",
    },
    {
      question: "Parolni qanday o'zgartirish mumkin?",
      answer: "Sozlamalar bo'limiga o'ting va 'Xavfsizlik' yorlig'ida parolni o'zgartirish imkoniyati mavjud.",
    },
  ]

  const tutorials = [
    {
      title: "CRM tizimi bilan tanishish",
      description: "Asosiy funksiyalar va interfeys",
      duration: "5 daqiqa",
      type: "video",
    },
    {
      title: "Mijozlarni boshqarish",
      description: "Mijoz qo'shish va tahrirlash",
      duration: "8 daqiqa",
      type: "video",
    },
    {
      title: "Buyurtmalarni kuzatish",
      description: "Buyurtma holati va tracking",
      duration: "6 daqiqa",
      type: "video",
    },
    {
      title: "Hisobotlar va tahlil",
      description: "Biznes analytics va KPI",
      duration: "10 daqiqa",
      type: "video",
    },
  ]

  const resources = [
    {
      title: "Foydalanuvchi qo'llanmasi",
      description: "To'liq foydalanuvchi qo'llanmasi PDF formatda",
      type: "pdf",
      size: "2.4 MB",
    },
    {
      title: "API Documentation",
      description: "Tashqi integratsiya uchun API hujjatlari",
      type: "web",
      size: "",
    },
    {
      title: "Tizim talablari",
      description: "Texnik talablar va sozlash",
      type: "pdf",
      size: "856 KB",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Yordam markazi</h1>
            <p className="text-muted-foreground mt-1">CRM tizimi bo'yicha yordam va qo'llab-quvvatlash</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Yordam bo'yicha qidirish..." className="pl-10" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                <p className="font-semibold">Qo'ng'iroq qiling</p>
                <p className="text-sm text-muted-foreground">+998 71 234-56-78</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="faq" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq">Ko'p so'raladigan savollar</TabsTrigger>
              <TabsTrigger value="tutorials">O'quv materiallari</TabsTrigger>
              <TabsTrigger value="resources">Resurslar</TabsTrigger>
              <TabsTrigger value="contact">Bog'lanish</TabsTrigger>
            </TabsList>

            <TabsContent value="faq">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <HelpCircle className="h-5 w-5" />
                      <span>Ko'p so'raladigan savollar</span>
                    </CardTitle>
                    <CardDescription>Eng ko'p so'raladigan savol va javoblar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {faqItems.map((item, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0">
                          <h4 className="font-semibold text-foreground mb-2">{item.question}</h4>
                          <p className="text-muted-foreground text-sm">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tutorials">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tutorials.map((tutorial, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                          <CardDescription>{tutorial.description}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="flex items-center space-x-1">
                          <Video className="h-3 w-3" />
                          <span>{tutorial.duration}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        <Video className="h-4 w-4 mr-2" />
                        Videoni ko'rish
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources">
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-muted rounded">
                            {resource.type === "pdf" ? (
                              <FileText className="h-5 w-5" />
                            ) : (
                              <ExternalLink className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                            {resource.size && <p className="text-xs text-muted-foreground mt-1">{resource.size}</p>}
                          </div>
                        </div>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Yuklab olish
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contact">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <MessageSquare className="h-5 w-5" />
                      <span>Xabar yuborish</span>
                    </CardTitle>
                    <CardDescription>Bizga to'g'ridan-to'g'ri xabar yuboring</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Mavzu</label>
                      <Input placeholder="Xabar mavzusi" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Xabar</label>
                      <Textarea placeholder="Xabaringizni yozing..." rows={4} />
                    </div>
                    <Button className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Xabar yuborish
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bog'lanish ma'lumotlari</CardTitle>
                    <CardDescription>Biz bilan bog'lanish yo'llari</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Telefon</p>
                          <p className="text-sm text-muted-foreground">+998 71 234-56-78</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">support@cloudcrm.uz</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Ish vaqti</p>
                          <p className="text-sm text-muted-foreground">
                            Dushanba - Juma: 9:00 - 18:00
                            <br />
                            Shanba: 10:00 - 15:00
                            <br />
                            Yakshanba: Dam olish kuni
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Tezkor javob</h4>
                      <p className="text-sm text-muted-foreground">
                        Odatda 24 soat ichida javob beramiz. Tezkor yordam kerak bo'lsa, telefon orqali bog'laning.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
