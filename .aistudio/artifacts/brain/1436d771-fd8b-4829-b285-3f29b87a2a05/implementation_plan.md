# GaiGai — Singapore Social Enterprise Discovery & Impact Platform

GaiGai is an inclusive discovery, storytelling, and impact management platform that connects conscious consumers in Singapore with verified social enterprises across F&B, wellness, artisan gifts, and community experiences, while empowering social entrepreneurs with real-time revenue, donation, and customer feedback analytics.

---

> [!IMPORTANT]
> ### User Review & Critical Decisions
>
> 1. **Purely Inclusive Brand Identity**:
>    - The name is strictly **GaiGai** — celebrating the beloved colloquial Singlish/Hokkien/Malay shared expression for going out for a stroll, window shopping, and leisurely exploring Singapore. All non-inclusive Chinese characters have been completely removed.
> 2. **Proposed 10 Verified raiSE Social Enterprises for Approval**:
>    - **Foreword Coffee Roasters** (F&B / Specialty Coffee & Roastery — empowers neurodivergent individuals and persons with disabilities; Temasek Shophouse, Enabling Village, Esplanade)
>    - **Bettr Group / Bettr Coffee** (F&B / Specialty Coffee & Academy — empowers marginalized women and youth-at-risk; Prinsep St Foundry, New Tech Park)
>    - **Professor Brawn Café** (F&B / Western Comfort Bistro — operated by Autism Resource Centre to employ individuals on the autism spectrum; Pathlight School AMK & Tampines)
>    - **TeddyThotz** (Gifts & Lifestyle / Handcrafted Crochet & Batik — provides home-based supplemental income for elderly crafters and vulnerable families; Chai Chee)
>    - **The Social Space** (F&B & Lifestyle / Cafe, Fair-Trade Retail & Nail Salon — provides training and sustainable jobs for disadvantaged women and special needs youth; Kreta Ayer Chinatown, Marina One)
>    - **Hush TeaBar** (Wellness & Mental Health / Silent Tea Experience — guided by Deaf TeaRistas and mental health peers; roving pop-ups and corporate experiences)
>    - **SAVH Mobile Massage Team** (Wellness & Health / Certified Head, Shoulder & Foot Massage — employs certified visually impaired therapists from Singapore Association of the Visually Handicapped; Toa Payoh Rise)
>    - **Dignity Kitchen / Project Dignity** (F&B / Hawker Training Center & Food Court — trains and employs differently-abled and disadvantaged individuals in culinary arts; Boon Keng)
>    - **The Art Faculty** (Gifts & Merchandise / Designer Lifestyle Goods — showcases merchandise designed by autistic artists who earn royalties on every sale; Enabling Village Redhill)
>    - **Runninghour** (Social Experience & Sports / Inclusive Running, Walking & Tandem Cycling — brings together people with and without special needs through shared fitness; Bishan Park & Marina Bay)
> 3. **Accessibility (WCAG 2.1 AA/AAA & axe-core Compliance)**:
>    - Guaranteed contrast ratios $\ge 4.5:1$ for normal text and $\ge 3:1$ for large text and interactive components.
>    - High-visibility keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2`).
>    - ARIA landmark regions, live regions (`aria-live="polite"`) for donation feeds and itinerary calculations, descriptive button labels (`aria-label`), and touch targets $\ge 44\text{px}$ on touch viewports.
>    - Zero color-only status signaling (every state has textual indicators).
>    - Full `prefers-reduced-motion` compliance across all map pan and story animations.
> 4. **Mobile & Web Responsive Architecture**:
>    - Seamless transition between a full-width interactive vector map + split directory on desktop ($1440\text{px}$ baseline) and an adaptive stacked map/sheet view with bottom navigation bar on mobile ($360\text{px}\text{–}480\text{px}$).

---

## 1. Singapore Design Guide & Cultural Theme

### A. Design Inspiration & Philosophy
Inspired by **BrandSG**, Singapore's **"Passion Made Possible"** spirit, and our multi-racial, multi-ethnic tapestry:
- **The GaiGai Brandmark**: A continuous flowing single-stroke heart path. The outer curve represents a warm human heart (doing good, social impact), which loops inward to form a walking stroll path (GaiGai-ing through neighborhoods).
- **Peranakan Tile Geometry**: Subtle, geometric hairline accents and corner flourishes inspired by traditional Joo Chiat shophouse majolica tiles. These are rendered as modern vector hairline dividers without cluttering the interface.
- **HDB Void Deck & Kopitiam Warmth**: Welcoming community ethos reminiscent of neighborhood void deck gathering tables and friendly coffee shop chats ("Jio your kakis", "Spend with Heart", "Support Local").
- **Multi-Racial Harmony**: Clean, universally accessible English phrasing with affectionate, widely understood local colloquial touches that bring smiles across Chinese, Malay, Indian, and Eurasian communities alike.

### B. Color System (SG Civic Harmony Palette)
- **Primary Canvas (60%)**: 
  - Canvas Base: Crisp Kopitiam Porcelain (`#FAF8F5`) — warm, readable, avoiding harsh cold fluorescent white.
  - Surface Neutral: Pure Card White (`#FFFFFF`) with subtle warm stone borders (`border-stone-200 / #E7E5E4`).
- **Structural Typography & Contrast (30%)**:
  - Deep Straits Navy / Charcoal (`#0F172A` / `#1E293B`) delivering an ultra-crisp **$12.5:1$ contrast ratio** against porcelain for WCAG AAA accessibility.
  - Subdued Metadata Stone (`#57534E`) for unboxed metadata text (`·` separators) meeting $4.8:1$ AA contrast.
- **Accent Budget (10%)**:
  - **Singapore Crimson / Passion Red (`#E11D48` / `#BE123C`)**: For the GaiGai heart logo, primary CTAs, and active trail stops.
  - **Peranakan Jade Green (`#059669` / `#047857`)**: For verified raiSE enterprise badges, impact certifications, and sustainable social metrics.
  - **Warm Shophouse Terracotta (`#D97706` / `#B45309`)**: For artisan gift and craft highlights.

### C. Typography
- **Display & Headlines**: `Plus Jakarta Sans` — bold, geometric, confident, and warm.
- **Body & Captions**: `DM Sans` — high legibility, open counters, ideal for mobile screen readers.
- **Metrics, Coordinates & Financials**: `JetBrains Mono` / `tabular-nums` for donations, coordinates, and hours.

---

## 2. Platform Experience & Key User Flows

### Flow 1: Interactive Singapore Map & Multi-Facet Discovery
- **Vector Singapore Map**: Custom interactive vector map showing key Singapore regions (Central/Orchard, Downtown Core, East Coast/Chai Chee/Tampines, North-East/AMK/Toa Payoh, West/Buona Vista/Enabling Village).
- **Facet Filters**:
  - *Goods & Services Category*: F&B & Cafes, Wellness & Therapy, Gifts & Crafts, Social Experiences.
  - *Beneficiary Community*: Neurodiversity & Autism, Persons with Disabilities (PWDs), Marginalized Women & Youth, Seniors & Vulnerable Crafters, Visually Impaired.
- **Enterprise Card Drawer**: Clicking any map pin or card reveals full location details, nearest MRT station (e.g. "Boon Keng MRT - 3 min walk", "Redhill MRT - 5 min walk"), operating hours, wheelchair accessibility markers, and direct contact options.

### Flow 2: Animated Social Impact Stories
- Dedicated full-screen or slide-over animated visual story viewer with:
  - Multi-chapter progress indicator (e.g. Chapter 1: The Inspiration, Chapter 2: The Beneficiaries, Chapter 3: Daily Craft & Dignity, Chapter 4: Your Dollar at Work).
  - Authentic founder and beneficiary quotes.
  - Animated quantitative metrics (e.g. "Over 48 inclusive baristas trained", "$120,000 paid directly in artisan royalties").
  - Accessible playback controls (Pause, Next, Previous, Text-Only transcript mode for screen readers).

### Flow 3: "Weekend GaiGai Trail" Planner
- Users can click "Add to GaiGai Trail" on any enterprise.
- The trail drawer calculates:
  - **Estimated Trail Duration & Sequence**: Suggests a logical morning coffee $\rightarrow$ afternoon craft shopping $\rightarrow$ evening reflexology sequence.
  - **MRT Navigation Preview**: Step-by-step route between stops.
  - **Cumulative Community Impact**: Real-time counter (e.g. "Your weekend outing supports 2 inclusive baristas, 1 visually impaired masseur, and elderly artisan communities").
  - One-click copy/shareable itinerary link and calendar export.

### Flow 4: Impact Donation & PayNow Simulation
- Allows direct financial contributions to social enterprises or specific training initiatives (e.g. "$15: Sponsor 1 sensory coffee training module", "$30: Provide 2 weeks of knitting yarn for seniors").
- Generates a simulated realistic PayNow QR code with UEN number and downloadable social impact receipt.

### Flow 5: Social Enterprise Partner Management Portal
- Switchable via top navigation bar (`Consumer GaiGai Mode` $\leftrightarrow$ `Enterprise Partner Portal`).
- **Live Donation Analytics**: Real-time stream of incoming donations, weekly/monthly charts, average contribution size, and campaign progress.
- **Profile & Offerings Editor**: Live editable business hours, contact info, menu/service catalog, and social impact stats.
- **Google Reviews & Customer Sentiment Hub**:
  - Live feed of real customer Google Reviews with star ratings and timestamps.
  - AI-free sentiment categorization (Quality, Inclusivity, Hospitality, Value).
  - Enterprise reply simulator to respond to customers directly.

---

## 3. Technical Architecture & Component Structure

```
┌────────────────────────────────────────────────────────────────────────┐
│                        GaiGai Web Application                          │
├────────────────────────────────────────────────────────────────────────┤
│ Top Bar: Brand [GaiGai Heart] ── [Map | Trails | Stories] ── [Portal]  │
├──────────────────────────────────┬─────────────────────────────────────┤
│ Consumer Discovery View          │ Enterprise Management Portal        │
│ ┌──────────────────────────────┐ │ ┌─────────────────────────────────┐ │
│ │ Interactive SG Vector Map    │ │ │ Real-time Donation Analytics    │ │
│ │ • MRT Station Nodes & Pins   │ │ │ • Live Stream & Trend Charts    │ │
│ │ • Category & Cause Filters   │ │ │ • Impact KPI Metrics            │ │
│ ├──────────────────────────────┤ │ ├─────────────────────────────────┤ │
│ │ Directory & Enterprise Cards │ │ │ Enterprise Profile & Story Hub  │ │
│ │ • Opening Hours & Contacts   │ │ │ • Edit Hours, Goods, Mission    │ │
│ │ • Goods / Services Showcase  │ │ ├─────────────────────────────────┤ │
│ ├──────────────────────────────┤ │ │ Google Reviews Integration Hub │ │
│ │ Animated Impact Story Modal  │ │ │ • Sentiment & Rating Breakdown  │ │
│ ├──────────────────────────────┤ │ │ • Verified Reviews Feed & Reply │ │
│ │ Weekend Itinerary Builder    │ │ └─────────────────────────────────┘ │
│ │ • Reorderable Trail stops    │ │                                     │
│ │ • Cumulative Impact Calc     │ │                                     │
│ └──────────────────────────────┘ │                                     │
├──────────────────────────────────┴─────────────────────────────────────┤
│ Shared State Store (Local Storage Persistence)                         │
│ • Selected Enterprises • Itinerary Stops • Donation Feed • Reviews     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Accessibility & Quality Matrix (axe & WCAG 2.1 AA Checklist)

| Criterion | Implementation in GaiGai |
| :--- | :--- |
| **Color Contrast (1.4.3)** | Body text $\ge 12:1$ (Charcoal on Porcelain); Muted labels $\ge 4.8:1$; UI boundaries $\ge 3:1$. |
| **Non-text Contrast (1.4.11)** | Map markers, focus borders, and active tabs clearly defined with $\ge 3:1$ borders. |
| **Keyboard Navigation (2.1.1)** | All map pins, cards, story sliders, and donation modals reachable and activatable via `Tab`, `Enter`, `Space`, `Esc`. |
| **Focus Visible (2.4.7)** | High-contrast double-ring focus indicator (`focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2`). |
| **Target Size (2.5.5)** | All clickable buttons and mobile controls $\ge 44\times 44\text{px}$. |
| **Screen Reader ARIA (4.1.2)** | Full semantic markup with landmarks (`<main>`, `<nav>`, `<aside>`), `aria-expanded`, and `aria-live`. |
| **Reduced Motion (2.3.3)** | CSS `@media (prefers-reduced-motion)` disables smooth camera pans and story auto-advances. |
