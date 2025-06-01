"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Database,
  HardDrive,
  Activity,
  Settings,
  FileText,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  Zap,
  AlertTriangle,
  BarChart3,
  Trash2,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
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

export default function DatabasePage() {
  const [dbStats, setDbStats] = useState({
    totalSize: 2.4,
    usedSpace: 1.8,
    connections: 45,
    queries: 1247,
    uptime: 99.9,
    avgResponseTime: 12,
  })

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    retentionDays: 30,
    compression: true,
    encryption: true,
  })

  const [slowQueries] = useState([
    {
      id: "1",
      query: "SELECT * FROM customers WHERE created_at > '2024-01-01' ORDER BY total_spent DESC",
      duration: 2.45,
      timestamp: "2024-01-15 14:30:25",
      database: "crm_main",
      executions: 156,
    },
    {
      id: "2",
      query: "UPDATE products SET stock = stock - 1 WHERE id IN (SELECT product_id FROM order_items)",
      duration: 1.89,
      timestamp: "2024-01-15 14:25:10",
      database: "crm_main",
      executions: 89,
    },
    {
      id: "3",
      query: "SELECT COUNT(*) FROM orders o JOIN customers c ON o.customer_id = c.id WHERE c.status = 'active'",
      duration: 1.67,
      timestamp: "2024-01-15 14:20:45",
      database: "crm_analytics",
      executions: 234,
    },
  ])

  const [backupHistory, setBackupHistory] = useState([
    {
      id: "1",
      type: "Full",
      size: "2.1 GB",
      status: "completed",
      timestamp: "2024-01-15 02:00:00",
      duration: "12 min",
    },
    {
      id: "2",
      type: "Incremental",
      size: "156 MB",
      status: "completed",
      timestamp: "2024-01-14 02:00:00",
      duration: "3 min",
    },
    {
      id: "3",
      type: "Full",
      size: "2.0 GB",
      status: "completed",
      timestamp: "2024-01-13 02:00:00",
      duration: "11 min",
    },
    {
      id: "4",
      type: "Incremental",
      size: "89 MB",
      status: "failed",
      timestamp: "2024-01-12 02:00:00",
      duration: "N/A",
    },
  ])

  const [logs] = useState([
    {
      id: "1",
      level: "INFO",
      message: "Database connection established from 192.168.1.100",
      timestamp: "2024-01-15 14:30:25",
      source: "connection_pool",
    },
    {
      id: "2",
      level: "WARNING",
      message: "Slow query detected: 2.45s execution time",
      timestamp: "2024-01-15 14:30:20",
      source: "query_monitor",
    },
    {
      id: "3",
      level: "INFO",
      message: "Backup completed successfully: 2.1 GB",
      timestamp: "2024-01-15 02:00:15",
      source: "backup_service",
    },
    {
      id: "4",
      level: "ERROR",
      message: "Connection timeout for user session ID: 12345",
      timestamp: "2024-01-15 01:45:30",
      source: "session_manager",
    },
    {
      id: "5",
      level: "INFO",
      message: "Index optimization completed on table 'orders'",
      timestamp: "2024-01-15 01:30:00",
      source: "maintenance",
    },
  ])

  const [tableStats] = useState([
    {
      name: "customers",
      size: "456 MB",
      rows: "125,678",
      lastUpdated: "2024-01-15 14:25:00",
    },
    {
      name: "orders",
      size: "789 MB",
      rows: "234,567",
      lastUpdated: "2024-01-15 14:30:00",
    },
    {
      name: "products",
      size: "234 MB",
      rows: "45,678",
      lastUpdated: "2024-01-15 14:20:00",
    },
    {
      name: "order_items",
      size: "567 MB",
      rows: "567,890",
      lastUpdated: "2024-01-15 14:28:00",
    },
  ])

  const [isBackupRunning, setIsBackupRunning] = useState(false)
  const [isMaintenanceRunning, setIsMaintenanceRunning] = useState(false)
  const [operationStatus, setOperationStatus] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDbStats((prev) => ({
        ...prev,
        connections: Math.floor(Math.random() * 20) + 35,
        queries: prev.queries + Math.floor(Math.random() * 10),
        avgResponseTime: Math.floor(Math.random() * 10) + 8,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-600 border-emerald-500/30 dark:text-emerald-400"
      case "running":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30 dark:text-blue-400"
      case "failed":
        return "bg-red-500/20 text-red-600 border-red-500/30 dark:text-red-400"
      default:
        return "bg-slate-500/20 text-slate-600 border-slate-500/30 dark:text-slate-400"
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "INFO":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30 dark:text-blue-400"
      case "WARNING":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400"
      case "ERROR":
        return "bg-red-500/20 text-red-600 border-red-500/30 dark:text-red-400"
      default:
        return "bg-slate-500/20 text-slate-600 border-slate-500/30 dark:text-slate-400"
    }
  }

  const handleCreateBackup = async () => {
    setIsBackupRunning(true)
    setOperationStatus("Backup yaratilmoqda...")

    // Simulate backup process
    setTimeout(() => {
      const newBackup = {
        id: Date.now().toString(),
        type: "Manual",
        size: "2.3 GB",
        status: "completed",
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        duration: "8 min",
      }

      setBackupHistory([newBackup, ...backupHistory])
      setIsBackupRunning(false)
      setOperationStatus("Backup muvaffaqiyatli yaratildi!")

      setTimeout(() => setOperationStatus(""), 3000)
    }, 5000)
  }

  const handleMaintenanceOperation = async (operation: string) => {
    setIsMaintenanceRunning(true)
    setOperationStatus(`${operation} bajarilmoqda...`)

    // Simulate maintenance operation
    setTimeout(() => {
      setIsMaintenanceRunning(false)
      setOperationStatus(`${operation} muvaffaqiyatli bajarildi!`)

      setTimeout(() => setOperationStatus(""), 3000)
    }, 3000)
  }

  const handleDownloadBackup = (backupId: string) => {
    // Simulate backup download
    setOperationStatus("Backup yuklab olinmoqda...")
    setTimeout(() => {
      setOperationStatus("Backup muvaffaqiyatli yuklab olindi!")
      setTimeout(() => setOperationStatus(""), 3000)
    }, 2000)
  }

  const handleRestoreBackup = (backupId: string) => {
    if (confirm("Haqiqatan ham ma'lumotlar bazasini tiklashni xohlaysizmi? Bu jarayon qaytarib bo'lmaydi.")) {
      setOperationStatus("Ma'lumotlar bazasi tiklanmoqda...")
      setTimeout(() => {
        setOperationStatus("Ma'lumotlar bazasi muvaffaqiyatli tiklandi!")
        setTimeout(() => setOperationStatus(""), 3000)
      }, 4000)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <motion.main className="p-6 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
          {operationStatus && (
            <Alert className="border-blue-500/30 bg-blue-500/10">
              <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertTitle className="text-blue-600 dark:text-blue-400">Ma'lumot</AlertTitle>
              <AlertDescription className="text-blue-600/80 dark:text-blue-400/80">{operationStatus}</AlertDescription>
            </Alert>
          )}
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-3xl font-bold text-foreground flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mr-3">
                <Database className="h-8 w-8 text-green-500" />
              </div>
              Ma'lumotlar bazasi
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Ma'lumotlar bazasi monitoring, backup va boshqaruv
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-muted">
                <TabsTrigger value="overview" className="flex items-center space-x-2 data-[state=active]:bg-background">
                  <Database className="h-4 w-4" />
                  <span>Umumiy ko'rinish</span>
                </TabsTrigger>
                <TabsTrigger value="backup" className="flex items-center space-x-2 data-[state=active]:bg-background">
                  <HardDrive className="h-4 w-4" />
                  <span>Backup</span>
                </TabsTrigger>
                <TabsTrigger
                  value="performance"
                  className="flex items-center space-x-2 data-[state=active]:bg-background"
                >
                  <Activity className="h-4 w-4" />
                  <span>Ishlash</span>
                </TabsTrigger>
                <TabsTrigger
                  value="maintenance"
                  className="flex items-center space-x-2 data-[state=active]:bg-background"
                >
                  <Settings className="h-4 w-4" />
                  <span>Texnik xizmat</span>
                </TabsTrigger>
                <TabsTrigger value="logs" className="flex items-center space-x-2 data-[state=active]:bg-background">
                  <FileText className="h-4 w-4" />
                  <span>Loglar</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <HardDrive className="h-8 w-8 text-blue-500" />
                          <div>
                            <p className="text-2xl font-bold text-foreground">{dbStats.totalSize} GB</p>
                            <p className="text-sm text-muted-foreground">Jami hajm</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-8 w-8 text-emerald-500" />
                          <div>
                            <motion.p
                              className="text-2xl font-bold text-foreground"
                              key={dbStats.connections}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {dbStats.connections}
                            </motion.p>
                            <p className="text-sm text-muted-foreground">Faol ulanishlar</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-8 w-8 text-yellow-500" />
                          <div>
                            <motion.p
                              className="text-2xl font-bold text-foreground"
                              key={dbStats.queries}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {dbStats.queries}
                            </motion.p>
                            <p className="text-sm text-muted-foreground">So'rovlar/soat</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-card border-border">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-8 w-8 text-purple-500" />
                          <div>
                            <p className="text-2xl font-bold text-foreground">{dbStats.uptime}%</p>
                            <p className="text-sm text-muted-foreground">Uptime</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-foreground">Disk foydalanishi</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Ma'lumotlar bazasi disk maydoni
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-foreground">Ishlatilgan joy</span>
                            <span className="text-sm text-muted-foreground">
                              {dbStats.usedSpace} GB / {dbStats.totalSize} GB
                            </span>
                          </div>
                          <Progress value={(dbStats.usedSpace / dbStats.totalSize) * 100} className="h-3" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                              {dbStats.usedSpace} GB
                            </p>
                            <p className="text-xs text-muted-foreground">Ishlatilgan</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {(dbStats.totalSize - dbStats.usedSpace).toFixed(1)} GB
                            </p>
                            <p className="text-xs text-muted-foreground">Bo'sh</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-foreground">Jadvallar statistikasi</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          Eng katta jadvallar va ularning hajmi
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {tableStats.map((table, index) => (
                            <motion.div
                              key={table.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                            >
                              <div>
                                <p className="font-medium text-foreground">{table.name}</p>
                                <p className="text-sm text-muted-foreground">{table.rows} qatorlar</p>
                              </div>
                              <Badge variant="outline" className="border-border text-foreground">
                                {table.size}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="backup" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Backup sozlamalari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Avtomatik backup va saqlash sozlamalari
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-foreground">Avtomatik backup</Label>
                              <p className="text-sm text-muted-foreground">Muntazam backup yaratish</p>
                            </div>
                            <Switch
                              checked={backupSettings.autoBackup}
                              onCheckedChange={(checked) =>
                                setBackupSettings({ ...backupSettings, autoBackup: checked })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="backup-frequency" className="text-foreground">
                              Backup chastotasi
                            </Label>
                            <Select
                              value={backupSettings.backupFrequency}
                              onValueChange={(value) =>
                                setBackupSettings({ ...backupSettings, backupFrequency: value })
                              }
                            >
                              <SelectTrigger className="bg-background border-border text-foreground">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                <SelectItem value="hourly">Soatlik</SelectItem>
                                <SelectItem value="daily">Kunlik</SelectItem>
                                <SelectItem value="weekly">Haftalik</SelectItem>
                                <SelectItem value="monthly">Oylik</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="retention-days" className="text-foreground">
                              Saqlash muddati (kun)
                            </Label>
                            <Input
                              id="retention-days"
                              type="number"
                              value={backupSettings.retentionDays}
                              onChange={(e) =>
                                setBackupSettings({ ...backupSettings, retentionDays: Number.parseInt(e.target.value) })
                              }
                              className="bg-background border-border text-foreground"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-foreground">Siqish</Label>
                              <p className="text-sm text-muted-foreground">Backup fayllarini siqish</p>
                            </div>
                            <Switch
                              checked={backupSettings.compression}
                              onCheckedChange={(checked) =>
                                setBackupSettings({ ...backupSettings, compression: checked })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-foreground">Shifrlash</Label>
                              <p className="text-sm text-muted-foreground">AES-256 shifrlash</p>
                            </div>
                            <Switch
                              checked={backupSettings.encryption}
                              onCheckedChange={(checked) =>
                                setBackupSettings({ ...backupSettings, encryption: checked })
                              }
                            />
                          </div>
                          <div className="flex space-x-2">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                              <Button
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                onClick={handleCreateBackup}
                                disabled={isBackupRunning}
                              >
                                <Download className="h-4 w-4 mr-2" />
                                {isBackupRunning ? "Backup yaratilmoqda..." : "Backup yaratish"}
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button variant="outline" className="border-border text-foreground hover:bg-secondary">
                                <Upload className="h-4 w-4 mr-2" />
                                Tiklash
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Backup tarixi</CardTitle>
                      <CardDescription className="text-muted-foreground">So'nggi backup operatsiyalari</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-muted-foreground">Turi</TableHead>
                            <TableHead className="text-muted-foreground">Hajm</TableHead>
                            <TableHead className="text-muted-foreground">Status</TableHead>
                            <TableHead className="text-muted-foreground">Vaqt</TableHead>
                            <TableHead className="text-muted-foreground">Davomiyligi</TableHead>
                            <TableHead className="text-muted-foreground">Amallar</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {backupHistory.map((backup, index) => (
                            <motion.tr
                              key={backup.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="border-border hover:bg-secondary/50"
                            >
                              <TableCell className="text-foreground font-medium">{backup.type}</TableCell>
                              <TableCell className="text-foreground">{backup.size}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(backup.status)}>
                                  {backup.status === "completed"
                                    ? "Tugallangan"
                                    : backup.status === "failed"
                                      ? "Xato"
                                      : backup.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-foreground">{backup.timestamp}</TableCell>
                              <TableCell className="text-foreground">{backup.duration}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-border text-foreground hover:bg-secondary"
                                    onClick={() => handleDownloadBackup(backup.id)}
                                  >
                                    <Download className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-border text-foreground hover:bg-secondary"
                                    onClick={() => handleRestoreBackup(backup.id)}
                                  >
                                    <RefreshCw className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Real-time metrikalar</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Jonli ma'lumotlar bazasi ko'rsatkichlari
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-secondary/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Activity className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">O'rtacha javob vaqti</p>
                              <motion.p
                                className="text-xl font-bold text-foreground"
                                key={dbStats.avgResponseTime}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                {dbStats.avgResponseTime}ms
                              </motion.p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-secondary/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Zap className="h-5 w-5 text-yellow-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Kesh hit ratio</p>
                              <p className="text-xl font-bold text-foreground">94.2%</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-secondary/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <BarChart3 className="h-5 w-5 text-emerald-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Faol tranzaksiyalar</p>
                              <p className="text-xl font-bold text-foreground">23</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-secondary/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <div>
                              <p className="text-sm text-muted-foreground">Deadlocks</p>
                              <p className="text-xl font-bold text-foreground">0</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Sekin so'rovlar</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        1 soniyadan ko'proq vaqt olgan so'rovlar
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-muted-foreground">So'rov</TableHead>
                            <TableHead className="text-muted-foreground">Davomiyligi</TableHead>
                            <TableHead className="text-muted-foreground">Bajarilishlar</TableHead>
                            <TableHead className="text-muted-foreground">Vaqt</TableHead>
                            <TableHead className="text-muted-foreground">Ma'lumotlar bazasi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {slowQueries.map((query, index) => (
                            <motion.tr
                              key={query.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="border-border hover:bg-secondary/50"
                            >
                              <TableCell className="text-foreground font-mono text-sm max-w-xs">
                                <div className="truncate" title={query.query}>
                                  {query.query}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-red-500/20 text-red-600 border-red-500/30 dark:text-red-400">
                                  {query.duration}s
                                </Badge>
                              </TableCell>
                              <TableCell className="text-foreground">{query.executions}</TableCell>
                              <TableCell className="text-foreground">{query.timestamp}</TableCell>
                              <TableCell className="text-foreground">{query.database}</TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Ma'lumotlar bazasi optimizatsiyasi</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Ishlashni yaxshilash uchun texnik xizmat amaliyotlari
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            className="w-full h-20 flex flex-col border-border text-foreground hover:bg-secondary"
                            onClick={() => handleMaintenanceOperation("VACUUM ANALYZE")}
                            disabled={isMaintenanceRunning}
                          >
                            <RefreshCw className="h-6 w-6 mb-2" />
                            <span className="font-medium">VACUUM ANALYZE</span>
                            <span className="text-xs text-muted-foreground">Jadvallarni optimizatsiya qilish</span>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            className="w-full h-20 flex flex-col border-border text-foreground hover:bg-secondary"
                            onClick={() => handleMaintenanceOperation("REINDEX")}
                            disabled={isMaintenanceRunning}
                          >
                            <Database className="h-6 w-6 mb-2" />
                            <span className="font-medium">REINDEX</span>
                            <span className="text-xs text-muted-foreground">Indekslarni qayta tuzish</span>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            className="w-full h-20 flex flex-col border-border text-foreground hover:bg-secondary"
                            onClick={() => handleMaintenanceOperation("Eski loglarni tozalash")}
                            disabled={isMaintenanceRunning}
                          >
                            <Trash2 className="h-6 w-6 mb-2" />
                            <span className="font-medium">Eski loglarni tozalash</span>
                            <span className="text-xs text-muted-foreground">30 kundan eski loglar</span>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            className="w-full h-20 flex flex-col border-border text-foreground hover:bg-secondary"
                            onClick={() => handleMaintenanceOperation("Statistika yangilash")}
                            disabled={isMaintenanceRunning}
                          >
                            <BarChart3 className="h-6 w-6 mb-2" />
                            <span className="font-medium">Statistika yangilash</span>
                            <span className="text-xs text-muted-foreground">Query planner uchun</span>
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>

                  <Alert className="border-yellow-500/30 bg-yellow-500/10">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <AlertTitle className="text-yellow-600 dark:text-yellow-400">Diqqat</AlertTitle>
                    <AlertDescription className="text-yellow-600/80 dark:text-yellow-400/80">
                      Texnik xizmat amaliyotlari ma'lumotlar bazasi ishlashiga ta'sir qilishi mumkin. Ularni kam yuklama
                      vaqtida bajaring.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              </TabsContent>

              <TabsContent value="logs" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Ma'lumotlar bazasi loglari</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        So'nggi ma'lumotlar bazasi hodisalari va xatolar
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {logs.map((log, index) => (
                          <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/50"
                          >
                            <Badge className={getLogLevelColor(log.level)}>{log.level}</Badge>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground font-mono">{log.message}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                                <span className="text-xs text-muted-foreground">•</span>
                                <span className="text-xs text-muted-foreground">{log.source}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-border text-foreground hover:bg-secondary"
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Yangilash
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-border text-foreground hover:bg-secondary"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Loglarni yuklab olish
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
