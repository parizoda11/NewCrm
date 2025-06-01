"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Wifi,
  Server,
  Globe,
  Shield,
  Zap,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Cloud,
  CheckCircle,
} from "lucide-react"

interface NetworkMetric {
  name: string
  value: number
  unit: string
  status: "good" | "warning" | "critical"
  trend: "up" | "down" | "stable"
}

interface ServerNode {
  id: string
  name: string
  location: string
  status: "online" | "offline" | "maintenance"
  cpu: number
  memory: number
  storage: number
  connections: number
}

export default function NetworkMonitoring() {
  const [realTimeMetrics, setRealTimeMetrics] = useState<NetworkMetric[]>([
    { name: "Latency", value: 15, unit: "ms", status: "good", trend: "stable" },
    { name: "Throughput", value: 850, unit: "Mbps", status: "good", trend: "up" },
    { name: "Packet Loss", value: 0.1, unit: "%", status: "good", trend: "down" },
    { name: "Jitter", value: 2.3, unit: "ms", status: "good", trend: "stable" },
  ])

  const [serverNodes] = useState<ServerNode[]>([
    {
      id: "node-1",
      name: "Toshkent Data Center",
      location: "Toshkent, O'zbekiston",
      status: "online",
      cpu: 45,
      memory: 67,
      storage: 34,
      connections: 1250,
    },
    {
      id: "node-2",
      name: "Frankfurt Edge Server",
      location: "Frankfurt, Germaniya",
      status: "online",
      cpu: 23,
      memory: 45,
      storage: 56,
      connections: 890,
    },
    {
      id: "node-3",
      name: "Singapore CDN",
      location: "Singapur",
      status: "online",
      cpu: 78,
      memory: 82,
      storage: 23,
      connections: 2100,
    },
    {
      id: "node-4",
      name: "Backup Server",
      location: "Samarqand, O'zbekiston",
      status: "maintenance",
      cpu: 0,
      memory: 0,
      storage: 89,
      connections: 0,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * (metric.value * 0.1),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
      case "online":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
      case "offline":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "good":
        return "Yaxshi"
      case "warning":
        return "Ogohlantirish"
      case "critical":
        return "Kritik"
      case "online":
        return "Faol"
      case "offline":
        return "O'chiq"
      case "maintenance":
        return "Texnik xizmat"
      default:
        return status
    }
  }

  const networkArchitecture = [
    {
      layer: "Foydalanuvchi qatlami",
      description: "Web brauzerlar, mobil ilovalar",
      technology: "HTTPS, WebSocket",
      status: "active",
    },
    {
      layer: "CDN qatlami",
      description: "Global kontent yetkazib berish tarmog'i",
      technology: "CloudFlare, AWS CloudFront",
      status: "active",
    },
    {
      layer: "Load Balancer",
      description: "Yukni taqsimlash va failover",
      technology: "NGINX, HAProxy",
      status: "active",
    },
    {
      layer: "API Gateway",
      description: "API so'rovlarini boshqarish va autentifikatsiya",
      technology: "Kong, AWS API Gateway",
      status: "active",
    },
    {
      layer: "Mikroservislar",
      description: "Biznes logika va ma'lumotlarni qayta ishlash",
      technology: "Node.js, Docker, Kubernetes",
      status: "active",
    },
    {
      layer: "Ma'lumotlar bazasi",
      description: "Ma'lumotlarni saqlash va boshqarish",
      technology: "PostgreSQL, Redis, MongoDB",
      status: "active",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Tarmoq monitoring</h2>
        <p className="text-gray-600">Bulutli infratuzilma va tarmoq ishlashini real vaqtda kuzating</p>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {realTimeMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.value.toFixed(1)} {metric.unit}
                  </p>
                  <Badge className={getStatusColor(metric.status)}>{getStatusText(metric.status)}</Badge>
                </div>
                <div className="p-3 rounded-full bg-gray-100">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Network Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-5 w-5" />
            <span>Tarmoq arxitekturasi (OSI va TCP/IP modellari)</span>
          </CardTitle>
          <CardDescription>Bulutli CRM tizimining tarmoq qatlamlari va protokollari</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {networkArchitecture.map((layer, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{layer.layer}</h4>
                  <p className="text-sm text-gray-600">{layer.description}</p>
                  <p className="text-xs text-blue-600 mt-1">{layer.technology}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <Badge className={getStatusColor(layer.status)}>{getStatusText(layer.status)}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Server Nodes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="h-5 w-5" />
            <span>Server tugunlari (WAN/LAN tarmog'i)</span>
          </CardTitle>
          <CardDescription>Global va mahalliy tarmoq infratuzilmasi holati</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {serverNodes.map((node) => (
              <Card key={node.id} className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{node.name}</CardTitle>
                    <Badge className={getStatusColor(node.status)}>{getStatusText(node.status)}</Badge>
                  </div>
                  <CardDescription className="flex items-center space-x-1">
                    <Globe className="h-3 w-3" />
                    <span>{node.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-1">
                          <Cpu className="h-4 w-4" />
                          <span className="text-sm">CPU</span>
                        </div>
                        <span className="text-sm text-gray-600">{node.cpu}%</span>
                      </div>
                      <Progress value={node.cpu} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-1">
                          <MemoryStick className="h-4 w-4" />
                          <span className="text-sm">Xotira</span>
                        </div>
                        <span className="text-sm text-gray-600">{node.memory}%</span>
                      </div>
                      <Progress value={node.memory} className="h-2" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-1">
                          <HardDrive className="h-4 w-4" />
                          <span className="text-sm">Disk</span>
                        </div>
                        <span className="text-sm text-gray-600">{node.storage}%</span>
                      </div>
                      <Progress value={node.storage} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-1">
                        <Wifi className="h-4 w-4" />
                        <span className="text-sm">Ulanishlar</span>
                      </div>
                      <span className="text-sm font-semibold">{node.connections.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cloud Services Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Cloud className="h-5 w-5" />
              <span>Bulut xizmatlari taqqoslash</span>
            </CardTitle>
            <CardDescription>On-premises, Cloud va Hybrid yechimlar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-blue-50">
                <h4 className="font-semibold text-blue-900">SaaS (Software as a Service)</h4>
                <p className="text-sm text-blue-700 mt-1">CRM, ERP dasturlari</p>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-blue-600">Xarajat: Past</span>
                  <span className="text-xs text-blue-600">Boshqarish: Oson</span>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-purple-50">
                <h4 className="font-semibold text-purple-900">PaaS (Platform as a Service)</h4>
                <p className="text-sm text-purple-700 mt-1">Dastur ishlab chiqish platformasi</p>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-purple-600">Xarajat: O'rtacha</span>
                  <span className="text-xs text-purple-600">Moslashuvchanlik: Yuqori</span>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-green-50">
                <h4 className="font-semibold text-green-900">IaaS (Infrastructure as a Service)</h4>
                <p className="text-sm text-green-700 mt-1">Virtual serverlar va tarmoq</p>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-green-600">Xarajat: Yuqori</span>
                  <span className="text-xs text-green-600">Nazorat: To'liq</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Xavfsizlik va VPN</span>
            </CardTitle>
            <CardDescription>Tarmoq xavfsizligi va virtual shaxsiy tarmoq</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">SSL/TLS shifrlash</p>
                  <p className="text-sm text-gray-600">256-bit shifrlash</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">VPN ulanish</p>
                  <p className="text-sm text-gray-600">IPSec protokoli</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Firewall himoyasi</p>
                  <p className="text-sm text-gray-600">WAF va DDoS himoya</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>

              <div className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">Ma'lumotlar zaxirasi</p>
                  <p className="text-sm text-gray-600">Avtomatik backup</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Tarmoq optimizatsiyasi va CI/CD</span>
          </CardTitle>
          <CardDescription>Performance yaxshilash va avtomatik deployment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Optimizatsiya usullari</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">CDN orqali kontent taqsimlash</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Gzip siqish algoritmi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Kesh strategiyasi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Load balancing</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">CI/CD Pipeline</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Git-based deployment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Avtomatik testing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Docker containerization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Auto-scaling</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h5 className="font-medium mb-2">Yuqori yuklanish paytida resurs olish</h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">Auto</p>
                <p className="text-xs text-gray-600">CPU Scaling</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">5x</p>
                <p className="text-xs text-gray-600">Memory Boost</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">CDN</p>
                <p className="text-xs text-gray-600">Global Cache</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
