import {ACTIVE, OPEN, DISABLED, BODY} from '../constants';

export default (() => {

  class Tabs {

    constructor(options) {
      this.cache = {};
      this.options = options || {};
      this.init();
    }

    init() {
      this.initializeCache();
      this.initializeEvents();
    }

    initializeCache() {
      const {main} = this.options;
      this.cache.main = main;
      this.cache.controls = main.find('[data-tabs-control]');
      this.cache.containers = main.find('[data-tabs-container]');
      this.cache.current = main.find('[data-tabs-current]');
    }

    initializeEvents() {
      this.setActiveOnClick();
    }

    setActiveOnClick() {
      const {controls, containers} = this.cache;
      controls.each((i, control) => {
        control = $(control);
        const container = this.getTabContainer(control, containers);

        control.on('click', e => {
          e.preventDefault();
          if (this.checkTabState(control, container) || control.hasClass(ACTIVE)) return;
          controls.removeClass(ACTIVE);
          containers.removeClass(OPEN);
          this.setActiveTab(control, container);
        });
      });
    }

    //utils
    checkTabState(control, container) {
      return control.hasClass(DISABLED) || control.attr('disabled') || !container.length;
    }

    getTabContainer(control, containers) {
      return containers.filter(`[data-tabs-container="${control.data('tabs-control')}"]`);
    }

    setActiveTab(control, container) {
      const text = control.text();
      const duration = 300;
      const initClass = 'is-tabs-init';
      
      this.cache.main.attr('data-tabs', control.data('tabs-control'));
      this.cache.current.text(text);
      control.addClass(ACTIVE);
      if (!this.cache.main.hasClass(initClass)) {
        container.addClass(OPEN);
        container.slideDown(duration);
        setTimeout(() => { this.cache.main.addClass(initClass); }, duration);
         
      }
      else {
        container.addClass(OPEN);
      }
    }

  };

  $('[data-tabs]').each((i, main) => new Tabs({ main: $(main) }) );

})();
