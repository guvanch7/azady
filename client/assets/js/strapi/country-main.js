$(document).ready(function () {
  const lang = localStorage.getItem('lang') || 'en'; // en, ru, tm и т.д.
  const apiUrl = `http://localhost:1337/api/country-mains?populate=*&locale=${lang}`;
  const base = 'http://localhost:1337';

  $.get(apiUrl, function (response) {
    const countries = response.data;

    countries.forEach(item => {
      const title = item.title;
      const slug = item.slug;
      const shortDescription = item.short_description || '';
      const flagImage = item.flag?.url ? base + item.flag.url : '';

      const card = `
        <div class="col-xl-2 col-lg-4 col-md-6">
          <div class="countries-one__single">
            <div class="countries-one__img-box">
              <div class="countries-one__img">
                <img src="${flagImage}" alt="${title}">
              </div>
            </div>
            <h3 class="countries-one__title">
              <a href="countries-details.html?slug=${slug}">${title}</a>
            </h3>
            <p class="countries-one__text">${shortDescription}</p>
            <div class="countries-one__arrow-box">
              <a href="countries-details.html?slug=${slug}" class="countries-one__arrow">
                <i class="icon-right-arrow"></i>
              </a>
            </div>
          </div>
        </div>
      `;

      $('#countriesContainer').append(card);
    });
  }).fail(function (err) {
    console.error('❌ Ошибка при загрузке стран:', err);
  });
});
