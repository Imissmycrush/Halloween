
// Showing or Toggling Menu

const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

//Clicking in one option, removes nav mobile

const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

//Adding Atropos function

const myAtropos = Atropos({
    el: '.home-images',
    shadow: false,
    highlight: false,
})

//Shadowheader when scroll is higher than 50% view hight

const shadowHeader = () => {
    const header = document.getElementById('header');
    this.scrollY >= 50 ? header.classList.add('shadow-header') : header.classList.remove('shadow-header');
}
window.addEventListener('scroll', shadowHeader);
const overlay = document.getElementById('overlay');
        document.addEventListener('mousemove', (e) => {
            overlay.style.background = `radial-gradient(circle at ${e.pageX}px ${e.pageY}px, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.8) 150px)`;
        });
