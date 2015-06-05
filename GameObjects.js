var GameObject = { REVISION: 1 };

GameObject.Bush = function (start_pos){
	
	
	var texture = new THREE.ImageUtils.loadTexture( "/textures/bush-1.png" );
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;
	texture.wrapS = texture.wrapT =  THREE.ClampToEdgeWrapping;
	texture.repeat.set( 1, 1 );
/*	texture.transparent = true;
	texture.opacity = 0.5;*/
	/*map: texture, transparent: true, opaticity: 0.9 */
	var platform_top = new THREE.MeshLambertMaterial({map: texture, transparent: true, opaticity: 0.9 });
	
	var squareGeom = new THREE.PlaneBufferGeometry(4, 1, 1, 1);
	
	var bush = new THREE.Mesh(squareGeom, platform_top);
	bush.position.copy(start_pos);
	
	return bush;
}

GameObject.Hill = function (start_pos){
	
	
	var texture = new THREE.ImageUtils.loadTexture( "/textures/hill.png" );
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.NearestFilter;
	texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
	texture.repeat.set( 1, 1 );
/*	texture.transparent = true;
	texture.opacity = 0.5;*/
	/*map: texture, transparent: true, opaticity: 0.9 */
	var platform_top = new THREE.MeshLambertMaterial({map: texture, transparent: true, opaticity: 0.9 });
	
	var squareGeom = new THREE.PlaneBufferGeometry(6, 3, 1, 1);
	

	
	var bush = new THREE.Mesh(squareGeom, platform_top);
	bush.position.copy(start_pos);
	
	return bush;
}

GameObject.question = function (){
	
	
	var texture = new THREE.ImageUtils.loadTexture( "/textures/hill.png" );
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 1, 1 );
/*	texture.transparent = true;
	texture.opacity = 0.5;*/
	/*map: texture, transparent: true, opaticity: 0.9 */
	var platform_top = new THREE.MeshLambertMaterial({map: texture, transparent: true, opaticity: 0.9 });
	
	var squareGeom = new THREE.PlaneBufferGeometry(6, 3, 1, 1);
	

	
	var bush = new THREE.Mesh(squareGeom, platform_top);
	
	return bush;
}