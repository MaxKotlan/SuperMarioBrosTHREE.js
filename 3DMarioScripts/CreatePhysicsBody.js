GameObject.CreatePhysicsGeometry = function(parameters){
	var scale,position;
	
	if (parameters == undefined){
		parameters = {};
	}
	
	if (parameters.position == undefined){
		position = new THREE.Vector3(0,0,0);
	}else{
		position = parameters.position;
	}
	
	if (parameters.scale == undefined){ 
		scale = new THREE.Vector2(1,1);
	}else{
		scale = parameters.scale;
	}
	
	var geometry = new THREE.Geometry();
	var vertices=[];

	vertices[ 0] = new THREE.Vector3( 0, 0,    0),
	vertices[ 1] = new THREE.Vector3( 0, 1,    0),
	vertices[ 2] = new THREE.Vector3( 1, 0,    0),
	vertices[ 3] = new THREE.Vector3( 1, 1,    0),
	vertices[ 4] = new THREE.Vector3( 0, 0,  0.5),
	vertices[ 5] = new THREE.Vector3( 0, 0, -0.5),
	vertices[ 6] = new THREE.Vector3( 0, 1,  0.5),
	vertices[ 7] = new THREE.Vector3( 0, 1, -0.5),
	vertices[ 8] = new THREE.Vector3( 1, 0,  0.5),
	vertices[ 9] = new THREE.Vector3( 1, 0, -0.5),
	vertices[10] = new THREE.Vector3( 1, 1,  0.5),
	vertices[11] = new THREE.Vector3( 1, 1, -0.5)
	
	for (var i = 0; i < vertices.length; i++){
		if (vertices[i].x == 1){
			vertices[i].x = scale.x;
		}
		if (vertices[i].y == 1){
			vertices[i].y = scale.y;
		}
		vertices[i].add(new THREE.Vector3(0,0,0));
		geometry.vertices.push(vertices[i]);
	}
 
	geometry.faces.push( new THREE.Face3(  0,  2 ,  1 ));
	geometry.faces.push( new THREE.Face3(  1,  2 ,  3 ));
	geometry.faces.push( new THREE.Face3(  4,  6 ,  5 ));
	geometry.faces.push( new THREE.Face3(  5,  6 ,  7 ));
	geometry.faces.push( new THREE.Face3(  6, 10 ,  7 ));
	geometry.faces.push( new THREE.Face3(  7, 10 , 11 ));
	geometry.faces.push( new THREE.Face3(  8,  9 , 10 ));
	geometry.faces.push( new THREE.Face3(  9, 11 , 10 ));
	geometry.faces.push( new THREE.Face3(  4,  5 ,  8 ));
	geometry.faces.push( new THREE.Face3(  9,  8 ,  5 ));
	
	return geometry;
}