// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Carousel
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
    });
});

startAutoSlide();

// Accordion FAQ
const accordionBtns = document.querySelectorAll('.accordion-btn');

accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('.accordion-icon');
        
        // Close all other accordions
        accordionBtns.forEach(otherBtn => {
            if (otherBtn !== btn) {
                otherBtn.nextElementSibling.classList.remove('open');
                otherBtn.querySelector('.accordion-icon').classList.remove('open');
            }
        });

        // Toggle current accordion
        content.classList.toggle('open');
        icon.classList.toggle('open');
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
});

// Gallery Modal
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryModal = document.getElementById('gallery-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
let currentImageIndex = 0;

const galleryImages = [
    'https://alyviaproctologialaser.com/assets/img/gallery/full/alyvia-tratamos.jpeg',
    'https://alyviaproctologialaser.com/assets/img/gallery/full/alyvia-ubicacion.jpeg',
    'https://alyviaproctologialaser.com/assets/img/gallery/full/beneficios-de-help.jpeg',
    'https://alyviaproctologialaser.com/assets/img/gallery/full/beneficios-filac.jpeg',
    'https://alyviaproctologialaser.com/assets/img/gallery/full/como-funciona-help.jpeg',
    'https://alyviaproctologialaser.com/assets/img/gallery/full/que-es-filac.jpeg',
    'https://alyviaproctologialaser.com/assets/img/gallery/full/que-es-fistula-anal.jpeg',
    'https://alyviaproctologialaser.com/assets/img/gallery/full/recomendaciones-despues-de-help.jpeg',
    'https://alyviaproctologialaser.com/assets/img/gallery/full/senales-que-muchos-ignoran.jpeg',
    'https://alyviaproctologialaser.com/assets/img/gallery/full/sintomas-a-reconocer.jpeg'
];

function openModal(index) {
    currentImageIndex = index;
    modalImage.src = galleryImages[index];
    galleryModal.classList.remove('hidden');
    galleryModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    galleryModal.classList.add('hidden');
    galleryModal.classList.remove('flex');
    document.body.style.overflow = '';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    modalImage.src = galleryImages[currentImageIndex];
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImage.src = galleryImages[currentImageIndex];
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openModal(index));
});

modalClose.addEventListener('click', closeModal);
modalNext.addEventListener('click', showNextImage);
modalPrev.addEventListener('click', showPrevImage);

galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (!galleryModal.classList.contains('hidden')) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    }
});