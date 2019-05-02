import { OPEN, ACTIVE, BODY, LOADED, OVERFLOW_HIDDEN } from '../constants';

const modal = () => {

  const controls = $('[data-modal-control]');
  const modals = $('[data-modal]');
  controls.each((i, control) => {
    control = $(control);
    const modal = modals.filter(`[data-modal="${control.data('modal-control')}"]`);
    if ( modal.hasClass(LOADED) ) return;

    control.on('click', e => {
      e.preventDefault();
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
  });

  modals.each((i, modal) => {
    modal = $(modal);
    const inner = modal.find('[data-modal-container]');
    const close = modal.find('[data-modal-close]');

    const hide = () => {
      modal.removeClass(OPEN);
      controls.removeClass(ACTIVE);
      BODY.removeClass(OVERFLOW_HIDDEN);
    };

    BODY.on('click', e => {
      if ($(e.target).closest('[data-modal-container]').length || $(e.target).closest('[data-modal-control]').length ) return;
      hide();
    });

    close.on('click', e => {
      e.preventDefault();
      hide();
    });
    if ( modal.hasClass(LOADED) ) return;
    modal.addClass(LOADED);
  });
};
window.modal = modal;

modal();
