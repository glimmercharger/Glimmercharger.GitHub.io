/* ============================================
   SCROLL ANIMATION
   ============================================ */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

/* ============================================
   NAVBAR ACTIVE LINK
   ============================================ */
function setActiveNavLink() {
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentLocation.includes(href) && href !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation === '/' && href === 'index.html') {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

/* ============================================
   HAMBURGER MENU
   ============================================ */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
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

/* ============================================
   CONTACT FORM
   ============================================ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const formMessage = document.getElementById('formMessage');
        
        // Simple validation
        if (name && email && subject && message) {
            // Simulate form submission
            formMessage.textContent = 'Message sent successfully! Thank you for reaching out.';
            formMessage.classList.add('success');
            formMessage.classList.remove('error');
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.classList.remove('success');
            }, 5000);
        } else {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.classList.add('error');
            formMessage.classList.remove('success');
        }
    });
}

/* ============================================
   PROJECT FILTER
   ============================================ */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('visible');
                }, 10);
            } else {
                card.classList.remove('visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 600);
            }
        });
    });
});

/* ============================================
   SKILL PROGRESS ANIMATION
   ============================================ */
const skillProgresses = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillProgress = entry.target;
            const width = skillProgress.style.width;
            
            skillProgress.style.width = '0';
            
            setTimeout(() => {
                skillProgress.style.width = width;
            }, 100);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

skillProgresses.forEach(progress => {
    skillObserver.observe(progress);
});

/* ============================================
   PARALLAX SCROLL EFFECT
   ============================================ */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingShape = document.querySelector('.floating-shape');
    
    if (floatingShape && window.innerWidth > 768) {
        floatingShape.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.05}deg)`;
    }
});

/* ============================================
   COUNTER ANIMATION
   ============================================ */
const statNumbers = document.querySelectorAll('.stat-number');
const animatedStats = new Set();

const countObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats.has(entry.target)) {
            const target = entry.target;
            const finalValue = target.textContent;
            
            // Extract number from text (e.g., "9+" -> 9)
            const numberMatch = finalValue.match(/\d+/);
            if (numberMatch) {
                const number = parseInt(numberMatch[0]);
                animateCounter(target, number);
                animatedStats.add(target);
            }
        }
    });
}, observerOptions);

function animateCounter(element, finalNumber) {
    let currentNumber = 0;
    const increment = Math.max(1, Math.ceil(finalNumber / 30));
    const originalText = element.textContent;
    
    const counter = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            element.textContent = originalText;
            clearInterval(counter);
        } else {
            element.textContent = currentNumber + '+';
        }
    }, 80);
}

statNumbers.forEach(stat => {
    countObserver.observe(stat);
});

/* ============================================
   SCROLL DEPTH TRACKING
   ============================================ */
let maxScrollDepth = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
    }
});

/* ============================================
   MOBILE TOUCH OPTIMIZATION
   ============================================ */
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Improve touch targets
    const buttons = document.querySelectorAll('button, a.btn');
    buttons.forEach(button => {
        button.style.minHeight = '44px';
    });
}

/* ============================================
   LAZY LOADING IMAGES
   ============================================ */
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   PAGE LOAD ANIMATION
   ============================================ */
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger scroll animation check
    const scrollEvent = new Event('scroll');
    window.dispatchEvent(scrollEvent);
});

// Initial opacity set to 0, will be set to 1 on load
document.body.style.opacity = '1';

/* ============================================
   ACCESSIBILITY IMPROVEMENTS
   ============================================ */
// Add focus visible styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Announce dynamic content changes for screen readers
function announceToScreenReaders(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = message;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/* ============================================
   DARK MODE DETECTION (Future Enhancement)
   ============================================ */
// Check if user prefers dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // User prefers dark mode
    // Could add dark mode styles here in the future
}

// Listen for changes in dark mode preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Handle dark mode toggle
});

/* ============================================
   SERVICE WORKER REGISTRATION (PWA)
   ============================================ */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js').catch(err => {
        //     console.log('Service Worker registration failed:', err);
        // });
    });
}

console.log('✨ Welcome to Will K Portfolio!');
console.log('Feel free to explore and let me know what you think.');
