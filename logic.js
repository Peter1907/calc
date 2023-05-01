export default function calc(prev, sign, next) {
  switch (sign) {
    case '+':
      return prev + next;
    case '-':
      return prev - next;
    case '*':
      return prev * next;
    case '/':
      return prev / next;
    default:
      return;
  }
};
