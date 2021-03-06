import { BODY } from '../constants';
const classFlip = 'is-flip';

BODY.on('click', '.js-vexel-go-to, .js-vexel-back', function(e) {
  e.preventDefault();
  const parent = $(this).parents('[data-anim-flip]');
  const track = $(this).parents('.slick-list, .slick-track');
  $('.js-slider-modal').addClass('no-hodden');
  setTimeout(() => {
  	$('.js-slider-modal').removeClass('no-hodden');
  }, 500);
  (!parent.hasClass(classFlip))
  	? parent.addClass(classFlip)
  	: parent.removeClass(classFlip);

  setTimeout(() => {
  	track.outerHeight(parent.outerHeight());
  }, 10);
});

