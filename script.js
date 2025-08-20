document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu/Sidebar Toggle Functionality
  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebarOverlay');
  const nav = document.getElementById('nav-menu');
  
  // Clone navigation links to sidebar
  if (sidebar && nav) {
    const navList = nav.querySelector('ul');
    if (navList) {
      sidebar.innerHTML = `<ul>${navList.innerHTML}</ul>`;
    }
  }

  // Toggle sidebar
  if (toggle && sidebar) {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent this click from triggering the document click listener
      sidebar.classList.toggle('active');
      this.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }

  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (sidebar && sidebar.classList.contains('active') && 
        !sidebar.contains(e.target) && 
        (!toggle || !toggle.contains(e.target))) {
      sidebar.classList.remove('active');
      if (toggle) toggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  // Close when clicking a link (mobile)
  if (sidebar) {
    sidebar.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        sidebar.classList.remove('active');
        if (toggle) toggle.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // Set current year in footer
  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Slider functionality
  let index = 0;
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");

  function showSlide(n) {
    if (!slides.length || !slider) return;
    
    if (n >= slides.length) index = 0;
    else if (n < 0) index = slides.length - 1;
    else index = n;

    slider.style.transform = `translateX(${-index * 100}%)`;
  }

  function nextSlide() {
    showSlide(index + 1);
  }

  // Auto-advance slides if they exist
  if (slides.length > 0) {
    setInterval(nextSlide, 3000);
  }

  // Thank you message functionality
  function showThankYou() {
    const msg = document.getElementById('thankYouMessage');
    if (msg) {
      msg.style.display = 'block';
      msg.style.animation = 'fadeIn 1s ease-in-out';
      setTimeout(() => {
        msg.style.animation = 'fadeOut 1s ease-in-out';
        setTimeout(() => {
          msg.style.display = 'none';
        }, 1000);
      }, 3000);
    }
  }

  // Make function available globally
  window.showThankYou = showThankYou;

  // Add event listener for hire me button
  const hireBtn = document.querySelector('.btn[onclick="showThankYou()"]');
  if (hireBtn) {
    hireBtn.addEventListener('click', showThankYou);
  }
});