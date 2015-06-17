GameObject.Developer = {};

GameObject.Developer.showGrids = function(map){
	var step  =  1/2;
	var geometry = new THREE.Geometry();
	var material = new THREE.LineBasicMaterial({color: 0x000});
	
	var y = 16;
	var x = 212;
	var z = 3;
	
	for (var i = 0; i <= y; i+= step){
		geometry.vertices.push(new THREE.Vector3(	0, 	i, 0.01));
		geometry.vertices.push(new THREE.Vector3( x, i, 0.01));
		
		geometry.vertices.push(new THREE.Vector3(	0, 	i, 0));
		geometry.vertices.push(new THREE.Vector3( 0,  i, z));
		
		geometry.vertices.push(new THREE.Vector3(	x, 	i, 0));
		geometry.vertices.push(new THREE.Vector3( x,  i, z));
	}
	for (var i = 0; i <= x; i+= step){
		geometry.vertices.push(new THREE.Vector3( i,  0, 0.01));
		geometry.vertices.push(new THREE.Vector3( i, y, 0.01));
		
		geometry.vertices.push(new THREE.Vector3( i,  0, 0));
		geometry.vertices.push(new THREE.Vector3( i,  0, z));
		
		geometry.vertices.push(new THREE.Vector3( i,  y, 0));
		geometry.vertices.push(new THREE.Vector3( i,  y, z));
		
	}
	for (var i = 0; i <= z; i+= step){
		geometry.vertices.push(new THREE.Vector3( 0,  0, i));
		geometry.vertices.push(new THREE.Vector3( x,  0, i));
		
		geometry.vertices.push(new THREE.Vector3( 0,  y, i));
		geometry.vertices.push(new THREE.Vector3( x,  y, i));
		
		geometry.vertices.push(new THREE.Vector3( 0,  y, i));
		geometry.vertices.push(new THREE.Vector3( 0,  0, i));
		
		geometry.vertices.push(new THREE.Vector3( x,  y, i));
		geometry.vertices.push(new THREE.Vector3( x,  0, i));
	}
		
	console.log(geometry);
	var line = new THREE.Line( geometry, material, THREE.LinePieces);
	line.position.z -= z;
	line.position.z += 3;
	scene.add(line);
}

GameObject.Developer.SaveDEVCAM = function(){
	var expires;
	days = 100;
	if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
	}
	else {
			expires = "";
	}
	
	devControls.update();		
	document.cookie = "devCamPosx=" + cameraDEV.position.x + expires + "; path=/";
	document.cookie = "devCamPosy=" + cameraDEV.position.y + expires + "; path=/";
	document.cookie = "devCamPosz=" + cameraDEV.position.z + expires + "; path=/";
	document.cookie = "devCamRotx=" + cameraDEV.rotation.x + expires + "; path=/";
	document.cookie = "devCamRoty=" + cameraDEV.rotation.y + expires + "; path=/";
	document.cookie = "devCamRotz=" + cameraDEV.rotation.z + expires + "; path=/";
	document.cookie = "devCamQuatx=" + cameraDEV.quaternion.x + expires + "; path=/";
	document.cookie = "devCamQuaty=" + cameraDEV.quaternion.y + expires + "; path=/";
	document.cookie = "devCamQuatz=" + cameraDEV.quaternion.z + expires + "; path=/";
	document.cookie = "devCamQuatw=" + cameraDEV.quaternion.w + expires + "; path=/";
	document.cookie = "devCamTargx=" + devControls.target.x + expires + "; path=/";
	document.cookie = "devCamTargy=" + devControls.target.y + expires + "; path=/";
	document.cookie = "devCamTargz=" + devControls.target.z + expires + "; path=/";
	
	console.log(cameraDEV);
	console.log(document.cookie);
}
/*
			function showGrids(sizeX, sizeY){
                
                sizeX /= 2;
                sizeY = sizeX;
            
				var step  =  1;
				
				var geometry = new THREE.Geometry();
				var material = new THREE.LineBasicMaterial({color: 'white'});
				
				for (var i = -sizeX; i < sizeX; i+= step){
					geometry.vertices.push(new THREE.Vector3(-  sizeX, i, 0.01));
					geometry.vertices.push(new THREE.Vector3( sizeX, i, 0.01));
				}
				for (var i = -sizeY; i < sizeY; i+= step){
					geometry.vertices.push(new THREE.Vector3( i, -sizeY, 0.01));
					geometry.vertices.push(new THREE.Vector3(  i, sizeY, 0.01));
				}
				
				var line = new THREE.Line( geometry, material, THREE.LinePieces);
				line.position.x += sizeX;
				line.position.y += sizeY;
				line.position.z = -1;
				scene.add(line);
			}
		*/