document.addEventListener('DOMContentLoaded', () => {
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

  // Анимация кнопок
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.02)';
      this.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
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

  // Форма
  const form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value;
      alert(`Спасибо, ${name}! 🎉\nЗаявка отправлена. Напишу в Telegram в течение 10 минут.`);
      form.reset();
    });
  }
});