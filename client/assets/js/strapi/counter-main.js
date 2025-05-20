function initCounters() {
    if ($(".count-box").length) {
        $(".count-box").appear(function () {
            var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);

            if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function () {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $t.find(".count-text").text(this.countNum);
                    }
                });
            }
        }, { accY: 0 });
    }
}

function loadCounterSection(lang = 'en') {
    const apiUrl = `http://localhost:1337/api/counter-mains?populate=*&locale=${lang}`;

    $.get(apiUrl, function (response) {
        const items = response?.data;
        if (!items || items.length === 0) return;

        const firstBg = items[0]?.attributes?.background?.data?.attributes?.url || items[0]?.background?.url;
        const bgUrl = firstBg ? `http://localhost:1337${firstBg}` : 'assets/images/backgrounds/counter-one-bg.png';
        $('.counter-one__bg').css('background-image', `url(${bgUrl})`);

        const $list = $('#counter-items-container');
        $list.empty();

        items.forEach(item => {
            const attrs = item.attributes || item;
            const icon = attrs.icon_class || 'icon-check';
            const value = attrs.value || '';
            const suffix = attrs.suffix || '';
            const title = attrs.title || 'Title';

            $list.append(`
                <!--Counter One Single Start-->
                <div class="col-xl-3 col-lg-6 col-md-6">
                    <div class="counter-one__single">
                        <div class="counter-one__icon">
                            <span class="${icon}"></span>
                        </div>
                        <div class="counter-one__content">
                            <div class="counter-one__count-box count-box">
                                <h3 class="count-text" data-stop="${value}" data-speed="1500">00</h3>
                                <span class="counter-two__plus">${suffix}</span>
                            </div>
                            <p>${title}</p>
                        </div>
                    </div>
                </div>
                <!--Counter One Single End-->
            `);
        });

        // 👇 После загрузки: пересканировать .appear и запустить
        initCounters();
    }).fail(function (err) {
        console.error('❌ Ошибка при загрузке счётчиков:', err);
    });
}

$(document).ready(function () {
    loadCounterSection('en'); // Или 'ru', 'tk'
});
