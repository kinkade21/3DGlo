const timer = (deadline) => {
    const timerHours = document.getElementById('timer-hours');
    const timerMinutes = document.getElementById('timer-minutes');
    const timerSeconds = document.getElementById('timer-seconds');

    const getTimeRemaining = () => {
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemainig = (dateStop - dateNow) / 1000,
            hours = Math.floor((timeRemainig / 60) / 60),
            minutes = Math.floor((timeRemainig / 60) % 60),
            seconds = Math.floor(timeRemainig % 60);

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        return {
            timeRemainig,
            hours,
            minutes,
            seconds
        };
    }

    const updateClock = () => {
        let getTime = getTimeRemaining();

        timerHours.textContent = getTime.hours;
        timerMinutes.textContent = getTime.minutes;
        timerSeconds.textContent = getTime.seconds;

        if (getTime.timeRemainig <= 0) {
            clearInterval(setInterval(updateClock, 1000));
            timerHours.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
        }
    }
    setInterval(updateClock, 1000)
    updateClock();
    console.log("g");
}

export default timer