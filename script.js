const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}
function inputDigit(digit) {
    const {displayValue, waitingForSecondOperand} = calculator;
     // overwrite 'displayValue' if the current value is '0' otherwise append to it
    calculator.displayValue = displayValue;
    if(waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else if(calculator.displayValue === '0') {
        calculator.displayValue = digit;
    } else {
        calculator.displayValue = `${displayValue}` + digit;
    }
    console.log(calculator);
}

function inputDecimal(dot) {
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue);
    if(operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }
    if(firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }
    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function updateDisplay() {
    // select the element with class of 'calculator-screen'
    const display = document.querySelector('.calculator-screen');
    // update the value of the element with the contents of 'displayValue'
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', pressKeys);
function pressKeys() {
    const {target} = event;
    // check if the clicked element is a button.
    // if not, exit from the function
    if(!target.matches('button')) {
        return;
    }
    if(target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    if(target.classList.contains('decimal')) {
       inputDecimal(target.value);
       updateDisplay();
        return;
    }
    if(target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }
   inputDigit(target.value);
   updateDisplay()
}
