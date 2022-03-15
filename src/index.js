// точка входа
import timer from './modules/timer';
import menu from './modules/menu';
import modal from './modules/modal';
import calc from './modules/calc';
import feedback from './modules/feedback';
import tabs from './modules/tabs';
import slider from './modules/slider';

timer("30 march 2022 01:15");
menu();
modal();
calc(100);
feedback();
tabs();
slider({
    slider: 'portfolio-content',
    slide: 'portfolio-item',
    slideActive: 'portfolio-item-active',
    button: 'portfolio-btn',
    buttonPrev: 'prev',
    buttonNext: 'next',
    switchList: 'portfolio-dots',
    switch: 'dot',
    switchActive: 'dot-active',
}, 2000);