   // ===== Elemen =====
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaBtn = document.getElementById('ctaBtn');
    const toast = document.getElementById('toast');

    // ===== Fungsi toast =====
    function showToast(message) {
      toast.textContent = message;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // ===== Klik navigasi — pindah active state =====
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        // Hapus active dari semua
        navLinks.forEach(l => l.classList.remove('active'));
        // Tambahkan active ke yang diklik
        link.classList.add('active');

        const page = link.getAttribute('data-page');
        const label = link.querySelector('span')?.textContent || page;
        showToast(`Navigasi ke ${label}`);

        // Efek ripple kecil
        createRipple(link, e);
      });
    });

    // ===== Tombol CTA =====
    ctaBtn.addEventListener('click', () => {
      showToast('Selamat datang! Memulai perjalanan...');
      // Animasi khusus pada klik
      ctaBtn.style.transform = 'scale(0.92)';
      setTimeout(() => {
        ctaBtn.style.transform = '';
      }, 200);
    });

    // ===== Efek ripple saat klik =====
    function createRipple(element, event) {
      const ripple = document.createElement('span');
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.15);
        border-radius: 50%;
        transform: scale(0);
        pointer-events: none;
        z-index: 0;
      `;

      element.style.position = 'relative';
      element.style.overflow = 'hidden';
      element.appendChild(ripple);

      ripple.animate(
        [
          { transform: 'scale(0)', opacity: 1 },
          { transform: 'scale(2.5)', opacity: 0 }
        ],
        { duration: 600, easing: 'ease-out' }
      ).onfinish = () => ripple.remove();
    }

    // ===== Partikel mengambang di sekitar navbar =====
    function createParticle() {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      // Posisi acak di sekitar navbar
      const navRect = navbar.getBoundingClientRect();
      const x = Math.random() * navRect.width;
      const drift = (Math.random() - 0.5) * 60;
      const duration = 2 + Math.random() * 3;
      const size = 1 + Math.random() * 2;

      particle.style.cssText += `
        left: ${x}px;
        bottom: -5px;
        width: ${size}px;
        height: ${size}px;
        --drift: ${drift}px;
        animation-duration: ${duration}s;
        opacity: 0;
      `;

      navbar.appendChild(particle);

      // Hapus setelah animasi selesai
      setTimeout(() => particle.remove(), duration * 1000);
    }

    // Buat partikel secara berkala
    setInterval(createParticle, 400);

    // ===== Efek paralaks halus pada navbar saat mouse bergerak =====
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX = (e.clientX - centerX) / centerX; // -1 sampai 1
      mouseY = (e.clientY - centerY) / centerY;
    });

    function animateParallax() {
      // Interpolasi halus
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;

      const rotateX = currentY * -3; // Derajat rotasi
      const rotateY = currentX * 3;

      navbar.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      requestAnimationFrame(animateParallax);
    }

    // Jangan aktifkan paralaks jika hover (biarkan hover transform bekerja)
    let isHovering = false;
    navbar.addEventListener('mouseenter', () => {
      isHovering = true;
      navbar.style.transform = 'translateY(-2px)';
    });
    navbar.addEventListener('mouseleave', () => {
      isHovering = false;
    });

    function smoothLoop() {
      if (!isHovering) {
        currentX += (mouseX - currentX) * 0.06;
        currentY += (mouseY - currentY) * 0.06;
        const rotateX = currentY * -3;
        const rotateY = currentX * 3;
        navbar.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      requestAnimationFrame(smoothLoop);
    }
    smoothLoop();

    // ===== Scroll reveal untuk demo card =====
    const demoCards = document.querySelectorAll('.demo-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    demoCards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(40px)';
      card.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`;
      observer.observe(card);
    });