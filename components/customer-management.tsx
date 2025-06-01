"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Mail, Phone, MapPin } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  location: string
  status: "active" | "inactive" | "pending"
  totalOrders: number
  totalSpent: number
  lastOrder: string
}

export default function CustomerManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "Aziz Karimov",
      email: "aziz@fashionstore.uz",
      phone: "+998901234567",
      company: "Fashion Store LLC",
      location: "Toshkent",
      status: "active",
      totalOrders: 45,
      totalSpent: 125000,
      lastOrder: "2024-01-15",
    },
    {
      id: "2",
      name: "Malika Rahimova",
      email: "malika@stylehouse.uz",
      phone: "+998907654321",
      company: "Style House",
      location: "Samarqand",
      status: "active",
      totalOrders: 32,
      totalSpent: 89000,
      lastOrder: "2024-01-12",
    },
    {
      id: "3",
      name: "Bobur Toshmatov",
      email: "bobur@trendy.uz",
      phone: "+998909876543",
      company: "Trendy Fashion",
      location: "Buxoro",
      status: "pending",
      totalOrders: 12,
      totalSpent: 34000,
      lastOrder: "2024-01-08",
    },
    {
      id: "4",
      name: "Nilufar Saidova",
      email: "nilufar@elegance.uz",
      phone: "+998905432109",
      company: "Elegance Boutique",
      location: "Namangan",
      status: "active",
      totalOrders: 67,
      totalSpent: 198000,
      lastOrder: "2024-01-14",
    },
  ])

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mijozlarni boshqarish</h2>
          <p className="text-gray-600">Barcha mijozlar ma'lumotlarini ko'ring va boshqaring</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Yangi mijoz</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Yangi mijoz qo'shish</DialogTitle>
              <DialogDescription>Yangi mijoz ma'lumotlarini kiriting</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Ism familiya</Label>
                <Input id="name" placeholder="Mijoz ismi" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input id="phone" placeholder="+998901234567" />
              </div>
              <div>
                <Label htmlFor="company">Kompaniya</Label>
                <Input id="company" placeholder="Kompaniya nomi" />
              </div>
              <div>
                <Label htmlFor="location">Joylashuv</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Shaharni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tashkent">Toshkent</SelectItem>
                    <SelectItem value="samarkand">Samarqand</SelectItem>
                    <SelectItem value="bukhara">Buxoro</SelectItem>
                    <SelectItem value="namangan">Namangan</SelectItem>
                    <SelectItem value="andijan">Andijon</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Izohlar</Label>
                <Textarea id="notes" placeholder="Qo'shimcha ma'lumotlar" />
              </div>
              <Button className="w-full">Mijozni qo'shish</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Mijozlarni qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mijozlar ro'yxati</CardTitle>
          <CardDescription>Jami {filteredCustomers.length} ta mijoz topildi</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mijoz</TableHead>
                <TableHead>Kompaniya</TableHead>
                <TableHead>Aloqa</TableHead>
                <TableHead>Joylashuv</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Buyurtmalar</TableHead>
                <TableHead>Jami xarid</TableHead>
                <TableHead>Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{customer.company}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-1 text-sm">
                        <Mail className="h-3 w-3" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm">
                        <Phone className="h-3 w-3" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{customer.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>{getStatusText(customer.status)}</Badge>
                  </TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>${customer.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
