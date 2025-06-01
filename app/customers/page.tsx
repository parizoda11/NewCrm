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
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Edit, Trash2, Mail, Phone, MapPin, Building, Filter, Download, Eye } from "lucide-react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { motion, AnimatePresence } from "framer-motion"
import { apiClient, useData } from "@/lib/db-client"

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  company: string
  location: string
  address: string
  status: string
  total_orders: number
  total_spent: number
  last_order: string
  avatar: string
  rating: number
  join_date: string
  notes: string
  created_at: string
  updated_at: string
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [operationStatus, setOperationStatus] = useState("")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    address: "",
    status: "pending",
    notes: "",
  })

  // Fetch customers data
  const { data: customers, loading, error, refetch } = useData<Customer[]>("/api/customers", [])

  // Filter customers based on search and filters
  const filteredCustomers =
    customers?.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = filterStatus === "all" || customer.status === filterStatus
      const matchesLocation = filterLocation === "all" || customer.location === filterLocation

      return matchesSearch && matchesStatus && matchesLocation
    }) || []

  const handleAddCustomer = async () => {
    if (!newCustomer.name || !newCustomer.email) {
      setOperationStatus("Ism va email majburiy!")
      return
    }

    setIsLoading(true)
    setOperationStatus("Mijoz qo'shilmoqda...")

    try {
      await apiClient.customers.create({
        ...newCustomer,
        avatar: newCustomer.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      })

      setOperationStatus("Mijoz muvaffaqiyatli qo'shildi!")
      setIsAddDialogOpen(false)
      setNewCustomer({
        name: "",
        email: "",
        phone: "",
        company: "",
        location: "",
        address: "",
        status: "pending",
        notes: "",
      })
      refetch()
    } catch (error) {
      setOperationStatus("Xatolik yuz berdi!")
    } finally {
      setIsLoading(false)
      setTimeout(() => setOperationStatus(""), 3000)
    }
  }

  const handleEditCustomer = async () => {
    if (!selectedCustomer) return

    setIsLoading(true)
    setOperationStatus("Mijoz ma'lumotlari yangilanmoqda...")

    try {
      await apiClient.customers.update(selectedCustomer.id, selectedCustomer)
      setOperationStatus("Mijoz ma'lumotlari yangilandi!")
      setIsEditDialogOpen(false)
      setSelectedCustomer(null)
      refetch()
    } catch (error) {
      setOperationStatus("Xatolik yuz berdi!")
    } finally {
      setIsLoading(false)
      setTimeout(() => setOperationStatus(""), 3000)
    }
  }

  const handleDeleteCustomer = async (customerId: number) => {
    if (!confirm("Haqiqatan ham bu mijozni o'chirmoqchimisiz?")) return

    setOperationStatus("Mijoz o'chirilmoqda...")

    try {
      await apiClient.customers.delete(customerId)
      setOperationStatus("Mijoz o'chirildi!")
      refetch()
    } catch (error) {
      setOperationStatus("Xatolik yuz berdi!")
    } finally {
      setTimeout(() => setOperationStatus(""), 3000)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-600 border-emerald-500/30 dark:text-emerald-400"
      case "inactive":
        return "bg-red-500/20 text-red-600 border-red-500/30 dark:text-red-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30 dark:text-yellow-400"
      default:
        return "bg-slate-500/20 text-slate-600 border-slate-500/30 dark:text-slate-400"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Faol"
      case "inactive":
        return "Nofaol"
      case "pending":
        return "Kutilmoqda"
      default:
        return status
    }
  }

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

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isMobileOpen={isMobileSidebarOpen} onMobileClose={() => setIsMobileSidebarOpen(false)} />
      <div className="md:ml-64">
        <Header onMobileMenuToggle={() => setIsMobileSidebarOpen(true)} />
        <main className="p-4 md:p-6 space-y-4 md:space-y-6">
          {operationStatus && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-600 dark:text-blue-400 text-sm">{operationStatus}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Mijozlar</h1>
              <p className="text-muted-foreground mt-1">Mijozlar ma'lumotlarini boshqaring</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary btn-mobile">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary btn-mobile">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 btn-mobile">
                    <Plus className="h-4 w-4 mr-2" />
                    Yangi mijoz
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border text-foreground max-w-md mx-4 card-mobile">
                  <DialogHeader>
                    <DialogTitle>Yangi mijoz qo'shish</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Yangi mijoz ma'lumotlarini kiriting
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">
                        Ism familiya *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Mijoz ismi"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-foreground">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-foreground">
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+998901234567"
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-foreground">
                        Kompaniya
                      </Label>
                      <Input
                        id="company"
                        placeholder="Kompaniya nomi"
                        value={newCustomer.company}
                        onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
                        className="bg-background border-border text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-foreground">
                        Joylashuv
                      </Label>
                      <Select
                        value={newCustomer.location}
                        onValueChange={(value) => setNewCustomer({ ...newCustomer, location: value })}
                      >
                        <SelectTrigger className="bg-background border-border text-foreground">
                          <SelectValue placeholder="Shaharni tanlang" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="Toshkent">Toshkent</SelectItem>
                          <SelectItem value="Samarqand">Samarqand</SelectItem>
                          <SelectItem value="Buxoro">Buxoro</SelectItem>
                          <SelectItem value="Namangan">Namangan</SelectItem>
                          <SelectItem value="Andijon">Andijon</SelectItem>
                          <SelectItem value="Farg'ona">Farg'ona</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-foreground">
                        Manzil
                      </Label>
                      <Textarea
                        id="address"
                        placeholder="To'liq manzil"
                        value={newCustomer.address}
                        onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                        className="bg-background border-border text-foreground"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes" className="text-foreground">
                        Izohlar
                      </Label>
                      <Textarea
                        id="notes"
                        placeholder="Qo'shimcha ma'lumotlar"
                        value={newCustomer.notes}
                        onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })}
                        className="bg-background border-border text-foreground"
                        rows={2}
                      />
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      onClick={handleAddCustomer}
                      disabled={isLoading}
                    >
                      {isLoading ? "Qo'shilmoqda..." : "Mijoz qo'shish"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid-responsive">
            <Card className="bg-card border-border hover-lift">
              <CardContent className="p-3 md:p-4">
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-foreground">{customers?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Jami mijozlar</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover-lift">
              <CardContent className="p-3 md:p-4">
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {customers?.filter((c) => c.status === "active").length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Faol</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover-lift">
              <CardContent className="p-3 md:p-4">
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {customers?.filter((c) => c.status === "pending").length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Kutilmoqda</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover-lift">
              <CardContent className="p-3 md:p-4">
                <div className="text-center">
                  <p className="text-xl md:text-2xl font-bold text-red-600 dark:text-red-400">
                    {customers?.filter((c) => c.status === "inactive").length || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Nofaol</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border card-mobile">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Mijozlarni qidirish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-border text-foreground"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full md:w-48 bg-background border-border text-foreground">
                    <SelectValue placeholder="Status bo'yicha filter" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">Barcha statuslar</SelectItem>
                    <SelectItem value="active">Faol</SelectItem>
                    <SelectItem value="pending">Kutilmoqda</SelectItem>
                    <SelectItem value="inactive">Nofaol</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterLocation} onValueChange={setFilterLocation}>
                  <SelectTrigger className="w-full md:w-48 bg-background border-border text-foreground">
                    <SelectValue placeholder="Joylashuv bo'yicha filter" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all">Barcha shaharlar</SelectItem>
                    <SelectItem value="Toshkent">Toshkent</SelectItem>
                    <SelectItem value="Samarqand">Samarqand</SelectItem>
                    <SelectItem value="Buxoro">Buxoro</SelectItem>
                    <SelectItem value="Namangan">Namangan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border card-mobile">
            <CardHeader>
              <CardTitle className="text-foreground">Mijozlar ro'yxati</CardTitle>
              <CardDescription className="text-muted-foreground">
                Jami {filteredCustomers.length} ta mijoz topildi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="table-responsive">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Mijoz</TableHead>
                      <TableHead className="text-muted-foreground hidden md:table-cell">Kompaniya</TableHead>
                      <TableHead className="text-muted-foreground hidden lg:table-cell">Joylashuv</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground hidden sm:table-cell">Buyurtmalar</TableHead>
                      <TableHead className="text-muted-foreground hidden sm:table-cell">Jami summa</TableHead>
                      <TableHead className="text-muted-foreground">Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredCustomers.map((customer, index) => (
                        <motion.tr
                          key={customer.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-border hover:bg-secondary/50"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-2 md:space-x-3">
                              <Avatar className="h-8 w-8 md:h-10 md:w-10">
                                <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs md:text-sm">
                                  {customer.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground text-sm md:text-base">{customer.name}</p>
                                <div className="flex items-center space-x-1 text-xs md:text-sm text-muted-foreground">
                                  <Mail className="h-3 w-3" />
                                  <span className="truncate max-w-[120px] md:max-w-none">{customer.email}</span>
                                </div>
                                {customer.phone && (
                                  <div className="flex items-center space-x-1 text-xs md:text-sm text-muted-foreground md:hidden">
                                    <Phone className="h-3 w-3" />
                                    <span>{customer.phone}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center space-x-2">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              <span className="text-foreground">{customer.company || "—"}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-foreground">{customer.location || "—"}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(customer.status)}>{getStatusText(customer.status)}</Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-foreground">
                            {customer.total_orders}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-foreground">
                            ${customer.total_spent.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-border text-foreground hover:bg-secondary p-1 md:p-2"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-border text-foreground hover:bg-secondary p-1 md:p-2"
                                onClick={() => {
                                  setSelectedCustomer(customer)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-border text-foreground hover:bg-secondary p-1 md:p-2"
                                onClick={() => handleDeleteCustomer(customer.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Edit Customer Dialog */}
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="bg-card border-border text-foreground max-w-md mx-4 card-mobile">
              <DialogHeader>
                <DialogTitle>Mijoz ma'lumotlarini tahrirlash</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Mijoz ma'lumotlarini o'zgartiring
                </DialogDescription>
              </DialogHeader>
              {selectedCustomer && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-name" className="text-foreground">
                      Ism familiya
                    </Label>
                    <Input
                      id="edit-name"
                      value={selectedCustomer.name}
                      onChange={(e) => setSelectedCustomer({ ...selectedCustomer, name: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={selectedCustomer.email}
                      onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-phone" className="text-foreground">
                      Telefon
                    </Label>
                    <Input
                      id="edit-phone"
                      value={selectedCustomer.phone}
                      onChange={(e) => setSelectedCustomer({ ...selectedCustomer, phone: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-company" className="text-foreground">
                      Kompaniya
                    </Label>
                    <Input
                      id="edit-company"
                      value={selectedCustomer.company}
                      onChange={(e) => setSelectedCustomer({ ...selectedCustomer, company: e.target.value })}
                      className="bg-background border-border text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-status" className="text-foreground">
                      Status
                    </Label>
                    <Select
                      value={selectedCustomer.status}
                      onValueChange={(value) => setSelectedCustomer({ ...selectedCustomer, status: value })}
                    >
                      <SelectTrigger className="bg-background border-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="active">Faol</SelectItem>
                        <SelectItem value="pending">Kutilmoqda</SelectItem>
                        <SelectItem value="inactive">Nofaol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    onClick={handleEditCustomer}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saqlanmoqda..." : "O'zgarishlarni saqlash"}
                  </Button>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  )
}
