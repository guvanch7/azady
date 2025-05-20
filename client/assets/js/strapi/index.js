import { loadStrapiContent } from './header.js';
import { loadNavbar } from './navbar.js';
// import { loadAboutSection } from './about-section.js';
import { loadVideoSection } from './video-section.js'; // <- добавь

function loadAll(lang = 'en') {
    loadStrapiContent(lang);
    loadNavbar(lang);
    loadAboutSection(lang); // Глобальная функция из about-section.js
    loadVideoSection(lang); // <- вызови

}

function initLangSwitcher() {
    $('.lang-btn').on('click', function () {
        const selectedLang = $(this).data('lang');
        localStorage.setItem('lang', selectedLang);
        loadAll(selectedLang);
    });
}

$(document).ready(function () {
    const lang = localStorage.getItem('lang') || 'en';
    loadAll(lang);
    initLangSwitcher();
});
