function displayCats() {
	const catUrl =
		"https://api.thecatapi.com/v1/images/search?5efa6662-6d84-4ec8-a5ee-5363bfece722";

	fetch(catUrl)
		.then((res) => res.json())
		.then((json) => loadCats(json))
		.catch((err) => console.log(err));

	function loadCats(cats) {
		const catImg = cats[0].url;
		const image = document.querySelector("#cat");
		image.src = catImg;
	}
}

const button = document.querySelector("#btn");

button.onclick = displayCats;
