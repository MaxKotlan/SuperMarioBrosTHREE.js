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
	   GameObject.CalculatePhysicsFrame();
	   window.requestAnimationFrame(GameObject.PhysicsUpdate);
	},(GameObject.PhysicsRefreshRate * 1000));
}

/*Used to Calcualte the position of all objects*/
GameObject.CalculatePhysicsFrame = function(){
	for (var i = 0; i < GameObject.PhysicsEntities.length; i++){
		CalculateObjectPhysics(GameObject.PhysicsEntities[i]);
	}
	/*Function*/
	function CalculateObjectPhysics(entity){
		
	}
}




