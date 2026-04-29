/* ── TechWizards Services Page JS ── */

// ─── Custom Cursor ───
const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  setTimeout(() => {
    cursorRing.style.left = e.clientX + "px";
    cursorRing.style.top = e.clientY + "px";
  }, 80);
});

document.addEventListener(
  "mousedown",
  () => (cursor.style.transform = "translate(-50%,-50%) scale(1.6)"),
);
document.addEventListener(
  "mouseup",
  () => (cursor.style.transform = "translate(-50%,-50%) scale(1)"),
);

function addCursorHover(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1.8)";
      cursorRing.style.transform = "translate(-50%,-50%) scale(1.3)";
      cursorRing.style.borderColor = "rgba(0,245,255,0.9)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      cursorRing.style.transform = "translate(-50%,-50%) scale(1)";
      cursorRing.style.borderColor = "rgba(0,245,255,0.5)";
    });
  });
}
addCursorHover("a, button, .sv-card, .skill-tag");

// ─── Particle System ───
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particleList = [];
const PARTICLE_COUNT = 80;

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.pulse = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulse += 0.02;
    if (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    )
      this.reset();
  }
  draw() {
    const alpha = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,245,255,${alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particleList.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particleList.length; i++) {
    for (let j = i + 1; j < particleList.length; j++) {
      const dx = particleList[i].x - particleList[j].x;
      const dy = particleList[i].y - particleList[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,245,255,${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particleList[i].x, particleList[i].y);
        ctx.lineTo(particleList[j].x, particleList[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particleList.forEach((p) => {
    p.update();
    p.draw();
  });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ─── Navbar ───
const nav = document.querySelector("nav");
window.addEventListener("scroll", () =>
  nav.classList.toggle("scrolled", window.scrollY > 60),
);

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
});

// ─── Reveal on Scroll ───
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
      }
    });
  },
  { threshold: 0.1 },
);
revealEls.forEach((el) => revealObserver.observe(el));

// ─── Card Tilt ───
document.querySelectorAll(".sv-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transition =
      "transform 0.1s ease, border-color 0.4s ease, box-shadow 0.4s ease";
  });
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transition =
      "transform 0.5s ease, border-color 0.4s ease, box-shadow 0.4s ease";
    card.style.transform = "";
  });
});

// ─── Service Data ───
const SERVICES = {
  mobile: {
    icon: "📱",
    tag: "MOBILE DEVELOPMENT",
    title: "Mobile Applications",
    image: "../images/mobile.jpg",
    overview:
      "TechWizards crafts native and cross-platform mobile applications that run seamlessly on iOS and Android. Using React Native and Flutter, we deliver pixel-perfect experiences with native-level performance — without the cost of building two separate codebases. From the initial concept all the way to App Store launch, we handle every step of the journey.",
    process: [
      {
        num: "01",
        title: "Discovery & Requirements",
        desc: "We sit down with you to understand your goals, target users, and the core features that will make your app valuable and competitive in the market.",
      },
      {
        num: "02",
        title: "UI / UX Wireframing",
        desc: "Before a single line of code is written, we sketch every screen and user flow — ensuring great usability and a clear visual direction from the start.",
      },
      {
        num: "03",
        title: "Development Sprints",
        desc: "Our developers build the app incrementally in agile sprints, so you can see real, working progress and provide feedback at every milestone.",
      },
      {
        num: "04",
        title: "Device Testing & QA",
        desc: "Rigorous testing across multiple real devices ensures smooth performance, airtight security, and zero critical bugs before your users ever touch it.",
      },
      {
        num: "05",
        title: "App Store Launch",
        desc: "We handle the complete submission process for both the Apple App Store and Google Play Store — metadata, screenshots, and approval management included.",
      },
    ],
    deliverables: [
      "Full annotated source code",
      "iOS & Android compatible builds",
      "App Store & Play Store submission",
      "30-day post-launch tech support",
      "User documentation & admin guide",
    ],
  },

  web: {
    icon: "🌐",
    tag: "WEB DEVELOPMENT",
    title: "Web Applications",
    image: "../images/website.jpg",
    overview:
      "From sleek landing pages to complex enterprise platforms, TechWizards engineers full-stack web applications using modern technologies like React, Next.js, and Firebase. We build for scale, speed, and real-world impact — systems that look great, load fast, and actually hold up under pressure.",
    process: [
      {
        num: "01",
        title: "Requirements Gathering",
        desc: "We learn what your platform needs to do — understanding your users, business workflows, and technical constraints before planning anything.",
      },
      {
        num: "02",
        title: "Architecture Design",
        desc: "We plan the system structure, database schema, and API contracts so that the foundation supports future growth without costly rewrites.",
      },
      {
        num: "03",
        title: "Frontend Development",
        desc: "We build a responsive, fast, and visually polished interface that works flawlessly across all screen sizes and modern browsers.",
      },
      {
        num: "04",
        title: "Backend & Database",
        desc: "We implement secure server logic, RESTful APIs, and a well-structured database — the engine powering everything your users see.",
      },
      {
        num: "05",
        title: "Deployment & Go-Live",
        desc: "We deploy your application to reliable cloud infrastructure, configure your domain, set up SSL, and confirm everything is performing correctly.",
      },
    ],
    deliverables: [
      "Fully responsive web application",
      "Source code repository (GitHub)",
      "Deployed & live website",
      "Admin dashboard (if applicable)",
      "30-day post-launch support",
    ],
  },

  tarpaulin: {
    icon: "🖼️",
    tag: "PRINT DESIGN",
    title: "Tarpaulin Design",
    image: "../images/tarp.jpg",
    overview:
      "Whether it's a graduation celebration, corporate event, school activity, or institutional display — TechWizards creates professional tarpaulin designs that grab attention and communicate your message with clarity. Every output is delivered in full print-ready resolution, exactly as any print shop requires it.",
    process: [
      {
        num: "01",
        title: "Brief & Information",
        desc: "You tell us the occasion, people to be featured, desired dimensions (in feet or inches), and all text or messages to include.",
      },
      {
        num: "02",
        title: "Initial Draft",
        desc: "We create the first version of your tarpaulin based on your brief, preferred style, and any reference images you've shared with us.",
      },
      {
        num: "03",
        title: "Client Review",
        desc: "You review the draft and provide specific feedback — text edits, color adjustments, layout changes, or photo replacements.",
      },
      {
        num: "04",
        title: "Revision Rounds",
        desc: "We refine the design based on your feedback, iterating carefully until every detail looks exactly the way you want it to.",
      },
      {
        num: "05",
        title: "Final Delivery",
        desc: "The approved design is exported as a high-resolution 300 DPI file in both PDF and PNG formats, ready to send directly to the print shop.",
      },
    ],
    deliverables: [
      "300 DPI print-ready PDF & PNG",
      "Source file (PSD or AI)",
      "Unlimited revision rounds",
      "24–48 hour turnaround time",
      "Compatible with any local print shop",
    ],
  },

  infographics: {
    icon: "📊",
    tag: "VISUAL DESIGN",
    title: "Infographics",
    image: "../images/infographic.jpg",
    overview:
      "Complex data, simplified. TechWizards transforms statistics, processes, timelines, and raw research into compelling visual stories. Whether for a school report, a business pitch, or a social media campaign — our infographics are both informative and immediately eye-catching.",
    process: [
      {
        num: "01",
        title: "Content & Data Collection",
        desc: "You provide us with the data, facts, or written content you want visualized. The more context you give, the more accurate and impactful the result.",
      },
      {
        num: "02",
        title: "Concept Development",
        desc: "We plan the overall layout, information hierarchy, and visual flow — choosing which data types match which visualization formats best.",
      },
      {
        num: "03",
        title: "Design Execution",
        desc: "We craft the infographic using custom icons, illustrations, data charts, and a cohesive color system that makes information easy to scan.",
      },
      {
        num: "04",
        title: "Feedback & Refinement",
        desc: "You review and request any factual corrections, visual changes, or restructuring. We refine until the infographic is exactly right.",
      },
      {
        num: "05",
        title: "Final Multi-Format Export",
        desc: "Delivered in multiple formats — high-res print version, web-optimized PNG, and social media sizes — all in one delivery package.",
      },
    ],
    deliverables: [
      "Print version (300 DPI PDF / PNG)",
      "Web-optimized export (72 DPI PNG)",
      "Social media portrait & square sizes",
      "Editable source file",
      "Unlimited data or text corrections",
    ],
  },

  flyers: {
    icon: "🗂️",
    tag: "MARKETING DESIGN",
    title: "Flyers & Marketing",
    image: "../images/flyer.jpg",
    overview:
      "Make your event, product, or service impossible to ignore. TechWizards designs marketing flyers that combine bold visuals with persuasive messaging — whether you're distributing them physically in your community or going digital across social media platforms.",
    process: [
      {
        num: "01",
        title: "Creative Brief",
        desc: "You share the event or product details, your target audience, tone (fun, professional, urgent), and any visual references or color preferences.",
      },
      {
        num: "02",
        title: "Layout Concepts",
        desc: "We develop one or two distinct layout concepts for you to choose from, each with its own visual direction, typography, and hierarchy.",
      },
      {
        num: "03",
        title: "Design Refinement",
        desc: "We take your chosen concept and refine every element — imagery, color balance, text sizing, and spacing — until it's visually perfect.",
      },
      {
        num: "04",
        title: "Content Finalization",
        desc: "You confirm all copy, dates, contact info, and branding elements are completely accurate before we prepare the final exports.",
      },
      {
        num: "05",
        title: "Final Delivery",
        desc: "Print-ready and digital versions are exported together so you can go straight from the file to the printer or upload directly to social media.",
      },
    ],
    deliverables: [
      "Print-ready file (300 DPI, PDF/PNG)",
      "Digital / social media version",
      "Multiple standard size formats",
      "Source file (PSD or AI)",
      "Revisions included until approved",
    ],
  },

  logos: {
    icon: "🏷️",
    tag: "BRAND IDENTITY",
    title: "Logos & Branding",
    image: "../images/logozz.jpg",
    overview:
      "Your logo is the first impression your organization makes on the world. TechWizards creates distinctive, professional logo designs paired with complete brand identity systems — color palettes, typography, and usage guidelines — ensuring your brand is consistent and trusted everywhere it appears.",
    process: [
      {
        num: "01",
        title: "Brand Discovery Session",
        desc: "We learn everything about your organization — its mission, values, audience, competitors, and the emotional tone you want your brand to convey.",
      },
      {
        num: "02",
        title: "Concept Exploration",
        desc: "We develop multiple logo directions (wordmarks, pictorials, emblems, combinations) before narrowing down to the strongest contenders for your feedback.",
      },
      {
        num: "03",
        title: "Digital Refinement",
        desc: "The chosen concepts are refined in full vector format with multiple color variants: full color, dark background, light background, and monochrome.",
      },
      {
        num: "04",
        title: "Brand Guide Creation",
        desc: "We document your official color codes (hex, RGB, CMYK), typography pairings, spacing rules, and logo usage guidelines into a professional PDF guide.",
      },
      {
        num: "05",
        title: "Full Asset Delivery",
        desc: "Every file format you will ever need is organized and delivered — from scalable vectors for large print to crisp PNGs for web and social media.",
      },
    ],
    deliverables: [
      "Logo in SVG, AI, EPS (vector)",
      "Logo in PNG and JPG (raster)",
      "All color variants (color, mono, dark, light)",
      "Brand guidelines PDF",
      "Social media profile & cover kit",
    ],
  },

  powerpoint: {
    icon: "🎞️",
    tag: "PRESENTATION DESIGN",
    title: "PowerPoint Presentations",
    image: "../images/powpt.jpg",
    overview:
      "Whether it's a thesis defense, company pitch, academic report, or institutional briefing — TechWizards designs PowerPoint presentations that elevate your content. We combine professional layout, custom graphics, clean typography, and smooth transitions so your ideas land with maximum clarity and impact.",
    process: [
      {
        num: "01",
        title: "Content Review",
        desc: "You share your raw written content, an outline, or existing draft slides. We study the material to understand the narrative and identify key messages.",
      },
      {
        num: "02",
        title: "Template Design",
        desc: "We design a custom slide template that matches your brand identity, school colors, or the professional theme your presentation calls for.",
      },
      {
        num: "03",
        title: "Slide-by-Slide Layout",
        desc: "Each slide is individually designed — balancing text, visuals, icons, data charts, and whitespace for maximum readability and visual impact.",
      },
      {
        num: "04",
        title: "Animations & Transitions",
        desc: "Smooth, professional animations are applied to reinforce your narrative flow without being distracting or overly theatrical.",
      },
      {
        num: "05",
        title: "Final Review & Export",
        desc: "You review the complete deck, request any last tweaks, then receive the fully editable PPTX file and a clean PDF export.",
      },
    ],
    deliverables: [
      "Fully editable PowerPoint (.pptx)",
      "PDF export for sharing & printing",
      "Custom slide animations & transitions",
      "Speaker notes formatting (on request)",
      "Revisions until completely satisfied",
    ],
  },

  uiux: {
    icon: "🎨",
    tag: "INTERFACE DESIGN",
    title: "UI / UX Design",
    image: "../images/awtss.jpg",
    overview:
      "Great digital products start with great design. TechWizards delivers user-centered interface design rooted in research and refined through prototyping. From wireframes to polished high-fidelity screens, we design digital experiences that are intuitive, accessible, and visually compelling — fully ready for developer handoff.",
    process: [
      {
        num: "01",
        title: "User Research",
        desc: "We study your target users — their goals, behaviors, and frustrations — through interviews, surveys, or analysis of existing usage patterns.",
      },
      {
        num: "02",
        title: "Information Architecture",
        desc: "We organize your content and define the navigation structure, ensuring users always know where they are and can reach what they need effortlessly.",
      },
      {
        num: "03",
        title: "Wireframing",
        desc: "Low-fidelity blueprint screens map out every key view and interaction — the skeleton of the product before any visual styling begins.",
      },
      {
        num: "04",
        title: "Interactive Prototype",
        desc: "A clickable, fully navigable prototype is built so stakeholders can experience the actual product flow before a single line of code is written.",
      },
      {
        num: "05",
        title: "High-Fidelity UI",
        desc: "Polished, pixel-perfect final screens are designed with a complete visual system — colors, typography, icons, components, spacing, and all interactive states.",
      },
    ],
    deliverables: [
      "Figma design files (organized)",
      "Clickable interactive prototype",
      "Design system & component library",
      "User flow & journey maps",
      "Developer handoff documentation",
    ],
  },
};

// ─── Modal Logic ───
const svModal = document.getElementById("svModal");
const svModalBox = document.getElementById("svModalBox");
const svModalClose = document.getElementById("svModalClose");
const svBackdrop = document.getElementById("svBackdrop");
const svContent = document.getElementById("svModalContent");

function buildModalHTML(data) {
  const stepsHTML = data.process
    .map(
      (step) => `
    <div class="svm-step">
      <div class="svm-step-left">
        <div class="svm-step-num">${step.num}</div>
        <div class="svm-step-line"></div>
      </div>
      <div class="svm-step-info">
        <strong>${step.title}</strong>
        <p>${step.desc}</p>
      </div>
    </div>
  `,
    )
    .join("");

  const deliverablesHTML = data.deliverables
    .map(
      (item) => `
    <li><span class="svm-check">✓</span>${item}</li>
  `,
    )
    .join("");

  return `
    <div class="svm-img-header">
      <img src="${data.image}" alt="${data.title}" />
      <div class="svm-img-overlay">
        <div class="section-tag">${data.tag}</div>
        <h2><span class="svm-icon-badge">${data.icon}</span> ${data.title}</h2>
      </div>
    </div>
    <div class="svm-body">
      <p class="svm-overview">${data.overview}</p>

      <div class="svm-section">
        <div class="svm-section-label">
          <div class="svm-label-icon">⚙️</div>
          <h4>HOW WE WORK</h4>
        </div>
        <div class="svm-process">${stepsHTML}</div>
      </div>

      <div class="svm-section">
        <div class="svm-section-label">
          <div class="svm-label-icon">📦</div>
          <h4>WHAT YOU GET</h4>
        </div>
        <ul class="svm-deliverables">${deliverablesHTML}</ul>
      </div>

      <div class="svm-cta-row">
        <button class="btn-primary svm-get-started">Get Started →</button>
        <a href="https://www.facebook.com/profile.php?id=61587937806654" target="_blank" rel="noopener" class="btn-secondary">Message Us on Facebook</a>
      </div>
    </div>
  `;
}

function openModal(serviceKey) {
  const data = SERVICES[serviceKey];
  if (!data) return;
  svContent.innerHTML = buildModalHTML(data);
  svModalBox.scrollTop = 0;
  svModal.classList.add("open");
  document.body.style.overflow = "hidden";
  addCursorHover(".sv-modal-close, .svm-cta-row a");
}

function closeModal() {
  svModal.classList.remove("open");
  document.body.style.overflow = "";
}

// Card click
document.querySelectorAll(".sv-card").forEach((card) => {
  card.addEventListener("click", () => openModal(card.dataset.service));
});

// Footer service links
document.querySelectorAll(".sv-footer-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(link.dataset.service);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

svModalClose.addEventListener("click", closeModal);
svBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeContactModal();
  }
});

// ── "Get Started" → Contact Modal ──────────────────────
const contactModal = document.getElementById("contactModal");
const contactBackdrop = document.getElementById("contactBackdrop");

function openContactModal() {
  closeModal();
  contactModal.classList.add("open");
  document.body.style.overflow = "hidden";
  if (typeof window.resetContactForm === "function") window.resetContactForm();
}

function closeContactModal() {
  if (!contactModal) return;
  contactModal.classList.remove("open");
  document.body.style.overflow = "";
}

// Delegate — "Get Started" buttons are injected dynamically
document.addEventListener("click", (e) => {
  if (e.target.closest(".svm-get-started")) openContactModal();
});

document
  .getElementById("closeContact")
  ?.addEventListener("click", closeContactModal);
document
  .getElementById("successClose")
  ?.addEventListener("click", closeContactModal);
document.getElementById("sendAnother")?.addEventListener("click", () => {
  document.getElementById("contactSuccess").style.display = "none";
  document.getElementById("contactForm").style.display = "block";
});
contactBackdrop?.addEventListener("click", closeContactModal);
