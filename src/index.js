// точка входа
import timer from './modules/timer';
import menu from './modules/menu';
import modal from './modules/modal';
import calc from './modules/calc';
import feedback from './modules/feedback';
import tabs from './modules/tabs';
import slider from './modules/slider';
import sendForm from './modules/sendForm';

// таймер параметры: дата окончания акции
timer("31 march 2022 01:15");
menu();
modal();
// калькулятор параметры: стоимость одного квадратного метра
calc(100);
feedback();
tabs();

// слайдер параметры: css стили элементов, обязательный slider(<ul></ul>) slide(<li></li>)
slider();

// отправка формы параметры: сервер отправки, дополнительные данные к отправке
sendForm('https://jsonplaceholder.typicode.com/posts',
  {
    // акция
    form1: [{ name: "form", assign: "form1" },
    { name: "total", select: "#total", assign: "textContent" }
    ],
    // вопросы
    form2: [
      { name: "form", assign: "form2" },
      { name: "total", select: "#total", assign: "textContent" }
    ],
    // услуги
    form3: [
      { name: "form", assign: "form3" },
      { name: "service", select: ".service-header-tab.active", assign: "textContent" },
      { name: "total", select: "#total", assign: "textContent" }
    ]
  }
);