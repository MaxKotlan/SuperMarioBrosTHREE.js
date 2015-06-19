/*Physics Engine Based on http://s276.photobucket.com/user/jdaster64/media/smb_playerphysics.png.html*/

/*Function Initiates Physics*/
GameObject.InitPhysics = function(){
	GameObject.PhysicsRefreshRate = 1/60; //don't understand why. 1/90 is actually 1/60. 1/60 takes .03 instead of .016. 1/90 is .016??? should be 0.011
	GameObject.PhysicsGravity = -9.01;
	GameObject.PhysicsEntities = [];
}

/*Loop That Calcualtes Game Physics*/
GameObject.PhysicsUpdate = function(){
	setTimeout(function(){
	   var clock = new THREE.Clock();
	   for (var i = 0; i < GameObject.PhysicsEntities.length; i++){
	      GameObject.CalculatePhysicsFrameOfEntity(GameObject.PhysicsEntities[i]);
	   }
	   window.requestAnimationFrame(GameObject.PhysicsUpdate);
	},(GameObject.PhysicsRefreshRate-clock.delta * 1000));
}

/*Used to Calcualte the position of an object*/
GameObject.CalculatePhysicsFrameOfEntity = function(entity){
	var force = new THREE.Vector2(0,0);
	entity.delta = entity.clock.getDelta();
   /*If the player is Human or NPC*/
   switch (entity.playable){
      case true:
			/*Calculate Force*/
			force.y = GameObject.PhysicsGravity;
			force.y += keyboard.pressed("W") ? 10.1: 0;
			force.x += keyboard.pressed("D") ?  0.5 : 0;
			force.x += keyboard.pressed("A") ? -0.01 : 0;
			entity.force.y = force.y;
			entity.force.x = force.x;
			/*Calculate Position*/
			var last_acceleration = entity.acceleration;
			entity.position.x += entity.velocity.x * entity.delta + ( 0.5 * last_acceleration.x * Math.pow(entity.delta,2));
			entity.position.y += entity.velocity.y * entity.delta + ( 0.5 * last_acceleration.y * Math.pow(entity.delta,2));
			/*----Calculation for next frame starts here. Position has already been moved----*/
			var new_acceleration = new THREE.Vector3(entity.force.x / entity.mass, entity.force.y / entity.mass, 0);
			var avg_acceleration = new THREE.Vector3((last_acceleration.x + new_acceleration.x ) / 2,(last_acceleration.y + new_acceleration.y ) / 2,0);
			entity.velocity.x += avg_acceleration.x * entity.delta;
			entity.velocity.y += avg_acceleration.y * entity.delta;
				console.log("delta: " + entity.delta);
				//console.log("newAccel: x:"+new_acceleration.x  +" y:"+new_acceleration.y  +" z:"+new_acceleration.z  );
				//console.log("LasAccel: x:"+last_acceleration.x +" y:"+last_acceleration.y +" z:"+last_acceleration.z );
				//console.log("avgAccel: x:"+avg_acceleration.x  +" y:"+avg_acceleration.y  +" z:"+avg_acceleration.z  );
				//console.log("velocity: x:"+entity.velocity.x   +" y:"+entity.velocity.y   +" z:"+entity.velocity.z   );
				//console.log("position: x:"+entity.position.x   +" y:"+entity.position.y   +" z:"+entity.position.z   );
				console.log("------------------------------------         ");
			entity.acceleration.copy(avg_acceleration);
			
			/*Max velocity, acceleration etc.*/
		//	entity.velocity.x = entity.velocity.x >  entity.Maxspeed ?  entity.Maxspeed : entity.velocity.x;
		//	entity.velocity.x = entity.velocity.x < -entity.Maxspeed ? -entity.Maxspeed : entity.velocity.x;
		//	entity.position.x = entity.physicsRound === true ? Math.max( Math.round(entity.position.x * entity.RoundingNumber) / entity.RoundingNumber, 2.8 ) : entity.position.x;
		//	entity.position.y = entity.physicsRound === true ? Math.max( Math.round(entity.position.y * entity.RoundingNumber) / entity.RoundingNumber, 2.8 ) : entity.position.y;
		
			impulseResolution(checkBlockUsingVoxelMap(entity), entity);
			UpdateMeshAndBoundingBox(entity);
         break;
      case false:
			force.y = GameObject.PhysicsGravity;
			entity.force.y = force.y;
			entity.force.x = force.x;
			/*Calculate Position*/
			var last_acceleration = entity.acceleration;
			entity.position.x += entity.velocity.x * entity.delta + ( 0.5 * last_acceleration.x * Math.pow(entity.delta,2));
			entity.position.y += entity.velocity.y * entity.delta + ( 0.5 * last_acceleration.y * Math.pow(entity.delta,2));
			/*----Calculation for next frame starts here. Position has already been moved----*/
			var new_acceleration = new THREE.Vector3(entity.force.x / entity.mass, entity.force.y / entity.mass, 0);
			var avg_acceleration = new THREE.Vector3((last_acceleration.x + new_acceleration.x ) / 2,(last_acceleration.y + new_acceleration.y ) / 2,0);
			entity.velocity.x += avg_acceleration.x * entity.delta;
			entity.velocity.y += avg_acceleration.y * entity.delta;
			entity.acceleration.copy(avg_acceleration);
		//	
		//	entity.position.x = entity.physicsRound == true ? Math.max( Math.round(entity.position.x * entity.RoundingNumber) / entity.RoundingNumber, 2.8 ) : entity.position.x;
		//	entity.position.y = entity.physicsRound == true ? Math.max( Math.round(entity.position.y * entity.RoundingNumber) / entity.RoundingNumber, 2.8 ) : entity.position.y;
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
			/*
			   entity.position = A
			   Math.ceil(entity.position.x), Math.floor(entity.position.y) = B
			   
			   V=B-A
			
			*/
			//entity.position.set(entity.position.x+1*entity.velocity.x,entity.position.y+-1*entity.velocity.y,entity.position.z);
			entity.position.y += -entity.position.y+Math.round(entity.position.y);
			entity.velocity.x =  entity.restitution*entity.velocity.x;
			entity.velocity.y = -entity.restitution*entity.velocity.y;
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


