"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { motion } from "framer-motion"
import { useData } from "@/lib/db-client"

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

export default function DashboardPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  // Fetch dashboard data
  const { data: dashboardData, loading, error } = useData<any>("/api/analytics/dashboard", [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
        <div className="md:ml-64">
          <Header onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />
          <main className="p-4 md:p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-muted-foreground">Ma'lumotlar yuklanmoqda...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
        <div className="md:ml-64">
          <Header onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />
          <main className="p-4 md:p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-red-500">Xatolik: {error}</p>
                <Button onClick={() => window.location.reload()} className="mt-2">
                  Qayta yuklash
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const { stats, recentOrders, topProducts } = dashboardData || {}

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-500/20 text-emerald-600 border-emerald-500/30 dark:text-emerald-400"
      case "shipped":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30 dark:text-blue-400"
      case "processing":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400"
      case "pending":
        return "bg-orange-500/20 text-orange-600 border-orange-500/30 dark:text-orange-400"
      default:
        return "bg-slate-500/20 text-slate-600 border-slate-500/30 dark:text-slate-400"
    }
  }

  const getOrderStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Yetkazildi"
      case "shipped":
        return "Yuborildi"
      case "processing":
        return "Jarayonda"
      case "pending":
        return "Kutilmoqda"
      default:
        return status
    }
  }

  const getOrderStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "shipped":
        return <TrendingUp className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="md:ml-64">
        <Header onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />
        <motion.main
          className="p-4 md:p-6 space-y-4 md:space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <motion.h1
              className="text-2xl md:text-3xl font-bold text-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Boshqaruv paneli
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Biznes ko'rsatkichlaringizni kuzatib boring
            </motion.p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="bg-card border-border hover-lift">
                <CardContent className="p-3 md:p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-6 md:h-8 w-6 md:w-8 text-blue-500" />
                    <div>
                      <p className="text-lg md:text-2xl font-bold text-foreground">{stats?.totalCustomers || 0}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Jami mijozlar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="bg-card border-border hover-lift">
                <CardContent className="p-3 md:p-6">
                  <div className="flex items-center space-x-2">
                    <Package className="h-6 md:h-8 w-6 md:w-8 text-emerald-500" />
                    <div>
                      <p className="text-lg md:text-2xl font-bold text-foreground">{stats?.totalProducts || 0}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Jami mahsulotlar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="bg-card border-border hover-lift">
                <CardContent className="p-3 md:p-6">
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="h-6 md:h-8 w-6 md:w-8 text-purple-500" />
                    <div>
                      <p className="text-lg md:text-2xl font-bold text-foreground">{stats?.totalOrders || 0}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Jami buyurtmalar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="bg-card border-border hover-lift">
                <CardContent className="p-3 md:p-6">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-6 md:h-8 w-6 md:w-8 text-yellow-500" />
                    <div>
                      <p className="text-lg md:text-2xl font-bold text-foreground">
                        ${(stats?.totalRevenue || 0).toLocaleString()}
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">Jami daromad</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Order Status Cards */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <Card className="bg-card border-border hover-lift">
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 md:h-6 w-5 md:w-6 text-orange-500" />
                  <div>
                    <p className="text-lg md:text-xl font-bold text-foreground">{stats?.pendingOrders || 0}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Kutilayotgan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover-lift">
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 md:h-6 w-5 md:w-6 text-yellow-500" />
                  <div>
                    <p className="text-lg md:text-xl font-bold text-foreground">{stats?.processingOrders || 0}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Jarayonda</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover-lift">
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 md:h-6 w-5 md:w-6 text-blue-500" />
                  <div>
                    <p className="text-lg md:text-xl font-bold text-foreground">{stats?.shippedOrders || 0}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Yuborilgan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover-lift">
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 md:h-6 w-5 md:w-6 text-emerald-500" />
                  <div>
                    <p className="text-lg md:text-xl font-bold text-foreground">{stats?.deliveredOrders || 0}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">Yetkazilgan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Recent Orders */}
            <motion.div variants={itemVariants}>
              <Card className="bg-card border-border hover-lift">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg md:text-xl">So'nggi buyurtmalar</CardTitle>
                  <CardDescription className="text-muted-foreground">Eng yangi buyurtmalar ro'yxati</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 md:space-y-4">
                    {recentOrders?.map((order: any, index: number) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-2 md:p-3 rounded-lg bg-secondary/50 hover-scale"
                      >
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <Avatar className="h-8 w-8 md:h-10 md:w-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs md:text-sm">
                              {order.customer_name
                                ?.split(" ")
                                .map((n: string) => n[0])
                                .join("") || "?"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground text-sm md:text-base">{order.customer_name}</p>
                            <p className="text-xs md:text-sm text-muted-foreground">#{order.order_number}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground text-sm md:text-base">${order.total_amount}</p>
                          <Badge className={`${getOrderStatusColor(order.status)} text-xs`}>
                            {getOrderStatusIcon(order.status)}
                            <span className="ml-1 hidden sm:inline">{getOrderStatusText(order.status)}</span>
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary">
                      <Eye className="h-4 w-4 mr-2" />
                      Barcha buyurtmalarni ko'rish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Top Products */}
            <motion.div variants={itemVariants}>
              <Card className="bg-card border-border hover-lift">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg md:text-xl">Eng ko'p sotiladigan mahsulotlar</CardTitle>
                  <CardDescription className="text-muted-foreground">Eng mashhur mahsulotlar ro'yxati</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 md:space-y-4">
                    {topProducts?.map((product: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-2 md:p-3 rounded-lg bg-secondary/50 hover-scale"
                      >
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-base">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-sm md:text-base">{product.name}</p>
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {product.total_sold} dona sotildi
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            {product.total_sold}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary">
                      <Eye className="h-4 w-4 mr-2" />
                      Barcha mahsulotlarni ko'rish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Inventory Alerts */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card border-border hover-lift">
              <CardHeader>
                <CardTitle className="text-foreground text-lg md:text-xl">Inventar ogohlantirishlari</CardTitle>
                <CardDescription className="text-muted-foreground">Kam qolgan va tugagan mahsulotlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 md:p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg hover-scale">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium text-yellow-600 dark:text-yellow-400 text-sm md:text-base">
                          Kam qolgan mahsulotlar
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                          {stats?.lowStockProducts || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 md:p-4 bg-red-500/10 border border-red-500/30 rounded-lg hover-scale">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium text-red-600 dark:text-red-400 text-sm md:text-base">
                          Tugagan mahsulotlar
                        </p>
                        <p className="text-xl md:text-2xl font-bold text-red-600 dark:text-red-400">
                          {stats?.outOfStockProducts || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.main>
      </div>
    </div>
  )
}
