// Get DOM elements
const list = document.querySelector(".list");
const input = document.querySelector("#input");
const clear = document.querySelector(".clear");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Get date
const today = new Date();
document.querySelector("#date").innerHTML = today.toLocaleString();

let LIST, id;

document.addEventListener("keyup", function (e) {
	if (event.keyCode === 13) {
		const toDo = input.value;
		if (toDo) {
			addToDo(toDo, id, false, false);
			LIST.push({
				name: toDo,
				id: 0,
				done: false,
				trash: false,
			});
			localStorage.setItem("TODO", JSON.stringify(LIST));
			id++;
		}
		input.value = "";
	}
});

function addToDo(toDo, id, done, trash) {
	if (trash) {
		return;
	}

	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : "";

	const text = `<li class="item">
                <i class="fa ${DONE} co"job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o del"job="delete" id="${id}"></i>
                </li>`;

	list.insertAdjacentHTML("beforeend", text);
}

function completeToDo(element) {
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
	element.parentNode.parentNode.removeChild(element.parentNode);
	LIST[element.id].trash = true;
}

list.addEventListener("click", function (e) {
	let element = event.target;
	const elementJob = event.target.attributes.job.value;

	if (elementJob === "complete") {
		completeToDo(element);
	} else if (elementJob === "delete") {
		removeToDo(element);
	}
	localStorage.setItem("TODO", JSON.stringify(LIST));
});

// Event to refresh button
clear.addEventListener("click", function (e) {
	localStorage.clear();
	location.reload();
});

// Add to LocalStorage

let data = localStorage.getItem("TODO");
if (data) {
	LIST = JSON.parse(data);
	id = LIST.length;
	loadList(LIST);
} else {
	LIST = [];
	id = 0;
}

function loadList(array) {
	array.forEach(function (item) {
		addToDo(item.name, item.id, item.done, item.trash);
	});
}
