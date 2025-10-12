// ===== SMOOTH SCROLLING =====
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

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 39, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    }
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = width;
                }, 200);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ===== TYPING EFFECT =====
const typingElements = document.querySelectorAll('.typing-effect');
typingElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 500);
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const terminalBody = contactForm.closest('.terminal-body');
        const successMsg = document.createElement('p');
        successMsg.className = 'terminal-output';
        successMsg.style.color = 'var(--accent-primary)';
        successMsg.textContent = '✓ Message transmitted successfully!';
        
        terminalBody.appendChild(successMsg);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    });
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== CYBERSECURITY CROSSHAIR CURSOR EFFECT =====
// Hide default cursor
document.body.style.cursor = 'none';

// Create cursor elements
const cursorDot = document.createElement('div');
const cursorRing = document.createElement('div');
const cursorRing2 = document.createElement('div');

// Style cursor dot (center)
cursorDot.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: #00ff41;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    box-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41;
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s, background 0.2s;
`;

// Style first ring
cursorRing.style.cssText = `
    position: fixed;
    width: 15px;
    height: 15px;
    border: 2px solid #00ff41;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: all 0.15s ease-out;
    box-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
`;

// Style second ring (animated)
cursorRing2.style.cssText = `
    position: fixed;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(0, 217, 255, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    animation: pulse-ring 2s infinite;
`;

// Add pulsing animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse-ring {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.4;
        }
    }
    
    a, button, .btn, .project-link, .nav-link {
        cursor: none !important;
    }
`;
document.head.appendChild(style);

// Append to body
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);
document.body.appendChild(cursorRing2);

// Track cursor position
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let ringX = 0;
let ringY = 0;

// Update position on mouse move
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate cursor with smooth follow
function animateCursor() {
    // Instant update for dot
    cursorX = mouseX;
    cursorY = mouseY;
    
    // Smooth follow for rings
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
    
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    
    cursorRing2.style.left = ringX + 'px';
    cursorRing2.style.top = ringY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover effects on clickable elements
const clickables = document.querySelectorAll('a, button, .btn, .project-link, .nav-link, input, textarea');

clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.width = '20px';
        cursorDot.style.height = '20px';
        cursorDot.style.background = '#00d9ff';
        cursorRing.style.width = '60px';
        cursorRing.style.height = '60px';
        cursorRing.style.borderColor = '#00d9ff';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
        cursorDot.style.background = '#00ff41';
        cursorRing.style.width = '40px';
        cursorRing.style.height = '40px';
        cursorRing.style.borderColor = '#00ff41';
    });
});

// Click effect
document.addEventListener('mousedown', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(1.2)';
});

document.addEventListener('mouseup', () => {
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Hide cursor when leaving window
document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
    cursorRing2.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
    cursorRing2.style.opacity = '1';
});


// ===== RANDOM GLITCH EFFECT =====
setInterval(() => {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        if (Math.random() > 0.95) {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = '';
            }, 100);
        }
    });
}, 3000);

// ===== PROJECT CARD 3D TILT EFFECT =====
const cards = document.querySelectorAll('.project-card, .about-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== CONSOLE EASTER EGG =====
console.log('%c🔒 Security Notice', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%cThis website is protected by Cyril El Feghali\'s cybersecurity expertise.', 'color: #00d9ff; font-size: 14px;');
console.log('%cThink you can hack it? Let\'s connect! feghalicyril@gmail.com', 'color: #ff006e; font-size: 12px;');
