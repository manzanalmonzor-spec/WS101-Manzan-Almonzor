# TechWizards Portfolio Website

> **An informative, professional, and user-friendly business portfolio and service website for TechWizards  an emerging IT startup based in Antique, Philippines.**

---

## Overview

This project is a multi-page business portfolio and service website for **TechWizards**, an information technology startup established in 2026 in Antique, Philippines. The website promotes the company's identity, showcases its specialized skills, and presents the range of technology services it offers to students, individuals, and organizations.

The website features the company background, mission, specialized programming and database skills, and the various projects and services offered including website development, desktop and mobile applications, Arduino and IoT-based systems, capstone and project-based systems, UI/UX design, video editing, logo and brand visuals, and Canva-based designs. A dedicated contact section allows clients to send inquiries and collaboration requests via email and Facebook.

The main goal is to build a platform that helps TechWizards expand its online presence, attract potential clients, and highlight its commitment to **innovation, creativity, productivity, and continuous improvement** in information technology.

---

## Project Details

| Field | Details |
|---|---|
| **Project Title** | TechWizards Portfolio Website |
| **Designer** | Almonzor S. Manzan — BSIT 3B |
| **Frontend Stack** | HTML5, CSS3, JavaScript (Vanilla) |
| **Deployment** | Vercel |
| **Contact Email** | techwizards42026@gmail.com |
| **Location** | Javier Street, Poblacion 3, Hamtic, Antique, Philippines |

---

## Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Landing page with hero, services preview, portfolio grid, about section, and contact modal |
| About | `HTML/about.html` | Company background, mission, purpose, process timeline, capabilities, and location |
| Services | `HTML/services.html` | Full service catalog with detailed modals per service |
| Portfolio | `HTML/portfolio.html` | Project showcase with filtering, project detail modals, and team profiles |

---

## Features

### UI & Animations
- Custom animated cursor with trailing ring effect and click spark particles
- Particle background system with dynamic connecting lines
- Typed text animation cycling through: *Innovation, Performance, Precision, Excellence*
- Scroll-triggered reveal animations with staggered entry
- Smooth counter animations for stats (20+ Projects, 8 Services, 4 Members)
- 3D tilt effect on service cards (mouse-tracking rotateX/Y)
- Glitch text and scanline overlay effects for cyberpunk aesthetic

### Navigation & Layout
- Fixed glassmorphism navbar with active section highlighting on scroll
- Responsive hamburger menu for mobile
- Clean URL routing via Vercel configuration
- Smooth scroll for anchor navigation

### Portfolio & Services
- Category-based portfolio filter (All, Mobile, Web, Tarpaulin, Infographics, Flyers, Logos, Presentations)
- Lightbox image viewer for portfolio items
- Service detail modals with process steps, deliverables, and CTAs
- Project detail modals with tech tags and contributor information
- Team member showcase with skills, stats, and GitHub profile links

### Contact & Forms
- Contact form modal with fields: First Name, Last Name, Email, Service type, Message
- Form submission via **FormSubmit.co** AJAX endpoint
- Email notifications forwarded to `techwizards42026@gmail.com`
- Graceful error handling with fallback guidance

---

## Services Offered

| # | Service |
|---|---|
| 1 | Mobile Application Development |
| 2 | Website Development |
| 3 | Tarpaulin & Print Design |
| 4 | Infographics |
| 5 | Flyers & Marketing Materials |
| 6 | Logo & Brand Visuals |
| 7 | PowerPoint Presentations |
| 8 | UI/UX Design |

---

## Project Structure

```
Techwizaaards/
├── index.html              # Main landing page
├── vercel.json             # Vercel deployment config (cleanUrls: true)
├── README.md
│
├── HTML/
│   ├── about.html          # Company background, mission & team
│   ├── services.html       # Full service catalog with modals
│   └── portfolio.html      # Project showcase & team profiles
│
├── CSS/
│   ├── style.css           # Global styles — color system, nav, hero, cards
│   ├── about.css           # About page specific layout & animations
│   ├── services.css        # Service cards, modals, and responsive grid
│   └── portfolio.css       # Portfolio grid, team cards, and project modals
│
├── JS/
│   ├── main.js             # Core: cursor, particles, nav, typed text, filters, counters
│   ├── cursor-fx.js        # Canvas-based spark particle effects on click/trail
│   ├── firebase-contact.js # Contact form handler via FormSubmit.co
│   ├── about.js            # About page interactions
│   ├── services.js         # Service modal handlers and data rendering
│   └── portfolio.js        # Portfolio filtering, modals, team card rendering
│
└── images/
    ├── logo.jpg            # Brand logo
    ├── mobile.jpg          # Mobile apps showcase
    ├── website.jpg         # Web apps showcase
    ├── tarp.jpg            # Tarpaulin design showcase
    ├── infographic.jpg     # Infographics showcase
    ├── flyer.jpg           # Flyers showcase
    ├── logozz.jpg          # Logos & branding showcase
    ├── powpt.jpg           # PowerPoint showcase
    └── awtss.jpg           # UI/UX design showcase
```

---

## Design System

| Token | Value |
|---|---|
| Primary Color | `#00f5ff` (Cyan) |
| Background | `#0a0e1a` (Deep Navy) |
| Surface Dark | `#060810` |
| Text Primary | `#e2e8f0` |
| Text Muted | `#94a3b8` |
| Card Border | `rgba(0, 245, 255, 0.15)` |
| Heading Font | Orbitron (monospace, tech aesthetic) |
| Body Font | Inter (sans-serif, clean readability) |

**Theme:** Cyberpunk / Futuristic — glassmorphism cards, neon cyan accents, radial gradients, and subtle scanline overlays.

**Responsive Breakpoints:** 1024px · 768px · 480px

---

## Team

| Name | Role | GitHub |
|---|---|---|
| Almonzor S. Manzan | Lead Designer / Developer | [manzanalmonzor-spec](https://github.com/manzanalmonzor-spec) |
| Khing Jay Regala | Developer | [Kaisecret](https://github.com/Kaisecret) |
| Dan Louise Baluntong | Developer | — |
| Matt Lowee Espiritu | Developer | — |

---

## AI Tools Used

This project utilized AI assistance across different stages of development:

| AI Tool | Usage |
|---|---|
| **Anthropic Claude Opus 4.7** | Polishing Vanilla JavaScript — enhanced responsiveness, optimized contact form handling, and Firebase/FormSubmit integration |
| **ChatGPT** | Assisted with Git workflow — managing pushes and commits to GitHub |
| **Google Gemini** | Supported idealization and construction of documentation for the project proposal |

---

## Deployment

The website is deployed on **Vercel** with the following configuration:

```json
{
  "outputDirectory": ".",
  "cleanUrls": true
}
```

`cleanUrls: true` enables clean URL paths — e.g., `/about` instead of `/HTML/about.html`.

---

## Contact TechWizards

- **Email:** techwizards42026@gmail.com
- **Phone:** +63 993 979 0700
- **Facebook:** [TechWizards](https://www.facebook.com/profile.php?id=61587937806654)
- **Location:** Javier Street, Poblacion 3, Hamtic, Antique, Philippines

---

*TechWizards — Innovation. Creativity. Productivity. Continuous Improvement.*
