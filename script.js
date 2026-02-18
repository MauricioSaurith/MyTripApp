document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar scroll effect
    const nav = document.querySelector('#main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. AI Chat Demo Animation
    const chatDemo = document.getElementById('ai-chat-demo');
    const scenarios = [
        { user: "Quiero ir a Japón este verano, presupuesto medio.", ai: "¡Excelente elección! He generado una ruta de 10 días por Tokio, Kioto y Osaka. Incluye pases de tren con 15% de descuento." },
        { user: "¿Qué museos me recomiendas en París?", ai: "Te recomiendo el Louvre al amanecer y el Museé d'Orsay. He encontrado entradas sin colas por 25€." },
        { user: "Busco playa tranquila en México.", ai: "Tulum es hermoso, pero Holbox es más virgen y económico ahora mismo. ¿Te busco transporte?" }
    ];

    let currentScenario = 0;

    async function runDemo() {
        if (!chatDemo) return;

        // Clear previous messages if any (except the first welcome)
        const welcomeMsg = chatDemo.querySelector('.message.ai');
        chatDemo.innerHTML = '';
        chatDemo.appendChild(welcomeMsg);

        const scenario = scenarios[currentScenario];

        // Type user message
        await wait(1000);
        addMessage(scenario.user, 'user');

        // Type AI response
        await wait(1500);
        addMessage(scenario.ai, 'ai');

        currentScenario = (currentScenario + 1) % scenarios.length;

        await wait(4000);
        runDemo();
    }

    function addMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        msgDiv.style.opacity = '0';
        msgDiv.style.transform = 'translateY(10px)';
        chatDemo.appendChild(msgDiv);

        // Animate in
        setTimeout(() => {
            msgDiv.style.transition = 'all 0.5s ease';
            msgDiv.style.opacity = '1';
            msgDiv.style.transform = 'translateY(0)';
        }, 50);

        // Scroll to bottom
        chatDemo.scrollTop = chatDemo.scrollHeight;
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    runDemo();

    // 3. Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .demo-text, .demo-app-frame').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // 5. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });
    }
});
