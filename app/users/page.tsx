"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Edit,
  Mail,
  Shield,
  UserCheck,
  UserX,
  Filter,
  Download,
  MoreHorizontal,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/contexts/theme-context"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "employee" | "viewer"
  status: "active" | "inactive" | "pending"
  lastLogin: string
  department: string
  avatar: string
  permissions: string[]
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { theme } = useTheme()

  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@cloudcrm.uz",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-15 14:30",
      department: "IT",
      avatar: "AU",
      permissions: ["all"],
    },
    {
      id: "2",
      name: "Sardor Alimov",
      email: "sardor@cloudcrm.uz",
      role: "manager",
      status: "active",
      lastLogin: "2024-01-15 12:15",
      department: "Savdo",
      avatar: "SA",
      permissions: ["customers", "orders", "products"],
    },
    {
      id: "3",
      name: "Gulnora Karimova",
      email: "gulnora@cloudcrm.uz",
      role: "employee",
      status: "active",
      lastLogin: "2024-01-15 09:45",
      department: "Mijozlar xizmati",
      avatar: "GK",
      permissions: ["customers", "orders"],
    },
    {
      id: "4",
      name: "Jasur Toshmatov",
      email: "jasur@cloudcrm.uz",
      role: "employee",
      status: "pending",
      lastLogin: "Hech qachon",
      department: "Ombor",
      avatar: "JT",
      permissions: ["products"],
    },
    {
      id: "5",
      name: "Madina Rahimova",
      email: "madina@cloudcrm.uz",
      role: "viewer",
      status: "inactive",
      lastLogin: "2024-01-10 16:20",
      department: "Moliya",
      avatar: "MR",
      permissions: ["analytics"],
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role: string) => {
    const colors = {
      admin:
        theme === "dark" ? "bg-red-500/20 text-red-300 border-red-500/30" : "bg-red-100 text-red-700 border-red-200",
      manager:
        theme === "dark"
          ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
          : "bg-blue-100 text-blue-700 border-blue-200",
      employee:
        theme === "dark"
          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
          : "bg-emerald-100 text-emerald-700 border-emerald-200",
      viewer:
        theme === "dark"
          ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
          : "bg-purple-100 text-purple-700 border-purple-200",
    }
    return (
      colors[role as keyof typeof colors] ||
      (theme === "dark"
        ? "bg-slate-500/20 text-slate-300 border-slate-500/30"
        : "bg-slate-100 text-slate-700 border-slate-200")
    )
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active:
        theme === "dark"
          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
          : "bg-emerald-100 text-emerald-700 border-emerald-200",
      inactive:
        theme === "dark" ? "bg-red-500/20 text-red-300 border-red-500/30" : "bg-red-100 text-red-700 border-red-200",
      pending:
        theme === "dark"
          ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
          : "bg-yellow-100 text-yellow-700 border-yellow-200",
    }
    return (
      colors[status as keyof typeof colors] ||
      (theme === "dark"
        ? "bg-slate-500/20 text-slate-300 border-slate-500/30"
        : "bg-slate-100 text-slate-700 border-slate-200")
    )
  }

  const getRoleText = (role: string) => {
    const roleTexts = {
      admin: "Administrator",
      manager: "Menejer",
      employee: "Xodim",
      viewer: "Ko'ruvchi",
    }
    return roleTexts[role as keyof typeof roleTexts] || role
  }

  const getStatusText = (status: string) => {
    const statusTexts = {
      active: "Faol",
      inactive: "Nofaol",
      pending: "Kutilmoqda",
    }
    return statusTexts[status as keyof typeof statusTexts] || status
  }

  const getUserStats = () => {
    const total = users.length
    const active = users.filter((u) => u.status === "active").length
    const pending = users.filter((u) => u.status === "pending").length
    const inactive = users.filter((u) => u.status === "inactive").length

    return { total, active, pending, inactive }
  }

  const stats = getUserStats()

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1
                className={`text-3xl font-bold transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}
              >
                Foydalanuvchilar
              </h1>
              <p className={`mt-1 transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                Tizim foydalanuvchilarini boshqaring va ruxsatlarni sozlang
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className={`transition-all hover:scale-105 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="outline"
                className={`transition-all hover:scale-105 ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all hover:scale-105 shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Yangi foydalanuvchi
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className={`max-w-md transition-colors ${
                    theme === "dark"
                      ? "bg-slate-800 border-slate-700 text-white"
                      : "bg-white border-slate-200 text-slate-900"
                  }`}
                >
                  <DialogHeader>
                    <DialogTitle className={theme === "dark" ? "text-white" : "text-slate-900"}>
                      Yangi foydalanuvchi qo'shish
                    </DialogTitle>
                    <DialogDescription className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
                      Yangi foydalanuvchi ma'lumotlarini kiriting
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className={theme === "dark" ? "text-slate-300" : "text-slate-700"}>
                        Ism familiya
                      </Label>
                      <Input
                        id="name"
                        placeholder="Foydalanuvchi ismi"
                        className={`transition-colors ${
                          theme === "dark"
                            ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                            : "bg-white border-slate-300 text-slate-900 placeholder-slate-500"
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className={theme === "dark" ? "text-slate-300" : "text-slate-700"}>
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@cloudcrm.uz"
                        className={`transition-colors ${
                          theme === "dark"
                            ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                            : "bg-white border-slate-300 text-slate-900 placeholder-slate-500"
                        }`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="role" className={theme === "dark" ? "text-slate-300" : "text-slate-700"}>
                        Rol
                      </Label>
                      <Select>
                        <SelectTrigger
                          className={`transition-colors ${
                            theme === "dark"
                              ? "bg-slate-700 border-slate-600 text-white"
                              : "bg-white border-slate-300 text-slate-900"
                          }`}
                        >
                          <SelectValue placeholder="Rolni tanlang" />
                        </SelectTrigger>
                        <SelectContent
                          className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}
                        >
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="manager">Menejer</SelectItem>
                          <SelectItem value="employee">Xodim</SelectItem>
                          <SelectItem value="viewer">Ko'ruvchi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="department" className={theme === "dark" ? "text-slate-300" : "text-slate-700"}>
                        Bo'lim
                      </Label>
                      <Select>
                        <SelectTrigger
                          className={`transition-colors ${
                            theme === "dark"
                              ? "bg-slate-700 border-slate-600 text-white"
                              : "bg-white border-slate-300 text-slate-900"
                          }`}
                        >
                          <SelectValue placeholder="Bo'limni tanlang" />
                        </SelectTrigger>
                        <SelectContent
                          className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}
                        >
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="sales">Savdo</SelectItem>
                          <SelectItem value="customer-service">Mijozlar xizmati</SelectItem>
                          <SelectItem value="warehouse">Ombor</SelectItem>
                          <SelectItem value="finance">Moliya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all hover:scale-105"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Foydalanuvchi qo'shish
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              className={`transition-all hover:scale-105 hover:shadow-lg ${
                theme === "dark"
                  ? "bg-slate-800/50 border-slate-700 backdrop-blur-sm"
                  : "bg-white/80 border-slate-200 backdrop-blur-sm shadow-sm"
              }`}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <p
                    className={`text-3xl font-bold transition-colors ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {stats.total}
                  </p>
                  <p className={`text-sm transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Jami foydalanuvchilar
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card
              className={`transition-all hover:scale-105 hover:shadow-lg ${
                theme === "dark"
                  ? "bg-slate-800/50 border-slate-700 backdrop-blur-sm"
                  : "bg-white/80 border-slate-200 backdrop-blur-sm shadow-sm"
              }`}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-emerald-500">{stats.active}</p>
                  <p className={`text-sm transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Faol
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card
              className={`transition-all hover:scale-105 hover:shadow-lg ${
                theme === "dark"
                  ? "bg-slate-800/50 border-slate-700 backdrop-blur-sm"
                  : "bg-white/80 border-slate-200 backdrop-blur-sm shadow-sm"
              }`}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
                  <p className={`text-sm transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Kutilmoqda
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card
              className={`transition-all hover:scale-105 hover:shadow-lg ${
                theme === "dark"
                  ? "bg-slate-800/50 border-slate-700 backdrop-blur-sm"
                  : "bg-white/80 border-slate-200 backdrop-blur-sm shadow-sm"
              }`}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-500">{stats.inactive}</p>
                  <p className={`text-sm transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                    Nofaol
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card
            className={`transition-colors ${
              theme === "dark"
                ? "bg-slate-800/50 border-slate-700 backdrop-blur-sm"
                : "bg-white/80 border-slate-200 backdrop-blur-sm shadow-sm"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  />
                  <Input
                    placeholder="Foydalanuvchilarni qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 transition-colors ${
                      theme === "dark"
                        ? "bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                        : "bg-white border-slate-300 text-slate-900 placeholder-slate-500"
                    }`}
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger
                    className={`w-full lg:w-48 transition-colors ${
                      theme === "dark"
                        ? "bg-slate-700/50 border-slate-600 text-white"
                        : "bg-white border-slate-300 text-slate-900"
                    }`}
                  >
                    <SelectValue placeholder="Rol bo'yicha" />
                  </SelectTrigger>
                  <SelectContent
                    className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}
                  >
                    <SelectItem value="all">Barcha rollar</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="manager">Menejer</SelectItem>
                    <SelectItem value="employee">Xodim</SelectItem>
                    <SelectItem value="viewer">Ko'ruvchi</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger
                    className={`w-full lg:w-48 transition-colors ${
                      theme === "dark"
                        ? "bg-slate-700/50 border-slate-600 text-white"
                        : "bg-white border-slate-300 text-slate-900"
                    }`}
                  >
                    <SelectValue placeholder="Status bo'yicha" />
                  </SelectTrigger>
                  <SelectContent
                    className={theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}
                  >
                    <SelectItem value="all">Barcha statuslar</SelectItem>
                    <SelectItem value="active">Faol</SelectItem>
                    <SelectItem value="pending">Kutilmoqda</SelectItem>
                    <SelectItem value="inactive">Nofaol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card
            className={`transition-colors ${
              theme === "dark"
                ? "bg-slate-800/50 border-slate-700 backdrop-blur-sm"
                : "bg-white/80 border-slate-200 backdrop-blur-sm shadow-sm"
            }`}
          >
            <CardHeader>
              <CardTitle className={`transition-colors ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Foydalanuvchilar ro'yxati
              </CardTitle>
              <CardDescription
                className={`transition-colors ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
              >
                Jami {filteredUsers.length} ta foydalanuvchi topildi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow
                      className={`transition-colors ${theme === "dark" ? "border-slate-700" : "border-slate-200"}`}
                    >
                      <TableHead
                        className={`transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                      >
                        Foydalanuvchi
                      </TableHead>
                      <TableHead
                        className={`transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                      >
                        Rol
                      </TableHead>
                      <TableHead
                        className={`transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                      >
                        Bo'lim
                      </TableHead>
                      <TableHead
                        className={`transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                      >
                        Status
                      </TableHead>
                      <TableHead
                        className={`transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                      >
                        Oxirgi kirish
                      </TableHead>
                      <TableHead
                        className={`transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                      >
                        Ruxsatlar
                      </TableHead>
                      <TableHead
                        className={`transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                      >
                        Amallar
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        className={`transition-all hover:scale-[1.01] ${
                          theme === "dark"
                            ? "border-slate-700 hover:bg-slate-700/30"
                            : "border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10 ring-2 ring-blue-500/20">
                              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                                {user.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p
                                className={`font-medium transition-colors ${
                                  theme === "dark" ? "text-white" : "text-slate-900"
                                }`}
                              >
                                {user.name}
                              </p>
                              <p
                                className={`text-sm flex items-center transition-colors ${
                                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                                }`}
                              >
                                <Mail className="h-3 w-3 mr-1" />
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getRoleColor(user.role)} transition-all hover:scale-105`}>
                            <Shield className="h-3 w-3 mr-1" />
                            {getRoleText(user.role)}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                        >
                          {user.department}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(user.status)} transition-all hover:scale-105`}>
                            {user.status === "active" ? (
                              <UserCheck className="h-3 w-3 mr-1" />
                            ) : (
                              <UserX className="h-3 w-3 mr-1" />
                            )}
                            {getStatusText(user.status)}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={`transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}
                        >
                          {user.lastLogin}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {user.permissions.slice(0, 2).map((permission, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className={`text-xs transition-colors ${
                                  theme === "dark"
                                    ? "bg-slate-700 border-slate-600 text-slate-300"
                                    : "bg-slate-100 border-slate-300 text-slate-700"
                                }`}
                              >
                                {permission}
                              </Badge>
                            ))}
                            {user.permissions.length > 2 && (
                              <Badge
                                variant="outline"
                                className={`text-xs transition-colors ${
                                  theme === "dark"
                                    ? "bg-slate-700 border-slate-600 text-slate-300"
                                    : "bg-slate-100 border-slate-300 text-slate-700"
                                }`}
                              >
                                +{user.permissions.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`transition-all hover:scale-110 ${
                                  theme === "dark"
                                    ? "text-slate-400 hover:text-white hover:bg-slate-700"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                                }`}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className={`transition-colors ${
                                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                              }`}
                            >
                              <DropdownMenuLabel className={theme === "dark" ? "text-slate-300" : "text-slate-700"}>
                                Amallar
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator className={theme === "dark" ? "bg-slate-700" : "bg-slate-200"} />
                              <DropdownMenuItem
                                className={`transition-colors ${
                                  theme === "dark"
                                    ? "text-slate-300 hover:bg-slate-700 hover:text-white"
                                    : "text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Tahrirlash
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className={`transition-colors ${
                                  theme === "dark"
                                    ? "text-red-400 hover:bg-red-500/20 hover:text-red-300"
                                    : "text-red-600 hover:bg-red-50"
                                }`}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                O'chirish
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
