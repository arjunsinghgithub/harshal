// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    initializeBackgroundEffects();
    setupButtons();
    createParticles();
});

// ===== BACKGROUND EFFECTS =====
function createFloatingHearts() {
    const heartBg = document.getElementById('heartBg');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓', '💞'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heartBg.appendChild(heart);
    }
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const endX = (Math.random() - 0.5) * 200;
        const endY = (Math.random() - 0.5) * 200;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.setProperty('--tx', endX + 'px');
        particle.style.setProperty('--ty', endY + 'px');
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

function initializeBackgroundEffects() {
    createFloatingHearts();
}

// ===== BUTTON SETUP =====
function setupButtons() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const buttonsContainer = document.getElementById('buttonsContainer');
    
    // Position No button initially
    positionNoButton();
    
    // Event listeners
    document.addEventListener('mousemove', handleNoButtonMove);
    noBtn.addEventListener('touchstart', handleNoButtonTouch);
    noBtn.addEventListener('click', handleNoButtonClick);
    yesBtn.addEventListener('click', handleYesButtonClick);
}

// ===== NO BUTTON FUNCTIONS =====
function positionNoButton() {
    const noBtn = document.getElementById('noBtn');
    const buttonsContainer = document.getElementById('buttonsContainer');
    const containerRect = buttonsContainer.getBoundingClientRect();
    
    noBtn.style.left = '60%';
    noBtn.style.top = '0';
}

function handleNoButtonMove(e) {
    const noBtn = document.getElementById('noBtn');
    const buttonsContainer = document.getElementById('buttonsContainer');
    const noRect = noBtn.getBoundingClientRect();
    const containerRect = buttonsContainer.getBoundingClientRect();
    
    const noCenterX = noRect.left + noRect.width / 2;
    const noCenterY = noRect.top + noRect.height / 2;
    
    const distance = Math.sqrt(
        Math.pow(e.clientX - noCenterX, 2) + 
        Math.pow(e.clientY - noCenterY, 2)
    );
    
    // If cursor is close to the button (within 120px), move it
    if (distance < 120) {
        moveNoButtonToRandomPosition();
    }
}

function handleNoButtonTouch(e) {
    e.preventDefault();
    moveNoButtonToRandomPosition();
}

function handleNoButtonClick(e) {
    e.preventDefault();
    moveNoButtonToRandomPosition();
    
    // Add a playful shake to the container
    const container = document.querySelector('.container');
    container.style.animation = 'none';
    setTimeout(() => {
        container.style.animation = 'shake 0.5s ease-in-out';
    }, 10);
}

function moveNoButtonToRandomPosition() {
    const noBtn = document.getElementById('noBtn');
    const buttonsContainer = document.getElementById('buttonsContainer');
    const containerRect = buttonsContainer.getBoundingClientRect();
    
    const maxX = containerRect.width - noBtn.offsetWidth;
    const maxY = containerRect.height - noBtn.offsetHeight;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    
    // Add rotation effect
    const rotation = (Math.random() - 0.5) * 20;
    noBtn.style.transform = `rotate(${rotation}deg)`;
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ===== YES BUTTON FUNCTION =====
function handleYesButtonClick() {
    const proposalContent = document.getElementById('proposalContent');
    const successMessage = document.getElementById('successMessage');
    const container = document.querySelector('.container');
	document.getElementById("heading").innerText = "Yay! ❤️";
    
    // Hide proposal content
    proposalContent.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Change container background
    container.style.background = 'linear-gradient(135deg, rgba(255, 182, 193, 0.95) 0%, rgba(255, 240, 245, 0.95) 100%)';
    container.style.boxShadow = '0 30px 90px rgba(255, 23, 68, 0.5), 0 0 100px rgba(255, 105, 180, 0.3)';
    
    // Trigger all celebration effects
    createConfetti();
    startFireworks();
    createHeartExplosion();
    pulseBackground();
    playSuccessSound();
    
    // Add special glow effect to container
    setTimeout(() => {
        container.style.animation = 'successGlow 2s ease-in-out infinite';
    }, 500);
}

// ===== CELEBRATION EFFECTS =====

// 1. Confetti Effect
function createConfetti() {
    const colors = ['#ff1744', '#f50057', '#ff4081', '#ff80ab', '#ffc0cb', '#ffb6c1', '#ff69b4', '#ff1493'];
    const shapes = ['circle', 'square', 'triangle'];
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            // Random shapes
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            if (shape === 'square') {
                confetti.style.borderRadius = '0';
            } else if (shape === 'triangle') {
                confetti.style.borderRadius = '0';
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.borderLeft = '6px solid transparent';
                confetti.style.borderRight = '6px solid transparent';
                confetti.style.borderBottom = '12px solid ' + confetti.style.background;
                confetti.style.background = 'transparent';
            }
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// 2. Fireworks Effect
function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';
    
    const particles = [];
    const colors = ['#ff1744', '#f50057', '#ff4081', '#ff80ab', '#ffc0cb', '#ffb6c1'];
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.015;
            this.size = Math.random() * 3 + 2;
        }
        
        update() {
            this.velocity.y += 0.1;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    function createFirework(x, y) {
        const particleCount = 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(x, y, color));
        }
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                particle.update();
                particle.draw();
            }
        });
        
        if (particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            canvas.style.display = 'none';
        }
    }
    
    // Create multiple fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height * 0.5;
            createFirework(x, y);
            if (i === 0) animate();
        }, i * 300);
    }
}

// 3. Heart Explosion
function createHeartExplosion() {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓', '💞'];
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.left = (containerRect.left + containerRect.width / 2) + 'px';
            heart.style.top = (containerRect.top + containerRect.height / 2) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = Math.random() * 5 + 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            document.body.appendChild(heart);
            
            let opacity = 1;
            let x = parseFloat(heart.style.left);
            let y = parseFloat(heart.style.top);
            
            const animateHeart = () => {
                x += vx;
                y += vy;
                opacity -= 0.02;
                
                heart.style.left = x + 'px';
                heart.style.top = y + 'px';
                heart.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animateHeart);
                } else {
                    heart.remove();
                }
            };
            
            animateHeart();
        }, i * 50);
    }
}

// 4. Background Pulse Effect
function pulseBackground() {
    const body = document.body;
    let hue = 350;
    let increasing = true;
    let count = 0;
    
    const interval = setInterval(() => {
        if (increasing) {
            hue += 2;
            if (hue >= 360) increasing = false;
        } else {
            hue -= 2;
            if (hue <= 340) {
                increasing = true;
                count++;
            }
        }
        
        body.style.background = `linear-gradient(135deg, 
            hsl(${hue}, 100%, 85%) 0%, 
            hsl(${hue + 10}, 100%, 90%) 50%, 
            hsl(${hue + 20}, 100%, 95%) 100%)`;
        
        if (count >= 3) {
            clearInterval(interval);
            body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #ffecd2 100%)';
        }
    }, 50);
}

// 5. Success Sound (visual representation)
function playSuccessSound() {
    // Create visual sound waves
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.style.position = 'fixed';
            wave.style.left = (containerRect.left + containerRect.width / 2 - 100) + 'px';
            wave.style.top = (containerRect.top + containerRect.height / 2 - 100) + 'px';
            wave.style.width = '200px';
            wave.style.height = '200px';
            wave.style.border = '3px solid rgba(255, 23, 68, 0.6)';
            wave.style.borderRadius = '50%';
            wave.style.pointerEvents = 'none';
            wave.style.zIndex = '9998';
            
            document.body.appendChild(wave);
            
            let scale = 1;
            let opacity = 0.6;
            
            const animateWave = () => {
                scale += 0.05;
                opacity -= 0.02;
                
                wave.style.transform = `translate(-50%, -50%) scale(${scale})`;
                wave.style.opacity = opacity;
                wave.style.left = (containerRect.left + containerRect.width / 2) + 'px';
                wave.style.top = (containerRect.top + containerRect.height / 2) + 'px';
                
                if (opacity > 0) {
                    requestAnimationFrame(animateWave);
                } else {
                    wave.remove();
                }
            };
            
            animateWave();
        }, i * 200);
    }
}

// Add success glow animation
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    @keyframes successGlow {
        0%, 100% {
            box-shadow: 0 30px 90px rgba(255, 23, 68, 0.5), 0 0 100px rgba(255, 105, 180, 0.3);
        }
        50% {
            box-shadow: 0 30px 90px rgba(255, 23, 68, 0.8), 0 0 150px rgba(255, 105, 180, 0.6);
        }
    }
`;
document.head.appendChild(glowStyle);

// Handle window resize for particles
window.addEventListener('resize', () => {
    const particlesContainer = document.getElementById('particles');
    particlesContainer.innerHTML = '';
    createParticles();
});

const BACKEND_URL = "https://harshal-q28x.onrender.com/response";

document.getElementById("yesBtn").addEventListener("click", () => {
  sendResponse("YES");
});

document.getElementById("noBtn").addEventListener("click", () => {
  sendResponse("NO");
});

function sendResponse(answer) {
  fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ answer })
  })
  .then(res => res.json())
  .then(() => {
    console.log("Response sent:", answer);
  })
  .catch(err => {
    console.error("Error:", err);
  });
}

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // VERY IMPORTANT
app.use(express.json());
