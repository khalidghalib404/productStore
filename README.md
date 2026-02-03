# bekhar - Modern Product Store

A full-stack e-commerce application built with React, Express, and PostgreSQL. Features a beautiful UI with theme switching, shopping cart functionality, and secure API endpoints.

![bekhar Store](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

- 🛍️ **Product Management**: Full CRUD operations for products
- 🛒 **Shopping Cart**: Add products to cart with quantity management
- 🎨 **Theme Switching**: Multiple beautiful themes powered by DaisyUI
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🔒 **Security**: Protected with Arcjet rate limiting and security features
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development
- 🎯 **Modern UI**: Beautiful animations and transitions
- 💾 **PostgreSQL Database**: Reliable data storage with Neon

## 🚀 Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Utility-first CSS
- **DaisyUI** - Component library
- **Zustand** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### Backend

- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Database (Neon)
- **Arcjet** - Security & rate limiting
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Morgan** - HTTP request logger

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Neon recommended)
- Arcjet account (for security features)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ProductStore
```

### 2. Install dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

Or use the convenience script:

```bash
npm run install-all
```

### 3. Set up environment variables

#### Backend (.env in root)

```env
PORT=3001
NODE_ENV=development

# Database Configuration
PGUSER=your_database_user
PGPASSWORD=your_database_password
PGHOST=your_database_host
PGDATABASE=your_database_name

# Arcjet Configuration
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

#### Frontend (frontend/.env)

```env
VITE_API_URL=http://localhost:3001
```

### 4. Set up the database

Run this SQL in your PostgreSQL database:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🏃 Running the Application

### Development Mode

#### Run backend only:

```bash
npm run dev
```

#### Run frontend only:

```bash
npm run dev-frontend
```

#### Run both concurrently:

```bash
npm run dev-all
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## 📦 Building for Production

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 🎨 Features Overview

### Product Management

- View all products in a beautiful grid layout
- Add new products with image URLs
- Delete products with confirmation
- View detailed product pages
- Real-time updates

### Shopping Cart

- Add products to cart from product cards or detail pages
- Adjust quantities
- View cart count in navbar
- Persistent cart state
- Stock validation

### Theme System

- Multiple pre-built themes
- Smooth theme transitions
- Persistent theme selection
- Beautiful color schemes

### Security

- Rate limiting with Arcjet
- CORS protection
- Helmet security headers
- Input validation
- SQL injection protection

## 📁 Project Structure

```
ProductStore/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── Controllers/
│   │   └── productController.js # Product CRUD operations
│   ├── lib/
│   │   └── arcjet.js          # Security configuration
│   ├── routes/
│   │   └── productRouts.js    # API routes
│   └── server.js              # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCards.jsx
│   │   │   ├── addProductMode.jsx
│   │   │   ├── LoadingAnimation.jsx
│   │   │   └── ThemeSelectior.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── ProductPage.jsx
│   │   ├── stores/
│   │   │   ├── useProductStore.js
│   │   │   ├── useCartStore.js
│   │   │   └── themeStore.js
│   │   ├── hooks/
│   │   │   └── useTheme.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── .env.example
├── .gitignore
├── package.json
├── DEPLOYMENT.md
└── README.md
```

## 🔧 API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Request/Response Examples

#### Create Product

```json
POST /api/products
{
  "name": "Product Name",
  "price": 29.99,
  "image": "https://example.com/image.jpg",
  "description": "Product description",
  "category": "Electronics",
  "stock": 10
}
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options

- **Vercel** (Frontend) + **Railway** (Backend)
- **Netlify** (Frontend) + **Render** (Backend)
- **Single platform** deployment (Railway, Render, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - bekhar Store

## 🙏 Acknowledgments

- DaisyUI for the beautiful component library
- Neon for the PostgreSQL database
- Arcjet for security features
- All open-source contributors

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

Made with ❤️ by bekhar team
