GameObject.Player = function (starting_pos){
	
	var player, mesh_player, squareGeom, platform_top, texture;
	
	player = {};
	player.runningAnimationIndex = 0;
	
	if (starting_pos == null){
		starting_pos = new THREE.Vector3(0,0,0);
	}
	
	player.getUVMap = function(materialID, u, v){
		var ppb = 16;
		var textureW = 48;
		var textureH = 48;
		var blocksInRow = textureW / ppb;
		var material = [];
		material[0]  = {pos: new THREE.Vector2(1,3), l: 1, h: 1};
		material[1]  = {pos: new THREE.Vector2(2,2), l: 1, h: 1};
		material[2]  = {pos: new THREE.Vector2(2,3), l: 1, h: 1};
		material[3]  = {pos: new THREE.Vector2(1,2), l: 1, h: 1};
		material[4]  = {pos: new THREE.Vector2(1,1), l: 1, h: 1};
	//	material[5]  = {pos: new THREE.Vector2(3,8), l: 1, h: 1};
		
		material[materialID].h--;
		material[materialID].l--;
		u--;
		v--;
		
		var realU = ((material[materialID].pos.x + u + (material[materialID].l * (u + 1)))* ppb) / textureW ;
		var realV = ((material[materialID].pos.y + v + (material[materialID].h * (v + 1)))* ppb) / textureH;
		
		var realUV = new THREE.Vector2(realU, realV);
		//console.log(realUV);
		return realUV;
		
	}
	
	var geometrMario = GameObject.CreatePhysicsGeometry();
	
	geometrMario.computeFaceNormals();
	geometrMario.mergeVertices();
	geometrMario.computeVertexNormals();
	
	starting_pos.x -= 0.5;
	starting_pos.y -= 0.5;
	starting_pos.z = -Math.abs(starting_pos.z);
		
	platform_top = new THREE.MeshLambertMaterial({map: GameObject.MarioTextureMap, color: 0xABABAB, alphaTest: 0.5});
	//var platform_top = new THREE.MeshLambertMaterial({color: 0x00FF00, wireframe: true});
	
	var uniforms = { texture:  { type: "t", value: GameObject.MarioTextureMap } };
	var vertexShader = document.getElementById( 'marioVertexShader' ).textContent;
	var fragmentShader = document.getElementById( 'marioFragmentShader' ).textContent;
	//platform_top =  new THREE.ShaderMaterial( { uniforms: uniforms, vertexShader: vertexShader, fragmentShader: fragmentShader } );
	console.log("hertisis");
	console.log(vertexShader);
	console.log(platform_top);
	
	mesh_player = new THREE.Mesh(geometrMario, platform_top) ;
	mesh_player.position.copy(starting_pos);
	mesh_player.renderDepth = 1;
	mesh_player.castShadow = true;
	mesh_player.receiveShadow = true;
	
	player.mesh = mesh_player;
	player.updateTexture = function(textureID, direction){
		
			var uvs = [];
			
			if (direction == "forward"){
				uvs.push( player.getUVMap(textureID, 0, 0));
				uvs.push( player.getUVMap(textureID, 0, 1));
				uvs.push( player.getUVMap(textureID, 1, 0));
				uvs.push( player.getUVMap(textureID, 1, 1));
			}
			if (direction == "backward"){
				uvs.push( player.getUVMap(textureID, 1, 0));
				uvs.push( player.getUVMap(textureID, 1, 1));
				uvs.push( player.getUVMap(textureID, 0, 0));
				uvs.push( player.getUVMap(textureID, 0, 1));
			}
			
			player1.mesh.geometry.faceVertexUvs[0][0] = [uvs[0], uvs[2], uvs[1]] ;
			player1.mesh.geometry.faceVertexUvs[0][1] = [uvs[1], uvs[2], uvs[3]] ;
	//		player1.mesh.geometry.uvsNeedsUpdate = true;
			player1.mesh.geometry.uvsNeedUpdate = true;
		//	player1.mesh.material.needsUpdate = true;
		//	console.log(player1);
	}
        
	return mesh_player;
}


GameObject.GetMarioTextureMap = function(){
	/*Geometry For Mario*/
	texture = new THREE.ImageUtils.loadTexture( "textures/mario1.png" );
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.NearestFilter;
	texture.wrapS = texture.wrapT =  THREE.ClampToEdgeWrapping;
	GameObject.MarioTextureMap = texture;
}