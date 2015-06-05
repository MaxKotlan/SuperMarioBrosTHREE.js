
	function loadLevel(levelname){

            
			GameObject.Regenerate = function (){
				var geometry = new THREE.Geometry();
				var selfGenGeom = new THREE.Geometry();
				var pipes;
				var forageGeom = new THREE.Geometry();
				var dynamicGeom = new THREE.Geometry();
				var specialvert = [];
    //            map[getblock(3,3,3)].air = false;
								var uvs = [];
                calculateMajorTriangle();
								
                function calculateMajorTriangle(){
                for (var z = 1; z <= mapDepth; z++){
                  for (var y = 1; y <= mapHeight; y++){
                    for (var x = 1; x <= mapWidth; x++){
                      /*nz is the conversion of fakez coordinates to realworld coordinates*/
                      var nz = -z + 1;
											var blockOffset = map[getblock(x,y,z)].offsetPOS;
										
											var blk = {
												current: getblock(x  ,y  ,z  ), // id of current block
												left:    getblock(x-1,y  ,z  ), // id of block left
												right:   getblock(x+1,y  ,z  ), // id of block right
												above:   getblock(x  ,y+1,z  ), // id of block above
												below:   getblock(x  ,y-1,z  ), // id of block below
												back:    getblock(x  ,y  ,z-1), // id of block it back
												front:   getblock(x  ,y  ,z+1), // id of block in front
												
												right_front:  getblock(x+1, y ,z+1 ),
												right_back:   getblock(x+1, y ,z-1 )
											}
											
											/*Static Geometry*/
                      if (map[blk.current].air === false){
												var geometryClass;
												if (map[blk.current].dynamic == false){
													geometryClass = selfGenGeom;
												} else {
													geometryClass = dynamicGeom;
												}
                        if (x > 1){
                          if (map[blk.left].air === true & map[blk.current].faceEnab.left == true | map[blk.left].dynamic == true & map[blk.current].dynamic == false) {
														
													 var vertices=[];
													 
													 /*Calculates Vertices*/
													 vertices[0] = new THREE.Vector3(x-1, y-1,    nz);
													 vertices[1] = new THREE.Vector3(x-1, y  ,    nz);
													 vertices[2] = new THREE.Vector3(x-1, y-1,  nz-1);
													 vertices[3] = new THREE.Vector3(x-1, y  ,  nz-1);
													
													 /*Offsets The Vertices based on the block offset in the map*/
													 vertices[0].add(blockOffset);
													 vertices[1].add(blockOffset);
													 vertices[2].add(blockOffset);
													 vertices[3].add(blockOffset);
													 
														
													 /*Pushes the Vertices to the Geometry*/
													 geometryClass.vertices.push(vertices[0]);
													 geometryClass.vertices.push(vertices[1]);
													 geometryClass.vertices.push(vertices[2]);
													 geometryClass.vertices.push(vertices[3]);
													 
													 /*Gets the correct uv for the material of the block*/
													 uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1, 0));
													 uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1, 1));
													 uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0, 0));
													 uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0, 1));
													 
													 /*Calculates the the offset of the specific instance of verttices and uv*/
													 var offset = geometryClass.vertices.length - 4;
													 var uvoffset = uvs.length - 4;
													 
													 /*Pushes The Faces to the geometry*/
													 geometryClass.faces.push( new THREE.Face3( offset    , offset +1 , offset + 2 ) );
													 geometryClass.faces.push( new THREE.Face3( offset + 1, offset +3 , offset + 2 ) );
													 
													 /*THESE UV MAPS DIFFER, because they are rotated*/
													geometryClass.faceVertexUvs[0].push( [uvs[uvoffset + 0], uvs[uvoffset + 1], uvs[uvoffset + 2]] );
													geometryClass.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 3], uvs[uvoffset + 2]] );
													 
                          }
                        }
												if (x < mapWidth){
													 if (map[blk.right].air === true & map[blk.current].faceEnab.right == true | map[blk.right].dynamic == true & map[blk.current].dynamic == false) {
												
														var vertices=[];
														
														vertices[0] = new THREE.Vector3(x, y  , nz  );
														vertices[1] = new THREE.Vector3(x, y-1, nz  );
														vertices[2] = new THREE.Vector3(x, y  , nz-1);
														vertices[3] = new THREE.Vector3(x, y-1, nz-1);
														
														vertices[0].add(blockOffset);
														vertices[1].add(blockOffset);
														vertices[2].add(blockOffset);
														vertices[3].add(blockOffset);
														
														geometryClass.vertices.push(vertices[0], vertices[1], vertices[2], vertices[3]);
						
														uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1,0));
														uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1,1));
													  uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0,0));
														uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0,1));
													 
														var offset = geometryClass.vertices.length - vertices.length;
														var uvoffset = uvs.length - vertices.length;
													 
														geometryClass.faces.push( new THREE.Face3( offset    , offset +1 , offset + 2 ) );
														geometryClass.faces.push( new THREE.Face3( offset + 1, offset +3 , offset + 2 ) );
													 
														geometryClass.faceVertexUvs[0].push( [uvs[uvoffset + 3], uvs[uvoffset + 2], uvs[uvoffset + 1]] );
														geometryClass.faceVertexUvs[0].push( [uvs[uvoffset + 2], uvs[uvoffset + 0], uvs[uvoffset + 1]] );
													 
                          }
												}
												if (y < mapHeight){
													if (map[blk.above].air === true & map[blk.current].faceEnab.top == true | map[blk.above].dynamic == true & map[blk.current].dynamic == false) {
                            
														if (map[getblock(x,y,z)].materialID == 4){
															map[getblock(x,y,z)].materialID = 5;
														}
														
														var vertices=[];
														 
														vertices[0] = new THREE.Vector3(    x, y,       nz),
														vertices[1] =	new THREE.Vector3((x-1), y,       nz),
														vertices[2] =	new THREE.Vector3(    x, y,     nz-1),
														vertices[3] = new THREE.Vector3((x-1), y,     nz-1)
							
														vertices[0].add(blockOffset);
														vertices[1].add(blockOffset);
														vertices[2].add(blockOffset);
														vertices[3].add(blockOffset);
													
													  geometryClass.vertices.push(vertices[0]);
												  	geometryClass.vertices.push(vertices[1]);
													  geometryClass.vertices.push(vertices[2]);
													  geometryClass.vertices.push(vertices[3]);
												 
														uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1, 1));
														uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0, 1));
														uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1, 0));
														uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0, 0));
													 
													  if (map[getblock(x,y,z)].materialID == 5){
															map[getblock(x,y,z)].materialID = 4;
														}
													 
													 var offset = geometryClass.vertices.length - 4;
													 var uvoffset = uvs.length - 4;
													 
													 geometryClass.faces.push( new THREE.Face3( offset    , offset +2 , offset + 1 ) );
													 geometryClass.faces.push( new THREE.Face3( offset + 1, offset +2 , offset + 3 ) );
													 
													geometryClass.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 3]] );
													geometryClass.faceVertexUvs[0].push( [uvs[uvoffset + 3], uvs[uvoffset + 0], uvs[uvoffset + 2]] );
													 
													 
													}
												}
												if (y > 1){
														if (map[blk.below].air === true & map[blk.current].faceEnab.bottom == true | map[blk.below].dynamic == true & map[blk.current].dynamic == false) {
															
														if (map[getblock(x,y,z)].materialID == 4){
															map[getblock(x,y,z)].materialID = 5;
														}
														
														var vertices=[];
															
														vertices[0] = new THREE.Vector3(    x, (y -1),  nz),
														vertices[1] = new THREE.Vector3(    x, (y -1), nz-1),
														vertices[2] = new THREE.Vector3((x-1), (y -1),  nz),
														vertices[3] = new THREE.Vector3((x-1), (y -1), nz-1)
														
														vertices[0].add(blockOffset);
														vertices[1].add(blockOffset);
														vertices[2].add(blockOffset);
														vertices[3].add(blockOffset);
														
														geometryClass.vertices.push(vertices[0]);
														geometryClass.vertices.push(vertices[1]);
														geometryClass.vertices.push(vertices[2]);
														geometryClass.vertices.push(vertices[3]);
														
														uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1, 1));
														uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1, 0));
														uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0, 1));
														uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0, 0));
														
												    if (map[getblock(x,y,z)].materialID == 5){
															map[getblock(x,y,z)].materialID = 4;
														}
														
													 var offset = geometryClass.vertices.length - 4;
													 var uvoffset = uvs.length - 4;
													 geometryClass.faces.push( new THREE.Face3( offset    , offset +2 , offset + 1 ) );
													 geometryClass.faces.push( new THREE.Face3( offset + 1, offset +2 , offset + 3 ) );
													 
													 geometryClass.faceVertexUvs[0].push( [uvs[uvoffset + 0], uvs[uvoffset + 2], uvs[uvoffset + 1]] );
													 geometryClass.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 2], uvs[uvoffset + 3]] );
													}
												}
												if (z > 1){
													if (map[blk.back].air === true & map[blk.current].faceEnab.back == false) {
													
													var vertices = [];
													
  												vertices[0] = new THREE.Vector3(    x,      y, nz),
													vertices[1] =	new THREE.Vector3(    x, (y -1), nz),
													vertices[2] =	new THREE.Vector3((x-1),      y, nz),
													vertices[3] =	new THREE.Vector3((x-1),  (y-1), nz)
							
												  vertices[0].add(blockOffset);
													vertices[1].add(blockOffset);
													vertices[2].add(blockOffset);
													vertices[3].add(blockOffset);
														
													geometryClass.vertices.push(vertices[0]);
													geometryClass.vertices.push(vertices[1]);
													geometryClass.vertices.push(vertices[2]);
													geometryClass.vertices.push(vertices[3]);
													
													uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1, 1));
													uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1, 0));
													uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0, 1));
													uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0, 0));
													
													
													var offset = geometryClass.vertices.length - 4;
													var uvoffset = uvs.length - 4;
																	
													geometryClass.faces.push( new THREE.Face3( offset    , offset +2 , offset + 1 ) );
													geometryClass.faces.push( new THREE.Face3( offset + 1, offset +2 , offset + 3 ) );
													
													geometryClass.faceVertexUvs[0].push( [uvs[uvoffset + 0], uvs[uvoffset + 2], uvs[uvoffset + 1]] );
													geometryClass.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 2], uvs[uvoffset + 3]] );
													
													}
												} else {
													
													var vertices = [];
														
													vertices[0] =	new THREE.Vector3(    x,      y, nz);
													vertices[1]	= new THREE.Vector3(    x, (y -1), nz);
													vertices[2] = new THREE.Vector3((x-1),      y, nz);
													vertices[3] = new THREE.Vector3((x-1),  (y-1), nz);
													
													vertices[0].add(blockOffset);
													vertices[1].add(blockOffset);
													vertices[2].add(blockOffset);
													vertices[3].add(blockOffset);
													
													geometryClass.vertices.push(vertices[0]);
													geometryClass.vertices.push(vertices[1]);
													geometryClass.vertices.push(vertices[2]);
													geometryClass.vertices.push(vertices[3]);
													
													uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1, 1));
													uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1, 0));
													uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0, 1));
													uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0, 0));
																
													
													var offset = geometryClass.vertices.length - 4;
													var uvoffset = uvs.length - 4;
													
													geometryClass.faces.push( new THREE.Face3( offset    , offset +2 , offset + 1 ) );

													
													geometryClass.faces.push( new THREE.Face3( offset + 1, offset +2 , offset + 3 ) );
													
													geometryClass.faceVertexUvs[0].push( [uvs[uvoffset + 0], uvs[uvoffset + 2], uvs[uvoffset + 1]] );
													geometryClass.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 2], uvs[uvoffset + 3]] );
													var faceOffset = geometryClass.faces.length - 2;
													var color1 = new THREE.Color( 0x00FFFF);
													var color2 = new THREE.Color( 0x00FF00);
													var color3 = new THREE.Color( 0x0000FF);
													geometryClass.faces[faceOffset].color.set(0x0000FF);
													geometryClass.faces[faceOffset+1].vertexColors = [color1, color1, color1];
									//				console.log(selfGenGeom.faces[faceOffset+1].vertexColors.__proto__);
											 }
                      }
											if ((map[blk.current].transparent === true)){
												
													var vertices = [];
														
													vertices[0] =	new THREE.Vector3(    x + (map[getblock(x,y,z)].blocksx -1),      y + (map[getblock(x,y,z)].blocksy -1), nz),
													vertices[1]	= new THREE.Vector3(    x + (map[getblock(x,y,z)].blocksx -1),                                        y-1, nz),
													vertices[2] = new THREE.Vector3(    x-1,                                        y + (map[getblock(x,y,z)].blocksy -1), nz),
													vertices[3] = new THREE.Vector3(    x-1,                                                                          y-1, nz)
													
													vertices[0].add(blockOffset);
													vertices[1].add(blockOffset);
													vertices[2].add(blockOffset);
													vertices[3].add(blockOffset);
													
													forageGeom.vertices.push(vertices[0]);
													forageGeom.vertices.push(vertices[1]);
													forageGeom.vertices.push(vertices[2]);
													forageGeom.vertices.push(vertices[3]);
													
													uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1, 1));
													uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 1, 0));
													uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0, 1));
													uvs.push( GameObject.getUVmapCords(map[getblock(x,y,z)].materialID, 0, 0));
																
													
													var offset = forageGeom.vertices.length - 4;
													var uvoffset = uvs.length - 4;
													
													forageGeom.faces.push( new THREE.Face3( offset    , offset +2 , offset + 1 ) );
													
													forageGeom.faces.push( new THREE.Face3( offset + 1, offset +2 , offset + 3 ) );
													
													var faceindex = forageGeom.faces.length;
													
													if (map[blk.current].wave == true){
														specialvert.push({face: faceindex, vert:"a", waveoffset:(3*Math.random())});
														specialvert.push({face: (faceindex-1), vert:"b", waveoffset:(-3*Math.random())});
													}
													
													forageGeom.faceVertexUvs[0].push( [uvs[uvoffset + 0], uvs[uvoffset + 2], uvs[uvoffset + 1]] );
													forageGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 2], uvs[uvoffset + 3]] );
											}
											if (map[blk.current].pipe === true){
												 pipes1 = new THREE.CylinderGeometry( 0.8, 0.8, 2, 32 );
												 pipes2 = new THREE.CylinderGeometry( 1, 1, 1, 32 );
										//		 console.log("pipes");
										//		 console.log(pipes);
												 
												 if (z <= 1 ) {
													 pipe(map[blk.current].pipeHeight, new THREE.Vector3(x,y,z));
												 }
												 function pipe(height, position){
													
													var negative = [], nAngles = []; heightmid = [];
													var x, y, z;
													position.z = -Math.abs(position.z);
													position.y = position.y -1;
													heightmid[0] = 0;
													heightmid[1] = height - 14/16;
													heightmid[2] = height - 14/16;
													heightmid[3] = height;
													heightmid[4] = height;
													heightmid[5] = height - 0.2;
													heightmid[6] = height - 0.2;
												
													radius = [];
													radius[0] = 13/16;
													radius[1] = 13/16;
													radius[2] = 1;
													radius[3] = 1;
													radius[4] = 13/16;
													radius[5] = 13/16;
													radius[6] = 0;
											
													segments = 20;
													
													thetaStart =  0;
													thetaLength = Math.PI * 2;
													
													for ( i = 0; i <= (segments+2); i ++ ) {
														for (q = 0; q < 7; q++){
															var vertex = new THREE.Vector3();
															var segment = thetaStart + i / segments * thetaLength;

															vertex.x = radius[q] * Math.cos( segment ) + position.x;
															vertex.y = heightmid[q] + position.y;
															vertex.z = radius[q] * Math.sin( segment ) + position.z;
														
							//								console.log("xvertex x:" + vertex.x + "xvertex y:" + vertex.y + " xvertext z:" + vertex.z );
							//								console.log(q);
															selfGenGeom.vertices.push( vertex );
														}
														
														uvs.push( GameObject.getUVmapCords(20, 0, 0));
														uvs.push( GameObject.getUVmapCords(20, 0, 1));
														uvs.push( GameObject.getUVmapCords(20, 1, 0));
														uvs.push( GameObject.getUVmapCords(20, 1, 1));
														
														
														if (i != 0){
															var offsetRIGHT = selfGenGeom.vertices.length - (q * 2);
															var offsetLEFTT = selfGenGeom.vertices.length - q;
															var uvoffset = uvs.length - (q * 2);
						
															selfGenGeom.faces.push( new THREE.Face3( offsetLEFTT + 1, offsetLEFTT + 0, offsetRIGHT + 0));
															selfGenGeom.faces.push( new THREE.Face3( offsetRIGHT + 1, offsetLEFTT + 1, offsetRIGHT + 0));
															selfGenGeom.faces.push( new THREE.Face3( offsetRIGHT + 2, offsetLEFTT + 1, offsetRIGHT + 1));
															selfGenGeom.faces.push( new THREE.Face3( offsetLEFTT + 2, offsetLEFTT + 1, offsetRIGHT + 2));
															selfGenGeom.faces.push( new THREE.Face3( offsetLEFTT + 3, offsetLEFTT + 2, offsetRIGHT + 2));
															selfGenGeom.faces.push( new THREE.Face3( offsetRIGHT + 2, offsetRIGHT + 3, offsetLEFTT + 3));
															selfGenGeom.faces.push( new THREE.Face3( offsetRIGHT + 3, offsetRIGHT + 4, offsetLEFTT + 3));
															selfGenGeom.faces.push( new THREE.Face3( offsetRIGHT + 4, offsetLEFTT + 4, offsetLEFTT + 3));
															selfGenGeom.faces.push( new THREE.Face3( offsetRIGHT + 4, offsetLEFTT + 5, offsetLEFTT + 4));
															selfGenGeom.faces.push( new THREE.Face3( offsetLEFTT + 5, offsetRIGHT + 4, offsetRIGHT + 5));
															selfGenGeom.faces.push( new THREE.Face3( offsetLEFTT + 5, offsetRIGHT + 5, offsetRIGHT + 6));
															
															selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);
															selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 1], uvs[uvoffset + 2]]);
															selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);
															selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);
															selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);
															selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 2], uvs[uvoffset + 0], uvs[uvoffset + 3]]);
															selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);
															selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);
															selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);
															selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);
															selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);

														}
													}
													var vertices = [];
													var diameter = radius[2]*2;
													vertices[0] = new THREE.Vector3(position.x-1, position.y  ,  0);
													vertices[1] = new THREE.Vector3(position.x-1, position.y  , -diameter);
													vertices[2] = new THREE.Vector3(position.x-1, position.y+height,  0);
													vertices[3] = new THREE.Vector3(position.x-1, position.y+height, -diameter);
													
													vertices[4] = new THREE.Vector3(position.x+diameter-1, position.y+height,  0);
													vertices[5] = new THREE.Vector3(position.x+diameter-1, position.y+height,-diameter);
													
													vertices[6] = new THREE.Vector3(position.x+diameter-1, position.y,  0);
													vertices[7] = new THREE.Vector3(position.x+diameter-1, position.y, -diameter);
													
													uvs.push( GameObject.getUVmapCords(19, 0, 0));
													uvs.push( GameObject.getUVmapCords(19, 0, 1));
													uvs.push( GameObject.getUVmapCords(19, 1, 0));
													uvs.push( GameObject.getUVmapCords(19, 1, 1));

														
													for (lmnop = 0; lmnop < vertices.length; lmnop++){
														selfGenGeom.vertices.push( vertices[lmnop] );
													//	selfGenGeom.faceVertexUvs[0].push();
													}
													
													var verticesbopundryoffset = selfGenGeom.vertices.length - vertices.length;
													var uvoffset = uvs.length - 4;
													
													selfGenGeom.faces.push( new THREE.Face3( verticesbopundryoffset + 2, verticesbopundryoffset + 1, verticesbopundryoffset + 0));
													selfGenGeom.faces.push( new THREE.Face3( verticesbopundryoffset + 1, verticesbopundryoffset + 2, verticesbopundryoffset + 3));
													selfGenGeom.faces.push( new THREE.Face3( verticesbopundryoffset + 2, verticesbopundryoffset + 4, verticesbopundryoffset + 3));
													selfGenGeom.faces.push( new THREE.Face3( verticesbopundryoffset + 3, verticesbopundryoffset + 4, verticesbopundryoffset + 5));
													selfGenGeom.faces.push( new THREE.Face3( verticesbopundryoffset + 4, verticesbopundryoffset + 6, verticesbopundryoffset + 5));
													selfGenGeom.faces.push( new THREE.Face3( verticesbopundryoffset + 5, verticesbopundryoffset + 6, verticesbopundryoffset + 7));
													
													selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 2], uvs[uvoffset + 1], uvs[uvoffset + 0]]);
													selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 1], uvs[uvoffset + 2]]);
													selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);
													selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);
													selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);
													selfGenGeom.faceVertexUvs[0].push( [uvs[uvoffset + 1], uvs[uvoffset + 0], uvs[uvoffset + 2]]);
													console.log(position.z);
												 }
											}
                    }
                  }
                }
						//			console.log(selfGenGeom);
                }

			var oldVERT = selfGenGeom.vertices;
	
			selfGenGeom.computeFaceNormals();
			selfGenGeom.mergeVertices();
			selfGenGeom.computeVertexNormals();
			
			forageGeom.computeFaceNormals();
			forageGeom.mergeVertices();
			forageGeom.computeVertexNormals();
			
			dynamicGeom.computeFaceNormals();
			dynamicGeom.mergeVertices();
			dynamicGeom.computeVertexNormals();
			
			var newVERT = selfGenGeom.vertices;
		
			var texture = new THREE.ImageUtils.loadTexture( "/textures/WorldTextureMap.png" );
			texture.magFilter = THREE.NearestFilter;
			texture.minFilter = THREE.LinearMipMapLinearFilter;
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 1, 1 );
			texture.anisotropy = 1;
	  	var platform_topp = new THREE.MeshLambertMaterial({map: GameObject.WorldTextureMap, color:0xFFFFFF, alphaTest: 0.5});
	  //		var platform_top = new THREE.MeshLambertMaterial({color: 0xFF0000, wireframe: true});
	
			var platform_top = new THREE.ShaderMaterial({
				uniforms: {
					"tDiffuse": { type: "t", value: GameObject.WorldTextureMap },
					"uDirLight": { type: "c", value: new THREE.Color(0xFFCC00)},
					"uMaterialColor": { type: "c", value: new THREE.Color(0xFFFFFF)},
					"color":    { type: "c", value: new THREE.Color( 0xFFFFFF ) },
					"time":			{ type: "f", value: 90 },
					"pi":				{ type: "f", value: Math.PI}
					
				},
				
				attributes: {
					"vert":			{ type: "f", value: []},
					"offset":		{ type: "f", value: []}
				},

				vertexShader: [
					"uniform float time;",
					"uniform float pi;",
					"uniform vec3 uDirLight;",
					"uniform vec3 uMaterialColor;",
					"attribute float vert;",
					"attribute float offset;",
					"varying vec2 vUv;",
					"varying vec3 vColor;",

					"void main() {",

						"vUv = uv;",
						"vec3 jus = vec3(vert * 0.2 * sin((time * 1.0 * pi / 180.0) - offset),0,vert * 0.2*sin((time * 3.0 * pi / 180.0) + offset));",
						"vec3 newPosition = position + jus - vec3(0,0,0);",
						"gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );",
						"vec3 light = normalize( uDirLight + vec3(0.2,0.8,0.6) );",
						"float diffuse = max( dot( normal, light), 0.0);",
						"vColor = vec3(diffuse, diffuse, diffuse) - 0.7;",

					"}"

				].join("\n"),

				fragmentShader: [

					"uniform vec3 color;",
					"uniform sampler2D tDiffuse;",

					"varying vec2 vUv;",
					"varying vec3 vColor;",

					"void main() {",
			
						"vec4 texel = texture2D( tDiffuse, vUv );",

						"vec3 luma = vec3( 0.299, 0.587, 0.114 );",
						"float v = dot( texel.xyz, luma );",
				//		"if ( gl_FragColor.a < 0.5 ) discard;",
					
						"gl_FragColor = vec4( (texel.xyz * vec3(1.2,1.2,1.2)) + vColor, texel.w );",
						"if(gl_FragColor.a < 0.5)",
							"discard;",
						//		"gl_FragColor = vec4( v * color, texel.w );",
					"}"

				].join("\n")
			});
			console.log(platform_top);
				var arryasz = [];
				var waveoffset = [];
				console.log(selfGenGeom.faces);
				
				/*Finds Specific Verticies and Gives them specific vertex attributes for the vertex shader*/
				console.log(forageGeom.faces);
				console.log(specialvert);
				console.log(forageGeom.faces[specialvert[0].face][specialvert[0].vert]);
				console.log(forageGeom.vertices.length);

				for (var ngt = 0; ngt < forageGeom.vertices.length; ngt++){
					arryasz[ngt] = 0;
					waveoffset[ngt] = 0;
				}
				for (var ogt = 0; ogt < (specialvert.length-2); ogt++){
					arryasz[forageGeom.faces[specialvert[ogt].face][specialvert[ogt].vert]] = 1;
					waveoffset[forageGeom.faces[specialvert[ogt].face][specialvert[ogt].vert]] = specialvert[ogt].waveoffset;
				}
				
				platform_top.attributes.vert.value = arryasz;
				platform_top.attributes.offset.value = waveoffset;
				platform_top.attributes.vert.needsUpdate = true;
				platform_top.attributes.offset.needsUpdate = true;
//				console.log(platform_top.attributes.vert);
				console.log(platform_top)
				var pipemat = new THREE.MeshLambertMaterial({color: 0x00FF00});
				
				var material = new THREE.MeshPhongMaterial( { color: 0xDDDDDD, shininess: 30, metal: false, shading: THREE.FlatShading, wireframe: true} );
				GameObject.WorldGeom = {STATIC: new THREE.Mesh( selfGenGeom, platform_topp ), DYNAMIC: new THREE.Mesh( dynamicGeom, platform_topp ), FORAGE: new THREE.Mesh( forageGeom, platform_top )};
				
				GameObject.WorldGeom.STATIC.castShadow = true;
				GameObject.WorldGeom.STATIC.receiveShadow = true;
				GameObject.WorldGeom.STATIC.shadowBias = 0.001;
				
				GameObject.WorldGeom.FORAGE.castShadow = true;
				GameObject.WorldGeom.FORAGE.receiveShadow = true;
				GameObject.WorldGeom.FORAGE.shadowBias = 0.001;
		//		GameObject.WorldGeom.STATIC.scale.set(10,10,10);
			//	GameObject.WorldGeom.position.y = -8;
			//	GameObject.WorldGeom.position.x = -8;
			//	GameObject.WorldGeom.position.z = 0;
		//		var hill = GameObject.Hill(new THREE.Vector3(3,3.5,-3));
	//			var bush = GameObject.Bush(new THREE.Vector3(12,2.5,-2));
				GameObject.WorldGeom.DYNAMIC.position.z = -0.5;
				console.log(GameObject.WorldGeom.FORAGE);
				
				scene.add(GameObject.WorldGeom.STATIC, GameObject.WorldGeom.FORAGE,  GameObject.WorldGeom.DYNAMIC);
			}

						//*PLZZPLLZZ Fix me MAx. I am broken ;( I cri erytime i dont work*/
						GameObject.getUVmapCords = function(materialID, u, v){
							var ppb = 16;
							var blocksInRow = textureWidth / ppb;
							var material = [];
							material[0]  = {pos: new THREE.Vector2(1,9), l: 1, h: 1};
							material[1]  = {pos: new THREE.Vector2(2,9), l: 1, h: 1};
							material[2]  = {pos: new THREE.Vector2(3,9), l: 1, h: 1};
							material[3]  = {pos: new THREE.Vector2(1,8), l: 1, h: 1};
							material[4]  = {pos: new THREE.Vector2(2,8), l: 1, h: 1};
							material[5]  = {pos: new THREE.Vector2(3,8), l: 1, h: 1};
							material[6]  = {pos: new THREE.Vector2(1,7), l: 1, h: 1};
							material[7]  = {pos: new THREE.Vector2(2,7), l: 1, h: 1};
					    material[8]  = {pos: new THREE.Vector2(1,5), l: 4, h: 1};
							material[9]  = {pos: new THREE.Vector2(5,4), l: 5, h: 2 + 3/16};
							material[10] = {pos: new THREE.Vector2(6,5), l: 3, h: 1 + 3/16};
							material[11] = {pos: new THREE.Vector2(1,4), l: 3, h: 1};
							material[12] = {pos: new THREE.Vector2(1,3), l: 3, h: 1};
							material[13] = {pos: new THREE.Vector2(1.5,5), l: 2, h: 1};
							material[14] = {pos: new THREE.Vector2(2.5,3), l: 1, h: 1};
							material[15] = {pos: new THREE.Vector2(3,7), l: 1, h: 1};
							material[16] = {pos: new THREE.Vector2(4,7), l: 1, h: 1};
							material[17] = {pos: new THREE.Vector2(1,6), l: 1, h: 1};
							material[18] = {pos: new THREE.Vector2(2,6), l: 1, h: 1};
							material[19] = {pos: new THREE.Vector2(3,3), l: 1, h: 1};
							material[20] = {pos: new THREE.Vector2(9,7), l: 1-3/16, h: 1-1/16};
			        
							material[materialID].h--;
							material[materialID].l--;
							u--;
							v--;
							
							var realU = ((material[materialID].pos.x + u + (material[materialID].l * (u + 1)))* ppb) / textureWidth ;
							var realV = ((material[materialID].pos.y + v + (material[materialID].h * (v + 1)))* ppb) / textureHeight;
							
							var realUV = new THREE.Vector2(realU, realV);
							//console.log(realUV);
							return realUV;
							
						}
						
						function get_Material_Id_If_MultiBlock(){
							
						}
            
            function getblock(x, y, z){
              /*This Formula Calculates the Id number, based on a position entered*/
              var id = (((y - 1) * mapWidth + (x -1)) + (mapWidth * mapHeight * (z -1)));
              return id;
            }
					
						function getMap(){
							var xmlhttp = new XMLHttpRequest();
							var url = levelname;

							xmlhttp.onreadystatechange = function() {
								if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
										var myArr = JSON.parse(xmlhttp.responseText);
										map      = myArr.blocks;
										mapWidth = myArr.mapWidth;
										mapHeight= myArr.mapHeight;
										mapDepth = myArr.mapDepth;
										console.log(myArr);
										GameObject.Regenerate();
										GameObject.Developer.showGrids(myArr);
								}
							}
							xmlhttp.open("GET", url, true);
							xmlhttp.send();
							
						}
						
						 getMap();
						
	}

	GameObject.GetWorldTextureMap = function(){
	var blocktexture = THREE.ImageUtils.loadTexture( "/textures/WorldTextureMap.png",
		{
			magFilter: THREE.NearestFilter,
			minFilter: THREE.LinearMipMapLinearFilter,
			flipY: false,
			wrapS: THREE.RepeatWrapping,
			wrapT: THREE.RepeatWrapping,
			repeat: 1,
			anisotropy: 1
		},
		function(texturemap){
			texturemap.magFilter= THREE.NearestFilter;
			texturemap.minFilter= THREE.LinearMipMapLinearFilter;
			
			textureWidth = texturemap.image.width;
			textureHeight = texturemap.image.height;
			GameObject.WorldTextureMap = texturemap;
			console.log("textywexy wdth: "+textureWidth+" tashasdheight:"+textureHeight);
	//		generateGeometry();
		}
	);
}