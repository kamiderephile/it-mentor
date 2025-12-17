document.addEventListener('DOMContentLoaded', () => {
  // Бургер меню
  const burger = document.getElementById('burgerMenu');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.querySelector('.navbar');

  burger.addEventListener('click', () => {
    navbar.classList.toggle('active');
    navLinks.classList.toggle('show');
  });

  // Плавный скролл к якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        // Закрыть меню при клике на мобильном
        if (window.innerWidth <= 950) {
          navbar.classList.remove('active');
          navLinks.classList.remove('show');
        }
      }
    });
  });

  // Анимация появления элементов при скролле
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

  // Анимация иконок при наведении
  document.querySelectorAll('.why-icon, .stat').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.2) rotate(10deg)';
      this.style.transition = 'transform 0.4s ease';
    });
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0)';
    });
  });

  // Глитч-эффект на заголовке при наведении
  const heroTitle = document.querySelector('.hero h1 span');
  if (heroTitle) {
    heroTitle.addEventListener('mouseenter', glitchEffect);
  }

  function glitchEffect() {
    this.style.animation = 'glitch 0.5s infinite';
  }

  // Анимация чисел
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

  // Форма
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