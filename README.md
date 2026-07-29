
# 🍰 Noelle Cakes — Website & Custom Admin CMS

[![Production Deploy](https://img.shields.io/badge/Vercel-Deployed-success?style=flat&logo=vercel)](https://www.noellecakes.et)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase)](https://supabase.com/)

> 🌐 **LIVE PRODUCTION SITE:** [https://www.noellecakes.et](https://www.noellecakes.et)

A public-facing showcase catalog and custom Content Management System (CMS) custom-built for **Noelle Cakes**. This platform allows customers to explore menu offerings and daily specials, while providing a secure, no-code admin dashboard for the shop owner to manage categories, items, and specials independently.

---

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Performance & Optimization Highlights](#-performance--optimization-highlights)
- [Database Architecture & Security](#-database-architecture--security)
- [Local Development Setup](#-local-development-setup)
- [Project Structure](#-project-structure)
- [Completed Build Phases](#-completed-build-phases)

---

## 🎯 Project Overview

Noelle Cakes needed a digital catalog to showcase their artisanal tortas, custom layer cakes, and fresh daily pastries. The shop operates as a showcase catalog rather than an online store (no online payments or cart). 

### Core Client Requirements:
1. **"What's Inside" Descriptions:** Detailed ingredient and recipe descriptions for every product card.
2. **Persistent Daily Specials:** A visually distinct "Today's Specials" area that persists previous specials automatically if the owner forgets to update them, ensuring the section never goes blank.
3. **Owner Autonomy:** A secure admin portal allowing the owner (Betty) to add, edit, or delete items and categories without developer assistance.

---

## ✨ Key Features

### 🌐 Public-Facing Catalog
* **Modular Single-Page Scrolling:** Smooth anchor navigation between Hero, Our Story, Today's Specials, Menu Categories, Location, and Contact sections.
* **Interactive Specials Carousel:** Built with `embla-carousel-react` featuring autoplay, touch swipe, manual navigation controls, and persistent fallback logic.
* **Category & Item Detail Views:** Dedicated routes (`/menu/:category`, `/menu/:category/:item`, `/specials/:item`) highlighting recipe details ("what's inside").
* **Responsive Mobile-First UI:** Custom slide-down hamburger menu and mobile-optimized layouts tailored for phone visitors.

### 🔐 Auth-Gated Admin CMS (`/admin`)
* **Secure Authentication:** Gated behind Supabase Auth with session persistence and route guards (`ProtectedRoute.jsx`).
* **Live Dashboard Metrics:** Overview cards displaying real-time database counts for active categories, menu items, and specials.
* **Category CRUD:** Create, edit, reorder, and delete categories with foreign key constraints (`ON DELETE RESTRICT` prevents accidental deletion of populated categories).
* **Menu Item CRUD:** Create, edit, and delete items with price formatting, category assignments, and "what's inside" descriptions.
* **1-Click Specials Manager:** Dedicated interface to instantly promote or demote menu items to "Today's Special".

---

## 🛠 Tech Stack

* **Frontend Framework:** React + Vite (JavaScript)
* **Styling Engine:** Tailwind CSS v4 (utilizing CSS `@theme` variables for brand colors and fonts)
* **Routing:** `react-router-dom` (Public layout + Protected Admin nested routes)
* **Database & Authentication:** Supabase (PostgreSQL, Row-Level Security, Auth)
* **Image Storage:** Supabase Storage (`menu-images` public bucket)
* **UI Components & Carousel:** `embla-carousel-react`, `embla-carousel-autoplay`
* **Hosting & CDN:** Vercel (Custom DNS configuration on `www.noellecakes.et` with auto SSL)

---

## ⚡ Performance & Optimization Highlights

In accordance with the project's **Performance Optimization Plan**:
* **Client-Side Canvas Image Compression:** Uploaded camera images are automatically resized (max 1000px) and converted to high-efficiency `.webp` format directly in the browser before being sent to Supabase Storage—reducing file sizes by **50–80%** with no visible quality loss.
* **Self-Hosted Local Fonts:** Brand display fonts (*Happy Lucky*, *Gabriola*) are self-hosted via Vite's asset pipeline with `font-display: swap` configured to eliminate render-blocking text flashes.
* **Global Edge CDN:** Static assets, cached images, and route bundles are served globally via Vercel's Edge Network.

---

## 🗄 Database Architecture & Security

The database schema is version-controlled inside `database/schema.sql`.

### Relational Schema:
* **`categories`**: `id` (uuid), `name` (text), `display_order` (integer)
* **`menu_items`**: `id` (uuid), `category_id` (foreign key -> `categories.id`), `name` (text), `description` (text), `price` (numeric), `image_url` (text), `is_special` (boolean), `updated_at` (timestamp)

### Security & Row-Level Security (RLS):
* **Public (`anon` role):** Granted `SELECT` read-only access to `categories` and `menu_items`.
* **Admin (`authenticated` role):** Granted full `INSERT`, `UPDATE`, and `DELETE` write privileges.

---

## 🚀 Local Development Setup

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/noelle-cakes-website.git
cd noelle-cakes-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to create a local `.env` file:
```bash
cp .env.example .env
```
Fill in your Supabase project credentials in `.env`:
```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Database Setup (Optional for Fresh Instances)
If pointing to a new Supabase instance:
1. Open your Supabase project's **SQL Editor**.
2. Copy and run the SQL code inside `database/schema.sql`.
3. Create a public storage bucket named `menu-images`.

### 5. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```text
noelle-cakes-website/
├── database/
│   └── schema.sql              # Supabase tables, RLS policies, and GRANT privileges
├── public/                     # Static assets & logo
├── src/
│   ├── assets/
│   │   └── fonts/              # Self-hosted brand font files (.ttf, .otf)
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminLayout.jsx # Admin portal header & navigation shell
│   │   │   └── ProtectedRoute.jsx # Auth route guard
│   │   ├── home/               # Modular Home Page Sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── StorySection.jsx
│   │   │   ├── SpecialsSection.jsx
│   │   │   ├── CategoriesSection.jsx
│   │   │   ├── FindUsSection.jsx
│   │   │   └── ContactSection.jsx
│   │   ├── Footer.jsx          # Shared footer with hours & owner login link
│   │   └── Navbar.jsx          # Shared navbar with mobile drawer
│   ├── context/
│   │   └── AuthContext.jsx     # Global Supabase authentication state
│   ├── data/
│   │   └── mockData.js         # Fallback data structure
│   ├── lib/
│   │   └── supabase.js         # Supabase client initializer
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminCategories.jsx
│   │   │   ├── AdminItems.jsx
│   │   │   ├── AdminSpecials.jsx
│   │   │   └── AdminLogin.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── Home.jsx
│   │   ├── ItemDetailPage.jsx
│   │   └── SpecialDetailPage.jsx
│   ├── utils/
│   │   └── imageCompressor.js  # HTML5 Canvas browser WebP image compressor
│   ├── App.jsx                 # Central router & public layout wrapper
│   ├── index.css               # Tailwind v4 directives & @theme definitions
│   └── main.jsx
├── .env.example
├── package.json
└── vite.config.js
```

---

## 🗺 Completed Build Phases

- [x] **Phase 1: Brand Direction & Strategy:** Color palette approval (#65001E Maroon, #FFEBEB Pink), font pairing, and wireframe sign-off.
- [x] **Phase 2: Database & Auth Infrastructure:** Supabase tables, RLS security policies, `menu-images` bucket, and admin authentication setup.
- [x] **Phase 3: Public Site Static Build:** Responsive navigation, modular home sections, Embla specials carousel, category views, and item detail pages.
- [x] **Phase 4: Custom Admin Panel CMS:** Auth-gated dashboard, category CRUD, item CRUD with browser WebP compression, and 1-click specials toggle.
- [x] **Phase 5: Live Database Wiring:** Connected public UI components to fetch real-time data from Supabase.
- [x] **Phase 6: Deployment & Custom Domain:** Hosted on Vercel Edge CDN with custom `.et` DNS configuration (`www.noellecakes.et`).

---

## 👤 Author & Credits

Designed and developed for **Noelle Cakes**.
* **Client / Master Baker:** Betty / Noelle
* **Production Domain:** [https://www.noellecakes.et](https://www.noellecakes.et)
