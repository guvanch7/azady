const apiUrl = 'http://localhost:1337/api/testimonials?populate=*&locale=en';
const strapiBase = 'http://localhost:1337';

$.ajax({
  url: apiUrl,
  method: 'GET',
  success: function (response) {
    const testimonials = response.data;

    testimonials.forEach(item => {
      const imageUrl = strapiBase + (item.image?.url || '');
      const iconUrl = strapiBase + (item.icon?.url || '');
      const shapeUrl = strapiBase + (item.shape?.url || '');
      const stars = item.stars || 5;

      let starsHtml = '';
      for (let i = 0; i < stars; i++) {
        starsHtml += '<i class="fa fa-star"></i>';
      }

      const testimonialHtml = `
        <div class="item">
          <div class="testimonial-one__single">
            <div class="testimonial-one__img-1">
              <img src="${imageUrl}" alt="">
              <div class="testimonial-one__shape-1">
                <img src="${shapeUrl}" alt="">
              </div>
            </div>
            <div class="testimonial-one__inner">
              <div class="testimonial-one__icon-and-ratting">
                <div class="testimonial-one__icon">
                  <img src="${iconUrl}" alt="">
                </div>
                <div class="testimonial-one__ratting">
                  ${starsHtml}
                </div>
              </div>
              <p class="testimonial-one__text">${item.text}</p>
              <div class="testimonial-one__client-name-box">
                <h4 class="testimonial-one__client-name">${item.client_name}</h4>
                <p class="testimonial-one__client-sub-title">${item.client_subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      `;

      $('.testimonial-one__carousel').append(testimonialHtml);
    });

    const firstBg = testimonials[0]?.shape?.url;
    if (firstBg) {
      $('#testimonial-bg').css('background-image', `url(${strapiBase}${firstBg})`);
    }

    $('.testimonial-one__carousel').owlCarousel({
      loop: true,
      autoplay: true,
      margin: 30,
      nav: true,
      dots: false,
      smartSpeed: 500,
      autoplayTimeout: 10000,
      navText: [
        '<span class="icon-right-arrow"></span>',
        '<span class="icon-right-arrow"></span>'
      ],
      responsive: {
        0: { items: 1 },
        768: { items: 1 },
        992: { items: 1 },
        1200: { items: 1 }
      }
    });
  },
  error: function (err) {
    console.error('❌ Ошибка загрузки отзывов:', err);
  }
});
