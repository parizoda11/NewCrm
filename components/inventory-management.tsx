"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Package, AlertTriangle, TrendingUp, TrendingDown, Search, Plus, Edit, BarChart3 } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  sku: string
  currentStock: number
  minStock: number
  maxStock: number
  price: number
  supplier: string
  lastRestocked: string
  status: "in-stock" | "low-stock" | "out-of-stock"
  trend: "up" | "down" | "stable"
}

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Erkaklar klassik ko'ylagi",
      category: "Erkaklar kiyimi",
      sku: "MCS-001",
      currentStock: 150,
      minStock: 50,
      maxStock: 300,
      price: 45,
      supplier: "Fashion Textile LLC",
      lastRestocked: "2024-01-10",
      status: "in-stock",
      trend: "up",
    },
    {
      id: "2",
      name: "Ayollar yozgi libosi",
      category: "Ayollar kiyimi",
      sku: "WSD-002",
      currentStock: 25,
      minStock: 30,
      maxStock: 200,
      price: 65,
      supplier: "Elegant Designs",
      lastRestocked: "2024-01-08",
      status: "low-stock",
      trend: "down",
    },
    {
      id: "3",
      name: "Bolalar sport kiyimi",
      category: "Bolalar kiyimi",
      sku: "KSW-003",
      currentStock: 0,
      minStock: 20,
      maxStock: 150,
      price: 35,
      supplier: "Kids Fashion Co",
      lastRestocked: "2024-01-05",
      status: "out-of-stock",
      trend: "down",
    },
    {
      id: "4",
      name: "Qishki kurtka",
      category: "Mavsumiy kiyim",
      sku: "WJK-004",
      currentStock: 80,
      minStock: 25,
      maxStock: 120,
      price: 120,
      supplier: "Winter Wear Ltd",
      lastRestocked: "2024-01-12",
      status: "in-stock",
      trend: "stable",
    },
    {
      id: "5",
      name: "Biznes kostyumi",
      category: "Rasmiy kiyim",
      sku: "BST-005",
      currentStock: 45,
      minStock: 15,
      maxStock: 80,
      price: 200,
      supplier: "Business Attire Inc",
      lastRestocked: "2024-01-14",
      status: "in-stock",
      trend: "up",
    },
  ])

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "in-stock":
        return {
          color: "bg-green-100 text-green-800",
          text: "Mavjud",
        }
      case "low-stock":
        return {
          color: "bg-yellow-100 text-yellow-800",
          text: "Kam qolgan",
        }
      case "out-of-stock":
        return {
          color: "bg-red-100 text-red-800",
          text: "Tugagan",
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          text: status,
        }
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100)
  }

  const getInventoryStats = () => {
    const total = products.length
    const inStock = products.filter((p) => p.status === "in-stock").length
    const lowStock = products.filter((p) => p.status === "low-stock").length
    const outOfStock = products.filter((p) => p.status === "out-of-stock").length
    const totalValue = products.reduce((sum, p) => sum + p.currentStock * p.price, 0)

    return { total, inStock, lowStock, outOfStock, totalValue }
  }

  const stats = getInventoryStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ombor boshqaruvi</h2>
          <p className="text-gray-600">Mahsulotlar zaxirasi va inventarizatsiyani boshqaring</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Yangi mahsulot</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Jami mahsulotlar</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
              <p className="text-sm text-gray-600">Mavjud</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
              <p className="text-sm text-gray-600">Kam qolgan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
              <p className="text-sm text-gray-600">Tugagan</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">${stats.totalValue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Jami qiymat</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {stats.lowStock > 0 || stats.outOfStock > 0 ? (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-semibold text-yellow-800">Diqqat talab qiladigan mahsulotlar</p>
                <p className="text-sm text-yellow-700">
                  {stats.lowStock} ta mahsulot kam qolgan, {stats.outOfStock} ta mahsulot tugagan
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Mahsulot nomi, kategoriya, SKU yoki yetkazib beruvchi bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mahsulotlar ro'yxati</CardTitle>
          <CardDescription>Jami {filteredProducts.length} ta mahsulot topildi</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mahsulot</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Kategoriya</TableHead>
                <TableHead>Joriy zaxira</TableHead>
                <TableHead>Zaxira holati</TableHead>
                <TableHead>Narx</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Yetkazib beruvchi</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const statusInfo = getStatusInfo(product.status)
                const stockPercentage = getStockPercentage(product.currentStock, product.maxStock)

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">Oxirgi to'ldirish: {product.lastRestocked}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{product.currentStock}</span>
                          <span className="text-gray-500">/ {product.maxStock}</span>
                        </div>
                        <Progress value={stockPercentage} className="h-2" />
                        <p className="text-xs text-gray-500">Min: {product.minStock}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusInfo.color}>{statusInfo.text}</Badge>
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{getTrendIcon(product.trend)}</TableCell>
                    <TableCell>{product.supplier}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
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
