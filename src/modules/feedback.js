// формы обратной связи
"use strict";

const feedback = () => {

    const userNames = document.querySelectorAll('input[name="user_name"]');
    const userMessage = document.querySelector('input[name="user_message"]');
    const userPhone = document.querySelectorAll('input[name="user_phone"]');
    const userEmail = document.querySelectorAll('input[name="user_email"]');
    const userAll = document.querySelectorAll('form input');

    // валидация ввода: имя, номер телефона, email, сообщение
    // - type=text и placeholder="Ваше сообщение": кириллица в любом регистре, дефис и пробел
    // - type=email: латиница в любом регистре, цифры и спецсимволы:  [@-_.!~*']
    // - type=tel: цифры, круглые скобки и дефис    
    const invalid = {
        text: /[^а-я-\s]+/gi,
        email: /[^a-z\_\-\@\.\!\~\*\']+/gi,
        rus: /[а-я]/gi,
        phone: /[^\d\-()']+/gi,
        // пробелы или дефисы в начале и конце 
        trimSH: /(^[\s\-]+|^)(.*?)(?:([\s\-]+$)|$)/i,
        // повторяющиеся подряд пробелы|дефисы 
        multySH: /(\s{2,})|(\-{2,})/g,
        // слово с выделением первой буквы
        wordFirst: /((^|\s\-|\s|\-)[а-я])([а-я]*)/gi,
    };
    userNames.forEach((field) => {
        field.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(invalid.text, "");
        });
        // дополнительный контроль при потере фокуса 
        field.addEventListener('blur', (e) => {
            // замена первой буквы слова на большую остальные маленькие            
            e.target.value = e.target.value.replace(invalid.wordFirst,
                (word, first, f1, other) => first.toUpperCase() + other.toLowerCase());
        });
    });
    userMessage.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(invalid.text, "");
    });
    userPhone.forEach((field) => {
        field.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(invalid.phone, "");
        });
    });
    userEmail.forEach((field) => {
        field.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(invalid.email, "");
        });
        
        field.addEventListener('blur', (e) => {
            // удаление кирилицы
            e.target.value = e.target.value.replace(invalid.rus, (rus) => "");
        });
    });

    // контроль при потере фокуса для всех полей форм обратной связи
    userAll.forEach((field) => {
        field.addEventListener('blur', (e) => {
            let value = e.target.value;
            // удаление ведущих и завершающих пробелов и дефисов
            value = value.replace(invalid.trimSH, (str, begin, sense) => `${sense}`);
            // замена нескольких идущих подряд пробелов|дефисов на один пробел|дефис            
            value = value.replace(invalid.multySH, (str, spaces, hyphens) =>
                (spaces ? ' ' : '') + (hyphens ? '-' : ''));

            e.target.value = value;
        });
    });


}; 
export default feedback;