// ShiftZero Robotics - Modern Interactive Features

// ========================================
// 1. Scroll Reveal Animations
// ========================================
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

// Observe all sections, cards, and grid items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.row, .team-member, .job-card, .capability-card, section'
    );

    animatedElements.forEach((el, index) => {
        // Add slight delay for staggered animation
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// ========================================
// 2. Active Navigation Highlighting
// ========================================
const updateActiveNav = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
            link.style.borderColor = '#666';
        }
    });
};

document.addEventListener('DOMContentLoaded', updateActiveNav);

// ========================================
// 3. Scroll Progress Indicator
// ========================================
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #ffffff 0%, #888888 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

document.addEventListener('DOMContentLoaded', createScrollProgress);

// ========================================
// 4. Smooth Scroll Enhancement
// ========================================
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

// ========================================
// 5. Parallax Effect for Images
// ========================================
const handleParallax = () => {
    const images = document.querySelectorAll('.image-side img');

    window.addEventListener('scroll', () => {
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                img.style.transform = `translateY(${rate}px) scale(1)`;
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', handleParallax);

// ========================================
// 6. Loading Animation
// ========================================
const createLoadingAnimation = () => {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;

    const loaderText = document.createElement('div');
    loaderText.innerHTML = `
        <div style="text-align: center;">
            <h2 style="font-size: 2rem; color: #ffffff; font-weight: 300; letter-spacing: 3px;">SHIFTZERO</h2>
            <div style="width: 200px; height: 2px; background: rgba(255,255,255,0.2); margin: 20px auto; position: relative; overflow: hidden;">
                <div style="position: absolute; height: 100%; width: 50%; background: #ffffff; animation: loading 1.5s infinite;"></div>
            </div>
        </div>
        <style>
            @keyframes loading {
                0% { left: -50%; }
                100% { left: 100%; }
            }
        </style>
    `;

    loader.appendChild(loaderText);
    document.body.appendChild(loader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => loader.remove(), 500);
        }, 500);
    });
};

document.addEventListener('DOMContentLoaded', createLoadingAnimation);

// ========================================
// 7. Interactive Button Glow on Mouse Move
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-links a, .btn-primary');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// ========================================
// 8. Typing Effect for Headers (Optional)
// ========================================
const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';

    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };

    type();
};

// Apply typing effect to main headers
document.addEventListener('DOMContentLoaded', () => {
    const mainHeaders = document.querySelectorAll('.main-header h1');
    mainHeaders.forEach(header => {
        const originalText = header.textContent;
        header.style.borderRight = '2px solid #fff';
        header.style.paddingRight = '5px';
        header.style.display = 'inline-block';

        setTimeout(() => {
            typeWriter(header, originalText, 80);
            setTimeout(() => {
                header.style.borderRight = 'none';
            }, originalText.length * 80 + 500);
        }, 600);
    });
});

// ========================================
// 9. Dynamic Cursor Trail (Optional Enhancement)
// ========================================
const createCursorTrail = () => {
    const coords = { x: 0, y: 0 };
    const circles = [];
    const colors = ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.06)'];

    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-trail';
        circle.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: ${colors[i]};
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.2s ease;
        `;
        document.body.appendChild(circle);
        circles.push(circle);
    }

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    const animateCircles = () => {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
            circle.style.left = x - 10 + 'px';
            circle.style.top = y - 10 + 'px';
            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.offsetLeft - x) * 0.3;
            y += (nextCircle.offsetTop - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    };

    animateCircles();
};

// Uncomment to enable cursor trail
// document.addEventListener('DOMContentLoaded', createCursorTrail);

// ========================================
// 10. Image Hover Tilt Effect
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-side img');

    images.forEach(img => {
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});

// ========================================
// 11. Counter Animation for Stats
// ========================================
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// ========================================
// Performance: Reduce animations on low-end devices
// ========================================
const checkPerformance = () => {
    // Disable heavy animations on mobile or low-performance devices
    if (window.innerWidth < 768 || navigator.hardwareConcurrency < 4) {
        document.querySelectorAll('*').forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.animation || style.transition) {
                el.style.animation = 'none';
            }
        });
    }
};

// Uncomment to enable performance optimization
// document.addEventListener('DOMContentLoaded', checkPerformance);

console.log('🤖 ShiftZero Robotics - Interactive features loaded');
