"use strict";

const modal = () => {

    // модальное окно заявки с экранированием
    const modal = document.querySelector('.popup');
    // контекст модального окна
    const popupContent = modal.querySelector('.popup-content');
    // кнопки оставить заяку
    const buttons = document.querySelectorAll('.popup-btn');
    // кнопка закрытия модального окна
    const closeBtn = modal.querySelector('.popup-close');


    // анимация контекста модального окна    
    const animationPopupContent = () => {
        // максимальное количество анимаций
        const maxCountAnimation = Math.round(
            (100 - popupContent.getBoundingClientRect().left * 100 / window.innerWidth));
        // счетчик анимаций, максимальное количество анимаций
        let countAnimation = 0;

        (function animation() {
            if (countAnimation < maxCountAnimation) {
                requestAnimationFrame(animation);
                popupContent.style.transform = `translateX( 0px )`;
                popupContent.style.left = `${100 - countAnimation}%`;
                countAnimation++;
            } else {
                // восстанавливаем стили верстки            
                popupContent.style.left = '';
                popupContent.style.transform = ``;
            }
        })();
    };

    // открытие заявки (модальное окно)
    buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            modal.style.display = 'block';
            // анимация контекста модального окна при ширине экрана больше или равна 768                        
            if (window.innerWidth > 767) { animationPopupContent(); }
        });
    });

    // закрытие заявки (модальное окно)
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

};  

export default modal;