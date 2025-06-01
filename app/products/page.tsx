"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  Plus,
  Edit,
  BarChart3,
  Filter,
  Download,
  Box,
  Star,
  Upload,
  X,
  Save,
  Trash2,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { motion, AnimatePresence } from "framer-motion"
import { dbClient } from "@/lib/db-client"
import { useTheme } from "next-themes"

interface Product {
  id: string
  name: string
  category_name: string
  supplier_name: string
  sku: string
  current_stock: number
  min_stock: number
  max_stock: number
  price: number
  status: "in-stock" | "low-stock" | "out-of-stock"
  trend: "up" | "down" | "stable"
  image: string
  rating: number
  description?: string
}

interface Category {
  id: number
  name: string
}

interface Supplier {
  id: number
  name: string
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

const productImages = ["👔", "👗", "👕", "🧥", "🤵", "👖", "👚", "🧦", "👒", "👜"]

export default function ProductsPage() {
  const { theme, setTheme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [loading, setLoading] = useState(true)

  const [newProduct, setNewProduct] = useState({
    name: "",
    category_id: "",
    sku: "",
    description: "",
    price: "",
    current_stock: "",
    min_stock: "",
    max_stock: "",
    supplier_id: "",
    image: "📦",
  })

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [productsData, categoriesData, suppliersData] = await Promise.all([
        dbClient.products.getAll(),
        dbClient.categories.getAll(),
        dbClient.suppliers.getAll(),
      ])

      setProducts(productsData)
      setCategories(categoriesData)
      setSuppliers(suppliersData)
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    if (!editingProduct) return

    if (!editingProduct.name || editingProduct.price <= 0) {
      alert("Iltimos, majburiy maydonlarni to'g'ri to'ldiring")
      return
    }

    try {
      // Recalculate status based on current stock
      const currentStock = editingProduct.current_stock
      const minStock = editingProduct.min_stock

      let status: "in-stock" | "low-stock" | "out-of-stock" = "in-stock"
      if (currentStock === 0) {
        status = "out-of-stock"
      } else if (currentStock <= minStock) {
        status = "low-stock"
      }

      await dbClient.products.update(editingProduct.id, {
        name: editingProduct.name,
        sku: editingProduct.sku,
        description: editingProduct.description,
        price: editingProduct.price,
        current_stock: editingProduct.current_stock,
        min_stock: editingProduct.min_stock,
        max_stock: editingProduct.max_stock,
        image: editingProduct.image,
        status: status,
      })

      await loadData()
      setIsEditDialogOpen(false)
      setEditingProduct(null)
      console.log("Mahsulot muvaffaqiyatli yangilandi")
    } catch (error) {
      console.error("Failed to update product:", error)
      alert("Mahsulotni yangilashda xatolik yuz berdi")
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Haqiqatan ham bu mahsulotni o'chirmoqchimisiz?")) {
      try {
        await dbClient.products.delete(productId)
        await loadData()
        // Show success notification
        console.log("Mahsulot muvaffaqiyatli o'chirildi")
      } catch (error) {
        console.error("Failed to delete product:", error)
        alert("Mahsulotni o'chirishda xatolik yuz berdi")
      }
    }
  }

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return

    if (confirm(`Haqiqatan ham ${selectedProducts.length} ta mahsulotni o'chirmoqchimisiz?`)) {
      try {
        await Promise.all(selectedProducts.map((id) => dbClient.products.delete(id)))
        await loadData()
        setSelectedProducts([])
        console.log("Mahsulotlar muvaffaqiyatli o'chirildi")
      } catch (error) {
        console.error("Failed to delete products:", error)
        alert("Mahsulotlarni o'chirishda xatolik yuz berdi")
      }
    }
  }

  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleSelectAll = () => {
    setSelectedProducts(selectedProducts.length === filteredProducts.length ? [] : filteredProducts.map((p) => p.id))
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const generateSKU = (categoryName: string, name: string) => {
    const categoryCode = categoryName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
    const nameCode = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .substring(0, 3)
    const randomNum = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
    return `${categoryCode}${nameCode}-${randomNum}`
  }

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.category_id || !newProduct.price) {
      alert("Iltimos, majburiy maydonlarni to'ldiring (Nom, Kategoriya, Narx)")
      return
    }

    if (Number.parseFloat(newProduct.price) <= 0) {
      alert("Narx 0 dan katta bo'lishi kerak")
      return
    }

    try {
      const categoryName = categories.find((c) => c.id.toString() === newProduct.category_id)?.name || ""
      const sku = newProduct.sku || generateSKU(categoryName, newProduct.name)

      const currentStock = Number.parseInt(newProduct.current_stock) || 0
      const minStock = Number.parseInt(newProduct.min_stock) || 0

      let status: "in-stock" | "low-stock" | "out-of-stock" = "in-stock"
      if (currentStock === 0) {
        status = "out-of-stock"
      } else if (currentStock <= minStock) {
        status = "low-stock"
      }

      await dbClient.products.create({
        name: newProduct.name,
        category_id: Number.parseInt(newProduct.category_id),
        supplier_id: Number.parseInt(newProduct.supplier_id) || null,
        sku,
        description: newProduct.description,
        price: Number.parseFloat(newProduct.price),
        current_stock: currentStock,
        min_stock: minStock,
        max_stock: Number.parseInt(newProduct.max_stock) || 100,
        status,
        image: newProduct.image,
        rating: 0,
      })

      await loadData()
      setNewProduct({
        name: "",
        category_id: "",
        sku: "",
        description: "",
        price: "",
        current_stock: "",
        min_stock: "",
        max_stock: "",
        supplier_id: "",
        image: "📦",
      })
      setIsAddDialogOpen(false)
      console.log("Mahsulot muvaffaqiyatli qo'shildi")
    } catch (error) {
      console.error("Failed to add product:", error)
      alert("Mahsulotni qo'shishda xatolik yuz berdi")
    }
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "in-stock":
        return {
          color: "bg-emerald-500/20 text-emerald-600 border-emerald-500/30 dark:text-emerald-400",
          text: "Mavjud",
        }
      case "low-stock":
        return {
          color: "bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400",
          text: "Kam qolgan",
        }
      case "out-of-stock":
        return {
          color: "bg-red-500/20 text-red-600 border-red-500/30 dark:text-red-400",
          text: "Tugagan",
        }
      default:
        return {
          color: "bg-slate-500/20 text-slate-600 border-slate-500/30 dark:text-slate-400",
          text: status,
        }
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500 dark:text-red-400" />
      default:
        return <BarChart3 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
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
    const totalValue = products.reduce((sum, p) => sum + p.current_stock * p.price, 0)

    return { total, inStock, lowStock, outOfStock, totalValue }
  }

  const stats = getInventoryStats()

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: i * 0.1 }}
      >
        <Star
          className={`h-3 w-3 ${i < rating ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400" : "text-gray-400 dark:text-gray-500"}`}
        />
      </motion.div>
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="ml-64 lg:ml-64 md:ml-0">
          <Header />
          <div className="p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-muted-foreground">Ma'lumotlar yuklanmoqda...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Sidebar />
      <div className="ml-64 lg:ml-64 md:ml-0">
        <Header />
        <motion.main className="p-4 md:p-6 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            variants={itemVariants}
          >
            <div>
              <motion.h1
                className="text-2xl md:text-3xl font-bold text-foreground flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="mr-3">
                  <Box className="h-6 w-6 md:h-8 md:w-8 text-emerald-500" />
                </div>
                Mahsulotlar
              </motion.h1>
              <motion.p
                className="text-muted-foreground mt-1 text-sm md:text-base"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Mahsulotlar zaxirasi va inventarizatsiyani boshqaring
              </motion.p>
            </div>
            <motion.div
              className="flex flex-wrap items-center gap-2 md:gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Yangi mahsulot</span>
                  <span className="sm:hidden">Yangi</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4"
            variants={containerVariants}
          >
            {[
              {
                label: "Jami mahsulotlar",
                value: stats.total,
                icon: Package,
                color: "text-blue-500 dark:text-blue-400",
              },
              { label: "Mavjud", value: stats.inStock, icon: Package, color: "text-emerald-500 dark:text-emerald-400" },
              {
                label: "Kam qolgan",
                value: stats.lowStock,
                icon: AlertTriangle,
                color: "text-yellow-500 dark:text-yellow-400",
              },
              {
                label: "Tugagan",
                value: stats.outOfStock,
                icon: AlertTriangle,
                color: "text-red-500 dark:text-red-400",
              },
              {
                label: "Jami qiymat",
                value: `$${stats.totalValue.toLocaleString()}`,
                icon: BarChart3,
                color: "text-purple-500 dark:text-purple-400",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="bg-card border-border backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-3 md:p-4">
                    <div className="flex items-center space-x-2">
                      <stat.icon className={`h-6 w-6 md:h-8 md:w-8 ${stat.color}`} />
                      <div className="min-w-0 flex-1">
                        <motion.p
                          className={`text-lg md:text-2xl font-bold ${stat.color} truncate`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          {stat.value}
                        </motion.p>
                        <p className="text-xs md:text-sm text-muted-foreground truncate">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {stats.lowStock > 0 || stats.outOfStock > 0 ? (
            <motion.div variants={itemVariants}>
              <Card className="bg-yellow-500/10 border-yellow-500/30 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-yellow-600 dark:text-yellow-400">
                        Diqqat talab qiladigan mahsulotlar
                      </p>
                      <p className="text-sm text-yellow-600/80 dark:text-yellow-300">
                        {stats.lowStock} ta mahsulot kam qolgan, {stats.outOfStock} ta mahsulot tugagan
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}

          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="relative">
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  </motion.div>
                  <Input
                    placeholder="Mahsulot nomi, kategoriya, SKU yoki yetkazib beruvchi bo'yicha qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-border text-foreground placeholder-muted-foreground"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {selectedProducts.length > 0 && (
            <Card className="bg-blue-500/10 border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {selectedProducts.length} ta mahsulot tanlandi
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProducts([])}
                      className="border-border text-foreground hover:bg-secondary"
                    >
                      Bekor qilish
                    </Button>
                    <Button size="sm" onClick={handleBulkDelete} className="bg-red-500 hover:bg-red-600 text-white">
                      O'chirish
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">Mahsulotlar ro'yxati</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Jami {filteredProducts.length} ta mahsulot topildi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border">
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                            onChange={handleSelectAll}
                            className="rounded border-border"
                          />
                        </TableHead>
                        <TableHead className="text-muted-foreground min-w-[200px]">Mahsulot</TableHead>
                        <TableHead className="text-muted-foreground min-w-[120px]">SKU</TableHead>
                        <TableHead className="text-muted-foreground min-w-[120px]">Kategoriya</TableHead>
                        <TableHead className="text-muted-foreground min-w-[150px]">Joriy zaxira</TableHead>
                        <TableHead className="text-muted-foreground min-w-[120px]">Zaxira holati</TableHead>
                        <TableHead className="text-muted-foreground min-w-[100px]">Narx</TableHead>
                        <TableHead className="text-muted-foreground min-w-[120px]">Reyting</TableHead>
                        <TableHead className="text-muted-foreground min-w-[80px]">Trend</TableHead>
                        <TableHead className="text-muted-foreground min-w-[150px]">Yetkazib beruvchi</TableHead>
                        <TableHead className="text-muted-foreground min-w-[120px]">Amallar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {filteredProducts.map((product, index) => {
                          const statusInfo = getStatusInfo(product.status)
                          const stockPercentage = getStockPercentage(product.current_stock, product.max_stock)

                          return (
                            <motion.tr
                              key={product.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="border-border cursor-pointer hover:bg-secondary/50 transition-colors"
                            >
                              <TableCell>
                                <input
                                  type="checkbox"
                                  checked={selectedProducts.includes(product.id)}
                                  onChange={() => handleSelectProduct(product.id)}
                                  className="rounded border-border"
                                />
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <motion.div
                                    className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-2xl"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {product.image}
                                  </motion.div>
                                  <div className="min-w-0 flex-1">
                                    <p className="font-medium text-foreground truncate">{product.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">
                                      Oxirgi to'ldirish: {product.last_restocked || "N/A"}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="font-mono text-sm text-foreground">{product.sku}</TableCell>
                              <TableCell className="text-foreground">{product.category_name}</TableCell>
                              <TableCell>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm text-foreground">
                                    <span>{product.current_stock}</span>
                                    <span className="text-muted-foreground">/ {product.max_stock}</span>
                                  </div>
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                  >
                                    <Progress value={stockPercentage} className="h-2 bg-secondary" />
                                  </motion.div>
                                  <p className="text-xs text-muted-foreground">Min: {product.min_stock}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                  <Badge className={statusInfo.color}>{statusInfo.text}</Badge>
                                </motion.div>
                              </TableCell>
                              <TableCell className="text-foreground">${product.price}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-1">{renderStars(product.rating)}</div>
                              </TableCell>
                              <TableCell>
                                <motion.div
                                  animate={{
                                    y: product.trend === "up" ? [0, -2, 0] : product.trend === "down" ? [0, 2, 0] : 0,
                                    rotate:
                                      product.trend === "up" ? [0, 5, 0] : product.trend === "down" ? [0, -5, 0] : 0,
                                  }}
                                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                                >
                                  {getTrendIcon(product.trend)}
                                </motion.div>
                              </TableCell>
                              <TableCell className="text-foreground">{product.supplier_name}</TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditProduct(product)}
                                      className="text-muted-foreground hover:text-foreground hover:bg-secondary"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </motion.div>
                                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeleteProduct(product.id)}
                                      className="text-red-500 hover:text-red-400 hover:bg-red-500/20"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </motion.div>
                                </div>
                              </TableCell>
                            </motion.tr>
                          )
                        })}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.main>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-foreground">
              <Plus className="h-5 w-5 text-emerald-500" />
              <span>Yangi mahsulot qo'shish</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Yangi mahsulot ma'lumotlarini kiriting
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">
                  Mahsulot nomi *
                </Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Mahsulot nomini kiriting"
                  className="mt-1 bg-background border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="category" className="text-foreground">
                  Kategoriya *
                </Label>
                <Select
                  value={newProduct.category_id}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category_id: value })}
                >
                  <SelectTrigger className="mt-1 bg-background border-border text-foreground">
                    <SelectValue placeholder="Kategoriyani tanlang" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sku" className="text-foreground">
                  SKU
                </Label>
                <Input
                  id="sku"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  placeholder="Avtomatik yaratiladi"
                  className="mt-1 bg-background border-border text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">Bo'sh qoldiring, avtomatik yaratiladi</p>
              </div>

              <div>
                <Label htmlFor="description" className="text-foreground">
                  Tavsif
                </Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Mahsulot tavsifini kiriting"
                  className="mt-1 bg-background border-border text-foreground"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="supplier" className="text-foreground">
                  Yetkazib beruvchi
                </Label>
                <Select
                  value={newProduct.supplier_id}
                  onValueChange={(value) => setNewProduct({ ...newProduct, supplier_id: value })}
                >
                  <SelectTrigger className="mt-1 bg-background border-border text-foreground">
                    <SelectValue placeholder="Yetkazib beruvchini tanlang" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier.id} value={supplier.id.toString()}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="price" className="text-foreground">
                  Narx ($) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="0.00"
                  className="mt-1 bg-background border-border text-foreground"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <Label htmlFor="currentStock" className="text-foreground">
                  Joriy zaxira
                </Label>
                <Input
                  id="currentStock"
                  type="number"
                  value={newProduct.current_stock}
                  onChange={(e) => setNewProduct({ ...newProduct, current_stock: e.target.value })}
                  placeholder="0"
                  className="mt-1 bg-background border-border text-foreground"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="minStock" className="text-foreground">
                  Minimal zaxira
                </Label>
                <Input
                  id="minStock"
                  type="number"
                  value={newProduct.min_stock}
                  onChange={(e) => setNewProduct({ ...newProduct, min_stock: e.target.value })}
                  placeholder="0"
                  className="mt-1 bg-background border-border text-foreground"
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="maxStock" className="text-foreground">
                  Maksimal zaxira
                </Label>
                <Input
                  id="maxStock"
                  type="number"
                  value={newProduct.max_stock}
                  onChange={(e) => setNewProduct({ ...newProduct, max_stock: e.target.value })}
                  placeholder="100"
                  className="mt-1 bg-background border-border text-foreground"
                  min="0"
                />
              </div>

              <div>
                <Label className="text-foreground">Mahsulot rasmi</Label>
                <div className="mt-2">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-2xl">
                      {newProduct.image}
                    </div>
                    <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary">
                      <Upload className="h-4 w-4 mr-2" />
                      Rasm yuklash
                    </Button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {productImages.map((emoji, index) => (
                      <motion.button
                        key={index}
                        type="button"
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl border-2 transition-colors ${
                          newProduct.image === emoji
                            ? "border-emerald-500 bg-emerald-500/20"
                            : "border-border bg-secondary hover:border-emerald-300"
                        }`}
                        onClick={() => setNewProduct({ ...newProduct, image: emoji })}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
              className="border-border text-foreground hover:bg-secondary"
            >
              <X className="h-4 w-4 mr-2" />
              Bekor qilish
            </Button>
            <Button
              onClick={handleAddProduct}
              disabled={!newProduct.name || !newProduct.category_id || !newProduct.price}
              className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Mahsulot qo'shish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-foreground">
              <Edit className="h-5 w-5 text-blue-500" />
              <span>Mahsulotni tahrirlash</span>
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Mahsulot ma'lumotlarini o'zgartiring
            </DialogDescription>
          </DialogHeader>

          {editingProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-name" className="text-foreground">
                    Mahsulot nomi *
                  </Label>
                  <Input
                    id="edit-name"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="mt-1 bg-background border-border text-foreground"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-sku" className="text-foreground">
                    SKU
                  </Label>
                  <Input
                    id="edit-sku"
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="mt-1 bg-background border-border text-foreground"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-description" className="text-foreground">
                    Tavsif
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={editingProduct.description || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="mt-1 bg-background border-border text-foreground"
                    rows={3}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-price" className="text-foreground">
                    Narx ($) *
                  </Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number.parseFloat(e.target.value) })}
                    className="mt-1 bg-background border-border text-foreground"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-currentStock" className="text-foreground">
                    Joriy zaxira
                  </Label>
                  <Input
                    id="edit-currentStock"
                    type="number"
                    value={editingProduct.current_stock}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, current_stock: Number.parseInt(e.target.value) })
                    }
                    className="mt-1 bg-background border-border text-foreground"
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-minStock" className="text-foreground">
                    Minimal zaxira
                  </Label>
                  <Input
                    id="edit-minStock"
                    type="number"
                    value={editingProduct.min_stock}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, min_stock: Number.parseInt(e.target.value) })
                    }
                    className="mt-1 bg-background border-border text-foreground"
                    min="0"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-maxStock" className="text-foreground">
                    Maksimal zaxira
                  </Label>
                  <Input
                    id="edit-maxStock"
                    type="number"
                    value={editingProduct.max_stock}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, max_stock: Number.parseInt(e.target.value) })
                    }
                    className="mt-1 bg-background border-border text-foreground"
                    min="0"
                  />
                </div>

                <div>
                  <Label className="text-foreground">Mahsulot rasmi</Label>
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-2xl">
                        {editingProduct.image}
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {productImages.map((emoji, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl border-2 transition-colors ${
                            editingProduct.image === emoji
                              ? "border-emerald-500 bg-emerald-500/20"
                              : "border-border bg-secondary hover:border-emerald-300"
                          }`}
                          onClick={() => setEditingProduct({ ...editingProduct, image: emoji })}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-border text-foreground hover:bg-secondary"
            >
              Bekor qilish
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-gradient-to-r from-blue-500 to-emerald-600 hover:from-blue-600 hover:to-emerald-700 text-white"
            >
              O'zgarishlarni saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
