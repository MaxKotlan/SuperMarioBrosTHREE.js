/*Physics Engine Based on http://s276.photobucket.com/user/jdaster64/media/smb_playerphysics.png.html*/

/*Function Initiates Physics*/
GameObject.InitPhysics = function(){
	GameObject.PhysicsRefreshRate = 1/60;
	GameObject.PhysicsGravity = -9.931;
	GameObject.PhysicsEntities = [];
}

/*Loop That Calcualtes Game Physics*/
GameObject.PhysicsUpdate = function(){
	setTimeout(function(){
	   for (var i = 0; i < GameObject.PhysicsEntities.length; i++){
	      GameObject.CalculatePhysicsFrameOfEntity(GameObject.PhysicsEntities[i]);
	   }
	   window.requestAnimationFrame(GameObject.PhysicsUpdate);
	},(GameObject.PhysicsRefreshRate * 1000));
}

/*Used to Calcualte the position of an object*/
GameObject.CalculatePhysicsFrameOfEntity = function(entity){
	var force = new THREE.Vector2(0,0);
   /*If the player is Human or NPC*/
   switch (entity.playable){
      case true:
			force.y = GameObject.PhysicsGravity * GameObject.PhysicsRefreshRate;
			force.y += keyboard.pressed("W") ? 0.2: 0;
			force.x += keyboard.pressed("D") ?  0.01 : 0;
			force.x += keyboard.pressed("A") ? -0.01 : 0;
			entity.force.y = force.y;
			entity.force.x = force.x;
			entity.velocity.add(entity.acceleration.copy(entity.force.divideScalar(entity.mass)));
			entity.velocity.x = entity.velocity.x >  entity.Maxspeed ?  entity.Maxspeed : entity.velocity.x;
			entity.velocity.x = entity.velocity.x < -entity.Maxspeed ? -entity.Maxspeed : entity.velocity.x;
			entity.position.add(entity.velocity);
			entity.position.x = entity.physicsRound === true ? Math.max( Math.round(entity.position.x * entity.RoundingNumber) / entity.RoundingNumber, 2.8 ) : entity.position.x;
			entity.position.y = entity.physicsRound === true ? Math.max( Math.round(entity.position.y * entity.RoundingNumber) / entity.RoundingNumber, 2.8 ) : entity.position.y;
		//	console.log(entity.position.x);
			impulseResolution(checkBlockUsingVoxelMap(entity), entity);
		//	console.log(entity.velocity.x);
			UpdateMeshAndBoundingBox(entity);
         break;
      case false:
			entity.acceleration.y = GameObject.PhysicsGravity * GameObject.PhysicsRefreshRate;
            entity.position.add(entity.velocity.add(entity.acceleration));
			entity.position.x = entity.physicsRound == true ? Math.max( Math.round(entity.position.x * entity.RoundingNumber) / entity.RoundingNumber, 2.8 ) : entity.position.x;
			entity.position.y = entity.physicsRound == true ? Math.max( Math.round(entity.position.y * entity.RoundingNumber) / entity.RoundingNumber, 2.8 ) : entity.position.y;
			impulseResolution(checkBlockUsingVoxelMap(entity), entity);
			updateEntityAABB(entity);
			UpdateMeshAndBoundingBox(entity);
			
		//	console.log(entity);
         break;
   }
   
   function updateAABB(entity){
	   
   }
   
   function AABBvsAABB(a,b){
	  // Exit with no intersection if found separated along an axis
	//  if(a.max.x < b.min.x or a.min.x > b.max.x) {return false;}
	 // if(a.max.y < b.min.y or a.min.y > b.max.y) {return false;}
	 
	  // No separating axis found, therefor there is at least one overlapping axis
	  return true;
   }
   
   function updateEntityAABB(entity){
		entity.AABB = {min: new THREE.Vector2(entity.position.x-1,entity.position.y-1),max:new THREE.Vector2(entity.position.x,entity.position.y)};
   }
   
   function impulseResolution(collision, entity){
		if (collision.inside == true){
	//	   var bounciness = entity.restitution == 0 ? entity.velocity.y : entity.restitution;
			
			entity.position.set(entity.position.x+1*entity.velocity.x,entity.position.y+-1*entity.velocity.y,entity.position.z);
			entity.velocity.set(1*entity.velocity.x,-1*(entity.velocity.y/entity.restitution),0);
			entity.position.x = entity.physicsRound == true ? Math.max( Math.round(entity.position.x * entity.RoundingNumber) / entity.RoundingNumber, 2.8 ) : entity.position.x;
			entity.position.y = entity.physicsRound == true ? Math.max( Math.round(entity.position.y * entity.RoundingNumber) / entity.RoundingNumber, 2.8 ) : entity.position.y;
			
		}
   }
   
   function checkBlockUsingVoxelMap(entity){
	   var collision = {inside: false, x: false};
	   if ((map[getblock(Math.ceil(entity.position.x)  , Math.floor(entity.position.y)  , 1)].air) == false){collision.inside = true;};
	   if ((map[getblock(Math.ceil(entity.position.x)  , Math.floor(entity.position.y)  , 2)].air) == false){collision.inside = true;};
	   if ((map[getblock(Math.ceil(entity.position.x)-1, Math.floor(entity.position.y)  , 1)].air) == false){collision.inside = true;};
	   if ((map[getblock(Math.ceil(entity.position.x)-1, Math.floor(entity.position.y)  , 2)].air) == false){collision.inside = true;};
	   if ((map[getblock(Math.ceil(entity.position.x)  , Math.floor(entity.position.y)+1, 1)].air) == false){collision.inside = true;};
	   if ((map[getblock(Math.ceil(entity.position.x)  , Math.floor(entity.position.y)+1, 2)].air) == false){collision.inside = true;};
	   if ((map[getblock(Math.ceil(entity.position.x)-1, Math.floor(entity.position.y)+1, 1)].air) == false){collision.inside = true;};
	   if ((map[getblock(Math.ceil(entity.position.x)-1, Math.floor(entity.position.y)+1, 2)].air) == false){collision.inside = true;};
	   
	   return collision;
   }
   
   /*Updates the position of the boundingbox, and the mesh*/
   function UpdateMeshAndBoundingBox(entity){
      entity.mesh.position.copy(entity.position);
   	entity.mesh.position.y -= 1;
   	entity.mesh.position.x -= 1;
   	
   	entity.boundingbox.position.copy(entity.position);
   	entity.boundingbox.position.y -= 0.5;
   	entity.boundingbox.position.x -= 0.5;
	entity.boundingbox.position.z = 0.001;
   }
   
   /*Checks for collisions with all other entities and static geometry*/
   function CheckifTouch(entity){
	var intersection = {top: false, bottom: false, left: false, right: false};
   	for (var i = 0; i < 4; i++){
   	   var raycaster = new THREE.Raycaster();
   	   
   	   var faceCenter;
   	   var faceCenterIndex = [];
   	   var rayIndex        = [];
   	   
   	   faceCenter   = new THREE.Vector3(0,0,0);
   	   faceCenter.copy(entity.position);
   	   
   	   faceCenterIndex[0] = new THREE.Vector3( 0, 0  , 0);
   	   faceCenterIndex[1] = new THREE.Vector3(-1, 0  , 0);
   	   faceCenterIndex[2] = new THREE.Vector3( 0  , 0, 0);
   	   faceCenterIndex[3] = new THREE.Vector3( 0  ,-1, 0);
   	   
   	   rayIndex[0] = new THREE.Vector3( 0.1, 0, 0 );
   	   rayIndex[1] = new THREE.Vector3(-0.1, 0, 0 );
   	   rayIndex[2] = new THREE.Vector3( 0.1, 0.1, 0 );
   	   rayIndex[3] = new THREE.Vector3( 0.1,-0.1, 0 );
         
         faceCenter.add(faceCenterIndex[i]);
         
         raycaster.set(faceCenter, rayIndex[i]);
         raycaster.far = 0.1;
         
       //  console.log(raycasterVert);
		 if (GameObject.WorldGeom == undefined){
			  break;
		 }
	   
		 GameObject.ArrayOfPhysicsObjects[0] = GameObject.WorldGeom.STATIC;
         
         var intersects = raycaster.intersectObjects(GameObject.ArrayOfPhysicsObjects);

         if (intersects.length > 0){
			switch(i){
				case 0:
					intersection.right = true;
					break;
				case 1:
					intersection.left = true;
					break;
				case 2:
					intersection.top = true;
					break;
				case 3:
					intersection.bottom = true;
					break;
			}
		}
   	}
	return intersection;
   }
}

GameObject.UpdateEntities = function(){
	GameObject.ArrayOfPhysicsObjects = [];
	GameObject.ArrayOfPhysicsObjects[0] = null;
	for (var i = 0; i < GameObject.PhysicsEntities.length; i++){
		GameObject.ArrayOfPhysicsObjects.push(GameObject.PhysicsEntities[i].boundingbox);
		console.log(GameObject.ArrayOfPhysicsObjects);
	}
}


