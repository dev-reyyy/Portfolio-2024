document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    grabCursor: true,
    spaceBetween: 24,

    // If pagination is needed
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Navigation arrows
    // navigation: {
    //   nextEl: ".swiper-button-next",
    //   prevEl: ".swiper-button-prev",
    // },

    // And if we need scrollbar
    // scrollbar: {
    //   el: ".swiper-scrollbar",
    // },
  });

  // =================
  // ABOUT ME TABS
  // =================
  const tabs = document.querySelectorAll("[data-tab-target]");
  const tabContents = document.querySelectorAll("[data-tab-content]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.tabTarget);

      tabContents.forEach((tabContent) =>
        tabContent.classList.remove("active")
      );

      tabs.forEach((tabContent) => tabContent.classList.remove("active"));

      tab.classList.add("active");
      target.classList.add("active");
    });
  });

  // =================
  // SKILLS FILTER
  // =================
  const filterButtons = document.querySelectorAll(".badge-group button");
  const skillContainer = document.querySelectorAll(
    ".skills-group .skill-container"
  );

  const skillContainers = (e) => {
    // Remove 'active' class from all buttons
    filterButtons.forEach((button) => button.classList.remove("active"));

    // Add 'active' class to the clicked button
    e.target.classList.add("active");

    skillContainer.forEach((container) => {
      container.classList.add("hide");

      if (
        container.dataset.filter === e.target.dataset.filter ||
        e.target.dataset.filter === "all"
      ) {
        container.classList.remove("hide");
      }
    });
  };

  filterButtons.forEach((button) =>
    button.addEventListener("click", skillContainers)
  );

  // =================
  // JOB EXP TABS
  // =================
  const expTabs = document.querySelectorAll("[data-exp-tab]");
  const expContents = document.querySelectorAll("[data-exp-content]");
  const accordionContentSelector = ".accordion-content";

  expTabs.forEach((expTab) => {
    expTab.addEventListener("click", () => {
      const expTarget = document.querySelector(expTab.dataset.expTab);

      // Remove 'active' class from all content elements
      expContents.forEach((expContent) =>
        expContent.classList.remove("active")
      );

      // Remove 'active' class from all tabs
      expTabs.forEach((tab) => tab.classList.remove("active"));

      // Add 'active' class to the clicked tab and the corresponding content
      expTab.classList.add("active");
      if (expTarget) {
        expTarget.classList.add("active");

        // Initialize the first accordion of the selected tab
        const accordions = expTarget.querySelectorAll(accordionContentSelector);
        accordions.forEach((accordion, index) => {
          const description = accordion.querySelector(".description");
          if (index === 0) {
            accordion.classList.add("open");
            description.style.height = `${description.scrollHeight}px`;
          } else {
            accordion.classList.remove("open");
            description.style.height = "0px";
          }
        });
      }
    });
  });

  // =================
  // ACCORDION
  // =================
  const accordionContent = document.querySelectorAll(accordionContentSelector);

  // Initialize the height of each description
  accordionContent.forEach((item) => {
    const description = item.querySelector(".description");
    description.style.height = item.classList.contains("open")
      ? `${description.scrollHeight}px`
      : "0px";
  });

  accordionContent.forEach((item) => {
    const header = item.querySelector(".header");
    const description = item.querySelector(".description");

    header.addEventListener("click", () => {
      accordionContent.forEach((otherItem) => {
        const otherDescription = otherItem.querySelector(".description");
        if (otherItem !== item) {
          otherItem.classList.remove("open");
          otherDescription.style.height = "0px";
        }
      });

      item.classList.toggle("open");
      description.style.height = item.classList.contains("open")
        ? `${description.scrollHeight}px`
        : "0px";
    });
  });

  // =================
  // SCROLL OFFSET
  // =================
  document.querySelectorAll("header a, .main-btn, .sub-btn").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      const headerOffset = document.querySelector("header").offsetHeight;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY + 2;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });

    AOS.init({});
  });

  // =================
  // SCROLL TO TOP BUTTON
  // =================
  window.addEventListener("scroll", function () {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (window.scrollY > 200) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });
});

function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
