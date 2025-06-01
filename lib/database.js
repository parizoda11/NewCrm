import Database from "better-sqlite3"
import { join } from "path"
import { existsSync, mkdirSync } from "fs"

// Create data directory if it doesn't exist
const dataDir = join(process.cwd(), "data")
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

const dbPath = join(dataDir, "crm.db")
const db = new Database(dbPath)

// Enable foreign keys
db.pragma("foreign_keys = ON")

// Initialize database schema
export function initializeDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Customers table
  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      company TEXT,
      location TEXT,
      address TEXT,
      status TEXT DEFAULT 'pending',
      total_orders INTEGER DEFAULT 0,
      total_spent REAL DEFAULT 0,
      last_order DATE,
      avatar TEXT,
      rating INTEGER DEFAULT 0,
      join_date DATE DEFAULT CURRENT_DATE,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Categories table
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Suppliers table
  db.exec(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      sku TEXT UNIQUE NOT NULL,
      description TEXT,
      category_id INTEGER,
      supplier_id INTEGER,
      price REAL NOT NULL,
      current_stock INTEGER DEFAULT 0,
      min_stock INTEGER DEFAULT 0,
      max_stock INTEGER DEFAULT 100,
      status TEXT DEFAULT 'in-stock',
      trend TEXT DEFAULT 'stable',
      image TEXT,
      rating INTEGER DEFAULT 0,
      last_restocked DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories (id),
      FOREIGN KEY (supplier_id) REFERENCES suppliers (id)
    )
  `)

  // Orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      customer_id INTEGER NOT NULL,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      order_date DATE DEFAULT CURRENT_DATE,
      estimated_delivery DATE,
      tracking_number TEXT,
      shipping_address TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers (id)
    )
  `)

  // Order items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      total_price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products (id)
    )
  `)

  // Notifications table
  db.exec(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      type TEXT DEFAULT 'info',
      channel TEXT DEFAULT 'system',
      recipient TEXT,
      status TEXT DEFAULT 'pending',
      priority TEXT DEFAULT 'medium',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      read_at DATETIME
    )
  `)

  // Security events table
  db.exec(`
    CREATE TABLE IF NOT EXISTS security_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      user_id INTEGER,
      user_name TEXT,
      action TEXT NOT NULL,
      ip_address TEXT,
      device TEXT,
      status TEXT DEFAULT 'success',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Settings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(category, key)
    )
  `)

  // Backup history table
  db.exec(`
    CREATE TABLE IF NOT EXISTS backup_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      size TEXT,
      status TEXT DEFAULT 'completed',
      duration TEXT,
      file_path TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  console.log("Database initialized successfully")
}

// Seed initial data with comprehensive statistics
export function seedDatabase() {
  // Insert default categories
  const insertCategory = db.prepare("INSERT OR IGNORE INTO categories (name, description) VALUES (?, ?)")
  const categories = [
    // Asosiy kategoriyalar
    ["Erkaklar kiyimi", "Erkaklar uchun barcha turdagi kiyim-kechak"],
    ["Ayollar kiyimi", "Ayollar uchun barcha turdagi kiyim-kechak"],
    ["Bolalar kiyimi", "Bolalar uchun barcha turdagi kiyim-kechak"],

    // Kiyim turlari
    ["Ko'ylaklar", "Turli xil ko'ylaklar va bluzalar"],
    ["Shimlar", "Jins, klassik va sport shimlar"],
    ["Kurtkalar", "Qishki va yozgi kurtkalar"],
    ["Liboslar", "Ayollar uchun liboslar"],
    ["Kostyumlar", "Rasmiy va biznes kostyumlar"],

    // Mavsumiy kiyimlar
    ["Yozgi kiyim", "Yoz mavsumi uchun yengil kiyimlar"],
    ["Qishki kiyim", "Qish mavsumi uchun issiq kiyimlar"],
    ["Kuzgi kiyim", "Kuz mavsumi uchun o'rta kiyimlar"],
    ["Bahorgi kiyim", "Bahor mavsumi uchun yengil kiyimlar"],

    // Maxsus kategoriyalar
    ["Sport kiyimi", "Sport va fitnes uchun kiyimlar"],
    ["Ish kiyimi", "Ish joyi uchun rasmiy kiyimlar"],
    ["Kechki kiyim", "Maxsus tadbirlar uchun kiyimlar"],
    ["Uyda kiyish", "Uy uchun qulay kiyimlar"],

    // Aksessuarlar
    ["Aksessuarlar", "Turli aksessuarlar va qo'shimchalar"],
    ["Sumkalar", "Qo'l sumkalari va ryukzaklar"],
    ["Poyabzal", "Turli xil poyabzallar"],
    ["Bosh kiyim", "Shlyapalar va boshpanalar"],
    ["Kamarlar", "Turli xil kamarlar"],

    // Ichki kiyim
    ["Ichki kiyim", "Erkaklar va ayollar ichki kiyimi"],
    ["Uyqu kiyimi", "Pijama va uyqu kiyimlari"],

    // Yoshga ko'ra
    ["Chaqaloq kiyimi", "0-2 yosh chaqaloqlar uchun"],
    ["Bolalar kiyimi (3-12)", "3-12 yosh bolalar uchun"],
    ["O'smirlar kiyimi", "13-18 yosh o'smirlar uchun"],

    // Premium kategoriyalar
    ["Premium kiyim", "Yuqori sifatli va qimmat kiyimlar"],
    ["Dizayner kiyim", "Mashhur brendlar va dizaynerlar"],
    ["Eksklyuziv", "Cheklangan miqdordagi maxsus kiyimlar"],
  ]

  categories.forEach(([name, description]) => {
    insertCategory.run(name, description)
  })

  // Insert default suppliers
  const insertSupplier = db.prepare("INSERT OR IGNORE INTO suppliers (name, email, phone, address) VALUES (?, ?, ?, ?)")
  const suppliers = [
    ["Fashion Textile LLC", "info@fashiontextile.uz", "+998712345678", "Toshkent, O'zbekiston"],
    ["Elegant Designs", "contact@elegantdesigns.uz", "+998712345679", "Samarqand, O'zbekiston"],
    ["Kids Fashion Co", "info@kidsfashion.uz", "+998712345680", "Buxoro, O'zbekiston"],
    ["Winter Wear Ltd", "sales@winterwear.uz", "+998712345681", "Namangan, O'zbekiston"],
    ["Business Attire Inc", "info@businessattire.uz", "+998712345682", "Andijon, O'zbekiston"],
    ["Sport Style Co", "contact@sportstyle.uz", "+998712345683", "Farg'ona, O'zbekiston"],
    ["Luxury Fashion House", "info@luxuryfashion.uz", "+998712345684", "Qarshi, O'zbekiston"],
    ["Textile Masters", "sales@textilemasters.uz", "+998712345685", "Urganch, O'zbekiston"],
    ["Fashion Forward", "info@fashionforward.uz", "+998712345686", "Nukus, O'zbekiston"],
    ["Style Innovations", "contact@styleinnovations.uz", "+998712345687", "Termiz, O'zbekiston"],
  ]

  suppliers.forEach(([name, email, phone, address]) => {
    insertSupplier.run(name, email, phone, address)
  })

  // Insert comprehensive customer data
  const insertCustomer = db.prepare(`
    INSERT OR IGNORE INTO customers 
    (name, email, phone, company, location, address, status, total_orders, total_spent, last_order, avatar, rating, notes) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const customers = [
    [
      "Aziz Karimov",
      "aziz@fashionstore.uz",
      "+998901234567",
      "Fashion Store LLC",
      "Toshkent",
      "Chilonzor tumani, Bunyodkor ko'chasi 12-uy",
      "active",
      45,
      125000,
      "2024-01-15",
      "AK",
      5,
      "VIP mijoz, katta hajmdagi buyurtmalar beradi",
    ],
    [
      "Malika Rahimova",
      "malika@stylehouse.uz",
      "+998907654321",
      "Style House",
      "Samarqand",
      "Registon ko'chasi 45-uy",
      "active",
      32,
      89000,
      "2024-01-12",
      "MR",
      4,
      "Muntazam mijoz, sifatli mahsulotlarni afzal ko'radi",
    ],
    [
      "Bobur Toshmatov",
      "bobur@trendy.uz",
      "+998909876543",
      "Trendy Fashion",
      "Buxoro",
      "Mustaqillik ko'chasi 78-uy",
      "active",
      28,
      67000,
      "2024-01-08",
      "BT",
      4,
      "Yaxshi mijoz, o'rta hajmdagi buyurtmalar",
    ],
    [
      "Nilufar Saidova",
      "nilufar@elegance.uz",
      "+998905432109",
      "Elegance Boutique",
      "Namangan",
      "Uychi ko'chasi 23-uy",
      "active",
      67,
      198000,
      "2024-01-14",
      "NS",
      5,
      "Eng yaxshi mijozlarimizdan biri, premium mahsulotlar sotib oladi",
    ],
    [
      "Sardor Alimov",
      "sardor@wholesale.uz",
      "+998901111111",
      "Wholesale Fashion",
      "Andijon",
      "Navoi ko'chasi 56-uy",
      "active",
      23,
      45000,
      "2024-01-10",
      "SA",
      3,
      "Yangi mijoz, kichik buyurtmalar beradi",
    ],
    [
      "Feruza Karimova",
      "feruza@boutique.uz",
      "+998902222222",
      "Luxury Boutique",
      "Farg'ona",
      "Mustaqillik ko'chasi 89-uy",
      "active",
      41,
      156000,
      "2024-01-13",
      "FK",
      5,
      "Premium mijoz, sifatli mahsulotlarni sotib oladi",
    ],
    [
      "Jasur Rahmonov",
      "jasur@fashion.uz",
      "+998903333333",
      "Fashion Center",
      "Qarshi",
      "Amir Temur ko'chasi 34-uy",
      "pending",
      8,
      12000,
      "2024-01-05",
      "JR",
      2,
      "Yangi mijoz, test buyurtmalar",
    ],
    [
      "Gulnora Tursunova",
      "gulnora@style.uz",
      "+998904444444",
      "Style Studio",
      "Nukus",
      "Doslik ko'chasi 67-uy",
      "active",
      19,
      34000,
      "2024-01-09",
      "GT",
      4,
      "Yaxshi mijoz, muntazam buyurtmalar",
    ],
    [
      "Otabek Normatov",
      "otabek@clothing.uz",
      "+998905555555",
      "Clothing World",
      "Termiz",
      "Ipak yo'li ko'chasi 12-uy",
      "active",
      35,
      78000,
      "2024-01-11",
      "ON",
      4,
      "Faol mijoz, turli kategoriyalardan sotib oladi",
    ],
    [
      "Zarina Abdullayeva",
      "zarina@fashion.uz",
      "+998906666666",
      "Fashion Plaza",
      "Urganch",
      "Al-Xorazmiy ko'chasi 45-uy",
      "active",
      52,
      134000,
      "2024-01-16",
      "ZA",
      5,
      "Eng faol mijozlardan biri, katta hajmdagi buyurtmalar",
    ],
  ]

  customers.forEach((customer) => {
    insertCustomer.run(...customer)
  })

  // Insert comprehensive product data
  const insertProduct = db.prepare(`
    INSERT OR IGNORE INTO products 
    (name, sku, description, category_id, supplier_id, price, current_stock, min_stock, max_stock, status, trend, image, rating, last_restocked) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const products = [
    // Erkaklar kiyimi
    [
      "Erkaklar klassik ko'ylagi",
      "MCS-001",
      "Yuqori sifatli paxta materialidan tayyorlangan klassik erkaklar ko'ylagi",
      1,
      1,
      45,
      150,
      50,
      300,
      "in-stock",
      "up",
      "👔",
      5,
      "2024-01-10",
    ],
    [
      "Erkaklar biznes kostyumi",
      "MBS-002",
      "Rasmiy tadbirlar uchun professional kostyum",
      1,
      5,
      200,
      45,
      15,
      80,
      "in-stock",
      "up",
      "🤵",
      5,
      "2024-01-14",
    ],
    [
      "Erkaklar jins shim",
      "MJP-003",
      "Zamonaviy dizayndagi jins shim",
      1,
      1,
      65,
      80,
      30,
      150,
      "in-stock",
      "stable",
      "👖",
      4,
      "2024-01-12",
    ],
    [
      "Erkaklar sport kiyimi",
      "MSW-004",
      "Sport va fitnes uchun qulay kiyim",
      1,
      6,
      35,
      120,
      40,
      200,
      "in-stock",
      "up",
      "🏃",
      4,
      "2024-01-11",
    ],

    // Ayollar kiyimi
    [
      "Ayollar yozgi libosi",
      "WSD-005",
      "Yengil va qulay yozgi libos, turli ranglarda mavjud",
      2,
      2,
      65,
      25,
      30,
      200,
      "low-stock",
      "down",
      "👗",
      4,
      "2024-01-08",
    ],
    [
      "Ayollar biznes kostyumi",
      "WBS-006",
      "Professional ayollar uchun biznes kostyumi",
      2,
      5,
      180,
      35,
      20,
      100,
      "in-stock",
      "stable",
      "👩‍💼",
      5,
      "2024-01-13",
    ],
    [
      "Ayollar kechki libosi",
      "WED-007",
      "Maxsus tadbirlar uchun elegant libos",
      2,
      7,
      250,
      15,
      10,
      50,
      "in-stock",
      "up",
      "👰",
      5,
      "2024-01-15",
    ],
    [
      "Ayollar sport kiyimi",
      "WSW-008",
      "Yoga va fitnes uchun sport kiyimi",
      2,
      6,
      40,
      90,
      35,
      180,
      "in-stock",
      "up",
      "🤸‍♀️",
      4,
      "2024-01-09",
    ],

    // Bolalar kiyimi
    [
      "Bolalar sport kiyimi",
      "KSW-009",
      "Faol bolalar uchun qulay va chidamli sport kiyimi",
      3,
      3,
      35,
      0,
      20,
      150,
      "out-of-stock",
      "down",
      "👕",
      3,
      "2024-01-05",
    ],
    [
      "Bolalar maktab formasi",
      "KSU-010",
      "Maktab uchun rasmiy forma",
      3,
      3,
      55,
      60,
      25,
      120,
      "in-stock",
      "stable",
      "🎒",
      4,
      "2024-01-10",
    ],
    [
      "Chaqaloq kiyimi",
      "BCL-011",
      "0-2 yosh chaqaloqlar uchun yumshoq kiyim",
      3,
      3,
      25,
      40,
      20,
      100,
      "in-stock",
      "up",
      "👶",
      5,
      "2024-01-12",
    ],

    // Qishki kiyim
    [
      "Qishki kurtka",
      "WJK-012",
      "Issiq va suv o'tkazmaydigan qishki kurtka",
      10,
      4,
      120,
      80,
      25,
      120,
      "in-stock",
      "stable",
      "🧥",
      4,
      "2024-01-12",
    ],
    [
      "Qishki palto",
      "WCT-013",
      "Elegant qishki palto",
      10,
      4,
      180,
      30,
      15,
      80,
      "in-stock",
      "up",
      "🧥",
      5,
      "2024-01-14",
    ],

    // Aksessuarlar
    [
      "Qo'l sumkasi",
      "HBG-014",
      "Ayollar uchun zamonaviy qo'l sumkasi",
      17,
      7,
      85,
      45,
      20,
      100,
      "in-stock",
      "up",
      "👜",
      4,
      "2024-01-11",
    ],
    [
      "Erkaklar kamari",
      "MBT-015",
      "Yuqori sifatli teri kamar",
      20,
      1,
      35,
      70,
      30,
      150,
      "in-stock",
      "stable",
      "👔",
      4,
      "2024-01-13",
    ],
    [
      "Ayollar poyabzali",
      "WSH-016",
      "Zamonaviy dizayndagi ayollar poyabzali",
      18,
      2,
      95,
      55,
      25,
      120,
      "in-stock",
      "up",
      "👠",
      5,
      "2024-01-15",
    ],

    // Premium kiyim
    [
      "Premium erkaklar kostyumi",
      "PMS-017",
      "Yuqori sifatli premium kostyum",
      25,
      7,
      450,
      12,
      5,
      30,
      "in-stock",
      "up",
      "🤵",
      5,
      "2024-01-16",
    ],
    [
      "Dizayner libosi",
      "DDR-018",
      "Mashhur dizayner tomonidan yaratilgan libos",
      26,
      7,
      380,
      8,
      3,
      20,
      "low-stock",
      "up",
      "👗",
      5,
      "2024-01-14",
    ],

    // Sport kiyimi
    [
      "Futbol forması",
      "SFU-019",
      "Professional futbol forması",
      13,
      6,
      55,
      100,
      40,
      200,
      "in-stock",
      "stable",
      "⚽",
      4,
      "2024-01-10",
    ],
    [
      "Yoga kiyimi",
      "SYG-020",
      "Yoga va meditatsiya uchun qulay kiyim",
      13,
      6,
      45,
      75,
      30,
      150,
      "in-stock",
      "up",
      "🧘‍♀️",
      4,
      "2024-01-12",
    ],
  ]

  products.forEach((product) => {
    insertProduct.run(...product)
  })

  // Insert comprehensive order data
  const insertOrder = db.prepare(`
    INSERT OR IGNORE INTO orders 
    (order_number, customer_id, total_amount, status, order_date, estimated_delivery, tracking_number, shipping_address) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const orders = [
    // Delivered orders
    ["ORD-001", 1, 15000, "delivered", "2024-01-01", "2024-01-08", "TRK123456789", "Toshkent, Chilonzor tumani"],
    ["ORD-002", 2, 22000, "delivered", "2024-01-02", "2024-01-09", "TRK987654321", "Samarqand, Registon ko'chasi"],
    ["ORD-003", 4, 35000, "delivered", "2024-01-03", "2024-01-10", "TRK789123456", "Namangan, Navoi ko'chasi"],
    ["ORD-004", 6, 28000, "delivered", "2024-01-04", "2024-01-11", "TRK456789123", "Farg'ona, Mustaqillik ko'chasi"],
    ["ORD-005", 10, 19000, "delivered", "2024-01-05", "2024-01-12", "TRK321654987", "Urganch, Al-Xorazmiy ko'chasi"],

    // Shipped orders
    ["ORD-006", 1, 18000, "shipped", "2024-01-10", "2024-01-18", "TRK111222333", "Toshkent, Chilonzor tumani"],
    ["ORD-007", 3, 12000, "shipped", "2024-01-11", "2024-01-19", "TRK444555666", "Buxoro, Markaziy ko'cha"],
    ["ORD-008", 5, 8500, "shipped", "2024-01-12", "2024-01-20", "TRK777888999", "Andijon, Navoi ko'chasi"],

    // Processing orders
    ["ORD-009", 2, 25000, "processing", "2024-01-13", "2024-01-21", "TRK000111222", "Samarqand, Registon ko'chasi"],
    ["ORD-010", 8, 14000, "processing", "2024-01-14", "2024-01-22", "TRK333444555", "Nukus, Doslik ko'chasi"],
    ["ORD-011", 9, 16000, "processing", "2024-01-15", "2024-01-23", "TRK666777888", "Termiz, Ipak yo'li ko'chasi"],

    // Pending orders
    ["ORD-012", 7, 5500, "pending", "2024-01-16", "2024-01-24", "TRK999000111", "Qarshi, Amir Temur ko'chasi"],
    ["ORD-013", 3, 9200, "pending", "2024-01-17", "2024-01-25", "TRK222333444", "Buxoro, Markaziy ko'cha"],
    ["ORD-014", 5, 7800, "pending", "2024-01-18", "2024-01-26", "TRK555666777", "Andijon, Navoi ko'chasi"],
    ["ORD-015", 6, 21000, "pending", "2024-01-19", "2024-01-27", "TRK888999000", "Farg'ona, Mustaqillik ko'chasi"],
  ]

  orders.forEach((order) => {
    insertOrder.run(...order)
  })

  // Insert order items for realistic statistics
  const insertOrderItem = db.prepare(`
    INSERT OR IGNORE INTO order_items 
    (order_id, product_id, quantity, unit_price, total_price) 
    VALUES (?, ?, ?, ?, ?)
  `)

  const orderItems = [
    // Order 1 items
    [1, 1, 10, 45, 450],
    [1, 3, 8, 65, 520],
    [1, 15, 5, 35, 175],

    // Order 2 items
    [2, 2, 3, 200, 600],
    [2, 5, 4, 65, 260],
    [2, 14, 2, 85, 170],

    // Order 3 items
    [3, 7, 2, 250, 500],
    [3, 17, 1, 450, 450],
    [3, 16, 3, 95, 285],

    // Order 4 items
    [4, 6, 2, 180, 360],
    [4, 8, 5, 40, 200],
    [4, 12, 1, 120, 120],

    // Order 5 items
    [5, 4, 6, 35, 210],
    [5, 19, 4, 55, 220],
    [5, 20, 3, 45, 135],
  ]

  orderItems.forEach((item) => {
    insertOrderItem.run(...item)
  })

  // Insert default settings
  const insertSetting = db.prepare("INSERT OR IGNORE INTO settings (category, key, value) VALUES (?, ?, ?)")
  const settings = [
    ["store", "name", "CloudCRM Wholesale"],
    ["store", "email", "info@cloudcrm.uz"],
    ["store", "phone", "+998712345678"],
    ["store", "currency", "USD"],
    ["store", "timezone", "Asia/Tashkent"],
    ["store", "language", "uz"],
    ["notifications", "email_enabled", "true"],
    ["notifications", "sms_enabled", "true"],
    ["security", "two_factor_auth", "true"],
    ["security", "session_timeout", "30"],
  ]

  settings.forEach(([category, key, value]) => {
    insertSetting.run(category, key, value)
  })

  // Insert sample notifications
  const insertNotification = db.prepare(`
    INSERT OR IGNORE INTO notifications 
    (title, message, type, channel, recipient, status, priority) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  const notifications = [
    [
      "Kam qolgan mahsulot",
      "Ayollar yozgi libosi (WSD-005) kam qoldi - faqat 25 dona",
      "warning",
      "inventory",
      "admin",
      "pending",
      "high",
    ],
    ["Tugagan mahsulot", "Bolalar sport kiyimi (KSW-009) tugadi", "error", "inventory", "admin", "pending", "high"],
    ["Yangi buyurtma", "Yangi buyurtma #ORD-015 qabul qilindi", "info", "orders", "admin", "read", "medium"],
    ["Yetkazib berish", "Buyurtma #ORD-006 yetkazib berildi", "success", "delivery", "admin", "read", "low"],
  ]

  notifications.forEach((notification) => {
    insertNotification.run(...notification)
  })

  console.log("Database seeded successfully with comprehensive data")
}

// Initialize database on import
initializeDatabase()
seedDatabase()

export default db
