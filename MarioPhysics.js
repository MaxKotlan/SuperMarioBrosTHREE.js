/*Physics Engine Based on http://s276.photobucket.com/user/jdaster64/media/smb_playerphysics.png.html*/

/*Function Initiates Physics*/
GameObject.InitPhysics = function(){
	GameObject.PhysicsRefreshRate = 1/60;
	GameObject.PhysicsEntities = [];
	GameObject.PhysicsUpdate();
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
      //      console.log(entity.boundingbox);
         break;
      case false:
            entity.position.add(entity.velocity.add(entity.acceleration));
            CheckifTouch(entity);
            UpdateMeshAndBoundingBox(entity);
         break;
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
   	for (var i = 0; i < 4; i++){
   	   var raycaster = new THREE.Raycaster();
   	   
   	   var faceCenter;
   	   var faceCenterIndex = [];
   	   var rayIndex        = [];
   	   
   	   faceCenter   = new THREE.Vector3(0,0,0);
   	   faceCenter.copy(entity.position);
   	   
   	   faceCenterIndex[0] = new THREE.Vector3( 0.5, 0  , 0);
   	   faceCenterIndex[1] = new THREE.Vector3(-0.5, 0  , 0);
   	   faceCenterIndex[2] = new THREE.Vector3( 0  , 0.5, 0);
   	   faceCenterIndex[3] = new THREE.Vector3( 0  ,-0.5, 0);
   	   
   	   rayIndex[0] = new THREE.Vector3( 1, 0, 0 );
   	   rayIndex[1] = new THREE.Vector3(-1, 0, 0 );
   	   rayIndex[2] = new THREE.Vector3( 1, 1, 0 );
   	   rayIndex[3] = new THREE.Vector3( 1,-1, 0 );
         
         faceCenter.add(faceCenterIndex[i]);
         
         raycaster.set(faceCenter, rayIndex[i]);
         raycaster.far = 0.1;
         
       //  console.log(raycasterVert);
         
         if (GameObject.WorldGeom == undefined){
            break;
         }
         
         var objects = [];
			objects[0] = GameObject.WorldGeom.STATIC;
         
         var intersects = raycaster.intersectObjects(objects);

         if (intersects.length > 0){
				entity.velocity.x = -1*(entity.velocity.x);
			}
   	}
   }
}



