"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Package, Truck, CheckCircle, Clock, Search, Eye, MapPin } from "lucide-react"

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

export default function OrderTracking() {
  const [searchTerm, setSearchTerm] = useState("")
  const [orders] = useState<Order[]>([
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
          color: "bg-yellow-100 text-yellow-800",
          text: "Kutilmoqda",
          icon: Clock,
          progress: 25,
        }
      case "processing":
        return {
          color: "bg-blue-100 text-blue-800",
          text: "Ishlanmoqda",
          icon: Package,
          progress: 50,
        }
      case "shipped":
        return {
          color: "bg-purple-100 text-purple-800",
          text: "Yuborilgan",
          icon: Truck,
          progress: 75,
        }
      case "delivered":
        return {
          color: "bg-green-100 text-green-800",
          text: "Yetkazilgan",
          icon: CheckCircle,
          progress: 100,
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800",
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Buyurtmalarni kuzatish</h2>
        <p className="text-gray-600">Barcha buyurtmalar holatini real vaqtda kuzating</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Jami buyurtmalar</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-gray-600">Kutilmoqda</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
              <p className="text-sm text-gray-600">Ishlanmoqda</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
              <p className="text-sm text-gray-600">Yuborilgan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
              <p className="text-sm text-gray-600">Yetkazilgan</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buyurtma ID, mijoz nomi yoki tracking raqami bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Buyurtmalar ro'yxati</CardTitle>
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
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status)
                const StatusIcon = statusInfo.icon

                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerCompany}</p>
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
                          <p className="text-sm text-gray-500">+{order.items.length - 2} boshqa</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>${order.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusInfo.text}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-20">
                        <Progress value={statusInfo.progress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">{statusInfo.progress}%</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-mono">{order.trackingNumber}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center space-x-1 mb-1">
                          <MapPin className="h-3 w-3" />
                          <span>{order.shippingAddress}</span>
                        </div>
                        <p className="text-gray-500">Yetkazish: {order.estimatedDelivery}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
