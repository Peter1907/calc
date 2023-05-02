export default function calc(prev, sign, next) {
  [prev, next] = [parseFloat(prev), parseFloat(next)];
  switch (sign) {
    case '+':
      return prev + next;
    case '-':
      return prev - next;
    case '*':
      return prev * next;
    case '/':
      return next === 0 ? 'MATH ERROR' : prev / next;
    default:
      return;
  }
};
