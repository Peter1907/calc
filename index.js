import calc from "./logic.js";

const state = {
  prev: 0,
  next: 0,
  sign: null,
  decimal: false,
  result: 0,
};

const setState = (newstate) => {
  Object.assign(state, newstate);
};

const addNumber = (num) => {
  if (state.sign) {
    state.next
      ? setState({ next: parseFloat(`${state.next}${num}`) })
      : setState({ next: num });
  } else {
    state.prev
      ? setState({ prev: parseFloat(`${state.prev}${num}`) })
      : setState({ prev: num });
  }
  display();
};

const addSign = (sign) => {
  if (state.sign) {
    if (state.next) {
      const res = calc(state.prev, state.sign, state.next);
      setState({
        prev: res,
        next: 0,
        sign: res > 0 ? sign : null,
        result: res,
      });
    } else setState({ sign });
  } else {
    state.prev ? setState({ sign }) : null;
  }
  display();
};

const numbers = document.querySelectorAll(".num"); // nums from 0 to 9
const signs = document.querySelectorAll(".sign");
const equal = document.querySelector(".eql");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const np = document.querySelector(".np"); // for the negative/positive button
const operation = document.querySelector(".operation"); // for the calc display
const result = document.querySelector(".result");
result.textContent = state.result;

const display = () => {
  const { prev, next, sign } = state;
  const first = prev ? `${prev}` : "";
  const sec = next ? `${next}` : "";
  const op = sign ? `${sign}` : "";
  operation.innerHTML = `${first}${op}${sec}`;
  result.textContent = state.result;
};

numbers.forEach((num) => {
  num.addEventListener("click", () => addNumber(parseInt(num.innerHTML)));
});

signs.forEach((sign) => {
  sign.addEventListener("click", () => addSign(sign.innerHTML));
});

equal.addEventListener('click', () => {
  const res = calc(state.prev, state.sign, state.next);
  setState({ prev: 0, next: 0, sign: null, result: res });
  display();
});

clear.addEventListener('click', () => {
  setState({
    prev: 0,
    next: 0,
    sign: null,
    decimal: false,
    result: 0,
  });
  display();
});
