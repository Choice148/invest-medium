// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Comment submission functionality
    const commentForm = document.querySelector('.comment-form');
    const commentInput = document.querySelector('.comment-input');
    const commentSubmit = document.querySelector('.comment-submit');
    const commentsList = document.querySelector('.comments-list');
    
    if (commentSubmit) {
        commentSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            
            const commentText = commentInput.value.trim();
            if (!commentText) {
                alert('Please enter a comment before submitting.');
                return;
            }
            
            // Create new comment element
            const newComment = document.createElement('div');
            newComment.className = 'comment';
            newComment.innerHTML = `
                <div class="comment-avatar">
                    <img src="https://via.placeholder.com/32x32/007bff/ffffff?text=U" alt="Your Profile">
                </div>
                <div class="comment-content">
                    <div class="comment-author">You</div>
                    <div class="comment-text">${commentText}</div>
                </div>
            `;
            
            // Add new comment to the top of the list
            commentsList.insertBefore(newComment, commentsList.firstChild);
            
            // Clear input
            commentInput.value = '';
            
            // Update comment count
            const commentCount = document.querySelector('.comments-section h3');
            const currentCount = parseInt(commentCount.textContent.match(/\d+/)[0]);
            commentCount.textContent = `Responses (${currentCount + 1})`;
            
            // Show success message
            showNotification('Comment added successfully!', 'success');
        });
    }
    
    // Engagement stats functionality
    const engagementStats = document.querySelectorAll('.engagement-stats > div');
    
    engagementStats.forEach(stat => {
        stat.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const text = this.querySelector('span');
            
            if (this.classList.contains('claps')) {
                // Increment claps
                const currentClaps = parseInt(text.textContent.replace('K', '000'));
                const newClaps = currentClaps + 1000;
                text.textContent = (newClaps / 1000) + 'K';
                
                // Add animation
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 200);
                
                showNotification('Clap added!', 'success');
            } else if (this.classList.contains('comments')) {
                // Focus on comment input
                commentInput.focus();
            } else if (this.classList.contains('share')) {
                // Share functionality
                if (navigator.share) {
                    navigator.share({
                        title: 'I Quit My Job After Reading Trump\'s Crypto Order',
                        text: 'Check out this interesting article about crypto and Trump\'s policies.',
                        url: window.location.href
                    });
                } else {
                    // Fallback for browsers that don't support Web Share API
                    const url = window.location.href;
                    navigator.clipboard.writeText(url).then(() => {
                        showNotification('Link copied to clipboard!', 'success');
                    });
                }
            } else if (this.classList.contains('bookmark')) {
                // Toggle bookmark
                if (icon.classList.contains('fas')) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    showNotification('Removed from bookmarks', 'info');
                } else {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    showNotification('Added to bookmarks', 'success');
                }
            }
        });
    });
    
    // Follow button functionality
    const followButtons = document.querySelectorAll('.follow-btn, .follow-btn-large');
    
    followButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'Follow') {
                this.textContent = 'Following';
                this.style.background = '#1a1a1a';
                this.style.color = 'white';
                showNotification('You are now following Blockfuturist!', 'success');
            } else {
                this.textContent = 'Follow';
                this.style.background = 'transparent';
                this.style.color = '#1a1a1a';
                showNotification('You unfollowed Blockfuturist', 'info');
            }
        });
    });
    
    // Upgrade button functionality
    const upgradeBtn = document.querySelector('.upgrade-btn');
    
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function() {
            showNotification('Upgrade functionality would be implemented here!', 'info');
            // In a real application, this would redirect to a payment page
            // or open a modal for subscription options
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
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
    
    // Add some hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, .engagement-stats > div, .search-icon, .notification-icon, .profile-pic');
    
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
    
    // Initialize page with some animations
    setTimeout(() => {
        const articleTitle = document.querySelector('.article-title');
        const heroImage = document.querySelector('.hero-image');
        const articleContent = document.querySelector('.article-content');
        
        if (articleTitle) {
            articleTitle.style.opacity = '0';
            articleTitle.style.transform = 'translateY(20px)';
            articleTitle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            setTimeout(() => {
                articleTitle.style.opacity = '1';
                articleTitle.style.transform = 'translateY(0)';
            }, 200);
        }
        
        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'scale(0.95)';
            heroImage.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            
            setTimeout(() => {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1)';
            }, 400);
        }
        
        if (articleContent) {
            articleContent.style.opacity = '0';
            articleContent.style.transform = 'translateY(20px)';
            articleContent.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            setTimeout(() => {
                articleContent.style.opacity = '1';
                articleContent.style.transform = 'translateY(0)';
            }, 600);
        }
    }, 100);
    
    // Add loading state to buttons
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('upgrade-btn') || this.classList.contains('comment-submit')) {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
    
    console.log('Landing page loaded successfully! 🚀');
});
