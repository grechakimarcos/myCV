// ==========================================
// Smooth Scrolling for Navigation Links
// ==========================================
document.addEventListener('DOMContentLoaded', function () {

    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // ==========================================
    // Dark Mode Toggle
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');

        // Save preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // ==========================================
    // Fade-in Animation on Scroll
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ==========================================
    // Navbar Background on Scroll
    // ==========================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        // Add shadow to navbar when scrolling
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // Download CV Button - Removed (now using direct PDF link)
    // ==========================================

    // ==========================================
    // Active Navigation Link Highlight
    // ==========================================
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', function () {
        let current = '';
        const navbarHeight = navbar.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // Skill Cards Stagger Animation
    // ==========================================
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // ==========================================
    // Animated Skill Bars
    // ==========================================
    const skillBars = document.querySelectorAll('.skill-bar');

    const skillBarObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level');
                bar.style.setProperty('--skill-width', level + '%');
                bar.parentElement.parentElement.classList.add('visible');
                skillBarObserver.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        skillBarObserver.observe(bar);
    });

    // ==========================================
    // Contact Cards Hover Effect Enhancement
    // ==========================================
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ==========================================
    // Typing Effect for Hero Title (Optional)
    // ==========================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Uncomment to enable typing effect on hero title
    // const heroTitle = document.querySelector('.hero-title');
    // const originalText = heroTitle.textContent;
    // typeWriter(heroTitle, originalText, 50);

    // ==========================================
    // Smooth Reveal for Timeline Items
    // ==========================================
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    // ==========================================
    // Performance: Lazy Loading for Images (if added)
    // ==========================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ==========================================
    // Console Easter Egg
    // ==========================================
    console.log('%c👋 Olá, desenvolvedor curioso!', 'font-size: 20px; font-weight: bold; color: #0071e3;');
    console.log('%cEste site foi desenvolvido com HTML, CSS e JavaScript puro.', 'font-size: 14px; color: #6e6e73;');
    console.log('%cInteressado em saber mais? Entre em contato! 🚀', 'font-size: 14px; color: #0071e3;');

    // ==========================================
    // Initial Animation Trigger
    // ==========================================
    // Trigger animations for elements in viewport on load
    setTimeout(() => {
        const initialElements = document.querySelectorAll('.fade-in');
        initialElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }, 100);

    // ==========================================
    // UX IMPROVEMENTS - Progress Dots Navigation
    // ==========================================
    const progressDots = document.querySelectorAll('.progress-dot');
    const hero = document.querySelector('.hero');

    // Update active dot on scroll
    function updateProgressDots() {
        const navbarHeight = navbar.offsetHeight;
        let currentSection = 'hero';

        // Check hero section first
        if (window.pageYOffset < hero.offsetHeight - navbarHeight) {
            currentSection = 'hero';
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop - navbarHeight - 100;
                if (window.pageYOffset >= sectionTop) {
                    currentSection = section.getAttribute('id');
                }
            });
        }

        progressDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSection) {
                dot.classList.add('active');
            }
        });
    }

    // Click handler for progress dots
    progressDots.forEach(dot => {
        dot.addEventListener('click', function () {
            const sectionId = this.getAttribute('data-section');
            const navbarHeight = navbar.offsetHeight;

            if (sectionId === 'hero') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            }
        });
    });

    window.addEventListener('scroll', debounce(updateProgressDots, 50));
    updateProgressDots(); // Initial call

    // ==========================================
    // UX IMPROVEMENTS - Sticky CTA Bar
    // ==========================================
    const stickyCTA = document.getElementById('stickyCTA');
    const footer = document.querySelector('.footer');

    function toggleStickyCTA() {
        const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const footerTop = footer.offsetTop;
        const isNearFooter = window.pageYOffset + window.innerHeight > footerTop;

        // Show CTA after 80% scroll but hide when footer is visible
        if (scrollPercent > 80 && !isNearFooter) {
            stickyCTA.classList.add('show');
        } else {
            stickyCTA.classList.remove('show');
        }
    }

    window.addEventListener('scroll', debounce(toggleStickyCTA, 100));

    // ==========================================
    // UX IMPROVEMENTS - Toast Notifications
    // ==========================================
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;

        toastContainer.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // ==========================================
    // UX IMPROVEMENTS - Copy Email to Clipboard
    // ==========================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const email = this.getAttribute('href').replace('mailto:', '');

            // Try to copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast('📧 Email copiado para a área de transferência!', 'success');
                }).catch(() => {
                    // If clipboard API fails, still show the email client
                });
            }
        });
    });

    // ==========================================
    // UX IMPROVEMENTS - Back to Top Button
    // ==========================================
    const backToTop = document.getElementById('backToTop');

    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('🚀 De volta ao topo!', 'success');
    });

    window.addEventListener('scroll', debounce(toggleBackToTop, 100));

    // ==========================================
    // UX IMPROVEMENTS - Enhanced Download CV - Removed (using direct PDF link)
    // ==========================================

    // ==========================================
    // UX IMPROVEMENTS - Project Card Animations
    // ==========================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;

        // Add ripple effect on click
        card.addEventListener('click', function (e) {
            if (!e.target.closest('.project-link')) {
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background: rgba(59, 130, 246, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

                const rect = card.getBoundingClientRect();
                ripple.style.left = e.clientX - rect.left - 10 + 'px';
                ripple.style.top = e.clientY - rect.top - 10 + 'px';

                card.style.position = 'relative';
                card.style.overflow = 'hidden';
                card.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            }
        });
    });

    // Add ripple animation to CSS dynamically
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(20);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // UX IMPROVEMENTS - Console Easter Egg Enhancement
    // ==========================================
    console.log('%c🎨 UX Improvements Activated!', 'font-size: 16px; font-weight: bold; color: #3b82f6; background: #0a0a0a; padding: 8px;');
    console.log('%cFeatures:', 'font-size: 14px; color: #60a5fa;');
    console.log('  ✓ Progress dots navigation');
    console.log('  ✓ Sticky CTA bar');
    console.log('  ✓ Toast notifications');
    console.log('  ✓ Back to top button');
    console.log('  ✓ Enhanced interactions');

    // ==========================================
    // GSAP ORBITAL ANIMATIONS - Interactive Tech Icons
    // ==========================================

    // Wait for GSAP to load
    if (typeof gsap !== 'undefined') {
        const orbitalItems = document.querySelectorAll('.orbital-item');
        const avatarWrapper = document.querySelector('.hero-avatar-wrapper');

        if (orbitalItems.length > 0 && avatarWrapper) {
            const radius = 160; // Orbital radius from center
            const itemCount = orbitalItems.length;

            // Store original positions for each item
            const originalPositions = [];

            // Initialize orbital positions
            orbitalItems.forEach((item, index) => {
                const angle = (360 / itemCount) * index;
                const angleRad = (angle * Math.PI) / 180;

                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;

                // Store original position
                originalPositions.push({ x, y, angle });

                // Set initial position
                gsap.set(item, {
                    x: x,
                    y: y,
                    rotation: 0
                });

                // Create continuous subtle float animation
                gsap.to(item, {
                    y: y + Math.sin(index) * 10,
                    duration: 3 + (index * 0.3),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });

                // Subtle rotation animation
                gsap.to(item, {
                    rotation: index % 2 === 0 ? 5 : -5,
                    duration: 4 + (index * 0.2),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });

            // Mouse tracking variables
            let mouseX = 0;
            let mouseY = 0;
            let isMouseOver = false;

            // Track mouse movement over avatar area
            avatarWrapper.addEventListener('mouseenter', () => {
                isMouseOver = true;
            });

            avatarWrapper.addEventListener('mouseleave', () => {
                isMouseOver = false;

                // Return items to original positions smoothly
                orbitalItems.forEach((item, index) => {
                    gsap.to(item, {
                        x: originalPositions[index].x,
                        y: originalPositions[index].y,
                        duration: 1.2,
                        ease: "power2.out"
                    });
                });
            });

            avatarWrapper.addEventListener('mousemove', (e) => {
                const rect = avatarWrapper.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Calculate mouse position relative to center
                mouseX = e.clientX - rect.left - centerX;
                mouseY = e.clientY - rect.top - centerY;
            });

            // Smooth mouse-follow animation using GSAP ticker
            gsap.ticker.add(() => {
                if (isMouseOver) {
                    orbitalItems.forEach((item, index) => {
                        const original = originalPositions[index];

                        // Calculate influence based on mouse proximity (20% influence)
                        const influenceFactor = 0.2;
                        const targetX = original.x + (mouseX * influenceFactor);
                        const targetY = original.y + (mouseY * influenceFactor);

                        // Smooth interpolation
                        gsap.to(item, {
                            x: targetX,
                            y: targetY,
                            duration: 0.8,
                            ease: "power2.out",
                            overwrite: 'auto'
                        });
                    });
                }
            });

            // Add click animation for each item
            orbitalItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    // Pulse animation on click
                    gsap.timeline()
                        .to(item, {
                            scale: 1.3,
                            duration: 0.2,
                            ease: "power2.out"
                        })
                        .to(item, {
                            scale: 1,
                            duration: 0.3,
                            ease: "elastic.out(1, 0.5)"
                        });

                    // Rotate 360 degrees
                    gsap.to(item, {
                        rotation: "+=360",
                        duration: 0.6,
                        ease: "power2.inOut"
                    });
                });
            });

            // Responsive: Adjust radius on window resize
            window.addEventListener('resize', () => {
                const isMobile = window.innerWidth <= 768;
                const newRadius = isMobile ? 120 : 160;

                orbitalItems.forEach((item, index) => {
                    const angle = (360 / itemCount) * index;
                    const angleRad = (angle * Math.PI) / 180;

                    const x = Math.cos(angleRad) * newRadius;
                    const y = Math.sin(angleRad) * newRadius;

                    originalPositions[index] = { x, y, angle };

                    if (!isMouseOver) {
                        gsap.to(item, {
                            x: x,
                            y: y,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }
                });
            });
        }
    }

});

// ==========================================
// Utility Functions
// ==========================================

// Debounce function for performance optimization
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
