"use strict";

const feedback = () => {
    // все формы страницы
    const forms = document.querySelectorAll('form');

    // регулярные выражения валидности полей форм
    /*
        name    - кроме кириллицы и пробелов
        email   - кроме латиницы в любом регистре, цифр и спецсимволов:  [@-_.!~*']
        phone   - кроме цифр, знака “+”, круглых скобок и дефиса
        message - кроме кириллицы, пробелов, цифр и знаков препинания
    */
    const valid = {
        // именные проверки
        "user_name": /[^а-яё\s]+/gi,
        "user_email": /[^a-z\_\-\@\.\!\~\*\'\d]+/gi,
        "user_phone": /[^\d\-\+\(\)']+/gi,
        "user_message": /[^а-яё\s\d\.\,\;\:\-\?\!\)\(\"]+/gi,

        // кирилица
        rus: /[а-я]/gi,
        // пробелы или дефисы в начале и конце 
        trimSH: /(^[\s\-]+|^)(.*?)(?:([\s\-]+$)|$)/i,
        // повторяющиеся подряд пробелы|дефисы 
        multySH: /(\s{2,})|(\-{2,})/g,
        // слово с выделением первой буквы
        wordFirst: /((^|\s\-|\s|\-)[а-я])([а-я]*)/gi,
    };

    forms.forEach(form => {

        // контроль ввода только допустимых символов
        form.addEventListener('input', (e) => {
            if (e.target.matches('input') && e.target.name in valid) {
                e.target.value = e.target.value.replace(valid[e.target.name], "");
                e.target.style.boxShadow = '';
            }
        });

        // дополнительные действия при потере фокуса
        form.addEventListener('focusout', (e) => {
            if (e.target.matches('input')) {
                let name = e.target.name,
                    value = e.target.value;

                // индивидуальные 
                if (name === 'user_name') {
                    // замена первой буквы слова на большую остальные маленькие            
                    value = value.replace(valid.wordFirst,
                        (word, first, f1, other) => first.toUpperCase() + other.toLowerCase());
                } else if (name === 'user_email') {
                    // дополнительный контроль на русских диверасантов - удаление кирилицы
                    value = value.replace(valid.rus, (rus) => "");
                }

                // для всех полей форм обратной связи:
                // - удаление ведущих и завершающих пробелов и дефисов
                value = value.replace(valid.trimSH, (str, begin, sense) => `${sense}`);
                // - замена нескольких идущих подряд пробелов|дефисов на один пробел|дефис            
                value = value.replace(valid.multySH, (str, spaces, hyphens) =>
                    (spaces ? ' ' : '') + (hyphens ? '-' : ''));
                e.target.value = value;
            }
        });

    });
}; 

export default feedback;