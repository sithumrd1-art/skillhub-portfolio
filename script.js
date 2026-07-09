document.addEventListener("DOMContentLoaded", function () {
  const themeBtn = document.getElementById("themeBtn");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const backTopBtn = document.getElementById("backTopBtn");
  const contactForm = document.querySelector(".contact form");
  const preloader = document.getElementById("preloader");
  const typingText = document.getElementById("typingText");
  const counters = document.querySelectorAll(".counter");

  /* Preloader */
  function hidePreloader() {
    if (preloader) {
      preloader.classList.add("hide");
    }
  }

  window.addEventListener("load", hidePreloader);
  setTimeout(hidePreloader, 1500);

  /* Dark Mode Load */
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");

    if (themeBtn) {
      themeBtn.textContent = "☀️";
    }
  }

  /* Dark Mode On / Off */
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
      } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme", "light");
      }
    });
  }

  /* Mobile Menu */
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  /* Contact Form */
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      alert("Thank you! Your message has been submitted successfully.");

      contactForm.reset();
    });
  }

  /* Typing Effect */
  const words = [
    "Aspiring Software Developer",
    "Web Development Learner",
    "Flutter App Developer",
    "Creative Problem Solver"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    if (!typingText) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      setTimeout(function () {
        isDeleting = true;
      }, 1200);
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    const speed = isDeleting ? 60 : 100;

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  /* Scroll Reveal */
  const revealItems = document.querySelectorAll(".section, .hero-card");

  revealItems.forEach(function (item) {
    item.classList.add("reveal");
  });

  function revealOnScroll() {
    revealItems.forEach(function (item) {
      const itemTop = item.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;

      if (itemTop < screenHeight - 100) {
        item.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  /* Skill Progress Bars */
  const progressBars = document.querySelectorAll(".progress-fill");

  function loadProgressBars() {
    progressBars.forEach(function (bar) {
      const barTop = bar.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;

      if (barTop < screenHeight - 80) {
        bar.style.width = bar.getAttribute("data-width");
      }
    });
  }

  window.addEventListener("scroll", loadProgressBars);
  loadProgressBars();

  /* Animated Counters */
  let counterStarted = false;

  function startCounters() {
    const statsSection = document.querySelector(".stats");

    if (!statsSection || counterStarted) return;

    const statsTop = statsSection.getBoundingClientRect().top;

    if (statsTop < window.innerHeight - 100) {
      counterStarted = true;

      counters.forEach(function (counter) {
        const target = Number(counter.getAttribute("data-target"));
        let count = 0;

        const interval = setInterval(function () {
          count++;
          counter.textContent = count;

          if (count >= target) {
            clearInterval(interval);
          }
        }, 100);
      });
    }
  }

  window.addEventListener("scroll", startCounters);
  startCounters();

  /* Back To Top Button */
  if (backTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backTopBtn.style.display = "block";
      } else {
        backTopBtn.style.display = "none";
      }
    });

    backTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* Active Navbar Link */
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", function () {
    let currentSection = "";

    document.querySelectorAll("section").forEach(function (section) {
      const sectionTop = section.offsetTop - 130;

      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navItems.forEach(function (item) {
      item.classList.remove("active");

      if (item.getAttribute("href") === "#" + currentSection) {
        item.classList.add("active");
      }
    });
  });

  /* Close Mobile Menu After Click */
  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      if (navLinks) {
        navLinks.classList.remove("active");
      }
    });
  });
});