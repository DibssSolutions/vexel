import slick from 'slick-carousel';
import { LOADED, HIDDEN, WIN } from '../constants';
import { mediaWidth } from '../utils';


class InitSetGrid {

  constructor(options) {
  	this.slider = $('.js-slider');
  	this.sliderOptions = {
      dots: true,
      infinite: false,
      slidesToShow: 3,
      slideToScroll: 1,
      autoplay: false,
      prevArrow: '<button class="slider-btn slider-btn--prev js-slider-btn-prev">Prev</button>',
      nextArrow: '<button class="slider-btn slider-btn--next js-slider-btn-next">Next</button>',
      responsive: [
        {
			   	breakpoint: 991,
			   	settings: {
			   		arrows: false,
			   		slidesToShow: 2
			   	}
        },
        {
			  	breakpoint: 767,
			  	settings: {
			  		arrows: false,
			  	  slidesToShow: 1
			  	}
        }
      ]
    };

  	this.sliderTrack = $('.js-v-slider-track');

    this.btnSetSlider = $('.js-btn-set-slider');
    this.btnSetGrid = $('.js-btn-set-grid');

    this.activeLinkClass = 'views-link--active';
    this.activegrid = 'is-open-grid';

    this.cards = $('.js-vexel-teas', this.slider);
    this.cardLg = 'vexel-teas--lg';
    this.cardSm = 'vexel-teas--sm';

    this.duration = 150;
    this.tl = new TimelineMax({ paused: true });

    this.init();
  }

  init() {
    this.initSlider();
    this.setSlider();
    this.setGrid();
    this.resizeGrid();
  }

  initSlider() {
  	this.slider
  	  .slick(this.sliderOptions)
  	  .addClass(LOADED);
  	this.sliderTrack.height(this.slider.height());
  }

  setSlider() {
  	this.btnSetSlider.on('click', e => {
  	  
  	  e.preventDefault();
  	  this.btnSetGrid.removeClass(this.activeLinkClass);
  	  this.btnSetSlider.addClass(this.activeLinkClass);

  	  this.slider.addClass(HIDDEN);

  	  setTimeout(() => { 
  	  	this.slider.removeClass(this.activegrid); 
  	    this.cards
  	      .removeClass(this.cardSm)
  	      .addClass(this.cardLg);
  	  	this.slider.slick(this.sliderOptions);
  	  	this.sliderTrack.height(this.slider.height());
  	  	this.slider.removeClass(HIDDEN);
  	  }, this.duration);

  	});

  }

  initSlider() {
    this.slider.slick(this.sliderOptions);
    setTimeout(() => {
      this.slider.removeClass(HIDDEN);
    }, 300);
  }

  destroySlider() {
    this.slider.addClass(HIDDEN);
    setTimeout(() => {
      this.slider.slick('unslick');
    }, 300);
  }

  setGrid() {
  	this.btnSetGrid.on('click', e => {
      e.preventDefault();

  	  this.btnSetSlider.removeClass(this.activeLinkClass);
  	  this.btnSetGrid.addClass(this.activeLinkClass);

  	  this.slider.addClass(HIDDEN);

  	  setTimeout(() => { 
        this.slider.slick('unslick');
  	  	this.slider.addClass(this.activegrid);
  	  	this.cards
  	  		.removeClass(this.cardLg)
  	  		.addClass(this.cardSm);
  	  	this.sliderTrack.height(this.slider.height());
  	  	this.slider.removeClass(HIDDEN);
  	  }, this.duration);

  	});

  }

  resizeGrid() {
  	let timeOut;
  	WIN.on('resize', () => {
  		clearTimeout(timeOut);
  		timeOut = setTimeout(() => {
  			this.sliderTrack.height(this.slider.height());
  			if (mediaWidth(991) && !this.slider.hasClass('slick-initialized')) this.btnSetSlider.trigger('click');
  		}, 100);
  	});
  }
  
};

window.setGrid = () => {
  window.grid = new InitSetGrid();
};


// window.setGrid();
