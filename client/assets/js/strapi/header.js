 
function loadStrapiContent(lang = 'en') {
  fetch(`http://localhost:1337/api/content-blocks?populate=headerSurat&locale=${lang}`)
    .then(res => res.json())
    .then(json => {
      if (!json.data) return;

      json.data.forEach(item => {
        const key = item.key;
        const value = item.value;
        const headerImage = item.headerSurat;
        const imageUrl = headerImage?.url ? `http://localhost:1337${headerImage.url}` : null;

        const textElement = $(`[data-strapi-text="${key}"]`);
        if (textElement.length && Array.isArray(value)) {
          const html = value.map(paragraph =>
            paragraph.children.map(child => child.text).join('')
          ).join('');
          textElement.html(html);
        }

        const bgElement = $(`[data-strapi-bg="${key}"]`);
        if (bgElement.length && imageUrl) {
          bgElement.css('background-image', `url("${imageUrl}")`);
        }
      });
    })
    .catch(err => console.error("Ошибка загрузки данных:", err));
}

$(document).ready(function () {
  loadStrapiContent(currentLang);

  $('.lang-btn').on('click', function () {
    const selectedLang = $(this).data('lang');
    currentLang = selectedLang;
    loadStrapiContent(currentLang);
  });
});
