"use strict";
import { animate } from './helpers';

const modal = () => {

    // модальное окно заявки с экранированием
    const modal = document.querySelector('.popup');
    // контекст модального окна
    const popupContent = modal.querySelector('.popup-content');
    // кнопки подать заяку
    const buttons = document.querySelectorAll('.popup-btn');


    // анимация контекста модального окна    
    const animationPopupContent = () => {

        animate({
            timingplane: 'aseOutExpo',     // на основе кривой Безье       
            draw(progress) {               // отрисовка  
                popupContent.style.opacity = `${progress}`;
                popupContent.style.left = `${100 - progress * 50}%`;
                popupContent.style.transform = `translateX( ${-20 * progress}rem )`;
            }
        });

        // восстанавливаем стили верстки                    
        popupContent.style.opacity = '';
    };

    // открытие заявки (модальное окно)
    buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            modal.style.display = 'block';
            // анимация контекста модального окна при ширине экрана больше или равна 768                        
            if (window.innerWidth > 767) { animationPopupContent(); }
        });
    });

    modal.addEventListener('click', (e) => {
        // закрытие заявки (модальное окно)
        // при нажатии мимо окошка или крестик
        if (!e.target.closest('.popup-content') ||
            e.target.classList.contains('popup-close')) {
            modal.style.display = 'none';
        }
    });

};  
export default modal;