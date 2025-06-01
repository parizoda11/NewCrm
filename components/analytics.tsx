"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, ShoppingCart, Package, Globe, Activity, BarChart3 } from "lucide-react"

export default function Analytics() {
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
      color: "text-green-600",
    },
    {
      title: "Mijozlar soni",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "O'rtacha buyurtma",
      value: "$245",
      change: "+8%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-purple-600",
    },
    {
      title: "Konversiya darajasi",
      value: "3.2%",
      change: "-0.5%",
      trend: "down",
      icon: BarChart3,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Biznes tahlili</h2>
        <p className="text-gray-600">Savdo ko'rsatkichlari va biznes metrikalarini tahlil qiling</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${metric.color}`}>
                  <metric.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Savdo tendensiyasi</span>
            </CardTitle>
            <CardDescription>Oxirgi 6 oylik savdo ko'rsatkichlari</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{data.month}</span>
                      <span className="text-sm text-gray-600">${data.sales.toLocaleString()}</span>
                    </div>
                    <Progress value={(data.sales / 70000) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{data.orders} buyurtma</span>
                      <span>{data.customers} mijoz</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
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
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{product.name}</span>
                      <Badge variant="secondary">{index + 1}</Badge>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{product.sales} dona sotilgan</span>
                      <span>${product.revenue.toLocaleString()} daromad</span>
                    </div>
                    <Progress value={(product.sales / 1300) * 100} className="h-2 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Sales */}
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
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{region.region}</span>
                    <div className="text-right">
                      <span className="text-sm font-semibold">{region.percentage}%</span>
                      <p className="text-xs text-gray-500">${region.sales.toLocaleString()}</p>
                    </div>
                  </div>
                  <Progress value={region.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Tizim ishlashi</span>
            </CardTitle>
            <CardDescription>Bulutli tizim performance ko'rsatkichlari</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Server yuklanishi</span>
                  <span className="text-sm text-gray-600">23%</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Ma'lumotlar bazasi</span>
                  <span className="text-sm text-gray-600">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">API javob vaqti</span>
                  <span className="text-sm text-gray-600">145ms</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Uptime</span>
                  <span className="text-sm text-gray-600">99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">99.9%</p>
                  <p className="text-xs text-gray-500">Mavjudlik</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">145ms</p>
                  <p className="text-xs text-gray-500">O'rtacha javob</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
