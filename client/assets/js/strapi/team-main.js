function loadTeamMembers(lang = 'en') {
    const apiUrl = `http://localhost:1337/api/team-mains?populate=*&locale=${lang}`;
    const baseUrl = 'http://localhost:1337';
    const $container = $('.team-one .row');
    
    $.get(apiUrl, function (response) {
        const members = response?.data || [];
        if (members.length === 0) return;

        $container.empty(); // Очищаем перед вставкой

        members.forEach((item, index) => {
            const m = item.attributes || item;

            const name = m.name || 'No Name';
            const position = m.position || 'Position';
            const instagram = m.instagram || '#';
            const email = m.email || '';
            const phone = m.phone || '';

            const image = m.image?.url ? `${baseUrl}${m.image.url}` : 'assets/images/team/team-1-1.jpg';


            const delay = (index + 1) * 100;

            const html = `
                <div class="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay="${delay}ms">
                    <div class="team-one__single">
                        <div class="team-one__img-box">
                            <div class="team-one__img">
                                <img src="${image}" alt="${name}">
                            </div>
                            <div class="team-one__share-btn">
                                <a href="#"><i class="fa fa-share-alt"></i></a>
                            </div>
                            <ul class="list-unstyled team-one__social">
                                ${instagram ? `<li><a href="${instagram}" target="_blank"><i class="fab fa-instagram"></i></a></li>` : ''}
                                ${email ? `<li><a href="mailto:${email}"><i class="fas fa-envelope"></i></a></li>` : ''}
                                ${phone ? `<li><a href="tel:${phone}"><i class="fas fa-phone"></i></a></li>` : ''}
                            </ul>
                        </div>
                        <div class="team-one__content">
                            <p class="team-one__sub-title">${position}</p>
                            <h3 class="team-one__title"><a href="#">${name}</a></h3>
                            <p class="team-one__sub-title"><i class="fas fa-phone"></i> ${phone}</p>
                            <p class="team-one__sub-title"><i class="fas fa-envelope"></i> ${email}</p>
                            
                        </div>
                    </div>
                </div>
            `;

            $container.append(html);
        });
    }).fail(function (err) {
        console.error('❌ Ошибка при загрузке сотрудников:', err);
    });
}

$(document).ready(function () {
    const lang = localStorage.getItem('lang') || 'en';
    loadTeamMembers(lang);

    $('.lang-btn').on('click', function () {
        const selectedLang = $(this).data('lang');
        localStorage.setItem('lang', selectedLang);
        loadTeamMembers(selectedLang);
    });
});
