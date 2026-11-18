# Inventory and Data Management System

REST API built with **Node.js, Express.js, MongoDB (Mongoose) and dotenv** for managing a store/warehouse product catalogue.

## Features
- Mongoose schema with field-level validation (required, enum, min, regex, unique SKU)
- Full CRUD for products
- Filtering, sorting and pagination via query string
- Safe stock adjustment (restock / sale) using atomic `$inc`
- Low-stock alert report
- Category-wise inventory summary using an aggregation pipeline
- Centralized error handling and ObjectId validation middleware

## Setup
```bash
npm install
cp .env.example .env      # set MONGO_URI (local or Atlas)
npm run seed              # optional: insert 12 sample products
npm start                 # or: npm run dev
```
Server runs on `http://localhost:5000`.

## Product Schema
| Field | Type | Rules |
|---|---|---|
| name | String | required, 2-100 chars |
| sku | String | required, unique, uppercase, `[A-Z0-9-]{3,20}` |
| category | String | required, one of Electronics, Apparel, Furniture, Stationery, Grocery |
| price | Number | required, >= 0 |
| quantity | Number | required, integer, >= 0 |
| reorderLevel | Number | default 10, >= 0 |
| supplier | String | default "Unknown" |
| stockValue | Virtual | price x quantity |

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/products` | Create product |
| GET | `/api/products` | List with filter/sort/pagination |
| GET | `/api/products/:id` | Get single product |
| PUT | `/api/products/:id` | Update product details |
| PATCH | `/api/products/:id/stock` | Adjust stock, body `{ "change": 10 }` (negative = sale) |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/products/low-stock` | Products where quantity <= reorderLevel |
| GET | `/api/products/summary` | Category-wise aggregation |

### Query parameters for `GET /api/products`
`category`, `supplier`, `search`, `minPrice`, `maxPrice`, `inStock` (true/false), `sort` (e.g. `-price,name`), `page`, `limit`

Example: `/api/products?category=Electronics&minPrice=500&sort=-price&page=1&limit=5`

## Postman Screenshots
> Add your own screenshots in a `screenshots/` folder and update the paths below.

### 1. Get All Products
![Get All](c:\Users\Khushi\Downloads\01-get-all-products.jpeg)

### 2. Create Product
![Create](c:\Users\Khushi\Downloads\02-get-all-products.jpeg)

### 3. Update Product
![Update](c:\Users\Khushi\Downloads\03-get-all-products.jpeg)

### 4. Delete Product
![Delete](c:\Users\Khushi\Downloads\04-get-all-products.jpeg)

### 5. Low-Stock Report
![Low Stock](c:\Users\Khushi\Downloads\05-get-all-products.jpeg)

### 6. Category Summary
![Summary](c:\Users\Khushi\Downloads\06-get-all-products.jpeg)

### 7. Stock Adjustment (PATCH)
![Stock](c:\Users\Khushi\Downloads\07-get-all-products.jpeg)
