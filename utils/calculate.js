const calculate = (a, b, operation) => {
  switch (operation) {
    case 1:
      return a + b;

    case 2:
      return a - b;

    case 3:
      return a * b;

    case 4:
      return a / b;

    default:
      return 0;
  }
};

module.exports = calculate;
