//handle negative numbers, handle division by 0,
//calculate first two numbers in input and return on screen
console.log("hello")

displayOps = document.getElementById("display_ops")
displayAns = document.getElementById("display_ans")

var operation = ""

function clearText() {
    console.log("testing")
    displayOps.value = 0
    displayAns.value = 0
    operation = ""
}

function sqrt() {
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
}

function negate() {
    if (!isNaN(displayOps.value)) {
        displayOps.value = displayOps.value * -1;
        operation = operation.slice(1)
        operation = operation + displayOps.value
    } 
}

function calculate(operation) {
    displayAns.value = 0
    console.log(operation)
    var size = operation.length;
    var i = 0;
    var val = 0;
    var op = ""
    var operands = []

    if (operation.endsWith("=")) {
        operation = operation.slice(0,-1)
    }
    var numbers = operation.split(/[\+\-\*\/]/)
    var operands = operation.match(/(?<=\d)([\+\-\*\/])(?=\d)/g);
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
            newNum = Number(numbers[mult_i]) * Number(numbers[mult_i+1])
            console.log("multiplied: " + numbers[mult_i] + " and " + numbers[mult_i+1] + " results in " + newNum)
            numbers.splice(mult_i,1);
            numbers.splice(mult_i,1);
            numbers.splice(mult_i, 0, newNum)
            console.log("numbers[]: " + numbers)
            console.log("operands[]: " + operands)
        }
        else if (div_i !== -1 && (mult_i === -1 || div_i < mult_i)) { //if "*" is found
            operands.splice(div_i, 1);
            newNum = Number(numbers[div_i]) / Number(numbers[div_i+1])
            console.log("multiplied: " + numbers[div_i] + " and " + numbers[div_i+1] + " results in " + newNum)
            numbers.splice(div_i,1);
            numbers.splice(div_i,1);
            numbers.splice(div_i, 0, newNum)
            console.log("numbers[]: " + numbers)
            console.log("operands[]: " + operands)
        }
        else if (add_i !== -1 && sub_i === -1 || add_i < sub_i) { //if "+" is found
            operands.splice(add_i, 1);
            newNum = Number(numbers[add_i]) + Number(numbers[add_i+1])
            console.log("added: " + numbers[add_i] + " and " + numbers[add_i+1] + " results in " + newNum)
            numbers.splice(add_i,1);
            numbers.splice(add_i,1);
            numbers.splice(add_i, 0, newNum)
            console.log("numbers[]: " + numbers)
            console.log("operands[]: " + operands)
        }
        else if (sub_i !== -1 && (add_i === -1 || sub_i < add_i)) { //if "+" is found
            operands.splice(sub_i, 1);
            newNum = Number(numbers[sub_i]) - Number(numbers[sub_i+1])
            console.log("added: " + numbers[sub_i] + " and " + numbers[sub_i+1] + " results in " + newNum)
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
    
    console.log("numbers[]: " + numbers)
    console.log("operands[]: " + operands)
    if (isNaN(numbers[0]) || !isFinite(numbers[0])) {
        clearText()
        displayAns.value = "Error"
    }
    else displayAns.value = numbers[0]
}

function expr(input) {
    /*
    if (!isNaN(input)) {
        console.log(`${input} is a number`)
    }
    */
    operation = operation + input
    console.log(operation)
    displayOps.value = operation
    if (input == "=") {
        calculate(operation)
    }
}
