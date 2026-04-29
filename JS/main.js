/* ── TechWizards Main JS ── */

// Custom Cursor
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

document
  .querySelectorAll("a, button, .service-card, .portfolio-item, .skill-tag")
  .forEach((el) => {
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

// Particle system
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = [];
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
    ctx.fillStyle = `rgba(0, 245, 255, ${alpha})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 245, 255, ${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Navbar scroll behavior
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 60);
});

// Mobile hamburger
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
});

// Reveal on scroll
const revealEls = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
      }
    });
  },
  { threshold: 0.12 },
);

revealEls.forEach((el) => observer.observe(el));

// Typed hero subtitle
const words = ["Innovation", "Performance", "Precision", "Excellence"];
let wordIdx = 0,
  charIdx = 0,
  deleting = false;
const typedEl = document.querySelector(".typed-text");

function typeLoop() {
  if (!typedEl) return;
  const word = words[wordIdx];
  if (deleting) {
    typedEl.textContent = word.substring(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      wordIdx = (wordIdx + 1) % words.length;
    }
    setTimeout(typeLoop, 60);
  } else {
    typedEl.textContent = word.substring(0, ++charIdx);
    if (charIdx === word.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
    } else setTimeout(typeLoop, 110);
  }
}
typeLoop();

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const duration = 1800;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = true;
        animateCounter(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".counter-value")
  .forEach((el) => counterObserver.observe(el));

// Portfolio filter
const filterBtns = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    portfolioItems.forEach((item) => {
      const match = filter === "all" || item.dataset.category === filter;
      item.style.opacity = match ? "1" : "0.2";
      item.style.pointerEvents = match ? "all" : "none";
      item.style.transform = match ? "" : "scale(0.95)";
    });
  });
});

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".portfolio-item[data-src]").forEach((item) => {
  item.addEventListener("click", () => {
    lightboxImg.src = item.dataset.src;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove("open");
  if (!document.getElementById("contactModal").classList.contains("open")) {
    document.body.style.overflow = "";
  }
}

// ── Contact Modal ──
const contactModal = document.getElementById("contactModal");
const contactBackdrop = document.getElementById("contactBackdrop");
// contactForm & contactSuccess are managed by firebase-contact.js

function openContactModal(e) {
  e?.preventDefault();
  contactModal.classList.add("open");
  document.body.style.overflow = "hidden";
  // Always reset to fresh form state (firebase-contact.js exposes this)
  if (typeof window.resetContactForm === "function") window.resetContactForm();
}

function closeContactModal() {
  contactModal.classList.remove("open");
  document.body.style.overflow = "";
}

document
  .getElementById("openContact")
  ?.addEventListener("click", openContactModal);
document
  .getElementById("openContactHero")
  ?.addEventListener("click", openContactModal);
document
  .getElementById("openContactFooter")
  ?.addEventListener("click", openContactModal);
document
  .getElementById("closeContact")
  ?.addEventListener("click", closeContactModal);
document
  .getElementById("successClose")
  ?.addEventListener("click", closeContactModal);
contactBackdrop?.addEventListener("click", closeContactModal);
// Form submission is handled entirely by JS/firebase-contact.js

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
    closeContactModal();
  }
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") {
      e.preventDefault();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      navLinks?.classList.remove("open");
    }
  });
});

// Active nav highlight
const sections = document.querySelectorAll("section[id]");
const navAnchorEls = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchorEls.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

// Card tilt on mouse move
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition = "transform 0.5s ease";
  });
  card.addEventListener("mouseenter", () => {
    card.style.transition =
      "transform 0.1s ease, border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease";
  });
});
