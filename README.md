# 🍰 Noelle Cakes — Website & Admin Panel

> 🚧 **PROJECT STATUS: UNDER CONSTRUCTION** 🚧  
> *This project is currently in active development (Phase 2: Database & Auth Setup).*

A public-facing showcase website and custom admin dashboard built for **Noelle Cakes**. This platform allows the shop owner to seamlessly display their menu and daily specials, while providing a secure, no-code admin panel to manage content without developer intervention.

## 📖 Project Overview
Noelle Cakes requires a visually engaging digital catalog. Because the menu changes and daily specials are a core part of the business, the site includes a custom Content Management System (CMS) tailored specifically for the owner. 

*Note: This is a showcase/catalog site. Online ordering and payment processing are out of scope.*

## ✨ Features
### Public Facing Site
- **Dynamic Menu:** Items grouped by category, displayed as cards.
- **Persistent Daily Specials:** A visually distinct section that guarantees a "Today's Special" is always highlighted.
- **Brand Identity:** Styled with the brand's signature Deep Maroon (`#65001E`) and Pale Pink (`#FFEBEB`), utilizing *Happy Lucky* for headings.

### Admin Panel (Auth-Gated)
- **Menu Management:** Add, edit, and delete items (name, description, price, image, category).
- **Category Management:** Add, edit, delete, and reorder categories.
- **Specials Toggle:** Set and update current daily specials with a simple UI.

## 🛠 Tech Stack
- **Frontend:** React (JavaScript) + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router (handling public & protected admin routes)
- **Database & Auth:** Supabase (PostgreSQL, built-in Auth, Storage buckets)
- **Hosting:** Vercel / Netlify *(Pending Deployment)*

## 🚀 Local Development

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/noelle-cakes-website.git
   cd noelle-cakes-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```


3. **Set up Environment Variables:**
   *Copy the provided example file to create your local environment file:*
   ```bash
   cp .env.example .env
   ```
   *Open `.env` and replace the placeholder values with your Supabase Project URL and Anon Key.*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
## 🗄️ Database Setup
This project uses Supabase (PostgreSQL). If you are setting up a fresh instance of this project, you can easily replicate the database architecture. 
1. Create a new Supabase project.
2. Open the Supabase SQL Editor.
3. Copy the contents of `database/schema.sql` and run it to instantly generate the required tables, Row-Level Security (RLS) policies, and role permissions.
## 🗺 Roadmap / Build Phases
- [x] **Phase 1:** Confirm Brand Direction & Layout
- [x] **Phase 2:** Set up Supabase project (Auth, DB, Storage)
- [ ] **Phase 3:** Build public site against placeholder data
- [ ] **Phase 4:** Build Admin Panel & CRUD operations
- [ ] **Phase 5:** Wire public site to live Supabase data
- [ ] **Phase 6:** Deploy & Connect Domain
- [ ] **Phase 7:** Client Handoff
