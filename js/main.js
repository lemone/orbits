jQuery(function() {

	var theContainer = $('#container');

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0x333333, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;

	// Set a bunch of sphere sizes to pick from
	var sphereSizes = [1, 2, 3, 4];

	// Create an array of geometries of each size
	var sphereGeometries = _.map(sphereSizes, function(size) {
		return new THREE.SphereGeometry(size, 32, 32);
	});

	// The surface colors
	var sphereColors = [0x257E78, 0x40B8AF, 0x6C2D58, 0xB2577A, 0xF6B17F, 0xFFFFFF];

	// Create an array of surface meshes of each color
	var sphereMaterials = _.map(sphereColors, function(color) {
		return new THREE.MeshLambertMaterial({ color: color });
	});

	var numberOfSpheres = 37;
	var spheres = [];

	for (var i = 0; i < numberOfSpheres; i++) {
		var randomGeometry = sphereGeometries[Math.floor(Math.random() * sphereGeometries.length)];
		var randomMaterial = sphereMaterials[Math.floor(Math.random() * sphereMaterials.length)];
		var sphere = new THREE.Mesh(randomGeometry, randomMaterial);

		sphere.position.x = Math.floor(Math.random() * 10) * (Math.round(Math.random()) * 2 - 1);
		sphere.position.y = Math.floor(Math.random() * 10) * (Math.round(Math.random()) * 2 - 1);
		sphere.position.z = Math.floor(Math.random() * 10) * (Math.round(Math.random()) * 2 - 1);
		sphere.castShadow = true;
		sphere.receiveShadow = true;

		sphere.step = 0;
		sphere.stepIncrement = Math.random() / 20.0;

		sphere.orbitOffset = {
			x: Math.floor(Math.random() * 10) + 10,
			y: Math.floor(Math.random() * 10) + 10,
			z: Math.floor(Math.random() * 10)
		}

		// Orbit direction. 1 will be clockwise, -1 counterclockwise
		sphere.orbitDirection = {
			x: Math.round(Math.random()) * 2 - 1,
			y: Math.round(Math.random()) * 2 - 1,
			z: Math.round(Math.random()) * 2 - 1
		}

		// Add sphere to the spheres array
		spheres.push(sphere);

		scene.add(sphere);
	}

	camera.position.set(-50, 60, 50);
	camera.lookAt(scene.position);

	// Add some ambient light
	// var ambientLight = new THREE.AmbientLight( 0x202020 );
	// scene.add(ambientLight);

	var spotLight = new THREE.SpotLight( 0xFFFFFF );
	spotLight.position.set( -100, 100, -100 );
	spotLight.castShadow = true;
	scene.add( spotLight );

	theContainer.append(renderer.domElement);

	renderScene();

	function renderScene() {

	  spheres.forEach(function(sphere) {
	  	sphere.step += sphere.stepIncrement;

	  	// Have the first sphere orbit the origin
	  	var center = {
	  		x: 0,
	  		y: 0,
	  		z: 0
	  	};

			sphere.position.x = center.x + (sphere.orbitOffset.x * (Math.cos(sphere.step)) * sphere.orbitDirection.x);
			sphere.position.y = center.y + (sphere.orbitOffset.y * (Math.sin(sphere.step)) * sphere.orbitDirection.y);
			sphere.position.z = center.z + (sphere.orbitOffset.z * (Math.sin(sphere.step)) * sphere.orbitDirection.z) * 5;

	  	// Pick another random sphere to orbit
	  	center = spheres[Math.floor(Math.random() * spheres.length)].position;

	  });


	  // render using requestAnimationFrame
	  requestAnimationFrame(renderScene);
	  renderer.render(scene, camera);
	}
});
