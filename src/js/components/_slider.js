import slick from 'slick-carousel';
import { LOADED } from '../constants';

const prevArrow = '<button class="slider-btn slider-btn--prev js-slider-btn-prev">Prev</button>';
const nextArrow = '<button class="slider-btn slider-btn--next js-slider-btn-next">Next</button>';

const initSlider = (els,option) => {
  els.each((i,el) => {
    const slider = $(el);

    if (slider.hasClass(LOADED)) return;

    slider
	    .slick(option)
	    .addClass(LOADED);

  });
};

// init modal slider
const modalSlider = $('.js-slider-modal');
window.initModalSlider = () => {
  initSlider(modalSlider, {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slideToScroll: 1,
    autoplay: false,
    // fade: true,
    adaptiveHeight: true,
    prevArrow: prevArrow,
    nextArrow: nextArrow,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          adaptiveHeight: true,
          arrows: false
        }
      }
    ]
  });
};
