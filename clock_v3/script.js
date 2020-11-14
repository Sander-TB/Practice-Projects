setInterval(setClock, 1000);

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");

function setClock() {
	const now = new Date();
	const secondsRatio = now.getSeconds() / 60;
	const minutesRatio = now.getMinutes() / 60;
	const hoursRatio = (minutesRatio + now.getHours()) / 12;

	setRotation(secondHand, secondsRatio);
	setRotation(minuteHand, minutesRatio);
	setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio) {
	element.style.setProperty("--rotation", rotationRatio * 360);
}

setClock();
