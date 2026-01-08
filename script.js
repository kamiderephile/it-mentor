document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burgerMenu');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.querySelector('.navbar');

  burger.addEventListener('click', () => {
    navbar.classList.toggle('active');
    navLinks.classList.toggle('show');
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        if (window.innerWidth <= 950) {
          navbar.classList.remove('active');
          navLinks.classList.remove('show');
        }
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  document.querySelectorAll('.why-icon, .stat').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.2) rotate(10deg)';
      this.style.transition = 'transform 0.4s ease';
    });
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0)';
    });
  });

  const heroTitle = document.querySelector('.hero h1 span');
  if (heroTitle) {
    heroTitle.addEventListener('mouseenter', glitchEffect);
  }

  function glitchEffect() {
    this.style.animation = 'glitch 0.5s infinite';
  }

  const statNumbers = document.querySelectorAll('.stat-num');
  statNumbers.forEach(num => {
    const target = +num.getAttribute('data-target');
    const textContent = num.textContent;
    const suffix = textContent.replace(/\d+/g, '');
    let count = 0;
    const duration = 2000; // ms
    const increment = target / (duration / 16);

    const updateCount = () => {
      count += increment;
      if (count < target) {
        num.textContent = Math.ceil(count) + suffix;
        setTimeout(updateCount, 16);
      } else {
        num.textContent = target + suffix;
      }
    };

    const observerForStats = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observerForStats.unobserve(entry.target);
        }
      });
    });

    observerForStats.observe(num);
  });

  const form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value;
      alert(`Спасибо, ${name}! 🎉\nЗаявка отправлена. Напишу в Telegram.`);
      form.reset();
    });
  }
});
const burger = document.getElementById('burgerMenu');
const mobileNav = document.getElementById('mobileNav');
const overlay = document.getElementById('mobileOverlay');
const links = document.querySelectorAll('.mobile-nav .nav-btn');

function toggleMenu() {
  mobileNav.classList.toggle('active');
  overlay.classList.toggle('active');
}

burger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

links.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
  });
});

// Закрыть при скролле
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 30 && Math.abs(current - lastScroll) > 10) {
    if (mobileNav.classList.contains('active')) {
      toggleMenu();
    }
  }
  lastScroll = current;
});
