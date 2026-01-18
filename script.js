// Menu Mobile - SIMPLES E FUNCIONAL
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada - Inicializando menu hambúrguer...');
    
    // Elementos do menu
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const menuLateral = document.getElementById('menuLateral');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    console.log('Elementos encontrados:', {
        menuToggle: !!menuToggle,
        closeMenu: !!closeMenu,
        menuLateral: !!menuLateral,
        menuOverlay: !!menuOverlay,
        menuLinks: menuLinks.length
    });
    
    // Função para alternar o ícone do menu
    function alternarIconeMenu(aberto) {
        if (!menuToggle) return;
        
        if (aberto) {
            menuToggle.classList.add('menu-aberto');
            menuToggle.setAttribute('aria-label', 'Fechar menu');
            menuToggle.style.position = 'fixed';
            menuToggle.style.right = '20px';
            menuToggle.style.top = '20px';
            menuToggle.style.zIndex = '1004';
        } else {
            menuToggle.classList.remove('menu-aberto');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
            menuToggle.style.position = '';
            menuToggle.style.right = '';
            menuToggle.style.top = '';
            menuToggle.style.zIndex = '';
        }
    }
    
    // Função para abrir menu
    function abrirMenu() {
        console.log('Abrindo menu mobile');
        menuLateral.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        alternarIconeMenu(true);
    }
    
    // Função para fechar menu
    function fecharMenu() {
        console.log('Fechando menu mobile');
        menuLateral.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        alternarIconeMenu(false);
    }
    
    // Event Listeners para o menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (menuLateral.classList.contains('active')) {
                fecharMenu();
            } else {
                abrirMenu();
            }
        });
        console.log('Evento click adicionado ao menuToggle');
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', fecharMenu);
        console.log('Evento click adicionado ao closeMenu');
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                fecharMenu();
            }
        });
        console.log('Evento click adicionado ao menuOverlay');
    }
    
    // Fechar menu ao clicar em links
    menuLinks.forEach(link => {
        link.addEventListener('click', fecharMenu);
    });
    console.log('Eventos click adicionados aos', menuLinks.length, 'links do menu');
    
    // Fechar menu com tecla ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && menuLateral.classList.contains('active')) {
            fecharMenu();
            console.log('Menu fechado com tecla ESC');
        }
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (menuLateral.classList.contains('active') && 
            !menuLateral.contains(e.target) && 
            e.target !== menuToggle && 
            !menuToggle.contains(e.target)) {
            fecharMenu();
        }
    });
    
    // Carousel de depoimentos
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (carouselTrack && slides.length > 0) {
        console.log('Inicializando carousel com', slides.length, 'slides');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Criar dots
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    updateCarousel();
                });
                dotsContainer.appendChild(dot);
            });
        }
        
        const dots = document.querySelectorAll('.carousel-dots button');
        
        function updateCarousel() {
            // Atualizar posição
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Atualizar dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
            
            // Atualizar slides
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateCarousel();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            });
        }
        
        // Auto-play
        let autoPlay = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
        
        // Pausar no hover
        if (carouselTrack) {
            carouselTrack.addEventListener('mouseenter', () => clearInterval(autoPlay));
            
            // Re-iniciar auto-play
            carouselTrack.addEventListener('mouseleave', () => {
                autoPlay = setInterval(() => {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    updateCarousel();
                }, 5000);
            });
        }
        
        // Inicializar
        updateCarousel();
    } else {
        console.log('Carousel não encontrado ou sem slides');
    }
    
    // Timer da oferta
    function atualizarTimer() {
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (!hoursEl || !minutesEl || !secondsEl) {
            console.log('Elementos do timer não encontrados');
            return;
        }
        
        // Inicializar com 2 horas
        let hours = 2;
        let minutes = 59;
        let seconds = 59;
        
        function updateDisplay() {
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
        
        function countdown() {
            if (seconds > 0) {
                seconds--;
            } else {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    } else {
                        // Timer finalizado
                        clearInterval(timerInterval);
                        hoursEl.textContent = '00';
                        minutesEl.textContent = '00';
                        secondsEl.textContent = '00';
                        return;
                    }
                }
            }
            
            updateDisplay();
        }
        
        // Inicializar display
        updateDisplay();
        
        // Iniciar contagem regressiva
        const timerInterval = setInterval(countdown, 1000);
        
        console.log('Timer inicializado com sucesso');
    }
    
    // Iniciar timer
    atualizarTimer();
    
    // Animações de entrada
    function observarElementos() {
        const elementos = document.querySelectorAll('.fade-in');
        
        if (!elementos.length) {
            console.log('Nenhum elemento .fade-in encontrado');
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elementos.forEach(el => observer.observe(el));
        console.log('Observer inicializado para', elementos.length, 'elementos');
    }
    
    observarElementos();
    
    // Atualizar ano no footer
    const anoAtual = document.getElementById('current-year');
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
        console.log('Ano atualizado no footer:', anoAtual.textContent);
    }
    
    // FAQ - Animação suave
    const faqDetails = document.querySelectorAll('details');
    faqDetails.forEach(detail => {
        detail.addEventListener('toggle', function() {
            if (this.open) {
                this.style.transition = 'all 0.3s ease';
            }
        });
    });
    
    // Botões de compra - tracking
    const botoesCompra = document.querySelectorAll('a[href*="kiwify"]');
    botoesCompra.forEach(botao => {
        botao.addEventListener('click', function(e) {
            console.log('Botão de compra clicado:', this.href);
            // Facebook Pixel tracking já está no onclick do HTML
            
            // Feedback visual
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';
            this.style.pointerEvents = 'none';
            
            // Restaurar após 3 segundos (caso a página não redirecione)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 3000);
        });
    });
    
    // Log para debug
    console.log('Script inicializado com sucesso!');
    
    // Adicionar classe de carregamento ao body
    document.body.classList.add('loaded');
    
    // Suavizar scroll para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Se for o menu mobile, fechar primeiro
                if (menuLateral.classList.contains('active')) {
                    fecharMenu();
                    
                    // Aguardar menu fechar antes de scrollar
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                    }, 300);
                } else {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Adicionar efeito hover aos botões
    const botoes = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-whatsapp, .btn-email, .btn-faq');
    botoes.forEach(botao => {
        botao.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        botao.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Verificar se está em dispositivo móvel
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Ajustar animações para mobile
    if (isMobile()) {
        document.body.classList.add('mobile');
        console.log('Dispositivo móvel detectado');
        
        // Reduzir animações em mobile para performance
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach(icon => {
            icon.style.animationDuration = '8s';
        });
    }
    
    // Adicionar feedback visual aos cliques
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' && e.target.classList.contains('btn')) {
            const elemento = e.target;
            elemento.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                elemento.style.transform = '';
            }, 150);
        }
    });
    
    // Monitorar erros de carregamento de imagens
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Imagem não carregada:', this.src);
            this.style.display = 'none';
        });
    });
    
    // Adicionar data de carregamento para analytics
    window.pageLoadTime = new Date();
    console.log('Página carregada em:', window.pageLoadTime);
    
    // Detectar conexão lenta
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection) {
            console.log('Tipo de conexão:', connection.effectiveType);
            console.log('Velocidade estimada:', connection.downlink, 'Mbps');
            
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                document.body.classList.add('slow-connection');
                console.log('Conexão lenta detectada');
            }
        }
    }
    
    // Adicionar rolagem suave para topo
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(scrollToTopBtn);
    
    // Mostrar/ocultar botão de voltar ao topo
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Evento de clique no botão
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Adicionar hover effect
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.1)';
        this.style.boxShadow = '0 6px 16px rgba(78, 26, 143, 0.4)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 12px rgba(78, 26, 143, 0.3)';
    });
    
    // Verificar se há parâmetros de URL para tracking
    function getUrlParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split('&');
        
        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) {
                params[decodeURIComponent(key)] = decodeURIComponent(value || '');
            }
        });
        
        return params;
    }
    
    const urlParams = getUrlParams();
    if (Object.keys(urlParams).length > 0) {
        console.log('Parâmetros da URL:', urlParams);
    }
    
    // Adicionar classe para primeiro carregamento
    if (!sessionStorage.getItem('firstLoad')) {
        document.body.classList.add('first-load');
        sessionStorage.setItem('firstLoad', 'true');
    }
    
    // Finalizar carregamento
    window.addEventListener('load', function() {
        console.log('Página totalmente carregada');
        document.body.classList.add('fully-loaded');
    });
    
    // Fallback para IntersectionObserver em navegadores antigos
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver não suportado - usando fallback');
        
        const elementosFade = document.querySelectorAll('.fade-in');
        window.addEventListener('scroll', function() {
            elementosFade.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    el.classList.add('visible');
                }
            });
        });
        
        // Trigger inicial
        setTimeout(() => {
            elementosFade.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    el.classList.add('visible');
                }
            });
        }, 100);
    }
    
    // Corrigir altura do hero em mobile
    function ajustarAlturaHero() {
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth < 768) {
            hero.style.minHeight = 'calc(100vh - 70px)';
        }
    }
    
    ajustarAlturaHero();
    window.addEventListener('resize', ajustarAlturaHero);
});
