"use strict";

const menu = () => {

    // блок меню
    const menu = document.querySelector('menu');

    // плавный скролл по a.href  (пока, согласно задания, только ВНИЗ !!!)
    // любой проход за 1 сек (1000мс)
    // для большинства экранов частота обновления 60 Гц–:  1000ms / 60 = за 16.7 кадров
    const smoothScroll = (href) => {

        // ссылка на элемент перехода
        const transitionElement = document.querySelector(href);

        // счетчик прокрученных строк и целевое кол-во строк к прокрутке всё за 1 сек
        let scrollY = Math.round(window.scrollY);
        const scrollTarget = Math.round(transitionElement.getBoundingClientRect().top) + scrollY;
        // шаг скрола (количество px за одно обновление экрана)
        const stepScroll = Math.round((scrollTarget - scrollY) / 16.7);

        event.preventDefault();

        (function animation() {
            scrollY += stepScroll;
            if ((scrollY < scrollTarget) ||
                (scrollY - scrollTarget < stepScroll)) {
                requestAnimationFrame(animation);
                // вертикальный скролл документа 
                window.scrollTo(0, Math.min(scrollY, scrollTarget));
            }
        })();

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
            smoothScroll(nextBlock.getAttribute("href"));
        }

        // плавный скролл по нажатию на пункт меню
        if (itemMenu) { smoothScroll(itemMenu.getAttribute("href")); }
    });

}; 
export default menu;