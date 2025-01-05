// navbar fixed
window.onscroll = function () {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;

    if (window.scrollY > fixedNav) {
        header.classList.add('navbar-fixed');

    } else {
        header.classList.remove('navbar-fixed');
    }
}

// Hamburger

const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');


hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

function truncateText(element, maxLength) {
    const text = element.textContent;
    const words = text.split(' ');
    let truncatedText = '';

    for (let i = 0; i < maxLength && i < words.length; i++) {
        truncatedText += words[i] + ' ';
    }

    element.textContent = truncatedText.trim() + '...';
}

// Contoh penggunaan:
const paragraph = document.querySelector('.paragraph');
truncateText(paragraph, 150); // Batasi hingga berapa kata