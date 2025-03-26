// Menu Toggle Functionality
const menuToggle = (() => {
  const menuBtn = document.querySelector(".menuBtn");
  const navBar = document.querySelector(".navBar");
  
  if (!menuBtn || !navBar) return; // Exit if elements not found

  // Add ARIA attributes for accessibility
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Toggle navigation menu');
  menuBtn.setAttribute('aria-controls', 'navigation-menu');

  const toggleMenu = () => {
    const isOpen = menuBtn.classList.toggle("openmenu");
    navBar.classList.toggle("open");
    
    // Update ARIA attributes
    menuBtn.setAttribute('aria-expanded', isOpen.toString());
    
    // Animate height
    if (isOpen) {
      navBar.style.maxHeight = `${navBar.scrollHeight}px`;
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      navBar.style.maxHeight = '0';
      document.body.removeAttribute('style');
    }
  };

  // Add event listener with passive option for performance
  menuBtn.addEventListener("click", toggleMenu, { passive: true });

  // Close menu when clicking outside or on ESC key
  document.addEventListener('click', (e) => {
    if (isOpen && !e.target.closest('.navBar') && !e.target.closest('.menuBtn')) {
      toggleMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn.classList.contains('openmenu')) {
      toggleMenu();
      menuBtn.focus();
    }
  });

  return {
    toggle: toggleMenu
  };
})();

// Logo Animation Handler
const logoAnimation = (() => {
  const init = () => {
    const logo = document.getElementById('logo');
    if (!logo) return;

    // Only animate if prefers-reduced-motion is not set
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery || !mediaQuery.matches) {
      logo.style.animation = 'rotateGlow 3s ease-in-out forwards';
      
      // Reset animation on click for demo purposes
      logo.addEventListener('click', () => {
        logo.style.animation = 'none';
        requestAnimationFrame(() => {
          logo.style.animation = 'rotateGlow 3s ease-in-out forwards';
        });
      });
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    init
  };
})();

// Optional: Export functions if using modules
// export { menuToggle, logoAnimation };