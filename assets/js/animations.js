/**
 * Animations JavaScript
 * Advanced animations and scroll effects
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        
        // Add hover effects to cards
        initCardHoverEffects();
        
        // Parallax effect for hero section
        initParallaxEffect();
        
        // Stagger animations for grids
        initStaggerAnimations();
        
    });

    /**
     * Card Hover Effects
     */
    function initCardHoverEffects() {
        const cards = document.querySelectorAll('.card, .feature-item, .service-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * Parallax Scroll Effect
     */
    function initParallaxEffect() {
        const hero = document.querySelector('.hero-section');
        
        if (!hero) return;
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (hero) {
                hero.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
            }
        });
    }

    /**
     * Stagger Animations for Grid Items
     */
    function initStaggerAnimations() {
        const grids = document.querySelectorAll('.services-grid, .features-grid');
        
        grids.forEach(grid => {
            const items = grid.querySelectorAll('.service-item, .feature-item');
            
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            entry.target.classList.add('fade-in');
                        }, index * 100); // Stagger by 100ms
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            items.forEach(item => observer.observe(item));
        });
    }

    /**
     * Scroll Progress Indicator (optional)
     */
    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--color-primary);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

})();