const expression = "3 * 4 * 2";
const [left, right] = expression.split('*').map(Number);
const result = left * right;
console.log(result); // Outputs: 12