/* ── TechWizards Portfolio Page JS ── */

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

function applyCursorHover(selector) {
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
applyCursorHover("a, button, .pt-card, .pt-member-card, .pt-stat");

// ─── Particle System ───
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const ptParticles = [];
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
for (let i = 0; i < 80; i++) ptParticles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < ptParticles.length; i++) {
    for (let j = i + 1; j < ptParticles.length; j++) {
      const dx = ptParticles[i].x - ptParticles[j].x;
      const dy = ptParticles[i].y - ptParticles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,245,255,${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(ptParticles[i].x, ptParticles[i].y);
        ctx.lineTo(ptParticles[j].x, ptParticles[j].y);
        ctx.stroke();
      }
    }
  }
}

(function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ptParticles.forEach((p) => {
    p.update();
    p.draw();
  });
  drawConnections();
  requestAnimationFrame(animateParticles);
})();

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
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting)
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
    });
  },
  { threshold: 0.1 },
);
document
  .querySelectorAll(".reveal, .reveal-left, .reveal-right")
  .forEach((el) => revealObserver.observe(el));

// ─── Counter Animation ───
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const duration = 2000;
  const start = performance.now();
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = "true";
        animateCounter(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);
document
  .querySelectorAll(".pt-stat-num")
  .forEach((el) => counterObs.observe(el));

const TEAM = [
  {
    name: "Almonzor S. Manzan",
    initials: "AM",
    role: "Full-Stack Developer",
    color: "#00f5ff",
    glow: "rgba(0,245,255,0.25)",
    gradient: "linear-gradient(135deg, #00c8d4, #006080)",
    skills: [
      "Web Development",
      "Mobile Apps",
      "Backend & API",
      "Security and Penetration Testing",
    ],
    projects: 15,
    github: "https://github.com/manzanalmonzor-spec",
  },
  {
    name: "Khing Jay C. Regala",
    initials: "KR",
    role: "UI/UX & Frontend Dev",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.25)",
    gradient: "linear-gradient(135deg, #a855f7, #6d28d9)",
    skills: ["UI / UX Design", "Backend Developer", "Frontend Dev"],
    projects: 11,
    github: "https://github.com/Kaisecret",
  },
  {
    name: "Dan Louise J. Baluntong",
    initials: "DB",
    role: "Mobile Developer & Designer",
    color: "#10b981",
    glow: "rgba(16,185,129,0.25)",
    gradient: "linear-gradient(135deg, #10b981, #065f46)",
    skills: ["Mobile Development", "App UI Design", "Presentation"],
    projects: 5,
    github: null,
  },
  {
    name: "Matt Lowee Espiritu",
    initials: "ME",
    role: "Graphic Designer",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.25)",
    gradient: "linear-gradient(135deg, #f59e0b, #92400e)",
    skills: ["Print Design", "Tarpaulin & Flyers", "Infographics"],
    projects: 5,
    github: null,
  },
];

// ─── Project Data ───
const PROJECTS = [
  {
    id: 1,
    title: "Technology & Healthcare Mobile Application",
    subtitle: "Mobile Application",
    category: "mobile",
    tag: "MOBILE",
    image: "../images/mobile.jpg",
    desc: "Created a local store and festival mobile system, a drone tracker that extinguishes fires, and a Viropox detector system.",
    tech: ["Local Store System", "Festival Mobile System", "Drone Tracker"],
    contributor: "Almonzor S. Manzan",
    initials: "AM",
    avatarGradient: "linear-gradient(135deg, #00c8d4, #006080)",
    github: "https://github.com/manzanalmonzor-spec",
  },
  {
    id: 2,
    title: "Technology & Healthcare Mobile Application",
    subtitle: "Mobile UI / UX Design",
    category: "mobile",
    tag: "MOBILE",
    image: "../images/mobile.jpg",
    desc: "Created the UI / UX design of the mobile applications.",
    tech: ["UI / UX Design", "Wireframing", "Mobile Layouts"],
    contributor: "Dan Louise J. Baluntong",
    initials: "DB",
    avatarGradient: "linear-gradient(135deg, #10b981, #065f46)",
    github: null,
  },
  {
    id: 3,
    title: "Technology & Healthcare Mobile Application",
    subtitle: "Mobile Color Design",
    category: "mobile",
    tag: "MOBILE",
    image: "../images/mobile.jpg",
    desc: "Created the color combination for a greater UI / UX.",
    tech: ["Color Combination", "Visual Design", "UI Polish"],
    contributor: "Matt Lowee Espiritu",
    initials: "ME",
    avatarGradient: "linear-gradient(135deg, #f59e0b, #92400e)",
    github: null,
  },
  {
    id: 4,
    title: "Website Security Polishing",
    subtitle: "PWA Security",
    category: "web",
    tag: "WEB",
    image: "../images/website.jpg",
    desc: "Securing the PWA (Portable Web Application).",
    tech: ["PWA Security", "Security Hardening", "Web Protection"],
    contributor: "Almonzor S. Manzan",
    initials: "AM",
    avatarGradient: "linear-gradient(135deg, #00c8d4, #006080)",
    github: "https://github.com/manzanalmonzor-spec",
  },
  {
    id: 5,
    title: "Website Application",
    subtitle: "Client Website Build",
    category: "web",
    tag: "WEB",
    image: "../images/website.jpg",
    desc: "Created the website application for clients.",
    tech: ["Website Application", "Client Solutions", "Web Development"],
    contributor: "Khing Jay C. Regala",
    initials: "KR",
    avatarGradient: "linear-gradient(135deg, #a855f7, #6d28d9)",
    github: "https://github.com/Kaisecret",
  },
  {
    id: 6,
    title: "Website Deployment",
    subtitle: "Secure Deployment",
    category: "web",
    tag: "WEB",
    image: "../images/website.jpg",
    desc: "Deployed safe and secure website applications.",
    tech: ["Website Deployment", "Production Setup", "Secure Hosting"],
    contributor: "Khing Jay C. Regala",
    initials: "KR",
    avatarGradient: "linear-gradient(135deg, #a855f7, #6d28d9)",
    github: "https://github.com/Kaisecret",
  },
  {
    id: 7,
    title: "Tarpaulin",
    subtitle: "Tarpaulin Design",
    category: "tarpaulin",
    tag: "PRINT",
    image: "../images/tarp.jpg",
    desc: "Created tarpaulin designs for clients.",
    tech: ["Tarpaulin Design", "Print Layout", "Client Visuals"],
    contributor: "Dan Louise J. Baluntong",
    initials: "DB",
    avatarGradient: "linear-gradient(135deg, #10b981, #065f46)",
    github: null,
  },
  {
    id: 8,
    title: "Infographics",
    subtitle: "Infographic Design",
    category: "infographic",
    tag: "INFO",
    image: "../images/infographic.jpg",
    desc: "Created infographics for clients.",
    tech: ["Infographics", "Visual Information", "Client Design"],
    contributor: "Matt Lowee Espiritu",
    initials: "ME",
    avatarGradient: "linear-gradient(135deg, #f59e0b, #92400e)",
    github: null,
  },
  {
    id: 9,
    title: "Flyers",
    subtitle: "Flyer Design",
    category: "flyer",
    tag: "FLYER",
    image: "../images/flyer.jpg",
    desc: "Created flyers for clients.",
    tech: ["Flyer Design", "Marketing Layout", "Client Promotion"],
    contributor: "Matt Lowee Espiritu",
    initials: "ME",
    avatarGradient: "linear-gradient(135deg, #f59e0b, #92400e)",
    github: null,
  },
  {
    id: 10,
    title: "Logo",
    subtitle: "Custom Logo Design",
    category: "logo",
    tag: "LOGO",
    image: "../images/logozz.jpg",
    desc: "Created specific customizations based on every client's needs.",
    tech: ["Logo Design", "Custom Branding", "Client Identity"],
    contributor: "Almonzor S. Manzan",
    initials: "AM",
    avatarGradient: "linear-gradient(135deg, #00c8d4, #006080)",
    github: "https://github.com/manzanalmonzor-spec",
  },
  {
    id: 11,
    title: "PowerPoint Presentation",
    subtitle: "PowerPoint Presentation",
    category: "ppt",
    tag: "PPT",
    image: "../images/powpt.jpg",
    desc: "Created customized PowerPoint presentations for clients.",
    tech: ["PowerPoint", "Presentation Design", "Custom Slides"],
    contributor: "Dan Louise J. Baluntong",
    initials: "DB",
    avatarGradient: "linear-gradient(135deg, #10b981, #065f46)",
    github: null,
  },
  {
    id: 12,
    title: "Logo Finalization",
    subtitle: "Final Branding Details",
    category: "uiux",
    tag: "FINALIZE",
    image: "../images/logozz.jpg",
    desc: "Finalized the details of every customized logo.",
    tech: ["Logo Finalization", "Brand Refinement", "Final Output"],
    contributor: "Khing Jay C. Regala",
    initials: "KR",
    avatarGradient: "linear-gradient(135deg, #a855f7, #6d28d9)",
    github: "https://github.com/Kaisecret",
  },
];

// ─── Render Portfolio Grid ───
function renderProjects(filter) {
  const grid = document.getElementById("ptGrid");
  const filtered =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  grid.innerHTML = filtered
    .map(
      (p, i) => `
    <div class="pt-card reveal" data-id="${p.id}">
      <img src="${p.image}" alt="${p.title}" loading="lazy" />
      <div class="pt-card-contributor" style="background:${p.avatarGradient}">${p.initials}</div>
      <div class="pt-card-label">
        <span class="pt-card-label-tag">${p.tag}</span>
        <span class="pt-card-label-title">${p.title}</span>
      </div>
      <div class="pt-card-overlay">
        <span class="pt-card-overlay-tag">${p.tag}</span>
        <span class="pt-card-overlay-title">${p.title}</span>
        <span class="pt-card-overlay-hint">Click to View</span>
      </div>
    </div>
  `,
    )
    .join("");

  grid.querySelectorAll(".pt-card").forEach((card) => {
    revealObserver.observe(card);
    card.addEventListener("click", () => {
      const project = PROJECTS.find((p) => p.id === parseInt(card.dataset.id));
      if (project) openProjectModal(project);
    });
  });

  applyCursorHover(".pt-card");
}

// ─── Render Team ───
function renderTeam() {
  document.getElementById("ptTeamGrid").innerHTML = TEAM.map(
    (m) => `
    <div class="pt-member-card reveal" style="--member-color:${m.color};--member-glow:${m.glow}">
      <div class="pt-avatar" style="background:${m.gradient}">${m.initials}</div>
      <div class="pt-member-name">${m.name}</div>
      <div class="pt-member-role">${m.role}</div>
      <div class="pt-member-divider"></div>
      <div class="pt-member-skills">
        ${m.skills
          .map(
            (s) => `
          <div class="pt-skill-tag">
            <span class="pt-skill-dot"></span>${s}
          </div>
        `,
          )
          .join("")}
      </div>
      <div class="pt-member-stats">
        <div class="pt-member-stat">
          <span class="pt-member-stat-num">${m.projects}+</span>
          <span class="pt-member-stat-label">Projects</span>
        </div>
        <div class="pt-member-stat">
          <span class="pt-member-stat-num">100%</span>
          <span class="pt-member-stat-label">Dedicated</span>
        </div>
      </div>
      ${
        m.github
          ? `<a href="${m.github}" target="_blank" rel="noopener" class="pt-github-btn has-github">
             <span class="pt-github-icon">⌥</span> View GitHub →
           </a>`
          : `<div class="pt-github-btn no-github">
             ○ GitHub Coming Soon
           </div>`
      }
    </div>
  `,
  ).join("");

  document
    .querySelectorAll(".pt-member-card")
    .forEach((el) => revealObserver.observe(el));
  applyCursorHover(".pt-member-card, .pt-github-btn.has-github");
}

// ─── Filter Buttons ───
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

// ─── Project Modal ───
const ptModal = document.getElementById("ptModal");
const ptModalBox = document.getElementById("ptModalBox");

function openProjectModal(project) {
  const techTags = project.tech
    .map((t) => `<span class="ptm-tech-tag">${t}</span>`)
    .join("");
  const githubBtn = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener" class="btn-primary">View on GitHub →</a>`
    : `<div class="ptm-no-github">No GitHub Profile Yet</div>`;

  document.getElementById("ptModalContent").innerHTML = `
    <div class="ptm-img">
      <img src="${project.image}" alt="${project.title}" />
      <div class="ptm-img-overlay">
        <span class="ptm-tag">${project.tag}</span>
        <div class="ptm-title">${project.title}</div>
        <div class="ptm-subtitle">${project.subtitle}</div>
      </div>
    </div>
    <div class="ptm-body">
      <p class="ptm-desc">${project.desc}</p>
      <div class="ptm-tech-row">${techTags}</div>
      <div class="ptm-contributor-row">
        <div class="ptm-contrib-avatar" style="background:${project.avatarGradient}">${project.initials}</div>
        <div class="ptm-contrib-info">
          <span class="ptm-contrib-label">BUILT BY</span>
          <span class="ptm-contrib-name">${project.contributor}</span>
        </div>
      </div>
      <div class="ptm-cta-row">
        ${githubBtn}
        <a href="services.html" class="btn-secondary">Explore Services</a>
      </div>
    </div>
  `;

  ptModalBox.scrollTop = 0;
  ptModal.classList.add("open");
  document.body.style.overflow = "hidden";
  applyCursorHover(".pt-modal-close, .ptm-cta-row a");
}

function closeProjectModal() {
  ptModal.classList.remove("open");
  document.body.style.overflow = "";
}

document
  .getElementById("ptModalClose")
  .addEventListener("click", closeProjectModal);
document
  .getElementById("ptBackdrop")
  .addEventListener("click", closeProjectModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProjectModal();
});

// ─── Init ───
renderProjects("all");
renderTeam();
