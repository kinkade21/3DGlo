"use strict";

const calc = () => {

    // валидация ввода: общая площадь, количество помещений, срок исполнения (в днях)
    // для ввоода только цифры
    document.querySelectorAll('input.calc-item').forEach((item) => {
        item.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D+/gi, "");
        });
    });

}; 
export default calc;