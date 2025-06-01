"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Package,
  Globe,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { motion, AnimatePresence } from "framer-motion"

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

export default function AnalyticsPage() {
  const salesData = [
    { month: "Yanvar", sales: 45000, orders: 234, customers: 89 },
    { month: "Fevral", sales: 52000, orders: 267, customers: 95 },
    { month: "Mart", sales: 48000, orders: 245, customers: 87 },
    { month: "Aprel", sales: 61000, orders: 298, customers: 112 },
    { month: "May", sales: 55000, orders: 276, customers: 98 },
    { month: "Iyun", sales: 67000, orders: 324, customers: 125 },
  ]

  const topProducts = [
    { name: "Erkaklar klassik ko'ylagi", sales: 1250, revenue: 56250 },
    { name: "Ayollar yozgi libosi", sales: 980, revenue: 63700 },
    { name: "Biznes kostyumi", sales: 450, revenue: 90000 },
    { name: "Qishki kurtka", sales: 320, revenue: 38400 },
    { name: "Bolalar sport kiyimi", sales: 890, revenue: 31150 },
  ]

  const regionData = [
    { region: "Toshkent", percentage: 45, sales: 125000 },
    { region: "Samarqand", percentage: 20, sales: 55000 },
    { region: "Buxoro", percentage: 15, sales: 41250 },
    { region: "Namangan", percentage: 12, sales: 33000 },
    { region: "Boshqalar", percentage: 8, sales: 22000 },
  ]

  const performanceMetrics = [
    {
      title: "Oylik o'sish",
      value: "+15.2%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Mijozlar soni",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "O'rtacha buyurtma",
      value: "$245",
      change: "+8%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Konversiya darajasi",
      value: "3.2%",
      change: "-0.5%",
      trend: "down",
      icon: BarChart3,
      color: "text-orange-600 dark:text-orange-400",
    },
  ]

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
                <PieChart className="h-8 w-8 text-orange-500" />
              </div>
              Biznes tahlili
            </motion.h1>
            <motion.p
              className="text-muted-foreground mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Savdo ko'rsatkichlari va biznes metrikalarini tahlil qiling
            </motion.p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants}>
            {performanceMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="hover:shadow-lg transition-shadow overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r opacity-5"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2, delay: index * 0.2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                  />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                        <motion.p
                          className="text-2xl font-bold text-foreground"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          {metric.value}
                        </motion.p>
                        <div className="flex items-center space-x-1 mt-1">
                          <motion.div
                            animate={{
                              y: metric.trend === "up" ? [0, -2, 0] : [0, 2, 0],
                              rotate: metric.trend === "up" ? [0, 5, 0] : [0, -5, 0],
                            }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            {metric.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
                            )}
                          </motion.div>
                          <span
                            className={`text-sm ${metric.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
                          >
                            {metric.change}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        className={`p-3 rounded-full bg-muted ${metric.color}`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        animate={{
                          boxShadow: [
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <metric.icon className="h-6 w-6" />
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="h-5 w-5" />
                    <span>Savdo tendensiyasi</span>
                  </CardTitle>
                  <CardDescription>Oxirgi 6 oylik savdo ko'rsatkichlari</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {salesData.map((data, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{data.month}</span>
                            <span className="text-sm text-muted-foreground">${data.sales.toLocaleString()}</span>
                          </div>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                          >
                            <Progress value={(data.sales / 70000) * 100} className="h-2" />
                          </motion.div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>{data.orders} buyurtma</span>
                            <span>{data.customers} mijoz</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Eng ko'p sotiladigan mahsulotlar</span>
                  </CardTitle>
                  <CardDescription>Ushbu oyning eng yaxshi mahsulotlari</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <AnimatePresence>
                      {topProducts.map((product, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center justify-between"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                        >
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">{product.name}</span>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                              >
                                <Badge variant="secondary">{index + 1}</Badge>
                              </motion.div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{product.sales} dona sotilgan</span>
                              <span>${product.revenue.toLocaleString()} daromad</span>
                            </div>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                            >
                              <Progress value={(product.sales / 1300) * 100} className="h-2 mt-2" />
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Hududiy savdo</span>
                  </CardTitle>
                  <CardDescription>Hududlar bo'yicha savdo taqsimoti</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {regionData.map((region, index) => (
                      <motion.div
                        key={index}
                        className="space-y-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{region.region}</span>
                          <div className="text-right">
                            <span className="text-sm font-semibold">{region.percentage}%</span>
                            <p className="text-xs text-muted-foreground">${region.sales.toLocaleString()}</p>
                          </div>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                        >
                          <Progress value={region.percentage} className="h-2" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Tizim ishlashi</span>
                  </CardTitle>
                  <CardDescription>Performance ko'rsatkichlari</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { name: "Server yuklanishi", value: 23, color: "bg-blue-500" },
                      { name: "Ma'lumotlar bazasi", value: 67, color: "bg-emerald-500" },
                      { name: "API javob vaqti", value: 85, color: "bg-orange-500" },
                      { name: "Uptime", value: 99, color: "bg-purple-500" },
                    ].map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{metric.name}</span>
                          <span className="text-sm text-muted-foreground">{metric.value}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`h-2 rounded-full ${metric.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{
                              duration: 1.5,
                              delay: index * 0.2 + 0.5,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <motion.div
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                      >
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">99.9%</p>
                        <p className="text-xs text-muted-foreground">Mavjudlik</p>
                      </motion.div>
                      <motion.div
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                      >
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">145ms</p>
                        <p className="text-xs text-muted-foreground">O'rtacha javob</p>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.main>
      </div>
    </div>
  )
}
