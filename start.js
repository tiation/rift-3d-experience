#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🎮 Welcome to Rift 3D Experience Generator!');
console.log('=' .repeat(50));

const shapes = {
  '1': {
    name: 'Skateboard',
    file: 'index.html',
    description: '🛹 Classic skateboard with rotation animation'
  },
  '2': {
    name: 'Guitar',
    file: 'guitar-rift.html', 
    description: '🎸 Musical guitar with floating notes'
  },
  '3': {
    name: 'Sphere',
    file: 'sphere-rift.html',
    description: '⚪ Smooth sphere with reflective surface'
  },
  '4': {
    name: 'Cube',
    file: 'cube-rift.html',
    description: '🔲 Geometric cube with sharp edges'
  },
  '5': {
    name: 'Torus',
    file: 'torus-rift.html',
    description: '🍩 Donut-shaped torus ring'
  },
  '6': {
    name: 'Diamond',
    file: 'diamond-rift.html',
    description: '💎 Brilliant diamond crystal'
  },
  '7': {
    name: 'Rocket',
    file: 'rocket-rift.html',
    description: '🚀 Space rocket with exhaust trail'
  }
};

function displayMenu() {
  console.log('\nChoose your 3D shape:');
  console.log('-' .repeat(30));
  
  Object.keys(shapes).forEach(key => {
    const shape = shapes[key];
    console.log(`${key}. ${shape.description}`);
  });
  
  console.log('\n0. Exit');
}

function createShapeExperience(templateName, objectCode, title, gradient, description) {
  const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rift ${title} - 3D Experience</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background: white;
            overflow: hidden;
            height: 100vh;
        }

        html, body {
            margin: 0;
            height: 100%;
            overflow: hidden; 
        }

        .main_content_scroll {
            overflow-y: scroll;
            height: 100%;
            pointer-events: all;
        }

        .main_content_scroll::-webkit-scrollbar {
            width: 0px;
            display: none;
        }

        #bear-holder {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 98;
            pointer-events: none;
        }

        .content {
            height: 500vh;
            position: relative;
            z-index: 1;
        }

        .section {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: #010031;
            font-family: Arial, sans-serif;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(2px);
        }

        .section:nth-child(even) {
            background: rgba(240, 240, 240, 0.1);
        }

        .shape-section {
            background: rgba(255, 255, 255, 0.2);
            flex-direction: column;
            gap: 20px;
        }

        .shape-section h1 {
            font-size: 3rem;
            margin: 0;
            background: ${gradient};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
        }

        .shape-section p {
            font-size: 1.5rem;
            margin: 0;
            text-align: center;
            max-width: 800px;
        }

        .loader {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #010031;
            font-family: Arial, sans-serif;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }

        .noise {
            -webkit-animation: noise 1.2s steps(3) infinite both;
            animation: noise 1.2s steps(3) infinite both;
            background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPHN2Zz4K");
            background-size: 64px;
            height: 200%;
            left: -50%;
            pointer-events: none;
            position: fixed;
            top: -50%;
            width: 200%;
            will-change: auto;
            z-index: 100;
            opacity: 0.05;
        }

        @keyframes noise {
            0% { -webkit-transform: translate3d(1%,-1%,0); transform: translate3d(1%,-1%,0) }
            10% { -webkit-transform: translate3d(-5%,-2%,0); transform: translate3d(-5%,-2%,0) }
            20% { -webkit-transform: translate3d(10%,5%,0); transform: translate3d(10%,5%,0) }
            30% { -webkit-transform: translate3d(5%,-11%,0); transform: translate3d(5%,-11%,0) }
            40% { -webkit-transform: translate3d(-12%,-5%,0); transform: translate3d(-12%,-5%,0) }
            50% { -webkit-transform: translate3d(10%,9%,0); transform: translate3d(10%,9%,0) }
            60% { -webkit-transform: translate3d(15%,0,0); transform: translate3d(15%,0,0) }
            70% { -webkit-transform: translate3d(-10%,8%,0); transform: translate3d(-10%,8%,0) }
            80% { -webkit-transform: translate3d(10%,2%,0); transform: translate3d(10%,2%,0) }
            90% { -webkit-transform: translate3d(1%,5%,0); transform: translate3d(1%,5%,0) }
            to { -webkit-transform: translate3d(0,8%,0); transform: translate3d(0,8%,0) }
        }
    </style>
</head>
<body>
    <div class="noise"></div>
    
    <div class="loader" id="loader">
        <div>Loading Rift ${title}...</div>
        <div id="progress">0%</div>
    </div>

    <div id="bear-holder"></div>

    <section class="main_content_scroll" id="new_body">
        <div class="content">
            <div class="section">
                <h1>Scroll down to see the ${title.toLowerCase()} in action</h1>
            </div>
            
            <div class="section shape-section">
                <h1>Rift ${title}</h1>
                <p>${description}</p>
            </div>
            
            <div class="section">
                <h1>Keep scrolling...</h1>
            </div>
            
            <div class="section">
                <h1>The camera follows your scroll movement</h1>
            </div>
            
            <div class="section">
                <h1>End of demo - scroll back up!</h1>
            </div>
        </div>
    </section>

    <script src="three.min.js"></script>
    
    <script>
        let scene, camera, renderer, sphereCamera, shape3D;
        let new_body = document.getElementById("new_body");
        let loader = document.getElementById("loader");
        let progress = document.getElementById("progress");

        function init() {
            const loadingManager = new THREE.LoadingManager(
                () => {
                    console.log("loaded 3d");
                    clearLoader();
                    const t = new_body.scrollTop;
                    camera.position.y = t * -0.004;
                    render();
                },
                (itemUrl, itemsLoaded, itemsTotal) => {
                    const percent = Math.round((itemsLoaded / itemsTotal) * 100);
                    progress.textContent = \`\${percent}%\`;
                    console.log(percent + "% loaded");
                }
            );

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 50);
            camera.position.set(0, 0, 5);

            renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
            renderer.setClearColor(0xffffff, 0);
            renderer.autoClear = false;
            renderer.setSize(window.innerWidth, window.innerHeight);

            document.getElementById('bear-holder').appendChild(renderer.domElement);

            sphereCamera = new THREE.CubeCamera(1, 9000000000000, 500);
            sphereCamera.position.set(0, 0, 0);
            scene.add(sphereCamera);
            
            let shapeMaterial = new THREE.MeshPhongMaterial({
                envMap: sphereCamera.renderTarget.texture
            });

            ${objectCode}

            const ambientLight = new THREE.AmbientLight(0xffffff, 1);
            scene.add(ambientLight);

            let materialArray = [];
            let texture = new THREE.TextureLoader().load('original_C.jpg');
            
            for (let i = 0; i < 6; i++) {
                materialArray.push(new THREE.MeshBasicMaterial({ map: texture }));
                materialArray[i].side = THREE.BackSide;
            }
                     
            let skyboxGeo = new THREE.SphereGeometry(9000000000000, 62, 62);
            let skybox = new THREE.Mesh(skyboxGeo, materialArray);
            scene.add(skybox);

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                updateResponsivePositioning();
            });
        }

        function updateResponsivePositioning() {
            if (!shape3D) return;
            
            if (window.innerWidth < 420) {
                shape3D.position.y = -3.38;
                shape3D.position.x = 1.6;
                shape3D.scale.set(1.3, 1.3, 1.3);
            }
            else if (window.innerWidth < 770) {
                shape3D.position.y = -2.3;
                shape3D.position.x = 1;
                shape3D.scale.set(1.2, 1.2, 1.2);
            }
            else if (window.innerWidth < 1050) {
                shape3D.position.y = -1.3;
                shape3D.position.x = 1;
                shape3D.scale.set(1, 1, 1);
            }
            else if (window.innerWidth < 1500) {
                shape3D.position.y = -3.8;
                shape3D.position.x = 0;
                shape3D.scale.set(1.3, 1.3, 1.3);
            }
            else if (window.innerWidth < 1550) {
                shape3D.position.y = -3.7;
                shape3D.position.x = 0;
                shape3D.scale.set(1.3, 1.3, 1.3);
            }
            else {
                shape3D.position.y = -3.5;
                shape3D.position.x = 0;
                shape3D.scale.set(1.3, 1.3, 1.3);
            }
        }

        function moveCamera() {
            const t = new_body.scrollTop;

            if (window.innerWidth < 450) {
                camera.position.y = t * -0.006;
            }
            else if (window.innerWidth < 770) {
                camera.position.y = t * -0.004;
            }
            else if (window.innerWidth < 1050) {
                camera.position.y = t * -0.003;  
            }
            else if (window.innerWidth < 1500) {
                camera.position.y = t * -0.005;
            }
            else if (window.innerWidth < 1550) {
                camera.position.y = t * -0.005;
            }
            else {
                camera.position.y = t * -0.004;
            }
        }
        
        function render() {
            renderer.render(scene, camera);
            sphereCamera.update(renderer, scene);
            new_body.onscroll = moveCamera;
            requestAnimationFrame(render);

            if (shape3D) {
                shape3D.rotation.x += -0.02;
            }
        }

        function clearLoader() {
            loader.style.display = 'none';
        }

        init();
    </script>
</body>
</html>`;

  fs.writeFileSync(templateName, template);
  console.log(`✅ Created ${templateName}`);
}

function generateShapeFiles() {
  console.log('\n📝 Generating shape experience files...');

  // Sphere
  createShapeExperience('sphere-rift.html', `
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    shape3D = new THREE.Mesh(geometry, shapeMaterial);
    scene.add(shape3D);
    updateResponsivePositioning();
  `, 'Sphere', 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', 'This 3D sphere rotates smoothly with your scroll movements');

  // Cube
  createShapeExperience('cube-rift.html', `
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    shape3D = new THREE.Mesh(geometry, shapeMaterial);
    scene.add(shape3D);
    updateResponsivePositioning();
  `, 'Cube', 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)', 'This 3D cube spins and moves with your scroll interactions');

  // Torus
  createShapeExperience('torus-rift.html', `
    const geometry = new THREE.TorusGeometry(1.2, 0.4, 16, 100);
    shape3D = new THREE.Mesh(geometry, shapeMaterial);
    scene.add(shape3D);
    updateResponsivePositioning();
  `, 'Torus', 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)', 'This donut-shaped torus ring rotates beautifully as you scroll');

  // Diamond
  createShapeExperience('diamond-rift.html', `
    const geometry = new THREE.OctahedronGeometry(1.5, 1);
    shape3D = new THREE.Mesh(geometry, shapeMaterial);
    scene.add(shape3D);
    updateResponsivePositioning();
  `, 'Diamond', 'linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%)', 'This brilliant diamond crystal sparkles with environment reflections');

  // Rocket
  createShapeExperience('rocket-rift.html', `
    shape3D = new THREE.Group();
    
    // Rocket body
    const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.5, 3, 8);
    const body = new THREE.Mesh(bodyGeometry, shapeMaterial);
    body.position.y = 0.5;
    shape3D.add(body);
    
    // Rocket nose
    const noseGeometry = new THREE.ConeGeometry(0.3, 1, 8);
    const nose = new THREE.Mesh(noseGeometry, shapeMaterial);
    nose.position.y = 2.5;
    shape3D.add(nose);
    
    // Rocket fins
    for (let i = 0; i < 4; i++) {
      const finGeometry = new THREE.BoxGeometry(0.1, 0.8, 0.4);
      const fin = new THREE.Mesh(finGeometry, shapeMaterial);
      const angle = (i / 4) * Math.PI * 2;
      fin.position.x = Math.cos(angle) * 0.4;
      fin.position.z = Math.sin(angle) * 0.4;
      fin.position.y = -0.8;
      shape3D.add(fin);
    }
    
    scene.add(shape3D);
    updateResponsivePositioning();
  `, 'Rocket', 'linear-gradient(90deg, #fa709a 0%, #fee140 100%)', 'This space rocket rotates majestically as you explore through scroll');
}

function startServer(filename) {
  console.log(`\n🚀 Starting server with ${filename}...`);
  console.log('🌐 Opening http://localhost:8000');
  
  // Generate files if they don't exist
  if (!fs.existsSync('sphere-rift.html')) {
    generateShapeFiles();
  }
  
  const server = spawn('python3', ['-m', 'http.server', '8000'], {
    stdio: 'inherit'
  });

  // Open the specific file in browser
  setTimeout(() => {
    const url = `http://localhost:8000/${filename}`;
    const start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');
    require('child_process').exec(start + ' ' + url);
  }, 1000);

  server.on('close', (code) => {
    console.log(`\n✅ Server stopped (code ${code})`);
    process.exit(0);
  });

  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping server...');
    server.kill();
  });
}

function askQuestion() {
  displayMenu();
  
  rl.question('\nEnter your choice (0-7): ', (answer) => {
    const choice = answer.trim();
    
    if (choice === '0') {
      console.log('\n👋 Thanks for using Rift 3D Experience Generator!');
      rl.close();
      return;
    }
    
    if (shapes[choice]) {
      const shape = shapes[choice];
      console.log(`\n🎯 You selected: ${shape.name}`);
      rl.close();
      startServer(shape.file);
    } else {
      console.log('\n❌ Invalid choice. Please try again.');
      askQuestion();
    }
  });
}

// Start the interactive menu
askQuestion();
