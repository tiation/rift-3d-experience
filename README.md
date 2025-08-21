# Rift 3D Experience 🎮

Interactive 3D experiences with scroll-based animations! Choose from multiple stunning 3D shapes that rotate and move with your scroll, just like the original Rift skateboard app.

![Rift 3D Experience](https://via.placeholder.com/800x400/667eea/white?text=Rift+3D+Experience)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/rift-3d-experience.git
cd rift-3d-experience

# Run the interactive menu
node start.js
```

That's it! Choose your favorite 3D shape and enjoy the experience.

## 🎯 Available 3D Experiences

| Shape | Description | Preview |
|-------|-------------|----------|
| 🛹 Skateboard | Classic skateboard with rotation animation | Original Rift experience |
| 🎸 Guitar | Musical guitar with floating notes | Guitar + letter G + musical note |
| ⚪ Sphere | Smooth sphere with reflective surface | Perfect geometry |
| 🔲 Cube | Geometric cube with sharp edges | Clean minimalist design |
| 🍩 Torus | Donut-shaped torus ring | Elegant curved form |
| 💎 Diamond | Brilliant diamond crystal | Sparkling octahedron |
| 🚀 Rocket | Space rocket with fins | Multi-part spacecraft |

## Features

✨ **Easy Integration** - Just a few lines of code  
🎯 **Modular Design** - Use only what you need  
📱 **Responsive** - Automatically adapts to different screen sizes  
🎭 **Rich Animations** - Built-in rotation, bounce, float, and pulse effects  
🎨 **Customizable** - Full control over materials, positions, and behaviors  
🚀 **Performance Optimized** - Efficient rendering with Three.js  

## Quick Start

### 1. Include Dependencies

```html
<!-- Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<!-- RiftComponents -->
<script src="rift-components.js"></script>
<script src="rift-components-library.js"></script>
```

### 2. Basic Setup

```html
<div id="three-container"></div>

<script>
// Initialize RiftComponents
const rift = new RiftComponents({
    container: document.getElementById('three-container'),
    background: 'transparent'
});

// Add a 3D letter
const letterA = new Letter3D(rift, 'A', {
    position: { x: 0, y: 0, z: 0 },
    animations: [
        { type: 'rotation', speed: 1, axis: 'y' }
    ]
});

// Add to scene
rift.addComponent(letterA);
</script>
```

## API Reference

### RiftComponents (Main Class)

Initialize the 3D environment.

```javascript
const rift = new RiftComponents(options);
```

**Options:**
- `container` (Element) - DOM element to render into
- `background` (String) - 'transparent' or color hex
- `responsive` (Boolean) - Enable responsive behavior (default: true)
- `enableScrollAnimation` (Boolean) - Enable scroll-based camera movement (default: true)
- `scrollTarget` (Element|Window) - Element to track for scroll events (default: window)
- `camera` (Object) - Camera configuration
  - `fov` (Number) - Field of view (default: 45)
  - `near` (Number) - Near clipping plane (default: 0.1)
  - `far` (Number) - Far clipping plane (default: 50)
  - `position` (Object) - Camera position {x, y, z}

**Methods:**
- `addComponent(component)` - Add a component to the scene
- `removeComponent(component)` - Remove a component from the scene
- `createMaterial(options)` - Create a material with environment mapping
- `destroy()` - Clean up and remove from DOM

### Components

#### Letter3D

Create 3D extruded letters.

```javascript
const letter = new Letter3D(riftInstance, letter, options);
```

**Parameters:**
- `riftInstance` - RiftComponents instance
- `letter` (String) - Single letter to create (A-Z)
- `options` (Object) - Configuration options

**Available Letters:** A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z

#### Sphere3D

Create 3D spheres.

```javascript
const sphere = new Sphere3D(riftInstance, options);
```

**Options:**
- `radius` (Number) - Sphere radius (default: 1)
- `segments` (Number) - Sphere segments (default: 32)

#### Cube3D

Create 3D cubes.

```javascript
const cube = new Cube3D(riftInstance, options);
```

**Options:**
- `size` (Number) - Cube size (default: 1)

#### Cylinder3D

Create 3D cylinders.

```javascript
const cylinder = new Cylinder3D(riftInstance, options);
```

**Options:**
- `radiusTop` (Number) - Top radius (default: 1)
- `radiusBottom` (Number) - Bottom radius (default: 1)
- `height` (Number) - Cylinder height (default: 2)
- `segments` (Number) - Radial segments (default: 32)

#### Torus3D

Create 3D torus shapes.

```javascript
const torus = new Torus3D(riftInstance, options);
```

**Options:**
- `radius` (Number) - Main radius (default: 1)
- `tube` (Number) - Tube radius (default: 0.3)
- `radialSegments` (Number) - Radial segments (default: 16)
- `tubularSegments` (Number) - Tubular segments (default: 100)

#### Star3D

Create 3D star shapes.

```javascript
const star = new Star3D(riftInstance, options);
```

**Options:**
- `points` (Number) - Number of star points (default: 5)
- `outerRadius` (Number) - Outer radius (default: 1)
- `innerRadius` (Number) - Inner radius (default: 0.5)
- `depth` (Number) - Extrusion depth (default: 0.2)

#### Heart3D

Create 3D heart shapes.

```javascript
const heart = new Heart3D(riftInstance, options);
```

**Options:**
- `size` (Number) - Heart size (default: 1)
- `depth` (Number) - Extrusion depth (default: 0.2)

#### ModelComponent

Load 3D models from OBJ files.

```javascript
const model = new ModelComponent(riftInstance, modelUrl, options);
```

**Parameters:**
- `modelUrl` (String) - Path to OBJ file
- `options` (Object) - Configuration options
  - `onLoad` (Function) - Callback when model loads
  - `onProgress` (Function) - Progress callback
  - `onError` (Function) - Error callback

### Universal Component Options

All components support these options:

#### Positioning & Transformation
```javascript
{
    position: { x: 0, y: 0, z: 0 },    // 3D position
    rotation: { x: 0, y: 0, z: 0 },    // 3D rotation (radians)
    scale: { x: 1, y: 1, z: 1 }        // 3D scale
}
```

#### Material Customization
```javascript
{
    material: {
        color: 0xffffff,      // Hex color
        shininess: 100,       // Material shininess
        transparent: false,   // Enable transparency
        opacity: 1.0          // Opacity (0-1)
    }
}
```

#### Animations
```javascript
{
    animations: [
        {
            type: 'rotation',     // Animation type
            speed: 1,             // Animation speed
            axis: 'y',            // Rotation axis (x, y, z)
            enabled: true         // Enable/disable
        },
        {
            type: 'bounce',       // Bouncing animation
            speed: 2,             // Bounce speed
            amplitude: 1,         // Bounce distance
            axis: 'z'             // Bounce axis
        },
        {
            type: 'float',        // Floating animation
            speed: 1,             // Float speed
            amplitude: 0.5        // Float distance
        },
        {
            type: 'pulse',        // Pulsing scale
            speed: 2,             // Pulse speed
            minScale: 0.8,        // Minimum scale
            maxScale: 1.2         // Maximum scale
        }
    ]
}
```

#### Responsive Design
```javascript
{
    responsive: {
        mobile: {                    // < 420px
            position: { x: 0, y: -1, z: 0 },
            scale: { x: 0.8, y: 0.8, z: 0.8 }
        },
        tablet: {                    // < 770px
            position: { x: 0, y: -0.5, z: 0 },
            scale: { x: 0.9, y: 0.9, z: 0.9 }
        },
        desktop: {                   // >= 770px
            position: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 }
        }
    }
}
```

## Examples

### Simple Logo Animation

```javascript
// Create floating letters for your logo
const rift = new RiftComponents({
    container: document.getElementById('logo-container')
});

'LOGO'.split('').forEach((letter, index) => {
    const letterComponent = new Letter3D(rift, letter, {
        position: { x: index * 2 - 3, y: 0, z: 0 },
        animations: [
            { type: 'float', speed: 1 + index * 0.2, amplitude: 0.3 },
            { type: 'rotation', speed: 0.5, axis: 'y' }
        ]
    });
    rift.addComponent(letterComponent);
});
```

### Product Showcase

```javascript
// Rotating product model with floating elements
const product = new ModelComponent(rift, 'product.obj', {
    position: { x: 0, y: 0, z: 0 },
    animations: [
        { type: 'rotation', speed: 0.5, axis: 'y' }
    ]
});

// Floating stars around product
for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const star = new Star3D(rift, {
        position: { 
            x: Math.cos(angle) * 3, 
            y: Math.sin(angle) * 2, 
            z: 1 
        },
        material: { color: 0xffgold },
        animations: [
            { type: 'rotation', speed: 2, axis: 'z' },
            { type: 'pulse', speed: 1.5 }
        ]
    });
    rift.addComponent(star);
}
```

### Hero Section Enhancement

```javascript
// Add 3D elements to a hero section
const hero = new RiftComponents({
    container: document.getElementById('hero-bg'),
    background: 'transparent',
    enableScrollAnimation: true
});

// Background geometric shapes
const shapes = [
    new Sphere3D(hero, { 
        position: { x: -4, y: 2, z: -2 },
        material: { color: 0x667eea, opacity: 0.7, transparent: true },
        animations: [{ type: 'float', speed: 0.8 }]
    }),
    new Cube3D(hero, { 
        position: { x: 4, y: -2, z: -1 },
        material: { color: 0x764ba2, opacity: 0.8, transparent: true },
        animations: [{ type: 'rotation', speed: 0.5, axis: 'x' }]
    })
];

shapes.forEach(shape => hero.addComponent(shape));
```

## Integration Tips

### Performance
- Use fewer segments for better performance on mobile
- Limit the number of animated components
- Consider using `transparent: false` when opacity isn't needed

### Styling
- Position the 3D container with `position: fixed` for background effects
- Use `pointer-events: none` to prevent interaction blocking
- Layer with `z-index` for proper stacking

### Responsive Design
- Always define responsive breakpoints for mobile compatibility
- Test on different screen sizes
- Consider disabling complex animations on smaller screens

## Browser Support

- Chrome 58+
- Firefox 55+
- Safari 11+
- Edge 79+

Requires WebGL support.

## Dependencies

- Three.js r128+

## License

MIT License - feel free to use in personal and commercial projects.

## Examples in This Repository

- `example-basic.html` - Basic integration example
- `index.html` - Original skateboard Rift replica
- Try them locally with: `python3 -m http.server 8000`

## Contributing

Feel free to contribute new component types, animations, or improvements!

1. Fork the repository
2. Create your feature branch
3. Add your component to `rift-components-library.js`
4. Test with the examples
5. Submit a pull request

---

**Made with ❤️ for the 3D web**
