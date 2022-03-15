"use strict";

const slider = (init, timeInterval = 1500) => {

    // классы слайдера 
    // - должны быть уникальными 
    // - допустимые символы названия классов из набора [латинские буквы в нижнем регистре, -])
    const classSlider = {
        slide: 'slide-default',
        slideActive: 'slide-active-default',
        switch: 'switch-defult',
        switchActive: 'switch-active-default',

        get switchOrButton() { return `.${this.switch}` + (('button' in this) ? `, .${this.button}` : ``); }
    };

    let logError = '';
    for (let key in init) {
        classSlider[key] = init[key];
    }
    if (!('slider' in classSlider)) { logError += `init:slider не указан \n`; }
    if (logError) { return logError; }

    // основной блок слайдера
    const slider = document.querySelector(`.${classSlider.slider}`);
    if (!slider) {
        logError += `тег инициализации слайдера <ul class="${classSlider.slider}"></ul> не найден\n`;
    } else if (slider.nodeName !== 'UL') {
        logError += `тег <${slider.nodeName.toLowerCase()}>не приемлем для ` +
            `инициализации слайдера, используйте тег <ul>\n`;
    }
    if (logError) { return logError; }

    // слайды
    const slides = slider.querySelectorAll(`li`);
    if (!slides.length) {
        logError += `теги инициализации слайдов <li class="${classSlider.slide}"></li> не найдены\n`;
    } else {
        slides.forEach((slide) => {
            if (!slide.classList.contains(classSlider.slide)) {
                if (classSlider.slide === 'slide-default') {
                    slide.classList.add(classSlider.slide);
                    slide.style.opacity = '0';
                    slide.style.position = 'absolute';
                } else {
                    logError += `класс "${classSlider.slide}" не объявлен для слайда <li class="${slide.classList}">\n`;
                }
            }
        });
    }
    if (logError) { return logError; }

    // навигационные кнопки
    const buttonPrev = slider.querySelector(`.${classSlider.button}.${classSlider.buttonPrev}`);
    const buttonNext = slider.querySelector(`.${classSlider.button}.${classSlider.buttonNext}`);

    // скорость прокрутки
    timeInterval = timeInterval <= 0 ? 0 : timeInterval < 1000 ? 1000 : timeInterval;

    // счетчик слайдов
    let currentSlide = 0;
    let interval;

    // переключатели ( формируются автоматически согласно количества слайдов)
    const switches = (() => {
        const list = [];
        const templateSwitch = document.createElement('li');
        templateSwitch.classList.add(classSlider.switch);
        if (classSlider.switch === 'switch-defult') {
            templateSwitch.style.display = 'inline-block';
            templateSwitch.style.width = '2rem';
            templateSwitch.style.height = '2rem';
            templateSwitch.style.marginLeft = '1rem';
            templateSwitch.style.backgroundColor = 'white';
            templateSwitch.style.cursor = 'pointer';
            templateSwitch.style.borderRadius = '50%';
        }
        if (classSlider.switchActive === 'switch-active-default') {
            templateSwitch.style.outlineWidth = "0.3rem";
            templateSwitch.style.outlineStyle = "solid";
            templateSwitch.style.outlineColor = "white";
        }

        // список переключателей
        const switchList = document.createElement('ul');
        if ('switchList' in classSlider) {
            switchList.classList.add(classSlider.switchList);
        }

        for (let i = 0; i < slides.length; i++) {
            list.push(templateSwitch.cloneNode());
            switchList.append(list[i]);
        }
        list[0].classList.add(classSlider.switchActive);
        slider.append(switchList);

        return list;
    })();

    // удалить у элемента класс активный
    const prevSlide = (index) => {
        slides[index].classList.remove(classSlider.slideActive);
        if (classSlider.slideActive === 'slide-active-default') {
            slides[index].style.opacity = '0';
        }
        switches[index].classList.remove(classSlider.switchActive);
        if (classSlider.switchActive === 'switch-active-default') {
            switches[index].style.outlineColor = "white";
        }
    };
    // установить элементу класс активный
    const nextSlide = (index) => {
        slides[index].classList.add(classSlider.slideActive);
        if (classSlider.slideActive === 'slide-active-default') {
            slides[index].style.opacity = '1';
        }
        switches[index].classList.add(classSlider.switchActive);
        if (classSlider.switchActive === 'switch-active-default') {
            switches[index].style.outlineColor = "blue";
        }

    };

    // отображение состояния активности кнопок навигации
    const statusButtons = (disabledPrev, disabledNext) => {
        if (buttonPrev) {
            buttonPrev.style.filter = disabledPrev ? 'brightness(0.5)' : '';
        }
        if (buttonNext) {
            buttonNext.style.filter = disabledNext ? 'brightness(0.5)' : '';
        }
    };

    // автоматическое смена слайдов
    const autoSlide = () => {
        prevSlide(currentSlide);
        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        statusButtons(currentSlide === 0, currentSlide === (slides.length - 1));
        nextSlide(currentSlide);
    };

    // запуск анимации слайдов
    const startSlide = (timer) => {
        interval = setInterval(autoSlide, timer);
    };

    // остановка анимации слайдов
    const stopSlide = () => {
        clearInterval(interval);
    };

    // действия слайдера по клику мышки на его элементах
    slider.addEventListener('click', (e) => {
        if (!e.target.matches(classSlider.switchOrButton)) { return; }

        e.preventDefault();

        prevSlide(currentSlide);

        if (e.target.classList.contains(classSlider.buttonNext)) {
            currentSlide++;
        } else if (e.target.classList.contains(classSlider.buttonPrev)) {
            currentSlide--;
        } else if (e.target.classList.contains(classSlider.switch)) {
            switches.forEach((dot, index) => {
                if (e.target === dot) {
                    currentSlide = index;
                }
            });
        }
        currentSlide = Math.min(Math.max(currentSlide, 0), slides.length - 1);

        statusButtons(currentSlide === 0, currentSlide === (slides.length - 1));
        nextSlide(currentSlide);
    });

    // остановка слайдера при наведении мыши переключатели или кнопки навигации
    // (не всплывает)  
    slider.addEventListener('mouseenter', (e) => {
        if (!timeInterval) { return; }
        if (e.target.matches(classSlider.switchOrButton)) {
            stopSlide();
        }
    }, true); // true, в случае добавления дочерних элементов, отрабатывало и на них

    // запуск слайдера при покидании мыши переключателей или кнопок навигации
    // (не всплывает)  
    slider.addEventListener('mouseleave', (e) => {
        if (!timeInterval) { return; }
        if (e.target.matches(classSlider.switchOrButton)) {
            startSlide(timeInterval);
        }
    }, true); // true, в случае добавления дочерних элементов, отрабатывало и на них

    // первоначальный запуск слайдера
    if (timeInterval) {
        startSlide(timeInterval);
    }

    return null;
}; 
export default slider;