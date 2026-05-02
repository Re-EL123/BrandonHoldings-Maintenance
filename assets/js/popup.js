/**
 * Popup Modal JavaScript
 * Handles contact form popup functionality
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        
        const popup = document.getElementById('contactPopup');
        const closeBtn = popup.querySelector('.popup-close');
        const overlay = popup.querySelector('.popup-overlay');
        const form = document.getElementById('contactForm');
        
        // Open popup function
        function openPopup() {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Close popup function
        function closePopup() {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Trigger popup on "Get Started" or contact links
        const triggerButtons = document.querySelectorAll('.btn-secondary, a[href="#contact"]');
        triggerButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                openPopup();
            });
        });
        
        // Close popup on close button click
        if (closeBtn) {
            closeBtn.addEventListener('click', closePopup);
        }
        
        // Close popup on overlay click
        if (overlay) {
            overlay.addEventListener('click', closePopup);
        }
        
        // Close popup on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                closePopup();
            }
        });
        
        // Handle form submission
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic honeypot check
                const honeypot = form.querySelector('input[name="website"]');
                if (honeypot && honeypot.value !== '') {
                    console.log('Spam detected');
                    return;
                }
                
                // Get form data
                const formData = new FormData(form);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                // Simple validation
                if (!name || !email || !message) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                // Show success message
                form.style.display = 'none';
                const successMessage = document.getElementById('formSuccess');
                successMessage.style.display = 'block';
                
                // In production, you would send this data to a server
                console.log('Form submitted:', { name, email, message });
                
                // Reset form after 3 seconds and close popup
                setTimeout(function() {
                    form.reset();
                    form.style.display = 'block';
                    successMessage.style.display = 'none';
                    closePopup();
                }, 3000);
            });
        }
        
    });

})();