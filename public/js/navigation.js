// public/js/navigation.js
function navigate(path) {
  window.location.href = `https://umar-e792c.web.app${path}`;
}

// Navbar toggle animation fix
document.addEventListener('DOMContentLoaded', () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    setTimeout(() => {
      if (!navbarCollapse.classList.contains('show')) {
        navbarCollapse.style.opacity = '0';
        navbarCollapse.style.height = '0';
      } else {
        navbarCollapse.style.opacity = '1';
        navbarCollapse.style.height = 'auto';
      }
    }, 300); // Match with transition duration
  });

  // Close navbar when clicking outside
  document.addEventListener('click', (event) => {
    if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
      navbarCollapse.classList.remove('show');
      navbarCollapse.style.opacity = '0';
      navbarCollapse.style.height = '0';
    }
  });
});
