"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, User, Bell, Shield, Palette, Database, Save, RefreshCw } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { useTheme } from "@/contexts/theme-context"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  })

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@cloudcrm.uz",
    phone: "+998901234567",
    company: "CloudCRM Pro",
    address: "Toshkent, O'zbekiston",
    bio: "CRM tizimi administratori",
  })

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <motion.main className="p-6 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-3xl font-bold text-foreground flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mr-3">
                <Settings className="h-8 w-8 text-slate-500" />
              </div>
              Sozlamalar
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Tizim va profil sozlamalarini boshqaring
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profil</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span>Bildirishnomalar</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Xavfsizlik</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span>Ko'rinish</span>
                </TabsTrigger>
                <TabsTrigger value="system" className="flex items-center space-x-2">
                  <Database className="h-4 w-4" />
                  <span>Tizim</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Profil ma'lumotlari</CardTitle>
                      <CardDescription>Shaxsiy ma'lumotlaringizni yangilang</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Ism familiya</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefon</Label>
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Kompaniya</Label>
                          <Input
                            id="company"
                            value={profile.company}
                            onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Manzil</Label>
                        <Input
                          id="address"
                          value={profile.address}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          rows={3}
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="w-full md:w-auto">
                          <Save className="h-4 w-4 mr-2" />
                          Saqlash
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Bildirishnoma sozlamalari</CardTitle>
                      <CardDescription>Qanday bildirishnomalar olishni tanlang</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email bildirishnomalar</Label>
                            <p className="text-sm text-muted-foreground">
                              Muhim yangilanishlar haqida email orqali xabar olish
                            </p>
                          </div>
                          <Switch
                            checked={notifications.email}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Push bildirishnomalar</Label>
                            <p className="text-sm text-muted-foreground">Brauzer orqali real vaqtda bildirishnomalar</p>
                          </div>
                          <Switch
                            checked={notifications.push}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>SMS bildirishnomalar</Label>
                            <p className="text-sm text-muted-foreground">
                              Muhim hodisalar haqida SMS orqali xabar olish
                            </p>
                          </div>
                          <Switch
                            checked={notifications.sms}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Marketing xabarlari</Label>
                            <p className="text-sm text-muted-foreground">
                              Yangi xususiyatlar va takliflar haqida xabar olish
                            </p>
                          </div>
                          <Switch
                            checked={notifications.marketing}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                          />
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button>
                          <Save className="h-4 w-4 mr-2" />
                          Saqlash
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Parol o'zgartirish</CardTitle>
                      <CardDescription>Hisobingiz xavfsizligini ta'minlash uchun parolni yangilang</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Joriy parol</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Yangi parol</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Parolni tasdiqlang</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button>Parolni yangilash</Button>
                      </motion.div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Ikki bosqichli autentifikatsiya</CardTitle>
                      <CardDescription>Hisobingizga qo'shimcha xavfsizlik qatlami qo'shing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">2FA yoqilgan</p>
                          <p className="text-sm text-muted-foreground">Hisobingiz qo'shimcha himoyalangan</p>
                        </div>
                        <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                          Faol
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Ko'rinish sozlamalari</CardTitle>
                      <CardDescription>Interfeys ko'rinishini sozlang</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Mavzu</Label>
                        <Select value={theme} onValueChange={(value: "light" | "dark") => setTheme(value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Yorug'</SelectItem>
                            <SelectItem value="dark">Qorong'u</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Til</Label>
                        <Select defaultValue="uz">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="uz">O'zbek</SelectItem>
                            <SelectItem value="ru">Русский</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Vaqt zonasi</Label>
                        <Select defaultValue="asia/tashkent">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="asia/tashkent">Asia/Tashkent (UTC+5)</SelectItem>
                            <SelectItem value="europe/moscow">Europe/Moscow (UTC+3)</SelectItem>
                            <SelectItem value="utc">UTC (UTC+0)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button>
                          <Save className="h-4 w-4 mr-2" />
                          Saqlash
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Tizim ma'lumotlari</CardTitle>
                      <CardDescription>CRM tizimi haqida umumiy ma'lumotlar</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Versiya</Label>
                          <p className="text-sm text-muted-foreground">CloudCRM Pro v2.1.0</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Oxirgi yangilanish</Label>
                          <p className="text-sm text-muted-foreground">2024-01-15</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Ma'lumotlar bazasi</Label>
                          <p className="text-sm text-muted-foreground">PostgreSQL 15.2</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Server holati</Label>
                          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400">
                            Faol
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tizim amaliyotlari</CardTitle>
                      <CardDescription>Tizimni boshqarish va texnik xizmat ko'rsatish</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="outline">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Keshni tozalash
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="outline">
                            <Database className="h-4 w-4 mr-2" />
                            Ma'lumotlarni eksport qilish
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="outline">
                            <Shield className="h-4 w-4 mr-2" />
                            Xavfsizlik tekshiruvi
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.main>
      </div>
    </div>
  )
}
