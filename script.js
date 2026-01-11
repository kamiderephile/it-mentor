document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burgerMenu');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.querySelector('.navbar');
const scrollToTopBtn = document.getElementById('scrollToTop');
if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
  if (burger) {
    burger.addEventListener('click', () => {
      navbar.classList.toggle('active');
      navLinks.classList.toggle('show');
    });
  }

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
    heroTitle.addEventListener('mouseenter', function() {
      this.style.animation = 'glitch 0.5s infinite';
    });
  }

  const statNumbers = document.querySelectorAll('.stat-num');
  statNumbers.forEach(num => {
    const target = +num.getAttribute('data-target');
    const textContent = num.textContent;
    const suffix = textContent.replace(/\d+/g, '');
    let count = 0;
    const duration = 2000;
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

  const mobileBurger = document.getElementById('burgerMenu');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');
  const links = document.querySelectorAll('.mobile-nav .nav-btn');

  function toggleMenu() {
    if (mobileNav) mobileNav.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
  }

  if (mobileBurger) mobileBurger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', toggleMenu);

  links.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav) mobileNav.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
    });
  });

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 30 && Math.abs(current - lastScroll) > 10) {
      if (mobileNav && mobileNav.classList.contains('active')) {
        toggleMenu();
      }
    }
    lastScroll = current;
  });

  const track = document.getElementById('galleryTrack');
  if (track) {
    const items = track.querySelectorAll('.gallery-item');
    const itemCount = items.length;

    for (let i = 0; i < itemCount; i++) {
      track.appendChild(items[i].cloneNode(true));
    }

    let scrollAmount = 0;
    const speed = 0.6;
    let animationFrameId;

    function scrollGallery() {
      scrollAmount += speed;
      track.style.transform = `translateX(-${scrollAmount}px)`;

      const firstItem = track.firstElementChild;
      if (firstItem) {
        const cardWidth = firstItem.offsetWidth + 32;

        if (scrollAmount >= cardWidth) {
          track.appendChild(firstItem);

          scrollAmount -= cardWidth;

          track.style.transition = 'none';
          track.style.transform = `translateX(-${scrollAmount}px)`;

          requestAnimationFrame(() => {
            track.style.transition = 'transform 0.6s linear';
          });
        }
      }

      animationFrameId = requestAnimationFrame(scrollGallery);
    }

    animationFrameId = requestAnimationFrame(scrollGallery);

    track.addEventListener('mouseenter', () => cancelAnimationFrame(animationFrameId));
    track.addEventListener('mouseleave', () => {
      animationFrameId = requestAnimationFrame(scrollGallery);
    });

    if (window.innerWidth <= 768) {
      cancelAnimationFrame(animationFrameId);
      track.style.transition = 'transform 0.4s ease';
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(scrollGallery);
      }
    });
  }
const progressBar = document.getElementById('progress-bar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}
});
