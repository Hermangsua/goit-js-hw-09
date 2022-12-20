const delay = document.querySelector('input[name="delay"]');
const delayByStep = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');
const createBtn = document.querySelector('button[type="submit"]');
// console.log(amount);
// console.log(createBtn);
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
createBtn.addEventListener('click', e => {
  e.preventDefault();
  const startdelayInput = Number(delay.value);
  // console.log(startdelayInput);
  const stepDelayInput = Number(delayByStep.value);
  for (let index = 1; index <= amount.value; index++) {
    createPromise(
      index,
      startdelayInput + index * stepDelayInput - stepDelayInput
    )
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
