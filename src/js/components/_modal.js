import { OPEN, ACTIVE, BODY, LOADED, OVERFLOW_HIDDEN } from '../constants';

const modal = () => {

  const controls = $('[data-modal-control]');
  const modals = $('[data-modal]');
  BODY.on('click', '[data-modal-control]', function(e) {
    e.preventDefault();
    const control = $(this);
    const modal = modals.filter(`[data-modal="${control.data('modal-control')}"]`);
    if (!control.hasClass(ACTIVE)) {
      modals.removeClass(OPEN);
      modal.addClass(OPEN);
      controls.removeClass(ACTIVE);
      control.addClass(ACTIVE);
      BODY.addClass(OVERFLOW_HIDDEN);
    }
    else {
      modal.removeClass(OPEN);
      control.removeClass(ACTIVE);
      BODY.removeClass(OVERFLOW_HIDDEN);
    }
  });

  const hide = () => {
    modals.removeClass(OPEN);
    controls.removeClass(ACTIVE);
    BODY.removeClass(OVERFLOW_HIDDEN);
  };

  BODY.on('click', e => {
    if ($(e.target).closest('[data-modal-container]').length || $(e.target).closest('[data-modal-control]').length ) return;
    hide();
  });
};
window.modal = modal;

modal();
