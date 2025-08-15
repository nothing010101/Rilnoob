// Sound Management
function playSound(type) {
    const sounds = {
        'click': document.getElementById('clickSound'),
        'button': document.getElementById('buttonSound')
    };
    
    if (sounds[type]) {
        sounds[type].currentTime = 0;
        sounds[type].play().catch(e => console.log('Sound play failed:', e));
    }
}

// Create click effect
function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 600);
}

// Enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add click effects to interactive elements
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('game-block') || 
            e.target.classList.contains('action-btn') ||
            e.target.closest('.action-btn')) {
            createClickEffect(e.clientX, e.clientY);
        }
    });

    // Character interactions
    const mainCharacter = document.querySelector('.character-3d');
    const sideCharacter = document.querySelector('.side-char-3d');
    
    if (mainCharacter) {
        mainCharacter.addEventListener('click', function() {
            playSound('click');
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'float 3s ease-in-out infinite, spin 1s ease-out';
            }, 100);
            
            setTimeout(() => {
                this.style.animation = 'float 3s ease-in-out infinite';
            }, 1100);
        });

        // Add hover effect
        mainCharacter.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });

        mainCharacter.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    if (sideCharacter) {
        sideCharacter.addEventListener('click', function() {
            playSound('click');
            this.style.animation = 'side-float 4s ease-in-out infinite, wiggle 0.8s ease-out';
            
            setTimeout(() => {
                this.style.animation = 'side-float 4s ease-in-out infinite';
            }, 800);
        });
    }

    // Floating coins interaction
    const coins = document.querySelectorAll('.coin');
    coins.forEach(coin => {
        coin.addEventListener('click', function() {
            playSound('click');
            this.style.animation = 'collect-coin 0.5s ease-out forwards';
            
            setTimeout(() => {
                this.style.animation = 'float-coin 4s ease-in-out infinite';
            }, 500);
        });
    });

    // Background characters interaction
    const bgChars = document.querySelectorAll('.bg-char');
    bgChars.forEach(char => {
        char.addEventListener('click', function() {
            playSound('click');
            this.style.animation = 'move-around 8s ease-in-out infinite, jump 0.6s ease-out';
        });
    });

    // Enhanced button interactions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });

        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.btn-icon');
            if (icon) {
                icon.style.animationDuration = '1s';
            }
        });

        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.btn-icon');
            if (icon) {
                icon.style.animationDuration = '4s';
            }
        });
    });

    // Random floating elements
    createFloatingElements();
    
    // Easter eggs
    let clickCount = 0;
    document.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 10) {
            createSpecialEffect();
            clickCount = 0;
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case ' ': // Spacebar
                e.preventDefault();
                playSound('click');
                triggerDance();
                break;
            case 'c':
            case 'C':
                playSound('button');
                document.querySelector('.community-btn')?.click();
                break;
            case 'b':
            case 'B':
                playSound('button');
                document.querySelector('.buy-btn')?.click();
                break;
        }
    });

    // Auto-animate letters periodically
    setInterval(() => {
        const letters = document.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.animation = 'none';
                setTimeout(() => {
                    letter.style.animation = 'bounce 2s ease-in-out infinite';
                    letter.style.animationDelay = (index * 0.2) + 's';
                }, 100);
            }, index * 200);
        });
    }, 10000);
});

// Special effects functions
function createFloatingElements() {
    setInterval(() => {
        if (Math.random() < 0.3) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            sparkle.style.fontSize = '20px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.animation = 'sparkle 2s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 2000);
        }
    }, 3000);
}

function createSpecialEffect() {
    const colors = ['#ffeb3b', '#4caf50', '#2196f3', '#ff9800', '#f44336'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.innerHTML = ['🎉', '✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 5)];
            particle.style.position = 'absolute';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            particle.style.fontSize = '30px';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1001';
            particle.style.animation = 'celebration 3s ease-out forwards';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }, i * 100);
    }
    
    playSound('button');
}

function triggerDance() {
    const mainChar = document.querySelector('.character-3d');
    const sideChar = document.querySelector('.side-char-3d');
    const letters = document.querySelectorAll('.letter');
    
    if (mainChar) {
        mainChar.style.animation = 'dance 2s ease-in-out, float 3s ease-in-out infinite';
    }
    
    if (sideChar) {
        sideChar.style.animation = 'dance 2s ease-in-out, side-float 4s ease-in-out infinite';
    }
    
    letters.forEach((letter, index) => {
        letter.style.animation = 'dance 2s ease-in-out, bounce 2s ease-in-out infinite';
        letter.style.animationDelay = (index * 0.1) + 's';
    });
    
    setTimeout(() => {
        if (mainChar) {
            mainChar.style.animation = 'float 3s ease-in-out infinite';
        }
        if (sideChar) {
            sideChar.style.animation = 'side-float 4s ease-in-out infinite';
        }
        letters.forEach((letter, index) => {
            letter.style.animation = 'bounce 2s ease-in-out infinite';
            letter.style.animationDelay = (index * 0.2) + 's';
        });
    }, 2000);
}

// Additional CSS animations (injected via JavaScript)
const additionalStyles = `
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-5deg); }
    75% { transform: rotate(5deg); }
}

@keyframes collect-coin {
    0% { 
        transform: scale(1) translateY(0); 
        opacity: 1; 
    }
    100% { 
        transform: scale(0) translateY(-50px); 
        opacity: 0; 
    }
}

@keyframes jump {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
}

@keyframes celebration {
    0% { 
        transform: scale(0) rotate(0deg); 
        opacity: 1; 
    }
    50% { 
        transform: scale(1.5) rotate(180deg); 
        opacity: 0.8; 
    }
    100% { 
        transform: scale(0) rotate(360deg); 
        opacity: 0; 
    }
}

@keyframes dance {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-10deg) scale(1.1); }
    50% { transform: rotate(10deg) scale(0.9); }
    75% { transform: rotate(-5deg) scale(1.1); }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Console easter egg
console.log(`
🎮 Welcome to NOOB World! 🎮
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Keyboard shortcuts:
🔹 SPACE - Make everyone dance!
🔹 C - Community button
🔹 B - Buy button

Click 10 times anywhere for a special surprise! ✨

Made with ❤️ for gaming fun!
`);

// Performance optimization
let lastScrollTime = 0;
window.addEventListener('scroll', function() {
    const now = Date.now();
    if (now - lastScrollTime > 100) {
        // Throttled scroll handling
        lastScrollTime = now;
    }
});

// Visibility API for performance
document.addEventListener('visibilitychange', function() {
    const animations = document.querySelectorAll('*');
    if (document.hidden) {
        // Pause animations when tab is not visible
        animations.forEach(el => {
            if (el.style.animationPlayState !== 'paused') {
                el.style.animationPlayState = 'paused';
            }
        });
    } else {
        // Resume animations when tab becomes visible
        animations.forEach(el => {
            if (el.style.animationPlayState === 'paused') {
                el.style.animationPlayState = 'running';
            }
        });
    }
});
