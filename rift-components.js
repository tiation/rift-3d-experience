/**
 * RiftComponents - A modular 3D component system for websites
 * Inspired by the Rift skateboard experience
 */

class RiftComponents {
    constructor(options = {}) {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.sphereCamera = null;
        this.components = [];
        this.animationId = null;
        
        // Default configuration
        this.config = {
            container: options.container || document.body,
            background: options.background || 'transparent',
            responsive: options.responsive !== false,
            enableScrollAnimation: options.enableScrollAnimation !== false,
            scrollTarget: options.scrollTarget || window,
            camera: {
                fov: options.camera?.fov || 45,
                near: options.camera?.near || 0.1,
                far: options.camera?.far || 50,
                position: options.camera?.position || { x: 0, y: 0, z: 5 }
            },
            lighting: {
                ambient: options.lighting?.ambient || { color: 0xffffff, intensity: 1 }
            },
            environment: {
                texture: options.environment?.texture || null,
                sphere: options.environment?.sphere || true
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupEnvironment();
        this.setupLighting();
        this.setupEventListeners();
        this.animate();
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
    }
    
    setupCamera() {
        const { fov, near, far, position } = this.config.camera;
        this.camera = new THREE.PerspectiveCamera(
            fov, 
            window.innerWidth / window.innerHeight, 
            near, 
            far
        );
        this.camera.position.set(position.x, position.y, position.z);
    }
    
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        
        if (this.config.background === 'transparent') {
            this.renderer.setClearColor(0xffffff, 0);
        }
        
        this.renderer.autoClear = false;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.config.container.appendChild(this.renderer.domElement);
    }
    
    setupEnvironment() {
        // Create cube camera for environment reflections
        this.sphereCamera = new THREE.CubeCamera(1, 9000000000000, 500);
        this.sphereCamera.position.set(0, 0, 0);
        this.scene.add(this.sphereCamera);
        
        if (this.config.environment.sphere) {
            this.createEnvironmentSphere();
        }
    }
    
    createEnvironmentSphere(textureUrl = null) {
        const materialArray = [];
        const defaultTexture = textureUrl || this.createDefaultTexture();
        
        for (let i = 0; i < 6; i++) {
            const texture = typeof defaultTexture === 'string' 
                ? new THREE.TextureLoader().load(defaultTexture)
                : defaultTexture;
            materialArray.push(new THREE.MeshBasicMaterial({ map: texture }));
            materialArray[i].side = THREE.BackSide;
        }
        
        const skyboxGeo = new THREE.SphereGeometry(9000000000000, 62, 62);
        const skybox = new THREE.Mesh(skyboxGeo, materialArray);
        this.scene.add(skybox);
    }
    
    createDefaultTexture() {
        // Create a simple gradient texture
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        
        const gradient = context.createLinearGradient(0, 0, 0, 256);
        gradient.addColorStop(0, '#87CEEB'); // Light blue
        gradient.addColorStop(1, '#E0F6FF'); // Very light blue
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, 256, 256);
        
        return new THREE.CanvasTexture(canvas);
    }
    
    setupLighting() {
        const { color, intensity } = this.config.lighting.ambient;
        const ambientLight = new THREE.AmbientLight(color, intensity);
        this.scene.add(ambientLight);
    }
    
    setupEventListeners() {
        if (this.config.responsive) {
            window.addEventListener('resize', () => this.onWindowResize());
        }
        
        if (this.config.enableScrollAnimation) {
            const target = this.config.scrollTarget === window ? window : this.config.scrollTarget;
            target.addEventListener('scroll', () => this.onScroll());
        }
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Update component positions for responsive design
        this.components.forEach(component => {
            if (component.updateResponsivePosition) {
                component.updateResponsivePosition();
            }
        });
    }
    
    onScroll() {
        const scrollTarget = this.config.scrollTarget === window 
            ? (document.documentElement.scrollTop || document.body.scrollTop)
            : this.config.scrollTarget.scrollTop;
            
        this.updateCameraPosition(scrollTarget);
        
        // Update component scroll animations
        this.components.forEach(component => {
            if (component.updateScrollAnimation) {
                component.updateScrollAnimation(scrollTarget);
            }
        });
    }
    
    updateCameraPosition(scrollTop) {
        // Responsive camera movement based on screen width
        let scrollFactor = -0.004;
        
        if (window.innerWidth < 450) {
            scrollFactor = -0.006;
        } else if (window.innerWidth < 770) {
            scrollFactor = -0.004;
        } else if (window.innerWidth < 1050) {
            scrollFactor = -0.003;
        } else if (window.innerWidth < 1500) {
            scrollFactor = -0.005;
        }
        
        this.camera.position.y = scrollTop * scrollFactor;
    }
    
    createMaterial(options = {}) {
        return new THREE.MeshPhongMaterial({
            envMap: this.sphereCamera.renderTarget.texture,
            color: options.color || 0xffffff,
            shininess: options.shininess || 100,
            ...options
        });
    }
    
    addComponent(component) {
        if (component.mesh) {
            this.scene.add(component.mesh);
        }
        this.components.push(component);
        return component;
    }
    
    removeComponent(component) {
        const index = this.components.indexOf(component);
        if (index > -1) {
            this.components.splice(index, 1);
            if (component.mesh) {
                this.scene.remove(component.mesh);
            }
        }
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Update all components
        this.components.forEach(component => {
            if (component.update) {
                component.update();
            }
        });
        
        // Render
        this.renderer.render(this.scene, this.camera);
        if (this.sphereCamera) {
            this.sphereCamera.update(this.renderer, this.scene);
        }
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        this.components.forEach(component => {
            if (component.destroy) {
                component.destroy();
            }
        });
        
        if (this.renderer && this.renderer.domElement && this.renderer.domElement.parentNode) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
        }
        
        window.removeEventListener('resize', this.onWindowResize);
        
        if (this.config.scrollTarget) {
            const target = this.config.scrollTarget === window ? window : this.config.scrollTarget;
            target.removeEventListener('scroll', this.onScroll);
        }
    }
}

// Base Component Class
class RiftComponent {
    constructor(riftInstance, options = {}) {
        this.rift = riftInstance;
        this.mesh = null;
        this.originalPosition = { x: 0, y: 0, z: 0 };
        this.animations = [];
        
        this.config = {
            position: options.position || { x: 0, y: 0, z: 0 },
            rotation: options.rotation || { x: 0, y: 0, z: 0 },
            scale: options.scale || { x: 1, y: 1, z: 1 },
            material: options.material || {},
            responsive: options.responsive || {},
            animations: options.animations || []
        };
        
        this.create();
        this.setupAnimations();
        this.updateResponsivePosition();
    }
    
    create() {
        // Override in subclasses
    }
    
    setupAnimations() {
        this.config.animations.forEach(animConfig => {
            this.animations.push(new ComponentAnimation(this, animConfig));
        });
    }
    
    updateResponsivePosition() {
        if (!this.mesh) return;
        
        const width = window.innerWidth;
        const responsive = this.config.responsive;
        
        let position = this.config.position;
        let scale = this.config.scale;
        
        // Apply responsive settings based on screen width
        if (responsive.mobile && width < 420) {
            position = { ...position, ...responsive.mobile.position };
            scale = { ...scale, ...responsive.mobile.scale };
        } else if (responsive.tablet && width < 770) {
            position = { ...position, ...responsive.tablet.position };
            scale = { ...scale, ...responsive.tablet.scale };
        } else if (responsive.desktop && width >= 770) {
            position = { ...position, ...responsive.desktop.position };
            scale = { ...scale, ...responsive.desktop.scale };
        }
        
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.scale.set(scale.x, scale.y, scale.z);
        this.originalPosition = { ...position };
    }
    
    updateScrollAnimation(scrollTop) {
        // Override in subclasses or handled by animations
    }
    
    update() {
        // Update animations
        this.animations.forEach(animation => animation.update());
    }
    
    destroy() {
        if (this.mesh) {
            this.rift.scene.remove(this.mesh);
        }
    }
}

// Animation system for components
class ComponentAnimation {
    constructor(component, config) {
        this.component = component;
        this.config = config;
        this.time = 0;
        this.enabled = config.enabled !== false;
    }
    
    update() {
        if (!this.enabled || !this.component.mesh) return;
        
        this.time += 0.016; // ~60fps
        
        switch (this.config.type) {
            case 'rotation':
                this.updateRotation();
                break;
            case 'bounce':
                this.updateBounce();
                break;
            case 'float':
                this.updateFloat();
                break;
            case 'pulse':
                this.updatePulse();
                break;
        }
    }
    
    updateRotation() {
        const { speed = 1, axis = 'y' } = this.config;
        const rotation = speed * 0.02;
        
        if (axis === 'x') this.component.mesh.rotation.x += rotation;
        if (axis === 'y') this.component.mesh.rotation.y += rotation;
        if (axis === 'z') this.component.mesh.rotation.z += rotation;
    }
    
    updateBounce() {
        const { speed = 1, amplitude = 1, axis = 'z' } = this.config;
        const bounce = Math.sin(this.time * speed) * amplitude;
        
        if (axis === 'x') {
            this.component.mesh.position.x = this.component.originalPosition.x + bounce;
        } else if (axis === 'y') {
            this.component.mesh.position.y = this.component.originalPosition.y + bounce;
        } else if (axis === 'z') {
            this.component.mesh.position.z = this.component.originalPosition.z + bounce;
        }
    }
    
    updateFloat() {
        const { speed = 0.5, amplitude = 0.5 } = this.config;
        const float = Math.sin(this.time * speed) * amplitude;
        this.component.mesh.position.y = this.component.originalPosition.y + float;
    }
    
    updatePulse() {
        const { speed = 2, minScale = 0.8, maxScale = 1.2 } = this.config;
        const pulse = Math.sin(this.time * speed) * 0.5 + 0.5;
        const scale = minScale + (maxScale - minScale) * pulse;
        this.component.mesh.scale.setScalar(scale);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RiftComponents, RiftComponent, ComponentAnimation };
} else if (typeof window !== 'undefined') {
    window.RiftComponents = RiftComponents;
    window.RiftComponent = RiftComponent;
    window.ComponentAnimation = ComponentAnimation;
}
