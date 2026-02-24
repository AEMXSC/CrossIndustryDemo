import Swiper from './swiper.min.js';
export default async function decorate(block) {
  // Create swiper container
  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'swiper';

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper';

  // Select all overview wrappers inside section
  const section = block.closest('.hitech-overview-container');
  const wrappers = section.querySelectorAll('.hitech-overview-wrapper');

  wrappers.forEach((wrapper) => {
    wrapper.classList.add('swiper-slide');
    swiperWrapper.appendChild(wrapper);
  });

  swiperContainer.appendChild(swiperWrapper);

  // Add navigation
  swiperContainer.insertAdjacentHTML('beforeend', `
    <div class="swiper-pagination"></div>
  `);

  section.innerHTML = '';
  section.appendChild(swiperContainer);

 hitechArticles2();
}

function hitechArticles2() {
  Swiper(".hi-tech-overview-variant1 .swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1
      },
      1024: {
        slidesPerView: 1
      }
    }
  });
}