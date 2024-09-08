displayOps = document.getElementById("display_ops");
displayAns = document.getElementById("display_ans");
document.addEventListener('keydown', handleKeyPress);
var nextOp = false;
var result = 0;
const minusPattern = /\d+-\d+$/; 
const doubleMinusPattern = /\d+--\d+$/;

var operation = "";

// Clear display values and operation string
function clearText() {
    displayOps.value = 0;
    displayAns.value = 0;
    operation = "";
}

function sqrt() {
    if (displayOps.value == 0 && displayAns.value == 0) { // Return if display values are both 0
        return;
    }
    else if (displayAns.value != 0) { // If operation has already been calculated and there is a value in display answer
        if (displayAns.value < 0) return;
        let displayVal = displayAns.value;
        let sqrtResult = Math.round(Math.sqrt(displayVal) * 1000) / 1000;
        displayAns.value = sqrtResult;
    }
    else { // Square root the last number in the operation 
        const lastNumberMatch = operation.match(/-?\d+(\.\d+)?$/);
        if (lastNumberMatch) {
            const lastNumber = lastNumberMatch[0];
            if (lastNumber < 0) { // If last number is a negative number or is being subtracted, return
                return;
            }
            else if (operation.match(/-?\d+(\.\d+)?$/)) { // If there is only a single number, square root
                const sqrtNumber = Math.round(Math.sqrt(lastNumber) * 1000) / 1000;
                operation = operation.replace(/-?\d+(\.\d+)?$/, sqrtNumber.toString());
            } 
        }
        displayOps.value = operation;
    }
}

function negate() {
    // If operation has already been calculated and there is a value in display answer
    if (displayAns.value !== '0' && displayAns.value !== '') { 
        const displayedValue = parseFloat(displayAns.value);
        const negatedValue = -displayedValue;

        displayAns.value = negatedValue;
        operation = negatedValue.toString();
        displayOps.value = operation;
        return;
    }

    // Find the last number in the operation string
    const lastNumberMatch = operation.match(/-?\d+(\.\d+)?$/);

    // If last number exists
    if (lastNumberMatch) {
        const lastNumber = lastNumberMatch[0];

        if (doubleMinusPattern.test(operation)) { // If the operation ends with --3, change it to -3
            operation = operation.replace(/--(\d+(\.\d+)?$)/, '-$1');
        } 
        else if (minusPattern.test(operation)) { // If the operation ends with -3, change it to --3
            operation = operation.replace(/-(\d+(\.\d+)?$)/, '--$1');
        } 
        else if (operation.match(/-?\d+(\.\d+)?$/)) { // If there is only a single number, negate it
            const negatedNumber = -parseFloat(lastNumber);
            operation = operation.replace(/-?\d+(\.\d+)?$/, negatedNumber.toString());
        } 
        displayOps.value = operation;
    }
}

function calculate(operation) {
    console.log("operation: " + operation)
    displayAns.value = 0;

    // Put numbers in array and operands in array
    //const numberRegex = /(?<!\d)-?\d+(\.\d+)?/g;
    const numberRegex = /(?<!\d)-?\d+(\.\d+)?([eE][+-]?\d+)?/g;
    const operandRegex = /(?<=\d)[\+\*\-\/]/g;

    const numbers = operation.match(numberRegex).map(num => parseFloat(num));
    let operands = operation.match(operandRegex) || [];

    const performOperation = (index, op) => {
        let result;
        if (op === '*') {
            result = numbers[index] * numbers[index + 1];
        } 
        else if (op === '/') {
            result = numbers[index] / numbers[index + 1];
        } 
        else if (op === '+') {
            result = numbers[index] + numbers[index + 1];
        } 
        else if (op === '-') {
            result = numbers[index] - numbers[index + 1];
        }
        // Round result to thousandths place 
        result = Math.round(result * 1000) / 1000;
        numbers.splice(index, 2, result);
        operands.splice(index, 1);
    };

    while (operands.length > 0) {
        let mult_i = operands.indexOf('*');
        let div_i = operands.indexOf('/');
        let add_i = operands.indexOf('+');
        let sub_i = operands.indexOf('-');

        if (mult_i !== -1 && (div_i === -1 || mult_i < div_i)) {
            performOperation(mult_i, '*');
        } 
        else if (div_i !== -1 && (mult_i === -1 || div_i < mult_i)) {
            performOperation(div_i, '/');
        } 
        else if (add_i !== -1 && (sub_i === -1 || add_i < sub_i)) {
            performOperation(add_i, '+');
        } 
        else if (sub_i !== -1 && (add_i === -1 || sub_i < add_i)) {
            performOperation(sub_i, '-');
        }
    }

    const result = numbers[0];
    console.log("numbers: " + numbers)
    console.log("numbers: " + numbers[0])
    console.log("result: " + result)
    console.log("result.length: " + result.toString().length)
    if (isNaN(result) || !isFinite(result)) { // Display "Error" if result is NaN or infinite
        clearText();
        displayAns.value = "Error";
    } 
    else if (result.toString().length <= 7) { // Display answer if resulting string size is <= 7
        displayAns.value = result;
        nextOp = true;
    } 
    else if (result.toString().length > 7) { // Display answer if resulting string size is > 7
        displayAns.value = Number.parseFloat(result).toExponential(2);
        nextOp = true;
    }
    else { 
        displayAns.value = "Error";
    }
}


function expr(input) { 
    // If operation and answer displayed after calculations, add and calculate the result to operation
    if (nextOp && displayOps.value != 0 && displayAns.value != 0) {
        operation = String(displayAns.value);
        nextOp = false;
    }

    const operators = ['+', '-', '*', '/', '='];
    const lastChar = operation.slice(-1);
    const secondLastChar = operation.slice(-2, -1);

    // If there is an operation before '.' then add a 0 before the '.'
    // If there is only a '.' in the operation, then add a 0 before the '.'
    if (input === '.' && (operators.includes(lastChar) || operation.length === 0)) operation += '0';

    // Prevent multiple '.'
    if (input === '.' && (lastChar === '.')) return;

    // If input is operator and lastChar is '.' then remove '.'
    if (operators.includes(input) && lastChar === '.') {
        operation = operation.substring(0, operation.length - 1);
    }

    // Prevent multiple decimal points in one number such as 2.35.6
    const lastNumber = operation.split(/[+\-*/]/).pop();
    if (input === '.' && lastNumber.includes('.')) return;

    if (input === '0' && (lastChar === '0') && !lastNumber.includes('.')) return;

    if (operators.includes(input)) { // Other operators case
        if (operators.includes(lastChar) || operation == '') return;
        if (operation.length < 15 || (input === '=' && operation.length < 16)) {
            operation += input;
        }
    } 
    else { // Number case
        if (operation.length < 15 || (input === '=' && operation.length < 16)) {
            operation += input;
        }
    }

    //if (operation.length > 15 && input != '=') return; // Allow additional input only for '='
    //else if (operation.length > 15) return;

    

    displayOps.value = operation;

    // Perform bounds checking and then calculation
    if (input === '=') {
        if (operation.endsWith("=")) {
                operation = operation.slice(0,-1)
        }
        calculate(operation);
    }
}

function handleKeyPress(event) {
    const key = event.key;

    // Handle number inputs
    if (!isNaN(key)) {
        expr(key);
    }

    // Handle operators
    if (key === '+' || key === '-' || key === '*' || key === '/') {
        expr(key);
    } 
    else if (key === 'Enter' || key === '=') {
        expr('=');
    } 
    else if (key === 'Escape') {
        clearText();
    } 
    else if (key === '.') {
        expr('.');
    }
    if (key === 'Enter') {
        event.preventDefault();
    }
}
