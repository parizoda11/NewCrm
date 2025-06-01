"use client"

// API client functions
export const dbClient = {
  // Products
  products: {
    getAll: async () => {
      try {
        const response = await fetch("/api/products")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error fetching products:", error)
        return []
      }
    },
    getById: async (id: string) => {
      try {
        const response = await fetch(`/api/products/${id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error fetching product:", error)
        return null
      }
    },
    create: async (product: any) => {
      try {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error creating product:", error)
        throw error
      }
    },
    update: async (id: string, product: any) => {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error updating product:", error)
        throw error
      }
    },
    delete: async (id: string) => {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE",
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error deleting product:", error)
        throw error
      }
    },
    search: async (searchTerm: string) => {
      try {
        const response = await fetch(`/api/products?search=${encodeURIComponent(searchTerm)}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error searching products:", error)
        return []
      }
    },
  },

  // Categories
  categories: {
    getAll: async () => {
      try {
        const response = await fetch("/api/categories")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error fetching categories:", error)
        return []
      }
    },
  },

  // Suppliers
  suppliers: {
    getAll: async () => {
      try {
        const response = await fetch("/api/suppliers")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error fetching suppliers:", error)
        return []
      }
    },
  },

  // Customers
  customers: {
    getAll: async () => {
      try {
        const response = await fetch("/api/customers")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error fetching customers:", error)
        return []
      }
    },
    getById: async (id: string) => {
      try {
        const response = await fetch(`/api/customers/${id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error fetching customer:", error)
        return null
      }
    },
    create: async (customer: any) => {
      try {
        const response = await fetch("/api/customers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customer),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error creating customer:", error)
        throw error
      }
    },
    update: async (id: string, customer: any) => {
      try {
        const response = await fetch(`/api/customers/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(customer),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error updating customer:", error)
        throw error
      }
    },
    delete: async (id: string) => {
      try {
        const response = await fetch(`/api/customers/${id}`, {
          method: "DELETE",
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error deleting customer:", error)
        throw error
      }
    },
    search: async (params: any) => {
      try {
        const searchParams = new URLSearchParams(params)
        const response = await fetch(`/api/customers/search?${searchParams}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error searching customers:", error)
        return []
      }
    },
  },

  // Orders
  orders: {
    getAll: async () => {
      try {
        const response = await fetch("/api/orders")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error fetching orders:", error)
        return []
      }
    },
    getById: async (id: string) => {
      try {
        const response = await fetch(`/api/orders/${id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error fetching order:", error)
        return null
      }
    },
    create: async (order: any, items: any[]) => {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order, items }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error creating order:", error)
        throw error
      }
    },
    updateStatus: async (id: string, status: string) => {
      try {
        const response = await fetch(`/api/orders/${id}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error updating order status:", error)
        throw error
      }
    },
    search: async (searchTerm: string) => {
      try {
        const response = await fetch(`/api/orders?search=${encodeURIComponent(searchTerm)}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error searching orders:", error)
        return []
      }
    },
  },

  // Notifications
  notifications: {
    getAll: async () => {
      try {
        const response = await fetch("/api/notifications")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error fetching notifications:", error)
        return []
      }
    },
    create: async (notification: any) => {
      try {
        const response = await fetch("/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notification),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error creating notification:", error)
        throw error
      }
    },
    delete: async (id: string) => {
      try {
        const response = await fetch(`/api/notifications?id=${id}`, {
          method: "DELETE",
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error deleting notification:", error)
        throw error
      }
    },
  },

  // Settings
  settings: {
    getByCategory: async (category: string) => {
      try {
        const response = await fetch(`/api/settings/${category}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error fetching settings:", error)
        return {}
      }
    },
    updateCategory: async (category: string, settings: any) => {
      try {
        const response = await fetch(`/api/settings/${category}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(settings),
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error updating settings:", error)
        throw error
      }
    },
  },

  // Analytics
  analytics: {
    getDashboard: async () => {
      try {
        const response = await fetch("/api/analytics/dashboard")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json()
      } catch (error) {
        console.error("Error fetching analytics:", error)
        return {}
      }
    },
  },
}

import { useState, useEffect } from "react"

// Custom hook for fetching data
export function useData<T>(url: string, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  return { data, loading, error, refetch: () => setData(null) }
}

// For backward compatibility
export const apiClient = dbClient
