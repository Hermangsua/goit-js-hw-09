const btnStart = document.querySelector('button[data-start]');
// console.log(btnStart);
const btnStop = document.querySelector('button[data-stop]');
// console.log(btnStop);
btnStop.disabled = true;
timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// console.log(getRandomHexColor());
btnStart.addEventListener('click', event => {
  btnStart.disabled = true;
  btnStop.disabled = false;
  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
});
btnStop.addEventListener('click', event => {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearTimeout(timerId);
});
