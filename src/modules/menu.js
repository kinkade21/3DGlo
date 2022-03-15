"use strict";
import { animate } from './helpers';

const menu = () => {

    // панель заголовка
    const header = document.querySelector('.main-header');

    // блок меню
    const menu = document.querySelector('menu');
    // кнопка меню
    const menuPush = document.querySelector('main header .menu');
    const posStartFloatingMenu = document.querySelector('body .container')
        .getBoundingClientRect().bottom + window.scrollY;

    // плавный скролл по a.href   
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

    // изменение положения плавающего меню
    const reFloatingMenu = () => {
        if (window.scrollY > posStartFloatingMenu) {
            menuPush.style.position = 'fixed';
            menuPush.style.top = '10px';
            menuPush.style.right = Math.max(10, window.innerWidth - header.offsetLeft - header.offsetWidth - 90) + 'px';
            menuPush.style.zIndex = '1';
            menuPush.style.opacity = '0.5';
            menuPush.style.backgroundColor = 'var(--dark)';
            menuPush.style.maxWidth = Math.round(80 / window.devicePixelRatio) + 'px';
        } else if (menuPush.style) { menuPush.style = ""; }
    };

    document.querySelector('body').addEventListener('click', (e) => {
        let itemMenu = null, nextBlock;

        if (e.target.closest('.menu') ||                  // по кнопке открытия меню
            e.target.classList.contains('close-btn') ||     // или кнопке закрытия блока меню       
            (itemMenu = e.target.closest('menu ul>li>a')) ||    // по нажатию на пункт меню
            (!e.target.closest('.active-menu') &&           // по нажатии мимо окошка или крестик
                menu.classList.contains('active-menu'))) {
            e.preventDefault();

            // открытие/закрытие меню 
            menu.classList.toggle('active-menu');

        } else if ((nextBlock = e.target.closest('main a'))) {

            // переход на следующий блок
            smoothScroll(e, nextBlock.getAttribute("href"));
        }

        // плавный скролл по нажатию на пункт меню        
        if (itemMenu) { smoothScroll(e, itemMenu.getAttribute("href")); }
    });


    // плавающая кнопка меню
    window.addEventListener('scroll', (e) => {
        reFloatingMenu();
    });
    window.addEventListener('resize', (e) => {
        reFloatingMenu();
    });

}; 
export default menu;