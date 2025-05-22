document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const mainNav = document.querySelector(".main-nav");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    mainNav.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (mainNav.classList.contains("active")) {
        hamburger.classList.remove("active");
        mainNav.classList.remove("active");
      }
    });
  });

  // Newsletter Form Submission
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const messageDiv = document.getElementById("newsletterMessage");

      // Simple validation
      if (emailInput.value === "") {
        messageDiv.textContent = "Please enter your email address";
        messageDiv.className = "message error";
        return;
      }

      // Simulate form submission
      setTimeout(() => {
        messageDiv.textContent = "Thank you for subscribing!";
        messageDiv.className = "message success";
        emailInput.value = "";

        // Reset after 3 seconds
        setTimeout(() => {
          messageDiv.textContent = "";
          messageDiv.className = "message";
        }, 3000);
      }, 1000);
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formMessage = document.getElementById("formMessage");

      // Get form values
      const name = this.querySelector("#name").value;
      const email = this.querySelector("#email").value;
      const subject = this.querySelector("#subject").value;
      const message = this.querySelector("#message").value;

      // Simple validation
      if (!name || !email || !subject || !message) {
        formMessage.textContent = "Please fill in all fields";
        formMessage.className = "message error";
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formMessage.textContent = "Please enter a valid email address";
        formMessage.className = "message error";
        return;
      }

      // Simulate form submission
      setTimeout(() => {
        formMessage.textContent =
          "Thank you for your message! We will get back to you soon.";
        formMessage.className = "message success";
        this.reset();

        // Reset after 5 seconds
        setTimeout(() => {
          formMessage.textContent = "";
          formMessage.className = "message";
        }, 5000);
      }, 1000);
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Active link highlighting based on scroll position
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (
        link.getAttribute("href") === `#${current}` ||
        (current === "" && link.getAttribute("href") === "index.html")
      ) {
        link.classList.add("active");
      }
    });
  });

  // Image lazy loading
  if ("loading" in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => {
      lazyLoadObserver.observe(img);
    });
  }
});
