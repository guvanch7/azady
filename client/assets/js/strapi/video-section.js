function loadVideoSection(lang = 'en') {
    const apiUrl = `http://localhost:1337/api/video-mains?populate=*&locale=${lang}`;

    $.get(apiUrl, function (response) {
        const item = response?.data?.[0];
        if (!item) return;

        const base = "http://localhost:1337";

        // ✅ Фон
        const bgUrl = item.image?.url ? `${base}${item.image.url}` : 'assets/images/backgrounds/video-one-bg.jpg';
        $('.video-one__bg').css('background-image', `url(${bgUrl})`);

        // ✅ Заголовок и подзаголовок
        $('.section-title__tagline').text(item.subtitle || 'Subtitle');
        $('.section-title__title').text(item.title || 'Title');

        // ✅ Видео
        const videoUrl = item.video_file?.url;
        if (videoUrl) {
            $('.video-one__video-link a').attr('href', `${base}${videoUrl}`);
        }

        // ✅ Текст под видео
        $('.video-one__text').html(item.text || '');

        // ✅ Shape изображение
        const shapeUrl = item.shape_image?.url;
        if (shapeUrl) {
            $('#video-shape-img').attr('src', `${base}${shapeUrl}`);
        }

        // ✅ Features
        const features = item.features || [];
        const $list = $('.video-one__points');
        $list.empty();

        features.forEach(feature => {
            const icon = feature.icon_class || 'check';
            const text = feature.text || '';

            $list.append(`
                <li>
                    <div class="icon">
                        <span class="icon-${icon}"></span>
                    </div>
                    <div class="text">
                        <p>${text}</p>
                    </div>
                </li>
            `);
        });
    }).fail(function (err) {
        console.error('❌ Ошибка при загрузке видео-секции:', err);
    });
}

// Вызов функции при загрузке
$(document).ready(function () {
    loadVideoSection('en'); // Или 'ru' / 'tk'
});