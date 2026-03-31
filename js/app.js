document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initHeaderScroll();
  initMobileMenu();
  initReveal();
  initBackToTop();
  initSlider();
});

function initLoader() {
  const loader = document.getElementById("page-loader");
  if (!loader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 500);
  });
}

function initHeaderScroll() {
  const header = document.getElementById("main-header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll);
}

function initMobileMenu() {
  const btn = document.getElementById("btn-mobile-menu");
  const nav = document.getElementById("main-nav");

  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.classList.toggle("is-active", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.classList.remove("is-active");
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));
}

function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;

  const toggleButton = () => {
    if (window.scrollY > 500) {
      button.classList.add("show");
    } else {
      button.classList.remove("show");
    }
  };

  toggleButton();
  window.addEventListener("scroll", toggleButton);

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function initSlider() {
  const slider = document.getElementById("gallery-slider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".slide");
  const dotsContainer = slider.querySelector(".slider-dots");
  const prevBtn = slider.querySelector(".slider-arrow-prev");
  const nextBtn = slider.querySelector(".slider-arrow-next");

  if (!slides.length || !dotsContainer || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let autoplay = null;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Aller à la slide ${index + 1}`);

    if (index === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      goToSlide(index);
      restartAutoplay();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll(".slider-dot");

  function updateSlider() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    updateSlider();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    autoplay = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoplay();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoplay();
  });

  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);

  updateSlider();
  startAutoplay();
}

/*for the chatbot bouton*/

document.addEventListener("DOMContentLoaded", () => {
  const chatbotFab = document.getElementById("chatbotFab");

  if (!chatbotFab) return;

  chatbotFab.addEventListener("click", () => {
    alert("Le module de chat sera bientôt disponible.");
  });
});