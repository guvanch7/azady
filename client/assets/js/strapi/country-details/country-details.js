$(document).ready(function () {
  const base = 'http://localhost:1337';
  const lang = localStorage.getItem('lang') || 'en';
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (!slug) {
    console.error('❌ Не указан slug в URL');
    return;
  }

  const apiUrl = `${base}/api/country-mains?filters[slug][$eq]=${slug}&populate=*&locale=${lang}`;

  $.get(apiUrl, function (response) {
    const item = response.data[0];

    if (!item) {
      console.error('❌ Страна не найдена');
      return;
    }

    // Структура без .attributes
    const data = item;

    $('#countryTitle').text(data.title);
    $('#countryContent').html(data.content);
    $('#countryTextTwo').html(data.countryTextTwo || '');
    $('#countryTextThree').html(data.countryTextThree || '');
    $('#countryTextFour').html(data.countryTextFour || '');
    $('#countryHeadingText3').text(data.countryHeadingText3 || '');
    $('#countryHeadingText4').html(data.countryHeadingText4 || '');

    if (data.image_1?.url) {
      $('#countryImage1').attr('src', base + data.image_1.url);
    }
    if (data.image_2?.url) {
      $('#countryImage2').attr('src', base + data.image_2.url);
    }

    const benefits = [
      { icon: data.benefit_1_icon, text: data.benefit_1_text },
      { icon: data.benefit_2_icon, text: data.benefit_2_text },
      { icon: data.benefit_3_icon, text: data.benefit_3_text }
    ];

    benefits.forEach(benefit => {
      if (benefit.icon && benefit.text) {
        $('#countryBenefits').append(`
          <li>
            <div class="icon">
              <span class="${benefit.icon}"></span>
            </div>
            <div class="text">
              <p><a href="#">${benefit.text}</a></p>
            </div>
          </li>
        `);
      }
    });

    // 👇 Вызов сайдбара, передавая текущий slug
    loadSidebarCountries(slug);
  }).fail(function (err) {
    console.error('❌ Ошибка загрузки данных:', err);
  });
});

// 🧩 Загружаем список всех стран в сайдбар
function loadSidebarCountries(currentSlug) {
  const lang = localStorage.getItem('lang') || 'en';
  const base = 'http://localhost:1337';
  const apiUrl = `${base}/api/country-mains?populate=*&locale=${lang}`;

  $.get(apiUrl, function (response) {
    const countries = response.data;

    countries.forEach((country) => {
      const slug = country.slug;
      const title = country.title;
      const flagUrl = country.flag?.url ? base + country.flag.url : '';
      const isActive = slug === currentSlug ? 'active' : '';

      const html = `
        <li class="${isActive}">
          <a href="countries-details.html?slug=${slug}">${title}</a>
          <div class="countries-details__countries-flag">
            <img src="${flagUrl}" alt="${title} Flag">
          </div>
        </li>
      `;

      $('#sidebarCountries').append(html);
    });
  }).fail(function (err) {
    console.error('❌ Ошибка загрузки стран в сайдбар:', err);
  });
}
