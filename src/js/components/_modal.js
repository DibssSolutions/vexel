import { OPEN, ACTIVE, BODY, HTMLBODY, HTML, LOADED, OVERFLOW_HIDDEN, ANIMATE } from '../constants';
import { SCROLL_WIDTH } from '../utils';

const showModal = (container) => {
  $(container).addClass(OPEN);
  setTimeout(() => {
    $(container).addClass(ANIMATE);
  }, 50);
  HTML.css('paddingRight', SCROLL_WIDTH());
  HTMLBODY.addClass(OVERFLOW_HIDDEN);
};

const hideModal = popup => {
  $(popup).removeClass(OPEN);
  HTMLBODY.removeClass(OVERFLOW_HIDDEN);
  HTML.css('paddingRight', 0);
  if ($('[data-modal].is-open').length === 0) {
    setTimeout(() => {
      $(popup).removeClass(ANIMATE);
      window.destroyModalSlider();
    }, 300);
  }
};

const modal = () => {

  const controls = $('[data-modal-control]');
  const modals = $('[data-modal]');
  let offsetTop;
  let offsetLeft;
  BODY.on('click', '[data-modal-control]', function(e) {
    e.preventDefault();
    const control = $(this);
    const modal = modals.filter(`[data-modal="${control.data('modal-control')}"]`);
    const modalInner = modal.find('[data-modal-container]');
    const slide = control.parents('[data-slide-number]');
    const slideNumber = slide.data('slide-number');

    let id = $(`[data-slide-index="${slide.data('slide-number')}"]`).index();
    if (slideNumber && slide) { 
      window.initModalSlider(id+1);
    }

    offsetTop = control.offset().top - modalInner.height();
    offsetLeft = control.offset().left - modalInner.width();
    modalInner.css({
      'transform': `scale(0.6) translate(${offsetLeft}px,${offsetTop}px)`
    });
    if (!modal.hasClass(OPEN)) {
      showModal(modal);
    }
    else {
      modal.removeClass(OPEN);

      setTimeout(() => {
        modal.removeClass(ANIMATE);
        if (slideNumber && slide) { 
          window.destroyModalSlider();
        }
      }, 300);
      HTMLBODY.removeClass(OVERFLOW_HIDDEN);
    }
  });
  
  BODY.on('click', '[data-modal-close]', function(e) { hideModal('[data-modal]'); });
  BODY.on('click', '[data-modal]', function(e) {
    if ($(e.target).closest('[data-modal-inner]').length || $(e.target).closest('[data-modal-control]').length ) return;
    if ($(e.target).closest('[data-modal]').length) {
      const modalInner = $(this).find('[data-modal-container]');
      hideModal(this);
    }
  });
};
window.modal = modal;
window.showModal = showModal;
window.hideModal = hideModal;

modal();
