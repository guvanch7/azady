function loadFeatureSection(lang = 'en') {
    const apiUrl = `http://localhost:1337/api/service-mains?populate=*&locale=${lang}`;

    $.get(apiUrl, function (response) {
        const container = $('.feature-one .row');
        container.empty(); // Очистить текущие карточки

        const services = response?.data || [];

        services
            .sort((a, b) => {
                const aOrder = a.order || 0;
                const bOrder = b.order || 0;
                return aOrder - bOrder;
            })
            .forEach(service => {
                const shapeUrl = service.shape?.url;
                const imgUrl = service.image?.url;
                const title = service.Title || '';
                const subtitle = service.subtitle || '';
                const button = service.button || '';
                const link = service.link || '#';

                const cardHtml = `
                <div class="col-xl-4 col-lg-4">
                    <div class="feature-one__single">
                        <div class="feature-one__inner">
                            ${shapeUrl ? `
                            <div class="feature-one__shape-1">
                                <img src="http://localhost:1337${shapeUrl}" alt="">
                            </div>` : ''}
                            ${imgUrl ? `
                            <div class="feature-one__img-one">
                                <img src="http://localhost:1337${imgUrl}" alt="">
                            </div>` : ''}
                            <p class="feature-one__sub-title">${subtitle}</p>
                            <h3 class="feature-one__title">
                                <a href="${link}">${title}</a>
                            </h3>
                            <div class="feature-one__btn-box">
                                <a href="${link}" class="feature-one__btn">${button}</a>
                            </div>
                        </div>
                    </div>
                </div>`;

                container.append(cardHtml);
            });
    }).fail(function (err) {
        console.error('❌ Failed to load feature-section:', err);
    });
}

$(document).ready(function () {
    const lang = localStorage.getItem('lang') || 'en';
    loadFeatureSection(lang);

    $('.lang-btn').on('click', function () {
        const selectedLang = $(this).data('lang');
        localStorage.setItem('lang', selectedLang);
        loadFeatureSection(selectedLang);
    });
});
