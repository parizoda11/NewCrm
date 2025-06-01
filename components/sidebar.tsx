"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  BarChart3,
  Settings,
  UserCog,
  Store,
  Network,
  Shield,
  Database,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Mijozlar", href: "/customers", icon: Users },
  { name: "Buyurtmalar", href: "/orders", icon: ShoppingCart },
  { name: "Mahsulotlar", href: "/products", icon: Package },
  { name: "Tahlil", href: "/analytics", icon: BarChart3 },
  { name: "Tarmoq", href: "/network", icon: Network },
]

const management = [
  { name: "Foydalanuvchilar", href: "/users", icon: UserCog },
  { name: "Do'kon sozlamalari", href: "/store-settings", icon: Store },
  { name: "Xavfsizlik", href: "/security", icon: Shield },
  { name: "Ma'lumotlar bazasi", href: "/database", icon: Database },
  { name: "Bildirishnomalar", href: "/notifications", icon: Bell },
]

const support = [
  { name: "Yordam", href: "/help", icon: HelpCircle },
  { name: "Sozlamalar", href: "/settings", icon: Settings },
]

const sidebarVariants = {
  expanded: { width: "16rem" },
  collapsed: { width: "4rem" },
  mobile: { width: "16rem" },
}

const itemVariants = {
  expanded: { opacity: 1, x: 0 },
  collapsed: { opacity: 0, x: -10 },
}

interface SidebarProps {
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export default function Sidebar({ isMobileOpen = false, onMobileClose }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Safe pathname usage with fallback
  let pathname = "/"
  try {
    pathname = usePathname() || "/"
  } catch (error) {
    console.warn("usePathname error:", error)
    pathname = "/"
  }

  // Safe auth context usage
  let logout = () => {}
  try {
    const auth = useAuth()
    logout = auth?.logout || (() => {})
  } catch (error) {
    console.warn("useAuth error:", error)
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        onMobileClose?.()
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [onMobileClose])

  const handleLinkClick = () => {
    if (isMobile) {
      onMobileClose?.()
    }
  }

  // Safe navigation items with href validation
  const safeNavigation = navigation.filter((item) => item.href && typeof item.href === "string")
  const safeManagement = management.filter((item) => item.href && typeof item.href === "string")
  const safeSupport = support.filter((item) => item.href && typeof item.href === "string")

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={onMobileClose}
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-card/95 backdrop-blur-sm border-r border-border z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CRM</span>
                      </div>
                      <span className="text-foreground font-semibold">CloudCRM Pro</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onMobileClose}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-y-auto py-4">
                  <nav className="space-y-1 px-2">
                    <div className="px-3 py-2">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Asosiy</h3>
                    </div>
                    {safeNavigation.map((item, index) => {
                      const isActive = pathname === item.href
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            onClick={handleLinkClick}
                            className={cn(
                              "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                              isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                            )}
                          >
                            <item.icon className="h-5 w-5 mr-3" />
                            <span>{item.name}</span>
                          </Link>
                        </motion.div>
                      )
                    })}

                    <div className="px-3 py-2 mt-6">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Boshqaruv
                      </h3>
                    </div>
                    {safeManagement.map((item, index) => {
                      const isActive = pathname === item.href
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: (index + safeNavigation.length) * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            onClick={handleLinkClick}
                            className={cn(
                              "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                              isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                            )}
                          >
                            <item.icon className="h-5 w-5 mr-3" />
                            <span>{item.name}</span>
                          </Link>
                        </motion.div>
                      )
                    })}

                    <div className="px-3 py-2 mt-6">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Qo'llab-quvvatlash
                      </h3>
                    </div>
                    {safeSupport.map((item, index) => {
                      const isActive = pathname === item.href
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: (index + safeNavigation.length + safeManagement.length) * 0.05,
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={handleLinkClick}
                            className={cn(
                              "flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300",
                              isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                            )}
                          >
                            <item.icon className="h-5 w-5 mr-3" />
                            <span>{item.name}</span>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </nav>
                </div>

                {/* Mobile Footer */}
                <div className="p-4 border-t border-border">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      logout()
                      handleLinkClick()
                    }}
                    className="w-full text-muted-foreground hover:text-foreground hover:bg-secondary"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Chiqish</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Desktop Sidebar
  return (
    <motion.div
      initial="expanded"
      animate={collapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full bg-card/95 backdrop-blur-sm border-r border-border z-50 overflow-hidden hidden md:block"
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <motion.div variants={itemVariants} transition={{ duration: 0.3 }} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CRM</span>
              </div>
              {!collapsed && <span className="text-foreground font-semibold">Abdusodiquva CRM </span>}
            </motion.div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-300"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4 transition-transform duration-300" />
              ) : (
                <ChevronLeft className="h-4 w-4 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          <nav className="space-y-1 px-2">
            {!collapsed && (
              <motion.div variants={itemVariants} transition={{ duration: 0.3 }} className="px-3 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Asosiy</h3>
              </motion.div>
            )}
            {safeNavigation.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                      collapsed && "justify-center",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                    {!collapsed && (
                      <motion.span variants={itemVariants} transition={{ duration: 0.3 }}>
                        {item.name}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              )
            })}

            {!collapsed && (
              <motion.div variants={itemVariants} transition={{ duration: 0.3 }} className="px-3 py-2 mt-6">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Boshqaruv</h3>
              </motion.div>
            )}
            {safeManagement.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (index + safeNavigation.length) * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                      collapsed && "justify-center",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                    {!collapsed && (
                      <motion.span variants={itemVariants} transition={{ duration: 0.3 }}>
                        {item.name}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              )
            })}

            {!collapsed && (
              <motion.div variants={itemVariants} transition={{ duration: 0.3 }} className="px-3 py-2 mt-6">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Qo'llab-quvvatlash
                </h3>
              </motion.div>
            )}
            {safeSupport.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: (index + safeNavigation.length + safeManagement.length) * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                      collapsed && "justify-center",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                    {!collapsed && (
                      <motion.span variants={itemVariants} transition={{ duration: 0.3 }}>
                        {item.name}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              onClick={logout}
              className={cn(
                "w-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-300",
                collapsed && "px-2",
              )}
            >
              <LogOut className={cn("h-5 w-5", !collapsed && "mr-3")} />
              {!collapsed && (
                <motion.span variants={itemVariants} transition={{ duration: 0.3 }}>
                  Chiqish
                </motion.span>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
