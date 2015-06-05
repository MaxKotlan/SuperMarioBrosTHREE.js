//first vertex shader I ever wrote!		

		var platform_top = new THREE.ShaderMaterial({
					uniforms: {
						time: { type: "f", value: 1.0 },
						resolution: { type: "v2", value: new THREE.Vector2() },
						uMaterialColor: { type: "c", value: new THREE.Color(0x00FFFF)},
						uDirLight: { type: "c", value: new THREE.Color(0xFFCC00)},
						increasepos: {type: "v3", value: new THREE.Vector3(0,1,0)}
					},
					attributes: {
						vertexOpacity: { type: 'f', value: [] }
					},
					vertexShader:[
						"uniform vec3 uMaterialColor;",
						"uniform vec3 uDirLight;",
						"uniform vec3 increasepos;",
						
						"varying vec3 vColor;",
						
						"void main() {",
					
							"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);",
							"vec3 light = normalize( uDirLight );",
							
							"float diffuse = max( dot( normal, light), 0.0);",
							
							"vColor = uMaterialColor * diffuse;",
						"}"
						
					].join("\n"),
					fragmentShader: [
						"varying vec3 vColor;",
						"void main() {",
							"gl_FragColor = vec4(vColor, 1.0);",
						"}"
						
					].join("\n")
			});