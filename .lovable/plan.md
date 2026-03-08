

# Abundapp — Mobile-First Expense Tracker PWA

## Overview
A premium fintech-style expense tracker with 3 main screens, bottom tab navigation, and localStorage for data persistence. Uses the Abundapp branding (logo images provided) with a green color palette.

## Screen 1: Register Expense (Main Tab)
- Green gradient header with Abundapp logo (white version)
- Clean form with large touch targets:
  - **Date picker** (defaults to today)
  - **User selector** (Juan David / Nicolle)
  - **Category dropdown** with 17 categories: Alimentación, Transporte, Vivienda, Servicios, Salud, Educación, Entretenimiento, Ropa, Tecnología, Mascotas, Hogar, Regalos, Ahorro/Inversión, Impuestos, Seguros, Deudas, Otros
  - **Subcategory dropdown** (dynamically filtered by selected category)
  - **Amount input** with $ prefix, numeric keyboard
  - **Notes** textarea (optional)
  - Large green **"Registrar Gasto"** button
- Toast notification on successful registration

## Screen 2: History
- Month navigator with arrows (‹ March 2026 ›)
- Scrollable list of expense cards showing: date, category icon, subcategory, amount (bold), user name
- Each card has edit (pencil) and delete (trash) icon buttons
- Edit opens a bottom sheet modal with the same form pre-filled
- Delete shows confirmation dialog
- Empty state illustration when no expenses

## Screen 3: Summary
- Large hero number showing total spent this month
- Transaction count badge
- User breakdown with colored bars or simple pie chart (Recharts)
- Top 5 categories as horizontal bar chart
- Animated number transitions

## Design System
- Primary green `#4CAF50`, lime accent `#CDDC39`, dark gray `#37474F`, light green `#8BC34A`
- Green gradient header on all screens
- White cards with subtle shadows and 10px rounded corners
- Minimum 44px touch targets
- Smooth page transitions between tabs
- Bottom tab bar: Register (+), History (list), Summary (chart)

## PWA Setup
- Service worker via vite-plugin-pwa
- App manifest with Abundapp branding
- Installable from mobile browser

## Data
- All expenses stored in localStorage as JSON
- Structure: `{ id, date, user, category, subcategory, amount, notes, createdAt }`
- Ready for future Supabase migration

