
document.addEventListener('DOMContentLoaded', () => {
  initScrollHeader();
  initTypingEffect();
  initScrollSpy();
  initCard3DTilt();
  initCursorGlow();
  initScrollReveal();
  initButtonRipples();
  initContactForm();
});

function initScrollHeader() {
  const header = document.querySelector('header');
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress-bar';
  progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#38bdf8,#2563eb);z-index:999;transition:width 0.1s;';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progressBar.style.width = `${scrollPercent}%`;
    if (scrollY > 50) {
      header.style.background = 'rgba(3, 7, 18, 0.9)';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
    } else {
      header.style.background = 'rgba(3, 7, 18, 0.75)';
      header.style.boxShadow = 'none';
    }
  });
}

function initTypingEffect() {
  const roles = ['Software Engineer', 'Cloud Innovator', 'Full-Stack Developer', 'Tech Entrepreneur'];
  const targetElement = document.querySelector('.hero-desc');
  if (!targetElement) return;
  const typeContainer = document.createElement('div');
  typeContainer.className = 'typing-container';
  typeContainer.style.cssText = 'color:#38bdf8;font-weight:600;margin-top:6px;font-size:1rem;height:24px;';
  typeContainer.innerHTML = 'Focus: <span class="typing-text"></span><span class="typing-cursor">|</span>';
  targetElement.insertAdjacentElement('afterend', typeContainer);
  const textSpan = typeContainer.querySelector('.typing-text'), cursorSpan = typeContainer.querySelector('.typing-cursor');
  setInterval(() => { cursorSpan.style.opacity = cursorSpan.style.opacity === '0' ? '1' : '0'; }, 400);
  let roleIdx = 0, charIdx = 0, isDeleting = false;
  function tick() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      charIdx--;
      textSpan.textContent = currentRole.substring(0, charIdx);
    } else {
      charIdx++;
      textSpan.textContent = currentRole.substring(0, charIdx);
    }
    let delta = isDeleting ? 60 : 120;
    if (!isDeleting && charIdx === currentRole.length) {
      delta = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delta = 400;
    }
    setTimeout(tick, delta);
  }
  tick();
}
/* 3. SCROLLSPY ACTIVE NAVIGATION */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav a');
  if (!sections.length || !navLinks.length) return;
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop, height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
        link.style.color = '#38bdf8';
        link.style.textShadow = '0 0 10px rgba(56,189,248,0.6)';
      } else {
        link.style.color = '#94a3b8';
        link.style.textShadow = 'none';
      }
    });
  });
}

function initCard3DTilt() {
  const cards = document.querySelectorAll('.about-card, .arsenal-card, .featured-card, .mini-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const centerX = rect.width / 2, centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7, rotateY = ((x - centerX) / centerX) * 7;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

function initCursorGlow() {
  const glow = document.createElement('div');
  glow.className = 'cursor-ambient-glow';
  glow.style.cssText = 'position:fixed;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(56,189,248,0.12),transparent 65%);pointer-events:none;transform:translate(-50%,-50%);z-index:9998;transition:transform 0.08s ease-out;';
  document.body.appendChild(glow);
  window.addEventListener('mousemove', e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.about-card, .arsenal-card, .featured-card, .mini-card, .pillar-item');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

function initButtonRipples() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .nav-btn');
  buttons.forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', function(e) {
      const circle = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2, rect = this.getBoundingClientRect();
      circle.style.cssText = `position:absolute;width:${diameter}px;height:${diameter}px;left:${e.clientX - rect.left - radius}px;top:${e.clientY - rect.top - radius}px;border-radius:50%;background:rgba(255,255,255,0.3);transform:scale(0);animation:rippleEffect 0.6s linear;pointer-events:none;`;
      const existingRipple = this.querySelector('.ripple-effect');
      if (existingRipple) existingRipple.remove();
      circle.className = 'ripple-effect';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });
  const styleSheet = document.createElement('style');
  styleSheet.textContent = '@keyframes rippleEffect{to{transform:scale(3.5);opacity:0;}}'; 
  document.head.appendChild(styleSheet);
}

function initContactForm() {
  const form = document.querySelector('.quick-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Transmitting...';
    submitBtn.disabled = true;
    setTimeout(() => {
      showToast('Transmission Received! Legacy awaits.');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 800);
  });
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:25px;right:25px;background:rgba(4,9,26,0.95);border:1px solid #38bdf8;box-shadow:0 0 20px rgba(56,189,248,0.4);color:#fff;padding:14px 24px;border-radius:12px;font-size:0.88rem;font-weight:600;z-index:9999;transform:translateY(50px);opacity:0;transition:all 0.4s ease;';
  toast.innerHTML = `<span style="color:#38bdf8;margin-right:8px;">&#10003;</span> ${msg}`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });
  setTimeout(() => {
    toast.style.transform = 'translateY(50px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
