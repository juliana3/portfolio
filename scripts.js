
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx - 6 + 'px';
      cursor.style.top  = my - 6 + 'px';
    });

    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx - 18 + 'px';
      ring.style.top  = ry - 18 + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2.5)';
        ring.style.width = '50px'; ring.style.height = '50px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        ring.style.width = '36px'; ring.style.height = '36px';
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          e.target.querySelectorAll('.skill-fill').forEach(bar => {
            bar.classList.add('animate');
          });
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal, .timeline-item').forEach(el => observer.observe(el));

    const pillObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.tech-pill').forEach(pill => {
            pill.classList.add('visible');
          });
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.info-card.wide').forEach(el => pillObserver.observe(el));

    lucide.createIcons();
