document.addEventListener('DOMContentLoaded', () => {

  // ── SCROLL SPY para nav lateral ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.side-nav a');

  const updateActiveNav = () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= window.innerHeight * 0.4) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ── REVEAL ON SCROLL ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  // ── SKILL BARS ANIMATION ──
  const bars = document.querySelectorAll('.bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => barObserver.observe(bar));

  // ── SMOOTH SCROLL para links internos ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── FORM SUBMIT (placeholder) ──
  const formBtn = document.querySelector('.form-submit');
  if (formBtn) {
    formBtn.addEventListener('click', e => {
      e.preventDefault();
      const inputs = document.querySelectorAll('.form-row input, .form-row textarea');
      let allFilled = true;
      inputs.forEach(inp => { if (!inp.value.trim()) allFilled = false; });
      if (allFilled) {
        formBtn.textContent = 'Enviado ✓';
        formBtn.style.pointerEvents = 'none';
        formBtn.style.opacity = '0.5';
      } else {
        formBtn.textContent = 'Preencha todos os campos';
        setTimeout(() => { formBtn.textContent = 'Enviar mensagem →'; }, 2000);
      }
    });
  }

});