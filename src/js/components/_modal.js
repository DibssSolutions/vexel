import { OPEN, ACTIVE, BODY, HTMLBODY, HTML, LOADED, OVERFLOW_HIDDEN, ANIMATE } from '../constants';
import { SCROLL_WIDTH } from '../utils';

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
    offsetTop = control.offset().top - modalInner.height();
    offsetLeft = control.offset().left - modalInner.width();
    modalInner.css({
      'transform': `scale(0.6) translate(${offsetLeft}px,${offsetTop}px)`
    });
    if (!modal.hasClass(OPEN)) {
      modal.addClass(OPEN);
      setTimeout(() => {
        modal.addClass(ANIMATE);
      }, 50);
      HTML.css('paddingRight', SCROLL_WIDTH());
      HTMLBODY.addClass(OVERFLOW_HIDDEN);
    }
    else {
      modal.removeClass(OPEN);

      setTimeout(() => {
        modal.removeClass(ANIMATE);
      }, 300);
      HTMLBODY.removeClass(OVERFLOW_HIDDEN);
    }
  });

  BODY.on('click', '[data-modal]', function(e) {
    if ($(e.target).closest('[data-modal-inner]').length || $(e.target).closest('[data-modal-control]').length ) return;
    if ($(e.target).closest('[data-modal]').length) {
      const modalInner = $(this).find('[data-modal-container]');
      $(this).removeClass(OPEN);
      if ($('[data-modal].is-open').length === 0) {
        HTMLBODY.removeClass(OVERFLOW_HIDDEN);
        HTML.css('paddingRight', 0);
        setTimeout(() => {
          $(this).removeClass(ANIMATE);
        }, 300);
      }
    }
  });
  
};
window.modal = modal;

modal();
