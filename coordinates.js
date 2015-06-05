
GameObject.testGround = function (){
	
	var sizey = 2;
	var sizex = 144;
	var geometry = new THREE.BoxGeometry( sizex, sizey, 1 );
	
	var texture = new THREE.ImageUtils.loadTexture( "textures/platform-top.png" );
	texture.magFilter = THREE.NearestFilter;
	texture.minFilter = THREE.LinearMipMapLinearFilter;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 144, 2 );
	var platform_top = new THREE.MeshLambertMaterial({map: texture });
	
	var mesh_ground = new THREE.Mesh( geometry, platform_top );
	
	phsy_ground = new CANNON.Body({
		mass: 0
	});
	phsy_ground.addShape(new CANNON.Box(new CANNON.Vec3(142,2,2)));
				
	world.add(phsy_ground);
	
	var ground = {mesh: mesh_ground, phsy: phsy_ground};
	
	return ground;
	
}