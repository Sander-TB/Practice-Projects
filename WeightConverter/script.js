document.querySelector("#output").style.visibility = "hidden";

document.querySelector("#lbsInput").addEventListener("input", function(e) {
	document.querySelector("#output").style.visibility = "visible";

	let lbs = e.target.value;
	document.querySelector("#gramsOutput").innerHTML = lbs / 0.0022046;

	let kg = e.target.value;
	document.querySelector("#kgOutput").innerHTML = lbs / 2.2046;

	let oz = e.target.value;
	document.querySelector("#ozOutput").innerHTML = lbs * 16;
});
