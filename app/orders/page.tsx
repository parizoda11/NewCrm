"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Search,
  Eye,
  MapPin,
  Filter,
  Download,
  Plus,
  ShoppingBag,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { motion, AnimatePresence } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Order {
  id: string
  customerName: string
  customerCompany: string
  items: string[]
  totalAmount: number
  status: "pending" | "processing" | "shipped" | "delivered"
  orderDate: string
  estimatedDelivery: string
  trackingNumber: string
  shippingAddress: string
}

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

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Aziz Karimov",
      customerCompany: "Fashion Store LLC",
      items: ["Ko'ylak (50 dona)", "Shim (30 dona)", "Kurtka (20 dona)"],
      totalAmount: 15000,
      status: "shipped",
      orderDate: "2024-01-10",
      estimatedDelivery: "2024-01-18",
      trackingNumber: "TRK123456789",
      shippingAddress: "Toshkent, Chilonzor tumani",
    },
    {
      id: "ORD-002",
      customerName: "Malika Rahimova",
      customerCompany: "Style House",
      items: ["Libos to'plami (100 dona)", "Aksessuarlar (25 dona)"],
      totalAmount: 22000,
      status: "processing",
      orderDate: "2024-01-12",
      estimatedDelivery: "2024-01-20",
      trackingNumber: "TRK987654321",
      shippingAddress: "Samarqand, Registon ko'chasi",
    },
    {
      id: "ORD-003",
      customerName: "Bobur Toshmatov",
      customerCompany: "Trendy Fashion",
      items: ["Yozgi kiyimlar (75 dona)"],
      totalAmount: 8500,
      status: "pending",
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-25",
      trackingNumber: "TRK456789123",
      shippingAddress: "Buxoro, Markaziy ko'cha",
    },
    {
      id: "ORD-004",
      customerName: "Nilufar Saidova",
      customerCompany: "Elegance Boutique",
      items: ["Premium kolleksiya (40 dona)", "Ayollar kiyimi (60 dona)"],
      totalAmount: 35000,
      status: "delivered",
      orderDate: "2024-01-05",
      estimatedDelivery: "2024-01-15",
      trackingNumber: "TRK789123456",
      shippingAddress: "Namangan, Navoi ko'chasi",
    },
  ])

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false)
  const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("")

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsOrderDetailsOpen(true)
  }

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order)
    setNewStatus(order.status)
    setIsStatusUpdateOpen(true)
  }

  const handleSaveStatus = () => {
    if (selectedOrder && newStatus) {
      setOrders(orders.map((order) => (order.id === selectedOrder.id ? { ...order, status: newStatus as any } : order)))
      setIsStatusUpdateOpen(false)
      setSelectedOrder(null)
    }
  }

  const handleExportOrders = () => {
    const csvContent = [
      ["ID", "Mijoz", "Kompaniya", "Summa", "Status", "Sana", "Tracking"],
      ...filteredOrders.map((order) => [
        order.id,
        order.customerName,
        order.customerCompany,
        order.totalAmount.toString(),
        order.status,
        order.orderDate,
        order.trackingNumber,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "buyurtmalar.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400",
          text: "Kutilmoqda",
          icon: Clock,
          progress: 25,
        }
      case "processing":
        return {
          color: "bg-blue-500/20 text-blue-600 border-blue-500/30 dark:text-blue-400",
          text: "Ishlanmoqda",
          icon: Package,
          progress: 50,
        }
      case "shipped":
        return {
          color: "bg-purple-500/20 text-purple-600 border-purple-500/30 dark:text-purple-400",
          text: "Yuborilgan",
          icon: Truck,
          progress: 75,
        }
      case "delivered":
        return {
          color: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30 dark:text-emerald-400",
          text: "Yetkazilgan",
          icon: CheckCircle,
          progress: 100,
        }
      default:
        return {
          color: "bg-slate-500/20 text-slate-600 border-slate-500/30 dark:text-slate-400",
          text: status,
          icon: Clock,
          progress: 0,
        }
    }
  }

  const getOrderStats = () => {
    const total = orders.length
    const pending = orders.filter((o) => o.status === "pending").length
    const processing = orders.filter((o) => o.status === "processing").length
    const shipped = orders.filter((o) => o.status === "shipped").length
    const delivered = orders.filter((o) => o.status === "delivered").length

    return { total, pending, processing, shipped, delivered }
  }

  const stats = getOrderStats()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <motion.main className="p-6 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="flex items-center justify-between" variants={itemVariants}>
            <div>
              <motion.h1
                className="text-3xl font-bold text-foreground flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mr-3">
                  <ShoppingBag className="h-8 w-8 text-purple-500" />
                </div>
                Buyurtmalar
              </motion.h1>
              <motion.p
                className="text-muted-foreground mt-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Barcha buyurtmalar holatini real vaqtda kuzating
              </motion.p>
            </div>
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" onClick={handleExportOrders}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Yangi buyurtma
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-5 gap-4" variants={containerVariants}>
            {[
              { label: "Jami buyurtmalar", value: stats.total, color: "text-foreground" },
              { label: "Kutilmoqda", value: stats.pending, color: "text-yellow-600 dark:text-yellow-400" },
              { label: "Ishlanmoqda", value: stats.processing, color: "text-blue-600 dark:text-blue-400" },
              { label: "Yuborilgan", value: stats.shipped, color: "text-purple-600 dark:text-purple-400" },
              { label: "Yetkazilgan", value: stats.delivered, color: "text-emerald-600 dark:text-emerald-400" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <motion.p
                        className={`text-2xl font-bold ${stat.color}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="relative">
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  </motion.div>
                  <Input
                    placeholder="Buyurtma ID, mijoz nomi yoki tracking raqami bo'yicha qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Buyurtmalar ro'yxati
                </CardTitle>
                <CardDescription>Jami {filteredOrders.length} ta buyurtma topildi</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Buyurtma ID</TableHead>
                      <TableHead>Mijoz</TableHead>
                      <TableHead>Mahsulotlar</TableHead>
                      <TableHead>Summa</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Tracking</TableHead>
                      <TableHead>Yetkazish</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredOrders.map((order, index) => {
                        const statusInfo = getStatusInfo(order.status)
                        const StatusIcon = statusInfo.icon

                        return (
                          <motion.tr
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            whileHover={{
                              backgroundColor: "rgba(var(--secondary), 0.5)",
                              transition: { duration: 0.2 },
                            }}
                            className="cursor-pointer"
                          >
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{order.customerName}</p>
                                <p className="text-sm text-muted-foreground">{order.customerCompany}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-xs">
                                {order.items.slice(0, 2).map((item, index) => (
                                  <p key={index} className="text-sm">
                                    {item}
                                  </p>
                                ))}
                                {order.items.length > 2 && (
                                  <p className="text-sm text-muted-foreground">+{order.items.length - 2} boshqa</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>${order.totalAmount.toLocaleString()}</TableCell>
                            <TableCell>
                              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <Badge className={statusInfo.color}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {statusInfo.text}
                                </Badge>
                              </motion.div>
                            </TableCell>
                            <TableCell>
                              <div className="w-20">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 1, delay: index * 0.1 }}
                                >
                                  <Progress value={statusInfo.progress} className="h-2" />
                                </motion.div>
                                <p className="text-xs text-muted-foreground mt-1">{statusInfo.progress}%</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p className="font-mono">{order.trackingNumber}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <motion.div className="flex items-center space-x-1 mb-1" whileHover={{ x: 3 }}>
                                  <MapPin className="h-3 w-3" />
                                  <span>{order.shippingAddress}</span>
                                </motion.div>
                                <p className="text-muted-foreground">Yetkazish: {order.estimatedDelivery}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </TableCell>
                          </motion.tr>
                        )
                      })}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </motion.main>
        {/* Order Details Dialog */}
        <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-500" />
                <span>Buyurtma tafsilotlari - {selectedOrder?.id}</span>
              </DialogTitle>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Mijoz ma'lumotlari</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-muted-foreground">Mijoz nomi</Label>
                        <p className="font-medium">{selectedOrder.customerName}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Kompaniya</Label>
                        <p className="font-medium">{selectedOrder.customerCompany}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Yetkazib berish manzili</Label>
                        <p className="font-medium">{selectedOrder.shippingAddress}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Buyurtma ma'lumotlari</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-muted-foreground">Buyurtma sanasi</Label>
                        <p className="font-medium">{selectedOrder.orderDate}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Yetkazib berish sanasi</Label>
                        <p className="font-medium">{selectedOrder.estimatedDelivery}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Tracking raqami</Label>
                        <p className="font-medium font-mono">{selectedOrder.trackingNumber}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Status</Label>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusInfo(selectedOrder.status).color}>
                            {getStatusInfo(selectedOrder.status).text}
                          </Badge>
                          <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(selectedOrder)}>
                            O'zgartirish
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Buyurtma mahsulotlari</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                          <span>{item}</span>
                          <Badge variant="outline">Mahsulot</Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Jami summa:</span>
                        <span>${selectedOrder.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Status Update Dialog */}
        <Dialog open={isStatusUpdateOpen} onOpenChange={setIsStatusUpdateOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Buyurtma statusini o'zgartirish</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Yangi status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Kutilmoqda</SelectItem>
                    <SelectItem value="processing">Ishlanmoqda</SelectItem>
                    <SelectItem value="shipped">Yuborilgan</SelectItem>
                    <SelectItem value="delivered">Yetkazilgan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setIsStatusUpdateOpen(false)} className="flex-1">
                  Bekor qilish
                </Button>
                <Button onClick={handleSaveStatus} className="flex-1">
                  Saqlash
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
