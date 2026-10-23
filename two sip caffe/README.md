# Two Sips — Premium Cafe Landing Page

> **"Two Cups. One Story."**  
> A modern, cozy cafe serving freshly brewed coffee, delicious snacks, and sweet treats in a welcoming atmosphere.

---

## Brand Overview

- **Brand Name:** Two Sips
- **Tagline:** Two Cups. One Story.
- **Brand Essence:** Modern, cozy, warm, and inviting to everyone — students, professionals, couples, and everyday coffee lovers.
- **Color Palette:**
  - **Espresso Brown:** `#3B2920` (dominant header, text, footer background)
  - **Warm Coffee Brown:** `#765747` (subtle badges, accents, interactive hover)
  - **Cream:** `#F6F0E7` (dominant light surfaces, section contrast)
  - **Beige:** `#E6D5BF` (borders, tags, soft highlights)
  - **Soft White:** `#FFFDF9` (clean background canvas)
- **Typography:**
  - Primary Headings: **Playfair Display** (refined serif)
  - Body & UI: **Inter** (clean, crisp sans-serif)

---

## Landing Page Architecture

1. **Header & Navigation:**
   - Wordmark logo with artisan coffee cup icon.
   - Transparent hero navigation transitioning to solid frosted cream on scroll.
   - Smooth anchor navigation linking to `#home`, `#story`, `#menu`, `#experience`, `#visit`.
   - Responsive mobile drawer navigation with animated hamburger trigger.
2. **Hero Section (Art-Directed Cafe Premises Showcase):**
   - Editorial composition featuring high-resolution architectural cafe premises photography.
   - Label: `YOUR EVERYDAY COFFEE SPOT` · `WESTSIDE QUARTER · OPEN DAILY`
   - Headline: `"Good Coffee. Great Moments."`
   - Primary Action: `Explore Our Menu`
   - Secondary Action: `Our Story`
   - Category Pill: `Coffee · Bites · Desserts`
   - Floating specialty badge: Single Origin Arabica highlights & house roasting.
3. **Featured Favorites:**
   - Title: `"Your Next Favorite Sip"`
   - Handcrafted cards with hover zoom and artisan descriptions:
     1. **Cappuccino** — Rich espresso finished with smooth, velvety milk.
     2. **Classic Cold Coffee** — Chilled, creamy, and refreshing from the very first sip.
     3. **Chocolate Brownie** — A rich chocolate treat to make your coffee break sweeter.
4. **Our Story:**
   - Asymmetrical storytelling layout featuring barista craft and cafe philosophy.
   - Interactive *"Discover Our Story"* modal detailing bean sourcing, roasting, and community vision.
5. **Full Menu (12 Curated Items):**
   - Interactive category filter tabs (**All**, **Hot Coffee**, **Cold Coffee**, **Quick Bites**, **Sweet Treats**).
   - Items with sensory tasting notes and culinary descriptions:
     - **Hot Coffee:** Espresso, Americano, Cappuccino, Cafe Latte
     - **Cold Coffee:** Classic Cold Coffee, Iced Latte
     - **Quick Bites:** Veg Grilled Sandwich, French Fries, Veg Burger
     - **Sweet Treats:** Chocolate Brownie, Chocolate Muffin, Chocolate Cake
6. **Cafe Experience:**
   - Atmospheric visual storytelling across three pillars:
     - *Freshly Brewed*
     - *Comfort Food*
     - *Your Kind of Space*
7. **Visit Us & Contact:**
   - Editorial dark espresso call-to-action block.
   - Clearly marked editable placeholders for `[Add cafe address]`, `[Add opening hours]`, and `[Add phone number]`.
   - Functional *"Get Directions"* modal with Copy Address and map shortcut.
   - Functional *"Contact Us"* inquiry modal with form validation and instant toast feedback.
8. **Footer:**
   - Two Sips brand wordmark, tagline, full navigation, editable contact details, social links, and copyright.

---

## Running the Website Locally

You can run and preview the site instantly using any of the following methods:

### Method 1: Instant Perl Server (Zero External Dependencies)
```bash
perl server.pl 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Method 2: Open Directly in Browser
You can open `index.html` directly in any modern browser (Chrome, Safari, Firefox, Edge).

### Method 3: Using Node / Vite (Optional)
If you have Node installed:
```bash
npx serve .
# or
npx vite
```

---

## Customization Guide

- **Updating Menu Offerings:** Edit or add items in `<div class="menu-grid" id="menuItemsGrid">` inside `index.html`.
- **Updating Location & Hours:** Locate the `<section id="visit">` block in `index.html` and replace `[Add cafe address]`, `[Add opening hours]`, and `[Add phone number]`.
- **Palette Adjustments:** Edit the CSS custom properties in `css/styles.css` under `:root`.
