# CLAUDE.md — Pacific Beach

This file provides guidance for Claude Code when working with this repository.

## Project Overview

**Pacific Beach** is a static landing page for an exclusive surf condominium located at Playa Punta Bermejo, Ancash, Peru (KM 222 Panamericana Norte). The site is deployed via GitHub Pages and targets Spanish-speaking buyers and investors.

Live URL: <https://joshua-lp.github.io/PacificBeach/>

## Repository Structure

```
PacificBeach/
├── index.html    # Single-page HTML — all sections live here
├── styles.css    # All CSS (variables, layout, components, responsive breakpoints)
├── script.js     # Vanilla JS — classes and init functions for every interactive feature
├── img/          # Local images (1.jpg–7.jpg, 100.jpg, 200.jpg, 250.jpg) and videos (IMG.mp4, Video.mp4)
└── README.md     # Project documentation
```

There is **no build step**, **no package manager**, and **no framework**. All files are served as-is by GitHub Pages.

## Technology Stack

- **HTML5** — semantic structure, Spanish (`lang="es"`)
- **CSS3** — custom properties (`var(--navy-blue)`, `var(--gradient-primary)`, etc.), Flexbox, Grid, media queries
- **Vanilla JavaScript (ES6+)** — classes, `async/await`, DOM APIs; no bundler
- **Font Awesome 6** — loaded via CDN (`cdnjs.cloudflare.com`)
- **GitHub Pages** — deployment from the `main` branch

## Key JavaScript Architecture

All interactive features are initialised inside the `DOMContentLoaded` listener at the bottom of `script.js`. Each feature is either a **class** or a standalone **`initXxx()` function**:

| Symbol | Type | Responsibility |
|---|---|---|
| `HeroCarousel` | class | Auto-playing hero slide carousel with video support |
| `OfferModal` | class | Timed promotional modal with countdown |
| `CountdownTimer` | class | Countdown to an offer deadline |
| `TestimonialsCarousel` | class | Customer testimonial slider |
| `initMobileMenu()` | function | Hamburger menu for mobile |
| `initSmoothScroll()` | function | Anchor link smooth scrolling |
| `initNavbarScroll()` | function | Navbar appearance on scroll |
| `initFormValidation()` | function | Contact-form client-side validation |
| `initScrollAnimations()` | function | Intersection Observer reveal animations |
| `initCTAButtons()` | function | Call-to-action click handlers |
| `initMasterplanLinks()` | function | Opens Google Drive masterplan in a modal |
| `initWhatsAppButton()` | function | WhatsApp deep-link with pre-filled message |
| `initParallax()` | function | Hero parallax on scroll |
| `initActiveNavigation()` | function | Highlights active nav link while scrolling |
| `initScrollToTop()` | function | Back-to-top button visibility and click |
| `initFloatingImageAnimation()` | function | CSS-based floating image loop |
| `initCardAnimations()` | function | Hover effects on pricing/project cards |
| `initLoadingAnimation()` | function | Page-load splash screen |
| `initRippleEffect()` | function | Material-style button ripple |
| `initVisitorCounter()` | function | Simulated visitor counter animation |

## CSS Conventions

- CSS custom properties are declared in `:root` near the top of `styles.css`.
- Section styles are grouped with block comments: `/* ========== SECTION NAME ========== */`.
- The stylesheet contains WordPress compatibility overrides at the top — do not remove them, as the page may also be embedded in a WordPress theme.
- Responsive breakpoints: `768px` (mobile), `968px` (tablet), `1200px` (desktop container max-width).

## Contact / Business Information

- **Phone:** (+51) 933 597 955
- **Email:** admin@pacificbeach.pe
- **WhatsApp number in code:** `51933597955`

## Development Notes

- All text content is in **Spanish**.
- Images are referenced relative to the repo root (e.g., `img/1.jpg`). Do not change paths.
- Videos (`img/IMG.mp4`, `img/Video.mp4`) are used in the hero carousel; keep them `muted`, `autoplay`, `loop`, and `playsinline` for cross-browser autoplay compatibility.
- There are no tests. Validate changes by opening `index.html` directly in a browser or via GitHub Pages.
- Avoid adding external dependencies or build tools — keep the project dependency-free.
