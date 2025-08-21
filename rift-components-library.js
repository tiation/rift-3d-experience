/**
 * RiftComponents Library - Pre-built 3D components
 * Ready-to-use components for any website
 */

// 3D Letter Components
class Letter3D extends RiftComponent {
    constructor(riftInstance, letter, options = {}) {
        super(riftInstance, options);
        this.letter = letter.toUpperCase();
        this.extrudeSettings = {
            depth: options.depth || 0.2,
            bevelEnabled: options.bevelEnabled !== false,
            bevelSegments: options.bevelSegments || 2,
            steps: options.steps || 2,
            bevelSize: options.bevelSize || 0.1,
            bevelThickness: options.bevelThickness || 0.1
        };
    }
    
    create() {
        const shape = this.createLetterShape(this.letter);
        if (!shape) return;
        
        const geometry = new THREE.ExtrudeGeometry(shape, this.extrudeSettings);
        const material = this.rift.createMaterial(this.config.material);
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.set(this.config.rotation.x, this.config.rotation.y, this.config.rotation.z);
        
        // Center the geometry
        geometry.computeBoundingBox();
        const centerX = -0.5 * (geometry.boundingBox.max.x + geometry.boundingBox.min.x);
        const centerY = -0.5 * (geometry.boundingBox.max.y + geometry.boundingBox.min.y);
        geometry.translate(centerX, centerY, 0);
    }
    
    createLetterShape(letter) {
        const shape = new THREE.Shape();
        const radius = 0.2;
        
        switch (letter) {
            case 'A':
                return this.createLetterA(shape, radius);
            case 'B':
                return this.createLetterB(shape, radius);
            case 'C':
                return this.createLetterC(shape, radius);
            case 'D':
                return this.createLetterD(shape, radius);
            case 'E':
                return this.createLetterE(shape, radius);
            case 'F':
                return this.createLetterF(shape, radius);
            case 'G':
                return this.createLetterG(shape, radius);
            case 'H':
                return this.createLetterH(shape, radius);
            case 'I':
                return this.createLetterI(shape, radius);
            case 'J':
                return this.createLetterJ(shape, radius);
            case 'K':
                return this.createLetterK(shape, radius);
            case 'L':
                return this.createLetterL(shape, radius);
            case 'M':
                return this.createLetterM(shape, radius);
            case 'N':
                return this.createLetterN(shape, radius);
            case 'O':
                return this.createLetterO(shape, radius);
            case 'P':
                return this.createLetterP(shape, radius);
            case 'Q':
                return this.createLetterQ(shape, radius);
            case 'R':
                return this.createLetterR(shape, radius);
            case 'S':
                return this.createLetterS(shape, radius);
            case 'T':
                return this.createLetterT(shape, radius);
            case 'U':
                return this.createLetterU(shape, radius);
            case 'V':
                return this.createLetterV(shape, radius);
            case 'W':
                return this.createLetterW(shape, radius);
            case 'X':
                return this.createLetterX(shape, radius);
            case 'Y':
                return this.createLetterY(shape, radius);
            case 'Z':
                return this.createLetterZ(shape, radius);
            default:
                console.warn(`Letter ${letter} not implemented, creating basic rectangle`);
                return this.createRectangle(shape, 1, 2, radius);
        }
    }
    
    createRectangle(shape, width, height, radius) {
        const x = -width / 2;
        const y = -height / 2;
        
        shape.moveTo(x, y + radius);
        shape.lineTo(x, y + height - radius);
        shape.quadraticCurveTo(x, y + height, x + radius, y + height);
        shape.lineTo(x + width - radius, y + height);
        shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        shape.lineTo(x + width, y + radius);
        shape.quadraticCurveTo(x + width, y, x + width - radius, y);
        shape.lineTo(x + radius, y);
        shape.quadraticCurveTo(x, y, x, y + radius);
        
        return shape;
    }
    
    createLetterT(shape, radius) {
        // Horizontal bar (top)
        shape.moveTo(-1.5 + radius, 1);
        shape.lineTo(1.5 - radius, 1);
        shape.quadraticCurveTo(1.5, 1, 1.5, 1 - radius);
        shape.lineTo(1.5, 0.5 + radius);
        shape.quadraticCurveTo(1.5, 0.5, 1.5 - radius, 0.5);
        shape.lineTo(0.3 + radius, 0.5);
        shape.quadraticCurveTo(0.3, 0.5, 0.3, 0.5 - radius);
        
        // Vertical bar (right side)
        shape.lineTo(0.3, -1.5 + radius);
        shape.quadraticCurveTo(0.3, -1.5, 0.3 - radius, -1.5);
        shape.lineTo(-0.3 + radius, -1.5);
        shape.quadraticCurveTo(-0.3, -1.5, -0.3, -1.5 + radius);
        
        // Vertical bar (left side)
        shape.lineTo(-0.3, 0.5 - radius);
        shape.quadraticCurveTo(-0.3, 0.5, -0.3 - radius, 0.5);
        shape.lineTo(-1.5 + radius, 0.5);
        shape.quadraticCurveTo(-1.5, 0.5, -1.5, 0.5 + radius);
        shape.lineTo(-1.5, 1 - radius);
        shape.quadraticCurveTo(-1.5, 1, -1.5 + radius, 1);
        
        return shape;
    }
    
    createLetterA(shape, radius) {
        // Triangle with crossbar
        shape.moveTo(-1.2, -1.5);
        shape.lineTo(-0.3, -1.5);
        shape.lineTo(0, 1.5);
        shape.lineTo(0.3, -1.5);
        shape.lineTo(1.2, -1.5);
        shape.lineTo(1.2, -1);
        shape.lineTo(0.6, -1);
        shape.lineTo(0.3, 0);
        shape.lineTo(-0.3, 0);
        shape.lineTo(-0.6, -1);
        shape.lineTo(-1.2, -1);
        shape.closePath();
        
        return shape;
    }
    
    createLetterO(shape, radius) {
        // Outer circle
        shape.absarc(0, 0, 1.2, 0, Math.PI * 2, false);
        
        // Inner circle (hole)
        const hole = new THREE.Path();
        hole.absarc(0, 0, 0.6, 0, Math.PI * 2, true);
        shape.holes.push(hole);
        
        return shape;
    }
    
    createLetterH(shape, radius) {
        // Left vertical bar
        const leftRect = this.createRectangle(new THREE.Shape(), 0.4, 3, radius);
        leftRect.getPoints().forEach(point => {
            point.x -= 0.8;
        });
        
        // Right vertical bar  
        const rightRect = this.createRectangle(new THREE.Shape(), 0.4, 3, radius);
        rightRect.getPoints().forEach(point => {
            point.x += 0.8;
        });
        
        // Horizontal crossbar
        const crossBar = this.createRectangle(new THREE.Shape(), 1.6, 0.4, radius);
        
        // Combine shapes (simplified approach)
        shape.moveTo(-1, -1.5);
        shape.lineTo(-0.6, -1.5);
        shape.lineTo(-0.6, -0.2);
        shape.lineTo(0.6, -0.2);
        shape.lineTo(0.6, -1.5);
        shape.lineTo(1, -1.5);
        shape.lineTo(1, 1.5);
        shape.lineTo(0.6, 1.5);
        shape.lineTo(0.6, 0.2);
        shape.lineTo(-0.6, 0.2);
        shape.lineTo(-0.6, 1.5);
        shape.lineTo(-1, 1.5);
        shape.closePath();
        
        return shape;
    }
    
    // Add more letters as needed...
    createLetterE(shape, radius) {
        shape.moveTo(-1, -1.5);
        shape.lineTo(1, -1.5);
        shape.lineTo(1, -1.1);
        shape.lineTo(-0.6, -1.1);
        shape.lineTo(-0.6, -0.2);
        shape.lineTo(0.8, -0.2);
        shape.lineTo(0.8, 0.2);
        shape.lineTo(-0.6, 0.2);
        shape.lineTo(-0.6, 1.1);
        shape.lineTo(1, 1.1);
        shape.lineTo(1, 1.5);
        shape.lineTo(-1, 1.5);
        shape.closePath();
        return shape;
    }
    
    createLetterL(shape, radius) {
        shape.moveTo(-1, -1.5);
        shape.lineTo(1, -1.5);
        shape.lineTo(1, -1.1);
        shape.lineTo(-0.6, -1.1);
        shape.lineTo(-0.6, 1.5);
        shape.lineTo(-1, 1.5);
        shape.closePath();
        return shape;
    }
}

// Geometric Shape Components
class Sphere3D extends RiftComponent {
    constructor(riftInstance, options = {}) {
        super(riftInstance, options);
        this.radius = options.radius || 1;
        this.segments = options.segments || 32;
    }
    
    create() {
        const geometry = new THREE.SphereGeometry(this.radius, this.segments, this.segments);
        const material = this.rift.createMaterial(this.config.material);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.set(this.config.rotation.x, this.config.rotation.y, this.config.rotation.z);
    }
}

class Cube3D extends RiftComponent {
    constructor(riftInstance, options = {}) {
        super(riftInstance, options);
        this.size = options.size || 1;
    }
    
    create() {
        const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
        const material = this.rift.createMaterial(this.config.material);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.set(this.config.rotation.x, this.config.rotation.y, this.config.rotation.z);
    }
}

class Cylinder3D extends RiftComponent {
    constructor(riftInstance, options = {}) {
        super(riftInstance, options);
        this.radiusTop = options.radiusTop || 1;
        this.radiusBottom = options.radiusBottom || 1;
        this.height = options.height || 2;
        this.segments = options.segments || 32;
    }
    
    create() {
        const geometry = new THREE.CylinderGeometry(
            this.radiusTop, 
            this.radiusBottom, 
            this.height, 
            this.segments
        );
        const material = this.rift.createMaterial(this.config.material);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.set(this.config.rotation.x, this.config.rotation.y, this.config.rotation.z);
    }
}

class Torus3D extends RiftComponent {
    constructor(riftInstance, options = {}) {
        super(riftInstance, options);
        this.radius = options.radius || 1;
        this.tube = options.tube || 0.3;
        this.radialSegments = options.radialSegments || 16;
        this.tubularSegments = options.tubularSegments || 100;
    }
    
    create() {
        const geometry = new THREE.TorusGeometry(
            this.radius, 
            this.tube, 
            this.radialSegments, 
            this.tubularSegments
        );
        const material = this.rift.createMaterial(this.config.material);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.set(this.config.rotation.x, this.config.rotation.y, this.config.rotation.z);
    }
}

// Custom Shape Components
class Star3D extends RiftComponent {
    constructor(riftInstance, options = {}) {
        super(riftInstance, options);
        this.points = options.points || 5;
        this.outerRadius = options.outerRadius || 1;
        this.innerRadius = options.innerRadius || 0.5;
        this.depth = options.depth || 0.2;
    }
    
    create() {
        const shape = this.createStarShape();
        const extrudeSettings = {
            depth: this.depth,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 0.1,
            bevelThickness: 0.1
        };
        
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = this.rift.createMaterial(this.config.material);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.set(this.config.rotation.x, this.config.rotation.y, this.config.rotation.z);
    }
    
    createStarShape() {
        const shape = new THREE.Shape();
        const points = this.points;
        const outerRadius = this.outerRadius;
        const innerRadius = this.innerRadius;
        
        for (let i = 0; i < points * 2; i++) {
            const angle = (i / (points * 2)) * Math.PI * 2;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) {
                shape.moveTo(x, y);
            } else {
                shape.lineTo(x, y);
            }
        }
        
        shape.closePath();
        return shape;
    }
}

class Heart3D extends RiftComponent {
    constructor(riftInstance, options = {}) {
        super(riftInstance, options);
        this.size = options.size || 1;
        this.depth = options.depth || 0.2;
    }
    
    create() {
        const shape = this.createHeartShape();
        const extrudeSettings = {
            depth: this.depth,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 0.05,
            bevelThickness: 0.05
        };
        
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = this.rift.createMaterial(this.config.material);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.set(this.config.rotation.x, this.config.rotation.y, this.config.rotation.z);
    }
    
    createHeartShape() {
        const shape = new THREE.Shape();
        const size = this.size;
        
        // Heart shape using curves
        const x = 0, y = 0;
        shape.moveTo(x + size * 0.5, y + size * 0.5);
        shape.bezierCurveTo(x + size * 0.5, y + size * 0.5, x + size * 0.4, y, x, y);
        shape.bezierCurveTo(x - size * 0.6, y, x - size * 0.6, y + size * 0.3, x - size * 0.6, y + size * 0.3);
        shape.bezierCurveTo(x - size * 0.6, y + size * 0.7, x - size * 0.3, y + size * 0.95, x + size * 0.5, y + size * 1.5);
        shape.bezierCurveTo(x + size * 1.3, y + size * 0.95, x + size * 1.6, y + size * 0.7, x + size * 1.6, y + size * 0.3);
        shape.bezierCurveTo(x + size * 1.6, y + size * 0.3, x + size * 1.6, y, x + size * 1.0, y);
        shape.bezierCurveTo(x + size * 0.7, y, x + size * 0.5, y + size * 0.5, x + size * 0.5, y + size * 0.5);
        
        return shape;
    }
}

// OBJ Model Loader Component
class ModelComponent extends RiftComponent {
    constructor(riftInstance, modelUrl, options = {}) {
        super(riftInstance, options);
        this.modelUrl = modelUrl;
        this.loadingManager = options.loadingManager || null;
    }
    
    create() {
        const loader = new THREE.OBJLoader(this.loadingManager);
        
        loader.load(
            this.modelUrl,
            (object) => {
                object.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        child.material = this.rift.createMaterial(this.config.material);
                    }
                });
                
                this.mesh = object;
                this.mesh.rotation.set(this.config.rotation.x, this.config.rotation.y, this.config.rotation.z);
                
                if (this.config.onLoad) {
                    this.config.onLoad(this.mesh);
                }
            },
            (xhr) => {
                if (this.config.onProgress) {
                    this.config.onProgress(xhr);
                }
            },
            (error) => {
                if (this.config.onError) {
                    this.config.onError(error);
                }
                console.error('Error loading model:', error);
            }
        );
    }
}

// Export components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Letter3D,
        Sphere3D,
        Cube3D,
        Cylinder3D,
        Torus3D,
        Star3D,
        Heart3D,
        ModelComponent
    };
} else if (typeof window !== 'undefined') {
    window.Letter3D = Letter3D;
    window.Sphere3D = Sphere3D;
    window.Cube3D = Cube3D;
    window.Cylinder3D = Cylinder3D;
    window.Torus3D = Torus3D;
    window.Star3D = Star3D;
    window.Heart3D = Heart3D;
    window.ModelComponent = ModelComponent;
}
