/* ================================================================
   POWERNEXUS — script.js
   Pure vanilla JavaScript — no libraries, no build step
   ================================================================ */

'use strict';

/* ────────────────────────────────────────────────
   NAVBAR — scroll shrink effect
──────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ────────────────────────────────────────────────
   MOBILE MENU
──────────────────────────────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});
mobileClose.addEventListener('click', closeMobile);

function closeMobile() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

/* ────────────────────────────────────────────────
   SCROLL REVEAL — IntersectionObserver
──────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // fire once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ────────────────────────────────────────────────
   COUNTDOWN TIMER
   Target: next upcoming session date
──────────────────────────────────────────────── */

// Session dates (adjust as needed)
const sessionDates = [
  new Date('2026-07-10T10:00:00+05:30'),
];

function getNextSession() {
  const now = new Date();
  for (const d of sessionDates) {
    if (d > now) return d;
  }
  return null; // all sessions passed
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function updateCountdown() {
  const target = getNextSession();
  const cdDays  = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins  = document.getElementById('cd-mins');
  const cdSecs  = document.getElementById('cd-secs');

  if (!target) {
    cdDays.textContent  = '00';
    cdHours.textContent = '00';
    cdMins.textContent  = '00';
    cdSecs.textContent  = '00';
    const label = document.getElementById('cd-label');
    if (label) label.textContent = 'Series Concluded — Thank You!';
    return;
  }

  const diff = target - new Date();
  if (diff <= 0) {
    cdDays.textContent  = '00';
    cdHours.textContent = '00';
    cdMins.textContent  = '00';
    cdSecs.textContent  = '00';
    return;
  }

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);
  const secs  = Math.floor((diff % 60000)    / 1000);

  cdDays.textContent  = pad(days);
  cdHours.textContent = pad(hours);
  cdMins.textContent  = pad(mins);
  cdSecs.textContent  = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ────────────────────────────────────────────────
   SCHEDULE — interactive timeline
──────────────────────────────────────────────── */
function selectSession(el, title, desc) {
  // Remove active from all
  document.querySelectorAll('.sched-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');

  // Update detail card
  document.getElementById('sdTitle').innerHTML = title;
  document.getElementById('sdDesc').textContent  = desc;

  // Animate the card
  const card = document.getElementById('scheduleDetail');
  card.style.opacity = '0';
  card.style.transform = 'translateY(8px)';
  card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  });
}

/* ────────────────────────────────────────────────
   FAQ — accordion
──────────────────────────────────────────────── */
function toggleFaq(btn) {
  const body = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  // Close all others
  document.querySelectorAll('.faq-btn.open').forEach(b => {
    if (b !== btn) {
      b.classList.remove('open');
      b.nextElementSibling.classList.remove('open');
    }
  });

  // Toggle current
  if (isOpen) {
    btn.classList.remove('open');
    body.classList.remove('open');
  } else {
    btn.classList.add('open');
    body.classList.add('open');
  }
}

/* ────────────────────────────────────────────────
   REGISTRATION FORM — submit + ticket
──────────────────────────────────────────────── */
function generateTicketId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'PN-';
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
    if (i === 3) id += '-';
  }
  return id;
}

function submitForm(e) {
  e.preventDefault();

  const fname       = document.getElementById('fname').value.trim();
  const lname       = document.getElementById('lname').value.trim();
  const email       = document.getElementById('email').value.trim();
  const role        = document.getElementById('role').value;
  const submitBtn   = document.getElementById('submitBtn');

  // Basic validation
  if (!fname || !lname) {
    alert('Please enter your full name.');
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }
  if (!role) {
    alert('Please select your participant type.');
    return;
  }

  // Simulate async submit
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg style="animation:spin 0.75s linear infinite" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
    Registering…
  `;

  // Add spin keyframe if not present
  if (!document.getElementById('spin-style')) {
    const s = document.createElement('style');
    s.id = 'spin-style';
    s.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
    document.head.appendChild(s);
  }

  setTimeout(() => {
    // Populate ticket
    const ticketId = generateTicketId();
    const fullName = `${fname} ${lname}`;

    document.getElementById('tk-name').textContent     = fullName;
    document.getElementById('tk-id').textContent       = ticketId;
    document.getElementById('tk-email').textContent    = email;
    document.getElementById('tk-role').textContent     = role;
    document.getElementById('tk-email-note').textContent = email;

    // Swap form → ticket
    document.getElementById('regForm').style.display  = 'none';
    document.getElementById('ticketCard').style.display = 'block';

    // Scroll to ticket
    document.getElementById('ticketCard').scrollIntoView({
      behavior: 'smooth', block: 'center'
    });
  }, 1400);
}

/* ────────────────────────────────────────────────
   TICKET — print / copy
──────────────────────────────────────────────── */
function printTicket() {
  window.print();
}

function copyTicketId() {
  const id = document.getElementById('tk-id').textContent;
  if (id && id !== '—') {
    navigator.clipboard.writeText(id).then(() => {
      // Small toast
      showToast('Ticket ID copied!');
    }).catch(() => {
      prompt('Copy your Ticket ID:', id);
    });
  }
}

/* ────────────────────────────────────────────────
   TOAST NOTIFICATION
──────────────────────────────────────────────── */
function showToast(message) {
  // Remove existing toast
  const existing = document.getElementById('pn-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'pn-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '28px',
    right: '24px',
    background: '#22c55e',
    color: '#050e07',
    fontWeight: '700',
    fontSize: '0.78rem',
    letterSpacing: '0.04em',
    padding: '10px 18px',
    borderRadius: '8px',
    zIndex: '9999',
    boxShadow: '0 4px 20px rgba(34,197,94,0.3)',
    animation: 'slideUp 0.3s ease both',
    fontFamily: 'inherit',
  });
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 320);
  }, 2500);
}

/* ────────────────────────────────────────────────
   SMOOTH SCROLL — custom easing for buttery feel
──────────────────────────────────────────────── */
function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let startTime = null;

  // ease-out-quint for natural deceleration
  function ease(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * ease(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 68; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      // Use our custom smooth scroll (700ms, ease-out-quint)
      smoothScrollTo(top, 700);
    }
  });
});

/* ────────────────────────────────────────────────
   ACTIVE NAV LINK — highlight on scroll
──────────────────────────────────────────────── */
const navLinkEls  = document.querySelectorAll('.nav-links a');
const sessLinkEls = document.querySelectorAll('.hero-sess-item');
const sections    = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.classList.add('active');
        }
      });
      sessLinkEls.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.25 });

sections.forEach(s => sectionObserver.observe(s));
