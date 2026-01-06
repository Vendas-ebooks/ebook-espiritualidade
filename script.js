// Menu lateral com toggle de visibilidade
const menuToggle = document.querySelector('.menu-toggle');
const menuLateral = document.querySelector('.menu-lateral');
const closeMenu = document.querySelector('.close-menu');

function openMenu() {
    menuLateral.classList.add('active');
    menuToggle.classList.add('hidden');
    closeMenu.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeMenuHandler() {
    menuLateral.classList.remove('active');
    menuToggle.classList.remove('hidden');
    closeMenu.classList.remove('visible');
    document.body.style.overflow = 'auto';
}

menuToggle.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuHandler);

// Fechar menu ao clicar em um link
const menuLinks = document.querySelectorAll('.menu-lateral a');
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenuHandler);
});

// Carousel de Depoimentos
class DepoimentosCarousel {
    constructor() {
        this.carousel = document.querySelector('.depoimentos-carousel');
        if (!this.carousel) return;
        
        this.track = this.carousel.querySelector('.carousel-track');
        this.slides = this.carousel.querySelectorAll('.carousel-slide');
        this.prevBtn = this.carousel.querySelector('.carousel-prev');
        this.nextBtn = this.carousel.querySelector('.carousel-next');
        this.dotsContainer = this.carousel.querySelector('.carousel-dots');
        
        this.currentSlide = 0;
        this.slideCount = this.slides.length;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.updateCarousel();
        this.startAutoPlay();
        
        // Event Listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Touch events para mobile
        this.track.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.track.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Pausar autoplay no hover
        this.carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    createDots() {
        for (let i = 0; i < this.slideCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateCarousel() {
        this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // Atualizar dots
        this.dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Atualizar slides
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slideCount;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.stopAutoPlay();
    }
    
    handleTouchEnd(e) {
        if (!this.touchStartX) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const diff = this.touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
        this.touchStartX = null;
    }
}

// Timer de Oferta
class OfertaTimer {
    constructor() {
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        
        if (!this.hoursElement) return;
        
        // Define o tempo final (2 horas a partir de agora)
        this.endTime = new Date().getTime() + 2 * 60 * 60 * 1000;
        this.updateTimer();
        this.startTimer();
    }
    
    startTimer() {
        setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
    
    updateTimer() {
        const now = new Date().getTime();
        const distance = this.endTime - now;
        
        if (distance < 0) {
            // Reset timer quando acabar
            this.endTime = new Date().getTime() + 2 * 60 * 60 * 1000;
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        this.hoursElement.textContent = this.formatTime(hours);
        this.minutesElement.textContent = this.formatTime(minutes);
        this.secondsElement.textContent = this.formatTime(seconds);
    }
    
    formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
}

// Animação de scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.2s';
            entry.target.style.opacity = 1;
        }
    });
}, {
    threshold: 0.1
});

// Aplicar observador a todos os elementos com fade-in
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach((element, index) => {
    element.dataset.delay = `${index * 0.1}s`;
    observer.observe(element);
});

// Suavizar rolagem para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se estiver aberto
            if (menuLateral.classList.contains('active')) {
                closeMenuHandler();
            }
        }
    });
});

// Fechar menu ao clicar fora dele
document.addEventListener('click', (e) => {
    if (!menuLateral.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        menuLateral.classList.contains('active')) {
        closeMenuHandler();
    }
});

// Fechar menu com a tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuLateral.classList.contains('active')) {
        closeMenuHandler();
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(5, 5, 5, 0.98)';
    } else {
        header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
    }
});

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes
    new DepoimentosCarousel();
    new OfertaTimer();
    
    // Adicionar ano atual no footer
    const year = new Date().getFullYear();
    const copyright = document.querySelector('footer p');
    if (copyright) {
        copyright.innerHTML = `<i class="far fa-copyright"></i> ${year} — Todos os direitos reservados`;
    }
});

// Contador de estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.classList.contains('stat-number') ? '+' : '%');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.classList.contains('stat-number') ? '+' : '%');
        }
    }, 16);
}

// Animar estatísticas quando a seção hero estiver visível
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach((stat, index) => {
                setTimeout(() => {
                    const target = index === 0 ? 500 : index === 1 ? 98 : 21;
                    animateCounter(stat, target);
                }, index * 500);
            });
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}