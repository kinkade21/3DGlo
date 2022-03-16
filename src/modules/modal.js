import {
    animate,
} from "./helpers";

const getScrollbarSize = () => { // получение ширины скролла
    let outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    let inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    let widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

const hasScrollbar = () => { // проверка на боковой скролл
    return document.body.scrollHeight > document.body.clientHeight;
}
const showScroll = () => {
    const body = document.body;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    body.style.position = '';
    body.style.width = '';
    body.style.top = '';
    window.scrollTo(0, scrollTop);
}


const hideScroll = () => {
    const body = document.body;
    body.classList.add('no-scroll');

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop; // запоминаем текущую прокрутку сверху
    body.style.position = 'fixed';
    if (hasScrollbar()) {
    // с учетом горизонтального скролла. Чтобы небыло рывка при открытии модального окна
        body.style.width = `calc(100% - ${getScrollbarSize()}px)`;
    } else {
        body.style.width = '100%';
    }
    body.style.top = -scrollTop + 'px';
}

const modal = () => {
    const btnScroll = document.getElementById('btn-scroll')
    const modal = document.querySelector('.popup');
    const modalContent = modal.querySelector(".popup-content");
    const buttons = document.querySelectorAll('.popup-btn');
    let startPosition = -50; // начальное положение модального-окна
    let stopPosition = 10;


    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
            hideScroll();
            modal.style.color = 'white'
            if (window.outerWidth > 768) {
                animate({
                    duration: 400,
                    timing: (timeFraction) => timeFraction,
                    draw(progress) {
                        modalContent.style.top = startPosition + Math.round((stopPosition - startPosition) * progress)
                    },
                });
            }
        })
    })

    modal.addEventListener('click', (e) => {
      showScroll();
        if (!e.target.closest('.popup-content') || e.target.classList.contains('popup-close')) {
            modal.style.display = 'none';
            document.body.style.overflow = '' // отмена прокрутки
        }
    })
}

export default modal;