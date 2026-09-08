// Grand Finale Interactive Scripts & Particle Animation

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.slide');
  
  // Track active slide and apply entrance animations
  const observerOptions = {
    root: container,
    rootMargin: '0px',
    threshold: 0.4
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const content = entry.target.querySelector('.content');
      if (entry.isIntersecting) {
        content.style.animation = 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      } else {
        content.style.animation = 'none';
        content.style.opacity = '0';
      }
    });
  }, observerOptions);
  
  slides.forEach(slide => observer.observe(slide));

  // Canvas Confetti & Sparkles Celebration System
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const colors = [
    '#ffd700', // Gold
    '#ffe066', // Light Gold
    '#f59e0b', // Amber
    '#f43f5e', // Rose Pink
    '#38bdf8', // Sky Blue
    '#ffffff', // White
    '#c084fc'  // Soft Violet
  ];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 7 + 4;
      this.speedY = Math.random() * 1.5 + 0.8;
      this.speedX = Math.random() * 1.2 - 0.6;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 4;
      this.oscillationSpeed = Math.random() * 0.03 + 0.01;
      this.oscillationDistance = Math.random() * 1.5 + 0.5;
      this.angle = Math.random() * Math.PI * 2;
      this.shape = Math.random() > 0.4 ? 'rect' : 'circle';
      this.opacity = Math.random() * 0.5 + 0.5;
    }

    update() {
      this.angle += this.oscillationSpeed;
      this.x += Math.sin(this.angle) * this.oscillationDistance + this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      if (this.shape === 'rect') {
        ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Optimize particle count for 60fps across mobile and desktop
  const particleCount = window.innerWidth < 600 ? 45 : 75;
  const particles = Array.from({ length: particleCount }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});

