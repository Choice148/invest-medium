// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Copy wallet address functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const address = this.getAttribute('data-address');
            const originalText = this.innerHTML;
            
            // Copy to clipboard
            navigator.clipboard.writeText(address).then(() => {
                // Show success state
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.classList.add('copied');
                
                // Show notification
                showNotification('Wallet address copied to clipboard!', 'success');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                showNotification('Failed to copy address. Please try again.', 'error');
            });
        });
    });
    
    // QR code click to enlarge
    const qrCodes = document.querySelectorAll('.qr-code img');
    
    qrCodes.forEach(qrCode => {
        qrCode.addEventListener('click', function() {
            openQRModal(this.src, this.alt);
        });
        
        // Add cursor pointer
        qrCode.style.cursor = 'pointer';
    });
    
    // Investment card interactions
    const investmentCards = document.querySelectorAll('.investment-card');
    
    investmentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Step-by-step guide interactions
    const steps = document.querySelectorAll('.step');
    
    steps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Highlight current step
            steps.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // Show step details in a tooltip or modal
            showStepDetails(index + 1);
        });
    });
    
    // Testimonial card interactions
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('click', function() {
            // Show full testimonial in modal
            const author = this.querySelector('.testimonial-info h4').textContent;
            const text = this.querySelector('.testimonial-text').textContent;
            const stats = this.querySelector('.testimonial-stats').innerHTML;
            
            showTestimonialModal(author, text, stats);
        });
    });
    
    // Floating social support interactions
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.classList.contains('discord') ? 'Discord' : 
                           this.classList.contains('telegram') ? 'Telegram' : 'WhatsApp';
            
            // Show platform-specific message
            showSocialModal(platform);
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.investment-card, .step, .testimonial-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Header scroll effect (same as main page)
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition to header
    header.style.transition = 'transform 0.3s ease-in-out';
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 300px;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        // Add close button styles
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            margin-left: 12px;
            padding: 0;
            line-height: 1;
        `;
    }
    
    // QR Code Modal
    function openQRModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'qr-modal';
        modal.innerHTML = `
            <div class="qr-modal-content">
                <span class="qr-modal-close">&times;</span>
                <img src="${src}" alt="${alt}" style="max-width: 100%; height: auto;">
                <p>Scan this QR code with your crypto wallet app</p>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const modalContent = modal.querySelector('.qr-modal-content');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        const closeBtn = modal.querySelector('.qr-modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        `;
        
        // Add to page
        document.body.appendChild(modal);
        
        // Close functionality
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
    
    // Step Details Modal
    function showStepDetails(stepNumber) {
        const stepDetails = {
            1: {
                title: "Choose Your Crypto",
                details: "Consider your investment goals, risk tolerance, and market conditions. Bitcoin is great for long-term growth, Ethereum for smart contracts, USDT for stability, and Solana for fast transactions.",
                tips: ["Research each cryptocurrency", "Consider market timing", "Diversify your portfolio"]
            },
            2: {
                title: "Copy Wallet Address",
                details: "Use the copy button to get the wallet address or scan the QR code with your phone. Always double-check the address before sending funds.",
                tips: ["Verify the address twice", "Use QR codes for mobile", "Keep addresses secure"]
            },
            3: {
                title: "Send from Your Exchange",
                details: "Log into your preferred crypto exchange, navigate to the withdrawal section, paste the wallet address, and confirm the transaction.",
                tips: ["Start with small amounts", "Check network fees", "Verify transaction details"]
            },
            4: {
                title: "Track Your Investment",
                details: "Monitor your portfolio performance, set up price alerts, and consider implementing a dollar-cost averaging strategy for optimal results.",
                tips: ["Use portfolio trackers", "Set realistic goals", "Don't panic sell"]
            }
        };
        
        const step = stepDetails[stepNumber];
        if (!step) return;
        
        const modal = document.createElement('div');
        modal.className = 'step-modal';
        modal.innerHTML = `
            <div class="step-modal-content">
                <span class="step-modal-close">&times;</span>
                <h3>Step ${stepNumber}: ${step.title}</h3>
                <p>${step.details}</p>
                <h4>Pro Tips:</h4>
                <ul>
                    ${step.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const modalContent = modal.querySelector('.step-modal-content');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 500px;
            max-height: 90%;
            overflow-y: auto;
            position: relative;
        `;
        
        const closeBtn = modal.querySelector('.step-modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        `;
        
        // Add to page
        document.body.appendChild(modal);
        
        // Close functionality
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
    
    // Testimonial Modal
    function showTestimonialModal(author, text, stats) {
        const modal = document.createElement('div');
        modal.className = 'testimonial-modal';
        modal.innerHTML = `
            <div class="testimonial-modal-content">
                <span class="testimonial-modal-close">&times;</span>
                <h3>${author}'s Full Story</h3>
                <p class="testimonial-full-text">${text}</p>
                <div class="testimonial-full-stats">
                    ${stats}
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const modalContent = modal.querySelector('.testimonial-modal-content');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            max-width: 600px;
            max-height: 90%;
            overflow-y: auto;
            position: relative;
        `;
        
        const closeBtn = modal.querySelector('.testimonial-modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        `;
        
        // Add to page
        document.body.appendChild(modal);
        
        // Close functionality
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
    
    // Social Platform Modal
    function showSocialModal(platform) {
        const platformInfo = {
            Discord: {
                description: "Join our Discord community for real-time discussions, market updates, and expert advice.",
                action: "Join Discord Server",
                color: "#7289da"
            },
            Telegram: {
                description: "Get instant notifications and join our Telegram channel for crypto insights and community support.",
                action: "Join Telegram Channel",
                color: "#0088cc"
            },
            WhatsApp: {
                description: "Connect with our support team directly via WhatsApp for personalized assistance.",
                action: "Start WhatsApp Chat",
                color: "#25d366"
            }
        };
        
        const info = platformInfo[platform];
        
        const modal = document.createElement('div');
        modal.className = 'social-modal';
        modal.innerHTML = `
            <div class="social-modal-content">
                <span class="social-modal-close">&times;</span>
                <h3>${platform} Support</h3>
                <p>${info.description}</p>
                <button class="social-action-btn" style="background: ${info.color}">
                    ${info.action}
                </button>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const modalContent = modal.querySelector('.social-modal-content');
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            max-width: 400px;
            position: relative;
        `;
        
        const closeBtn = modal.querySelector('.social-modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        `;
        
        const actionBtn = modal.querySelector('.social-action-btn');
        actionBtn.style.cssText = `
            background: ${info.color};
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 20px;
        `;
        
        // Add to page
        document.body.appendChild(modal);
        
        // Close functionality
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        // Action button functionality
        actionBtn.addEventListener('click', () => {
            showNotification(`Redirecting to ${platform}...`, 'info');
            modal.remove();
            // In a real app, this would redirect to the actual social platform
        });
    }
    
    // Add some interactive effects
    const interactiveElements = document.querySelectorAll('.investment-card, .step, .testimonial-card, .social-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add transition to interactive elements
    interactiveElements.forEach(element => {
        element.style.transition = 'transform 0.2s ease-in-out';
    });
    
    // Initialize page with animations
    setTimeout(() => {
        const heroSection = document.querySelector('.hero-section');
        const investmentOptions = document.querySelector('.investment-options');
        
        if (heroSection) {
            heroSection.style.opacity = '0';
            heroSection.style.transform = 'translateY(20px)';
            heroSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            setTimeout(() => {
                heroSection.style.opacity = '1';
                heroSection.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (investmentOptions) {
            investmentOptions.style.opacity = '0';
            investmentOptions.style.transform = 'translateY(20px)';
            investmentOptions.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            setTimeout(() => {
                investmentOptions.style.opacity = '1';
                investmentOptions.style.transform = 'translateY(0)';
            }, 400);
        }
    }, 100);
    
    console.log('Investment page loaded successfully! 🚀💰');
});
