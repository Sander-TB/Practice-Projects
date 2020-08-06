const secondHand = document.querySelector(".second");
const minsHand = document.querySelector(".minute");
const hoursHand = document.querySelector(".hour");

function setDate() {
	const now = new Date();

	const seconds = now.getSeconds();
	const secondsDegrees = (seconds / 60) * 360 + 90;
	secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

	const mins = now.getMinutes();
	const minsDegrees = (mins / 60) * 360 + 90;
	minsHand.style.transform = `rotate(${minsDegrees})`;

	const hour = now.getHours();
	const hourDegrees = (hour / 60) * 360 + 90;
	hoursHand.style.transform = `rotate(${hourDegrees})`;
}

setInterval(setDate, 1000);
