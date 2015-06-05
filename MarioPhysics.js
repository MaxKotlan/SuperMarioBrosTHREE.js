/*Physics Engine Based on http://s276.photobucket.com/user/jdaster64/media/smb_playerphysics.png.html*/

GameObject.PhysicsUpdate = function(){
		setTimeout(function(){ 
	  	if (keyboard.pressed("L")){
				console.log("----------------");
				console.log("NewDelta:" + GameObject.PhysicsNewDelta);
				console.log("OldDelta:" + GameObject.PhysicsOldDelta);
			}
			window.requestAnimationFrame(GameObject.PhysicsUpdate);
			GameObject.PhysicsNewDelta = GameObject.PhysicsClock.getDelta();
			
			
			
			var forceTop = -convertToNumber("00700");
			
				if (GameObject.PhysicsMario_Velocity.x > 0 & GameObject.PhysicsMario_Direction == "backward"){
					GameObject.PhysicsMario_Direction = "forward";
					player1.updateTexture(0, GameObject.PhysicsMario_Direction);
				} else if (GameObject.PhysicsMario_Velocity.x < 0 & GameObject.PhysicsMario_Direction == "forward"){
					GameObject.PhysicsMario_Direction = "backward";
					player1.updateTexture(0, GameObject.PhysicsMario_Direction);
				} 
				
			if (ifBlock("down") & GameObject.PhysicsMario_Velocity.y < 0){
				var forceBottom = Math.abs(forceTop);
				GameObject.PhysicsMario_Velocity.y = 0;
				GameObject.PhysicsMario_Position.y = Math.round(GameObject.PhysicsMario_Position.y);
				player1.updateTexture(0, GameObject.PhysicsMario_Direction);
			} else if (ifBlock("down")) {
				var forceBottom = Math.abs(forceTop);
				GameObject.PhysicsMario_Velocity.y = 0;
			} else {
				forceBottom = 0;
			}
			
			
			if (keyboard.pressed("W") & GameObject.PhysicsMario_Acceleration.y == 0 & GameObject.PhysicsMario_Acceleration.y <= convertToNumber("04800")){
				forceBottom += convertToNumber("04800");
				player1.updateTexture(4, GameObject.PhysicsMario_Direction);
			}
			if (keyboard.pressed("W") & GameObject.PhysicsMario_Velocity.y > 0){
				forceTop += convertToNumber("00490")
			}
			
			
			var forceLeft   =    0;
			var forceRight  =    0;
			
			if (keyboard.pressed("A")){
				forceLeft = -convertToNumber("00098");
			} else if (GameObject.PhysicsMario_Velocity.x < -convertToNumber("000A0")){
				forceRight = convertToNumber("000A0");
				console.log(forceRight);
			} else if (GameObject.PhysicsMario_Velocity.x < 0) {
				forceLeft   =    0;
				GameObject.PhysicsMario_Velocity.x = 0;
			}
			
			if (keyboard.pressed("D")){
				forceRight = convertToNumber("00098");
			} else if (GameObject.PhysicsMario_Velocity.x > convertToNumber("000A0")){
				forceLeft = -convertToNumber("000A0");
			} else if (GameObject.PhysicsMario_Velocity.x > 0 ){
				forceRight   =   0;
				GameObject.PhysicsMario_Velocity.x = 0;
			}
			
			if (GameObject.PhysicsMario_Velocity.x > 0 & GameObject.PhysicsMario_Velocity.x < 0 & true == false){
		//		player1.runningAnimationIndex = player1.runningAnimationIndex + 1;
		//		if (player1.runningAnimationIndex >= 4){
		//			player1.runningAnimationIndex = 1;
		//		}
					player1.runningAnimationIndex += 1;
					if (player1.runningAnimationIndex >= 4){
						player1.runningAnimationIndex = 1;
					}
					player1.updateTexture(player1.runningAnimationIndex,  GameObject.PhysicsMario_Direction);
			}
			
			if (keyboard.pressed("C")){
			//	console.log(convertToNumber("00010"));
	//		console.log(GameObject.PhysicsMario_Velocity);
			console.log(GameObject.PhysicsMario_AverageAcceleration);
			console.log(GameObject.PhysicsNewDelta * 1);
			//	sceene.remove(GameObject.Blockern);
				GameObject.Blockern = GameObject.createAnimatedBlock();
				
				marol();
				function marol(){
					for (var l = 0; l < GameObject.Blockern.geometry.faceVertexUvs[0].length; l++){
						for (var q = 0; q < GameObject.Blockern.geometry.faceVertexUvs[0][l].length; q++){
							var u = GameObject.Blockern.geometry.faceVertexUvs[0][l][q].x;
							var v = GameObject.Blockern.geometry.faceVertexUvs[0][l][q].y;
							
							GameObject.Blockern.geometry.faceVertexUvs[0][l][q] = GameObject.getUVmapCords(4, u, v);
						}
					}
				}
		//		addHexaDecimal("1", "E");
				//	var inter = 0.625;
				//	console.log( inter.toString(16));
			//	console.log(GameObject.PhysicsMario_Velocity.x )
			//	console.log(forceLeft);
			}
			if (keyboard.pressed("P")){
				GameObject.Blockern.position.y += 1/16;
			}
			if (keyboard.pressed("L")){
				GameObject.Blockern.position.y -= 1/16;
			}
			
			if (GameObject.PhysicsMario_Velocity.y >= convertToNumber("04800")){
				forceBottom = 0;
			}
			if (GameObject.PhysicsMario_Acceleration.y <= -convertToNumber("04800")){
				forceTop = 0;
			}
			
			var totalforceY = forceTop + forceBottom;
			var totalforceX = 0;
			
			if (GameObject.PhysicsMario_Velocity.x >= convertToNumber("01900") & keyboard.pressed("D")){
				totalforceX = 0;
			} else if (GameObject.PhysicsMario_Velocity.x <= -convertToNumber("01900") & keyboard.pressed("A")) {
				totalforceX = 0;
			} else {
				totalforceX = forceLeft + forceRight;
			}
			GameObject.PhysicsMario_OldAcceleration = GameObject.PhysicsMario_Acceleration;
			GameObject.PhysicsMario_Acceleration = new THREE.Vector2(totalforceX, totalforceY);
			GameObject.PhysicsMario_AverageAcceleration = new THREE.Vector2( 
					(GameObject.PhysicsMario_Acceleration.x + GameObject.PhysicsMario_OldAcceleration.x) / 2,
					(GameObject.PhysicsMario_Acceleration.y + GameObject.PhysicsMario_OldAcceleration.y) / 2
			);
			GameObject.PhysicsMario_Velocity.add(
				new THREE.Vector2(
						GameObject.PhysicsMario_AverageAcceleration.x + (GameObject.PhysicsMario_OldAcceleration.x * GameObject.PhysicsNewDelta),
						GameObject.PhysicsMario_AverageAcceleration.y + (GameObject.PhysicsMario_OldAcceleration.y * GameObject.PhysicsNewDelta)
				)
			);
			GameObject.PhysicsMario_Position.x += GameObject.PhysicsMario_Velocity.x; //+ (GameObject.PhysicsMario_Velocity.x * GameObject.PhysicsNewDelta);
			GameObject.PhysicsMario_Position.y += GameObject.PhysicsMario_Velocity.y; //+ (GameObject.PhysicsMario_Velocity.y * GameObject.PhysicsNewDelta);
			
		//	console.log("------------------");
		//	console.log("Acceleration: " + GameObject.PhysicsMario_Acceleration.y);
		//	console.log("Velocity: " + GameObject.PhysicsMario_Velocity.y);
		//	console.log("Position: " + GameObject.PhysicsMario_Position.y);
			
			player1.mesh.position.x = GameObject.PhysicsMario_Position.x;
			player1.mesh.position.y = GameObject.PhysicsMario_Position.y;
			
			//controls();
			GameObject.PhysicsOldDelta = GameObject.PhysicsClock.getDelta();
			
			function ifBlock(blockOrrientation){
				var raycasterPhys1 = new THREE.Raycaster();
				var raycasterPhys2 = new THREE.Raycaster();
				var vertices = [];
				
				for ( var szc = 0; szc < 4; szc++ ){
					vertices[szc] = new THREE.Vector3(
						player1.mesh.geometry.vertices[szc].x,
						player1.mesh.geometry.vertices[szc].y
						
					);
					vertices[szc].add(player1.mesh.position);
				}
				vertices[0].add(new THREE.Vector3(+0.95  , +0.95 ,0));
				vertices[1].add(new THREE.Vector3(-0.95  , +0.95 ,0));
				vertices[2].add(new THREE.Vector3(+0.95  , -0.95 ,0));
				vertices[3].add(new THREE.Vector3(-0.95  , -0.95 ,0));
				
				raycasterPhys1.far = 1;
				raycasterPhys2.far = 1;

				switch (blockOrrientation){
					case "right":
							raycasterPhys1.set(vertices[3], new THREE.Vector3(1,0,0));
							raycasterPhys2.set(vertices[1], new THREE.Vector3(1,0,0));
						break;
					case "left":
							raycasterPhys1.set(vertices[0], new THREE.Vector3(-1,0,0));
							raycasterPhys2.set(vertices[2], new THREE.Vector3(-1,0,0));
						break;
					case "up":
							raycasterPhys1.set(vertices[3], new THREE.Vector3( 0,1,0));
							raycasterPhys2.set(vertices[2], new THREE.Vector3( 0,1,0));
						break;
					case "down":
							raycasterPhys1.set(vertices[0], new THREE.Vector3( 0,-1,0));
							raycasterPhys2.set(vertices[1], new THREE.Vector3( 0,-1,0));
						break;
				}
				
					var objects = [];
					objects[0] = GameObject.WorldGeom.STATIC;
					objects[1] = GameObject.meshTempor;
					
					var intersects1 = raycasterPhys1.intersectObjects(objects);
					var intersects2 = raycasterPhys2.intersectObjects(objects);
					
					if (keyboard.pressed("P")){
						console.log(vertices);
						console.log(intersects1);
					}
					
					if (intersects1.length > 0 | intersects2.length > 0){
						return true;
						
					} else {
						return false;
					}

			}
			
			function controls(){
				var delta = clock.getDelta();
				var blockBel, blockBov, blockLeft, blockRight;
				
				var block = {};
				
				block.up    = ifBlock("up");
				block.down  = ifBlock("down");
				block.left  = ifBlock("left");
				block.right = ifBlock("right");
				
				
				
				if (keyboard.pressed("D") & block.right == false){
					//console.log(delta);
					player1.mesh.position.x += (1 + GameObject.PhysicsNewDelta * 60) * 0.1;
					
				}
              
				if (keyboard.pressed("A") & block.left == false){
					player1.mesh.position.x -= 0.1;
				}
							
				if (keyboard.pressed("W") & block.up == false){
					forceHorizontal += 1 + GameObject.PhysicsNewDelta * 60;
					console.log(forceHorizontal);
				} 
				if (block.down  == false){
					forceHorizontal -= (0.1) * forceHorizontal;
				}
				
				if (keyboard.pressed("S") & block.down == false){
					player1.mesh.position.y -= 0.1;
				}
				if (keyboard.pressed("G")){
					scene.remove(GameObject.WorldGeom.STATIC);
				}
				if (keyboard.pressed("R")){
					GameObject.Regenerate();
				}

         player1.mesh.position.y = forceHorizontal;
				 GameObject.PhysicsOldDelta = GameObject.PhysicsClock.getDelta();
			} 
			
			function convertToNumber(input){
					
				var length = input.length;
				var total = 0;
				
				for (var i = 0; i < length; i++){
					var digit = (''+input)[i];
					if (isNaN(parseInt(digit, 10))) {
						digit = "0x" + digit;
					}
					var formula = (1 * digit) / Math.pow((16/1), i);
					total = total + formula;
				}
		//		console.log(total);
				return total;
		//		console.log(acceleration2);
			}
			
			function addHexaDecimal(hex1, hex2){
				var length = hex1.length;
				var newHexDigit = [];
				for (var i = 0; i < length; i++){
					var digit1 = (''+hex1)[i];
					var digit2 = (''+hex2)[i];
					if (isNaN(parseInt(digit1, 10))) {
						digit1 = "0x" + digit1;
					}
					if (isNaN(parseInt(digit2, 10))) {
						digit2 = "0x" + digit2;
					}
					newHexDigit[i] = (1 * digit1) + (1 * digit2);
				
					console.log(kali);
				}
				
				function addHexColor(c1, c2) {
					var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
					while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
					return hexStr;
				}
		//		return total;
			}
			
		}, (1/(60 * 60)) * 1000);
}

	


