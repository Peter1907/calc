import './style.css';
import calc from './logic.js';

const state = {
  prev: null,
  next: null,
  operator: null,
  pDec: false, // first num has a decimal point
  nDec: false, // second num
  result: 0,
};

const setState = (newstate) => {
  Object.assign(state, newstate);
};

const addNumber = (num) => {
  if (typeof state.result != 'number') setState({ result: 0 });
  if (state.operator) {
    state.next != null
      ? setState({ next: `${state.next}${num}` })
      : setState({ next: num });
  } else {
    state.prev != null
      ? setState({ prev: `${state.prev}${num}` })
      : setState({ prev: num });
  }
  display();
};

const addDecimal = () => {
  if (state.operator) {
    state.next != null
      ? !state.nDec && setState({ next: `${state.next}.`, nDec: true })
      : !state.nDec && setState({ next: '0.', nDec: true });
  } else {
    state.prev != null
      ? !state.pDec && setState({ prev: `${state.prev}.`, pDec: true })
      : !state.pDec && setState({ prev: '0.', pDec: true });
  }
  display();
};

const addOperator = (operator) => {
  if (state.prev == null && state.result !== 0) {
    if (typeof state.result != 'number') return;
    const res = state.result;
    setState({
      prev: res.toString(),
      operator,
      pDec: res % Math.floor(res) !== 0,
    });
  }
  if (state.operator) {
    if (state.next) {
      const res = calc(state.prev, state.operator, state.next);
      setState({
        prev: typeof res == 'number' ? res.toString() : null,
        next: null,
        operator: typeof res == 'number' ? operator : null,
        pDec: res % Math.floor(res) !== 0,
        nDec: false,
        result: res,
      });
    } else setState({ operator });
  } else {
    state.prev ? setState({ operator }) : null;
  }
  display();
};

const changeSign = () => {
  if (state.operator) {
    if (state.next != null) {
      setState({ next: (parseFloat(state.next) / -1).toString() });
    }
  } else {
    if (state.prev != null) {
      setState({ prev: (parseFloat(state.prev) / -1).toString() });
    }
  }
  display();
};

const handleDelete = () => {
  const { prev, next, operator } = state;
  if (operator) {
    if (next != null) {
      const newNum = next.slice(0, -1);
      next.length === 1
        ? setState({ next: null })
        : setState({
            next: newNum,
            nDec: newNum.includes('.') ? true : false,
          });
    } else setState({ operator: null });
  } else {
    if (prev != null) {
      const newNum = prev.slice(0, -1);
      prev.length === 1
        ? setState({ prev: null })
        : setState({
            prev: newNum,
            pDec: newNum.includes('.') ? true : false,
          });
    }
  }
  display();
};

const numbers = document.querySelectorAll('.num'); // nums from 0 to 9
const decimal = document.querySelector('.dec');
const operators = document.querySelectorAll('.op');
const equal = document.querySelector('.eql');
const clear = document.querySelector('.clear');
const del = document.querySelector('.del');
const sign = document.querySelector('.sign'); // for the negative/positive button
const operation = document.querySelector('.operation'); // for the calc display
const result = document.querySelector('.result');
result.textContent = state.result;

const display = () => {
  const { prev, next, operator } = state;
  const first = prev != null ? `${prev}` : '';
  const sec = next != null ? `${next}` : '';
  const op = operator ? `${operator}` : '';
  operation.innerHTML = `${first}${op}${sec}`;
  result.textContent = state.result;
};

numbers.forEach((num) => {
  num.addEventListener('click', () => addNumber(num.innerHTML));
});

decimal.addEventListener('click', addDecimal);

operators.forEach((operator) => {
  operator.addEventListener('click', () => addOperator(operator.innerHTML));
});

sign.addEventListener('click', changeSign);

del.addEventListener('click', handleDelete);

equal.addEventListener('click', () => {
  const res = calc(state.prev, state.operator, state.next);
  setState({
    prev: null,
    next: null,
    operator: null,
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
    operator: null,
    pDec: false,
    nDec: false,
    result: 0,
  });
  display();
});
