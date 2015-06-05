/*GENERATE LEVEL MAP FROM PICTURE*/

		function mapkey(x,y,z,color){
				
			/*DEFAULT PROPERTIES OF AN UNDEFINED BLOCK*/
			var air = true;
			var materialID;
			var allsides = true;
			var offset = new THREE.Vector3(0,0,0);
			var position = new THREE.Vector3(x,y,z);
			var zdepth = mapDepth;
			var transparent = false;
			var blocksx = 1;
			var blocksy = 1;
			var  matTop = null,  matBottom = null,  matFront = null,   matBack =  null,  matLeft = null ,  matRight = null;
			var faceTop = true, faceBottom = true, faceFront = true , faceBack = false, faceLeft = true , faceRight = true;
			var dynamic = false;
			var pipe = false;
			var pipeHeight = 0;
			var wave = false;
				
			/*PROPERTIES OF DEFINED BLOCKS*/
			
			/*PLATFORM-BRICK BLOCK*/
			if (color.r === 0 & color.g === 0 & color.b === 0){
				air = false;
				materialID = 0;
				zdepth = 3;
			}
			
			/*AIR*/
			if (color.r === 255 & color.g === 255 & color.b === 255){
				var BlockProperties
				 air = true;
		//	  }
	//			return BlockProperties;
			}
			
			/*STAIR BLOCKS*/
			if (color.r === 255 & color.g === 200 & color.b === 0){
				air = false;
				materialID = 2;
				zdepth = 2;
			}
			
			/*QUESTION BLOCK*/
			if (color.r === 127 & color.g === 51 & color.b === 0){
				air = false;
				materialID = 4;
				dynamic = true;
				zdepth = 1;
			}
			
			/*BRICK*/
			if (color.r === 0 & color.g === 74 & color.b === 127){
				air = false;
				materialID = 1;
				zdepth = 1;
				dynamic = true;
			}
			
			/*LARGE HILL*/
			if (color.r === 53 & color.g === 123 & color.b === 12){
				 air = true;
				 materialID = 9;
				 zdepth = 1;
				 offset.z = 3;
				 blocksx = 5;
				 blocksy = 2 + 3/16;
				 transparent = true;
				 faceTop     = false;
				 faceBottom  = false;
				 faceFront   = true;
				 faceBack    = true;
				 faceLeft    = false;
				 faceRight   = false;
			}
			
			/*SHORT HILL*/
			if (color.r === 20 & color.g === 50 & color.b === 2){
				 air = true;
				 materialID = 10;
				 zdepth = 1;
				 offset.z = 3;
				 blocksx = 3;
				 blocksy = 1 + 3/16;
				 transparent = true;
				 wave = true;
				
			}
			
			/*BUSH x3*/
			if (color.r === 127 & color.g === 0 & color.b === 55){
				 air = true;
				 materialID = 8;
				 zdepth = 1;
				 offset.z = 2;
				 offset.x = 0.5;
				 blocksx = 4;
				 blocksy = 1;
				 transparent = true;
				 wave = true;
			}
			
			/*BUSH x2*/
			if (color.r === 214 & color.g === 220 & color.b === 28){
				 air = true;
				 materialID = 11;
				 zdepth = 1;
				 offset.z = 2;
				 offset.x = 0.5;
				 blocksx = 3;
				 blocksy = 1;
				 transparent = true;
				 wave = true;
			}
			
			/*BUSH x1*/
			if (color.r === 29 & color.g === 220 & color.b === 118){
				 air = true;
				 materialID = 12;
				 zdepth = 1;
				 offset.z = 2;
				 offset.x = 0.5;
				 blocksx = 3;
				 blocksy = 1;
				 transparent = true;
				 wave = true;
			}
			
			/*BUSH-MID*/
			if (color.r === 88 & color.g === 149 & color.b === 121){
				 air = true;
				 materialID = 13;
				 zdepth = 1;
				 offset.z = 2;
				 blocksx = 2;
				 blocksy = 1;
				 transparent = true;
				 wave = true;
			}
			
			/*BUSH-TAIL*/
			if (color.r === 201 & color.g === 127 & color.b === 85){
				 air = true;
				 materialID = 14;
				 zdepth = 1;
				 offset.z = 2;
				 blocksx = 1;
				 blocksy = 1;
				 transparent = true;
				 wave = true;
			}
			
			if (z === 3){
				
				/*CASTLE-BRICK*/
				if (color.r === 165 & color.g === 36 & color.b === 145){
					air = false;
					materialID = 15;
					blocksx = 1;
					blocksy = 1;
					transparent = false;
				}
				
				/*CASTLE-ROOF-RAIL (couldn't think of a better name)*/
				if (color.r === 181 & color.g === 203 & color.b === 148){
					air = false;
					materialID = 16;
					blocksx = 1;
					blocksy = 1;
					transparent = false;
					faceTop = false;
					faceBottom = false;
					faceFront = true;
					faceBack = true;
					faceLeft = true;
					faceRight = true;
				}
				
				/*CASTLE-DOOR-BOTTOM*/
				if (color.r === 188 & color.g === 112 & color.b === 94){
					air = false;
					materialID = 17;
					blocksx = 1;
					blocksy = 1;
					transparent = false;
				}
				
			  /*CASTLE-DOOR-TOP*/
				if (color.r === 142 & color.g === 111 & color.b === 27){
					air = false;
					materialID = 18;
					blocksx = 1;
					blocksy = 1;
					transparent = false;
				}
			}
			
			/*Pipe*/
			if (color.r === 140 & color.g === 192 & color.b === 163){
				pipe = true;
				pipeHeight = 2;
				zdepth = 1;
			}
			
			if (color.r === 145 & color.g === 165 & color.b === 86){
				pipe = true;
				pipeHeight = 3;
				zdepth = 1;
			}
			
			if (color.r === 81 & color.g === 106 & color.b === 8){
				pipe = true;
				pipeHeight = 4;
				zdepth = 1;
			}
			
			/*--Materials-Stop-Here----------------------------------------------*/
			
			if (z > zdepth){
				air = true;
				transparent = false;
				materialID = null;
			}
			
			/*convets Z value from world units to webgl units (idk why, but I thought positive z values would be good....)*/
			offset.z = -Math.abs(offset.z);
			
			/*Returns the Properties of The Block*/
			
			var BlockProperties = {
				position: position,
				air: air,
				materialID: materialID,
				materialInfo:{
					allsides: allsides,
					top:      matTop,
					bottom:   matBottom,
					front:    matFront,
					back:     matBack,
					left:     matLeft,
					right:    matRight
				},
				faceEnab:{
					top:     faceTop,
					bottom:  faceBottom,
					front:   faceFront,
					back:    faceBack,
					left:    faceLeft,
					right:   faceRight
				},
				offsetPOS: offset,
				zdepth: zdepth,
				transparent: transparent,
				dynamic: dynamic,
				blocksx: blocksx,
				blocksy: blocksy,
				pipe: pipe,
				pipeHeight: pipeHeight,
				wave: wave
			}
			
			return BlockProperties;
		}
		
		
			var map = [];
			var mapWidth, mapHeight, mapDepth;
			var textureWidth, textureHeight;
			var mapPIC;
			
	   
                
			function getmapdata(){
				
					/*creates a canvas, puts an image on it, gets the properties of that image*/
					function getImageData( image ) {
							var canvas = document.createElement( 'canvas' );
							canvas.width = image.width;
							canvas.height = image.height;
							var context = canvas.getContext( '2d' );
							context.drawImage( image, 0, 0 );
							return context.getImageData( 0, 0, image.width, image.height );
					}

					/*gets the color of a pixel from x,y corrdinates*/
					function getPixel( imagedata, x, y ) {
						var position = ( x + imagedata.width * y ) * 4, data = imagedata.data;
						return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };
					}
				
					var imgtext = THREE.ImageUtils.loadTexture(
						mapPIC, // /textures/w1-1.png
						{
							magFilter: THREE.NearestFilter,
							minFilter: THREE.NearestFilter,
							flipY: false,
							wrapS: THREE.ClampToEdgeWrapping,
							wrapT: THREE.ClampToEdgeWrapping
						},
						function(image){
							var imagedata = getImageData( imgtext.image); //imgtext.image);
							console.log(image);
							
			//        showGrids(imgtext.image.width, imgtext.image.height);
							
							/*Puts Map Dimensions in Global Variable*/
							mapHeight = imgtext.image.height;
							mapWidth  = imgtext.image.width;
							mapDepth = 3;
							
							for (var z = 1; z <= mapDepth; z++){
								for (var y = 1; y <= imgtext.image.height; y++){
									for (var x = 1; x <= imgtext.image.width; x++){
										var newY = imgtext.image.height - y;
										var color = getPixel( imagedata, x -1 , newY );
										
					//					if (z > zdepth){
				//							color.r = 255;
			//								color.g = 255;
		//									color.b = 255;
		//								}
										
											map.push(mapkey(x, y, z, color));
									
										
									}
								}
							}
					//		console.log(map);
				//			console.log(getblock(1, 3, 1));
							var blocktexture = THREE.ImageUtils.loadTexture( "/textures/WorldTextureMap.png",
							{
								magFilter: THREE.NearestFilter,
								minFilter: THREE.NearestFilter,
								flipY: false,
								wrapS: THREE.ClampToEdgeWrapping,
								wrapT: THREE.ClampToEdgeWrapping
							},
								function(texturemap){
									textureWidth = texturemap.image.width;
									textureHeight = texturemap.image.height;
									console.log("textywexy wdth: "+textureWidth+" tashasdheight:"+textureHeight);
				//					generateGeometry();
								createJSONfromMap("w1-1");
								}
							);
						});
      }
			
			function createJSONfromMap(name){
				
				var json = new String(
							'{"LevelName":"' + name + '",'
				     + '"mapWidth":' + mapWidth + ','
				     + '"mapHeight":'+ mapHeight + ','
				     + '"mapDepth":' + mapDepth + ','
				     + '"blocks":' + JSON.stringify(map)
				     + "}"
						);
				
				var obj = JSON.parse(json);
				console.log(obj);

					var textFile = null,
						makeTextFile = function (text) {
							var data = new Blob([text], {type: 'text/json'});

							// If we are replacing a previously generated file we need to
							// manually revoke the object URL to avoid memory leaks.
							if (textFile !== null) {
								window.URL.revokeObjectURL(textFile);
							}

							textFile = window.URL.createObjectURL(data);

							return textFile;
						};


						var create = document.getElementById('create'),
					  textbox = document.getElementById('textbox');

						create.addEventListener('click', function () {
							var link = document.getElementById('downloadlink');
							link.href = makeTextFile(json);
							if (textbox.value !== null){
								link.download = name + ".mario";
							} else {
								link.download = textbox.value + ".mario";
							}
							link.style.display = 'block';
						}, false);
					
		
			
			}

			 function previewFile(){
				var preview = document.querySelector('img'); //selects the query named img
				var file    = document.querySelector('input[type=file]').files[0]; //sames as here
				var reader  = new FileReader();
	
				reader.onloadend = function () {
						preview.src = reader.result;
						mapPIC = reader.result;
						getmapdata();
				}

				if (file) {
						reader.readAsDataURL(file); //reads the data as a URL
				} else {
						preview.src = "";
				}
			}

   //calls the function named previewFile()
			