"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useTheme } from "@/contexts/theme-context"
import { motion } from "framer-motion"
import { Eye, EyeOff, Moon, Sun, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email === "pari@gmail.com" && password === "pari123") {
        localStorage.setItem("isAuthenticated", "true")
        router.push("/")
      } else {
        setError("Noto'g'ri email yoki parol")
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-4 right-4"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full transition-all duration-300 hover:scale-110"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </motion.div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:flex flex-col justify-center items-center"
        >
          <div className="relative w-full h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl" />
            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6"
              >
                <span className="text-white font-bold text-3xl">CRM</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-3xl font-bold text-foreground mb-4"
              >
                CloudCRM Pro
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="text-muted-foreground mb-8"
              >
                Wholesale kiyim-kechak biznesingiz uchun professional CRM tizimi
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="grid grid-cols-2 gap-4 w-full max-w-xs"
              >
                {[
                  { label: "Mijozlar", value: "2,847+" },
                  { label: "Buyurtmalar", value: "15,000+" },
                  { label: "Mahsulotlar", value: "5,600+" },
                  { label: "Foydalanuvchilar", value: "120+" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-card/50 backdrop-blur-sm p-3 rounded-lg text-center"
                  >
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col justify-center"
        >
          <Card className="border-border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Tizimga kirish</CardTitle>
              <CardDescription className="text-center">
                Tizimdan foydalanish uchun ma'lumotlaringizni kiriting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mail@gmail.com kiriting "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Parol</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Meni eslab qolish
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 hover:shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kirish...
                    </>
                  ) : (
                    "Kirish"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                <a href="#" className="hover:text-primary underline underline-offset-4 transition-colors">
                  Parolni unutdingizmi?
                </a>
              </div>
              <div className="text-xs text-center text-muted-foreground">
                <p>Demo uchun: admin@cloudcrm.uz / admin123</p>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
