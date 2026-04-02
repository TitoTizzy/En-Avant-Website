document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initRevealAnimations();
  initMobileMenu();
  initCategoryFilters();
  initSearchFilter();
  initShareButtons();
  initBackToTop();
  initChatbotButton();
});

function initHeaderScroll() {
  const header = document.getElementById("main-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("scroll-down", window.scrollY > 50);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initRevealAnimations() {
  const elements = document.querySelectorAll(
    ".reveal-hidden, .reveal-from-left, .reveal-from-right, .delay-1, .delay-2, .delay-3"
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  elements.forEach((el) => observer.observe(el));
}

function initMobileMenu() {
  const mobileBtn = document.getElementById("btn-mobile-menu");
  const mobileNav = document.getElementById("main-nav");

  if (!mobileBtn || !mobileNav) return;

  mobileBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("menu-open");
    mobileBtn.classList.toggle("is-active", isOpen);
    mobileBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("menu-open");
      mobileBtn.classList.remove("is-active");
      mobileBtn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

function initCategoryFilters() {
  const filterTags = document.querySelectorAll(".quick-tag");
  const articleCards = document.querySelectorAll(".article-card");

  if (!filterTags.length || !articleCards.length) return;

  filterTags.forEach((tag) => {
    tag.addEventListener("click", () => {
      const filterValue = tag.dataset.filter;

      filterTags.forEach((item) => item.classList.remove("active"));
      tag.classList.add("active");

      articleCards.forEach((card) => {
        const matches =
          filterValue === "all" || card.dataset.category === filterValue;

        if (matches) {
          card.style.display = "flex";
          requestAnimationFrame(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1)";
          });
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(18px) scale(0.96)";
          setTimeout(() => {
            card.style.display = "none";
          }, 220);
        }
      });
    });
  });
}

function initSearchFilter() {
  const form = document.getElementById("blog-search-form");
  const input = document.getElementById("blog-search-input");
  const cards = document.querySelectorAll(".article-card");

  if (!form || !input || !cards.length) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = input.value.trim().toLowerCase();

    cards.forEach((card) => {
      const title = (card.dataset.title || "").toLowerCase();
      const category = (card.dataset.category || "").toLowerCase();
      const excerpt = (
        card.querySelector(".card-excerpt")?.textContent || ""
      ).toLowerCase();

      const matches =
        !query ||
        title.includes(query) ||
        category.includes(query) ||
        excerpt.includes(query);

      card.style.display = matches ? "flex" : "none";
    });
  });
}

function initShareButtons() {
  const copyButtons = document.querySelectorAll(".btn-copy-link");
  const whatsappButtons = document.querySelectorAll(".btn-share-whatsapp");
  const xButtons = document.querySelectorAll(".btn-share-x");

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const url = button.dataset.url;
      if (!url) return;

      try {
        await navigator.clipboard.writeText(url);
        const icon = button.innerHTML;

        button.classList.add("is-copied");
        button.innerHTML = '<i class="fa-solid fa-check"></i>';

        setTimeout(() => {
          button.classList.remove("is-copied");
          button.innerHTML = icon;
        }, 1800);
      } catch {
        alert("Impossible de copier le lien.");
      }
    });
  });

  whatsappButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const url = button.dataset.url;
      if (!url) return;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Lisez ceci ! ${url}`)}`, "_blank", "noopener");
    });
  });

  xButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const url = button.dataset.url;
      if (!url) return;
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, "_blank", "noopener");
    });
  });
}

function initBackToTop() {
  const button = document.getElementById("btn-back-to-top");
  if (!button) return;

  const toggleButton = () => {
    button.classList.toggle("show", window.scrollY > 350);
  };

  toggleButton();
  window.addEventListener("scroll", toggleButton, { passive: true });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

function initChatbotButton() {
  const chatbotButton = document.getElementById("btn-chatbot");
  if (!chatbotButton) return;

  chatbotButton.addEventListener("click", () => {
    alert("L’assistant virtuel sera bientôt disponible.");
  });
}