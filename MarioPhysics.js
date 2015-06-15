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
   /*If the player is Human or NPC*/
   switch (entity.playable){
      case true:
			entity.force.y += GameObject.PhysicsGravity;
			console.log(entity.position.add(entity.velocity.add(entity.acceleration.copy(entity.force.divideScalar(entity.mass)))));
			impulseResolution(checkBlockUsingVoxelMap(entity), entity);
			UpdateMeshAndBoundingBox(entity);
         break;
      case false:
            entity.position.add(entity.velocity.add(entity.acceleration));
          //  updateAABB(entity);
		//	AABBvsAABB(entity.AABB, entity.AABB);
			impulseResolution(checkBlockUsingVoxelMap(entity), entity);
			UpdateMeshAndBoundingBox(entity);
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
   
   function impulseResolution(collision, entity){
		if (collision.inside == true){
			entity.position.set(entity.position.x-1*entity.velocity.x,entity.position.y+-1*entity.velocity.y,entity.position.z);
			entity.velocity.set(1*entity.velocity.x,-1*entity.velocity.y/2,0);
		}
   }
   
   function checkBlockUsingVoxelMap(entity){
	   var collision = {inside: false};
	   
	   if ((map[getblock(Math.ceil(entity.position.x)  , Math.floor(entity.position.y)  , 1)].air) == false){collision.inside = true;};
	   if ((map[getblock(Math.ceil(entity.position.x)  , Math.floor(entity.position.y)  , 2)].air) == false){collision.inside = true;};
	   
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


