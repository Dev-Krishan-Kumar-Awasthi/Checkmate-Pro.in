// Initialize Particles.js 
// We are using a constellation setup to represent "nodes" or "moves" in a chess network
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 60,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": ["#81b64c", "#96c963", "#454545"]
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 4,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#81b64c",
            "opacity": 0.3,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1.5,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 200,
                "line_linked": {
                    "opacity": 0.8
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Navbar Scrolled Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(11, 15, 25, 0.8)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.05)';
        nav.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
    }
});
// Feature Slideshow Logic
let slideIndex = 0;
let slideTimeout;

function showSlides() {
    let slides = document.querySelectorAll(".feature-slide");
    let dots = document.querySelectorAll(".dot");
    if (!slides.length) return;

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }

    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");

    slideTimeout = setTimeout(showSlides, 5000); // Change image every 5 seconds
}

// Allow user to click dots
function currentSlide(n) {
    clearTimeout(slideTimeout);
    let slides = document.querySelectorAll(".feature-slide");
    let dots = document.querySelectorAll(".dot");
    if (!slides.length) return;

    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slideIndex = n;
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");

    slideTimeout = setTimeout(showSlides, 5000);
}

// Start slideshow if elements exist
if (document.querySelector(".feature-slide")) {
    showSlides();
}
// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker registered:', reg))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}

// Toast Notification System
function showToast(message, duration = 5000) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// App Store Style Modal Logic
const storeModal = document.getElementById('storeModal');
const closeStoreModal = document.getElementById('closeStoreModal');
const directInstallBtn = document.getElementById('directInstallBtn');
const installBtnNav = document.getElementById('installBtnNav');
const installBtnHero = document.getElementById('installBtnHero');

function openStore() {
    storeModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeStore() {
    storeModal.classList.remove('active');
    document.body.style.overflow = '';
}

function triggerNativeInstall() {
    showToast('Starting high-speed download... 🚀', 3000);

    // Create a temporary link to trigger the APK download
    const link = document.createElement('a');
    link.href = 'CheckmatePro.apk';
    link.download = 'CheckmatePro.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Provide guidance after a short delay
    setTimeout(() => {
        showToast('<b>Next Step:</b> Open the downloaded APK and tap <b>"Install"</b> to start playing! ♟️', 8000);
        closeStore();
    }, 2000);
}

// Event Listeners
const downloadBtnNav = document.getElementById('downloadBtnNav');
const downloadBtnHero = document.getElementById('downloadBtnHero');

if (installBtnNav) installBtnNav.addEventListener('click', openStore);
if (installBtnHero) installBtnHero.addEventListener('click', openStore);
if (downloadBtnNav) downloadBtnNav.addEventListener('click', openStore);
if (downloadBtnHero) downloadBtnHero.addEventListener('click', openStore);
if (closeStoreModal) closeStoreModal.addEventListener('click', closeStore);
if (directInstallBtn) directInstallBtn.addEventListener('click', triggerNativeInstall);

// Close on background click
storeModal.addEventListener('click', (e) => {
    if (e.target === storeModal) closeStore();
});

// PWA Background logic (Keep as fallback but prioritize Native APK)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    console.log('PWA is ready as fallback');
});
