/**
 * Two Sips — Premium Cafe Landing Page
 * Interactive JavaScript Components
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Elevation
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Hero & Card Video Autoplay Assurance & Motion Preference Check
  const heroVideo = document.querySelector('.hero-video-element');
  const favoriteVideos = document.querySelectorAll('.favorite-video');
  const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const manageHeroVideoPlayback = () => {
    if (!heroVideo) return;
    if (prefersReducedMotionQuery.matches) {
      heroVideo.pause();
    } else {
      heroVideo.muted = true;
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay restricted by device battery saver; fallback poster will show
        });
      }
    }
  };

  // Play card videos only when visible on screen, pause when scrolled away
  if ('IntersectionObserver' in window) {
    const cardVideoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        video._isVisibleOnScreen = entry.isIntersecting;
        if (prefersReducedMotionQuery.matches) {
          video.pause();
          return;
        }
        if (entry.isIntersecting) {
          video.muted = true;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.1
    });

    favoriteVideos.forEach((video) => {
      cardVideoObserver.observe(video);
    });
  } else {
    // Fallback if IntersectionObserver is not available
    favoriteVideos.forEach((video) => {
      if (!prefersReducedMotionQuery.matches) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) playPromise.catch(() => {});
      }
    });
  }

  const handleMotionChange = () => {
    manageHeroVideoPlayback();
    favoriteVideos.forEach((video) => {
      if (prefersReducedMotionQuery.matches) {
        video.pause();
      } else if (video._isVisibleOnScreen) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) playPromise.catch(() => {});
      }
    });
  };

  manageHeroVideoPlayback();
  if (prefersReducedMotionQuery.addEventListener) {
    prefersReducedMotionQuery.addEventListener('change', handleMotionChange);
  } else if (prefersReducedMotionQuery.addListener) {
    prefersReducedMotionQuery.addListener(handleMotionChange);
  }

  // 2. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileNav = () => {
    if (mobileToggle) {
      mobileToggle.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
    }
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    if (mobileToggle) {
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileNav);
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
      let targetElement = document.querySelector(targetId);
      if (!targetElement && (targetId === '#home' || targetId === '#hero')) {
        targetElement = document.getElementById('home') || document.getElementById('hero') || document.querySelector('.hero-section');
      }
      if (targetElement) {
        e.preventDefault();
        const navHeight = 90;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        const scrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: scrollBehavior
        });
      }
    });
  });

  // 4. Active Section Highlighting in Desktop & Mobile Nav
  const navSections = [
    { id: 'home', el: document.getElementById('home') || document.getElementById('hero') || document.querySelector('.hero-section') },
    { id: 'story', el: document.getElementById('story') },
    { id: 'menu', el: document.getElementById('menu') },
    { id: 'experience', el: document.getElementById('experience') },
    { id: 'visit', el: document.getElementById('visit') }
  ].filter(item => item.el !== null);

  const desktopNavLinks = document.querySelectorAll('.nav-menu-desktop .nav-link');
  const drawerNavLinks = document.querySelectorAll('.mobile-menu-links .mobile-nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const navHeight = 90;
    const isAtBottom = (window.innerHeight + scrollY) >= (document.documentElement.scrollHeight - 60);

    let currentSectionId = 'home';

    if (isAtBottom) {
      currentSectionId = 'visit';
    } else {
      for (let i = 0; i < navSections.length; i++) {
        const sectionTop = navSections[i].el.offsetTop - navHeight - 80;
        if (scrollY >= sectionTop) {
          currentSectionId = navSections[i].id;
        }
      }
    }

    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    drawerNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });
  highlightNavOnScroll(); // Initial check

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

  // 11. Subtle Scroll-Reveal Observer with Staggered Delays
  const revealElements = document.querySelectorAll('.reveal-section, .reveal-card');
  const userPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (userPrefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          entry.target.querySelectorAll('.reveal-card').forEach(card => card.classList.add('is-revealed'));
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }
});
