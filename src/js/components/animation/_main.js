import { STAGGER } from '../helpers/_stagger';
import { WIN, ANIMATE } from '../../constants';
import { GET_RANDOM } from '../../utils';
const btnStart = $('.js-start-main-animation');

const main = $('[data-anim-main]');
const mainFadeOut = $('[data-anim-main-fade-out]');

const mainContainer = $('[data-anim-main-container]');
const mainFadeIn = $('[data-anim-main-fade-in]');

const containerScale = $('[data-anim-scale]');
const cardsTl = new TimelineMax();

const randomDelay = GET_RANDOM(1,5);

const showCards = () => {
  containerScale.each((i,el) => {
    cardsTl.to(el, 0.4, {
      opacity: 1,
      scale: 1,
    	ease: Power3.easeInOu
    }, GET_RANDOM(1,5));
  });
};

window.mainAnim = new TimelineMax({ paused: true })
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
  .add(() => {
  	new TimelineMax().staggerTo(containerScale, 0.33, {
  	  opacity: 1,
  	  scale: 1,
  	  ease: Elastic.easeOut.config(1, 0.92)
  	}, 0.14);
  }, 0.4)
  .eventCallback('onComplete', () => { main.remove(); }, null );


// btnStart.on('click', () => {
//   window.setGrid();
//   window.mainAnim.play();
// });
