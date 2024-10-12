// Cache DOM elements once
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const sections = Array.from(document.querySelectorAll('section'));
const navLinks = Array.from(document.querySelectorAll('header nav a'));
const header = document.querySelector('header');

// Toggle menu icon and navigation bar
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Scroll and update active section
function updateActiveSection() {
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

// Debounce scroll event to improve performance
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
    header.classList.toggle('sticky', window.scrollY > 1);
}

// Attach scroll events with debounce
window.addEventListener('scroll', debounce(() => {
    updateActiveSection();
    toggleStickyClass();
}, 50));
