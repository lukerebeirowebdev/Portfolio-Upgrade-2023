// Cache DOM elements once
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = Array.from(document.querySelectorAll('section'));
const navLinks = Array.from(document.querySelectorAll('header nav a'));
const header = document.querySelector('header');

// Null check for mobile menu elements
if (!menuIcon || !navbar) {
    console.warn('Menu elements not found on this page');
}

// Toggle menu icon and navigation bar
if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header') && navbar.classList.contains('active')) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    });

    // Close menu on window resize (when viewport exceeds tablet size)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    });
}

// Scroll and update active section
function updateActiveSection() {
    if (sections.length === 0) return;

    const windowTop = window.scrollY;

    sections.forEach(section => {
        const offset = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (windowTop >= offset && windowTop < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`header nav a[href*=${id}]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

// Debounce function to improve performance
function debounce(func, wait = 20) {
    let timeout;
    return function (...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Toggle sticky header class
function toggleStickyClass() {
    if (header) {
        header.classList.toggle('sticky', window.scrollY > 1);
    }
}

// Throttle function for touch events
function throttle(func, limit = 100) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler
const handleScroll = debounce(() => {
    updateActiveSection();
    toggleStickyClass();
}, 50);

// Attach scroll events with debounce
window.addEventListener('scroll', handleScroll, { passive: true });

// Handle touch events for better mobile responsiveness
document.addEventListener('touchend', () => {
    // Trigger scroll update on touch end for better responsiveness
    throttle(handleScroll, 100)();
}, { passive: true });

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveSection();
    toggleStickyClass();
});
