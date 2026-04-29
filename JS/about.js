const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");
const finePointer = window.matchMedia("(pointer: fine)").matches;
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function applyCursorHover(selector) {
  if (!finePointer || !cursor || !cursorRing) return;

  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
      cursorRing.style.transform = "translate(-50%, -50%) scale(1.3)";
      cursorRing.style.borderColor = "rgba(0, 245, 255, 0.9)";
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursorRing.style.transform = "translate(-50%, -50%) scale(1)";
      cursorRing.style.borderColor = "rgba(0, 245, 255, 0.5)";
    });
  });
}

if (finePointer && cursor && cursorRing) {
  document.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;

    setTimeout(() => {
      cursorRing.style.left = `${event.clientX}px`;
      cursorRing.style.top = `${event.clientY}px`;
    }, 80);
  });

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.6)";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
}

applyCursorHover(
  "a, button, .signal-card, .about-stat-card, .purpose-card, .process-card, .location-card, .map-shell, .cta-panel",
);

const canvas = document.getElementById("particles");
const ctx = canvas?.getContext("2d");

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particleCount = reduceMotion ? 36 : 80;
const particles = [];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    if (!canvas) return;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.35;
    this.speedY = (Math.random() - 0.5) * 0.35;
    this.opacity = Math.random() * 0.45 + 0.08;
    this.pulse = Math.random() * Math.PI * 2;
  }

  update() {
    if (!canvas) return;
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulse += 0.02;

    if (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    ) {
      this.reset();
    }
  }

  draw() {
    if (!ctx) return;
    const alpha = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 245, 255, ${alpha})`;
    ctx.fill();
  }
}

if (canvas && ctx) {
  for (let index = 0; index < particleCount; index += 1) {
    particles.push(new Particle());
  }

  const drawConnections = () => {
    for (let first = 0; first < particles.length; first += 1) {
      for (let second = first + 1; second < particles.length; second += 1) {
        const dx = particles[first].x - particles[second].x;
        const dy = particles[first].y - particles[second].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 245, 255, ${0.12 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[first].x, particles[first].y);
          ctx.lineTo(particles[second].x, particles[second].y);
          ctx.stroke();
        }
      }
    }
  };

  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    drawConnections();
    requestAnimationFrame(animateParticles);
  };

  animateParticles();
}

const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  nav?.classList.toggle("scrolled", window.scrollY > 60);
});

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger?.addEventListener("click", () => {
  navLinks?.classList.toggle("open");
  hamburger.classList.toggle("active");
  hamburger.setAttribute(
    "aria-expanded",
    hamburger.classList.contains("active") ? "true" : "false",
  );
});

const revealTargets = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);

if (reduceMotion) {
  revealTargets.forEach((element) => element.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), index * 70);
        }
      });
    },
    { threshold: 0.14 },
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
}

function animateCounter(element) {
  const target = Number.parseInt(element.dataset.target || "0", 10);
  const suffix = element.dataset.suffix || "";
  const duration = 1800;
  const start = performance.now();

  const update = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.floor(eased * target)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
}

const counters = document.querySelectorAll(".counter-value");

if (reduceMotion) {
  counters.forEach((element) => {
    element.textContent = `${element.dataset.target || "0"}${element.dataset.suffix || ""}`;
  });
} else {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = "true";
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.45 },
  );

  counters.forEach((element) => counterObserver.observe(element));
}

const typedElement = document.querySelector(".typed-purpose");
const purposeWords = ["clarity", "access", "trust", "relief", "progress"];

if (typedElement) {
  if (reduceMotion) {
    typedElement.textContent = purposeWords[0];
  } else {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typeLoop = () => {
      const currentWord = purposeWords[wordIndex];

      if (deleting) {
        charIndex -= 1;
        typedElement.textContent = currentWord.substring(0, charIndex);

        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % purposeWords.length;
        }

        setTimeout(typeLoop, 55);
      } else {
        charIndex += 1;
        typedElement.textContent = currentWord.substring(0, charIndex);

        if (charIndex === currentWord.length) {
          deleting = true;
          setTimeout(typeLoop, 1350);
        } else {
          setTimeout(typeLoop, 95);
        }
      }
    };

    typeLoop();
  }
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") {
      event.preventDefault();
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    navLinks?.classList.remove("open");
    hamburger?.classList.remove("active");
    hamburger?.setAttribute("aria-expanded", "false");
  });
});
