"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Store, Settings, CreditCard, Truck, Palette, Upload, Save, CheckCircle } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

export default function StoreSettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    name: "CloudCRM Pro",
    description: "Professional wholesale clothing management system",
    email: "info@cloudcrm.com",
    phone: "+998 90 123 45 67",
    address: "Tashkent, Uzbekistan",
    website: "https://cloudcrm.com",
    currency: "USD",
    timezone: "Asia/Tashkent",
    language: "uz",
    taxRate: "12",
    enableNotifications: true,
    enableAutoBackup: true,
    enableAnalytics: true,
  })

  const [paymentSettings, setPaymentSettings] = useState({
    enableCash: true,
    enableCard: true,
    enableBank: true,
    enableCrypto: false,
    minimumOrder: "100",
    maxCreditLimit: "10000",
    paymentTerms: "30",
  })

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: "500",
    localShippingRate: "10",
    internationalShippingRate: "25",
    expressShippingRate: "50",
    enableTracking: true,
    enableInsurance: true,
    defaultShippingMethod: "standard",
  })

  const [brandSettings, setBrandSettings] = useState({
    primaryColor: "#3B82F6",
    secondaryColor: "#8B5CF6",
    logoUrl: "",
    faviconUrl: "",
    brandName: "CloudCRM",
    tagline: "Professional Wholesale Management",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState("")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [faviconFile, setFaviconFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)

  // Load settings on component mount
  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)

      // Fetch settings with proper error handling
      const [storeResponse, paymentResponse, shippingResponse, brandResponse] = await Promise.all([
        fetch("/api/settings/store").then((res) => (res.ok ? res.json() : [])),
        fetch("/api/settings/payment").then((res) => (res.ok ? res.json() : [])),
        fetch("/api/settings/shipping").then((res) => (res.ok ? res.json() : [])),
        fetch("/api/settings/brand").then((res) => (res.ok ? res.json() : [])),
      ])

      // Convert settings arrays to objects with proper fallbacks
      const storeObj = Array.isArray(storeResponse)
        ? storeResponse.reduce((acc: any, setting: any) => {
            if (setting && setting.key && setting.value !== undefined) {
              acc[setting.key] = setting.value
            }
            return acc
          }, {})
        : {}

      const paymentObj = Array.isArray(paymentResponse)
        ? paymentResponse.reduce((acc: any, setting: any) => {
            if (setting && setting.key && setting.value !== undefined) {
              acc[setting.key] = setting.value === "true" ? true : setting.value === "false" ? false : setting.value
            }
            return acc
          }, {})
        : {}

      const shippingObj = Array.isArray(shippingResponse)
        ? shippingResponse.reduce((acc: any, setting: any) => {
            if (setting && setting.key && setting.value !== undefined) {
              acc[setting.key] = setting.value === "true" ? true : setting.value === "false" ? false : setting.value
            }
            return acc
          }, {})
        : {}

      const brandObj = Array.isArray(brandResponse)
        ? brandResponse.reduce((acc: any, setting: any) => {
            if (setting && setting.key && setting.value !== undefined) {
              acc[setting.key] = setting.value
            }
            return acc
          }, {})
        : {}

      // Update state with merged settings (keeping defaults for missing values)
      setStoreSettings((prev) => ({ ...prev, ...storeObj }))
      setPaymentSettings((prev) => ({ ...prev, ...paymentObj }))
      setShippingSettings((prev) => ({ ...prev, ...shippingObj }))
      setBrandSettings((prev) => ({ ...prev, ...brandObj }))
    } catch (error) {
      console.error("Error loading settings:", error)
      setSaveStatus("Sozlamalarni yuklashda xatolik!")
      setTimeout(() => setSaveStatus(""), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)
    setSaveStatus("Sozlamalar saqlanmoqda...")

    try {
      // Save all settings categories
      const savePromises = [
        fetch("/api/settings/store", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(storeSettings),
        }),
        fetch("/api/settings/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentSettings),
        }),
        fetch("/api/settings/shipping", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(shippingSettings),
        }),
        fetch("/api/settings/brand", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(brandSettings),
        }),
      ]

      await Promise.all(savePromises)
      setSaveStatus("Sozlamalar muvaffaqiyatli saqlandi!")
    } catch (error) {
      console.error("Error saving settings:", error)
      setSaveStatus("Sozlamalarni saqlashda xatolik!")
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveStatus(""), 3000)
    }
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      setBrandSettings({ ...brandSettings, logoUrl: URL.createObjectURL(file) })
      setSaveStatus("Logo yuklandi!")
      setTimeout(() => setSaveStatus(""), 3000)
    }
  }

  const handleFaviconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFaviconFile(file)
      setBrandSettings({ ...brandSettings, faviconUrl: URL.createObjectURL(file) })
      setSaveStatus("Favicon yuklandi!")
      setTimeout(() => setSaveStatus(""), 3000)
    }
  }

  const handleTestEmail = async () => {
    setSaveStatus("Test email yuborilmoqda...")
    // Simulate email test
    setTimeout(() => {
      setSaveStatus("Test email muvaffaqiyatli yuborildi!")
      setTimeout(() => setSaveStatus(""), 3000)
    }, 1500)
  }

  const handleTestSMS = async () => {
    setSaveStatus("Test SMS yuborilmoqda...")
    // Simulate SMS test
    setTimeout(() => {
      setSaveStatus("Test SMS muvaffaqiyatli yuborildi!")
      setTimeout(() => setSaveStatus(""), 3000)
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="ml-64">
          <Header />
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-muted-foreground">Sozlamalar yuklanmoqda...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                <Store className="h-8 w-8 text-blue-500" />
              </div>
              Do'kon sozlamalari
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Do'kon ma'lumotlari va biznes sozlamalarini boshqaring
            </motion.p>
          </motion.div>

          {saveStatus && (
            <Alert className="border-green-500/30 bg-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-600/80 dark:text-green-400/80">{saveStatus}</AlertDescription>
            </Alert>
          )}

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-muted">
                <TabsTrigger value="general" className="flex items-center space-x-2 data-[state=active]:bg-background">
                  <Settings className="h-4 w-4" />
                  <span>Umumiy</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center space-x-2 data-[state=active]:bg-background">
                  <CreditCard className="h-4 w-4" />
                  <span>To'lov</span>
                </TabsTrigger>
                <TabsTrigger value="shipping" className="flex items-center space-x-2 data-[state=active]:bg-background">
                  <Truck className="h-4 w-4" />
                  <span>Yetkazib berish</span>
                </TabsTrigger>
                <TabsTrigger value="branding" className="flex items-center space-x-2 data-[state=active]:bg-background">
                  <Palette className="h-4 w-4" />
                  <span>Brending</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Do'kon ma'lumotlari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Asosiy do'kon ma'lumotlarini sozlang
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="store-name" className="text-foreground">
                            Do'kon nomi
                          </Label>
                          <Input
                            id="store-name"
                            value={storeSettings.name}
                            onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })}
                            className="bg-background border-border text-foreground"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="store-email" className="text-foreground">
                            Email
                          </Label>
                          <Input
                            id="store-email"
                            type="email"
                            value={storeSettings.email}
                            onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                            className="bg-background border-border text-foreground"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="store-phone" className="text-foreground">
                            Telefon
                          </Label>
                          <Input
                            id="store-phone"
                            value={storeSettings.phone}
                            onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                            className="bg-background border-border text-foreground"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="store-website" className="text-foreground">
                            Veb-sayt
                          </Label>
                          <Input
                            id="store-website"
                            value={storeSettings.website}
                            onChange={(e) => setStoreSettings({ ...storeSettings, website: e.target.value })}
                            className="bg-background border-border text-foreground"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-description" className="text-foreground">
                          Tavsif
                        </Label>
                        <Textarea
                          id="store-description"
                          value={storeSettings.description}
                          onChange={(e) => setStoreSettings({ ...storeSettings, description: e.target.value })}
                          rows={3}
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-address" className="text-foreground">
                          Manzil
                        </Label>
                        <Textarea
                          id="store-address"
                          value={storeSettings.address}
                          onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                          rows={2}
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Mintaqa va til sozlamalari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Valyuta, vaqt zonasi va til sozlamalari
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="currency" className="text-foreground">
                            Valyuta
                          </Label>
                          <Select
                            value={storeSettings.currency}
                            onValueChange={(value) => setStoreSettings({ ...storeSettings, currency: value })}
                          >
                            <SelectTrigger className="bg-background border-border text-foreground">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border">
                              <SelectItem value="USD">USD - Dollar</SelectItem>
                              <SelectItem value="UZS">UZS - So'm</SelectItem>
                              <SelectItem value="EUR">EUR - Evro</SelectItem>
                              <SelectItem value="RUB">RUB - Rubl</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone" className="text-foreground">
                            Vaqt zonasi
                          </Label>
                          <Select
                            value={storeSettings.timezone}
                            onValueChange={(value) => setStoreSettings({ ...storeSettings, timezone: value })}
                          >
                            <SelectTrigger className="bg-background border-border text-foreground">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border">
                              <SelectItem value="Asia/Tashkent">Asia/Tashkent (UTC+5)</SelectItem>
                              <SelectItem value="Europe/Moscow">Europe/Moscow (UTC+3)</SelectItem>
                              <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="language" className="text-foreground">
                            Til
                          </Label>
                          <Select
                            value={storeSettings.language}
                            onValueChange={(value) => setStoreSettings({ ...storeSettings, language: value })}
                          >
                            <SelectTrigger className="bg-background border-border text-foreground">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border">
                              <SelectItem value="uz">O'zbek</SelectItem>
                              <SelectItem value="ru">Русский</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tax-rate" className="text-foreground">
                          Soliq stavkasi (%)
                        </Label>
                        <Input
                          id="tax-rate"
                          type="number"
                          value={storeSettings.taxRate}
                          onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: e.target.value })}
                          className="bg-background border-border text-foreground"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Tizim sozlamalari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Bildirishnomalar va avtomatik funksiyalar
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-foreground">Bildirishnomalarni yoqish</Label>
                            <p className="text-sm text-muted-foreground">Email va SMS bildirishnomalar</p>
                          </div>
                          <Switch
                            checked={storeSettings.enableNotifications}
                            onCheckedChange={(checked) =>
                              setStoreSettings({ ...storeSettings, enableNotifications: checked })
                            }
                          />
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-foreground">Avtomatik zaxira nusxa</Label>
                            <p className="text-sm text-muted-foreground">Kunlik avtomatik backup</p>
                          </div>
                          <Switch
                            checked={storeSettings.enableAutoBackup}
                            onCheckedChange={(checked) =>
                              setStoreSettings({ ...storeSettings, enableAutoBackup: checked })
                            }
                          />
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-foreground">Analitika yig'ish</Label>
                            <p className="text-sm text-muted-foreground">Foydalanuvchi faoliyati tahlili</p>
                          </div>
                          <Switch
                            checked={storeSettings.enableAnalytics}
                            onCheckedChange={(checked) =>
                              setStoreSettings({ ...storeSettings, enableAnalytics: checked })
                            }
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        <Button
                          variant="outline"
                          onClick={handleTestEmail}
                          className="border-border text-foreground hover:bg-secondary"
                        >
                          Email test
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleTestSMS}
                          className="border-border text-foreground hover:bg-secondary"
                        >
                          SMS test
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="payment" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">To'lov usullari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Qabul qilinadigan to'lov usullarini sozlang
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-foreground">Naqd to'lov</Label>
                              <p className="text-sm text-muted-foreground">Naqd pul orqali to'lov</p>
                            </div>
                            <Switch
                              checked={paymentSettings.enableCash}
                              onCheckedChange={(checked) =>
                                setPaymentSettings({ ...paymentSettings, enableCash: checked })
                              }
                            />
                          </div>
                          <Separator className="bg-border" />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-foreground">Karta to'lovi</Label>
                              <p className="text-sm text-muted-foreground">Bank kartalari orqali</p>
                            </div>
                            <Switch
                              checked={paymentSettings.enableCard}
                              onCheckedChange={(checked) =>
                                setPaymentSettings({ ...paymentSettings, enableCard: checked })
                              }
                            />
                          </div>
                          <Separator className="bg-border" />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-foreground">Bank o'tkazmasi</Label>
                              <p className="text-sm text-muted-foreground">Bank orqali to'lov</p>
                            </div>
                            <Switch
                              checked={paymentSettings.enableBank}
                              onCheckedChange={(checked) =>
                                setPaymentSettings({ ...paymentSettings, enableBank: checked })
                              }
                            />
                          </div>
                          <Separator className="bg-border" />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-foreground">Kripto valyuta</Label>
                              <p className="text-sm text-muted-foreground">Bitcoin, Ethereum</p>
                            </div>
                            <Switch
                              checked={paymentSettings.enableCrypto}
                              onCheckedChange={(checked) =>
                                setPaymentSettings({ ...paymentSettings, enableCrypto: checked })
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="min-order" className="text-foreground">
                              Minimal buyurtma ($)
                            </Label>
                            <Input
                              id="min-order"
                              type="number"
                              value={paymentSettings.minimumOrder}
                              onChange={(e) => setPaymentSettings({ ...paymentSettings, minimumOrder: e.target.value })}
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="credit-limit" className="text-foreground">
                              Maksimal kredit ($)
                            </Label>
                            <Input
                              id="credit-limit"
                              type="number"
                              value={paymentSettings.maxCreditLimit}
                              onChange={(e) =>
                                setPaymentSettings({ ...paymentSettings, maxCreditLimit: e.target.value })
                              }
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="payment-terms" className="text-foreground">
                              To'lov muddati (kun)
                            </Label>
                            <Input
                              id="payment-terms"
                              type="number"
                              value={paymentSettings.paymentTerms}
                              onChange={(e) => setPaymentSettings({ ...paymentSettings, paymentTerms: e.target.value })}
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Yetkazib berish sozlamalari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Yetkazib berish usullari va narxlarini sozlang
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="free-shipping" className="text-foreground">
                              Bepul yetkazib berish ($)
                            </Label>
                            <Input
                              id="free-shipping"
                              type="number"
                              value={shippingSettings.freeShippingThreshold}
                              onChange={(e) =>
                                setShippingSettings({ ...shippingSettings, freeShippingThreshold: e.target.value })
                              }
                              className="bg-background border-border text-foreground"
                            />
                            <p className="text-xs text-muted-foreground">
                              Ushbu summadan yuqori buyurtmalar uchun bepul yetkazib berish
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="local-shipping" className="text-foreground">
                              Mahalliy yetkazib berish ($)
                            </Label>
                            <Input
                              id="local-shipping"
                              type="number"
                              value={shippingSettings.localShippingRate}
                              onChange={(e) =>
                                setShippingSettings({ ...shippingSettings, localShippingRate: e.target.value })
                              }
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="international-shipping" className="text-foreground">
                              Xalqaro yetkazib berish ($)
                            </Label>
                            <Input
                              id="international-shipping"
                              type="number"
                              value={shippingSettings.internationalShippingRate}
                              onChange={(e) =>
                                setShippingSettings({ ...shippingSettings, internationalShippingRate: e.target.value })
                              }
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="express-shipping" className="text-foreground">
                              Tezkor yetkazib berish ($)
                            </Label>
                            <Input
                              id="express-shipping"
                              type="number"
                              value={shippingSettings.expressShippingRate}
                              onChange={(e) =>
                                setShippingSettings({ ...shippingSettings, expressShippingRate: e.target.value })
                              }
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="default-method" className="text-foreground">
                              Standart usul
                            </Label>
                            <Select
                              value={shippingSettings.defaultShippingMethod}
                              onValueChange={(value) =>
                                setShippingSettings({ ...shippingSettings, defaultShippingMethod: value })
                              }
                            >
                              <SelectTrigger className="bg-background border-border text-foreground">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="standard">Standart</SelectItem>
                                <SelectItem value="express">Tezkor</SelectItem>
                                <SelectItem value="overnight">Bir kunda</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-foreground">Kuzatuv raqami</Label>
                                <p className="text-sm text-muted-foreground">Buyurtmalarni kuzatish imkoniyati</p>
                              </div>
                              <Switch
                                checked={shippingSettings.enableTracking}
                                onCheckedChange={(checked) =>
                                  setShippingSettings({ ...shippingSettings, enableTracking: checked })
                                }
                              />
                            </div>
                            <Separator className="bg-border" />
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label className="text-foreground">Sug'urta</Label>
                                <p className="text-sm text-muted-foreground">Yetkazib berish sug'urtasi</p>
                              </div>
                              <Switch
                                checked={shippingSettings.enableInsurance}
                                onCheckedChange={(checked) =>
                                  setShippingSettings({ ...shippingSettings, enableInsurance: checked })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="branding" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Brend sozlamalari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Logo, ranglar va brend elementlarini sozlang
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="brand-name" className="text-foreground">
                              Brend nomi
                            </Label>
                            <Input
                              id="brand-name"
                              value={brandSettings.brandName}
                              onChange={(e) => setBrandSettings({ ...brandSettings, brandName: e.target.value })}
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tagline" className="text-foreground">
                              Slogan
                            </Label>
                            <Input
                              id="tagline"
                              value={brandSettings.tagline}
                              onChange={(e) => setBrandSettings({ ...brandSettings, tagline: e.target.value })}
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="primary-color" className="text-foreground">
                              Asosiy rang
                            </Label>
                            <div className="flex space-x-2">
                              <Input
                                id="primary-color"
                                type="color"
                                value={brandSettings.primaryColor}
                                onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                                className="w-16 h-10 p-1 bg-background border-border"
                              />
                              <Input
                                value={brandSettings.primaryColor}
                                onChange={(e) => setBrandSettings({ ...brandSettings, primaryColor: e.target.value })}
                                className="flex-1 bg-background border-border text-foreground"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="secondary-color" className="text-foreground">
                              Ikkinchi rang
                            </Label>
                            <div className="flex space-x-2">
                              <Input
                                id="secondary-color"
                                type="color"
                                value={brandSettings.secondaryColor}
                                onChange={(e) => setBrandSettings({ ...brandSettings, secondaryColor: e.target.value })}
                                className="w-16 h-10 p-1 bg-background border-border"
                              />
                              <Input
                                value={brandSettings.secondaryColor}
                                onChange={(e) => setBrandSettings({ ...brandSettings, secondaryColor: e.target.value })}
                                className="flex-1 bg-background border-border text-foreground"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-foreground">Logo</Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-background">
                              {brandSettings.logoUrl ? (
                                <div className="space-y-2">
                                  <img
                                    src={brandSettings.logoUrl || "/placeholder.svg"}
                                    alt="Logo"
                                    className="h-16 mx-auto"
                                  />
                                  <p className="text-sm text-muted-foreground">Logo yuklandi</p>
                                </div>
                              ) : (
                                <>
                                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                  <p className="text-sm text-muted-foreground">Logo yuklash uchun bosing</p>
                                </>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="hidden"
                                id="logo-upload"
                              />
                              <Button
                                variant="outline"
                                className="mt-2 border-border text-foreground hover:bg-secondary"
                                onClick={() => document.getElementById("logo-upload")?.click()}
                              >
                                Fayl tanlash
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-foreground">Favicon</Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center bg-background">
                              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">Favicon yuklash uchun bosing</p>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFaviconUpload}
                                className="hidden"
                                id="favicon-upload"
                              />
                              <Button
                                variant="outline"
                                className="mt-2 border-border text-foreground hover:bg-secondary"
                                onClick={() => document.getElementById("favicon-upload")?.click()}
                              >
                                Fayl tanlash
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Brend ko'rinishi</h4>
                        <div className="flex items-center space-x-4">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                            style={{
                              background: `linear-gradient(135deg, ${brandSettings.primaryColor}, ${brandSettings.secondaryColor})`,
                            }}
                          >
                            {brandSettings.brandName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{brandSettings.brandName}</p>
                            <p className="text-sm text-muted-foreground">{brandSettings.tagline}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
                  Bekor qilish
                </Button>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    onClick={handleSaveSettings}
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saqlanmoqda..." : "Sozlamalarni saqlash"}
                  </Button>
                </motion.div>
              </div>
            </Tabs>
          </motion.div>
        </motion.main>
      </div>
    </div>
  )
}
