jQuery(function() {

	var theContainer = $('#container');

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0x333333, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;

	// Set a bunch of sphere sizes to pick from
	var sphereGeometries = [
		new THREE.SphereGeometry(1, 32, 32),
		new THREE.SphereGeometry(2, 32, 32),
		new THREE.SphereGeometry(3, 32, 32),
		new THREE.SphereGeometry(4, 32, 32),
		new THREE.SphereGeometry(5, 32, 32),
		new THREE.SphereGeometry(6, 32, 32)
	];

	// The surfaces
	var sphereMaterials = [
		new THREE.MeshLambertMaterial({ color: 0x257E78 }),
		new THREE.MeshLambertMaterial({ color: 0x40B8AF }),
		new THREE.MeshLambertMaterial({ color: 0x6C2D58 }),
		new THREE.MeshLambertMaterial({ color: 0xB2577A }),
		new THREE.MeshLambertMaterial({ color: 0xF6B17F }),
		new THREE.MeshLambertMaterial({ color: 0xFFFFFF })
	];

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
			x: Math.floor(Math.random() * 20) + 10,
			y: Math.floor(Math.random() * 20) + 10,
			z: Math.floor(Math.random() * 20)
		}

		// Add sphere to the spheres array
		spheres.push(sphere);

		scene.add(sphere);
	}

	camera.position.x = -50;
	camera.position.y = 60;
	camera.position.z = 50;
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

	  	if (typeof center.x !== 'undefined') {
				sphere.position.x = center.x + (sphere.orbitOffset.x * (Math.cos(sphere.step)));
				sphere.position.y = center.y + (sphere.orbitOffset.y * (Math.sin(sphere.step)));
				sphere.position.z = center.z + (sphere.orbitOffset.z * (Math.sin(sphere.step))) * 5;
	  	}

	  	// Pick another random sphere to orbit
	  	center = spheres[Math.floor(Math.random() * spheres.length)].position;

	  });


	  // render using requestAnimationFrame
	  requestAnimationFrame(renderScene);
	  renderer.render(scene, camera);
	}
});
