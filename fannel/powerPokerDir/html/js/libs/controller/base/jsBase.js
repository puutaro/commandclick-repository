

function addClass(
	idName,
	addClass
){
	const idElement = document.getElementById(
        idName
      );
	idElement.classList.add(
		addClass
	);
}

function removeClass(
	idName,
	removeClass
){
	const idElement = document.getElementById(
        idName
      );
      idElement.classList.remove(
        removeClass
      );
}

function changeText(
	idName,
	changeText
){
	const idElement = document.getElementById(
        idName
      );
	idElement.textContent = changeText
}

function diffArray(
	previousArray,
	currentArray
){
	return currentArray.filter(
		function(el){
			return previousArray.indexOf(el) == -1
		}
	)
}

function deepCopyArray(array){
	return JSON.parse(JSON.stringify(array))
}
