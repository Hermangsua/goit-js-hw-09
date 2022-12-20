import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const chooseDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector(`button[data-start]`);
const daysText = document.querySelector(`span[data-days]`);
const hoursText = document.querySelector(`span[data-hours]`);
const minutesText = document.querySelector(`span[data-minutes]`);
const secondsText = document.querySelector(`span[data-seconds]`);
const divTimer = document.querySelector(`.timer`);
const divField = document.querySelectorAll(`.field`);
// console.log(divField[0]);
// styles
for (const field of divField) {
  field.style.background = 'white';
  field.style.padding = '40px';
  field.style.border = 'tomato solid 1px';
}
chooseDate.style.padding = '10px';
chooseDate.style.textAlign = 'center';
document.body.style.background = '#887874';
divTimer.style.fontSize = '24px';
divTimer.style.textAlign = 'center';
divTimer.style.display = 'flex';
btnStart.style.padding = '10px';
btnStart.style.marginBottom = '30px';
// styles
btnStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      window.alert('Please choose a date in the future');
      document.body.style.background = '#EF4D25';
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      document.body.style.background = '#887874';
    }
    // console.log(selectedDates[0]);
  },
};
flatpickr(chooseDate, options);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

btnStart.addEventListener('click', evnt => {
  btnStart.disabled = true;
  const timerId = setInterval(() => {
    const countDownTimer = new Date(chooseDate.value) - new Date();
    // console.log(countDownTimer);
    if (countDownTimer >= 0) {
      let timeDiffObject = convertMs(countDownTimer);
      // console.log(timeDiffObject);
      daysText.textContent = addLeadingZero(timeDiffObject.days);
      hoursText.textContent = addLeadingZero(timeDiffObject.hours);
      minutesText.textContent = addLeadingZero(timeDiffObject.minutes);
      secondsText.textContent = addLeadingZero(timeDiffObject.seconds);
    } else {
      clearTimeout(timerId);
    }
  }, 1000);
});
