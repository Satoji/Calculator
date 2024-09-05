//handle negative numbers, handle division by 0,
//calculate first two numbers in input and return on screen

//8-14-24: handle negative regex now
console.log("hello")

displayOps = document.getElementById("display_ops")
displayAns = document.getElementById("display_ans")
var nextOp = false
var result = 0
const minusPattern = /\d+-\d+$/;  // For "7-2"
const doubleMinusPattern = /\d+--\d+$/; // For "7--2"

var operation = ""

function clearText() {
    console.log("testing")
    displayOps.value = 0
    displayAns.value = 0
    operation = ""
}

function sqrt() {
    console.log("operation: " + operation)
    //if (operation[operation.length-1] === '=') {
    if (displayOps.value == 0 && displayAns.value == 0) {
        return
    }
    else if (displayAns.value != 0) {
        if (displayAns.value < 0) return
        let displayVal = displayAns.value
        let sqrtResult = Math.round(Math.sqrt(displayVal) * 1000) / 1000
        displayAns.value = sqrtResult
    }
    else {
        const lastNumberMatch = operation.match(/-?\d+(\.\d+)?$/);
        console.log("lastNumberMatch: " + lastNumberMatch)
        if (lastNumberMatch) {
            const lastNumber = lastNumberMatch[0];
            console.log("lastNumber: " + lastNumber)
            if (lastNumber < 0) {
                return
            }
            else if (operation.match(/-?\d+(\.\d+)?$/)) {
                // If there is only a single number, negate it
                const sqrtNumber = Math.round(Math.sqrt(lastNumber) * 1000) / 1000;
                operation = operation.replace(/-?\d+(\.\d+)?$/, sqrtNumber.toString());
            } 
        }
        
        displayOps.value = operation;
    }

    /*
    if (minusPattern.test(operation)) {
        // If the operation ends with "-<number>", change it to "--<number>"
        var newNum = Math.sqrt(lastNumberMatch)
        operation = operation.replace(/-(\d+(\.\d+)?$)/, newNum);

    } 
    else if (operation.match(/-?\d+(\.\d+)?$/)) {
        // If there is only a single number, negate it
        const negatedNumber = -parseFloat(lastNumber);
        operation = operation.replace(/-?\d+(\.\d+)?$/, negatedNumber.toString());
    } 
    else {
        console.log("No relevant pattern found, negation not applied.");
    }

    if (operands.length === 0 && numbers.length === 1) {
        let sqrtAns = Math.sqrt(displayOps.value)
        displayAns.value = sqrtAns
    }
    if (displayAns.value >= 0) {
        let sqrtAns = Math.sqrt(displayAns.value)
        displayAns.value = sqrtAns
    }
    else {
        displayAns.value = "Error"
    }
        */
}

function negate() {

   if (displayAns.value !== '0' && displayAns.value !== '') {
        // Get the displayed answer value
        const displayedValue = parseFloat(displayAns.value);

        // Negate the displayed value
        const negatedValue = -displayedValue;

        // Update both displayAns and operation with the negated value
        displayAns.value = negatedValue;
        console.log("operation: " + operation)
        // Replace the operation with the negated number
        operation = negatedValue.toString();
        console.log("operation: " + operation)
        displayOps.value = operation;
        return;
    }

    // Regular expression to find the last number in the operation string
    const lastNumberMatch = operation.match(/-?\d+(\.\d+)?$/);

    // Check if the last number exists
    if (lastNumberMatch) {
        const lastNumber = lastNumberMatch[0];

        // Regular expression to check for patterns "number-<number>" and "number--<number>"

        if (doubleMinusPattern.test(operation)) {
            // If the operation ends with "--<number>", change it to "-<number>"
            operation = operation.replace(/--(\d+(\.\d+)?$)/, '-$1');
        } 
        else if (minusPattern.test(operation)) {
            // If the operation ends with "-<number>", change it to "--<number>"
            operation = operation.replace(/-(\d+(\.\d+)?$)/, '--$1');
        } 
        else if (operation.match(/-?\d+(\.\d+)?$/)) {
            // If there is only a single number, negate it
            const negatedNumber = -parseFloat(lastNumber);
            operation = operation.replace(/-?\d+(\.\d+)?$/, negatedNumber.toString());
        } 
        else {
            console.log("No relevant pattern found, negation not applied.");
        }

        // Update the display
        displayOps.value = operation;
    }
  
    
    //let lastNumber = operation.split(/[+\-*/]/).pop();
    /*
    let numSize = lastNumber.toString().length * -1
    console.log("lastNumber: " + lastNumber)
    console.log("numSize: " + numSize)
    if (!isNaN(lastNumber)) {
        console.log("hi")
        lastNumber = lastNumber * -1;
        operation = operation.slice(0, numSize)
        console.log("operation: " + operation)
        operation = operation + lastNumber.toString()
        displayOps.value = operation
    } 
    */
}

function calculate(operation) {
    displayAns.value = 0
    console.log(operation)

    //var numbers = operation.split(/[\+\-\*\/]/)
    //var operands = operation.match(/(?<=\d)([\+\-\*\/])(?=\d)/g);

    // Regular expression to match numbers and negative numbers (considering previous operator)
    const numberRegex = /(?<!\d)-?\d+(\.\d+)?/g;

    // Regular expression to match operators (considering digits before them)
    const operandRegex = /(?<=\d)[\+\*\-\/]/g;

    // Extract numbers
    const numbers = operation.match(numberRegex).map(num => parseFloat(num));

    // Extract operands
    const operands = operation.match(operandRegex) || [];

    console.log("numbers[]: " + numbers)
    console.log("operands[]: " + operands)
    while (operands.length > 0) {
        let mult_i = operands.indexOf('*')
        let div_i = operands.indexOf('/')
        let add_i = operands.indexOf('+')
        let sub_i = operands.indexOf('-')
        let newNum = 0
        if (mult_i !== -1 && (div_i === -1 || mult_i < div_i)) { //if "*" is found
            operands.splice(mult_i, 1);
            //newNum = Math.round(Number(numbers[mult_i]) * Number(numbers[mult_i+1]) * 1000) / 1000
            newNum = Math.round((Number(numbers[mult_i]) * Number(numbers[mult_i+1])) * 1000) / 1000
            console.log("multiplied: " + numbers[mult_i] + " and " + numbers[mult_i+1] + " results in " + newNum)
            numbers.splice(mult_i,1);
            numbers.splice(mult_i,1);
            numbers.splice(mult_i, 0, newNum)
            console.log("numbers[]: " + numbers)
            console.log("operands[]: " + operands)
        }
        else if (div_i !== -1 && (mult_i === -1 || div_i < mult_i)) { //if "/" is found
            operands.splice(div_i, 1);
            //newNum = Math.round(Number(numbers[div_i]) / Number(numbers[div_i+1]) * 1000) / 1000
            newNum = Math.round((Number(numbers[div_i]) / Number(numbers[div_i+1])) * 1000) / 1000
            console.log("divided: " + numbers[div_i] + " and " + numbers[div_i+1] + " results in " + newNum)
            numbers.splice(div_i,1);
            numbers.splice(div_i,1);
            numbers.splice(div_i, 0, newNum)
            console.log("numbers[]: " + numbers)
            console.log("operands[]: " + operands)
        }
        else if (add_i !== -1 && (sub_i === -1 || add_i < sub_i)) { //if "+" is found
            operands.splice(add_i, 1);
            newNum = Math.round((Number(numbers[add_i]) + Number(numbers[add_i+1])) * 1000) / 1000
            console.log("added: " + numbers[add_i] + " and " + numbers[add_i+1] + " results in " + newNum)
            numbers.splice(add_i,1);
            numbers.splice(add_i,1);
            numbers.splice(add_i, 0, newNum)
            console.log("numbers[]: " + numbers)
            console.log("operands[]: " + operands)
        }
        else if (sub_i !== -1 && (add_i === -1 || sub_i < add_i)) { //if "-" is found
            operands.splice(sub_i, 1);
            console.log("TESTTTINGNGGNNGNGN")
            console.log("numbers[sub_i]: " + numbers[sub_i])
            //newNum = Math.round(Number(numbers[sub_i]) - Number(numbers[sub_i+1]) * 1000) / 1000
            newNum = Math.round((Number(numbers[sub_i]) - Number(numbers[sub_i+1])) * 1000) / 1000
            console.log("subtracted: " + numbers[sub_i] + " and " + numbers[sub_i+1] + " results in " + newNum)
            numbers.splice(sub_i,1);
            numbers.splice(sub_i,1);
            numbers.splice(sub_i, 0, newNum)
            console.log("numbers[]: " + numbers)
            console.log("operands[]: " + operands)
        }
        else {
            console.log("test")
        }
        console.log("Total: " + numbers[0])
    }
    console.log((numbers[0].toString()).length)
    console.log("numbers[]: " + numbers)
    console.log("operands[]: " + operands)
    if (isNaN(numbers[0]) || !isFinite(numbers[0])) {
        clearText()
        displayAns.value = "Error"
    }
    else if ((numbers[0].toString()).length <= 7) {
        displayAns.value = numbers[0]
        nextOp = true
        result = numbers[0]
    }
    else {
        displayAns.value = "Error"
    }
}


function expr(input) {
    // If operation and answer displayed after calculations, add and calculate the result to operation
    if (nextOp) {
        if (displayOps.value != 0 && displayAns.value != 0) {
            //operation = String(result);
            operation = String(displayAns.value);
        }
        nextOp = false;
    }

    const operators = ['+', '-', '*', '/', '='];
    const lastChar = operation.slice(-1);
    const secondLastChar = operation.slice(-2, -1);

    // If operation appears first then return (exception is the negative sign)


    // If second to last char is an operator and last char is '-' and incoming input is '-' then return
    /*
    if (operators.includes(secondLastChar) && lastChar === '-' && input === '-') {
        console.log("Invalid input: Consecutive '-' signs");
        return;
    }
    */

    // If there is an operation before '.' then add a 0 before the '.'
    // If there is only a '.' in the operation, then add a 0 before the '.'
    if (input === '.' && (operators.includes(lastChar) || operation.length === 0)) operation += '0'

    // Prevent multiple '.'
    if (input === '.' && (lastChar === '.')) return

    // If input is operator and lastChar is '.' then remove '.'
    if (operators.includes(input) && lastChar === '.') {
        operation = operation.substring(0, operation.length - 1);
    }

    const lastNumber = operation.split(/[+\-*/]/).pop();
    if (input === '.' && lastNumber.includes('.')) {
        console.log("Invalid input: Multiple decimal points in the same number");
        return;
    }

    // input cases: '-', other operators, and numbers
    console.log("2operation: " + operation)
    console.log ("lastChar: " + lastChar)
    console.log ("secondLastChar: " + secondLastChar)
    /*
    if (input === '-') { // '-' case
        if (operation.length === 1 && lastChar === '-') { // Allow one '-' at beginning of operation 
            console.log("Can't have two negative signs at beginning of operation")
            return;
        }
        else if (operators.includes(secondLastChar) && lastChar === '-') { // Allow '2--1' in operation
            console.log("1 HERE")
            console.log("Invalid input: Consecutive '-' signs");
            return;
        }
        // If there's nothing in operation OR lastChar is an operation OR lastChar is NOT '-' 
        else if (operation === '' || operators.includes(lastChar) || lastChar !== '-') { // Allow '-'
            console.log("2 HERE")
            operation += input;
        } 
        
        else { // Return if too many '-'
            console.log("3 HERE")
            console.log("Invalid input: Too many consecutive '-' signs");
            return;
        }
    } 
        */
    //else if (operators.includes(input)) { // Other operators case
    if (operators.includes(input)) { // Other operators case
        console.log("4 HERE")
        if (operators.includes(lastChar) || operation == '') {
        //if (operators.includes(lastChar) && !(lastChar === '-' && input === '-')) {
            console.log("5 HERE")
            console.log("Invalid input: Consecutive operators");
            return;
        }
        operation += input;
    } 
    else { // Number case
        console.log("6 HERE")
        operation += input;
    }

    if (operation.length >= 18) {
        return
    }
    displayOps.value = operation;

    // Perform bounds checking and then calculation
    if (input === '=') {
        if (operation.endsWith("=")) {
                operation = operation.slice(0,-1)
            }
            calculate(operation);
    }
}
