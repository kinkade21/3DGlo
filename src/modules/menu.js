
"use strict";

const menu = () => {

    // кнопка меню
    const menuBtn = document.querySelector('.menu');
    // блок меню
    const menu = document.querySelector('menu');
    // кнопка закрытия блока меню
    const closeBtn = menu.querySelector('.close-btn');
    // список <a> пунктов меню
    const menuItems = menu.querySelectorAll('ul>li>a');
    // кнопка перехода на следующий блок
    const nextBtn = document.querySelector('main a');

    // открытие/закрытие меню
    const handleMenu = () => {
        menu.classList.toggle('active-menu');
    };

    // плавный скролл по a.href  (пока, согласно задания, только ВНИЗ !!!)
    // любой проход за 1 сек (1000мс)
    // для большинства экранов частота обновления 60 Гц–:  1000ms / 60 = за 16.7 кадров
    const smoothScroll = (event) => {
        // ссылка на элемент перехода
        const transitionElement = document.querySelector(event.currentTarget.hash);

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

    // открытие/закрытие меню по кнопке меню
    menuBtn.addEventListener('click', handleMenu);
    // закрытие окна меню по кнопке закрытия 
    closeBtn.addEventListener('click', handleMenu);
    // закрытие окна по нажатию на пункт меню
    menuItems.forEach(menuItem => menuItem.addEventListener('click', handleMenu));
    // плавный скролл по нажатию на пункт меню
    menuItems.forEach(menuItem => menuItem.addEventListener('click', smoothScroll));
    // кнопка перехода на следующий блок
    nextBtn.addEventListener('click', smoothScroll);

}; // END menu()
export default menu;