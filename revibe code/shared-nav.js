/**
 * Shared Navigation Loader
 * Injects the shared header and footer into all pages
 */
(function() {
  'use strict';

  // Fetch and inject shared header
  function loadHeader() {
    fetch('shared-header.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load header');
        return response.text();
      })
      .then(html => {
        const headerContainer = document.getElementById('shared-header-container');
        if (headerContainer) {
          headerContainer.innerHTML = html;
          // Set active nav link based on current page
          setActiveNavLink();
        }
      })
      .catch(err => console.warn('Header loading skipped (likely in single-file mode):', err));
  }

  // Fetch and inject shared footer
  function loadFooter() {
    fetch('shared-footer.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load footer');
        return response.text();
      })
      .then(html => {
        const footerContainer = document.getElementById('shared-footer-container');
        if (footerContainer) {
          footerContainer.innerHTML = html;
        }
      })
      .catch(err => console.warn('Footer loading skipped (likely in single-file mode):', err));
  }

  // Highlight active nav link
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'loginpage.html';
    const navLinks = document.querySelectorAll('#shared-header-container a[href*=".html"]');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || href.includes(currentPage.replace('.html', ''))) {
        link.classList.add('text-primary', 'font-semibold');
      }
    });
  }

  // Load when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadHeader();
      loadFooter();
    });
  } else {
    loadHeader();
    loadFooter();
  }
})();
