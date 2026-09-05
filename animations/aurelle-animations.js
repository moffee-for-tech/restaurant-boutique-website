/**
 * AURELLE HOTEL - MODULAR ANIMATIONS LIBRARY
 * Extracted from Aurelle Hotel website
 * 
 * Dependencies:
 *  - GSAP 3.x (https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js)
 *  - ScrollTrigger 3.x (https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js)
 *  - SplitText 3.x (Optional, fallback provided)
 *  - Lenis (Optional, https://unpkg.com/lenis@1.3.23/dist/lenis.min.js)
 */

(function (global) {
  'use strict';

  const AurelleAnimations = {
    lenisInstance: null,

    /**
     * 1. Initialize Lenis Smooth Scrolling with GSAP ScrollTrigger synchronization
     */
    initLenis: function (options = {}) {
      if (typeof Lenis === 'undefined') {
        console.warn('[AurelleAnimations] Lenis not loaded, skipping smooth scroll.');
        return null;
      }
      const lenis = new Lenis({
        autoRaf: true,
        autoToggle: true,
        anchors: true,
        allowNestedScroll: true,
        naiveDimensions: true,
        stopInertiaOnNavigate: true,
        ...options
      });

      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }

      this.lenisInstance = lenis;
      return lenis;
    },

    /**
     * 2. Page Load Preloader Animation
     * Replicates the Aurelle hero welcome reveal sequence
     */
    initPreloader: function (options = {}) {
      const {
        preloaderSelector = '.page-load-animation, .aurelle-preloader',
        titleSelector = '.preloader-text, .aurelle-preloader-title span',
        imageTriggerSelector = '.preloader-image-trigger, .aurelle-preloader-image-box',
        bgSelector = '.preloader-bg, .aurelle-preloader-bg',
        onComplete = null
      } = options;

      const preloader = document.querySelector(preloaderSelector);
      if (!preloader) return;

      if (typeof gsap === 'undefined') {
        setTimeout(() => {
          preloader.classList.add('is-loaded');
          preloader.style.display = 'none';
          if (onComplete) onComplete();
        }, 1200);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          preloader.classList.add('is-loaded');
          preloader.style.display = 'none';
          document.documentElement.classList.add('w-mod-ix3');
          if (onComplete) onComplete();
        }
      });

      // Sequence
      tl.set(preloader, { display: 'flex', opacity: 1 })
        .fromTo(titleSelector, 
          { y: 60, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
        )
        .fromTo(imageTriggerSelector,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: 'expo.out' },
          '-=0.4'
        )
        .to(titleSelector, { y: -40, opacity: 0, duration: 0.6, ease: 'power2.in' }, '+=0.4')
        .to(bgSelector, { yPercent: -100, duration: 1.0, ease: 'power4.inOut' }, '-=0.2')
        .to(imageTriggerSelector, { scale: 1.1, opacity: 0, duration: 0.7, ease: 'power3.in' }, '<');

      return tl;
    },

    /**
     * 3. SplitText Typography Scroll Trigger
     * Reveals text line-by-line or word-by-word on viewport entry
     */
    initSplitTextReveals: function (selector = '[data-anim-title="true"]') {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        // If SplitText plugin is available
        if (typeof SplitText !== 'undefined') {
          const split = new SplitText(el, { type: 'lines,words', linesClass: 'aurelle-split-line' });
          gsap.from(split.words, {
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            y: 35,
            opacity: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: 'power3.out'
          });
        } else {
          // Pure fallback without SplitText
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out'
          });
        }
      });
    },

    /**
     * 4. Parallax Image Scrolling (Small, Medium, Large)
     * Creates smooth scrubbed vertical translation on scroll
     */
    initParallaxImages: function () {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      const configs = [
        { selector: '[data-parallax-small="true"], .parallax-image-small img', y: 35 },
        { selector: '[data-parallax-medium="true"], .parallax-image-medium img', y: 70 },
        { selector: '[data-parallax-large="true"], .parallax-image-large img', y: 120 }
      ];

      configs.forEach(({ selector, y }) => {
        document.querySelectorAll(selector).forEach((img) => {
          gsap.fromTo(img, 
            { y: -y }, 
            {
              y: y,
              ease: 'none',
              scrollTrigger: {
                trigger: img.parentElement || img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
              }
            }
          );
        });
      });
    },

    /**
     * 5. Sticky Side Images Sequence ("About the hotel" section)
     * Cross-fades 3 pinned images as the right-hand text chapters scroll by
     */
    initStickySideImages: function (wrapperSelector = '.sticky-about') {
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      const wrapper = document.querySelector(wrapperSelector);
      if (!wrapper) return;

      const images = wrapper.querySelectorAll('.sticky-side-image');
      const blocks = wrapper.querySelectorAll('.content-flex-block');

      if (images.length === 0 || blocks.length === 0) return;

      blocks.forEach((block, index) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => activateImage(index),
          onEnterBack: () => activateImage(index)
        });
      });

      function activateImage(activeIndex) {
        images.forEach((img, i) => {
          gsap.to(img, {
            opacity: i === activeIndex ? 1 : 0,
            scale: i === activeIndex ? 1 : 1.05,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
      }
    },

    /**
     * 6. Circular Gallery Radial Layout & Perpetual Floating
     */
    initCircularGallery: function (containerSelector = '.images-in-circle, .aurelle-circle-gallery') {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const items = container.querySelectorAll('.cta-image-block, .aurelle-circle-node');
      const total = items.length;
      if (total === 0) return;

      const radius = container.offsetWidth * 0.42;

      items.forEach((item, index) => {
        const angle = (index / total) * (2 * Math.PI) - (Math.PI / 2);
        const x = Math.round(Math.cos(angle) * radius);
        const y = Math.round(Math.sin(angle) * radius);

        if (typeof gsap !== 'undefined') {
          gsap.set(item, { x, y });
          gsap.to(item, {
            y: `+=${(index % 2 === 0 ? 8 : -8)}`,
            duration: 3 + (index * 0.4),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
      });
    },

    /**
     * 7. Infinite Marquee Continuous Ticker
     */
    initMarquee: function (marqueeSelector = '.marquee-titles, .aurelle-marquee') {
      const marquees = document.querySelectorAll(marqueeSelector);
      marquees.forEach((m) => {
        const track = m.querySelector('.marquee-wrapper, .aurelle-marquee-track');
        if (!track) return;

        // Duplicate content for seamless infinite loop if not already duplicated
        if (track.children.length < 8) {
          const clone = track.cloneNode(true);
          track.parentElement.appendChild(clone);
        }

        if (typeof gsap !== 'undefined') {
          gsap.to(track, {
            xPercent: -50,
            repeat: -1,
            duration: 20,
            ease: 'none'
          });
        }
      });
    },

    /**
     * 8. Fullscreen Blur Navigation Menu Overlay
     */
    initFullscreenMenu: function (options = {}) {
      const {
        burgerSelector = '.menu-burger',
        menuSelector = '.menu, .aurelle-menu-overlay',
        closeSelector = '.menu-close',
        linkSelector = '.menu-link-block, .aurelle-menu-item'
      } = options;

      const burger = document.querySelector(burgerSelector);
      const menu = document.querySelector(menuSelector);
      const closeBtn = document.querySelector(closeSelector);

      if (!burger || !menu) return;

      const openMenu = () => {
        menu.classList.add('is-active', 'w--open');
        menu.style.display = 'flex';
        menu.style.visibility = 'visible';
        menu.style.opacity = '1';

        if (typeof gsap !== 'undefined') {
          gsap.fromTo(menu.querySelectorAll(linkSelector),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' }
          );
        }
      };

      const closeMenu = () => {
        menu.classList.remove('is-active', 'w--open');
        if (typeof gsap !== 'undefined') {
          gsap.to(menu, {
            opacity: 0,
            duration: 0.35,
            onComplete: () => {
              menu.style.display = 'none';
              menu.style.visibility = 'hidden';
            }
          });
        } else {
          menu.style.display = 'none';
          menu.style.visibility = 'hidden';
        }
      };

      burger.addEventListener('click', openMenu);
      if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    },

    /**
     * 9. Collapsible FAQ Accordion Toggle
     */
    initAccordions: function (itemSelector = '.accordion-item, .aurelle-accordion-item') {
      const items = document.querySelectorAll(itemSelector);
      items.forEach((item) => {
        const toggle = item.querySelector('.accordion-toggle, .aurelle-accordion-header');
        if (!toggle) return;

        toggle.addEventListener('click', () => {
          const isOpen = item.classList.contains('is-open');
          // Close siblings if desired
          items.forEach(other => {
            if (other !== item) other.classList.remove('is-open');
          });
          item.classList.toggle('is-open', !isOpen);
        });
      });
    },

    /**
     * 10. Master Initialization Helper
     */
    initAll: function () {
      console.log('[AurelleAnimations] Initializing all modular animations...');
      this.initLenis();
      this.initPreloader();
      this.initSplitTextReveals();
      this.initParallaxImages();
      this.initStickySideImages();
      this.initCircularGallery();
      this.initMarquee();
      this.initFullscreenMenu();
      this.initAccordions();
    }
  };

  global.AurelleAnimations = AurelleAnimations;

  // Auto-initialize if configured
  if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
      // Check if data-aurelle-auto-init is present on body or html
      if (document.body.hasAttribute('data-aurelle-auto-init') || document.documentElement.hasAttribute('data-aurelle-auto-init')) {
        AurelleAnimations.initAll();
      }
    });
  }
})(typeof window !== 'undefined' ? window : this);
