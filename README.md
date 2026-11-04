# GaiGai (街街) — Singapore Social Enterprise Discovery & Impact Platform

> **Spend with Heart · Discover Local Impact**  
> Where every step and dollar in Singapore counts.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Maps](https://img.shields.io/badge/Google_Maps_Platform-4285F4?logo=google-maps&logoColor=white)](https://developers.google.com/maps)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini_API-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)

---

## 🌺 About GaiGai

In Singapore colloquial culture, *"GaiGai"* (街街) means to go out for a leisurely stroll, window shopping, or a weekend outing with loved ones. **GaiGai** reimagines everyday leisure as a catalyst for community resilience, social equity, and conscious consumerism.

Whether you're craving a cup of specialty flat white, shopping for handcrafted gifts, booking a rejuvenating acupressure massage, or planning an inclusive weekend outing, GaiGai connects you with **20 verified social enterprises across Singapore** whose revenues directly support differently abled individuals, senior artisans, neurodivergent talents, and sustainable green initiatives.

### Why GaiGai?

* **For Purposeful Seekers & Explorers:** Discover quality everyday venues where spending your dollar actively empowers local communities and second-chance artisans.
* **For Social Entrepreneurs & Changemakers:** Overcome high overheads with islandwide discovery, bookable trails, verified PayNow donation channels, and Google Reviews sentiment analytics.
* **Empathetic & Inclusive by Design:** Thoughtfully curated using respectful, inclusive language that honors beneficiaries and changemakers alike.

---

## ✨ Key Features

### 1. 🗺️ Dual-Engine Singapore Social Map
* **Interactive Google Map:** Real-world coordinates with custom category pins, clustered markers, MRT stations, and interactive info windows.
* **Vector Graphic Fallback:** Seamless fallback to an interactive vector map of Singapore with district breakdowns if offline or without Maps API credentials.
* **Real-World Proximity:** Filter by MRT lines (North-South, East-West, Downtown, Circle, Thomson-East Coast, North-East) and walk times.

### 2. 🗂️ Curated 20 Social Enterprises Directory
* **4 Core Categories:**
  * ☕ **F&B & Inclusive Cafes:** Foreword Coffee Roasters, Bettr Group, Professor Brawn Bistro, Seeds Cafe, Soul Food Enterprise, Dignity Kitchen.
  * 💆 **Wellness & Care:** SAVH Mobile Massage Team, Hush TeaBar, The Nail Social.
  * 🎁 **Artisan Crafts & Gifts:** BloomBack (preserved flowers), The Art Faculty, TeddyThotz, Singapore Fashion Runway, Flour Power, Boxgreen.
  * 🌿 **Social Movement & Sustainability:** Edible Garden City, UglyFood, The Sustainability Project, Runninghour Co-operative, The Social Space.
* **Photocard Banners (30% Transparency):** Authentic, verified venue and craft photography overlaid with 30% translucent banners and floating category badges.
* **Direct Official Channels:** Instant one-click links to official websites, Instagram, and Facebook pages.
* **Trust Markers:** Highlights **raiSE Singapore** certification and **President’s Challenge Enabling Mark** tiers (Platinum/Gold).

### 3. 📖 Animated Story Chapters (Instagram/Snapchat Style)
* Interactive, chapter-by-chapter stories detailing the founding mission, beneficiary quotes, and verified milestones of each social enterprise.
* Auto-advancing timeline progress bars, pause/play controls, ambient photocard backdrop, and full accessible transcripts for screen readers.

### 4. 🎒 Weekend GaiGai Trail Planner
* Build and customize your personal Singapore weekend itinerary.
* Reorder stops, budget planned spending, track MRT accessibility, and export or print your customized GaiGai Trail.

### 5. ❤️ Direct PayNow & Card Support
* Integrated donation modals supporting PayNow QR generation and card contributions.
* Progress tracking against verified fundraising milestones and tangible impact metrics.

### 6. 📊 Social Enterprise Owner Dashboard
* Business portal for social enterprise owners to preview their listing, track simulated live contributions, monitor real-time Google Reviews sentiment, and update operating hours.

### 7. 🎙️ AI-Powered Spoken Search & Maps Grounding
* **Voice Search:** Powered by `gemini-3.5-transcribe` on the Node/Express backend for hands-free spoken queries in Singaporean accents.
* **Maps Grounding:** Powered by `gemini-3.8-flash` with Google Maps tool grounding for contextual, natural-language spatial queries (e.g., *"Find inclusive cafes near Dhoby Ghaut with wheelchair ramps"*).

---

## 🏛️ Brand Identity

The GaiGai logo is a clean wordmark honoring Singapore’s multicultural heritage:
* **Typography:** Classic, modern display serif wordmark: **GaiGai**.
* **Dual-Colored 'i' Dots:**
  * First **i** dot: **Ruby Crimson** (`#DC2626` / `#BE123C`), symbolizing heart and passion.
  * Second **i** dot: **Jade Green** (`#047857`), symbolizing harmony, nature, and social resilience.
* **Accessibility:** Full WCAG 2.1 AA compliant contrast ratios (≥ 4.8:1) across both light and dark themes.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4 |
| **Icons & Animation** | Lucide React, Motion (Framer Motion) |
| **Maps & Geospatial** | Google Maps Platform (`@vis.gl/react-google-maps`), Custom SVG Vector Map |
| **Backend / API Proxy** | Node.js, Express, `tsx` |
| **AI Capabilities** | Google GenAI SDK (`@google/genai`), Gemini 3.5 Transcribe, Gemini 3.8 Flash |
| **Styling & Theme** | Peranakan ceramic motifs, jade green, ruby crimson, warm alabaster (`#FAF8F5`) |

---

## 🚀 Getting Started

### Prerequisites

* **Node.js:** v18.0.0 or higher
* **npm:** v9.0.0 or higher
* *(Optional)* **Google Maps API Key:** For live interactive Google Maps rendering.
* *(Optional)* **Gemini API Key:** For AI voice transcription and natural-language maps grounding.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Louisehoxq/gaigai.git
   cd gaigai
