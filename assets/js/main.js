/**
 * Igreja Batista Nova Esperança (IBNE) - Campo Grande/MS
 * Main Client Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNextServiceCountdown();
  initPixCopy();
  initHeaderScroll();
});

/* Mobile Menu Toggle */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    
    // Toggle hamburger / close icon
    const icon = toggleBtn.querySelector('svg');
    if (isOpen) {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
    } else {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
    }
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const icon = toggleBtn.querySelector('svg');
      if (icon) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
      }
    });
  });
}

/* Header Scroll Shadow */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

/* Dynamic Next Service Countdown */
function initNextServiceCountdown() {
  const countdownEl = document.getElementById('serviceCountdown');
  const serviceNameEl = document.getElementById('nextServiceName');
  const serviceTimeEl = document.getElementById('nextServiceTime');

  if (!countdownEl) return;

  function isLastSundayOfMonth(date) {
    const nextWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    return nextWeek.getMonth() !== date.getMonth();
  }

  function getNextService() {
    const now = new Date();
    const candidates = [];

    // Look ahead across the next 8 days to find upcoming services
    for (let offset = 0; offset <= 8; offset++) {
      const candidateDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
      const dayOfWeek = candidateDay.getDay();

      if (dayOfWeek === 0) { // Sunday
        // 1. Escola de Vida (Online) - every Sunday at 09:00
        candidates.push({
          day: 0,
          hour: 9,
          min: 0,
          title: 'Escola de Vida (Online)',
          isLastSundayWorship: false,
          targetDate: new Date(candidateDay.getFullYear(), candidateDay.getMonth(), candidateDay.getDate(), 9, 0, 0)
        });

        // 2. Culto de Celebração da Família - Sundays at 18:00 (or 10:00 on the last Sunday of the month)
        const isLastSun = isLastSundayOfMonth(candidateDay);
        const worshipHour = isLastSun ? 10 : 18;
        candidates.push({
          day: 0,
          hour: worshipHour,
          min: 0,
          title: isLastSun ? 'Culto de Celebração da Família (Horário Especial)' : 'Culto de Celebração da Família',
          isLastSundayWorship: isLastSun,
          targetDate: new Date(candidateDay.getFullYear(), candidateDay.getMonth(), candidateDay.getDate(), worshipHour, 0, 0)
        });
      } else if (dayOfWeek === 2) { // Tuesday
        candidates.push({
          day: 2,
          hour: 19,
          min: 30,
          title: 'Reunião de Oração & Intercessão',
          isLastSundayWorship: false,
          targetDate: new Date(candidateDay.getFullYear(), candidateDay.getMonth(), candidateDay.getDate(), 19, 30, 0)
        });
      } else if (dayOfWeek === 4) { // Thursday
        candidates.push({
          day: 4,
          hour: 19,
          min: 30,
          title: 'Estudo Bíblico & Pequenos Grupos',
          isLastSundayWorship: false,
          targetDate: new Date(candidateDay.getFullYear(), candidateDay.getMonth(), candidateDay.getDate(), 19, 30, 0)
        });
      } else if (dayOfWeek === 6) { // Saturday
        candidates.push({
          day: 6,
          hour: 19,
          min: 30,
          title: 'Culto da Juventude (JNE)',
          isLastSundayWorship: false,
          targetDate: new Date(candidateDay.getFullYear(), candidateDay.getMonth(), candidateDay.getDate(), 19, 30, 0)
        });
      }
    }

    let upcoming = null;
    let minDiff = Infinity;

    candidates.forEach(item => {
      const diff = item.targetDate.getTime() - now.getTime();
      // Service happening within the next 8 days and not already ended (allow 90 min grace period if in progress)
      if (diff > -5400000 && diff < minDiff) {
        minDiff = diff;
        upcoming = item;
      }
    });

    return upcoming;
  }

  function update() {
    const next = getNextService();
    if (!next) return;

    if (serviceNameEl) serviceNameEl.textContent = next.title;
    if (serviceTimeEl) {
      const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
      const formattedTime = `${String(next.hour).padStart(2, '0')}:${String(next.min).padStart(2, '0')}`;
      let timeText = `${days[next.day]} às ${formattedTime}`;
      if (next.isLastSundayWorship) {
        timeText += ' (Último domingo)';
      }
      serviceTimeEl.textContent = timeText;
    }

    const now = new Date().getTime();
    const distance = next.targetDate.getTime() - now;

    if (distance < 0) {
      countdownEl.innerHTML = '<span class="countdown-live">Acontecendo Agora! Venha participar!</span>';
      return;
    }

    let daysEl = document.getElementById('countDays');
    let hoursEl = document.getElementById('countHours');
    let minsEl = document.getElementById('countMins');
    let secsEl = document.getElementById('countSecs');

    if (!daysEl) {
      countdownEl.innerHTML = `
        <div class="countdown-segment">
          <span class="countdown-value" id="countDays">00</span>
          <span class="countdown-label">Dias</span>
        </div>
        <span class="countdown-divider">:</span>
        <div class="countdown-segment">
          <span class="countdown-value" id="countHours">00</span>
          <span class="countdown-label">Horas</span>
        </div>
        <span class="countdown-divider">:</span>
        <div class="countdown-segment">
          <span class="countdown-value" id="countMins">00</span>
          <span class="countdown-label">Min</span>
        </div>
        <span class="countdown-divider">:</span>
        <div class="countdown-segment">
          <span class="countdown-value" id="countSecs">00</span>
          <span class="countdown-label">Seg</span>
        </div>
      `;
      daysEl = document.getElementById('countDays');
      hoursEl = document.getElementById('countHours');
      minsEl = document.getElementById('countMins');
      secsEl = document.getElementById('countSecs');
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* 1-Click PIX Copy */
function initPixCopy() {
  const copyButtons = document.querySelectorAll('.btn-copy-pix');
  if (!copyButtons.length) return;

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pixKey = btn.getAttribute('data-pix') || '07738221000100';
      
      navigator.clipboard.writeText(pixKey).then(() => {
        showToast('Chave PIX copiada com sucesso!');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>✓ Copiado!</span>';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2500);
      }).catch(() => {
        showToast('Não foi possível copiar automaticamente. Selecione e copie manualmente.');
      });
    });
  });
}

/* Toast Message */
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span class="toast-text">${message}</span>
    `;
    document.body.appendChild(toast);
  } else {
    toast.querySelector('.toast-text').textContent = message;
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
