"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Settings,
  Send,
  Eye,
  Trash2,
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertTriangle,
  Save,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { motion, AnimatePresence } from "framer-motion"
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

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  channel: "email" | "sms" | "push" | "system"
  recipient: string
  status: "sent" | "pending" | "failed" | "read"
  timestamp: string
  priority: "low" | "medium" | "high"
}

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [notificationSettings, setNotificationSettings] = useState({
    emailEnabled: true,
    smsEnabled: true,
    pushEnabled: true,
    systemEnabled: true,
    orderNotifications: true,
    customerNotifications: true,
    inventoryNotifications: true,
    securityNotifications: true,
    marketingNotifications: false,
    emailFrequency: "immediate",
    smsFrequency: "important",
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
  })

  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Yangi buyurtma",
      message: "Aziz Karimov tomonidan $1,250 miqdorida yangi buyurtma berildi",
      type: "info",
      channel: "email",
      recipient: "admin@cloudcrm.uz",
      status: "sent",
      timestamp: "2024-01-15 14:30:25",
      priority: "medium",
    },
    {
      id: "2",
      title: "To'lov amalga oshirildi",
      message: "Buyurtma #12345 uchun to'lov muvaffaqiyatli qabul qilindi",
      type: "success",
      channel: "push",
      recipient: "Barcha adminlar",
      status: "sent",
      timestamp: "2024-01-15 14:25:10",
      priority: "high",
    },
    {
      id: "3",
      title: "Mahsulot tugab qoldi",
      message: "Premium T-shirt (XL) mahsuloti tugab qoldi",
      type: "warning",
      channel: "sms",
      recipient: "+998901234567",
      status: "pending",
      timestamp: "2024-01-15 14:20:45",
      priority: "high",
    },
    {
      id: "4",
      title: "Yangi mijoz ro'yxatdan o'tdi",
      message: "Malika Rahimova tizimda ro'yxatdan o'tdi",
      type: "info",
      channel: "system",
      recipient: "Tizim",
      status: "read",
      timestamp: "2024-01-15 14:15:30",
      priority: "low",
    },
    {
      id: "5",
      title: "Xavfsizlik ogohlantirishi",
      message: "Noma'lum IP manzildan kirish urinishi aniqlandi",
      type: "error",
      channel: "email",
      recipient: "security@cloudcrm.uz",
      status: "failed",
      timestamp: "2024-01-15 14:10:15",
      priority: "high",
    },
  ])

  const [templates] = useState([
    {
      id: "1",
      name: "Yangi buyurtma",
      subject: "Yangi buyurtma #{order_id}",
      content: "Hurmatli {customer_name}, sizning buyurtmangiz qabul qilindi.",
      type: "order",
      channel: "email",
    },
    {
      id: "2",
      name: "To'lov tasdiqi",
      subject: "To'lov tasdiqlandi",
      content: "Sizning {amount} miqdoridagi to'lovingiz muvaffaqiyatli qabul qilindi.",
      type: "payment",
      channel: "sms",
    },
    {
      id: "3",
      name: "Mahsulot tugashi",
      subject: "Mahsulot tugab qoldi",
      content: "{product_name} mahsuloti tugab qoldi. Yangi partiya buyurtma qiling.",
      type: "inventory",
      channel: "push",
    },
  ])

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info",
    channel: "email",
    recipients: "all",
    priority: "medium",
  })

  const [isSending, setIsSending] = useState(false)
  const [sendStatus, setSendStatus] = useState("")

  const handleSendNotification = async () => {
    if (!newNotification.title || !newNotification.message) {
      setSendStatus("Sarlavha va xabar matnini kiriting!")
      return
    }

    setIsSending(true)
    setSendStatus("Bildirishnoma yuborilmoqda...")

    // Simulate sending notification
    setTimeout(() => {
      const notification: Notification = {
        id: Date.now().toString(),
        title: newNotification.title,
        message: newNotification.message,
        type: newNotification.type as any,
        channel: newNotification.channel as any,
        recipient: newNotification.recipients === "all" ? "Barcha foydalanuvchilar" : newNotification.recipients,
        status: "sent",
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        priority: newNotification.priority as any,
      }

      // Add to notifications list (you'd need to make notifications state mutable)
      setIsSending(false)
      setSendStatus("Bildirishnoma muvaffaqiyatli yuborildi!")

      // Reset form
      setNewNotification({
        title: "",
        message: "",
        type: "info",
        channel: "email",
        recipients: "all",
        priority: "medium",
      })

      setTimeout(() => setSendStatus(""), 3000)
    }, 2000)
  }

  const handleSaveSettings = () => {
    setSendStatus("Sozlamalar saqlandi!")
    setTimeout(() => setSendStatus(""), 3000)
  }

  const handleDeleteNotification = (notificationId: string) => {
    if (confirm("Haqiqatan ham bu bildirishnomani o'chirmoqchimisiz?")) {
      // Remove from notifications list
      setSendStatus("Bildirishnoma o'chirildi!")
      setTimeout(() => setSendStatus(""), 3000)
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.recipient.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || notification.type === filterType
    const matchesStatus = filterStatus === "all" || notification.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-500/20 text-emerald-600 border-emerald-500/30 dark:text-emerald-400"
      case "warning":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400"
      case "error":
        return "bg-red-500/20 text-red-600 border-red-500/30 dark:text-red-400"
      case "info":
      default:
        return "bg-blue-500/20 text-blue-600 border-blue-500/30 dark:text-blue-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-emerald-500/20 text-emerald-600 border-emerald-500/30 dark:text-emerald-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400"
      case "failed":
        return "bg-red-500/20 text-red-600 border-red-500/30 dark:text-red-400"
      case "read":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30 dark:text-blue-400"
      default:
        return "bg-slate-500/20 text-slate-600 border-slate-500/30 dark:text-slate-400"
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "push":
        return <Smartphone className="h-4 w-4" />
      case "system":
        return <Bell className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "read":
        return <Eye className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
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
                <Bell className="h-8 w-8 text-blue-500" />
              </div>
              Bildirishnomalar
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Bildirishnomalar va xabarlar boshqaruvi
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="notifications" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-muted/50 dark:bg-slate-800/50">
                <TabsTrigger
                  value="notifications"
                  className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground hover:text-foreground dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white"
                >
                  <Bell className="h-4 w-4" />
                  <span>Bildirishnomalar</span>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground hover:text-foreground dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white"
                >
                  <Settings className="h-4 w-4" />
                  <span>Sozlamalar</span>
                </TabsTrigger>
                <TabsTrigger
                  value="templates"
                  className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground hover:text-foreground dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Shablonlar</span>
                </TabsTrigger>
                <TabsTrigger
                  value="send"
                  className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:text-foreground text-muted-foreground hover:text-foreground dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white"
                >
                  <Send className="h-4 w-4" />
                  <span>Yuborish</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notifications" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input
                            placeholder="Bildirishnomalarni qidirish..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-background border-border text-foreground"
                          />
                        </div>
                        <Select value={filterType} onValueChange={setFilterType}>
                          <SelectTrigger className="w-full md:w-48 bg-background border-border text-foreground">
                            <SelectValue placeholder="Turi bo'yicha filter" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="all">Barcha turlar</SelectItem>
                            <SelectItem value="info">Ma'lumot</SelectItem>
                            <SelectItem value="success">Muvaffaqiyat</SelectItem>
                            <SelectItem value="warning">Ogohlantirish</SelectItem>
                            <SelectItem value="error">Xato</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger className="w-full md:w-48 bg-background border-border text-foreground">
                            <SelectValue placeholder="Status bo'yicha filter" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="all">Barcha statuslar</SelectItem>
                            <SelectItem value="sent">Yuborilgan</SelectItem>
                            <SelectItem value="pending">Kutilmoqda</SelectItem>
                            <SelectItem value="failed">Xato</SelectItem>
                            <SelectItem value="read">O'qilgan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Bildirishnomalar tarixi</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Jami {filteredNotifications.length} ta bildirishnoma topildi
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-muted-foreground">Sarlavha</TableHead>
                            <TableHead className="text-muted-foreground">Kanal</TableHead>
                            <TableHead className="text-muted-foreground">Qabul qiluvchi</TableHead>
                            <TableHead className="text-muted-foreground">Turi</TableHead>
                            <TableHead className="text-muted-foreground">Status</TableHead>
                            <TableHead className="text-muted-foreground">Vaqt</TableHead>
                            <TableHead className="text-muted-foreground">Amallar</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <AnimatePresence>
                            {filteredNotifications.map((notification, index) => (
                              <motion.tr
                                key={notification.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="border-border hover:bg-secondary/50"
                              >
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-foreground">{notification.title}</p>
                                    <p className="text-sm text-muted-foreground truncate max-w-xs">
                                      {notification.message}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    {getChannelIcon(notification.channel)}
                                    <span className="text-foreground capitalize">{notification.channel}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-foreground">{notification.recipient}</TableCell>
                                <TableCell>
                                  <Badge className={getTypeColor(notification.type)}>
                                    {notification.type === "info"
                                      ? "Ma'lumot"
                                      : notification.type === "success"
                                        ? "Muvaffaqiyat"
                                        : notification.type === "warning"
                                          ? "Ogohlantirish"
                                          : "Xato"}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    {getStatusIcon(notification.status)}
                                    <Badge className={getStatusColor(notification.status)}>
                                      {notification.status === "sent"
                                        ? "Yuborilgan"
                                        : notification.status === "pending"
                                          ? "Kutilmoqda"
                                          : notification.status === "failed"
                                            ? "Xato"
                                            : "O'qilgan"}
                                    </Badge>
                                  </div>
                                </TableCell>
                                <TableCell className="text-foreground">{notification.timestamp}</TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-border text-foreground hover:bg-secondary"
                                      >
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="border-border text-foreground hover:bg-secondary"
                                        onClick={() => handleDeleteNotification(notification.id)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </motion.div>
                                  </div>
                                </TableCell>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Bildirishnoma kanallari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Turli xil bildirishnoma kanallarini yoqish/o'chirish
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Mail className="h-5 w-5 text-blue-500" />
                              <div>
                                <Label className="text-foreground">Email bildirishnomalar</Label>
                                <p className="text-sm text-muted-foreground">Email orqali xabarlar yuborish</p>
                              </div>
                            </div>
                            <Switch
                              checked={notificationSettings.emailEnabled}
                              onCheckedChange={(checked) =>
                                setNotificationSettings({ ...notificationSettings, emailEnabled: checked })
                              }
                            />
                          </div>
                          <Separator className="bg-border" />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <MessageSquare className="h-5 w-5 text-green-500" />
                              <div>
                                <Label className="text-foreground">SMS bildirishnomalar</Label>
                                <p className="text-sm text-muted-foreground">SMS orqali xabarlar yuborish</p>
                              </div>
                            </div>
                            <Switch
                              checked={notificationSettings.smsEnabled}
                              onCheckedChange={(checked) =>
                                setNotificationSettings({ ...notificationSettings, smsEnabled: checked })
                              }
                            />
                          </div>
                          <Separator className="bg-border" />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Smartphone className="h-5 w-5 text-purple-500" />
                              <div>
                                <Label className="text-foreground">Push bildirishnomalar</Label>
                                <p className="text-sm text-muted-foreground">Mobil ilovada push xabarlar</p>
                              </div>
                            </div>
                            <Switch
                              checked={notificationSettings.pushEnabled}
                              onCheckedChange={(checked) =>
                                setNotificationSettings({ ...notificationSettings, pushEnabled: checked })
                              }
                            />
                          </div>
                          <Separator className="bg-border" />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Bell className="h-5 w-5 text-orange-500" />
                              <div>
                                <Label className="text-foreground">Tizim bildirishnomalari</Label>
                                <p className="text-sm text-muted-foreground">Tizim ichidagi bildirishnomalar</p>
                              </div>
                            </div>
                            <Switch
                              checked={notificationSettings.systemEnabled}
                              onCheckedChange={(checked) =>
                                setNotificationSettings({ ...notificationSettings, systemEnabled: checked })
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email-frequency" className="text-foreground">
                              Email chastotasi
                            </Label>
                            <Select
                              value={notificationSettings.emailFrequency}
                              onValueChange={(value) =>
                                setNotificationSettings({ ...notificationSettings, emailFrequency: value })
                              }
                            >
                              <SelectTrigger className="bg-background border-border text-foreground">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="immediate">Darhol</SelectItem>
                                <SelectItem value="hourly">Soatlik</SelectItem>
                                <SelectItem value="daily">Kunlik</SelectItem>
                                <SelectItem value="weekly">Haftalik</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="sms-frequency" className="text-foreground">
                              SMS chastotasi
                            </Label>
                            <Select
                              value={notificationSettings.smsFrequency}
                              onValueChange={(value) =>
                                setNotificationSettings({ ...notificationSettings, smsFrequency: value })
                              }
                            >
                              <SelectTrigger className="bg-background border-border text-foreground">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="important">Faqat muhim</SelectItem>
                                <SelectItem value="daily">Kunlik</SelectItem>
                                <SelectItem value="never">Hech qachon</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="text-foreground">Tinch soatlar</Label>
                              <p className="text-sm text-muted-foreground">Kechqurun bildirishnoma yubormaslik</p>
                            </div>
                            <Switch
                              checked={notificationSettings.quietHours}
                              onCheckedChange={(checked) =>
                                setNotificationSettings({ ...notificationSettings, quietHours: checked })
                              }
                            />
                          </div>
                          {notificationSettings.quietHours && (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="quiet-start" className="text-foreground">
                                  Boshlanish vaqti
                                </Label>
                                <Input
                                  id="quiet-start"
                                  type="time"
                                  value={notificationSettings.quietStart}
                                  onChange={(e) =>
                                    setNotificationSettings({ ...notificationSettings, quietStart: e.target.value })
                                  }
                                  className="bg-background border-border text-foreground"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="quiet-end" className="text-foreground">
                                  Tugash vaqti
                                </Label>
                                <Input
                                  id="quiet-end"
                                  type="time"
                                  value={notificationSettings.quietEnd}
                                  onChange={(e) =>
                                    setNotificationSettings({ ...notificationSettings, quietEnd: e.target.value })
                                  }
                                  className="bg-background border-border text-foreground"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Bildirishnoma turlari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Har xil hodisalar uchun bildirishnomalarni sozlash
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-foreground">Buyurtma bildirishnomalari</Label>
                            <p className="text-sm text-muted-foreground">Yangi buyurtmalar va o'zgarishlar haqida</p>
                          </div>
                          <Switch
                            checked={notificationSettings.orderNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, orderNotifications: checked })
                            }
                          />
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-foreground">Mijoz bildirishnomalari</Label>
                            <p className="text-sm text-muted-foreground">Yangi mijozlar va faoliyat haqida</p>
                          </div>
                          <Switch
                            checked={notificationSettings.customerNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, customerNotifications: checked })
                            }
                          />
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-foreground">Inventar bildirishnomalari</Label>
                            <p className="text-sm text-muted-foreground">Mahsulot tugashi va qoldiq haqida</p>
                          </div>
                          <Switch
                            checked={notificationSettings.inventoryNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, inventoryNotifications: checked })
                            }
                          />
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-foreground">Xavfsizlik bildirishnomalari</Label>
                            <p className="text-sm text-muted-foreground">Xavfsizlik hodisalari haqida</p>
                          </div>
                          <Switch
                            checked={notificationSettings.securityNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, securityNotifications: checked })
                            }
                          />
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-foreground">Marketing bildirishnomalari</Label>
                            <p className="text-sm text-muted-foreground">Reklama va aksiyalar haqida</p>
                          </div>
                          <Switch
                            checked={notificationSettings.marketingNotifications}
                            onCheckedChange={(checked) =>
                              setNotificationSettings({ ...notificationSettings, marketingNotifications: checked })
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {sendStatus && (
                    <Alert className="border-blue-500/30 bg-blue-500/10">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertDescription className="text-blue-600/80 dark:text-blue-400/80">
                        {sendStatus}
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleSaveSettings}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Sozlamalarni saqlash
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Xabar shablonlari</h3>
                      <p className="text-sm text-muted-foreground">Avtomatik xabarlar uchun shablonlar</p>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Yangi shablon
                      </Button>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template, index) => (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-foreground text-lg">{template.name}</CardTitle>
                              <div className="flex items-center space-x-1">
                                {getChannelIcon(template.channel)}
                                <Badge variant="outline" className="border-border text-foreground">
                                  {template.channel}
                                </Badge>
                              </div>
                            </div>
                            <CardDescription className="text-muted-foreground">{template.subject}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{template.content}</p>
                            <div className="flex space-x-2">
                              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-border text-foreground hover:bg-secondary"
                                >
                                  Tahrirlash
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-border text-foreground hover:bg-secondary"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="send" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Yangi bildirishnoma yuborish</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Foydalanuvchilarga xabar yuborish
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="recipient-type" className="text-foreground">
                              Qabul qiluvchilar
                            </Label>
                            <Select>
                              <SelectTrigger className="bg-background border-border text-foreground">
                                <SelectValue placeholder="Qabul qiluvchilarni tanlang" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="all">Barcha foydalanuvchilar</SelectItem>
                                <SelectItem value="admins">Faqat adminlar</SelectItem>
                                <SelectItem value="managers">Faqat menejerlar</SelectItem>
                                <SelectItem value="customers">Faqat mijozlar</SelectItem>
                                <SelectItem value="custom">Maxsus ro'yxat</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notification-channel" className="text-foreground">
                              Kanal
                            </Label>
                            <Select>
                              <SelectTrigger className="bg-background border-border text-foreground">
                                <SelectValue placeholder="Kanalni tanlang" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="sms">SMS</SelectItem>
                                <SelectItem value="push">Push bildirishnoma</SelectItem>
                                <SelectItem value="system">Tizim bildirishnomalari</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="notification-type" className="text-foreground">
                              Turi
                            </Label>
                            <Select>
                              <SelectTrigger className="bg-background border-border text-foreground">
                                <SelectValue placeholder="Turini tanlang" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="info">Ma'lumot</SelectItem>
                                <SelectItem value="success">Muvaffaqiyat</SelectItem>
                                <SelectItem value="warning">Ogohlantirish</SelectItem>
                                <SelectItem value="error">Xato</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="priority" className="text-foreground">
                              Muhimlik darajasi
                            </Label>
                            <Select>
                              <SelectTrigger className="bg-background border-border text-foreground">
                                <SelectValue placeholder="Muhimlik darajasini tanlang" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="low">Past</SelectItem>
                                <SelectItem value="medium">O'rta</SelectItem>
                                <SelectItem value="high">Yuqori</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="subject" className="text-foreground">
                              Sarlavha
                            </Label>
                            <Input
                              id="subject"
                              placeholder="Xabar sarlavhasi"
                              value={newNotification.title}
                              onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                              className="bg-background border-border text-foreground"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="message" className="text-foreground">
                              Xabar matni
                            </Label>
                            <Textarea
                              id="message"
                              placeholder="Xabar matnini kiriting..."
                              rows={6}
                              value={newNotification.message}
                              onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                              className="bg-background border-border text-foreground"
                            />
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                              onClick={handleSendNotification}
                              disabled={isSending}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              {isSending ? "Yuborilmoqda..." : "Yuborish"}
                            </Button>
                            <Button
                              variant="outline"
                              className="border-border text-foreground hover:bg-secondary"
                              onClick={() =>
                                setNewNotification({
                                  title: "",
                                  message: "",
                                  type: "info",
                                  channel: "email",
                                  recipients: "all",
                                  priority: "medium",
                                })
                              }
                            >
                              Tozalash
                            </Button>
                          </div>
                        </div>
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
