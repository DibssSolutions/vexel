import slick from 'slick-carousel';
import { LOADED, BODY } from '../constants';

const prevArrow = '<button class="slider-btn slider-btn--prev js-slider-btn-prev">Prev</button>';
const nextArrow = '<button class="slider-btn slider-btn--next js-slider-btn-next">Next</button>';

const initSlider = (els,option,slideNumber) => {
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
window.initModalSlider = (numb) => {
  
  if (modalSlider.hasClass(LOADED)) return;
  modalSlider
    .slick({
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slideToScroll: 1,
      autoplay: false,
      initialSlide: numb-1 || 0,
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
    })
    .addClass(LOADED);
  
};

window.destroyModalSlider = () => {
  if (!$('[data-modal] .slick-initialized').length) return;
  modalSlider
    .removeClass(LOADED)
    .slick('unslick');
};


const removeBtn = '.js-vexel-teas-remove';

BODY.on('click', removeBtn, function() {
  const parent = $(this).parents('[data-slide-number]');
  const id = parent.data('slide-number');
  window.grid.removeSlide(parent);
  $(`[data-slide-index="${id}"]`).remove();
});
