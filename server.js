import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// In-memory database
let shops = [
  { id: 1, name: 'ABC Store', firm_code: 'SHOP001' },
  { id: 2, name: 'XYZ Market', firm_code: 'SHOP002' },
  { id: 3, name: 'Demo Shop', firm_code: 'DEMO123' },
]

let sales = [
  {
    id: 1,
    date: '2026-06-01',
    item_name: 'A',
    qty: 10,
    rate: 50,
    amount: 500,
  },
  {
    id: 2,
    date: '2026-06-02',
    item_name: 'B',
    qty: 20,
    rate: 75,
    amount: 1500,
  },
  {
    id: 3,
    date: '2026-06-03',
    item_name: 'A',
    qty: 15,
    rate: 50,
    amount: 750,
  },
]

let saleIdCounter = sales.length + 1

// Shop Login API
app.post('/api/shop/login', (req, res) => {
  const { firm_code } = req.body

  if (!firm_code) {
    return res.json({
      success: false,
      message: 'Firm Code is required',
    })
  }

  const shop = firm.find((s) => s.firm_code === firm_code)

  if (shop) {
    return res.json({
      success: true,
      shop,
    })
  }

  res.json({
    success: false,
    message: 'Wrong Firm Code',
  })
})

// Get all sales
app.get('/api/sales', (req, res) => {
  res.json(sales)
})

// Add new sale
app.post('/api/sales', (req, res) => {
  const { date, item_name, qty, rate, amount } = req.body

  // Validate input
  if (!date || !item_name || !qty || !rate) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    })
  }

  // Validate numbers
  if (Number(qty) <= 0 || Number(rate) <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Qty and Rate must be greater than 0',
    })
  }

  const newSale = {
    id: saleIdCounter++,
    date,
    item_name,
    qty: Number(qty),
    rate: Number(rate),
    amount: Number(amount),
  }

  sales.push(newSale)

  res.json({
    success: true,
    message: 'Sale Added',
    sale: newSale,
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'API Server is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`)
  console.log(`
📊 Sales Reporting System API

Available Endpoints:
  POST /api/shop/login       - Login with firm code
  GET  /api/sales            - Fetch all sales
  POST /api/sales            - Add new sale
  GET  /health               - Health check

Demo Firm Codes for Testing:
  - SHOP001 (ABC Store)
  - SHOP002 (XYZ Market)
  - DEMO123 (Demo Shop)
  `)
})
