// DATA OBJECTS - Centralização de conteúdo
const SPORTS_DATA = [
    { title: "Basquete", desc: "Domine as quadras e melhore sua precisão." },
    { title: "Natação", desc: "Resistência e técnica sob as águas." },
    { title: "Atletismo", desc: "Supere seus limites em cada centímetro." }
];

const FAQ_DATA = [
    { q: "Como me inscrever?", a: "Basta clicar no botão de matrícula na página da modalidade." },
    { q: "Quais os horários?", a: "Funcionamos das 06h às 22h, de segunda a sábado." }
];

const SLIDES = ["Aventura", "Performance", "Comunidade"];

// RENDERIZADORES
function initApp() {
    // Renderizar Cards
    const grid = document.querySelector('.grid-wrapper');
    grid.innerHTML = SPORTS_DATA.map(sport => `
        <article class="card">
            <h3>${sport.title}</h3>
            <p>${sport.desc}</p>
        </article>
    `).join('');

    // Renderizar Carrossel
    const track = document.querySelector('#carousel-track');
    track.innerHTML = SLIDES.map(s => `<div class="slide">${s}</div>`).join('');

    // Renderizar FAQ
    const faqContainer = document.querySelector('#faq-accordion');
    faqContainer.innerHTML = FAQ_DATA.map((item, i) => `
        <div class="accordion-item">
            <button class="accordion-header" onclick="toggleAccordion(${i})">${item.q}</button>
            <div class="accordion-content" id="faq-${i}">${item.a}</div>
        </div>
    `).join('');
}

// ACESSIBILIDADE: Tamanho da Fonte
let currentFontSize = 16;
function changeFontSize(action) {
    currentFontSize += (action === 'increase' ? 2 : -2);
    document.documentElement.style.setProperty('--font-base', currentFontSize + 'px');
}

// ACESSIBILIDADE: Alto Contraste
function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

// COMPONENTE: Acordeão
function toggleAccordion(index) {
    const contents = document.querySelectorAll('.accordion-content');
    contents[index].classList.toggle('active');
}

// COMPONENTE: Carrossel Simples
let currentSlide = 0;
document.querySelector('#nextBtn').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % SLIDES.length;
    updateCarousel();
});

document.querySelector('#prevBtn').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + SLIDES.length) % SLIDES.length;
    updateCarousel();
});

function updateCarousel() {
    const track = document.querySelector('#carousel-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    track.style.transition = "transform 0.5s ease-in-out";
}

// ANIMAÇÃO: Scroll Reveal Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Inicialização
window.onload = initApp;
