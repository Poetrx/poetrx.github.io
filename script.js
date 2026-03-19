// DOM Elements
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const typingElement = document.getElementById('typing');
const typewriterText = document.getElementById('typewriter-text');


// Navbar Mobile - Pop dari samping - Buka
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// Close mobile menu
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});


// Typing Effect untuk nama (RGB)
const nameText = 'Poetrex';
let nameIndex = 0;

function typeName() {
  if (nameIndex < nameText.length) {
    typingElement.textContent += nameText.charAt(nameIndex);
    nameIndex++;
    setTimeout(typeName, 150);
  }
}


// Typewriter Effect untuk subtitle
const subtitleTexts = ['UI/UX Designer', 'Front-End Developer'];
let subtitleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 150;

function typeWriter() {
  const currentText = subtitleTexts[subtitleIndex];
  
  // Logika menentukan teks yang ditampilkan
  if (isDeleting) {
    // Menghapus: charIndex berkurang
    typewriterText.innerHTML = currentText.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 150; // Kecepatan menghapus
  } else {
    // Mengetik: charIndex bertambah
    typewriterText.innerHTML = currentText.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 150; // Kecepatan mengetik 
  }

  // Tambahkan kursor manual setelah teks
  typewriterText.innerHTML += '<span class="cursor">|</span>';

  // Cek jika kata sudah selesai diketik
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typeSpeed = 9500; // Diam sebentar setelah selesai mengetik
  } 
  // Cek jika kata sudah selesai dihapus
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    subtitleIndex = (subtitleIndex + 1) % subtitleTexts.length;
    typeSpeed = 4500; // Jeda sebelum mulai mengetik kata baru
  }

  setTimeout(typeWriter, typeSpeed);
}


// Jalankan saat halaman load
window.onload = typeWriter;

// Jalankan fungsi setelah DOM siap
document.addEventListener('DOMContentLoaded', () => {
  if(typewriterText) typeWriter();
});
// Start animations setelah load
window.addEventListener('load', () => {
  setTimeout(() => {
    typeName();
    setTimeout(typeWriter, 2000);
  }, 500);
});


// Scroll Reveal untuk semua sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Animate skills cards
      if (entry.target.querySelector('.skills-container')) {
        const skillCards = entry.target.querySelectorAll('.skill-card');
        skillCards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('animate');
          }, i * 100);
        });
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal, #skills').forEach(el => {
  observer.observe(el);
});


// Contact Form (WORKING!)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
const btn = contactForm.querySelector('button');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  btn.disabled = true;
  btn.textContent = 'Sending...';

  formStatus.textContent = 'Mengirim...';
  formStatus.style.color = '#6366f1';

  const formData = new FormData(contactForm);
  const actionUrl = contactForm.getAttribute('action');

  try {
    const response = await fetch(actionUrl, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json'
      }
    });

    if (response.ok) {
      formStatus.textContent = '✅ Pesan berhasil dikirim! Terima kasih.';
      formStatus.style.color = '#10b981';
      contactForm.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    formStatus.textContent = '❌ Gagal mengirim, coba lagi.';
    formStatus.style.color = '#ef4444';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';

    setTimeout(() => {
      formStatus.textContent = '';
    }, 4000);
  }
});


// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255,255,255,0.98)';
  } else {
    header.style.background = 'rgba(255,255,255,0.95)';
  }
});


// Prevent body scroll when menu open
document.body.classList.toggle('no-scroll', false);
