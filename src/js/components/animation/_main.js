import { STAGGER } from '../helpers/_stagger';
import { WIN, ANIMATE } from '../../constants';
import { SCROLL_WIDTH } from '../../utils';

const btnStart = $('.js-start-main-animation');

const main = $('[data-anim-main]');
const mainFadeOut = $('[data-anim-main-fade-out]');

const mainContainer = $('[data-anim-main-container]');
const mainFadeIn = $('[data-anim-main-fade-in]');

const mainAnim = new TimelineMax({ paused: true })
  .to( main, 1.5, {
    y: WIN.height(),
    ease: Power3.easeInOut
  }, 0)
  .add(() => {
  	STAGGER({
    	elements: mainFadeOut,
    	y: 200,
    	duration: 0.7,
    	delay: -0.1,
  		ease: Power3.easeInOut
    });
  }, 0)
  .add(() => {
  	main.css('paddingRight', SCROLL_WIDTH()+'px');
  	main.addClass(ANIMATE);
  }, 0)
  .add(() => mainContainer.addClass(ANIMATE), 0)
  .add(() => {
  	STAGGER({
    	elements: mainFadeIn,
    	duration: 0.7,
    	opacity: 1,
    	delay: 0.12,
    	ease: Power3.easeInOut
    });
  }, 0.5)
  .eventCallback('onComplete', () => { main.remove(); }, null );


btnStart.on('click', () => {
  mainAnim.play();
});
