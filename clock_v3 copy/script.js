setInterval(setClock, 1000);

const second = document.querySelector("#second");
const minute = document.querySelector("#minute");
const hour = document.querySelector("#hour");

function setClock() {
	const now = new Date();
	const seconds = now.getSeconds() / 60;
	const minutes = now.getMinutes() / 60;
	const hours = (minutes + now.getHours()) / 12;

	rotate(second, seconds);
	rotate(minute, minutes);
	rotate(hour, hours);
}

function rotate(element, rotation) {
	element.style.setProperty("--rotate", rotation * 360);
}

setClock;
