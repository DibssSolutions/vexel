import slick from 'slick-carousel';
import { LOADED } from '../constants';

const initWorkspaceSlider = () => {
  const sliderWrap = $('.js-slider-wrap');
  sliderWrap.each((i,el) => {
    const parent = $(el);

    if (parent.hasClass(LOADED)) return;
    parent.addClass(LOADED);

    const slider = $('.js-slider', parent);
    const btnPrev = $('.js-slider-btn-prev', parent);
    const btnNext = $('.js-slider-btn-next', parent);

    slider.slick({
    	dots: true,
      infinite: false,
      slidesToShow: 3,
      slideToScroll: 1,
      autoplay: false,
      prevArrow: '<button class="slider-btn slider-btn--prev js-slider-btn-prev">Prev</button>',
      nextArrow: '<button class="slider-btn slider-btn--next js-slider-btn-next">Next</button>'
    });
  });

};
window.initWorkspaceSlider = initWorkspaceSlider;
initWorkspaceSlider();
