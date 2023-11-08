

function deactivateInputText(
	isDeactivate
){
	var allInputs = document.getElementsByTagName('input'); 
	for (var i = 0, len = allInputs.length; i < len; ++i) {
		allInputs[i].readOnly = isDeactivate;
	};
};
