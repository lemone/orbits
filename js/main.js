jQuery(function() {

	var theContainer = $('#container');

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0x333333, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;

	var sphereGeometries = [
		new THREE.SphereGeometry(1, 32, 32),
		new THREE.SphereGeometry(2, 32, 32),
		new THREE.SphereGeometry(3, 32, 32)
	];

	var sphereMaterials = [
		new THREE.MeshLambertMaterial({ color: 0x257E78 }),
		new THREE.MeshLambertMaterial({ color: 0x40B8AF }),
		new THREE.MeshLambertMaterial({ color: 0x6C2D58 }),
		new THREE.MeshLambertMaterial({ color: 0xB2577A }),
		new THREE.MeshLambertMaterial({ color: 0xF6B17F }),
		new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
	];

	var numberOfSpheres = 10;
	var spheres = [];

	for (var i = 0; i < numberOfSpheres; i++) {
		var randomGeometry = sphereGeometries[Math.floor(Math.random() * sphereGeometries.length)];
		var randomMaterial = sphereMaterials[Math.floor(Math.random() * sphereMaterials.length)];
		var sphere = new THREE.Mesh(randomGeometry, randomMaterial);

		sphere.position.x = Math.floor(Math.random() * 10) * Math.round(Math.random()) * 2 -1;
		sphere.position.y = Math.floor(Math.random() * 10) * Math.round(Math.random()) * 2 -1;
		sphere.position.z = Math.floor(Math.random() * 10) * Math.round(Math.random()) * 2 -1;
		sphere.castShadow = true;
		sphere.receiveShadow = true;

		sphere.step = 0;
		sphere.stepIncrement = Math.random() / 10.0;

		sphere.orbitOffset = {
			x: Math.floor(Math.random() * 10),
			y: Math.floor(Math.random() * 10),
			z: Math.floor(Math.random() * 10)
		}

		// Add sphere to the spheres array
		spheres.push(sphere);

		scene.add(sphere);
	}

	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);

	var spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( -40, 60, -10 );
	spotLight.castShadow = true;
	scene.add( spotLight );

	theContainer.append(renderer.domElement);

	renderScene();

	function renderScene() {

	  var center = {
	  	x: 0,
	  	y: 0,
	  	z: 0
	  };

	  spheres.forEach(function(sphere) {
	  	sphere.step += sphere.stepIncrement;

	  	if (typeof center.x !== 'undefined') {
				sphere.position.x = center.x + (sphere.orbitOffset.x * (Math.cos(sphere.step)));
				sphere.position.y = center.y + (sphere.orbitOffset.y * (Math.sin(sphere.step)));
				sphere.position.z = center.z + (sphere.orbitOffset.z * (Math.cos(sphere.step)));
	  	}

	  	center.x = sphere.position.x;
	  	center.y = sphere.position.y;
	  	center.z = sphere.position.z;
	  });


	  // render using requestAnimationFrame
	  requestAnimationFrame(renderScene);
	  renderer.render(scene, camera);
	}
});
