GameObject.CreateGoomba = function(){
	
		var geometry = GameObject.CreatePhysicsGeometry();
	console.log(geometry);
	//	var material = new THREE.MeshBasicMaterial({color:0xFF0000, wireframe:true});
		var material = new THREE.MeshBasicMaterial({map: GameObject.GoombaTextureMap,  color: 0xFFFFFF, alphaTest: 0.5, side: THREE.DoubleSide});
		var goomba = {};
		
		GameObject.UpdateSpriteFrame(geometry, 0);
		var mesh = new THREE.Mesh(geometry,material);
		mesh.position.copy(new THREE.Vector3(5,2,-1));
		
		var uniforms = { texture:  { type: "t", value: GameObject.GoombaTextureMap, } };
		var vertexShader = document.getElementById( 'marioVertexShader' ).textContent;
		var fragmentShader = document.getElementById( 'marioFragmentShader' ).textContent;
		
		mesh.renderDepth = 1;
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.customDepthMaterial = new THREE.ShaderMaterial( { uniforms: uniforms, vertexShader: vertexShader, fragmentShader: fragmentShader } );

		return mesh;
}

GameObject.GetGoombaMaterial = function(materialID, u, v){
		var ppb = 16;
		var textureW = 64;
		var textureH = 16;
		var blocksInRow = textureW / ppb;
		var material = [];
		material[0]  = {pos: new THREE.Vector2(1,1), l: 1, h: 1};
		material[1]  = {pos: new THREE.Vector2(2,1), l: 1, h: 1};
		material[2]  = {pos: new THREE.Vector2(3,1), l: 1, h: 1};
		material[3]  = {pos: new THREE.Vector2(4,1), l: 1, h: 1};
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

GameObject.UpdateSpriteFrame = function(Geom, mID){
	var uvs = [];
	
	uvs.push(GameObject.GetGoombaMaterial(mID, 0, 0));
	uvs.push(GameObject.GetGoombaMaterial(mID, 0, 1));
	uvs.push(GameObject.GetGoombaMaterial(mID, 1, 0));
	uvs.push(GameObject.GetGoombaMaterial(mID, 1, 1));
	
	Geom.faceVertexUvs[0][0] = [uvs[0], uvs[2], uvs[1]] ;
	Geom.faceVertexUvs[0][1] = [uvs[1], uvs[2], uvs[3]] ;
	
	Geom.uvsNeedUpdate = true;
}

GameObject.GetGoombaMap = function(){
	var texture;
	texture = new THREE.ImageUtils.loadTexture( "textures/goombaMap.png" );
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.NearestFilter;
	texture.wrapS = texture.wrapT =  THREE.ClampToEdgeWrapping;
	GameObject.GoombaTextureMap = texture;
}

GameObject.GoombaUpdateLoop = function(){
	setTimeout(function(){
		GameObject.upad += 1;
		if (GameObject.upad > 1){GameObject.upad = 0;}
		GameObject.UpdateSpriteFrame(GameObject.PhysicsEntities[1].mesh.geometry, GameObject.upad);
		window.requestAnimationFrame(GameObject.GoombaUpdateLoop);
	}, (175));
}