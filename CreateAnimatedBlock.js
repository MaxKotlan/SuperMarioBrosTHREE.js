//Creates animated block 
GameObject.createAnimatedBlock = function(vector3){
	
	var aniBlock = new THREE.BoxGeometry(1,1,1);
	var material = new THREE.MeshLambertMaterial( {map: GameObject.WorldTextureMap} );
	var cube = new THREE.Mesh( aniBlock, material );
	
	cube.position.set(+0.5,+0.5,-0.5);
	cube.position.add(new THREE.Vector3(15,5,-0.5));
	scene.add( cube );
	
	return cube;
}