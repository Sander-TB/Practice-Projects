// Calculator class to hook our calc into
class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}

	// DIFFERENT FUNCTIONALITIES OF CALC:

	// Clearing the numbers from the screen. Default behaviour of new calc.
	clear() {
		this.previousOperand = "";
		this.currentOperand = "";
		this.operation = undefined;
	}

	// Deleting one number from display at a time.
	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	// Makes sure the numbers are appended, not added. (clicking 1 two times makes 11, not 2). Makes sure only one "." is allowed
	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	// Which operation you are choosing on the calc.
	chooseOperation(operation) {
		// If nothing is displayed, do nothing.
		if (this.currentOperand === "") return;
		// If there is stuff in both operands; do computation
		if (this.previousOperand !== "") {
			this.compute();
		}
		//Setting the value of the current operand into the previous operand.
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}

	// Doing the computations
	compute() {
		let computation;
		// Converting string to a number
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		// If there are no numbers present, do nothing
		if (isNaN(prev) || isNaN(current)) return;

		//Switch statement of all the different possible computations
		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "*":
				computation = prev * current;
				break;
			case "÷":
				computation = prev / current;
				break;
			case "%":
				computation = prev % current;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = "";
	}

	//Helper-function to get commas in display. Makes decimal numbers appear
	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	/*Updating the display of the numbers/operations you are pressing. Making the previous operand visible.*/
	updateDisplay() {
		this.currentOperandTextElement.innerText = this.getDisplayNumber(
			this.currentOperand
		);
		// Make the operator show up after the numbers in previous operand
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
				this.previousOperand
			)} ${this.operation}`;
		} else {
			this.previousOperandTextElement.innerText = "";
		}
	}
}
// Variables for the different buttons
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const allClearButton = document.querySelector("[data-allCleared]");
const deleteButton = document.querySelector("[data-delete]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandTextElement = document.querySelector(
	"[data-previousOperand]"
);
const currentOperandTextElement = document.querySelector(
	"[data-currentOperand]"
);

// Making the calculator, passing in everything from our constructor
const calculator = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
);

// Making number-buttons functional / appear on the display
numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

// Making operation-buttons functional / appear on the display
operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

// Calls the compute function and updates display to show answer
equalsButton.addEventListener("click", (button) => {
	calculator.compute();
	calculator.updateDisplay();
});

// Calls the clear function and updates display to clear all
allClearButton.addEventListener("click", (button) => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
	calculator.delete();
	calculator.updateDisplay();
});
