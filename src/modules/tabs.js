"use strict";

const tabs = () => {
    // панель меню
    const tabPanel = document.querySelector('.service-header');
    // пункты меню
    const tabs = document.querySelectorAll('.service-header-tab');
    // блок сервиса (два других заремарили)
    const tabContent = document.querySelectorAll('.service-tab');

    // активная вкладка сервиса "Наши услуги"
    const activeteServiceTab = (tabBtn) => {

        tabs.forEach((tab, index) => {

            if (tab === tabBtn) {
                tab.classList.add('active');
                tabContent[index].classList.remove('d-none');
            } else {
                tab.classList.remove('active');
                tabContent[index].classList.add('d-none');
            }
        });
    };

    tabPanel.addEventListener('click', (e) => {
        if (e.target.closest('.service-header-tab')) {
            activeteServiceTab(e.target.closest('.service-header-tab'));
        }

    });



}; 
export default tabs;