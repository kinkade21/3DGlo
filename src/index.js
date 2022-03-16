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
slider();



sendForm({
    formId: 'form1',
    someElem: [{
        type: 'block',
        id: 'total'
    }]
})
sendForm({
    formId: 'form2',
    someElem: [{
        type: 'block',
        id: 'total'
    }]
})
sendForm({
    formId: 'form3',
    someElem: [{
        type: 'block',
        id: 'total'
    }]
})