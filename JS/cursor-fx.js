(function cursorFX() {
  // Only run on fine-pointer devices (mouse)
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;z-index:9990;pointer-events:none;";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const pool = [];

  class Spark {
    constructor(x, y, isClick) {
      this.x = x;
      this.y = y;

      if (isClick) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.85;
        const speed = Math.random() * 5.5 + 2.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.r = Math.random() * 3.5 + 1.5;
        this.decay = Math.random() * 0.016 + 0.012;
      } else {
        this.vx = (Math.random() - 0.5) * 1.4;
        this.vy = -(Math.random() * 1.8 + 0.5);
        this.r = Math.random() * 1.6 + 0.4;
        this.decay = Math.random() * 0.045 + 0.03;
      }

      this.alpha = 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.97;
      this.vy -= 0.05; // buoyancy — all sparks drift upward over time
      this.r *= 0.972;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0 || this.r < 0.1) return;

      const a = Math.max(0, this.alpha);
      ctx.save();
      ctx.globalAlpha = a;

      // Outer soft glow
      const grd = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.r * 2.5,
      );
      grd.addColorStop(0, `rgba(0,245,255,${a * 0.9})`);
      grd.addColorStop(0.4, `rgba(0,210,240,${a * 0.5})`);
      grd.addColorStop(1, "rgba(0,200,255,0)");

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Bright core
      ctx.shadowBlur = 12;
      ctx.shadowColor = `rgba(0,245,255,${a})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,255,255,${a})`;
      ctx.fill();

      ctx.restore();
    }

    dead() {
      return this.alpha <= 0 || this.r < 0.1;
    }
  }

  let mx = 0,
    my = 0,
    frame = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  document.addEventListener("click", (e) => {
    // Prevent accidental scroll-to-top on bare # links
    if (e.target.closest('a[href="#"]')) e.preventDefault();
    for (let i = 0; i < 22; i++)
      pool.push(new Spark(e.clientX, e.clientY, true));
  });

  (function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn one trail spark every other frame
    if (frame % 2 === 0) pool.push(new Spark(mx, my, false));
    frame++;

    for (let i = pool.length - 1; i >= 0; i--) {
      pool[i].update();
      pool[i].draw();
      if (pool[i].dead()) pool.splice(i, 1);
    }

    requestAnimationFrame(loop);
  })();
})();
