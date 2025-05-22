// Initialize canvas and context
const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Load fruit images
const fruits = [];
const fruitImages = [
    { src: 'Fruits/Apple.png', name: 'apple' },
    { src: 'Fruits/banana.png', name: 'banana' },
    { src: 'Fruits/Strawberry.png', name: 'strawberry' }
];

// Load all fruit images
let loadedImages = 0;
fruitImages.forEach(fruit => {
    const img = new Image();
    img.src = fruit.src;
    img.onload = () => {
        loadedImages++;
        if (loadedImages === fruitImages.length) {
            // Start animation only when all images are loaded
            animate();
        }
    };
    fruits.push(img);
});

// Add mouse position tracking
let mouseX = width / 2;
let mouseY = height / 2;
let mouseRadius = 90; // Area of influence

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Handle resize
window.addEventListener('resize', () => {
    window.location.reload();
});

// Starfield setup
const STAR_COUNT = 50; // Reduced count since fruits are larger
const stars = [];
for (let i = 0; i < STAR_COUNT; i++) {
    const x = (Math.random() - 0.5) * width;
    const y = (Math.random() - 0.5) * height;
    const z = Math.random() * width;
    stars.push({
        originalX: x,
        originalY: y,
        originalZ: z,
        x: x,
        y: y,
        z: z,
        o: 0.4 + Math.random() * 0.4, // Increased base opacity
        fruitIndex: Math.floor(Math.random() * fruits.length),
        rotation: Math.random() * Math.PI * 2
    });
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);
    for (let star of stars) {
        // Calculate distance from mouse
        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If star is within mouse radius, push it away
        if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            star.x += dx * force * 0.1;
            star.y += dy * force * 1;
        }

        // Return to original position gradually
        star.x += (star.originalX - star.x) * 0.05;
        star.y += (star.originalY - star.y) * 0.05;
        star.z += (star.originalZ - star.z) * 0.05;

        // Move star
        star.originalZ -= 1;
        star.z = star.originalZ;
        if (star.originalZ <= 0) {
            star.originalX = (Math.random() - 0.5) * width;
            star.originalY = (Math.random() - 0.5) * height;
            star.originalZ = width;
            star.x = star.originalX;
            star.y = star.originalY;
            star.z = star.originalZ;
            star.fruitIndex = Math.floor(Math.random() * fruits.length);
        }

        // Project 3D to 2D
        const k = 128.0 / star.z;
        const sx = star.x * k + width / 2;
        const sy = star.y * k + height / 2;
        if (sx < 0 || sx >= width || sy < 0 || sy >= height) continue;
        
        // Calculate size based on z position
        const size = (1 - star.z / width) * 50; // Increased size for fruits
        
        // Save context state
        ctx.save();
        
        // Translate to the center of the fruit
        ctx.translate(sx, sy);
        
        // Rotate the fruit
        star.rotation += 0.01;
        ctx.rotate(star.rotation);
        
        // Add shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        // Draw the fruit image
        const fruit = fruits[star.fruitIndex];
        ctx.globalAlpha = star.o;
        ctx.drawImage(fruit, -size/2, -size/2, size, size);
        
        // Restore context state
        ctx.restore();
    }
}

function animate() {
    drawStars();
    requestAnimationFrame(animate);
}

// Start the animation
animate();