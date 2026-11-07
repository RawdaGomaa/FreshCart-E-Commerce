
# FreshCart – E-Commerce Web Application

A modern, responsive e-commerce web application built with **Next.js, React, TypeScript, and Tailwind CSS v4**. FreshCart provides a complete online shopping experience, including product browsing, categories, brands, wishlist management, shopping cart, checkout, and user account functionality.

## ✨ Features

- **Modern UI:** Clean, responsive, and user-friendly interface.
- **Product Catalog:** Browse products and explore product details.
- **Categories & Brands:** Discover products through organized categories and brands.
- **Search & Filtering:** Search and filter available products.
- **Wishlist:** Save favorite products for later.
- **Shopping Cart:** Add, remove, and manage products in the cart.
- **Authentication:** Login, registration, and password recovery.
- **Checkout:** Support for cash and online payment methods.
- **Orders:** Access order-related functionality.
- **Responsive Design:** Optimized for different screen sizes.

## 🛠 Technologies Used

- Next.js (App Router)
- React.js
- TypeScript
- Tailwind CSS v4
- CSS
- Route E-Commerce API
- Local Storage

## 📄 Application Pages & Routes

| Page | Route |
|---|---|
| Home | `/` |
| Shop | `/products` |
| Product Details | `/products/[id]` |
| Categories | `/categories` |
| Category Details | `/categories/[id]` |
| Brands | `/brands` |
| Brand Details | `/brands/[id]` |
| Wishlist | `/wishlist` |
| Shopping Cart | `/cart` |
| Checkout | `/checkout` |
| Orders | `/orders` |
| User Profile | `/profile` |
| Login | `/login` |
| Register | `/register` |
| Forgot Password | `/forgot-password` |
| Verify Code | `/verify-code` |
| Reset Password | `/reset-password` |

## 📁 Project Structure

```text
FreshCart/
│
├── app/
│   ├── [...slug]/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── Reusable UI Components
│
├── lib/
│   └── API and Utility Functions
│
├── public/
│   └── Static Assets
│
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── next-env.d.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js 20 or later
- npm
- Visual Studio Code

### Installation

1. Clone the repository:

```bash
git clone https://github.com/RawdaGomaa/FreshCart-E-Commerce.git
```

2. Navigate to the project directory:

```bash
cd FreshCart-E-Commerce
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit:

```text
http://localhost:3000
```

## 🔗 API Integration

The application integrates with the Route E-Commerce API:

```text
https://ecommerce.routemisr.com/api/v1
```

The API is used to retrieve product information, categories, brands, and handle authenticated shopping operations.

## 📝 Important Notes

- Products, categories, and brands are loaded from the API.
- Cart and wishlist operations require an authenticated account.
- Cash and online checkout use separate order endpoints.
- Online checkout redirects users to the payment provider.
- Authentication tokens are stored in browser Local Storage in this coursework implementation.
- Search and filtering operate on products loaded on the active pagination page.
- Newsletter functionality is currently informational and does not process subscriptions.

## 🎓 Project Information

FreshCart is a coursework project focused on implementing a modern e-commerce application using Next.js and modern frontend technologies.

---

**Developed with ❤️ using Next.js, React, and TypeScript.**
