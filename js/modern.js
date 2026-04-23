// Modern UI Core JavaScript - Extracted from index.html + Ad Management

// DOM Elements
const siteHeader = document.getElementById(\"siteHeader\");
const navToggle = document.getElementById(\"navToggle\");
const navMenu = document.getElementById(\"navMenu\");
const dropdownToggles = document.querySelectorAll(\".dropdown-toggle\");
const navLinks = document.querySelectorAll(\".nav-link\");
const revealItems = document.querySelectorAll(\".reveal\");

// Header scroll effect
function handleHeaderState() {
    siteHeader.classList.toggle(\"scrolled\", window.scrollY > 18);
}

// Mobile menu toggle
function closeMobileMenu() {
    navMenu.classList.remove(\"open\");
    document.body.classList.remove(\"menu-open\");
    navToggle.setAttribute(\"aria-expanded\", \"false\");
    document.querySelectorAll(\".dropdown\").forEach((dropdown) => dropdown.classList.remove(\"open\"));
}

if (navToggle) {
    navToggle.addEventListener(\"click\", () => {
        const isOpen = navMenu.classList.toggle(\"open\");
        document.body.classList.toggle(\"menu-open\", isOpen);
        navToggle.setAttribute(\"aria-expanded\", String(isOpen));
    });
}

// Desktop dropdown hover
dropdownToggles.forEach((toggle) => {
    toggle.addEventListener(\"click\", (event) => {
        if (window.innerWidth > 860) return;
        event.preventDefault();
        const parent = toggle.closest(\".dropdown\");
        const isOpen = parent.classList.contains(\"open\");
        document.querySelectorAll(\".dropdown\").forEach((dropdown) => dropdown.classList.remove(\"open\"));
        parent.classList.toggle(\"open\", !isOpen);
    });
});

// Active nav link
navLinks.forEach((link) => {
    link.addEventListener(\"click\", () => {
        navLinks.forEach((item) => item.classList.remove(\"active\"));
        link.classList.add(\"active\");
        if (window.innerWidth <= 860) closeMobileMenu();
    });
});

// Reveal animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add(\"is-visible\");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

revealItems.forEach((item) => {
    if (!item.classList.contains(\"is-visible\")) {
        revealObserver.observe(item);
    }
});

// Window events
window.addEventListener(\"scroll\", handleHeaderState);
window.addEventListener(\"resize\", () => {
    if (window.innerWidth > 860) {
        navMenu.classList.remove(\"open\");
        document.body.classList.remove(\"menu-open\");
        navToggle.setAttribute(\"aria-expanded\", \"false\");
        document.querySelectorAll(\".dropdown\").forEach((dropdown) => dropdown.classList.remove(\"open\"));
    }
});

document.addEventListener(\"click\", (event) => {
    if (window.innerWidth > 860) return;
    if (!event.target.closest(\".nav-shell\")) closeMobileMenu();
});

handleHeaderState();

// ====================
// AD MANAGEMENT SYSTEM
// ====================

class AdManager {
    constructor() {
        this.adSlots = document.querySelectorAll(\"[data-ad-slot]\");
        this.adContent = [
            \"728x90 Banner Ad Space - Replace with Google AdSense\",
            \"Sponsored Content - High CTR Native Ad\",
            \"Vertical Sidebar Ad (300x600) - Desktop Only\",
            \"Recommended for You ✨ Affiliate Ad\",
            \"Premium Islamic Content Partner\"
        ];
        this.init();
    }

    init() {
        this.rotateAds();
        this.handleResponsiveAds();
        window.addEventListener(\"resize\", () => this.handleResponsiveAds());
    }

    rotateAds() {
        this.adSlots.forEach((slot, index) => {
            const randomAd = this.adContent[index % this.adContent.length];
            slot.textContent = randomAd;
            slot.dataset.adId = `ad-${index}-${Date.now()}`;
        });
    }

    handleResponsiveAds() {
        // Hide sidebar ads on mobile
        const sidebarAds = document.querySelectorAll(\".ad-sidebar\");
        const isMobile = window.innerWidth <= 860;
        sidebarAds.forEach(ad => {
            ad.style.display = isMobile ? \"none\" : \"flex\";
        });

        // Adjust banner sizes
        const banners = document.querySelectorAll(\".ad-banner-full\");
        banners.forEach(banner => {
            if (isMobile) {
                banner.style.height = \"50px\";
                banner.style.fontSize = \"0.8rem\";
            } else {
                banner.style.height = \"90px\";
                banner.style.fontSize = \"0.9rem\";
            }
        });
    }
}

// Initialize on DOM load
if (document.readyState === \"loading\") {
    document.addEventListener(\"DOMContentLoaded\", () => new AdManager());
} else {
    new AdManager();
}

// Section switching (existing main.js compatibility)
function showSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return false;

    const groupClass = null;
    const sectionConfig = {
        quran: \".quran-section\",
        hajj: \".hajj-section\",
        ibadah: \".ibadah-section\",
        family: \".family-section\",
        rules: \".rules-section\",
        modern: \".modern-section\"
    };

    for (let group in sectionConfig) {
        const selector = sectionConfig[group].substring(1);
        if (targetElement.classList.contains(selector)) {
            groupClass = selector;
            break;
        }
    }

    if (!groupClass) return false;

    const allSections = document.querySelectorAll(groupClass);
    allSections.forEach(sec => sec.classList.remove(\"active\"));
    targetElement.classList.add(\"active\");
    return true;
}

