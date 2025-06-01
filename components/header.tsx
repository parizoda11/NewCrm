"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Settings, User, LogOut, Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useAuth } from "@/contexts/auth-context"

interface HeaderProps {
  onMobileMenuToggle?: () => void
}

export default function Header({ onMobileMenuToggle }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const { logout } = useAuth()
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="h-16 bg-card/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
      <div className="flex items-center space-x-4 flex-1">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onMobileMenuToggle}
          className="md:hidden text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="relative max-w-md w-full">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 transition-all duration-300 ${
              searchFocused ? "text-primary" : ""
            }`}
          />
          <Input
            placeholder="Qidirish..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`pl-10 bg-background/60 border-input focus:border-primary transition-all duration-300 ${
              searchFocused ? "ring-2 ring-primary/20" : ""
            }`}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200 p-2"
          title={theme === "dark" ? "Light mode" : "Dark mode"}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="relative text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all duration-200 p-2"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 hover:bg-red-600 text-white text-xs flex items-center justify-center border-0">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-card/95 backdrop-blur-sm border-border shadow-lg">
            <DropdownMenuLabel className="text-foreground">Bildirishnomalar</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            {[
              {
                title: "Yangi buyurtma",
                description: "Aziz Karimov tomonidan",
                time: "2 daqiqa oldin",
              },
              {
                title: "To'lov amalga oshirildi",
                description: "$1,250 miqdorida",
                time: "15 daqiqa oldin",
              },
              {
                title: "Yangi mijoz",
                description: "Malika Rahimova ro'yxatdan o'tdi",
                time: "1 soat oldin",
              },
            ].map((notification, index) => (
              <DropdownMenuItem
                key={index}
                className="text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                <div className="flex flex-col space-y-1 w-full">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{notification.description}</p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="text-primary hover:bg-secondary/80 text-center transition-colors duration-200 cursor-pointer">
              <span className="w-full text-center">Barcha bildirishnomalarni ko'rish</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full overflow-hidden hover:bg-secondary/80 transition-all duration-200"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm">
                  AK
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-card/95 backdrop-blur-sm border-border shadow-lg"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal text-foreground">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Admin User</p>
                <p className="text-xs leading-none text-muted-foreground">admin@cloudcrm.uz</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors duration-200 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors duration-200 cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Sozlamalar</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={logout}
              className="text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Chiqish</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
