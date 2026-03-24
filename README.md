# Hero IO — App Discovery Platform

![Hero IO](https://img.shields.io/badge/Hero%20IO-v1.0.0-7c5cfc?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)

## Description

**Hero IO** is a modern app discovery and management platform where users can explore a curated catalog of top mobile applications, view detailed app information with rating charts, install/uninstall apps, and manage their personal library — all from a sleek, responsive dark-themed interface.

## ✨ Features

- 🏠 **Home Page** — Animated hero banner, stats section, top 8 apps grid
- 📱 **All Apps** — Browse all 15 apps with live search, sort by downloads
- 📊 **App Details** — Recharts bar chart, star breakdown, Install button with toast feedback
- 💾 **My Installation** — localStorage-powered personal library with uninstall
- 🔍 **Live Search** — Debounced, case-insensitive search with "No App Found" state
- 📦 **Persistent Storage** — Installed apps saved to localStorage across sessions
- 🌐 **Fully Responsive** — Works on all screen sizes
- ⚡ **Loading Animations** — Page transition loader and skeleton cards
- ❌ **Custom 404 Page** — Friendly error page for invalid routes

## 🛠 Technologies

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **React Router v6** | Client-side routing |
| **Vite 5** | Build tool & dev server |
| **Recharts** | App review bar chart |
| **react-hot-toast** | Install/uninstall notifications |
| **CSS Modules** | Scoped component styles |
| **localStorage API** | Persist installed apps |
| **Google Fonts** | Syne (headings) + DM Sans (body) |

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/hero-io.git
cd hero-io

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
hero-io/
├── public/
├── src/
│   ├── components/
│   │   ├── Layout.jsx         # Header + Footer + page wrapper
│   │   ├── Layout.module.css
│   │   ├── AppCard.jsx        # Reusable app card component
│   │   └── AppCard.module.css
│   ├── data/
│   │   └── apps.js            # 15 app objects with full data
│   ├── pages/
│   │   ├── Home.jsx           # Landing page
│   │   ├── AllApps.jsx        # Browse + search + sort
│   │   ├── AppDetails.jsx     # Single app detail + chart
│   │   ├── Installation.jsx   # My installed apps
│   │   ├── NotFound.jsx       # 404 page
│   │   └── *.module.css
│   ├── App.jsx                # Routing setup
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles & design tokens
├── index.html
├── vite.config.js
├── package.json
└── README.md

## 📝 Git Commits

- `feat: initial project setup with Vite + React + routing`
- `feat: add app data, Layout with header/footer, AppCard component`
- `feat: build Home page with banner, stats, and top apps grid`
- `feat: build AllApps page with live search and sort by downloads`
- `feat: build AppDetails with Recharts chart and localStorage install`
- `feat: build Installation page and 404 error page`
- `chore: add README, polish responsive styles`
