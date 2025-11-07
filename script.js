// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simula o carregamento
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.classList.add('loaded');
                document.body.classList.add('loaded');
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 100);
});

// Cursor Personalizado
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Efeito magnetic nos botões
document.querySelectorAll('.magnetic').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const strength = parseFloat(button.getAttribute('data-strength')) || 0.3;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) * strength;
        const deltaY = (y - centerY) * strength;
        
        button.style.setProperty('--tx', `${deltaX}px`);
        button.style.setProperty('--ty', `${deltaY}px`);
        button.style.setProperty('--scale', (1 + strength).toString());
        
        cursor.classList.add('hover');
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.setProperty('--tx', '0px');
        button.style.setProperty('--ty', '0px');
        button.style.setProperty('--scale', '1');
        cursor.classList.remove('hover');
    });
});

// Partículas no background
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posição aleatória
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        // Tamanho aleatório
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
    }
}

// Cards flip
document.querySelectorAll('.interactive-card').forEach(card => {
    const closeBtn = card.querySelector('.card-close');
    
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.card-close')) {
            card.classList.toggle('flipped');
        }
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.remove('flipped');
        });
    }
});

// Timeline interativa
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.timeline-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// FAQ interativo
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('active');
    });
});

// Back to top
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            if (entry.target.id === 'sobre') {
                startCounters();
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Observar elementos com data-animate
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
    
    // Observar outras seções importantes
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Efeito de digitação no hero
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Contador animado (mantido do anterior)
function startCounters() {
    const counters = document.querySelectorAll('.destaque-numero');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Menu mobile (mantido do anterior)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Header scroll effect (mantido)
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll (mantido)
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