/*Physics Engine Based on http://s276.photobucket.com/user/jdaster64/media/smb_playerphysics.png.html*/

/*Loop That Calcualtes Game Physics*/
GameObject.PhysicsUpdate = function(){
   GameObject.PhysicsRefreshRate = 1/60;
	setTimeout(function(){
	   GameObject.CalculatePhysicsFrame();
	   window.requestAnimationFrame(GameObject.PhysicsUpdate);
	},(GameObject.PhysicsRefreshRate * 1000));
}

/*Used to Calcualte the position of all objects*/
GameObject.CalculatePhysicsFrame = function(){
   
}


