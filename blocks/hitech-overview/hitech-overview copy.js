import {
  a,
  div,
  h2,
  img,
  p
} from "../../scripts/dom-helpers.js";

export default function decorate(block) {
  console.log(block);
      block.closest(".hitech-overview-wrapper").classList.add('swiper');
      block.classList.add("swiper-wrapper");
      Array.from(block.children).forEach((element) => {
        element.classList.add('swiper-slide');
      });
      const paginationEl = document.createElement('div');
      paginationEl.classList.add('swiper-pagination');
      block.closest(".hitech-overview-wrapper").appendChild(paginationEl);
        hitechOverviewVariant()
    }

    function hitechOverviewVariant() {
      Swiper(".hi-tech-overview-variant1 .swiper", {
          slidesPerView: 3,
          slideToClickedSlide: true,
          spaceBetween: 12,
          grabCursor: true,
         breakpoints: {
            0: {
              slidesPerView: 1,
            },
            375: {
              slidesPerView: 1.5,
            },
            767: {
              slidesPerView: 1.5,
            },
            1024: {
              slidesPerView: 3,
            },
          }
        });
    }