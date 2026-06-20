const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

const sections = document.querySelectorAll("section[id]");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
    const spanText = link.querySelector("span");
    if (spanText) showToast("Navigasi ke " + spanText.textContent);
  });
});

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 250;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

const homeLink = document.querySelector('a[href="#beranda"]');
if (homeLink) {
  homeLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function createRipple(element, event) {
  const ripple = document.createElement("span");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `position:absolute; width:${size}px; height:${size}px; left:${x}px; top:${y}px; background:rgba(255,255,255,.15); border-radius:50%; transform:scale(0); pointer-events:none;`;

  element.appendChild(ripple);
  ripple.animate(
    [
      { transform: "scale(0)", opacity: 1 },
      { transform: "scale(2.5)", opacity: 0 },
    ],
    { duration: 600, easing: "ease-out" },
  ).onfinish = () => ripple.remove();
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => createRipple(link, e));
});

function createParticle() {
  if (!navbar) return;
  const particle = document.createElement("div");
  particle.classList.add("particle");
  const navRect = navbar.getBoundingClientRect();
  const x = Math.random() * navRect.width;
  const drift = (Math.random() - 0.5) * 60;
  const duration = 2 + Math.random() * 3;
  const size = 1 + Math.random() * 2;
  particle.style.cssText = `left:${x}px; bottom:-5px; width:${size}px; height:${size}px; --drift:${drift}px; animation-duration:${duration}s;`;
  navbar.appendChild(particle);
  setTimeout(() => particle.remove(), duration * 1000);
}

setInterval(createParticle, 400);

let mouseX = 0,
  mouseY = 0,
  currentX = 0,
  currentY = 0;

document.addEventListener("mousemove", (e) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  mouseX = (e.clientX - centerX) / centerX;
  mouseY = (e.clientY - centerY) / centerY;
});

function smoothLoop() {
  currentX += (mouseX - currentX) * 0.06;
  currentY += (mouseY - currentY) * 0.06;
  const rotateX = currentY * -3;
  const rotateY = currentX * 3;
  if (navbar) {
    navbar.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }
  requestAnimationFrame(smoothLoop);
}
smoothLoop();

const demoCards = document.querySelectorAll(".demo-card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

demoCards.forEach((card, i) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = `all .8s cubic-bezier(.16,1,.3,1) ${i * 0.15}s`;
  observer.observe(card);
});

/* === Intersection Observer untuk Animasi Slide About Section === */
const slideObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        slideObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll(".grid-item").forEach((item) => {
  slideObserver.observe(item);
});

