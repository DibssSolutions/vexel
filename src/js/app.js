import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import './common';
import { BODY, NO_TOUCH } from './constants';
import { isTouch } from './utils';
svg4everybody();

$('.btn-main').click(function(e) {
  $(this).toggleClass('open');
  $('.h-nav').toggleClass('open');
  e.preventDefault();
});

if (!isTouch()) BODY.addClass(NO_TOUCH);
