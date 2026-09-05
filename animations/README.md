# Aurelle Hotel - Extracted Animations Library

This library contains all the extracted animations and micro-interactions from the **Aurelle Hotel website**. It has been decoupled from the original site runtime so you can easily understand, customize, and plug these animations into any website or modern framework (React, Next.js, Vue, or plain HTML/JS).

---

## 📁 Files in this Directory

- **`animations.css`**: Standalone CSS containing keyframes, transitions, preloader curtains, circular gallery layouts, infinite marquee, pulsing dots, and button hover states.
- **`aurelle-animations.js`**: Modular JavaScript library powered by **GSAP 3** and **ScrollTrigger** replicating all interactions.
- **`../animation-showcase.html`**: An interactive playground and demonstration page where each animation can be previewed, tested, and copied.

---

## 🚀 Quick Start

### 1. Include Dependencies
Add GSAP, ScrollTrigger, and optionally Lenis to your HTML:

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600&family=Funnel+Sans:wght@300;400;500&display=swap" rel="stylesheet">

<!-- Lenis Smooth Scroll (Optional) -->
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.23/dist/lenis.css">
<script src="https://unpkg.com/lenis@1.3.23/dist/lenis.min.js"></script>

<!-- GSAP & ScrollTrigger -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

<!-- Extracted Aurelle Animations -->
<link rel="stylesheet" href="animations/animations.css">
<script src="animations/aurelle-animations.js"></script>
```

### 2. Initialize
```javascript
// Initialize everything at once:
AurelleAnimations.initAll();

// Or initialize specific modules:
AurelleAnimations.initPreloader();
AurelleAnimations.initSplitTextReveals();
AurelleAnimations.initParallaxImages();
AurelleAnimations.initStickySideImages();
AurelleAnimations.initCircularGallery();
AurelleAnimations.initMarquee();
AurelleAnimations.initFullscreenMenu();
AurelleAnimations.initAccordions();
```

---

## 🎬 Detailed Breakdown of Extracted Animations

### 1. Page Load Preloader (`initPreloader()`)
- **Visual Effect**: The page starts with a deep charcoal backdrop, displaying the welcome title and a centered preview image. The image scales up with subtle easing while the title slides upward, followed by a dramatic vertical curtain swipe revealing the hero page.
- **HTML Structure**:
```html
<div class="aurelle-preloader">
  <div class="aurelle-preloader-content">
    <div class="aurelle-preloader-title"><span>Welcome</span></div>
    <div class="aurelle-preloader-image-box">
      <img src="assets/images/hero.avif" alt="Aurelle">
    </div>
  </div>
  <div class="aurelle-preloader-bg"></div>
</div>
```

---

### 2. Lenis Smooth Scrolling (`initLenis()`)
- **Visual Effect**: Luxurious inertia scrolling that syncs with GSAP ScrollTrigger updates.
- **JavaScript**:
```javascript
const lenis = AurelleAnimations.initLenis({
  autoRaf: true,
  stopInertiaOnNavigate: true
});
```

---

### 3. Typography Scroll Reveals (`initSplitTextReveals()`)
- **Visual Effect**: Headings and descriptions animate into view line-by-line or word-by-word with a smooth vertical slide and opacity fade as they cross the viewport threshold (`top 80%`).
- **Trigger Attribute**: Add `data-anim-title="true"` to any heading or paragraph:
```html
<h2 data-anim-title="true">A boutique escape in timeless streets</h2>
```

---

### 4. Parallax Image Scrolling (`initParallaxImages()`)
- **Visual Effect**: Images glide inside their containers at different rates relative to page scrolling, creating rich visual depth.
- **Available Speeds**:
  - `data-parallax-small="true"`: Gentle 35px translation (ideal for cards & thumbnails)
  - `data-parallax-medium="true"`: Moderate 70px translation (ideal for section images)
  - `data-parallax-large="true"`: Deep 120px translation (ideal for fullscreen hero & banners)
```html
<div class="image-frame">
  <img data-parallax-medium="true" src="assets/images/suite.avif" alt="Suite">
</div>
```

---

### 5. Sticky Story Chapter Cross-Fade (`initStickySideImages()`)
- **Visual Effect**: In the "About the hotel" section, the left image container stays pinned while right text blocks scroll. As each chapter is reached, the corresponding image fades in with a gentle zoom.
- **HTML Structure**:
```html
<div class="sticky-about">
  <div class="sticky-side-images">
    <div class="sticky-side-image is-1st"><img src="img1.avif"></div>
    <div class="sticky-side-image is-2nd"><img src="img2.avif"></div>
    <div class="sticky-side-image is-3rd"><img src="img3.avif"></div>
  </div>
  <div class="sticky-content-wrapper">
    <div class="content-flex-block"><h3>Heritage</h3><p>...</p></div>
    <div class="content-flex-block"><h3>Philosophy</h3><p>...</p></div>
    <div class="content-flex-block"><h3>Atmosphere</h3><p>...</p></div>
  </div>
</div>
```

---

### 6. Circular Floating Image Ring (`initCircularGallery()`)
- **Visual Effect**: 6 image nodes arranged evenly around three concentric delicate rings with a continuous floating breathing motion.
- **HTML Structure**:
```html
<div class="aurelle-circle-gallery">
  <div class="aurelle-circle-ring ring-1"></div>
  <div class="aurelle-circle-ring ring-2"></div>
  <div class="aurelle-circle-ring ring-3"></div>
  <div class="aurelle-circle-node"><img src="img1.avif"></div>
  <div class="aurelle-circle-node"><img src="img2.avif"></div>
  <div class="aurelle-circle-node"><img src="img3.avif"></div>
  <div class="aurelle-circle-node"><img src="img4.avif"></div>
  <div class="aurelle-circle-node"><img src="img5.avif"></div>
  <div class="aurelle-circle-node"><img src="img6.avif"></div>
</div>
```

---

### 7. Infinite Marquee Ticker (`initMarquee()`)
- **Visual Effect**: Continuous seamless horizontal text ticker with dashes, auto-pausing on mouse hover.
- **HTML Structure**:
```html
<div class="aurelle-marquee">
  <div class="aurelle-marquee-track">
    <span class="aurelle-marquee-item">Wellness <span class="aurelle-marquee-dash"></span></span>
    <span class="aurelle-marquee-item">Relax <span class="aurelle-marquee-dash"></span></span>
    <span class="aurelle-marquee-item">Atmosphere <span class="aurelle-marquee-dash"></span></span>
  </div>
</div>
```

---

### 8. Fullscreen Navigation Overlay (`initFullscreenMenu()`)
- **Visual Effect**: Glassmorphism backdrop blur (20px) and staggered slide-up of navigation links with animated underline hover effects.
- **HTML Structure**:
```html
<div class="menu-burger">menu</div>
<div class="aurelle-menu-overlay">
  <div class="aurelle-menu-backdrop"></div>
  <div class="aurelle-menu-panel">
    <button class="menu-close">✕</button>
    <nav>
      <a href="/hotel" class="aurelle-menu-item">The Hotel</a>
      <a href="/rooms-1" class="aurelle-menu-item">Rooms & Suites</a>
      <a href="/restaurant" class="aurelle-menu-item">Restaurant</a>
      <a href="/relax" class="aurelle-menu-item">Relax & Spa</a>
    </nav>
  </div>
</div>
```

---

### 9. Micro-Interactions & Hover Animations
- **Pulsing Dot**:
  ```html
  <div style="width: 8px; height: 8px; color: #ba6957;">
    <div class="dot-animation"></div>
  </div>
  ```
- **Magnetic Sliding Button**:
  ```html
  <a href="/booking" class="aurelle-btn">
    <span class="aurelle-btn-text">Book Now</span>
    <span class="aurelle-btn-icon">→</span>
    <div class="aurelle-btn-bg"></div>
  </a>
  ```
- **Underline Link**:
  ```html
  <a href="/location" class="aurelle-link">
    <span>View Location</span>
    <div class="aurelle-link-line"></div>
  </a>
  ```

---

## 💡 Standalone Showcase Page

Open `animation-showcase.html` in your browser to test each animation interactively, view source code, and toggle effects on and off.
