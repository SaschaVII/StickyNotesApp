//Global Variables
var controlPressed = false;

document.addEventListener('keydown', logKeyDown);
document.addEventListener('keyup', logKeyUp);

window.onload = function() {
	retrieveNotesLocal();
};

// Content needs to be implemented still!!
function AddNote(id, xPos, yPos, color, content = "") {
	if(document.getElementById("tutorial-text").style.display != "none") {
		document.getElementById("tutorial-text").style.display = "none";
	}
	const div = document.createElement("div");
	const textarea = document.createElement("textarea");
	const button = document.createElement("button");

	textarea.setAttribute("placeholder", "Start typing away...");
	textarea.setAttribute("oninput", "contentUpdated(this.id)");
	textarea.setAttribute("id", id);
	textarea.value = content;
	button.setAttribute("onclick", "deleteNote(this.parentElement)");
	button.innerHTML = "X";
	div.appendChild(textarea);
	div.appendChild(button);

	// Add class "note"
	div.classList.add("note");
	div.setAttribute("id", "note");
	
	
	// Add div as child of main
	const main = document.getElementById("main");
	main.appendChild(div);

	// Move note to determined pos and Randomise Colour
	div.setAttribute("style", `top: ${yPos}px; left: ${xPos}px; background-color: ${color};`);
};

function mouseClick() {
	if (controlPressed) {
		var xPos = event.clientX;
		var yPos = event.clientY;
		var color = randomColor();
		AddNote(localStorage.length, xPos-150, yPos-20, color);
		storeNoteLocal(localStorage.length, xPos-150, yPos-20, color, "");
	}
}

function deleteNote(element) {
	// Find textarea ID
	var id = parseInt(element.getElementsByTagName("TEXTAREA")[0].id);

	// Remove item from local storage
	localStorage.removeItem(id);

	// Shift Local Storage Indecies
	for (let i = id+1; i < localStorage.length+1; i++) {
		// Shift item to new item with value minus 1
		retrievedNoteObj = JSON.parse(localStorage.getItem(i));
		localStorage.setItem((i-1), JSON.stringify(retrievedNoteObj));
		localStorage.removeItem(i);

		// Shift DOM element ID's
		document.getElementById(i).id = i-1;
	}


	// Remove from DOM
	element.remove();
}

function randomColor() {
	let colorList = ['#77d6ec', '#54eab4', '#feee5a', '#fd7bab', '#76abea', '#fab03c']
	let i = Math.floor(Math.random() * colorList.length);
	color = colorList[i];
	return color;
}

function storeNoteLocal(id, xPos, yPos, color, content) {
	const noteObj = {
		xPos: xPos,
		yPos: yPos,
		color: color,
		content: content
	};

	// Put the object into storage
	localStorage.setItem(id, JSON.stringify(noteObj));
}

function retrieveNotesLocal() {
	for (let i = 0; i < localStorage.length; i++) {
		retrievedNoteObj = JSON.parse(localStorage.getItem(i));
		AddNote(i, retrievedNoteObj.xPos, retrievedNoteObj.yPos, retrievedNoteObj.color, retrievedNoteObj.content);
	}
}

function contentUpdated(id) {
	retrievedNoteObj = JSON.parse(localStorage.getItem(id));
	retrievedNoteObj.content = document.getElementById(id).value;
	localStorage.setItem(id, JSON.stringify(retrievedNoteObj));
}

function logKeyDown(e) {
  if(e.code == "ControlLeft") { controlPressed = true; }
  if(e.code == "Escape") { document.activeElement.blur(); }
}

function logKeyUp(e) {
  if(e.code == "ControlLeft") { controlPressed = false; }
}
