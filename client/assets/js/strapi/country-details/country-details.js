function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug') || '';
}

const slug = getSlug();
const base = 'http://localhost:1337'; // или твой прод URL
const apiUrl = `${base}/api/countries?filters[slug][$eq]=${slug}&populate=*&locale=en`;

$.get(apiUrl, function(response) {
  const country = response.data[0];
  if (!country) {
    $('#countryTitle').text('Country not found');
    return;
  }

  $('#countryTitle').text(country.title);
  $('#countryContent').html(country.content || '');

  $('#countryImage1').attr('src', base + (country.image_1?.url || ''));
  $('#countryImage2').attr('src', base + (country.image_2?.url || ''));

  // Подгружаем список преимуществ
  const benefits = [
    { icon: country.benefit_1_icon, text: country.benefit_1_text },
    { icon: country.benefit_2_icon, text: country.benefit_2_text },
    { icon: country.benefit_3_icon, text: country.benefit_3_text }
  ];

  benefits.forEach(b => {
    if (!b.text) return;
    const html = `
      <li>
        <div class="icon"><span class="${b.icon}"></span></div>
        <div class="text"><p><a href="#">${b.text}</a></p></div>
      </li>
    `;
    $('#countryBenefits').append(html);
  });
});
