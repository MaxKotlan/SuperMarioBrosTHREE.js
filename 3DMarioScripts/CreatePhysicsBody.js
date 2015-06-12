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
	vertices[ 3] = new THREE.Vector3( 1, 1,    0)
	
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
	
	return geometry;
}

/*Creates an Entity*/
GameObject.AddGlobalEntitiy = function(entityParameters){
	var entity, defaultmesh;
	
	entity = {};
	defaultmesh = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( { wireframe : true } ));
	
	entityParameters = entityParameters !== undefined ? entityParameters : {};
	
	entity.name  =        entityParameters.name         !== undefined ? entityParameters.name         : "Undefined";
	entity.playable =     entityParameters.playable     !== undefined ? entityParameters.playable     : false;
	entity.mesh  =        entityParameters.mesh         !== undefined ? entityParameters.mesh         : defaultmesh;
	entity.boundingbox =  entityParameters.boundingbox  !== undefined ? entityParameters.boundingbox  : defaultmesh;
	entity.speed =        entityParameters.speed        !== undefined ? entityParameters.speed        : new THREE.Vector3(0,0,0);
	entity.velocity =     entityParameters.velocity     !== undefined ? entityParameters.velocity     : new THREE.Vector3(0,0,0);
	entity.acceleration = entityParameters.acceleration !== undefined ? entityParameters.acceleration : new THREE.Vector3(0,0,0);
	entity.position =     entityParameters.position     !== undefined ? entityParameters.position     : new THREE.Vector3(0,0,0);
	
	entity.boundingbox.material.color = entity.playable == false ? new THREE.Color(0xff0000) : new THREE.Color(0x00ff00);
	
	entity.mesh.position.copy(entity.position);
	entity.mesh.position.y -= 1;
	entity.mesh.position.x -= 1;
	
	entity.boundingbox.position.copy(entity.position);
	entity.boundingbox.position.y -= 0.5;
	entity.boundingbox.position.x -= 0.5;
	
	entity.boundingbox.geometry.computeFaceNormals();
	entity.boundingbox.geometry.computeMorphNormals();
	entity.boundingbox.geometry.computeVertexNormals();
	//entity.mesh.geometry.computeBoundingBox();
	
/*	for (var i = 0; i < entity.boundingbox.geometry.faces.length; i++){
	   var geometry = new THREE.SphereGeometry( 1/32, 32, 32 );
      var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
      var sphere1 = new THREE.Mesh( geometry, material );
      var sphere2 = new THREE.Mesh( geometry, material );
      var sphere3 = new THREE.Mesh( geometry, material );
	   
      sphere1.position.copy(entity.boundingbox.geometry.vertices[entity.boundingbox.geometry.faces[i].a]);
      sphere2.position.copy(entity.boundingbox.geometry.vertices[entity.boundingbox.geometry.faces[i].b]);
      sphere3.position.copy(entity.boundingbox.geometry.vertices[entity.boundingbox.geometry.faces[i].c]);
      
      sphere1.position.add(entity.boundingbox.position);
      sphere2.position.add(entity.boundingbox.position);
      sphere3.position.add(entity.boundingbox.position);
      
      sphere1.position.add(entity.boundingbox.geometry.faces[i].normal;
      sphere2.position.add(entity.boundingbox.geometry.faces[i].normal;
      sphere3.position.add(entity.boundingbox.geometry.faces[i].normal;
      
      scene.add(sphere1, sphere2, sphere3);
	}*/
	
	console.log(entity.boundingbox);
	
	scene.add(entity.mesh, entity.boundingbox);
	
	GameObject.PhysicsEntities.push(entity);
}