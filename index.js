import calc from './logic.js';

const state = {
  prev: null,
  next: null,
  sign: null,
  pDec: false,
  nDec: false,
  result: 0,
};

const setState = (newstate) => {
  Object.assign(state, newstate);
};

const addNumber = (num) => {
  if (typeof state.result != 'number') setState({ result: 0 });
  if (state.sign) {
    state.next != null
      ? setState({ next: `${state.next}${num}` })
      : setState({ next: num });
  } else {
    state.prev != null
      ? setState({ prev: `${state.prev}${num}` })
      : setState({ prev: num });
  }
  display();
  console.log(state);
};

const addDecimal = () => {
  if (state.sign) {
    state.next != null
      ? !state.nDec && setState({ next: `${state.next}.`, nDec: true })
      : !state.nDec && setState({ next: '0.', nDec: true });
  } else {
    state.prev != null
      ? !state.pDec && setState({ prev: `${state.prev}.`, pDec: true })
      : !state.pDec && setState({ prev: '0.', pDec: true });
  }
  display();
  console.log(state);
};

const addSign = (sign) => {
  if (state.prev == null && state.result !== 0) {
    if (typeof(state.result) != 'number') return;
    const res = state.result;
    setState({
      prev: res,
      sign,
      pDec: res % Math.floor(res) !== 0,
    });
  }
  if (state.sign) {
    if (state.next) {
      const res = calc(state.prev, state.sign, state.next);
      setState({
        prev: typeof res == 'number' ? res : null,
        next: null,
        sign: typeof res == 'number' ? sign : null,
        pDec: res % Math.floor(res) !== 0,
        nDec: false,
        result: res,
      });
    } else setState({ sign });
  } else {
    state.prev ? setState({ sign }) : null;
  }
  display();
  console.log(state);
};

const numbers = document.querySelectorAll('.num'); // nums from 0 to 9
const decimal = document.querySelector('.dec');
const signs = document.querySelectorAll('.sign');
const equal = document.querySelector('.eql');
const clear = document.querySelector('.clear');
const del = document.querySelector('.del');
const np = document.querySelector('.np'); // for the negative/positive button
const operation = document.querySelector('.operation'); // for the calc display
const result = document.querySelector('.result');
result.textContent = state.result;

const display = () => {
  const { prev, next, sign } = state;
  const first = prev != null ? `${prev}` : '';
  const sec = next != null ? `${next}` : '';
  const op = sign ? `${sign}` : '';
  operation.innerHTML = `${first}${op}${sec}`;
  result.textContent = state.result;
};

numbers.forEach((num) => {
  num.addEventListener('click', () => addNumber(num.innerHTML));
});

decimal.addEventListener('click', () => addDecimal());

signs.forEach((sign) => {
  sign.addEventListener('click', () => addSign(sign.innerHTML));
});

equal.addEventListener('click', () => {
  const res = calc(state.prev, state.sign, state.next);
  setState({
    prev: null,
    next: null,
    sign: null,
    pDec: false,
    nDec: false,
    result: res,
  });
  display();
});

clear.addEventListener('click', () => {
  setState({
    prev: null,
    next: null,
    sign: null,
    pDec: false,
    nDec: false,
    result: 0,
  });
  display();
});
