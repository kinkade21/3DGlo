"use strict";

const timer = (deadline) => {
    const timerHours = document.getElementById("timer-hours");
    const timerMinutes = document.getElementById("timer-minutes");
    const timerSeconds = document.getElementById("timer-seconds");

    // обновление времени
    const getTimeRemaining = () => {
        let dateStop = new Date(deadline).getTime();
        let dateNow = new Date().getTime();
        // количество секунд до дейдлайна мСек/ 1000
        let timeRemaining = Math.max((dateStop - dateNow) / 1000, 0);
        let hours = Math.floor(timeRemaining / 60 / 60);
        let minutes = Math.floor((timeRemaining / 60) % 60);
        let seconds = Math.floor(timeRemaining % 60);

        return { timeRemaining, hours, minutes, seconds };
    };

    // обновление времени
    const updateClock = setInterval(() => {
        let getTime = getTimeRemaining();

        timerHours.textContent = (getTime.hours < 10) ? '0' + getTime.hours : getTime.hours;
        timerMinutes.textContent = ('0' + getTime.minutes).slice(-2);
        timerSeconds.textContent = ('0' + getTime.seconds).slice(-2);

        if (!getTime.timeRemaining) {
            clearInterval(updateClock);
        }
    }, 1000);


};
export default timer;