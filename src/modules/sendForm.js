"use strict";

const sendForm = (pathServer, optionals = {}) => {
    // все формы страницы
    const forms = document.querySelectorAll('form');
    // прелодер
    const preloader = document.querySelector('.preloader');

    // правила валидности данных
    const validDate = {
        // именные проверки
        "user_name": /..+/g,
        "user_email": /.+/,
        // [+] значащих цифр 11-14 (международный)   
        "user_phone": /(^\+\d|^\d)(([\d\-]+[\(]\d+[\)][\d\-]+$)|([\d\-]+$))/,
        "user_message": /.+/,

        // дополнительные
        noNumber: /[^\d]+/g,
    };

    // тексты сообщений этапов процесса отправки
    const statusText = {
        error: 'Технический сбой. Заявка&nbsp;не&nbsp;отправлена',
        success: 'Спасибо! Наш менеджер с Вами свяжется',
        invalid: `Ошибочные данные. Заявка&nbsp;не&nbsp;отправлена.`
    };

    // валидация данных форм 
    const validate = (inputs) => {
        let success = true;

        // именные проверки для элемнтов, значения которых отправляются
        inputs.forEach(input => {
            let inputSuccess = true;

            if (input.name) {
                if (input.name in validDate) {
                    validDate[input.name].lastIndex = 0;

                    if (!validDate[input.name].test(input.value)) {
                        inputSuccess = false;

                    } else if (input.name === 'user_phone') {
                        // контроль количества цифр
                        const count = input.value.replace(validDate.noNumber, (s) => "").length;
                        if (count < 11 || count > 14) { inputSuccess = false; }
                    }
                }
                if (!inputSuccess) { success = false; }
                input.style.boxShadow = inputSuccess ? '' : 'inset 0 0 0.5em 0.3em rgba(255,0,0,1)';
            }
        });

        // взаимозависимые проверки между элементами не предусмотрены
        return success;
    };

    // отправка формы
    const sendData = (data) => {
        return fetch(pathServer, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "multipart/json"
            }
        }).then(res => res.json());
    };

    // обработка запроса на отправку формы
    const submitForm = ({ form, optional = [] }) => {
        // блок вывода сообщений статуса отправки        
        const statusBlock = form.querySelector('.status-block');
        // node list элементов input формы   
        const inputs = form.querySelectorAll('input');

        // все элементы формы, имеющие атрибут name
        const formData = new FormData(form);
        const formBody = {};

        if (validate(inputs)) {

            // индикатор "отправки"            
            preloader.classList.add('working');
            statusBlock.innerHTML = '';

            formData.forEach((val, key) => {
                formBody[key] = val;
            });

            // дополнительные данные к форме отправки
            optional.forEach(leading => {
                let elem;

                if ('name' in leading && 'assign' in leading) {
                    if ('select' in leading) {
                        if ((elem = document.querySelector(leading.select))) {
                            formBody[leading.name] = leading.assign in elem ? elem[leading.assign] : leading.assign;
                        }
                    } else {
                        formBody[leading.name] = leading.assign;
                    }
                }
            });

            sendData(formBody)
                .then(data => {
                    // очистка данных формы после отправки
                    inputs.forEach(input => {
                        input.value = '';
                        input.style.boxShadow = '';
                    });
                    window.setTimeout(() => {
                        preloader.classList.remove('working');
                        // индикатор "отправлено"                    
                        statusBlock.innerHTML = statusText.success;
                    }, 500);
                })
                .catch(error => {
                    window.setTimeout(() => {
                        preloader.classList.remove('working');
                        // индикатор "не отправлено"
                        statusBlock.innerHTML = statusText.error;
                    }, 500);
                });
        } else {
            // индикатор "ошибочные данные"
            statusBlock.innerHTML = statusText.invalid;
        }
    };


    forms.forEach(form => {

        // добавляем к формам текстовый индикатор процесса отправки
        const statusBlock = document.createElement('div');
        statusBlock.classList.add('status-block');
        statusBlock.style.color = 'white';
        form.append(statusBlock);

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const queryForm = { form: e.currentTarget };
            if (e.target.id in optionals) { queryForm.optional = optionals[e.target.id]; }

            // запрос на отправку формы
            submitForm(queryForm);
        });
    });
}; 
export default sendForm;