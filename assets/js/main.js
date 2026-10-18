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

  // Church Service Schedule (Day: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat)
  const schedule = [
    { day: 0, hour: 9, min: 0, title: 'Escola Bíblica Dominical (EBD)' },
    { day: 0, hour: 19, min: 0, title: 'Culto de Celebração da Família' },
    { day: 2, hour: 19, min: 30, title: 'Reunião de Oração & Intercessão' },
    { day: 4, hour: 19, min: 30, title: 'Estudo Bíblico & Pequenos Grupos' },
    { day: 6, hour: 19, min: 30, title: 'Culto da Juventude (JNE)' }
  ];

  function getNextService() {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();

    let upcoming = null;
    let minDiff = Infinity;

    schedule.forEach(item => {
      let dayDiff = item.day - currentDay;
      if (dayDiff < 0 || (dayDiff === 0 && (item.hour < currentHour || (item.hour === currentHour && item.min <= currentMin)))) {
        dayDiff += 7;
      }

      const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + dayDiff, item.hour, item.min, 0);
      const diff = target.getTime() - now.getTime();

      if (diff < minDiff) {
        minDiff = diff;
        upcoming = { ...item, targetDate: target };
      }
    });

    return upcoming;
  }

  function update() {
    const next = getNextService();
    if (!next) return;

    if (serviceNameEl) serviceNameEl.textContent = next.title;
    if (serviceTimeEl) {
      const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const formattedTime = `${String(next.hour).padStart(2, '0')}:${String(next.min).padStart(2, '0')}`;
      serviceTimeEl.textContent = `${days[next.day]} às ${formattedTime}`;
    }

    const now = new Date().getTime();
    const distance = next.targetDate.getTime() - now;

    if (distance < 0) {
      countdownEl.innerHTML = '<span style="color: #10b981; font-weight: 700;">Acontecendo Agora! Venha participar!</span>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('countDays');
    const hoursEl = document.getElementById('countHours');
    const minsEl = document.getElementById('countMins');
    const secsEl = document.getElementById('countSecs');

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
      const pixKey = btn.getAttribute('data-pix') || 'contato@ibnecg.com.br';
      
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
