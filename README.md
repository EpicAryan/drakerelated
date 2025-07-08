# Smart Home Interactive Experience

A modern, interactive smart home showcase built with **Next.js**, featuring immersive room experiences with smart device demonstrations, product information, and seamless e-commerce integration.

---

## Features

### Interactive Room Experience
- **Multi-room Navigation**: Explore Kitchen, Living Room, and Entrance areas
- **Interactive Hotspots**: Click on smart devices to view detailed product information
- **Smooth Transitions**: Seamless navigation between rooms with custom animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Smart Device Showcase
- **Product Cards**: Detailed specifications, features, and pricing
- **Media Integration**: High-quality images and videos for each product
- **Purchase Integration**: Direct links to e-commerce platforms (Flipkart)
- **Brand Integration**: Featured products from Qubo, Tapo, Atomberg, Philips, and Wipro

### Advanced Features
- **Camera Light Beams**: Visual representation of camera coverage areas
- **Magnifying Glass**: Zoom functionality for detailed product inspection
- **Auto-scroll**: Intelligent focus on featured products
- **Loading States**: Smooth loading transitions and splash screens

---

## Technology Stack

### Frontend Framework
- **Next.js 15+** – React framework with App Router
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Utility-first CSS framework
- **Motion** – Advanced animations and transitions

### Content Management
- **Contentful** – Headless CMS serving as CDN for images and videos
- **Optimized Media Delivery** – Fast, reliable content delivery worldwide

### Analytics & Tracking
- **Plausible Analytics** – Privacy-focused web analytics
- **Custom Event Tracking** – Button clicks, navigation, and user interactions

### Development Tools
- **ESLint** – Code linting and best practices
- **Lucide React** – Modern icon library
- **clsx** – Conditional `className` utility

---

## Prerequisites

Ensure you have the following before starting:

- Node.js (v18.0.0 or higher)
- npm or yarn
- Contentful account for media assets
- Plausible Analytics account for tracking

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/EpicAryan/drakerelated.git
cd drakerelated
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

```bash
# Plausible Analytics Configuration
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```
Replace yourdomain.com with myapp.vercel.app or localhost:3000.

### 4. Contentful Setup

- Assets are already configured and served via CDN
- No extra setup required

### 5. Plausible Analytics Setup

- Create an account at plausible.io
- Add your domain
- Update .env.local
- Track:
    - Page visits
    - Product clicks
    - External link redirections
    - Room navigation

## Running the Application

```bash
npm run dev
# or
yarn dev
```
Visit: http://localhost:3000

## Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```bash
smart-home-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── rooms/
│       ├── kitchen/page.tsx
│       └── entrance/page.tsx
├── components/
│   ├── loading/
│   ├── transition/
│   ├── ui/
│   ├── index.ts
│   ├── routeTracker.ts
│   ├── entrance.tsx
│   ├── hotspot.tsx
│   ├── hotspotCard.tsx
│   ├── introModal.tsx
│   ├── interactiveRoom.tsx
│   ├── kitchen.tsx
│   ├── landscapeHint.tsx
│   ├── livingroom.tsx
│   ├── navbar.tsx
│   └── navigation.tsx
├── constants/
│   ├── kitchenHotspots.ts
│   ├── livingroomHotspots.ts
│   ├── entranceHotspots.ts
│   ├── entranceNavItems.ts
│   ├── kitchenNavItems.ts
│   └── livingroomNavItems.ts
├── hooks/
│   ├── useKitchenNavigation.ts
│   ├── useLivingroomNavigation.ts
│   ├── useEntranceNavigation.ts
│   └── usePageExit.ts
├── lib/
│   ├── analytics.ts
│   ├── utils.ts
│   ├── clientLayout.tsx
│   ├── lightBeam.tsx
│   └── magnifying.tsx
├── types/
│   └── index.ts
└── public/
    ├── magnify/
    
```

## Production Build

### Navigating Rooms

- Use the navbar (top on desktop, bottom on mobile)
- Use in-room arrows for contextual navigation

### Interacting with Products

- Click hotspots to reveal product details
- Browse specs, features, and click Buy Now
- Use magnifying glass (desktop only)

### Analytics Tracking

Tracks:
- Page views & time per room
- Product interactions
- Button clicks & purchases
- Navigation patterns

## Content Delivery
### Contentful CDN Integration

- Serves images, videos, and logos
- Offers:
    - Global caching
    - Image optimization
    - Fast response times

## Deployment

### Deploy on Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Required Environment Variables
```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
