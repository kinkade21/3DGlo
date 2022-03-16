const sendForm = ({
    formId,
    someElem = []
}) => {
    const form = document.getElementById(formId)
    const statusBlock = document.createElement('div')
    const modal = document.querySelector('.popup')

    const loadText = 'Загрузка...'
    const errorText = 'Ошибка...'
    const successText = 'Спасибо наш менеджер с вами свяжется'

    const validate = (list) => {
        let success = true
        list.forEach(input => {
            if (input.name == 'user_name' && input.value.length < 2) {
                success = false
            }
            if (input.name == 'user_email' && input.value.length < 5) {
                success = false
            }
            if (input.name == 'user_phone' && input.value.length < 10) {
                success = false
            }
        })
        return success
    }

    const sendData = async (data) => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    }

    const submitForm = () => {
        const formElements = form.querySelectorAll('input')
        const formData = new FormData(form)
        const formBody = {}

        statusBlock.textContent = loadText
        form.append(statusBlock)

        formData.forEach((val, key) => [
            formBody[key] = val
        ])

        someElem.forEach(elem => {
            const element = document.getElementById(elem.id)
            if (elem.type === 'block') {
                formBody[elem.id] = element.textContent
            } else if (elem.type === 'input') {
                formBody[elem.id] = element.value
            }
        })

        if (validate(formElements)) {
            sendData(formBody)
                .then(data => {
                    statusBlock.textContent = successText
                    formElements.forEach(input => {
                        input.value = ''
                    })
                })
                .catch(error => {
                    statusBlock.textContent = errorText
                })
                .finally(() => {
                    setTimeout(() => statusBlock.textContent = '', 2000);
                    setTimeout(() => {
                        modal.style.display = 'none'
                        document.body.style.overflow = ''
                    }, 4000);
                })
        } else {
            statusBlock.textContent = 'Данные не валидны!!!'
        }
    }

    try {
        if (!form) {
            throw new Error('Верните форму на место')
        }
        form.addEventListener('submit', (event) => {
            event.preventDefault()
            submitForm()
        })
    } catch (error) {
        console.log(error.message)
    }

}

export default sendForm