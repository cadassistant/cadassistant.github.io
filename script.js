// Interactive elements and animations for the CAD-Assistant landing page

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        const nerfSphere = document.querySelector('.nerf-sphere');
        
        if (heroVisual && nerfSphere) {
            heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
            nerfSphere.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.1}deg)`;
        }
    });

    // Interactive hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 255, 255, 0.1)';
            this.style.borderColor = 'rgba(0, 255, 255, 0.5)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.05)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // Dynamic particle effect for the hero section
    createParticleEffect();

    // Architecture diagram hover interactions
    const archComponents = document.querySelectorAll('.component-box');
    archComponents.forEach((component, index) => {
        component.addEventListener('mouseenter', function() {
            // Highlight connection flow
            archComponents.forEach((comp, i) => {
                if (i <= index) {
                    comp.style.borderColor = 'rgba(0, 255, 255, 0.8)';
                    comp.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.3)';
                }
            });
        });
        
        component.addEventListener('mouseleave', function() {
            archComponents.forEach(comp => {
                comp.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                comp.style.boxShadow = 'none';
            });
        });
    });

    // Intersection Observer for animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
        }
        
        .particle.pink {
            background: rgba(255, 0, 255, 0.6);
        }
        
        .particle.yellow {
            background: rgba(255, 255, 0, 0.6);
        }
    `;
    document.head.appendChild(style);

    // Button hover effects with ripple
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

function createParticleEffect() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(hero);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random color
    const colors = ['', 'pink', 'yellow'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    if (randomColor) particle.classList.add(randomColor);
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = 3 + Math.random() * 4;
    particle.style.animationDuration = duration + 's';
    particle.style.animationName = 'float-particle';
    particle.style.animationIterationCount = 'infinite';
    particle.style.animationTimingFunction = 'ease-in-out';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
    
    // Add floating animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float-particle {
            0%, 100% { 
                transform: translateY(0px) translateX(0px);
                opacity: 0.3;
            }
            25% { 
                transform: translateY(-20px) translateX(10px);
                opacity: 0.8;
            }
            50% { 
                transform: translateY(-10px) translateX(-5px);
                opacity: 0.6;
            }
            75% { 
                transform: translateY(-25px) translateX(-10px);
                opacity: 0.9;
            }
        }
    `;
    if (!document.querySelector('#float-particle-style')) {
        floatStyle.id = 'float-particle-style';
        document.head.appendChild(floatStyle);
    }
}