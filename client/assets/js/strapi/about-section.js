
function loadAboutSection(lang = 'en') {
    const apiUrl = `http://localhost:1337/api/about-sections?populate=*&locale=${lang}`;

    $.get(apiUrl, function (response) {
        const data = response?.data?.[0];
        if (!data) {
            console.warn('❌ No data in response');
            return;
        }

        $('#tagline').text(data.tagline || '');
        $('#title').text(data.title || '');
        $('#description').text(data.description || '');

        $('#experienceYears').text(data.experience_years || '00');
        $('#experienceText').text(data.experience_text || '');

        $('#point1Title').text(data.point_1_title || '');
        $('#point1Text').text(data.point_1_text || '');
        $('#icon1').attr('class', data.point_1_icon || '');

        $('#point2Title').text(data.point_2_title || '');
        $('#point2Text').text(data.point_2_text || '');
        $('#icon2').attr('class', data.point_2_icon || '');

        $('#btnLink').text(data.btn_text || '').attr('href', data.btn_link || '#');

        const img1 = data.main_image_1?.url;
        const img2 = data.main_image_2?.url;
        const badge = data.badge_image?.url;

        if (img1) $('#mainImage1').attr('src', `http://localhost:1337${img1}`);
        if (img2) $('#mainImage2').attr('src', `http://localhost:1337${img2}`);
        if (badge) $('#badgeImage').attr('src', `http://localhost:1337${badge}`);
    }).fail(function (err) {
        console.error('❌ Failed to load about-section:', err);
        console.log(img1); // Проверьте, выводится ли правильный URL
    });
}

$(document).ready(function () {
    const lang = localStorage.getItem('lang') || 'en';
    loadAboutSection(lang);

    $('.lang-btn').on('click', function () {
        const selectedLang = $(this).data('lang');
        localStorage.setItem('lang', selectedLang);
        loadAboutSection(selectedLang);
    });
});
