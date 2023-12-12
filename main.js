const output = document.querySelector('.calc-output');
const number = document.querySelectorAll('.number');
const ac = document.querySelector('.ac');
const del = document.querySelector('.del');
const btns = document.querySelectorAll('button');
let numberArray = [];
let count = 0;
let chainString = '';

// function which add comma and set integer numbers
const commaSet = (value, currValue) => {
	chainString += value;
	let integerNumbers = parseFloat(chainString);
	let numbers = new Intl.NumberFormat('en-US').format(integerNumbers);
	currValue.textContent = numbers;
};

const putNumbers = (val) => {
	numberArray.push(chainString);
	console.log(numberArray);
	output.firstElementChild.textContent =
		val + ' ' + output.lastElementChild.textContent;
	output.lastElementChild.textContent = '';
	chainString = '';
};

const sum = () => {
	putNumbers();
	let a = parseFloat(numberArray[0]);
	let b = parseFloat(numberArray[1]);

	let sum = a + b;
	console.log(sum);
};

// function which is responsible for clear calculator
const clearCalc = () => {
	output.firstElementChild.textContent = '';
	output.lastElementChild.textContent = '';
	count = 0;
	chainString = '';
	numberArray = [];
};

// main function which update calculator for each click from keyboard or icon from calculator. fires correct functions if clicked button was correct
const updateCalc = (value) => {
	const calcValue = output.lastElementChild;
	// const currValue = lastElementCalc.textContent;

	if (value > -1 && value < 10) {
		// lastElementCalc.textContent += value;
		count++;

		commaSet(value, calcValue);
	} else if (value === 'Backspace') {
		// console.log(chainString);
		calcValue.textContent = calcValue.textContent.slice(0, -1);
	} else if (value === '+') {
		putNumbers(value);
	} else if (value === '=' || value === 'Enter') {
		console.log(value);
	} else if (value === 'c' || value === 'C' || value === 'AC') {
		clearCalc();
	}
};

btns.forEach((button) => {
	button.addEventListener('click', () => {
		console.log(button.textContent);
		const numberBtn = button.textContent;
		updateCalc(numberBtn);
	});
});

window.addEventListener('keydown', (event) => {
	const pressedKey = event.key;
	updateCalc(pressedKey);
});
ac.addEventListener('click', clearCalc);
