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
	/*Dynamic Parameters. Should be able to be updated*/
	entity.name  =        entityParameters.name         !== undefined ? entityParameters.name         : "Undefined";
	entity.playable =     entityParameters.playable     !== undefined ? entityParameters.playable     : false;
	entity.mesh  =        entityParameters.mesh         !== undefined ? entityParameters.mesh         : defaultmesh;
	entity.boundingbox =  entityParameters.boundingbox  !== undefined ? entityParameters.boundingbox  : defaultmesh;
	entity.force =        entityParameters.force        !== undefined ? entityParameters.force        : new THREE.Vector3(0,0,0);
	entity.mass  =        entityParameters.mass         !== undefined ? entityParameters.mass         : 1;
	entity.restitution =  entityParameters.restitution  !== undefined ? entityParameters.restitution  : 0.9; //0-1 MULTIPLYER, 1- INFINITE BOUNCE,
	entity.Maxspeed =     entityParameters.Maxspeed     !== undefined ? entityParameters.Maxspeed     : 0.1;
	entity.physicsRound = entityParameters.physicsRound !== undefined ? entityParameters.physicsRound : true;
	entity.RoundingNumber=entityParameters.RoundingNumber!== undefined ? entityParameters.RoundingNumber : 16;
	entity.velocity =     entityParameters.velocity     !== undefined ? entityParameters.velocity     : new THREE.Vector3(0,0,0);
	entity.acceleration = entityParameters.acceleration !== undefined ? entityParameters.acceleration : new THREE.Vector3(0,0,0);
	entity.position =     entityParameters.position     !== undefined ? entityParameters.position     : new THREE.Vector3(0,0,0);
	
	/*Static Parameters that should not be updated as parameters*/
	entity.clock = new THREE.Clock();
	entity.delta = 0;
	entity.upad = 0;
	
	entity.loop = function(){
		setTimeout(function(){
			entity.upad += 1;
			if (entity.upad > 1){entity.upad = 0;}
			console.log(entity);
			GameObject.UpdateSpriteFrame(entity.mesh.geometry, entity.upad);
			window.requestAnimationFrame(entity.loop);
		}, (175 / GameObject.TimeScale));
	}

	entity.loop();
	entity.boundingbox.material.color = entity.playable == false ? new THREE.Color(0xff0000) : new THREE.Color(0x00ff00);
//	entity.boundingbox.visible = false;
	
	entity.AABB = {min: new THREE.Vector2(entity.position.x-1,entity.position.y-1),max:new THREE.Vector2(entity.position.x,entity.position.y)};
	
	entity.mesh.position.copy(entity.position);
	entity.mesh.position.y -= 1;
	entity.mesh.position.x -= 1;
	
	entity.boundingbox.position.copy(entity.position);
	entity.boundingbox.position.y -= 0.5;
	entity.boundingbox.position.x -= 0.5;
	
	entity.boundingbox.geometry.computeFaceNormals();
	entity.boundingbox.geometry.computeMorphNormals();
	entity.boundingbox.geometry.computeVertexNormals();
	entity.mesh.geometry.computeBoundingBox();
		
	console.log(entity.mesh);
	
	scene.add(entity.mesh, entity.boundingbox);
	
	GameObject.PhysicsEntities.push(entity);
}