// Showing or Toggling Menu

const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Toggle menu on click
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Clicking on a nav link removes the menu in mobile view
const navLinks = document.querySelectorAll('.nav-link');

const linkAction = () => {
    navMenu.classList.remove('show-menu');
}

navLinks.forEach(link => link.addEventListener('click', linkAction));

// Adding Atropos function
const myAtropos = Atropos({
    el: '.home-images',
    shadow: false,
    highlight: false,
});

// Shadow header when scroll is greater than 50% of viewport height
const shadowHeader = () => {
    const header = document.getElementById('header');
    if (window.scrollY >= window.innerHeight * 0.5) {
        header.classList.add('shadow-header');
    } else {
        header.classList.remove('shadow-header');
    }
}
window.addEventListener('scroll', shadowHeader);

const overlay = document.getElementById('overlay');
document.addEventListener('mousemove', (e) => {
    overlay.style.background = `radial-gradient(circle at ${e.pageX}px ${e.pageY}px, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.8) 150px)`;
});
