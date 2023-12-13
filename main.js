const output = document.querySelector('.calc-output');
const number = document.querySelectorAll('.number');
const ac = document.querySelector('.ac');
const del = document.querySelector('.del');
const btns = document.querySelectorAll('button');
let firstVal = '0';
let firstFloatNumber;
let secondFloatNumber;
let operator = '';
let displayFirstVal = output.lastElementChild;
let displaySecVal = output.firstElementChild;

output.lastElementChild.textContent = firstVal;

const operate = () => {
	let result;
	switch (operator) {
		case '+':
			result = firstFloatNumber + secondFloatNumber;
			break;
		case '-':
			result = firstFloatNumber - secondFloatNumber;
			break;
		case '*':
			result = firstFloatNumber * secondFloatNumber;
			break;
		case '/':
			result = firstFloatNumber / secondFloatNumber;
			break;
		case '%':
			result = firstFloatNumber % secondFloatNumber;
			break;
		default:
			result = firstFloatNumber;
			break;
	}

	displaySecVal.textContent = result.toLocaleString('en-us', {
		maximumFractionDigits: 8,
	});

	displayFirstVal.textContent = '';
	firstFloatNumber = result;
	firstVal = result.toString();
};

const setFirstVal = (val) => {
	firstVal += val;
	firstFloatNumber = parseFloat(firstVal);
	let showFirstVal = firstFloatNumber.toLocaleString('en-US', {
		maximumFractionDigits: 8,
	});
	displayFirstVal.textContent = showFirstVal;
	console.log('firstFloatNumber: ', firstFloatNumber);
};

const setSecondVal = (op) => {
	displaySecVal.textContent = op + ' ' + displayFirstVal.textContent;
	let secVal = firstVal;
	secondFloatNumber = parseFloat(secVal);
	displayFirstVal.textContent = '';
	firstVal = '';
	firstFloatNumber = 0;
};

const displayCalc = (value) => {
	if ((value > -1 && value < 10) || value === '.') {
		setFirstVal(value);
	} else if (
		value === 'x' ||
		value === '*' ||
		value === '/' ||
		value === '+' ||
		value === '-' ||
		value === '%'
	) {
		setSecondVal(value);
		operator = value === 'x' ? '*' : value;
		console.log('firstFloatNumber: ', firstFloatNumber);
		console.log('secondFloatNumber: ', secondFloatNumber);
	} else if (value === '=') {
		operate();
	} else if (value === 'AC' || value === 'c' || value === 'C') {
		clearCalc();
	}
};

// function which is responsible for clear calculator
const clearCalc = () => {
	output.firstElementChild.textContent = '';
	output.lastElementChild.textContent = '0';
	firstVal = '';
};

btns.forEach((button) => {
	button.addEventListener('click', () => {
		// console.log(button.textContent);
		const numberBtn = button.textContent;
		displayCalc(numberBtn);
	});
});

window.addEventListener('keydown', (event) => {
	const pressedKey = event.key;
	displayCalc(pressedKey);
});

// ac.addEventListener('click', clearCalc);
