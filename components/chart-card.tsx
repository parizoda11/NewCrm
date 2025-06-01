"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

interface ChartCardProps {
  title: string
  description: string
  data: Array<{
    month: string
    value: number
  }>
}

export default function ChartCard({ title, description, data }: ChartCardProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
      <Card className="bg-card border-border hover-lift overflow-hidden">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            {title}
            <motion.div
              className="ml-auto"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </motion.div>
          </CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <motion.span
                      className="text-sm font-medium text-foreground group-hover:text-primary transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.month}
                    </motion.span>
                    <motion.span
                      className="text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    >
                      ${item.value.toLocaleString()}
                    </motion.span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / maxValue) * 100}%` }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0.2 + 0.5,
                          ease: "easeOut",
                        }}
                        whileHover={{
                          boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                          transition: { duration: 0.2 },
                        }}
                      />
                    </div>
                    <motion.div
                      className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0"
                      whileHover={{ opacity: 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
