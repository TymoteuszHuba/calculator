const btns = document.querySelectorAll('button');
const summarizeBtn = document.querySelector('.solution');
const currentOperationDisplay = document.querySelector('.current-calc');
const resultOperationDisplay = document.querySelector('.previous-calc');

let firstNumber = '';
let secondNumber = '';
let convertNumber = '';
let operator = null;
let flag = false;

currentOperationDisplay.textContent = '0';

// function which add numbers to display screen of calculator
const setNumber = (num) => {
	if (currentOperationDisplay.textContent === '0' || flag) resetScreen();
	currentOperationDisplay.textContent += num;
	// convertNumber += num;
	// let floatNumber = parseFloat(convertNumber);
	// currentOperationDisplay.textContent = floatNumber.toLocaleString(undefined, {
	// 	maximumFractionDigits: 8,
	// });
};

const resetScreen = () => {
	currentOperationDisplay.textContent = '';
	flag = false;
};

// function which responsible for add dot to make decimal numbers
const appendPoint = () => {
	if (flag) resetScreen();
	if (currentOperationDisplay.textContent === '')
		currentOperationDisplay.textContent = '0';
	if (currentOperationDisplay.textContent.includes('.')) return;
	currentOperationDisplay.textContent += '.';
};

// function which remove last element from textContent
const deleteNumber = () => {
	currentOperationDisplay.textContent = currentOperationDisplay.textContent
		.toString()
		.slice(0, -1);
	if (currentOperationDisplay.textContent === '') {
		currentOperationDisplay.textContent = '0';
	}
	// convertNumber = convertNumber.toString().slice(0, -1);
	// currentOperationDisplay.textContent = convertNumber;
	// if (currentOperationDisplay.textContent === '') {
	// 	currentOperationDisplay.textContent = '0';
	// }
};

// function setting firstNumber which take number from display, next set opeartor based on variable operator coresponding with value when function is call
const setOperator = (op) => {
	if (operator !== null) calculation();
	firstNumber = currentOperationDisplay.textContent;
	operator = op;
	resultOperationDisplay.textContent = `${firstNumber} ${operator}`;
	flag = true;
};

const calculation = () => {
	if (operator === null || flag) return;
	if (operator === '+' && currentOperationDisplay.textContent === '0') {
		alert("You can't divide by 0!");
		return;
	}
	secondNumber = currentOperationDisplay.textContent;
    currentOperationDisplay.textContent = operate(firstNumber, secondNumber, operator);
	resultOperationDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
	operator = null;
};

const add = (a, b) => {
	return a + b;
};

const substract = (a, b) => {
	return a - b;
};

const multiply = (a, b) => {
	return a * b;
};

const divide = (a, b) => {
	return a / b;
};

const operate = (firstNum, secNum, op) => {
	firstNum = Number(firstNum);
	secNum = Number(secNum);

	switch (op) {
		case '+':
			return add(firstNum, secNum);

		case '-':
			return substract(firstNum, secNum);

		case '*':
		case 'x':
			return firstNum * secNum;

		case '/':
			if (firstNum === 0) return null;
			return firstNum / secNum;

		default:
			return null;
	}
};

const setCalc = (value) => {
	if (value >= 0 && value <= 9) {
		setNumber(value);
	}
	if (value === '.') {
		appendPoint();
	}
	if (
		value === '+' ||
		value === '-' ||
		value === '*' ||
		value === 'x' ||
		value === '/'
	) {
		setOperator(value);
	}
	if (value === '=' || value === 'Enter') {
		calculation();
	}
	if (value === 'AC' || value === 'c' || value === 'C') {
		clear();
	}
	if (value === 'DEL' || value === 'Backspace') {
		deleteNumber();
	}
};

const clear = () => {
	currentOperationDisplay.textContent = '0';
	resultOperationDisplay.textContent = '';
	convertNumber = '';
	firstNumber = '';
	secondNumber = '';
	currentOperation = null;
};

window.addEventListener('keydown', (event) => {
	const pressedKey = event.key;
	setCalc(pressedKey);
});

btns.forEach((btn) => {
	btn.addEventListener('click', () => {
		const btnNum = btn.textContent;
		setCalc(btnNum);
	});
});
