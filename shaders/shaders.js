GameObject.getShader = function(shaderLocation, callback){
	var xmlhttp = new XMLHttpRequest();
	var url = shaderLocation;
	console.log(callback);
	if (callback == undefined){callback = function(){}};
	console.log(callback);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				callback();
				console.log(xmlhttp.responseText);
				return xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}