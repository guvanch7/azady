let currentLang = 'en';

function loadNavbarContent(lang = 'en') {
  const navbarApiUrl = `http://localhost:1337/api/navbars?populate=dropdowns&locale=${lang}`;
  const contactApiUrl = `http://localhost:1337/api/navbar-contacts?populate=*&locale=${lang}`;

  $.get(navbarApiUrl, function (navbarData) {
    $('#navbar-container').empty();

    let navbarHtml = '<div class="main-menu__main-menu-box">';
    navbarHtml += '<a href="#" class="mobile-nav__toggler"><i class="fa fa-bars"></i></a>';
    navbarHtml += '<ul class="main-menu__list">';

    const allItems = navbarData.data || [];

    // ⛔ Собираем все documentId вложенных dropdown-пунктов
    const nestedDocumentIds = new Set();
    allItems.forEach(item => {
      if (item.dropdowns && item.dropdowns.length > 0) {
        item.dropdowns.forEach(dd => {
          if (dd.documentId) {
            nestedDocumentIds.add(dd.documentId);
          }
        });
      }
    });

    // 🔃 Сортируем всё по очереди
    const sortedItems = allItems
      .filter(item => item.gorunsunmi !== false)
      .sort((a, b) => Number(a.ocered) - Number(b.ocered));

    // 🔁 Рендерим только те, кто не являются вложенными
    sortedItems.forEach(item => {
      if (nestedDocumentIds.has(item.documentId)) {
        // 🔕 Этот пункт уже есть как дропдаун – пропускаем
        return;
      }

      if (item.dropdowns && item.dropdowns.length > 0) {
        // 🔹 Пункт с выпадающим меню
        navbarHtml += `<li class="dropdown ${item.ocered === 1 ? 'current' : ''}">`;
        navbarHtml += `<a href="#" class="dropdown-toggle">${item.navbarTxt}</a>`;
        navbarHtml += '<ul class="dropdown-menu">';

        item.dropdowns.forEach(dd => {
          navbarHtml += `<li><a href="${dd.url}" class="dropdown-item">${dd.navbarTxt}</a></li>`;
        });

        navbarHtml += '</ul></li>';
      } else {
        // 🔸 Обычный пункт
        navbarHtml += `<li><a href="${item.url}" class="${item.ocered === 1 ? 'current' : ''}">${item.navbarTxt}</a></li>`;
      }
    });

    navbarHtml += '</ul></div>'; // Закрыли .main-menu__main-menu-box

    // ⏬ Контакты
    $.get(contactApiUrl, function (contactData) {
      if (contactData.data.length > 0) {
        const contact = contactData.data[0];
        const contactHtml = `
          <div class="main-menu__right">
            <div class="main-menu__call">
              <div class="main-menu__call-icon">
                <img src="assets/images/icon/${contact.call_icon.name}" alt="">
              </div>
              <div class="main-menu__call-content">
                <p class="main-menu__call-sub-title">${contact.call_subtitle}</p>
                <h5 class="main-menu__call-number"><a href="tel:${contact.phone}">${contact.phone}</a></h5>
              </div>
            </div>
            <div class="main-menu__btn-box">
              <a href="${contact.button_url}" class="thm-btn main-menu__btn">${contact.button_text}</a>
            </div>
          </div>
        `;
        navbarHtml += contactHtml;
      }

      navbarHtml += '</div>'; // Закрываем main-menu__bottom-inner

      $('#navbar-container').html(navbarHtml);

      // Поведение dropdown
      $(".dropdown").hover(
        function () {
          $(this).children(".dropdown-menu").stop(true, true).slideDown(200);
        },
        function () {
          $(this).children(".dropdown-menu").stop(true, true).slideUp(200);
        }
      );
    });
  });
}

$(document).ready(function () {
  const savedLang = localStorage.getItem('lang');
  currentLang = savedLang || 'en';

  loadNavbarContent(currentLang);

  $('.lang-btn').on('click', function () {
    const selectedLang = $(this).data('lang');
    currentLang = selectedLang;
    localStorage.setItem('lang', selectedLang);
    loadNavbarContent(currentLang);
  });
});
