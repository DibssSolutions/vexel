import { STAGGER } from '../helpers/_stagger';
import { WIN, ANIMATE } from '../../constants';
const btnStart = $('.js-start-main-animation');

const main = $('[data-anim-main]');
const mainFadeOut = $('[data-anim-main-fade-out]');

const mainContainer = $('[data-anim-main-container]');
const mainFadeIn = $('[data-anim-main-fade-in]');

const mainAnim = new TimelineMax({ paused: true })
  .to( main, 0.8, {
    y: WIN.height(),
    ease: Power3.easeInOut
  }, 0)
  .add(() => {
  	STAGGER({
    	elements: mainFadeOut,
    	y: 200,
    	duration: 0.4,
    	delay: -0.05,
  		ease: Power3.easeInOut
    });
  }, 0)
  .add(() => {
  	main.addClass(ANIMATE);
  }, 0)
  .add(() => mainContainer.addClass(ANIMATE), 0)
  .add(() => {
  	STAGGER({
    	elements: mainFadeIn,
    	duration: 0.4,
    	opacity: 1,
    	delay: 0.06,
    	ease: Power3.easeInOut
    });
  }, 0.3)
  .eventCallback('onComplete', () => { main.remove(); }, null );


btnStart.on('click', () => {
  mainAnim.play();
});
