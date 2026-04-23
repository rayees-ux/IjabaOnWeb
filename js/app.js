/* ============================================
   MODERN APP JAVASCRIPT
   Interactive Components & Navigation
   ============================================ */

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function
 */

let currentUrl = "";

function openShareMenu(event, btn) {
    event.preventDefault();

    const card = btn.closest('.post-card');
    const link = card.getAttribute('href');
    const title = card.querySelector('.post-card__title')?.innerText || "IslamicDaily";

    currentUrl = window.location.origin + "/" + link;

    document.getElementById("waShare").href =
        `https://wa.me/?text=${encodeURIComponent(title + " " + currentUrl)}`;

    document.getElementById("tgShare").href =
        `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;

    document.getElementById("igShare").href = "https://www.instagram.com/";

    document.getElementById("shareSheet").classList.add("active");
    document.getElementById("shareOverlay").classList.add("active");
}

function closeShare() {
    document.getElementById("shareSheet").classList.remove("active");
    document.getElementById("shareOverlay").classList.remove("active");
}

document.getElementById("copyLink").onclick = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("Link copied! Paste in Status/Story 😄");
};

document.getElementById("shareOverlay").onclick = closeShare;
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

/**
 * Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Get query parameters
 */
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

// ============================================
// BOTTOM NAVIGATION
// ============================================

class BottomNavigation {
    constructor() {
        this.navItems = document.querySelectorAll('.nav-item');
        this.init();
    }

    init() {
        this.updateActiveNav();
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavClick(e));
        });
        window.addEventListener('hashchange', () => this.updateActiveNav());
    }

    handleNavClick(e) {
        e.preventDefault();
        const page = e.currentTarget.getAttribute('data-page');
        if (page) {
            window.location.href = page;
        }
    }

    updateActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.navItems.forEach(item => {
            const page = item.getAttribute('data-page');
            if (page && page.includes(currentPage)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

// ============================================
// HERO SLIDER / CAROUSEL
// ============================================

class HeroSlider {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.slides = this.container.querySelectorAll('.hero-slide');
        this.dots = this.container.querySelectorAll('.dot');
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        
        this.showSlide(0);
        this.startAutoplay();
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch events
        this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        // Hover to pause
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }

    showSlide(index) {
        // Wrap around
        if (index >= this.slides.length) {
            this.currentIndex = 0;
        } else if (index < 0) {
            this.currentIndex = this.slides.length - 1;
        } else {
            this.currentIndex = index;
        }
        
        // Update slides
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === this.currentIndex) {
                slide.classList.add('active');
            }
        });
        
        // Update dots
        this.dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === this.currentIndex) {
                dot.classList.add('active');
            }
        });
    }

    goToSlide(index) {
        this.stopAutoplay();
        this.showSlide(index);
        this.startAutoplay();
    }

    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    }

    prevSlide() {
        this.showSlide(this.currentIndex - 1);
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }

    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }

    handleSwipe() {
        const diff = this.touchStartX - this.touchEndX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
            this.stopAutoplay();
            this.startAutoplay();
        }
    }
}

// ============================================
// TABS
// ============================================

class Tabs {
    constructor() {
        this.tabs = document.querySelectorAll('.tab');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.init();
    }

    init() {
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => this.switchTab(index));
        });
    }

    switchTab(index) {
        // Remove active class from all tabs and contents
        this.tabs.forEach(tab => tab.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to selected tab and content
        this.tabs[index].classList.add('active');
        this.tabContents[index].classList.add('active');
    }
}

// ============================================
// ACCORDION
// ============================================

class Accordion {
    constructor() {
        this.headers = document.querySelectorAll('.accordion-header');
        this.init();
    }

    init() {
        this.headers.forEach(header => {
            header.addEventListener('click', () => this.toggleAccordion(header));
        });
    }

    toggleAccordion(header) {
        const content = header.nextElementSibling;
        const isActive = header.classList.contains('active');
        
        // Close all accordions
        this.headers.forEach(h => {
            h.classList.remove('active');
            h.nextElementSibling.classList.remove('active');
        });
        
        // Open if was closed
        if (!isActive) {
            header.classList.add('active');
            content.classList.add('active');
        }
    }
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================

class Search {
    constructor(searchInputSelector = '.search-bar__input') {
        this.searchInput = document.querySelector(searchInputSelector);
        if (!this.searchInput) return;
        
        this.searchInput.addEventListener('input', debounce((e) => this.handleSearch(e), 300));
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();
        if (query.length === 0) {
            this.clearSearch();
            return;
        }
        
        // Search logic - customize based on your needs
        console.log('Searching for:', query);
        // You can implement actual search functionality here
    }

    clearSearch() {
        this.searchInput.value = '';
        console.log('Search cleared');
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.scroll-animate');
        this.observer = null;
        this.init();
    }

    init() {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            this.elements.forEach(el => el.classList.add('in-view'));
            return;
        }

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => this.observer.observe(el));
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e));
        });
    }

    handleClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ============================================
// MODAL / DIALOG
// ============================================

class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        if (!this.modal) return;
        
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.init();
    }

    init() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    toggle() {
        if (this.modal.classList.contains('active')) {
            this.close();
        } else {
            this.open();
        }
    }
}

// ============================================
// MENU TOGGLE
// ============================================

class MenuToggle {
    constructor(menuBtnSelector = '.app-bar__icon-btn[data-action="menu"]') {
        this.menuBtn = document.querySelector(menuBtnSelector);
        this.menu = document.querySelector('.mobile-menu');
        if (!this.menuBtn || !this.menu) return;
        
        this.init();
    }

    init() {
        this.menuBtn.addEventListener('click', () => this.toggle());
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.mobile-menu') && !e.target.closest('.app-bar__icon-btn[data-action="menu"]')) {
                this.close();
            }
        });
    }

    toggle() {
        this.menu.classList.toggle('active');
    }

    open() {
        this.menu.classList.add('active');
    }

    close() {
        this.menu.classList.remove('active');
    }
}

// ============================================
// LIKE / SAVE FUNCTIONALITY
// ============================================

class SaveButton {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-save');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleSave(e));
        });
    }

    toggleSave(e) {
        const btn = e.target.closest('.btn-save');
        const id = btn.getAttribute('data-id');
        
        if (btn.classList.contains('saved')) {
            btn.classList.remove('saved');
            this.removeFromSaved(id);
        } else {
            btn.classList.add('saved');
            this.addToSaved(id);
        }
    }

    addToSaved(id) {
        let saved = JSON.parse(localStorage.getItem('saved') || '[]');
        if (!saved.includes(id)) {
            saved.push(id);
            localStorage.setItem('saved', JSON.stringify(saved));
        }
    }

    removeFromSaved(id) {
        let saved = JSON.parse(localStorage.getItem('saved') || '[]');
        saved = saved.filter(item => item !== id);
        localStorage.setItem('saved', JSON.stringify(saved));
    }
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

class LazyLoadImages {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.observer = null;
        this.init();
    }

    init() {
        if (!('IntersectionObserver' in window)) {
            // Fallback
            this.images.forEach(img => this.loadImage(img));
            return;
        }

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px'
        });

        this.images.forEach(img => this.observer.observe(img));
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        
        img.setAttribute('src', src);
        img.removeAttribute('data-src');
        img.classList.add('loaded');
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new BottomNavigation();
    new HeroSlider('heroSlider');
    new Tabs();
    new Accordion();
    new Search();
    new ScrollAnimations();
    new SmoothScroll();
    new MenuToggle();
    new SaveButton();
    new LazyLoadImages();

    console.log('Modern App Initialized');
});

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // App is hidden
    } else {
        // App is visible
    }
});
const supabaseUrl = "https://kinawwcakzogjpmwjohx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpbmF3d2Nha3pvZ2pwbXdqb2h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MzQ5MDAsImV4cCI6MjA5MjExMDkwMH0.-Lchuk_etdBTolSENmWiEunlKgVTJV1VANP8p5Zclh8";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabaseClient.from("favorites").select("*");

  if (error) {
    console.log("Error:", error.message);
  } else {
    console.log("Connected ✅", data);
  }
}

testConnection();