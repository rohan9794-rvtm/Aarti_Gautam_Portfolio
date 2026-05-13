// ========== SHARED JAVASCRIPT FOR ALL PAGES ==========

// ========== CANVAS ANIMATION FOR BANNER ==========
// ========== ULTIMATE 3D CINEMATIC BANNER ANIMATION ==========
const cinematicCanvas = document.getElementById('cinematicCanvas');
if (cinematicCanvas) {
  const ctx = cinematicCanvas.getContext('2d');
  let width = cinematicCanvas.width = cinematicCanvas.clientWidth;
  let height = cinematicCanvas.height = cinematicCanvas.clientHeight;
  let time = 0;
  let mouseX = width / 2;
  let mouseY = height / 2;
  
  cinematicCanvas.addEventListener('mousemove', (e) => {
    const rect = cinematicCanvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * width;
    mouseY = ((e.clientY - rect.top) / rect.height) * height;
  });
  
  // ===== 1. 3D PARTICLE SYSTEM (500 particles) =====
  const particles = [];
  for (let i = 0; i < 500; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 400,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: 1 + Math.random() * 3,
      color: `hsl(${Math.random() * 60 + 300}, 80%, 65%)`,
      alpha: 0.3 + Math.random() * 0.5
    });
  }
  
  // ===== 2. 3D FLOATING CUBES =====
  const cubes = [];
  for (let i = 0; i < 40; i++) {
    cubes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 300,
      size: 10 + Math.random() * 25,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: 0.005 + Math.random() * 0.01,
      color: `hsla(${Math.random() * 60 + 300}, 80%, 60%, 0.25)`
    });
  }
  
  // ===== 3. AURORA WAVES =====
  function drawAurora(t) {
    ctx.save();
    ctx.globalAlpha = 0.2;
    
    for (let wave = 0; wave < 5; wave++) {
      ctx.beginPath();
      const offset = wave * 50;
      const amplitude = 40 + Math.sin(t * 0.5 + wave) * 15;
      
      for (let x = 0; x <= width; x += 15) {
        const y = height * 0.5 + 
          Math.sin(x * 0.008 + t * 1.2) * amplitude +
          Math.cos(x * 0.005 + t) * 20 +
          offset;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, height * 0.3, 0, height);
      gradient.addColorStop(0, `hsla(${300 + wave * 40}, 70%, 60%, 0.15)`);
      gradient.addColorStop(1, `hsla(${300 + wave * 40}, 70%, 60%, 0)`);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    ctx.restore();
  }
  
  // ===== 4. ROTATING LIGHT BEAMS =====
  function drawLightBeams(t) {
    ctx.save();
    ctx.globalAlpha = 0.08;
    
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + t * 0.15;
      const gradient = ctx.createLinearGradient(
        width/2, height/2,
        width/2 + Math.cos(angle) * width,
        height/2 + Math.sin(angle) * height
      );
      gradient.addColorStop(0, `hsla(${50 + t * 30}, 80%, 60%, 0.5)`);
      gradient.addColorStop(1, `hsla(${50 + t * 30}, 80%, 60%, 0)`);
      
      ctx.beginPath();
      ctx.moveTo(width/2, height/2);
      ctx.lineTo(width/2 + Math.cos(angle) * width, height/2 + Math.sin(angle) * height);
      ctx.lineWidth = 100;
      ctx.strokeStyle = gradient;
      ctx.stroke();
    }
    
    ctx.restore();
  }
  
  // ===== 5. TWINKLING STARS =====
  const stars = [];
  for (let i = 0; i < 300; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1 + Math.random() * 2,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.5
    });
  }
  
  function drawStars(t) {
    stars.forEach(star => {
      const brightness = 0.3 + Math.sin(t * star.speed + star.twinkle) * 0.3;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness * 0.6})`;
      ctx.fill();
    });
  }
  
  // ===== 6. 3D PARTICLES WITH DEPTH =====
  function drawParticles() {
    particles.forEach(p => {
      const scale = 300 / (p.z + 300);
      const x = p.x + (mouseX - width/2) * (p.z / 1500);
      const y = p.y + (mouseY - height/2) * (p.z / 1500);
      const size = p.size * scale;
      
      if (x > 0 && x < width && y > 0 && y < height && size > 0.3) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      }
      
      p.x += p.vx;
      p.y += p.vy;
      p.z -= 0.8;
      
      if (p.x < -100) p.x = width + 100;
      if (p.x > width + 100) p.x = -100;
      if (p.y < -100) p.y = height + 100;
      if (p.y > height + 100) p.y = -100;
      if (p.z < 0) {
        p.z = 400;
        p.x = Math.random() * width;
        p.y = Math.random() * height;
      }
    });
  }
  
  // ===== 7. 3D CUBES RENDERING =====
  function drawCubes() {
    cubes.forEach(cube => {
      const scale = 250 / (cube.z + 250);
      const x = cube.x + (mouseX - width/2) * (cube.z / 1500);
      const y = cube.y + (mouseY - height/2) * (cube.z / 1500);
      const size = cube.size * scale;
      
      if (x > 0 && x < width && y > 0 && y < height && size > 2) {
        cube.rotation += cube.rotSpeed;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(cube.rotation);
        ctx.fillStyle = cube.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = cube.color;
        ctx.fillRect(-size/2, -size/2, size, size);
        ctx.restore();
      }
      
      cube.x += cube.vx;
      cube.y += cube.vy;
      cube.z += cube.vz;
      
      if (cube.x < -200) cube.x = width + 200;
      if (cube.x > width + 200) cube.x = -200;
      if (cube.y < -200) cube.y = height + 200;
      if (cube.y > height + 200) cube.y = -200;
      if (cube.z < 0) {
        cube.z = 300;
        cube.x = Math.random() * width;
        cube.y = Math.random() * height;
      }
    });
  }
  
  // ===== 8. GLOWING ORBS =====
  const orbs = [];
  for (let i = 0; i < 10; i++) {
    orbs.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 60 + Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      pulseSpeed: 0.3 + Math.random() * 0.5,
      color: `hsla(${Math.random() * 60 + 300}, 80%, 60%, 0.06)`
    });
  }
  
  function drawOrbs(t) {
    orbs.forEach(orb => {
      orb.x += orb.vx;
      orb.y += orb.vy;
      
      if (orb.x < -orb.radius) orb.x = width + orb.radius;
      if (orb.x > width + orb.radius) orb.x = -orb.radius;
      if (orb.y < -orb.radius) orb.y = height + orb.radius;
      if (orb.y > height + orb.radius) orb.y = -orb.radius;
      
      const pulse = Math.sin(t * orb.pulseSpeed) * 15;
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius + pulse);
      gradient.addColorStop(0, orb.color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    });
  }
  
  // ===== 9. BACKGROUND GRADIENT =====
  function drawBackground(t) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(0.3, '#1a0a2e');
    gradient.addColorStop(0.6, '#2d1b4e');
    gradient.addColorStop(1, '#5b2c56');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Animated noise texture
    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.03})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
  }
  
  // ===== 10. MOUSE INTERACTIVE GLOW =====
  function drawMouseGlow() {
    const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
    gradient.addColorStop(0, 'rgba(255, 200, 100, 0.12)');
    gradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  // ===== MAIN ANIMATION LOOP =====
  function animateCinematic() {
    ctx.clearRect(0, 0, width, height);
    
    drawBackground(time);
    drawOrbs(time);
    drawAurora(time);
    drawLightBeams(time);
    drawStars(time);
    drawCubes();
    drawParticles();
    drawMouseGlow();
    
    time += 0.02;
    requestAnimationFrame(animateCinematic);
  }
  
  window.addEventListener('resize', () => {
    width = cinematicCanvas.width = cinematicCanvas.clientWidth;
    height = cinematicCanvas.height = cinematicCanvas.clientHeight;
  });
  
  animateCinematic();
}

// ========== ROLE TEXT ROTATION ==========
const roles = ['Graphic Designer', 'Art Director', 'Brand Identity', 'Visual Creator', 'Design Thinker'];
let roleIndex = 0;
const roleElement = document.getElementById('roleText');

if (roleElement) {
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleElement.style.opacity = '0';
    roleElement.style.transform = 'translateY(-10px)';
    roleElement.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
      roleElement.textContent = roles[roleIndex];
      roleElement.style.opacity = '1';
      roleElement.style.transform = 'translateY(0)';
    }, 300);
  }, 2500);
}

// ========== ENHANCED PROJECTS PAGE - PREMIUM BANNER ANIMATION ==========
const projectsCanvas = document.getElementById('projectsCanvas');
if (projectsCanvas) {
  const ctx = projectsCanvas.getContext('2d');
  let width = projectsCanvas.width = projectsCanvas.clientWidth;
  let height = projectsCanvas.height = projectsCanvas.clientHeight;
  let time = 0;
  let mouseX = width / 2;
  let mouseY = height / 2;
  
  projectsCanvas.addEventListener('mousemove', (e) => {
    const rect = projectsCanvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * width;
    mouseY = ((e.clientY - rect.top) / rect.height) * height;
  });
  
  // ===== 1. FLOATING GEOMETRIC SHAPES =====
  const shapes = [];
  for (let i = 0; i < 30; i++) {
    shapes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 20 + Math.random() * 40,
      rotation: Math.random() * Math.PI * 2,
      speed: 0.003 + Math.random() * 0.01,
      type: Math.floor(Math.random() * 3),
      color: `hsla(${Math.random() * 60 + 300}, 80%, 65%, 0.2)`
    });
  }
  
  // ===== 2. GLOWING PARTICLES =====
  const particles = [];
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: 2 + Math.random() * 4,
      color: `hsla(${Math.random() * 60 + 300}, 85%, 65%, 0.6)`
    });
  }
  
  // ===== 3. FLOATING ORBS =====
  const orbs = [];
  for (let i = 0; i < 12; i++) {
    orbs.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 60 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      pulseSpeed: 0.3 + Math.random() * 0.5,
      color: `hsla(${Math.random() * 60 + 300}, 80%, 60%, 0.06)`
    });
  }
  
  // ===== 4. ROTATING LINES =====
  function drawRotatingLines(t) {
    ctx.save();
    ctx.globalAlpha = 0.15;
    
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2 + t * 0.1;
      const x2 = width/2 + Math.cos(angle) * width;
      const y2 = height/2 + Math.sin(angle) * height;
      
      ctx.beginPath();
      ctx.moveTo(width/2, height/2);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `hsla(${50 + t * 30}, 80%, 60%, 0.3)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    ctx.restore();
  }
  
  // ===== 5. BACKGROUND GRADIENT =====
  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(0.4, '#1a0a2e');
    gradient.addColorStop(0.7, '#2d1b4e');
    gradient.addColorStop(1, '#5b2c56');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Subtle noise
    for (let i = 0; i < 150; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.03})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
  }
  
  // ===== 6. DRAW PARTICLES =====
  function drawParticles() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.x -= dx * 0.02;
        p.y -= dy * 0.02;
      }
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
    });
  }
  
  // ===== 7. DRAW SHAPES =====
  function drawShapes() {
    shapes.forEach(shape => {
      shape.rotation += shape.speed;
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.fillStyle = shape.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = shape.color;
      
      if (shape.type === 0) {
        ctx.fillRect(-shape.size/2, -shape.size/2, shape.size, shape.size);
      } else if (shape.type === 1) {
        ctx.beginPath();
        ctx.arc(0, 0, shape.size/2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const angle = (i / 3) * Math.PI * 2;
          const x = Math.cos(angle) * shape.size/1.5;
          const y = Math.sin(angle) * shape.size/1.5;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    });
  }
  
  // ===== 8. DRAW ORBS =====
  function drawOrbs(t) {
    orbs.forEach(orb => {
      orb.x += orb.vx;
      orb.y += orb.vy;
      
      if (orb.x < -orb.radius) orb.x = width + orb.radius;
      if (orb.x > width + orb.radius) orb.x = -orb.radius;
      if (orb.y < -orb.radius) orb.y = height + orb.radius;
      if (orb.y > height + orb.radius) orb.y = -orb.radius;
      
      const pulse = Math.sin(t * orb.pulseSpeed) * 12;
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius + pulse);
      gradient.addColorStop(0, orb.color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    });
  }
  
  // ===== 9. MOUSE GLOW =====
  function drawMouseGlow() {
    const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 180);
    gradient.addColorStop(0, 'rgba(255, 200, 100, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 200, 100, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  // ===== 10. ENERGY RINGS =====
  function drawEnergyRings(t) {
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      const radius = 100 + i * 50 + Math.sin(t * 2) * 20;
      ctx.arc(width/2, height/2, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${300 + i * 30 + t * 50}, 80%, 60%, 0.2)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
  
  // ===== MAIN ANIMATION LOOP =====
  function animateProjectsBanner() {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    drawOrbs(time);
    drawRotatingLines(time);
    drawEnergyRings(time);
    drawShapes();
    drawParticles();
    drawMouseGlow();
    
    time += 0.02;
    requestAnimationFrame(animateProjectsBanner);
  }
  
  window.addEventListener('resize', () => {
    width = projectsCanvas.width = projectsCanvas.clientWidth;
    height = projectsCanvas.height = projectsCanvas.clientHeight;
  });
  
  animateProjectsBanner();
}

// ========== UNIQUE ABOUT PAGE - DREAMY PARTICLE ANIMATION ==========
const aboutCanvas = document.getElementById('aboutCanvas');
if (aboutCanvas) {
  const ctx = aboutCanvas.getContext('2d');
  let width = aboutCanvas.width = aboutCanvas.clientWidth;
  let height = aboutCanvas.height = aboutCanvas.clientHeight;
  let time = 0;
  let mouseX = width / 2;
  let mouseY = height / 2;
  
  aboutCanvas.addEventListener('mousemove', (e) => {
    const rect = aboutCanvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * width;
    mouseY = ((e.clientY - rect.top) / rect.height) * height;
  });
  
  // ===== 1. DREAMY BUBBLES =====
  const bubbles = [];
  for (let i = 0; i < 50; i++) {
    bubbles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 10 + Math.random() * 40,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: `hsla(${Math.random() * 60 + 300}, 80%, 70%, 0.08)`
    });
  }
  
  // ===== 2. FLOATING HEARTS/STARS =====
  const floatingElements = [];
  for (let i = 0; i < 80; i++) {
    floatingElements.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 2 + Math.random() * 5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      type: Math.random() > 0.7 ? 'heart' : 'star',
      color: `hsla(${Math.random() * 60 + 300}, 85%, 70%, 0.5)`
    });
  }
  
  // ===== 3. SOFT WAVES =====
  function drawSoftWaves(t) {
    ctx.save();
    ctx.globalAlpha = 0.15;
    
    for (let wave = 0; wave < 4; wave++) {
      ctx.beginPath();
      const offset = wave * 40;
      const amplitude = 25 + Math.sin(t * 0.5 + wave) * 10;
      
      for (let x = 0; x <= width; x += 20) {
        const y = height * 0.6 + 
          Math.sin(x * 0.01 + t * 0.8) * amplitude +
          Math.cos(x * 0.008 + t) * 15 +
          offset;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, height * 0.4, 0, height);
      gradient.addColorStop(0, `hsla(${300 + wave * 40}, 70%, 65%, 0.1)`);
      gradient.addColorStop(1, `hsla(${300 + wave * 40}, 70%, 65%, 0)`);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    ctx.restore();
  }
  
  // ===== 4. DRAW BUBBLES =====
  function drawBubbles() {
    bubbles.forEach(b => {
      b.x += b.vx;
      b.y += b.vy;
      
      if (b.x < -b.radius) b.x = width + b.radius;
      if (b.x > width + b.radius) b.x = -b.radius;
      if (b.y < -b.radius) b.y = height + b.radius;
      if (b.y > height + b.radius) b.y = -b.radius;
      
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.fill();
      
      // Inner highlight
      ctx.beginPath();
      ctx.arc(b.x - b.radius * 0.2, b.y - b.radius * 0.2, b.radius * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fill();
    });
  }
  
  // ===== 5. DRAW FLOATING ELEMENTS =====
  function drawFloatingElements() {
    floatingElements.forEach(el => {
      el.x += el.vx;
      el.y += el.vy;
      
      if (el.x < -20) el.x = width + 20;
      if (el.x > width + 20) el.x = -20;
      if (el.y < -20) el.y = height + 20;
      if (el.y > height + 20) el.y = -20;
      
      ctx.save();
      ctx.shadowBlur = 8;
      ctx.shadowColor = el.color;
      
      if (el.type === 'star') {
        // Draw star
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 72 - 90) * Math.PI / 180;
          const x1 = el.x + Math.cos(angle) * el.size;
          const y1 = el.y + Math.sin(angle) * el.size;
          const x2 = el.x + Math.cos(angle + 36 * Math.PI / 180) * (el.size * 0.4);
          const y2 = el.y + Math.sin(angle + 36 * Math.PI / 180) * (el.size * 0.4);
          if (i === 0) ctx.moveTo(x1, y1);
          else ctx.lineTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
        ctx.closePath();
        ctx.fillStyle = el.color;
        ctx.fill();
      } else {
        // Draw heart
        ctx.beginPath();
        const x = el.x;
        const y = el.y;
        const s = el.size;
        ctx.moveTo(x, y + s * 0.3);
        ctx.bezierCurveTo(x, y - s * 0.5, x - s, y - s * 0.2, x, y + s);
        ctx.bezierCurveTo(x, y - s * 0.2, x + s, y - s * 0.5, x, y + s * 0.3);
        ctx.fillStyle = el.color;
        ctx.fill();
      }
      ctx.restore();
    });
  }
  
  // ===== 6. GENTLE BACKGROUND =====
  function drawGentleBackground(t) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(0.4, '#1a0a2e');
    gradient.addColorStop(0.7, '#2d1b4e');
    gradient.addColorStop(1, '#4a2c5e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Soft sparkles
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.04})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
    }
  }
  
  // ===== 7. LIGHT BEAMS =====
  function drawLightBeams(t) {
    ctx.save();
    ctx.globalAlpha = 0.06;
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + t * 0.1;
      const gradient = ctx.createLinearGradient(
        width/2, height/2,
        width/2 + Math.cos(angle) * width,
        height/2 + Math.sin(angle) * height
      );
      gradient.addColorStop(0, `hsla(${50 + t * 20}, 70%, 65%, 0.3)`);
      gradient.addColorStop(1, `hsla(${50 + t * 20}, 70%, 65%, 0)`);
      
      ctx.beginPath();
      ctx.moveTo(width/2, height/2);
      ctx.lineTo(width/2 + Math.cos(angle) * width, height/2 + Math.sin(angle) * height);
      ctx.lineWidth = 60;
      ctx.strokeStyle = gradient;
      ctx.stroke();
    }
    
    ctx.restore();
  }
  
  // ===== 8. MOUSE GLOW =====
  function drawMouseGlow() {
    const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
    gradient.addColorStop(0, 'rgba(255, 214, 165, 0.08)');
    gradient.addColorStop(1, 'rgba(255, 214, 165, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  // ===== MAIN ANIMATION LOOP =====
  function animateAboutBanner() {
    ctx.clearRect(0, 0, width, height);
    drawGentleBackground(time);
    drawLightBeams(time);
    drawSoftWaves(time);
    drawBubbles();
    drawFloatingElements();
    drawMouseGlow();
    
    time += 0.02;
    requestAnimationFrame(animateAboutBanner);
  }
  
  window.addEventListener('resize', () => {
    width = aboutCanvas.width = aboutCanvas.clientWidth;
    height = aboutCanvas.height = aboutCanvas.clientHeight;
  });
  
  animateAboutBanner();
}

// ========== QUOTE ROTATION FOR ABOUT PAGE ==========
const quotes = [
  '"Design is intelligence made visible"',
  '"Creativity takes courage"',
  '"Simplicity is the ultimate sophistication"',
  '"Good design is good business"',
  '"Design creates culture"',
  '"Every great design begins with an even better story"'
];

let quoteIndex = 0;
const quoteElement = document.getElementById('rotatingQuote');

if (quoteElement) {
  setInterval(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteElement.style.opacity = '0';
    quoteElement.style.transform = 'translateY(-10px)';
    quoteElement.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
      quoteElement.textContent = quotes[quoteIndex];
      quoteElement.style.opacity = '1';
      quoteElement.style.transform = 'translateY(0)';
    }, 300);
  }, 3500);
}

// ========== VIBRANT COLORFUL CONTACT PAGE BANNER ANIMATION ==========
const contactCanvas = document.getElementById('contactCanvas');
if (contactCanvas) {
  const ctx = contactCanvas.getContext('2d');
  let width = contactCanvas.width = contactCanvas.clientWidth;
  let height = contactCanvas.height = contactCanvas.clientHeight;
  let time = 0;
  let mouseX = width / 2;
  let mouseY = height / 2;
  
  contactCanvas.addEventListener('mousemove', (e) => {
    const rect = contactCanvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * width;
    mouseY = ((e.clientY - rect.top) / rect.height) * height;
  });
  
  // ===== 1. ENERGY PARTICLES (COLORFUL) =====
  const energyParticles = [];
  for (let i = 0; i < 300; i++) {
    energyParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      size: 2 + Math.random() * 4,
      color: `hsl(${Math.random() * 360}, 80%, 65%)`,
      alpha: 0.4 + Math.random() * 0.5
    });
  }
  
  // ===== 2. COLORFUL WAVES =====
  function drawColorfulWaves(t) {
    ctx.save();
    ctx.globalAlpha = 0.25;
    
    const colors = ['#FF3366', '#FF6B35', '#FFD93D', '#6BCB77', '#4D96FF'];
    
    for (let wave = 0; wave < 5; wave++) {
      ctx.beginPath();
      const offset = wave * 40;
      const amplitude = 30 + Math.sin(t * 0.5 + wave) * 15;
      
      for (let x = 0; x <= width; x += 20) {
        const y = height * 0.6 + 
          Math.sin(x * 0.012 + t * 1.2) * amplitude +
          Math.cos(x * 0.008 + t) * 20 +
          offset;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      
      const gradient = ctx.createLinearGradient(0, height * 0.4, 0, height);
      gradient.addColorStop(0, colors[wave % colors.length] + '20');
      gradient.addColorStop(1, colors[wave % colors.length] + '00');
      ctx.fillStyle = gradient;
      ctx.fill();
    }
    
    ctx.restore();
  }
  
  // ===== 3. FLOATING ENERGY ORBS =====
  const energyOrbs = [];
  for (let i = 0; i < 15; i++) {
    energyOrbs.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 40 + Math.random() * 70,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      pulseSpeed: 0.3 + Math.random() * 0.5,
      color: `hsla(${Math.random() * 360}, 80%, 60%, 0.08)`
    });
  }
  
  function drawEnergyOrbs(t) {
    energyOrbs.forEach(orb => {
      orb.x += orb.vx;
      orb.y += orb.vy;
      
      if (orb.x < -orb.radius) orb.x = width + orb.radius;
      if (orb.x > width + orb.radius) orb.x = -orb.radius;
      if (orb.y < -orb.radius) orb.y = height + orb.radius;
      if (orb.y > height + orb.radius) orb.y = -orb.radius;
      
      const pulse = Math.sin(t * orb.pulseSpeed) * 15;
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius + pulse);
      gradient.addColorStop(0, orb.color);
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    });
  }
  
  // ===== 4. ROTATING LIGHT BEAMS =====
  function drawColorfulBeams(t) {
    ctx.save();
    ctx.globalAlpha = 0.1;
    
    const colors = ['#FF3366', '#FF6B35', '#FFD93D', '#6BCB77', '#4D96FF'];
    
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2 + t * 0.15;
      const gradient = ctx.createLinearGradient(
        width/2, height/2,
        width/2 + Math.cos(angle) * width,
        height/2 + Math.sin(angle) * height
      );
      gradient.addColorStop(0, colors[i % colors.length] + '40');
      gradient.addColorStop(1, colors[i % colors.length] + '00');
      
      ctx.beginPath();
      ctx.moveTo(width/2, height/2);
      ctx.lineTo(width/2 + Math.cos(angle) * width, height/2 + Math.sin(angle) * height);
      ctx.lineWidth = 80;
      ctx.strokeStyle = gradient;
      ctx.stroke();
    }
    
    ctx.restore();
  }
  
  // ===== 5. COLORFUL PARTICLES =====
  function drawEnergyParticles() {
    energyParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.x -= dx * 0.02;
        p.y -= dy * 0.02;
      }
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
    });
  }
  
  // ===== 6. SPARKLING STARS =====
  const sparklingStars = [];
  for (let i = 0; i < 150; i++) {
    sparklingStars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 1 + Math.random() * 2,
      twinkleSpeed: 0.5 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      color: `hsl(${Math.random() * 360}, 80%, 70%)`
    });
  }
  
  function drawSparklingStars(t) {
    sparklingStars.forEach(star => {
      const brightness = 0.3 + Math.sin(t * star.twinkleSpeed + star.phase) * 0.3;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.fill();
    });
  }
  
  // ===== 7. BACKGROUND GRADIENT =====
  function drawColorfulBackground() {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0a1a');
    gradient.addColorStop(0.3, '#1a0a2e');
    gradient.addColorStop(0.6, '#2d1b4e');
    gradient.addColorStop(1, '#1a1a3e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Subtle noise
    for (let i = 0; i < 150; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.03})`;
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
  }
  
  // ===== 8. MOUSE GLOW =====
  function drawMouseGlow() {
    const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
    gradient.addColorStop(0, 'rgba(255, 214, 165, 0.12)');
    gradient.addColorStop(1, 'rgba(255, 214, 165, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  // ===== MAIN ANIMATION LOOP =====
  function animateContactBanner() {
    ctx.clearRect(0, 0, width, height);
    drawColorfulBackground();
    drawEnergyOrbs(time);
    drawColorfulBeams(time);
    drawColorfulWaves(time);
    drawSparklingStars(time);
    drawEnergyParticles();
    drawMouseGlow();
    
    time += 0.02;
    requestAnimationFrame(animateContactBanner);
  }
  
  window.addEventListener('resize', () => {
    width = contactCanvas.width = contactCanvas.clientWidth;
    height = contactCanvas.height = contactCanvas.clientHeight;
  });
  
  animateContactBanner();
}




const bannerCanvas = document.getElementById('bannerCanvas');
if (bannerCanvas) {
  const ctx = bannerCanvas.getContext('2d');
  let width = bannerCanvas.width = bannerCanvas.clientWidth;
  let height = bannerCanvas.height = bannerCanvas.clientHeight;
  
  // Animation variables
  let time = 0;
  let mouseX = width / 2;
  let mouseY = height / 2;
  
  // Track mouse position
  bannerCanvas.addEventListener('mousemove', (e) => {
    const rect = bannerCanvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * width;
    mouseY = ((e.clientY - rect.top) / rect.height) * height;
  });
  
  bannerCanvas.addEventListener('mouseleave', () => {
    mouseX = width / 2;
    mouseY = height / 2;
  });
  
  // Resize handler
  window.addEventListener('resize', () => {
    width = bannerCanvas.width = bannerCanvas.clientWidth;
    height = bannerCanvas.height = bannerCanvas.clientHeight;
  });
  
  // Draw geometric shapes
  function drawGeometricShapes(t) {
    const shapes = [
      { type: 'circle', x: width * 0.15, y: height * 0.25, radius: 60, color: '#ff0066', speed: 0.5 },
      { type: 'circle', x: width * 0.85, y: height * 0.7, radius: 80, color: '#ffcc00', speed: 0.3 },
      { type: 'circle', x: width * 0.7, y: height * 0.2, radius: 45, color: '#00cc66', speed: 0.6 },
      { type: 'circle', x: width * 0.3, y: height * 0.8, radius: 55, color: '#6600cc', speed: 0.4 },
      { type: 'circle', x: width * 0.5, y: height * 0.5, radius: 100, color: 'rgba(255, 255, 255, 0.05)', speed: 0.2 }
    ];
    
    shapes.forEach(shape => {
      ctx.save();
      ctx.shadowBlur = 20;
      ctx.shadowColor = shape.color;
      
      if (shape.type === 'circle') {
        ctx.beginPath();
        const pulse = Math.sin(t * shape.speed) * 5;
        ctx.arc(
          shape.x + Math.sin(t * 0.5) * 10,
          shape.y + Math.cos(t * 0.3) * 10,
          shape.radius + pulse,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = shape.color;
        ctx.fill();
      }
      
      ctx.restore();
    });
  }
  
  // Draw moving lines
  function drawMovingLines(t) {
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      const x1 = (i * 50 + t * 50) % (width + 100) - 50;
      ctx.moveTo(x1, 0);
      ctx.lineTo(x1 + Math.sin(t + i) * 30, height);
      ctx.stroke();
    }
    
    ctx.restore();
  }
  
  // Draw rotating squares
  function drawRotatingSquares(t) {
    ctx.save();
    ctx.globalAlpha = 0.15;
    
    for (let i = 0; i < 8; i++) {
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(t * 0.2 + (i * Math.PI / 4));
      ctx.beginPath();
      ctx.rect(-100, -100, 200, 200);
      ctx.strokeStyle = '#ffcc00';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }
    
    ctx.restore();
  }
  
  // Draw particles
  let particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: `hsla(${Math.random() * 360}, 70%, 60%, 0.6)`
    });
  }
  
  function drawParticles() {
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // Update position
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Wrap around
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      
      // Mouse interaction
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.x -= dx * 0.02;
        p.y -= dy * 0.02;
      }
    });
  }
  
  // Draw gradient background
  function drawGradientBackground() {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(255, 0, 102, 0.3)');
    gradient.addColorStop(0.3, 'rgba(255, 102, 0, 0.2)');
    gradient.addColorStop(0.6, 'rgba(0, 204, 102, 0.2)');
    gradient.addColorStop(1, 'rgba(102, 0, 204, 0.3)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  // Draw glowing orbs that follow mouse
  function drawMouseOrb() {
    ctx.save();
    ctx.shadowBlur = 40;
    ctx.shadowColor = '#ffcc00';
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 80, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 204, 0, 0.1)';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 40, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 204, 0, 0.2)';
    ctx.fill();
    ctx.restore();
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    drawGradientBackground();
    drawGeometricShapes(time);
    drawRotatingSquares(time);
    drawMovingLines(time);
    drawParticles();
    drawMouseOrb();
    
    time += 0.02;
    requestAnimationFrame(animate);
  }
  
  animate();
}

// ========== TYPING ANIMATION ==========

const typingWords = ['Brand Identities', 'Editorial Designs', 'Visual Stories', 'Memorable Logos', 'Creative Campaigns'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
  if (!typingElement) return;
  
  const currentWord = typingWords[wordIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
    return;
  }
  
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % typingWords.length;
  }
  
  const speed = isDeleting ? 50 : 100;
  setTimeout(typeEffect, speed);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
  setTimeout(typeEffect, 500);
});





(function() {
  'use strict';

  // ---------- 1. CUSTOM CURSOR ----------
  const cursor = document.getElementById('cursorDot');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX - 6 + 'px';
      cursor.style.top = e.clientY - 6 + 'px';
    });
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
  }

  // ---------- 2. RIPPLE EFFECT FOR BUTTONS ----------
  function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      transform: scale(0);
      transition: transform 0.4s ease, opacity 0.4s ease;
      pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    requestAnimationFrame(() => ripple.style.transform = 'scale(2)');
    ripple.style.opacity = '0';
    
    setTimeout(() => ripple.remove(), 500);
  }

  // Add ripple to all buttons
  document.querySelectorAll('.nav-btn, .btn-primary, .btn-outline, .copy-btn, .filter-btn, .send-btn').forEach(btn => {
    btn.addEventListener('click', (e) => createRipple(e, btn));
  });

  // ---------- 3. TOAST NOTIFICATION ----------
  window.showToast = function(message, type = 'success') {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    const icon = type === 'success' ? '✅' : 'ℹ️';
    toast.innerHTML = `${icon} ${message}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  };

  // ---------- 4. COPY FUNCTIONALITY ----------
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        try {
          await navigator.clipboard.writeText(textToCopy);
          window.showToast(`Copied: ${textToCopy}`);
          const originalText = btn.innerHTML;
          btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
          setTimeout(() => btn.innerHTML = originalText, 1500);
        } catch (err) {
          window.showToast('Failed to copy', 'error');
        }
      }
    });
  });

  // ---------- 5. PROJECTS DATA (for projects.html and index.html) ----------
 const allProjects = [
  
// ========== PRINT MEDIA - POSTER ==========
{ title: "Poster1", category: "Print Media", type: "print", sub: "poster", img: "Print Media/Poster/poster1.jpeg", tags: ["poster", "education"], description: "Poster design " },
{ title: "Poster2", category: "Print Media", type: "print", sub: "poster", img: "Print Media/Poster/poster2.jpeg", tags: ["poster", "creative"], description: "Creative poster design for BANGED ABROAD." },
{ title: "Poster3", category: "Print Media", type: "print", sub: "poster", img: "Print Media/Poster/poster3.jpeg", tags: ["poster", "coaching", "education"], description: "Poster design for Allen Coaching Guwahati." },
{ title: "Coaching Allen Poster Mockup", category: "Print Media", type: "print", sub: "poster", img: "Print Media/Poster/Coaching Allen Guwahati PosterMockup.png", tags: ["poster", "mockup"], description: "Poster mockup for Allen Coaching." },
{ title: "FEVICOL PRINT", category: "Print Media", type: "print", sub: "poster", img: "Print Media/Poster/FEVICOL PRINT.png", tags: ["poster", "product"], description: "Fevicol print advertisement poster." },
{ title: "Pollution Poster Mockup", category: "Print Media", type: "print", sub: "poster", img: "Print Media/Poster/Pollution Poster Mockup.png", tags: ["poster", "environment"], description: "Pollution awareness poster mockup." },
{ title: "RTI Poster", category: "Print Media", type: "print", sub: "poster", img: "Print Media/Poster/rti.png", tags: ["poster", "RTI"], description: "RTI poster design." },
{ title: "RTI Mockup", category: "Print Media", type: "print", sub: "poster", img: "Print Media/Poster/RTI mockup.png", tags: ["poster", "mockup"], description: "RTI poster mockup." },
{ title: "RTI2 Poster", category: "Print Media", type: "print", sub: "poster", img: "Print Media/Poster/rti2.png", tags: ["poster", "RTI"], description: "RTI2 poster design." },
{ title: "RTI2 Mockup", category: "Print Media", type: "print", sub: "poster", img: "Print Media/Poster/RTI2 Mockup.png", tags: ["poster", "mockup"], description: "RTI2 poster mockup." },
{ title: "Shoefix Ad Mockup", category: "Print Media", type: "print", sub: "poster", img: "Print Media/Poster/Shoefix add Mockup.png", tags: ["poster", "product", "mockup"], description: "Shoefix advertisement poster mockup." },

// ========== PRINT MEDIA - SANDWICH BOARD ==========
{ title: "Sandwich Board Royal Cafe", category: "Print Media", type: "print", sub: "sandwich-board", img: "Print Media/Sandwich Board/Sandwichboard Royal cafe.jpg", tags: ["sandwich board", "cafe"], description: "Sandwich board design for Royal Cafe." },

// ========== PRINT MEDIA - STANDY ==========
{ title: "Artshop Standy", category: "Print Media", type: "print", sub: "standy", img: "Print Media/Standy/Artshop Stady.jpg", tags: ["standy", "artshop"], description: "Standy design for Artshop." },
{ title: "DISCOUNT Banner Standy", category: "Print Media", type: "print", sub: "standy", img: "Print Media/Standy/DISCOUNT Banner 1.jpg", tags: ["standy", "discount"], description: "Discount banner standy design." },
{ title: "Machinery Standy", category: "Print Media", type: "print", sub: "standy", img: "Print Media/Standy/Machinery Standy.jpg", tags: ["standy", "machinery"], description: "Machinery standy design." },
{ title: "RTI Standy", category: "Print Media", type: "print", sub: "standy", img: "Print Media/Standy/RTI Standy.jpg", tags: ["standy", "RTI"], description: "RTI standy design." },
{ title: "RTI2 3by6 ft Standy", category: "Print Media", type: "print", sub: "standy", img: "Print Media/Standy/rti2 3by 6 ft.jpg", tags: ["standy", "RTI"], description: "RTI2 3x6 feet standy." },
{ title: "Standy Design", category: "Print Media", type: "print", sub: "standy", img: "Print Media/Standy/Standy.jpg", tags: ["standy", "display"], description: "Creative standy display design." },
{ title: "STANDY 2", category: "Print Media", type: "print", sub: "standy", img: "Print Media/Standy/STANDY (2).jpg", tags: ["standy", "display"], description: "Standy display design 2." },

// ========== PRINT MEDIA - SUNPACK SHOWCARD ==========

{ title: "Showcard", category: "Print Media", type: "print", sub: "sunpack-showcard", img: "Print Media/Sunpack Showcard/Showcard.jpg", tags: ["showcard", "display"], description: "Showcard display design." },
{ title: "Sunpack", category: "Print Media", type: "print", sub: "sunpack-showcard", img: "Print Media/Sunpack Showcard/Sunpack.jpg", tags: ["sunpack", "packaging"], description: "Sunpack design." },
{ title: "Sunpack 2", category: "Print Media", type: "print", sub: "sunpack-showcard", img: "Print Media/Sunpack Showcard/Sunpack 2.jpg", tags: ["sunpack", "design"], description: "Sunpack design variation 2." },

{ title: "Logo 1", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/logo 1.png", tags: ["logo", "branding"], description: "Logo design 1." },
{ title: "Logo 3", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/logo 3.png", tags: ["logo", "branding"], description: "Logo design 3." },
{ title: "Logo Banyan Roots", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/Logo BANYAN ROOTS.png", tags: ["logo", "banyan roots"], description: "Banyan Roots logo design." },
{ title: "Logo BR", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/logo br.png", tags: ["logo", "branding"], description: "BR logo design." },
{ title: "Logo 6", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/logo6.png", tags: ["logo", "branding"], description: "Logo design 6." },
{ title: "Logo 7", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/logo7.png", tags: ["logo", "branding"], description: "Logo design 7." },
{ title: "Masala Machine Logo Blue", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/MASALA MACHINE LOGO Blue.png", tags: ["logo", "masala machine"], description: "Masala Machine logo blue version." },
{ title: "Masala Machine Logo Colour", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/MASALA MACHINE LOGO COLOUR CODE.png", tags: ["logo", "masala machine"], description: "Masala Machine logo colour version." },
{ title: "Banyan Roots Logo 1", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/Untitled-1BANYANZCROOTS_1.jpg", tags: ["logo", "banyan roots"], description: "Banyan Roots logo variation." },
{ title: "IMG WA0015", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/IMG-20230826-WA0015.jpg", tags: ["logo", "branding"], description: "Logo branding design." },
{ title: "IMG WA0026", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/IMG-20230826-WA0026.jpg", tags: ["logo", "branding"], description: "Logo branding design." },
{ title: "IMG WA0011", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/IMG-20230901-WA0011.jpg", tags: ["logo", "branding"], description: "Logo branding design." },
{ title: "IMG WA0005", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/IMG-20231124-WA0005.jpg", tags: ["logo", "branding"], description: "Logo branding design." },
{ title: "IMG WA0011-2", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/IMG-20240122-WA0011.jpg", tags: ["logo", "branding"], description: "Logo branding design." },
{ title: "IMG WA0012", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/IMG-20240122-WA0012.jpg", tags: ["logo", "branding"], description: "Logo branding design." },
{ title: "IMG WA0013", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/IMG-20240122-WA0013.jpg", tags: ["logo", "branding"], description: "Logo branding design." },
{ title: "IMG WA0006", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/IMG-20240215-WA0006.jpg", tags: ["logo", "branding"], description: "Logo branding design." },
{ title: "IMG WA0007", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/IMG-20240216-WA0007.jpg", tags: ["logo", "branding"], description: "Logo branding design." },
{ title: "IMG WA0000", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/IMG-20240217-WA0000.jpg", tags: ["logo", "branding"], description: "Logo branding design." },
{ title: "IMG WA0003", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/IMG-20240217-WA0003.jpg", tags: ["logo", "branding"], description: "Logo branding design." },
{ title: "IMG WA0005-2", category: "Print Media", type: "print", sub: "logos", img: "Print Media/Logos/IMG-20240217-WA0005.jpg", tags: ["logo", "branding"], description: "Logo branding design." },

// ========== PRINT MEDIA - MENU ==========
{ title: "Cafe Menu 1", category: "Print Media", type: "print", sub: "menu", img: "Print Media/Menu/Cafe-as-01  Menu.jpg", tags: ["menu", "cafe"], description: "Cafe menu design 1." },
{ title: "Cafe Menu Mockup", category: "Print Media", type: "print", sub: "menu", img: "Print Media/Menu/Cafe-as-01  Menu Mockup.jpg", tags: ["menu", "mockup", "cafe"], description: "Cafe menu mockup." },
{ title: "The Terrace Menu", category: "Print Media", type: "print", sub: "menu", img: "Print Media/Menu/The Tarrace Menu .jpg", tags: ["menu", "restaurant"], description: "The Terrace restaurant menu design." },

// ========== PRINT MEDIA - BANNER ==========
{ title: "Banner 2", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/2.jpg", tags: ["banner", "display"], description: "Banner display design 2." },
{ title: "Banner", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/Banner.jpg", tags: ["banner", "display"], description: "Banner design." },
{ title: "Banner Mockup", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/Banner mouckup.jpg", tags: ["banner", "mockup"], description: "Banner mockup design." },
{ title: "Dehydrator Mockup", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/Dehydrator Mouckup.jpg", tags: ["banner", "dehydrator"], description: "Dehydrator banner mockup." },
{ title: "GMB Banner 98x48", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/GMB BANNER 98x48 inches.jpg", tags: ["banner", "GMB"], description: "GMB banner 98x48 inches." },
{ title: "GMB Banner", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/GMB BANNER 98x48 inches Banner.jpg", tags: ["banner", "GMB"], description: "GMB banner design." },
{ title: "GMB Filling Liquid Banner", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/GMB BANNERS Filling Liquid Machine.jpg", tags: ["banner", "GMB", "liquid"], description: "GMB filling liquid machine banner." },
{ title: "GMB Dehydrator Banner", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/GMB BANNERS Food  dehydrator machine.jpg", tags: ["banner", "GMB", "dehydrator"], description: "GMB food dehydrator banner." },
{ title: "GMB Masala Machine Banner", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/GMB BANNERS masala machine.jpg", tags: ["banner", "GMB", "masala"], description: "GMB masala machine banner." },
{ title: "GMB Roti Making Banner", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/GMB BANNERS Roti Making Machine.jpg", tags: ["banner", "GMB", "roti"], description: "GMB roti making machine banner." },
{ title: "KIOSK 3x2 Feet", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/KIOSK 3X2FEET.jpg", tags: ["banner", "kiosk"], description: "Kiosk 3x2 feet banner." },
{ title: "Masala Setup Banner", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/Masala setup Banner.jpg", tags: ["banner", "masala"], description: "Masala setup banner." },
{ title: "Navratri Offer Banner", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/Shardiya Navratri Offer Dryer & Dehydrator Setup.jpg", tags: ["banner", "festival", "offer"], description: "Navratri offer banner for dryer & dehydrator." },
{ title: "Wall Banner", category: "Print Media", type: "print", sub: "banner", img: "Print Media/Banner/Wall Banner.jpg", tags: ["banner", "wall"], description: "Wall banner design." },

// ========== PRINT MEDIA - CARD ==========
{ title: "Bhavisyad Card", category: "Print Media", type: "print", sub: "card", img: "Print Media/Card/Bhavisyad.jpg", tags: ["card", "business"], description: "Bhavisyad business card design." },
{ title: "Creature Card", category: "Print Media", type: "print", sub: "card", img: "Print Media/Card/Creature .jpg", tags: ["card", "business"], description: "Creature business card design." },

// ========== PRINT MEDIA - FLYER ==========
{ title: "Flyer 6", category: "Print Media", type: "print", sub: "flyer", img: "Print Media/Flyer/6.jpg", tags: ["flyer", "print"], description: "Flyer design 6." },
{ title: "BNI Flyer 1", category: "Print Media", type: "print", sub: "flyer", img: "Print Media/Flyer/bni1.jpg", tags: ["flyer", "BNI"], description: "BNI flyer design 1." },
{ title: "Flyer IMG 0014", category: "Print Media", type: "print", sub: "flyer", img: "Print Media/Flyer/IMG-20230915-WA0014.jpg", tags: ["flyer", "print"], description: "Flyer design." },
{ title: "Flyer IMG 0001", category: "Print Media", type: "print", sub: "flyer", img: "Print Media/Flyer/IMG-20240221-WA0001.jpg", tags: ["flyer", "print"], description: "Flyer design." },
{ title: "RTI Flyer", category: "Print Media", type: "print", sub: "flyer", img: "Print Media/Flyer/rti.jpg", tags: ["flyer", "RTI"], description: "RTI flyer design." },
{ title: "SD Flyer", category: "Print Media", type: "print", sub: "flyer", img: "Print Media/Flyer/SD-Flyer.jpg", tags: ["flyer", "SD"], description: "SD flyer design." },
{ title: "Flyer Untitled-13", category: "Print Media", type: "print", sub: "flyer", img: "Print Media/Flyer/Untitled-13.jpg", tags: ["flyer", "print"], description: "Flyer design untitled." },

// ========== PRINT MEDIA - HOARDING & BILLBOARD ==========

{ title: "Allen Coaching Billboard 2", category: "Print Media", type: "print", sub: "hoarding-billboard", img: "Print Media/Hoarding & Billboard unipole gantry/Coaching Allen Guwahati Bilboard Mockup.png", tags: ["billboard", "coaching"], description: "Allen Coaching billboard variation." },
{ title: "Allen Coaching Hoarding", category: "Print Media", type: "print", sub: "hoarding-billboard", img: "Print Media/Hoarding & Billboard unipole gantry/Coaching Allen Guwahati Hoarding .png", tags: ["hoarding", "coaching"], description: "Allen Coaching Guwahati hoarding." },
{ title: "Allen Coaching Hoarding 2", category: "Print Media", type: "print", sub: "hoarding-billboard", img: "Print Media/Hoarding & Billboard unipole gantry/Coaching Allen Guwahati Hoarding Gantry pole Moackup.png", tags: ["hoarding", "coaching"], description: "Allen Coaching hoarding variation." },
{ title: "Doors Solutions Hoarding", category: "Print Media", type: "print", sub: "hoarding-billboard", img: "Print Media/Hoarding & Billboard unipole gantry/Doors Solutions Hoarding .png", tags: ["hoarding", "doors"], description: "Doors Solutions hoarding design." },
{ title: "Doors Solutions Unipole", category: "Print Media", type: "print", sub: "hoarding-billboard", img: "Print Media/Hoarding & Billboard unipole gantry/Doors Solutions Hoarding Unipole Mockup.png", tags: ["unipole", "doors"], description: "Doors Solutions unipole hoarding." },
{ title: "RTI3", category: "Print Media", type: "print", sub: "hoarding-billboard", img: "Print Media/Hoarding & Billboard unipole gantry/rti3.png", tags: ["hoarding", "RTI"], description: "RTI hoarding design." },

// ========== PRINT MEDIA - LEAFLET, TRIFOLD ==========
{ title: "Leaflet", category: "Print Media", type: "print", sub: "leaflet-trifold", img: "Print Media/Leaflet, Trifold/Leaflet.png", tags: ["leaflet", "print"], description: "Leaflet design." },
{ title: "Leaflet Creature", category: "Print Media", type: "print", sub: "leaflet-trifold", img: "Print Media/Leaflet, Trifold/Leaflet Creature iN.png", tags: ["leaflet", "creature"], description: "Leaflet design for Creature brand." },


// ========== PACKAGING - POUCHES ==========
{ title: "Chips Bag Mockup", category: "Packaging", type: "packaging", sub: "pouches", img: "Packaging/Pouches/chips-bag-mockup.jpg", tags: ["pouch", "chips", "mockup"], description: "Chips bag packaging mockup design." },
{ title: "Creature Kukure Snacks Pouch", category: "Packaging", type: "packaging", sub: "pouches", img: "Packaging/Pouches/CREATURE KUKURE SNACKS POUCH PACKING.jpg", tags: ["pouch", "snacks", "creature"], description: "Creature Kukure snacks pouch packaging design." },
{ title: "Lays Packet", category: "Packaging", type: "packaging", sub: "pouches", img: "Packaging/Pouches/LAY'S PACKET.jpg", tags: ["pouch", "lays", "chips"], description: "Lays packet packaging design." },

// ========== PACKAGING - PRODUCT BOXES ==========
    {
        title: "Box COCO Chanel",
        category: "Packaging",
        type: "packaging",
        sub: "product-boxes",
        img: "Packaging/Product boxes/COCO.jpg",
        tags: ["box", "chanel", "luxury"],
        description: "COCO Chanel product box packaging design."
    },
    {
        title: "Box Kellogg's",
        category: "Packaging",
        type: "packaging",
        sub: "product-boxes",
        img: "Packaging/Product boxes/kellogg.jpg",
        tags: ["box", "kelloggs", "cereal"],
        description: "Kellogg's product box packaging design."
    },
    {
        title: "Florocer Toothpaste Mockup",
        category: "Packaging",
        type: "packaging",
        sub: "product-boxes",
        img: "Packaging/Product boxes/Toothpaste.jpg",
        tags: ["box", "toothpaste", "mockup"],
        description: "Florocer toothpaste box mockup design."
    },
    {
        title: "Florocer Toothpaste Box",
        category: "Packaging",
        type: "packaging",
        sub: "product-boxes",
        img: "Packaging/Product boxes/Toothpastebox.jpg",
        tags: ["box", "toothpaste", "packaging"],
        description: "Florocer toothpaste product box design."
    },
// ========== PACKAGING - BAGS ==========
{ title: "Bag Mockup 1", category: "Packaging", type: "packaging", sub: "bags", img: "Packaging/Bags/Junaid Bag Mockup .jpg", tags: ["bag", "mockup", "shopping"], description: "Shopping bag mockup design 1." },
{ title: "Bag Mockup 2", category: "Packaging", type: "packaging", sub: "bags", img: "Packaging/Bags/Bag Mockup2 .jpg", tags: ["bag", "mockup", "shopping"], description: "Shopping bag mockup design 2." },
{ title: "Creature Industry Bag", category: "Packaging", type: "packaging", sub: "bags", img: "Packaging/Bags/Creature Induatry Bag.jpg", tags: ["bag", "creature", "industry"], description: "Creature Industry bag design." },
{ title: "Junaid Bag Mockup", category: "Packaging", type: "packaging", sub: "bags", img: "Packaging/Bags/Junaid Bag Mockup .jpg", tags: ["bag", "junaid", "mockup"], description: "Junaid bag mockup design." },

// ========== PACKAGING - BOOK COVERS ==========
{ title: "NFT Book Cover", category: "Packaging", type: "packaging", sub: "book-covers", img: "Packaging/Book covers/NFT Book Cover.jpg", tags: ["book cover", "NFT", "design"], description: "NFT book cover design." },
{ title: "NoveBook Cover", category: "Packaging", type: "packaging", sub: "book-covers", img: "Packaging/Book covers/Novel Book cover.jpg", tags: ["book cover", "novel", "design"], description: "Novel book cover design." },
{ title: "SECRET Final Print", category: "Packaging", type: "packaging", sub: "book-covers", img: "Packaging/Book covers/SECRET final print.jpg", tags: ["book cover", "secret", "print"], description: "SECRET book cover final print design." },





// ========== EVENTS - CANOPY ==========
{ title: "Digilab Canopy", category: "Events", type: "events", sub: "canopy", img: "Event/Canopy/Digilab Canopy.jpg", tags: ["canopy", "digilab", "event"], description: "Digilab canopy design for events." },
{ title: "Umbrella Canopy", category: "Events", type: "events", sub: "canopy", img: "Event/Canopy/Umbrella Canopy.jpg", tags: ["canopy", "umbrella", "event"], description: "Umbrella canopy design for outdoor events." },

// ========== EVENTS - ENTRY ARCHES ==========

{ title: "Creature Entry", category: "Events", type: "events", sub: "entry-arches", img: "Event/Entry Arches/Entry gate Creature in.jpg", tags: ["entry", "creature", "arch"], description: "Creature brand entry arch design." },
{ title: "Leela's Entry Arches", category: "Events", type: "events", sub: "entry-arches", img: "Event/Entry Arches/Leela's Entry Arches.jpg", tags: ["entry arch", "leela", "event"], description: "Leela's entry arches design for events." },

// ========== EVENTS - INFLATE BALLOONS ==========
{ title: "BNI Logo Inflated", category: "Events", type: "events", sub: "inflate-balloons", img: "Event/Inflate Baloons/BNI logo inflated.jpg", tags: ["balloon", "BNI", "inflated"], description: "BNI logo inflated balloon design." },
{ title: "Dayal Bhagh Inflated Balloon", category: "Events", type: "events", sub: "inflate-balloons", img: "Event/Inflate Baloons/Dayal Bhagh inflated dancing baloon.jpg", tags: ["balloon", "dayal bhagh", "inflated"], description: "Dayal Bhagh inflated dancing balloon design." },
{ title: "The Golden Apple", category: "Events", type: "events", sub: "inflate-balloons", img: "Event/Inflate Baloons/the golden Apple .jpg", tags: ["balloon", "golden apple", "event"], description: "The Golden Apple balloon design." },
{ title: "The Golden Apple Round Balloon", category: "Events", type: "events", sub: "inflate-balloons", img: "Event/Inflate Baloons/The golden Apple round Ballon .jpg", tags: ["balloon", "golden apple", "round"], description: "The Golden Apple round balloon design." },



// ========== EDITORIAL - BROCHURE ==========
{ title: "3in1 Slicer Machine 1", category: "Editorial", type: "editorial", sub: "brochure", img: "Editorial/Brochure/3in1 Slicer Machine 1.jpg", tags: ["brochure", "slicer", "machine"], description: "3in1 Slicer Machine brochure design 1." },
{ title: "3in1 Slicer Machine 2", category: "Editorial", type: "editorial", sub: "brochure", img: "Editorial/Brochure/3in1 Slicer Machine 2.jpg", tags: ["brochure", "slicer", "machine"], description: "3in1 Slicer Machine brochure design 2." },
{ title: "3in1 Slicer Machine 3", category: "Editorial", type: "editorial", sub: "brochure", img: "Editorial/Brochure/3in1 Slicer Machine 3.jpg", tags: ["brochure", "slicer", "machine"], description: "3in1 Slicer Machine brochure design 3." },
{ title: "Trustner 1", category: "Editorial", type: "editorial", sub: "brochure", img: "Editorial/Brochure/trustner1.jpg", tags: ["brochure", "trustner"], description: "Trustner brochure design 1." },
{ title: "Trustner 2", category: "Editorial", type: "editorial", sub: "brochure", img: "Editorial/Brochure/trustner2.jpg", tags: ["brochure", "trustner"], description: "Trustner brochure design 2." },
{ title: "Trustner 3", category: "Editorial", type: "editorial", sub: "brochure", img: "Editorial/Brochure/Trustner3.jpg", tags: ["brochure", "trustner"], description: "Trustner brochure design 3." },

// ========== EDITORIAL - LETTERHEAD ==========
{ title: "Letterhead", category: "Editorial", type: "editorial", sub: "letterhead", img: "Editorial/Letterhead/Letterhead.jpg", tags: ["letterhead", "stationery"], description: "Letterhead stationery design." },

// ========== EDITORIAL - MAGAZINE ==========
{ title: "VLCC Magazine Cover", category: "Editorial", type: "editorial", sub: "magazine", img: "Editorial/Magazine/VLCC Magzine cover.jpg", tags: ["magazine", "VLCC", "cover"], description: "VLCC magazine cover design." },
{ title: "VLCC Magazine", category: "Editorial", type: "editorial", sub: "magazine", img: "Editorial/Magazine/vlcc Magzine.jpg", tags: ["magazine", "VLCC", "editorial"], description: "VLCC magazine editorial design." },

// ========== EDITORIAL - NEWSLETTER ==========
{ title: "Newsletter RTI", category: "Editorial", type: "editorial", sub: "newsletter", img: "Editorial/Newsletter/NewsletterRTI.jpg", tags: ["newsletter", "RTI"], description: "RTI newsletter design." },












// ========== DIGITAL MEDIA - CAROUSEL ==========
{ title: "Carousel All Bhatti 1", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/1 Carousel All Bhatti.jpg", tags: ["carousel", "bhatti", "product"], description: "Carousel post 1 for All Bhatti machine." },
{ title: "Carousel All Bhatti 2", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/2 Carousel All Bhatti.jpg", tags: ["carousel", "bhatti", "product"], description: "Carousel post 2 for All Bhatti machine." },
{ title: "Carousel All Bhatti 6", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/6 Carousel All Bhatti.jpg", tags: ["carousel", "bhatti", "product"], description: "Carousel post 6 for All Bhatti machine." },
{ title: "Carousel All Bhatti 11", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/11 Carousel All Bhatti.jpg", tags: ["carousel", "bhatti", "product"], description: "Carousel post 11 for All Bhatti machine." },
{ title: "Carousel Induction Cooker 1", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/CAROUSEL Induction Cooker - 1.jpg", tags: ["carousel", "induction cooker", "product"], description: "Carousel post 1 for Induction Cooker." },
{ title: "Carousel Induction Cooker 2", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/CAROUSEL Induction Cooker - 2.jpg", tags: ["carousel", "induction cooker", "product"], description: "Carousel post 2 for Induction Cooker." },
{ title: "Carousel Induction Cooker 3", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/CAROUSEL Induction Cooker - 3.jpg", tags: ["carousel", "induction cooker", "product"], description: "Carousel post 3 for Induction Cooker." },
{ title: "Carousel Induction Cooker 4", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/CAROUSEL Induction Cooker - 4.jpg", tags: ["carousel", "induction cooker", "product"], description: "Carousel post 4 for Induction Cooker." },
{ title: "Moringa Business Page 9", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/MORINGA BUSNESS PAGE 1.jpg", tags: ["carousel", "moringa", "business"], description: "Moringa business page carousel 9." },
{ title: "Moringa Business Page 9", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/MORINGA BUSNESS PAGE 2.jpg", tags: ["carousel", "moringa", "business"], description: "Moringa business page carousel 9." },

{ title: "Moringa Business Page 3", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/MORINGA BUSNESS PAGE 3.jpg", tags: ["carousel", "moringa", "business"], description: "Moringa business page carousel 3." },
{ title: "Moringa Business Page 4", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/MORINGA BUSNESS PAGE 4.jpg", tags: ["carousel", "moringa", "business"], description: "Moringa business page carousel 4." },
{ title: "Moringa Business Page 8", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/MORINGA BUSNESS PAGE 8.jpg", tags: ["carousel", "moringa", "business"], description: "Moringa business page carousel 8." },
{ title: "Moringa Business Page 9", category: "Digital Media", type: "digital", sub: "carousel", img: "Digital Media/Carousel/MORINGA BUSNESS PAGE 9.jpg", tags: ["carousel", "moringa", "business"], description: "Moringa business page carousel 9." },

// ========== DIGITAL MEDIA - SOCIAL MEDIA ==========
{ title: "Republic Day Status 1", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/26 Jan Republic Day Status 1.jpg", tags: ["social media", "republic day", "status"], description: "Republic Day social media status design 1." },
{ title: "Republic Day Status 3", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/26 Jan Republic Day Status 3.jpg", tags: ["social media", "republic day", "status"], description: "Republic Day social media status design 3." },
{ title: "Atta Chakki Machine Creature", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Atta Chakki Machine Creature.jpg", tags: ["social media", "atta chakki", "creature"], description: "Atta Chakki machine social media creative." },
{ title: "Bada Mangal", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Bada Mangal.jpg", tags: ["social media", "bada mangal", "festival"], description: "Bada Mangal festival social media post." },
{ title: "Band Sealer CIM", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Band Sealer CIM.jpg", tags: ["social media", "band sealer", "CIM"], description: "Band Sealer CIM social media post." },
{ title: "Band Sealer Creature", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Band Sealer Creature.jpg", tags: ["social media", "band sealer", "creature"], description: "Band Sealer Creature social media post." },
{ title: "Basant Panchami Status", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Basant Panchami STATUS.jpg", tags: ["social media", "basant panchami", "festival"], description: "Basant Panchami festival status design." },
{ title: "Bhai Dooj", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Bhai Dooj.jpg", tags: ["social media", "bhai dooj", "festival"], description: "Bhai Dooj festival social media post." },
{ title: "Buddha Purnima", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/budha purnima.jpg", tags: ["social media", "buddha purnima", "festival"], description: "Buddha Purnima festival social media post." },
{ title: "Chatt Puja", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Chatt Puja.jpg", tags: ["social media", "chatt puja", "festival"], description: "Chatt Puja festival social media post." },
{ title: "Google Birthday", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/google birthday.jpg", tags: ["social media", "google", "birthday"], description: "Google birthday social media post." },
{ title: "Guru Purnima Creature", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Guru Purnima Creature.jpg", tags: ["social media", "guru purnima", "creature"], description: "Guru Purnima Creature social media post." },
{ title: "Guruparb", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/GURUPARB.jpg", tags: ["social media", "guruparb", "festival"], description: "Guruparb festival social media post." },
{ title: "Hand Sealer Machine CIM", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Hand Sealer Machine CIM.jpg", tags: ["social media", "hand sealer", "CIM"], description: "Hand Sealer Machine CIM social media post." },
{ title: "Hand Sealer Machine Creature", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Hand Sealer Machine Creature.jpg", tags: ["social media", "hand sealer", "creature"], description: "Hand Sealer Machine Creature social media post." },
{ title: "Hanuman Jayanti CI", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Hanuman Jayanti CI.jpg", tags: ["social media", "hanuman jayanti", "CI"], description: "Hanuman Jayanti CI social media post." },
{ title: "Hanuman Jayanti CIM", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Hanuman Jayanti CIM.jpg", tags: ["social media", "hanuman jayanti", "CIM"], description: "Hanuman Jayanti CIM social media post." },
{ title: "Lizzad Ad 2", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Lizzad ad 2.jpg", tags: ["social media", "lizzad", "ad"], description: "Lizzad advertisement social media post 2." },
{ title: "Lizzad Ad 4", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Lizzad ad 4.jpg", tags: ["social media", "lizzad", "ad"], description: "Lizzad advertisement social media post 4." },
{ title: "Manual Paste Filling Machine CIM", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Manual Paste Filling Machine CIM.jpg", tags: ["social media", "paste filling", "CIM"], description: "Manual Paste Filling Machine CIM social media post." },
{ title: "Manual Paste Filling Machine Creature", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/Manual Paste Filling Machine Creature.jpg", tags: ["social media", "paste filling", "creature"], description: "Manual Paste Filling Machine Creature social media post." },
{ title: "MASALA Plant Offer Christmas", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/MASALA Plant offer CHRISTMAS.jpg", tags: ["social media", "masala plant", "christmas"], description: "MASALA Plant Christmas offer social media post." },
{ title: "MEME AD CIM Wooden Bhatti", category: "Digital Media", type: "digital", sub: "social-media", img: "Digital Media/Social Media/MEME AD CIM Wooden Bhatti.jpg", tags: ["social media", "meme", "CIM", "bhatti"], description: "MEME AD CIM Wooden Bhatti social media post." },

// ========== DIGITAL MEDIA - UI ==========
{ title: "MASALA MACHINE HomePage 1", category: "Digital Media", type: "digital", sub: "ui", img: "Digital Media/UI/MASALA MACHINE HomePage 1.jpg", tags: ["UI", "website", "masala machine", "homepage"], description: "MASALA MACHINE homepage UI design." },
{ title: "MASALA MACHINE Product Page 2", category: "Digital Media", type: "digital", sub: "ui", img: "Digital Media/UI/MASALA MACHINE Prduct Page 2.jpg", tags: ["UI", "website", "masala machine", "product page"], description: "MASALA MACHINE product page UI design 2." },
{ title: "MASALA MACHINE Product Info Page", category: "Digital Media", type: "digital", sub: "ui", img: "Digital Media/UI/MASALA MACHINE PRODUCT INFO PAGE Page 2.jpg", tags: ["UI", "website", "masala machine", "info"], description: "MASALA MACHINE product info page UI design." },
{ title: "Product Page (Desktop)", category: "Digital Media", type: "digital", sub: "ui", img: "Digital Media/UI/PRODUCTPAGE (DESKTOP).jpg", tags: ["UI", "desktop", "product page"], description: "Product page desktop UI design." },
{ title: "ROTI MAKING MACHINE Contact Us", category: "Digital Media", type: "digital", sub: "ui", img: "Digital Media/UI/ROTI MAKING MACHINE contact us.jpg", tags: ["UI", "website", "roti machine", "contact"], description: "Roti Making Machine contact us page UI design." },
{ title: "Roti Making WebTemplate 1", category: "Digital Media", type: "digital", sub: "ui", img: "Digital Media/UI/Roti Making WebTamplate 1.jpg", tags: ["UI", "website", "roti machine", "template"], description: "Roti Making Machine web template UI design 1." },
{ title: "Roti Making WebTemplate 2", category: "Digital Media", type: "digital", sub: "ui", img: "Digital Media/UI/Roti Making WebTamplate 2.jpg", tags: ["UI", "website", "roti machine", "template"], description: "Roti Making Machine web template UI design 2." },
{ title: "Support Centre Page 1", category: "Digital Media", type: "digital", sub: "ui", img: "Digital Media/UI/Support Centre  page 1.jpg", tags: ["UI", "support", "website"], description: "Support Centre page UI design 1." },
{ title: "Support Centre Page 2", category: "Digital Media", type: "digital", sub: "ui", img: "Digital Media/UI/Support Centre  page 2.jpg", tags: ["UI", "support", "website"], description: "Support Centre page UI design 2." },
{ title: "Support Centre Page 3", category: "Digital Media", type: "digital", sub: "ui", img: "Digital Media/UI/Support Centre  page 3.jpg", tags: ["UI", "support", "website"], description: "Support Centre page UI design 3." },
{ title: "Support Centre Page 4", category: "Digital Media", type: "digital", sub: "ui", img: "Digital Media/UI/Support Centre  page 4.jpg", tags: ["UI", "support", "website"], description: "Support Centre page UI design 4." },
{ title: "Thumbnail Roti Making Machine", category: "Digital Media", type: "digital", sub: "ui", img: "Digital Media/UI/Thumbnail Roti Making Machine.jpg", tags: ["UI", "thumbnail", "roti machine"], description: "Roti Making Machine thumbnail design." },








// ========== ILLUSTRATION ==========
{ title: "Event Family Pic Illustration", category: "Illustration", type: "illustration", sub: "", img: "Illustration/Event family pic illustration.jpg", tags: ["illustration", "family", "event"], description: "Event family picture illustration design." },
{ title: "Smart Bazara StoryBoard", category: "Illustration", type: "illustration", sub: "", img: "Illustration/Smart Bazara StoryBoard.jpg", tags: ["illustration", "storyboard", "smart bazara"], description: "Smart Bazara storyboard illustration." },
{ title: "Untitled29", category: "Illustration", type: "illustration", sub: "", img: "Illustration/Untitled29_20240413160330.jpg", tags: ["illustration", "digital art"], description: "Digital illustration artwork." },
{ title: "Untitled50 - 1", category: "Illustration", type: "illustration", sub: "", img: "Illustration/Untitled50_20230317161836.jpg", tags: ["illustration", "digital art"], description: "Digital illustration artwork 1." },
{ title: "Untitled50 - 2", category: "Illustration", type: "illustration", sub: "", img: "Illustration/Untitled50_20230317163153.jpg", tags: ["illustration", "digital art"], description: "Digital illustration artwork 2." },
{ title: "Untitled50 - 3", category: "Illustration", type: "illustration", sub: "", img: "Illustration/Untitled50_20230317163351.jpg", tags: ["illustration", "digital art"], description: "Digital illustration artwork 3." },
{ title: "Untitled50 - 4", category: "Illustration", type: "illustration", sub: "", img: "Illustration/Untitled50_20230317163745.jpg", tags: ["illustration", "digital art"], description: "Digital illustration artwork 4." },
{ title: "Untitled50 - 5", category: "Illustration", type: "illustration", sub: "", img: "Illustration/Untitled50_20230317172947.jpg", tags: ["illustration", "digital art"], description: "Digital illustration artwork 5." },
{ title: "Watercolour Illustration", category: "Illustration", type: "illustration", sub: "", img: "Illustration/Watercolour Iluustration.jpg", tags: ["illustration", "watercolour", "art"], description: "Watercolour illustration artwork." },




// ========== 3D ==========

{ title: "3D", category: "3D", type: "3D", sub: "", img: "3D/ezremove-Photoroom.png", tags: ["3D", "digital art"], description: "Digital 3D artwork 3." },

{ title: "3D Animation Video", category: "3D", type: "3d", sub: "", img: "3D/main 2.mp4", tags: ["3D", "animation", "video"], description: "3D animation video showcase." },















































  ];

     // ---------- 6. RENDER PROJECTS WITH SIDEBAR (for projects.html) ----------
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    function renderProjects(filter = 'all', sub = 'all') {
      let filtered = allProjects;
      
      if (filter !== 'all') {
        filtered = allProjects.filter(p => p.category === filter);
      }
      
      if (sub !== 'all') {
        filtered = filtered.filter(p => p.sub === sub);
      }
      
      if (filtered.length === 0) {
        projectsGrid.innerHTML = `
          <div class="no-projects">
            <i class="fas fa-folder-open"></i>
            <h3>No projects found</h3>
            <p>Projects coming soon in this category!</p>
          </div>
        `;
        return;
      }
      
      projectsGrid.innerHTML = filtered.map((project, index) => `
        <div class="project-card" data-project-index="${allProjects.indexOf(project)}" style="animation-delay: ${index * 0.03}s">
         ${project.img.endsWith('.mp4') || project.img.endsWith('.webm') 
  ? `<video src="${project.img}" autoplay loop muted playsinline style="width:100%;height:350px;object-fit:contain;background:rgba(0,0,0,0.03);padding:10px;"></video>` 
  : `<img src="${project.img}" alt="${project.title}" loading="lazy">`
}
          <div class="project-info">
            <h3>${project.title}</h3>
            <p class="project-category">${project.category}</p>
            <div class="project-tags">
              ${project.tags.map(tag => `<span>#${tag}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
      
      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
          const index = parseInt(card.getAttribute('data-project-index'));
          showProjectModal(allProjects[index]);
        });
      });
    }
    
    // Category click
    document.querySelectorAll('.cat-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        document.querySelectorAll('.cat-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        document.querySelectorAll('.sub-link').forEach(l => l.classList.remove('active'));
        
        document.querySelectorAll('.sub-list').forEach(sl => sl.style.display = 'none');
        
        const subList = link.nextElementSibling;
        if (subList && subList.classList.contains('sub-list')) {
          subList.style.display = 'block';
        }
        
        const filter = link.getAttribute('data-filter');
        renderProjects(filter);
      });
    });
    
        // Sub-category click
    document.querySelectorAll('.sub-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        document.querySelectorAll('.sub-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        const sub = link.getAttribute('data-sub');
        
        // Find the parent category
        const parentLi = link.closest('ul.sub-list').closest('li');
        const catLink = parentLi.querySelector('.cat-link');
        const filter = catLink.getAttribute('data-filter');
        
        console.log('Filter:', filter, 'Sub:', sub); // Debug line
        
        renderProjects(filter, sub);
      });
    });
    renderProjects('all');
  }

  // ---------- 7. PROJECT MODAL ----------
  function showProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        ${project.img.endsWith('.mp4') || project.img.endsWith('.webm') 
  ? `<video src="${project.img}" controls autoplay loop muted playsinline style="width:100%;height:250px;object-fit:cover;border-radius:25px;"></video>` 
  : `<img src="${project.img}" alt="${project.title}">`
}
        <h2>${project.title}</h2>
        <p class="modal-category">${project.category}</p>
        <div class="modal-tags">
          ${project.tags.map(tag => `<span>#${tag}</span>`).join('')}
        </div>
        <p class="modal-description">${project.description || 'This stunning project showcases a unique blend of creativity and strategic thinking. The visual identity resonates with the target audience while maintaining artistic excellence.'}</p>
        <button class="btn-primary close-modal-btn">Close</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    const closeModal = () => {
      modal.style.opacity = '0';
      setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.querySelector('.close-modal-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  }

  // ---------- 8. FEATURED PROJECTS (for index.html) ----------
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    const featuredProjects = allProjects.slice(0, 3);
    featuredGrid.innerHTML = featuredProjects.map(project => `
      <div class="featured-card" data-project='${JSON.stringify(project)}'>
        <img src="${project.img}" alt="${project.title}">
        <div class="card-info">
          <h3>${project.title}</h3>
          <p>${project.category}</p>
        </div>
      </div>
    `).join('');
    
    document.querySelectorAll('.featured-card').forEach(card => {
      card.addEventListener('click', () => {
        const project = JSON.parse(card.getAttribute('data-project'));
        showProjectModal(project);
      });
    });
  }

  // ---------- 9. STATS COUNTER (for index.html) ----------
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;
  
  function animateCounters() {
    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      let current = 0;
      const duration = 2000;
      const stepTime = 16;
      const steps = duration / stepTime;
      const increment = target / steps;
      let step = 0;
      
      const timer = setInterval(() => {
        step++;
        current += increment;
        if (step >= steps) {
          el.innerText = target;
          clearInterval(timer);
        } else {
          el.innerText = Math.floor(current);
        }
      }, stepTime);
    });
  }
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // ---------- 10. CONTACT FORM (for contact.html) ----------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('userName')?.value.trim();
      const email = document.getElementById('userEmail')?.value.trim();
      const subject = document.getElementById('userSubject')?.value.trim();
      const message = document.getElementById('userMessage')?.value.trim();
      
      if (!name || !email || !message) {
        window.showToast('Please fill in all required fields', 'error');
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        window.showToast('Please enter a valid email address', 'error');
        return;
      }
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission
      setTimeout(() => {
        window.showToast(`Thank you ${name}! I'll respond within 24 hours.`);
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // ---------- 11. SCROLL REVEAL ANIMATION ----------
  const revealElements = document.querySelectorAll('.project-card, .featured-card, .contact-card, .timeline-item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  // ---------- 12. SOCIAL LINK HANDLERS ----------
  document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = link.getAttribute('aria-label') || 'social';
      window.showToast(`Opening ${platform} profile...`);
      setTimeout(() => window.open('#', '_blank'), 500);
    });
  });

  // ---------- 13. PAGE LOAD ANIMATION ----------
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => document.body.style.opacity = '1', 50);
    console.log('Portfolio loaded! ✨');
  });

})();

// ========== ANIMATED CHARACTER - MOUSE INTERACTION ==========
const character = document.querySelector('.character-container');
if (character) {
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Character follows mouse slightly (subtle movement)
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 10;
    
    character.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
  });
  
  // Reset position when mouse leaves
  document.addEventListener('mouseleave', () => {
    character.style.transform = 'translate(0, 0)';
  });
  
  // Character interaction on click
  character.addEventListener('click', () => {
    const speechBubble = character.querySelector('.speech-bubble');
    const messages = [
      '✨ Hello there! ✨',
      '🎨 Let\'s create! 🎨',
      '💡 Got a project? 💡',
      '👋 Hire me! 👋',
      '🌟 Design magic! 🌟'
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    speechBubble.querySelector('span').textContent = randomMsg;
    
    // Reset after 2 seconds
    setTimeout(() => {
      speechBubble.querySelector('span').textContent = '✨ Design Magic! ✨';
    }, 2000);
  });
}

// ========== CHANGING THOUGHTS FOR CHARACTER ==========
const thoughtElement = document.getElementById('changingThought');

if (thoughtElement) {
  const thoughts = [
    '✨ Design Magic! ✨',
    '🎨 Let\'s Create! 🎨',
    '💡 Fresh Ideas! 💡',
    '🌟 Brand Identity 🌟',
    '✏️ Sketching... ✏️',
    '🎯 Pixel Perfect! 🎯',
    '🌈 Color Theory 🌈',
    '📐 Typography 📐',
    '⚡ Creative Flow ⚡',
    '💎 Visual Story 💎'
  ];
  
  let thoughtIndex = 0;
  
  setInterval(() => {
    thoughtIndex = (thoughtIndex + 1) % thoughts.length;
    thoughtElement.style.opacity = '0';
    thoughtElement.style.transform = 'scale(0.8)';
    thoughtElement.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
      thoughtElement.textContent = thoughts[thoughtIndex];
      thoughtElement.style.opacity = '1';
      thoughtElement.style.transform = 'scale(1)';
    }, 200);
  }, 3500);
}

// ========== CHARACTER CLICK INTERACTION ==========
const characterWrapper = document.querySelector('.character-wrapper');
if (characterWrapper) {
  characterWrapper.addEventListener('click', () => {
    const thoughtSpan = document.getElementById('changingThought');
    const clickMessages = [
      '👋 Hello there! 👋',
      '🎨 Hire me! 🎨',
      '💬 Let\'s talk! 💬',
      '✨ Thanks for visiting! ✨'
    ];
    const randomMsg = clickMessages[Math.floor(Math.random() * clickMessages.length)];
    
    thoughtSpan.textContent = randomMsg;
    thoughtSpan.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
      thoughtSpan.style.transform = 'scale(1)';
    }, 1000);
  });
}