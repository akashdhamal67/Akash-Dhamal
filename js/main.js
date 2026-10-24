/**
 * Two Sips — Premium Cafe Landing Page
 * Interactive JavaScript Components
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Elevation
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-close');

  const openMobileNav = () => {
    mobileToggle.classList.add('open');
    mobileDrawer.classList.add('open');
    mobileBackdrop.classList.add('open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    mobileToggle.classList.remove('open');
    mobileDrawer.classList.remove('open');
    mobileBackdrop.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // 3. Smooth Scrolling with Navbar Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Active Section Highlighting in Desktop Nav
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-menu-desktop .nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;
    const navHeight = navbar ? navbar.offsetHeight : 80;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - navHeight - 60;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 5. Menu Category Filter Tabs
  const menuTabs = document.querySelectorAll('.menu-tab-btn');
  const menuItems = document.querySelectorAll('.menu-item-card');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab button
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedCategory = tab.getAttribute('data-category');

      menuItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          item.style.display = 'flex';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 20);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 6. Modals System (Get Directions, Contact Us, Story Modal)
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) focusable.focus();
    }
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  // Attach modal trigger listeners
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('.modal-close-btn') || e.target.closest('[data-close-modal]')) {
        closeModal(modal);
      }
    });
  });

  // Escape key closes modals and mobile drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
      closeMobileNav();
    }
  });

  // 7. Toast Notification Utility
  const showToast = (message) => {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-beige); flex-shrink: 0;">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  };

  // 8. Contact Form Handling
  const contactForm = document.getElementById('cafeContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contactName');
      const name = nameInput ? nameInput.value : 'friend';
      const contactModal = document.getElementById('contactModal');
      closeModal(contactModal);
      contactForm.reset();
      showToast(`Thank you, ${name}! Your message has been received.`);
    });
  }

  // 9. Copy Address Helper
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const addressText = document.getElementById('cafeAddressText')?.innerText || '12 Artisan Lane, Westside District';
      navigator.clipboard.writeText(addressText).then(() => {
        showToast('Address copied to clipboard!');
      }).catch(() => {
        showToast('Address: ' + addressText);
      });
    });
  }

  // 10. Image Error Fallbacks
  // If external images are blocked or fail to load, gracefully display a branded SVG coffee illustration
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%23F6F0E7"><rect width="600" height="400" fill="%23F6F0E7"/><circle cx="300" cy="200" r="70" fill="%23E6D5BF"/><path d="M260 190 Q300 230 340 190 Q300 160 260 190 Z" fill="%23765747"/><text x="50%25" y="75%25" font-family="Georgia,serif" font-size="20" fill="%233B2920" text-anchor="middle" font-weight="600">Two Sips Specialty Coffee</text></svg>`;

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      this.src = fallbackSvg;
    });
  });
});
