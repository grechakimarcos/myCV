// MAGNETIC CODE FIELD - Enhanced Ultra-Interactive Version
// Maximum interactivity with strong forces and dynamic visual feedback

if (typeof gsap !== 'undefined') {
    const orbitalItems = document.querySelectorAll('.orbital-item');
    const avatarWrapper = document.querySelector('.hero-avatar-wrapper');
    const canvas = document.getElementById('magnetic-canvas');

    if (orbitalItems.length > 0 && avatarWrapper && canvas) {
        const ctx = canvas.getContext('2d');
        const isMobile = window.innerWidth <= 768;
        const radius = isMobile ? 120 : 160;

        // Setup canvas
        function resizeCanvas() {
            const rect = avatarWrapper.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Physics properties for each icon
        const icons = [];

        orbitalItems.forEach((item, index) => {
            const angle = (360 / orbitalItems.length) * index;
            const angleRad = (angle * Math.PI) / 180;

            icons.push({
                element: item,
                x: Math.cos(angleRad) * radius,
                y: Math.sin(angleRad) * radius,
                vx: 0, vy: 0,
                homeX: Math.cos(angleRad) * radius,
                homeY: Math.sin(angleRad) * radius,
                mass: 1 + Math.random() * 0.5,
                angle: angle,
                z: 0, scale: 1, rotation: 0,
                trail: [] // Motion trail
            });

            gsap.set(item, {
                x: icons[index].x, y: icons[index].y, z: 0,
                scale: 1, transformPerspective: 600
            });
        });

        // Enhanced particles
        const particles = [];
        const particleCount = isMobile ? 25 : 50;
        const chars = ['0', '1', '<', '>', '{', '}', '(', ')', ';', '/', '*', '=', '+'];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: (Math.random() - 0.5) * radius * 2.5,
                y: (Math.random() - 0.5) * radius * 2.5,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                char: chars[Math.floor(Math.random() * chars.length)],
                opacity: Math.random() * 0.4 + 0.2,
                size: Math.random() * 12 + 8,
                rotation: Math.random() * Math.PI * 2
            });
        }

        // Energy waves
        const energyWaves = [];

        // Mouse tracking
        let mouseX = 0, mouseY = 0, prevMouseX = 0, prevMouseY = 0;
        let isMouseOver = false, isRepulsing = false, mouseVelocity = 0;

        avatarWrapper.addEventListener('mouseenter', () => { isMouseOver = true; });

        avatarWrapper.addEventListener('mouseleave', () => {
            isMouseOver = false;
            isRepulsing = false;
            icons.forEach(icon => {
                gsap.to(icon.element, { scale: 1, duration: 0.5, ease: "power2.out" });
            });
        });

        avatarWrapper.addEventListener('mousemove', (e) => {
            const rect = avatarWrapper.getBoundingClientRect();
            prevMouseX = mouseX;
            prevMouseY = mouseY;
            mouseX = e.clientX - rect.left - rect.width / 2;
            mouseY = e.clientY - rect.top - rect.height / 2;

            // Mouse velocity
            const dx = mouseX - prevMouseX;
            const dy = mouseY - prevMouseY;
            mouseVelocity = Math.sqrt(dx * dx + dy * dy);

            // Energy wave on fast movement
            if (mouseVelocity > 5) {
                energyWaves.push({
                    x: mouseX, y: mouseY,
                    radius: 0, maxRadius: 120, opacity: 0.6
                });
            }
        });

        // Click explosion
        const heroAvatar = document.querySelector('.hero-avatar');
        if (heroAvatar) {
            heroAvatar.addEventListener('click', () => {
                isRepulsing = true;

                energyWaves.push({
                    x: 0, y: 0, radius: 0,
                    maxRadius: radius * 2.5, opacity: 0.8
                });

                icons.forEach((icon) => {
                    const angle = Math.random() * Math.PI * 2;
                    const force = 350 + Math.random() * 150;

                    gsap.to(icon.element, {
                        x: Math.cos(angle) * force,
                        y: Math.sin(angle) * force,
                        scale: 0.3,
                        rotation: Math.random() * 1080 - 540,
                        duration: 0.5, ease: "power3.out",
                        onComplete: () => {
                            gsap.to(icon.element, {
                                x: icon.homeX, y: icon.homeY,
                                scale: 1, rotation: 0,
                                duration: 1.5, ease: "elastic.out(1, 0.4)", delay: 0.1
                            });
                        }
                    });
                });

                setTimeout(() => { isRepulsing = false; }, 700);
            });
        }

        // Spacebar showcase
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !e.repeat) {
                e.preventDefault();
                const tl = gsap.timeline();
                icons.forEach((icon, i) => {
                    tl.to(icon.element, {
                        x: 0, y: 0, rotation: 720, scale: 1.8,
                        duration: 0.8, ease: "power2.inOut"
                    }, i * 0.08);
                });
                tl.to(icons.map(icon => icon.element), {
                    x: (i) => icons[i].homeX * 1.6,
                    y: (i) => icons[i].homeY * 1.6,
                    rotation: -360, scale: 1,
                    duration: 0.6, ease: "power3.out"
                });
                tl.to(icons.map(icon => icon.element), {
                    x: (i) => icons[i].homeX,
                    y: (i) => icons[i].homeY,
                    rotation: 0,
                    duration: 1.2, ease: "elastic.out(1, 0.4)"
                });
            }
        });

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Energy waves
            energyWaves.forEach((wave, index) => {
                wave.radius += 4;
                wave.opacity -= 0.015;

                if (wave.opacity <= 0) {
                    energyWaves.splice(index, 1);
                    return;
                }

                ctx.beginPath();
                ctx.arc(centerX + wave.x, centerY + wave.y, wave.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(59, 130, 246, ${wave.opacity})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(centerX + wave.x, centerY + wave.y, wave.radius - 5, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(147, 197, 253, ${wave.opacity * 0.5})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            // Particles with STRONG mouse interaction
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.rotation += 0.02;

                if (p.x < -radius * 1.5) p.x = radius * 1.5;
                if (p.x > radius * 1.5) p.x = -radius * 1.5;
                if (p.y < -radius * 1.5) p.y = radius * 1.5;
                if (p.y > radius * 1.5) p.y = -radius * 1.5;

                if (isMouseOver) {
                    const dx = mouseX - p.x;
                    const dy = mouseY - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        const force = (1 - dist / 120) * 0.8;
                        p.vx -= (dx / dist) * force;
                        p.vy -= (dy / dist) * force;
                    }
                }

                p.vx *= 0.98;
                p.vy *= 0.98;

                ctx.save();
                ctx.translate(centerX + p.x, centerY + p.y);
                ctx.rotate(p.rotation);
                ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
                ctx.font = `${p.size}px monospace`;
                ctx.fillText(p.char, 0, 0);
                ctx.restore();
            });

            // ENHANCED magnetic physics
            if (!isRepulsing) {
                icons.forEach((icon) => {
                    let forceX = 0, forceY = 0;

                    // Home spring force
                    forceX += (icon.homeX - icon.x) * 0.03;
                    forceY += (icon.homeY - icon.y) * 0.03;

                    // STRONG mouse magnetic force
                    if (isMouseOver) {
                        const dx = mouseX - icon.x;
                        const dy = mouseY - icon.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist > 0) {
                            // Repulsion zone (very close)
                            if (dist < 60) {
                                const repelStrength = (1 - dist / 60) * 2.5;
                                forceX -= (dx / dist) * repelStrength * 80;
                                forceY -= (dy / dist) * repelStrength * 80;
                            }
                            // Strong attraction zone
                            else if (dist < 300) {
                                const attractStrength = (1 - dist / 300) * 1.2;
                                forceX += (dx / dist) * attractStrength * 120;
                                forceY += (dy / dist) * attractStrength * 120;
                            }

                            // Dynamic scale
                            const targetScale = dist < 100 ? 1.3 + (1 - dist / 100) * 0.4 : 1;
                            icon.scale += (targetScale - icon.scale) * 0.15;
                        }
                    } else {
                        icon.scale += (1 - icon.scale) * 0.1;
                    }

                    // Apply forces
                    icon.vx += forceX / icon.mass;
                    icon.vy += forceY / icon.mass;
                    icon.vx *= 0.88;
                    icon.vy *= 0.88;
                    icon.x += icon.vx;
                    icon.y += icon.vy;

                    // Trail
                    icon.trail.push({ x: icon.x, y: icon.y });
                    if (icon.trail.length > 8) icon.trail.shift();

                    // 3D depth
                    const distFromCenter = Math.sqrt(icon.x * icon.x + icon.y * icon.y);
                    icon.z = (distFromCenter / radius) * 40 - 20;

                    // Velocity rotation
                    const velocity = Math.sqrt(icon.vx * icon.vx + icon.vy * icon.vy);
                    icon.rotation += velocity * 0.5;

                    gsap.set(icon.element, {
                        x: icon.x, y: icon.y, z: icon.z,
                        scale: icon.scale, rotation: icon.rotation,
                        overwrite: 'auto'
                    });

                    // Motion trail
                    if (icon.trail.length > 1) {
                        ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
                        ctx.lineWidth = 2;
                        ctx.lineCap = 'round';
                        ctx.beginPath();
                        ctx.moveTo(centerX + icon.trail[0].x, centerY + icon.trail[0].y);
                        for (let i = 1; i < icon.trail.length; i++) {
                            ctx.lineTo(centerX + icon.trail[i].x, centerY + icon.trail[i].y);
                        }
                        ctx.stroke();
                    }
                });
            }

            // Enhanced connection lines - THICKER
            for (let i = 0; i < icons.length; i++) {
                for (let j = i + 1; j < icons.length; j++) {
                    const dx = icons[j].x - icons[i].x;
                    const dy = icons[j].y - icons[i].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < radius * 1.4) {
                        const opacity = 1 - (dist / (radius * 1.4));

                        // Gradient line
                        const gradient = ctx.createLinearGradient(
                            centerX + icons[i].x, centerY + icons[i].y,
                            centerX + icons[j].x, centerY + icons[j].y
                        );
                        gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * 0.5})`);
                        gradient.addColorStop(0.5, `rgba(147, 197, 253, ${opacity * 0.6})`);
                        gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity * 0.5})`);

                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(centerX + icons[i].x, centerY + icons[i].y);
                        ctx.lineTo(centerX + icons[j].x, centerY + icons[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        animate();

        // Enhanced icon click
        orbitalItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();

                energyWaves.push({
                    x: icons[index].x, y: icons[index].y,
                    radius: 0, maxRadius: 100, opacity: 0.7
                });

                gsap.timeline()
                    .to(item, {
                        scale: 1.6, rotation: "+=720",
                        duration: 0.4, ease: "power2.out"
                    })
                    .to(item, {
                        scale: 1,
                        duration: 0.5, ease: "elastic.out(1, 0.4)"
                    });
            });
        });
    }
}
