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
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  Lock,
  Eye,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Save,
  Download,
} from "lucide-react"
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

export default function SecurityPage() {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5,
    ipWhitelist: true,
    auditLogging: true,
    encryptionEnabled: true,
    backupEncryption: true,
  })

  const [securityEvents] = useState([
    {
      id: "1",
      type: "login",
      user: "Admin User",
      action: "Tizimga kirish",
      ip: "192.168.1.100",
      time: "2024-01-15 14:30:25",
      status: "success",
      device: "Chrome - Windows",
    },
    {
      id: "2",
      type: "failed_login",
      user: "Unknown",
      action: "Noto'g'ri parol",
      ip: "203.0.113.45",
      time: "2024-01-15 14:25:10",
      status: "failed",
      device: "Firefox - Linux",
    },
    {
      id: "3",
      type: "password_change",
      user: "Sardor Alimov",
      action: "Parol o'zgartirildi",
      ip: "192.168.1.105",
      time: "2024-01-15 13:45:00",
      status: "success",
      device: "Safari - macOS",
    },
    {
      id: "4",
      type: "data_export",
      user: "Gulnora Karimova",
      action: "Ma'lumotlar eksport qilindi",
      ip: "192.168.1.110",
      time: "2024-01-15 12:15:30",
      status: "success",
      device: "Edge - Windows",
    },
  ])

  const [activeSessions] = useState([
    {
      id: "1",
      user: "Admin User",
      device: "Chrome - Windows 11",
      ip: "192.168.1.100",
      location: "Toshkent, O'zbekiston",
      lastActivity: "2024-01-15 14:30",
      status: "active",
    },
    {
      id: "2",
      user: "Sardor Alimov",
      device: "Safari - macOS",
      ip: "192.168.1.105",
      location: "Toshkent, O'zbekiston",
      lastActivity: "2024-01-15 14:25",
      status: "active",
    },
    {
      id: "3",
      user: "Gulnora Karimova",
      device: "Firefox - Ubuntu",
      ip: "192.168.1.110",
      location: "Samarqand, O'zbekiston",
      lastActivity: "2024-01-15 14:20",
      status: "idle",
    },
  ])

  const [isSaving, setIsSaving] = useState(false)
  const [operationStatus, setOperationStatus] = useState("")

  const handleSaveSecuritySettings = async () => {
    setIsSaving(true)
    setOperationStatus("Sozlamalar saqlanmoqda...")

    // Simulate saving settings
    setTimeout(() => {
      setIsSaving(false)
      setOperationStatus("Xavfsizlik sozlamalari muvaffaqiyatli saqlandi!")
      setTimeout(() => setOperationStatus(""), 3000)
    }, 1500)
  }

  const handleTerminateSession = (sessionId: string) => {
    if (confirm("Haqiqatan ham bu sessiyani tugatmoqchimisiz?")) {
      setOperationStatus("Sessiya tugatilyapti...")
      setTimeout(() => {
        setOperationStatus("Sessiya muvaffaqiyatli tugatildi!")
        setTimeout(() => setOperationStatus(""), 3000)
      }, 1000)
    }
  }

  const handleGenerateReport = () => {
    setOperationStatus("Xavfsizlik hisoboti yaratilmoqda...")
    setTimeout(() => {
      setOperationStatus("Hisobot muvaffaqiyatli yaratildi va yuklab olindi!")
      setTimeout(() => setOperationStatus(""), 3000)
    }, 2000)
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "login":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
      case "failed_login":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "password_change":
        return <Lock className="h-4 w-4 text-blue-500" />
      case "data_export":
        return <FileText className="h-4 w-4 text-purple-500" />
      default:
        return <Shield className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
      case "active":
        return "bg-emerald-500/20 text-emerald-600 border-emerald-500/30 dark:text-emerald-400"
      case "failed":
        return "bg-red-500/20 text-red-600 border-red-500/30 dark:text-red-400"
      case "idle":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400"
      default:
        return "bg-slate-500/20 text-slate-600 border-slate-500/30 dark:text-slate-400"
    }
  }

  const getDeviceIcon = (device: string) => {
    if (
      device.includes("Chrome") ||
      device.includes("Firefox") ||
      device.includes("Safari") ||
      device.includes("Edge")
    ) {
      return <Monitor className="h-4 w-4" />
    }
    return <Smartphone className="h-4 w-4" />
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
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              Xavfsizlik
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Tizim xavfsizligi va foydalanuvchi faoliyatini monitoring qiling
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="settings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-muted">
                <TabsTrigger value="settings" className="flex items-center space-x-2 data-[state=active]:bg-background">
                  <Lock className="h-4 w-4" />
                  <span>Sozlamalar</span>
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center space-x-2 data-[state=active]:bg-background">
                  <Eye className="h-4 w-4" />
                  <span>Faoliyat</span>
                </TabsTrigger>
                <TabsTrigger value="sessions" className="flex items-center space-x-2 data-[state=active]:bg-background">
                  <Users className="h-4 w-4" />
                  <span>Faol foydalanuvchilar</span>
                </TabsTrigger>
                <TabsTrigger value="audit" className="flex items-center space-x-2 data-[state=active]:bg-background">
                  <FileText className="h-4 w-4" />
                  <span>Audit</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Autentifikatsiya sozlamalari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Kirish va parol xavfsizligi sozlamalari
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-foreground">Ikki bosqichli autentifikatsiya</Label>
                            <p className="text-sm text-muted-foreground">SMS yoki authenticator app orqali</p>
                          </div>
                          <Switch
                            checked={securitySettings.twoFactorAuth}
                            onCheckedChange={(checked) =>
                              setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })
                            }
                          />
                        </div>
                        <Separator className="bg-border" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="session-timeout" className="text-foreground">
                              Sessiya tugash vaqti (daqiqa)
                            </Label>
                            <Input
                              id="session-timeout"
                              type="number"
                              value={securitySettings.sessionTimeout}
                              onChange={(e) =>
                                setSecuritySettings({
                                  ...securitySettings,
                                  sessionTimeout: Number.parseInt(e.target.value),
                                })
                              }
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password-expiry" className="text-foreground">
                              Parol amal qilish muddati (kun)
                            </Label>
                            <Input
                              id="password-expiry"
                              type="number"
                              value={securitySettings.passwordExpiry}
                              onChange={(e) =>
                                setSecuritySettings({
                                  ...securitySettings,
                                  passwordExpiry: Number.parseInt(e.target.value),
                                })
                              }
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="login-attempts" className="text-foreground">
                              Maksimal kirish urinishlari
                            </Label>
                            <Input
                              id="login-attempts"
                              type="number"
                              value={securitySettings.loginAttempts}
                              onChange={(e) =>
                                setSecuritySettings({
                                  ...securitySettings,
                                  loginAttempts: Number.parseInt(e.target.value),
                                })
                              }
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Tizim xavfsizligi</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Ma'lumotlar himoyasi va monitoring sozlamalari
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-foreground">IP manzillar ro'yxati</Label>
                            <p className="text-sm text-muted-foreground">Faqat ruxsat etilgan IP manzillardan kirish</p>
                          </div>
                          <Switch
                            checked={securitySettings.ipWhitelist}
                            onCheckedChange={(checked) =>
                              setSecuritySettings({ ...securitySettings, ipWhitelist: checked })
                            }
                          />
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-foreground">Audit logging</Label>
                            <p className="text-sm text-muted-foreground">Barcha foydalanuvchi amallarini yozib olish</p>
                          </div>
                          <Switch
                            checked={securitySettings.auditLogging}
                            onCheckedChange={(checked) =>
                              setSecuritySettings({ ...securitySettings, auditLogging: checked })
                            }
                          />
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-foreground">Ma'lumotlar shifrlash</Label>
                            <p className="text-sm text-muted-foreground">AES-256 shifrlash algoritmi</p>
                          </div>
                          <Switch
                            checked={securitySettings.encryptionEnabled}
                            onCheckedChange={(checked) =>
                              setSecuritySettings({ ...securitySettings, encryptionEnabled: checked })
                            }
                          />
                        </div>
                        <Separator className="bg-border" />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-foreground">Backup shifrlash</Label>
                            <p className="text-sm text-muted-foreground">Zaxira nusxalarni shifrlash</p>
                          </div>
                          <Switch
                            checked={securitySettings.backupEncryption}
                            onCheckedChange={(checked) =>
                              setSecuritySettings({ ...securitySettings, backupEncryption: checked })
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={handleSaveSecuritySettings}
                      disabled={isSaving}
                      className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Saqlanmoqda..." : "Sozlamalarni saqlash"}
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Xavfsizlik hodisalari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        So'nggi xavfsizlik hodisalari va foydalanuvchi faoliyati
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-muted-foreground">Hodisa</TableHead>
                            <TableHead className="text-muted-foreground">Foydalanuvchi</TableHead>
                            <TableHead className="text-muted-foreground">IP manzil</TableHead>
                            <TableHead className="text-muted-foreground">Qurilma</TableHead>
                            <TableHead className="text-muted-foreground">Vaqt</TableHead>
                            <TableHead className="text-muted-foreground">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {securityEvents.map((event, index) => (
                            <motion.tr
                              key={event.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="border-border hover:bg-secondary/50"
                            >
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  {getEventIcon(event.type)}
                                  <span className="text-foreground">{event.action}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-foreground">{event.user}</TableCell>
                              <TableCell className="text-foreground font-mono text-sm">{event.ip}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  {getDeviceIcon(event.device)}
                                  <span className="text-foreground text-sm">{event.device}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-foreground">{event.time}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(event.status)}>
                                  {event.status === "success" ? "Muvaffaqiyatli" : "Muvaffaqiyatsiz"}
                                </Badge>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="sessions" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Faol sessiyalar</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Hozirda tizimda faol bo'lgan foydalanuvchilar
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-muted-foreground">Foydalanuvchi</TableHead>
                            <TableHead className="text-muted-foreground">Qurilma</TableHead>
                            <TableHead className="text-muted-foreground">IP manzil</TableHead>
                            <TableHead className="text-muted-foreground">Joylashuv</TableHead>
                            <TableHead className="text-muted-foreground">Oxirgi faoliyat</TableHead>
                            <TableHead className="text-muted-foreground">Status</TableHead>
                            <TableHead className="text-muted-foreground">Amallar</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {activeSessions.map((session, index) => (
                            <motion.tr
                              key={session.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="border-border hover:bg-secondary/50"
                            >
                              <TableCell className="text-foreground font-medium">{session.user}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  {getDeviceIcon(session.device)}
                                  <span className="text-foreground text-sm">{session.device}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-foreground font-mono text-sm">{session.ip}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-1">
                                  <Globe className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-foreground text-sm">{session.location}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-foreground">{session.lastActivity}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(session.status)}>
                                  {session.status === "active" ? "Faol" : "Kutish"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-border text-foreground hover:bg-secondary"
                                  onClick={() => handleTerminateSession(session.id)}
                                >
                                  Uzish
                                </Button>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="audit" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-8 w-8 text-emerald-500" />
                          <div>
                            <p className="text-2xl font-bold text-foreground">1,247</p>
                            <p className="text-sm text-muted-foreground">Muvaffaqiyatli kirishlar</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-8 w-8 text-red-500" />
                          <div>
                            <p className="text-2xl font-bold text-foreground">23</p>
                            <p className="text-sm text-muted-foreground">Muvaffaqiyatsiz urinishlar</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-8 w-8 text-blue-500" />
                          <div>
                            <p className="text-2xl font-bold text-foreground">98.5%</p>
                            <p className="text-sm text-muted-foreground">Uptime</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Xavfsizlik ko'rsatkichlari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Tizim xavfsizligi darajasi va tavsiyalar
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-foreground">Parol mustahkamligi</span>
                            <span className="text-sm text-muted-foreground">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-foreground">2FA qamrovi</span>
                            <span className="text-sm text-muted-foreground">92%</span>
                          </div>
                          <Progress value={92} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-foreground">Tizim yangilanishi</span>
                            <span className="text-sm text-muted-foreground">100%</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-foreground">Ma'lumotlar shifrlash</span>
                            <span className="text-sm text-muted-foreground">100%</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                      </div>
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                          <div>
                            <p className="font-medium text-emerald-600 dark:text-emerald-400">
                              Xavfsizlik darajasi: Yuqori
                            </p>
                            <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80">
                              Tizim xavfsizligi standartlarga mos keladi
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button
                          onClick={handleGenerateReport}
                          variant="outline"
                          className="border-border text-foreground hover:bg-secondary"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Xavfsizlik hisoboti
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
          {operationStatus && (
            <Alert className="border-green-500/30 bg-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-600/80 dark:text-green-400/80">
                {operationStatus}
              </AlertDescription>
            </Alert>
          )}
        </motion.main>
      </div>
    </div>
  )
}
