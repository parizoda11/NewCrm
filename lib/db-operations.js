let db

try {
  db = require("./database.js").default
  console.log("Database operations initialized successfully")
} catch (error) {
  console.error("Failed to initialize database:", error)
  db = null
}

// Helper function to handle database operations safely
const safeDbOperation = (operation, fallback = null) => {
  if (!db) {
    console.warn("Database not available, returning fallback data")
    return fallback
  }
  try {
    return operation()
  } catch (error) {
    console.error("Database operation failed:", error)
    return fallback
  }
}

// Customer operations
export const customerOperations = {
  getAll: () => {
    return safeDbOperation(() => {
      return db
        .prepare(`
        SELECT * FROM customers 
        ORDER BY created_at DESC
      `)
        .all()
    }, [])
  },

  getById: (id) => {
    return safeDbOperation(() => {
      return db.prepare("SELECT * FROM customers WHERE id = ?").get(id)
    }, null)
  },

  create: (customer) => {
    return safeDbOperation(
      () => {
        const stmt = db.prepare(`
        INSERT INTO customers (name, email, phone, company, location, address, status, avatar, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
        return stmt.run(
          customer.name,
          customer.email,
          customer.phone,
          customer.company,
          customer.location,
          customer.address,
          customer.status || "pending",
          customer.avatar,
          customer.notes,
        )
      },
      { id: 1, changes: 1 },
    )
  },

  update: (id, customer) => {
    return safeDbOperation(
      () => {
        const stmt = db.prepare(`
        UPDATE customers 
        SET name = ?, email = ?, phone = ?, company = ?, location = ?, 
            address = ?, status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
        return stmt.run(
          customer.name,
          customer.email,
          customer.phone,
          customer.company,
          customer.location,
          customer.address,
          customer.status,
          customer.notes,
          id,
        )
      },
      { changes: 1 },
    )
  },

  delete: (id) => {
    return safeDbOperation(
      () => {
        // First check if customer has orders
        const hasOrders = db.prepare("SELECT COUNT(*) as count FROM orders WHERE customer_id = ?").get(id).count > 0

        if (hasOrders) {
          // Either return error or handle by deleting related records first
          const transaction = db.transaction(() => {
            // Delete related order items first
            const orderIds = db
              .prepare("SELECT id FROM orders WHERE customer_id = ?")
              .all(id)
              .map((o) => o.id)
            for (const orderId of orderIds) {
              db.prepare("DELETE FROM order_items WHERE order_id = ?").run(orderId)
            }

            // Then delete orders
            db.prepare("DELETE FROM orders WHERE customer_id = ?").run(id)

            // Finally delete customer
            return db.prepare("DELETE FROM customers WHERE id = ?").run(id)
          })

          return transaction()
        } else {
          // If no orders, just delete the customer
          return db.prepare("DELETE FROM customers WHERE id = ?").run(id)
        }
      },
      { changes: 1 },
    )
  },

  search: (searchTerm, filters = {}) => {
    return safeDbOperation(() => {
      let query = `
        SELECT * FROM customers 
        WHERE (name LIKE ? OR email LIKE ? OR company LIKE ?)
      `
      const params = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]

      if (filters.status && filters.status !== "all") {
        query += " AND status = ?"
        params.push(filters.status)
      }

      if (filters.location && filters.location !== "all") {
        query += " AND location = ?"
        params.push(filters.location)
      }

      if (filters.minOrders) {
        query += " AND total_orders >= ?"
        params.push(Number.parseInt(filters.minOrders))
      }

      if (filters.maxOrders) {
        query += " AND total_orders <= ?"
        params.push(Number.parseInt(filters.maxOrders))
      }

      query += " ORDER BY created_at DESC"

      return db.prepare(query).all(...params)
    }, [])
  },
}

// Product operations
export const productOperations = {
  getAll: () => {
    return safeDbOperation(() => {
      return db
        .prepare(`
        SELECT p.*, c.name as category_name, s.name as supplier_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN suppliers s ON p.supplier_id = s.id
        ORDER BY p.created_at DESC
      `)
        .all()
    }, [])
  },

  getById: (id) => {
    return safeDbOperation(() => {
      return db
        .prepare(`
        SELECT p.*, c.name as category_name, s.name as supplier_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN suppliers s ON p.supplier_id = s.id
        WHERE p.id = ?
      `)
        .get(id)
    }, null)
  },

  create: (product) => {
    return safeDbOperation(
      () => {
        const stmt = db.prepare(`
        INSERT INTO products (name, sku, description, category_id, supplier_id, price, 
                             current_stock, min_stock, max_stock, status, image, rating)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
        return stmt.run(
          product.name,
          product.sku,
          product.description,
          product.category_id,
          product.supplier_id,
          product.price,
          product.current_stock,
          product.min_stock,
          product.max_stock,
          product.status,
          product.image,
          product.rating || 0,
        )
      },
      { id: 1, changes: 1 },
    )
  },

  update: (id, product) => {
    return safeDbOperation(
      () => {
        const stmt = db.prepare(`
        UPDATE products 
        SET name = ?, sku = ?, description = ?, category_id = ?, supplier_id = ?, 
            price = ?, current_stock = ?, min_stock = ?, max_stock = ?, 
            status = ?, image = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
        return stmt.run(
          product.name,
          product.sku,
          product.description,
          product.category_id,
          product.supplier_id,
          product.price,
          product.current_stock,
          product.min_stock,
          product.max_stock,
          product.status,
          product.image,
          id,
        )
      },
      { changes: 1 },
    )
  },

  delete: (id) => {
    return safeDbOperation(
      () => {
        return db.prepare("DELETE FROM products WHERE id = ?").run(id)
      },
      { changes: 1 },
    )
  },

  updateStock: (id, newStock) => {
    return safeDbOperation(
      () => {
        const stmt = db.prepare(`
        UPDATE products 
        SET current_stock = ?, 
            status = CASE 
              WHEN ? = 0 THEN 'out-of-stock'
              WHEN ? <= min_stock THEN 'low-stock'
              ELSE 'in-stock'
            END,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
        return stmt.run(newStock, newStock, newStock, id)
      },
      { changes: 1 },
    )
  },

  search: (searchTerm) => {
    return safeDbOperation(() => {
      return db
        .prepare(`
        SELECT p.*, c.name as category_name, s.name as supplier_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN suppliers s ON p.supplier_id = s.id
        WHERE p.name LIKE ? OR p.sku LIKE ? OR c.name LIKE ? OR s.name LIKE ?
        ORDER BY p.created_at DESC
      `)
        .all(`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`)
    }, [])
  },
}

// Order operations
export const orderOperations = {
  getAll: () => {
    return safeDbOperation(() => {
      return db
        .prepare(`
        SELECT o.*, c.name as customer_name, c.company as customer_company
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        ORDER BY o.created_at DESC
      `)
        .all()
    }, [])
  },

  getById: (id) => {
    return safeDbOperation(() => {
      return db
        .prepare(`
        SELECT o.*, c.name as customer_name, c.company as customer_company, c.email as customer_email
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        WHERE o.id = ?
      `)
        .get(id)
    }, null)
  },

  getOrderItems: (orderId) => {
    return safeDbOperation(() => {
      return db
        .prepare(`
        SELECT oi.*, p.name as product_name, p.sku as product_sku
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
      `)
        .all(orderId)
    }, [])
  },

  create: (order, items) => {
    return safeDbOperation(
      () => {
        const transaction = db.transaction(() => {
          // Insert order
          const orderStmt = db.prepare(`
          INSERT INTO orders (order_number, customer_id, total_amount, status, 
                             estimated_delivery, tracking_number, shipping_address, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `)

          const orderResult = orderStmt.run(
            order.order_number,
            order.customer_id,
            order.total_amount,
            order.status || "pending",
            order.estimated_delivery,
            order.tracking_number,
            order.shipping_address,
            order.notes,
          )

          // Insert order items
          const itemStmt = db.prepare(`
          INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
          VALUES (?, ?, ?, ?, ?)
        `)

          items.forEach((item) => {
            itemStmt.run(orderResult.lastInsertRowid, item.product_id, item.quantity, item.unit_price, item.total_price)

            // Update product stock
            productOperations.updateStock(item.product_id, item.current_stock - item.quantity)
          })

          return orderResult
        })

        return transaction()
      },
      { id: 1, changes: 1 },
    )
  },

  updateStatus: (id, status) => {
    return safeDbOperation(
      () => {
        return db
          .prepare(`
        UPDATE orders 
        SET status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
          .run(status, id)
      },
      { changes: 1 },
    )
  },

  search: (searchTerm) => {
    return safeDbOperation(() => {
      return db
        .prepare(`
        SELECT o.*, c.name as customer_name, c.company as customer_company
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        WHERE o.order_number LIKE ? OR c.name LIKE ? OR c.company LIKE ? OR o.tracking_number LIKE ?
        ORDER BY o.created_at DESC
      `)
        .all(`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`)
    }, [])
  },
}

// Notification operations
export const notificationOperations = {
  getAll: () => {
    return safeDbOperation(() => {
      return db.prepare("SELECT * FROM notifications ORDER BY created_at DESC").all()
    }, [])
  },

  create: (notification) => {
    return safeDbOperation(
      () => {
        const stmt = db.prepare(`
        INSERT INTO notifications (title, message, type, channel, recipient, status, priority)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
        return stmt.run(
          notification.title,
          notification.message,
          notification.type || "info",
          notification.channel || "system",
          notification.recipient,
          notification.status || "pending",
          notification.priority || "medium",
        )
      },
      { id: 1, changes: 1 },
    )
  },

  markAsRead: (id) => {
    return safeDbOperation(
      () => {
        return db
          .prepare(`
        UPDATE notifications 
        SET status = 'read', read_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
          .run(id)
      },
      { changes: 1 },
    )
  },

  delete: (id) => {
    return safeDbOperation(
      () => {
        return db.prepare("DELETE FROM notifications WHERE id = ?").run(id)
      },
      { changes: 1 },
    )
  },
}

// Settings operations
export const settingsOperations = {
  get: (category, key) => {
    return safeDbOperation(() => {
      return db.prepare("SELECT value FROM settings WHERE category = ? AND key = ?").get(category, key)
    }, null)
  },

  getByCategory: (category) => {
    return safeDbOperation(() => {
      return db.prepare("SELECT key, value FROM settings WHERE category = ?").all(category)
    }, [])
  },

  set: (category, key, value) => {
    return safeDbOperation(
      () => {
        const stmt = db.prepare(`
        INSERT OR REPLACE INTO settings (category, key, value, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      `)
        return stmt.run(category, key, value)
      },
      { changes: 1 },
    )
  },

  setMultiple: (settings) => {
    return safeDbOperation(
      () => {
        const transaction = db.transaction(() => {
          const stmt = db.prepare(`
          INSERT OR REPLACE INTO settings (category, key, value, updated_at)
          VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        `)

          settings.forEach(({ category, key, value }) => {
            stmt.run(category, key, value)
          })
        })

        return transaction()
      },
      { changes: settings.length },
    )
  },
}

// Security operations
export const securityOperations = {
  logEvent: (event) => {
    return safeDbOperation(
      () => {
        const stmt = db.prepare(`
        INSERT INTO security_events (event_type, user_id, user_name, action, ip_address, device, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
        return stmt.run(
          event.event_type,
          event.user_id,
          event.user_name,
          event.action,
          event.ip_address,
          event.device,
          event.status || "success",
        )
      },
      { id: 1, changes: 1 },
    )
  },

  getEvents: (limit = 100) => {
    return safeDbOperation(() => {
      return db
        .prepare(`
        SELECT * FROM security_events 
        ORDER BY created_at DESC 
        LIMIT ?
      `)
        .all(limit)
    }, [])
  },
}

// Backup operations
export const backupOperations = {
  create: (backup) => {
    return safeDbOperation(
      () => {
        const stmt = db.prepare(`
        INSERT INTO backup_history (type, size, status, duration, file_path)
        VALUES (?, ?, ?, ?, ?)
      `)
        return stmt.run(backup.type, backup.size, backup.status || "completed", backup.duration, backup.file_path)
      },
      { id: 1, changes: 1 },
    )
  },

  getHistory: () => {
    return safeDbOperation(() => {
      return db.prepare("SELECT * FROM backup_history ORDER BY created_at DESC").all()
    }, [])
  },
}

// Category operations
export const categoryOperations = {
  getAll: () => {
    return safeDbOperation(() => {
      return db.prepare("SELECT * FROM categories ORDER BY name").all()
    }, [
      { id: 1, name: "Erkaklar kiyimi" },
      { id: 2, name: "Ayollar kiyimi" },
      { id: 3, name: "Bolalar kiyimi" },
      { id: 4, name: "Aksessuarlar" },
    ])
  },
}

// Supplier operations
export const supplierOperations = {
  getAll: () => {
    return safeDbOperation(() => {
      return db.prepare("SELECT * FROM suppliers ORDER BY name").all()
    }, [
      { id: 1, name: "Fashion Wholesale Co." },
      { id: 2, name: "Textile Suppliers Ltd." },
    ])
  },
}

// Analytics operations
export const analyticsOperations = {
  getDashboardStats: () => {
    return safeDbOperation(
      () => {
        const totalCustomers = db.prepare("SELECT COUNT(*) as count FROM customers").get().count
        const totalProducts = db.prepare("SELECT COUNT(*) as count FROM products").get().count
        const totalOrders = db.prepare("SELECT COUNT(*) as count FROM orders").get().count

        // Fix the SQL query - use single quotes for string literals
        const totalRevenue =
          db.prepare("SELECT SUM(total_amount) as total FROM orders WHERE status = 'delivered'").get()?.total || 0

        // Fix other status queries with single quotes
        const lowStockProducts = db
          .prepare("SELECT COUNT(*) as count FROM products WHERE status = 'low-stock'")
          .get().count
        const outOfStockProducts = db
          .prepare("SELECT COUNT(*) as count FROM products WHERE status = 'out-of-stock'")
          .get().count

        const pendingOrders = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'").get().count
        const processingOrders = db
          .prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'processing'")
          .get().count
        const shippedOrders = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'shipped'").get().count
        const deliveredOrders = db
          .prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'delivered'")
          .get().count

        return {
          totalCustomers,
          totalProducts,
          totalOrders,
          totalRevenue,
          lowStockProducts,
          outOfStockProducts,
          pendingOrders,
          processingOrders,
          shippedOrders,
          deliveredOrders,
        }
      },
      {
        totalCustomers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        lowStockProducts: 0,
        outOfStockProducts: 0,
        pendingOrders: 0,
        processingOrders: 0,
        shippedOrders: 0,
        deliveredOrders: 0,
      },
    )
  },

  getRecentOrders: (limit = 5) => {
    return safeDbOperation(() => {
      return db
        .prepare(`
        SELECT o.*, c.name as customer_name
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        ORDER BY o.created_at DESC
        LIMIT ?
      `)
        .all(limit)
    }, [])
  },

  getTopProducts: (limit = 5) => {
    return safeDbOperation(() => {
      return db
        .prepare(`
        SELECT p.name, SUM(oi.quantity) as total_sold
        FROM products p
        JOIN order_items oi ON p.id = oi.product_id
        GROUP BY p.id, p.name
        ORDER BY total_sold DESC
        LIMIT ?
      `)
        .all(limit)
    }, [])
  },
}
