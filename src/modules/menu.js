"use strict";
import { animate } from './helpers';

const menu = () => {

    // блок меню
    const menu = document.querySelector('menu');

    // плавный скролл по a.href  (пока, согласно задания, только ВНИЗ !!!)    
    const smoothScroll = (e, href) => {
        e.preventDefault();

        // счетчик прокрученных строк и целевое кол-во строк к прокрутке всё за 1 сек
        const scrollY = window.scrollY;
        // необходимо докрутить до начала элемента перехода
        const transitionHeight = document.querySelector(href).getBoundingClientRect().top;

        animate({
            duration: 1000,
            timingplane: 'easeOutCubic',
            draw(progress) {
                // вертикальный скролл документа 
                window.scrollTo(0, scrollY + transitionHeight * progress);
            }
        });
    };

    document.querySelector('body').addEventListener('click', (e) => {
        let itemMenu = null, nextBlock;

        if (e.target.closest('.menu') ||                  // по кнопке открытия меню
            e.target.classList.contains('close-btn') ||     // или кнопке закрытия блока меню       
            (itemMenu = e.target.closest('menu ul>li>a')) ||    // по нажатию на пункт меню
            (!e.target.closest('.active-menu') &&           // по нажатии мимо окошка или крестик
                menu.classList.contains('active-menu'))) {

            // открытие/закрытие меню 
            menu.classList.toggle('active-menu');

        } else if ((nextBlock = e.target.closest('main a'))) {

            // переход на следующий блок
            smoothScroll(e, nextBlock.getAttribute("href"));
        }

        // плавный скролл по нажатию на пункт меню        
        if (itemMenu) { smoothScroll(e, itemMenu.getAttribute("href")); }
    });

}; 
export default menu;