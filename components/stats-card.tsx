"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: LucideIcon
  color: string
}

export default function StatsCard({ title, value, change, trend, icon: Icon, color }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="bg-card border-border backdrop-blur-sm transition-all duration-300 hover:shadow-lg overflow-hidden relative group">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{ background: `linear-gradient(135deg, ${color.split(" ")[1]}, ${color.split(" ")[3]})` }}
        />
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <motion.p
                className="text-sm font-medium text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {title}
              </motion.p>
              <motion.p
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {value}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Badge
                  variant="outline"
                  className={`border-0 transition-all duration-300 ${
                    trend === "up"
                      ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                      : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  }`}
                >
                  <motion.div
                    animate={{
                      y: trend === "up" ? [0, -2, 0] : [0, 2, 0],
                      rotate: trend === "up" ? [0, 5, 0] : [0, -5, 0],
                    }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                  </motion.div>
                  {change}
                </Badge>
              </motion.div>
            </div>
            <motion.div
              className={`p-3 rounded-xl bg-gradient-to-r ${color} transition-all duration-300 shadow-lg`}
              whileHover={{
                scale: 1.1,
                rotate: 10,
                transition: { duration: 0.2 },
              }}
              animate={{
                boxShadow: [
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Icon className="h-6 w-6 text-white" />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
