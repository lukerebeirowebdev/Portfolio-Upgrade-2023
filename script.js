// toggle icon navigation bar

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', toggleMenu);

function toggleMenu() {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

function updateActiveSection() {
    const sections = Array.from(document.querySelectorAll('section'));
    const navLinks = Array.from(document.querySelectorAll('header nav a'));

    // Cache DOM elements and calculations outside the loop
    const windowTop = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (windowTop >= offset && windowTop < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector(`header nav a[href*=${id}]`).classList.add('active');
            });
        }
    });
}

window.addEventListener('scroll', updateActiveSection);


const header = document.querySelector('header');

window.addEventListener('scroll', toggleStickyClass);

function toggleStickyClass() {
    header.classList.toggle('sticky', window.scrollY > 100);
}