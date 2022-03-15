// Задание 6
"use strict";

const elTimepiece = document.querySelector('.timepiece');
const txtFormat = elTimepiece.querySelector('p');

// чтение текущего времени для урока
const getDateLesson = () => {
  const currentDate = new Date();
  const timeLocale = (currentDate).toLocaleTimeString('en').replaceAll(':', ' ').split(' ');
  const [hours, minutes, seconds, timeDay] = timeLocale;
  const dayWeek = (currentDate.getDay()) ? currentDate.getDay() - 1 : 6;

  const tampCurrent = currentDate.getTime();
  const tampNewYear = (new Date('1 january' + (currentDate.getFullYear() + 1))).getTime();
  const dayNewYear = Math.floor((tampNewYear - tampCurrent) / 1000 / 60 / 60 / 24);

  return { hours: +hours, minutes: +minutes, seconds: +seconds, timeDay, dayWeek, dayNewYear };
};

// форматирование времени
const formatDateLesson = (date) => {

  // приветствие
  const salutation = ((hours, timeDay) => {
    return (hours >= 0 && hours < 3 && timeDay === 'AM') ? 'Доброй ночи' :
      (hours >= 3 && timeDay === 'AM') ? 'Доброе утро' :
        (hours >= 0 && hours < 6 && timeDay === 'PM') ? 'Добрый день' :
          'Добрый вечер';
  })(date.hours, date.timeDay);

  // день недели
  const nameDayWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг',
    'Пятница', 'Суббота', 'Воскресенье'][date.dayWeek];

  // текущее время
  const enTime = ('0' + date.hours).slice(-2) + ':' +
    ('0' + date.minutes).slice(-2) + ':' +
    ('0' + date.seconds).slice(-2) + ' ' +
    date.timeDay;

  // формирование окончаний слов по числу
  const ending = (num, aEnding) => {
    const lastNum = +(num + '').slice(-1);

    return aEnding[
      (lastNum === 1 && num !== 11) ? 0 :
        (lastNum > 1 && lastNum < 5 && ![12, 13, 14].includes(num)) ? 1 : 2
    ];
  };

  // дней до Нового года
  const dayNewYear = date.dayNewYear + ' ' + ending(date.dayNewYear, ['день', 'дня', 'дней']);

  return { salutation, nameDayWeek, enTime, dayNewYear };
};

// обновление даты урока
const updateDateLesson = setInterval(() => {
  let formatDate = formatDateLesson(getDateLesson());

  txtFormat.innerHTML = `${formatDate.salutation}!<br />
    Сегодня ${formatDate.nameDayWeek}</br>    
    Текущее время: ${formatDate.enTime}</br>
    До нового года осталось ${formatDate.dayNewYear}`;
}, 1000);