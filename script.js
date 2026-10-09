document.addEventListener('DOMContentLoaded', function () {

  // Ano no rodapé
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu mobile
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    nav.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Animação de entrada ao rolar (fade-in/slide-up)
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Animações SVG: com movimento reduzido, congela num quadro com tudo visível
  [['liveMapSvg', 5.2], ['coverageSvg', 4.2]].forEach(function (item) {
    var svg = document.getElementById(item[0]);
    if (svg && window.matchMedia('(prefers-reduced-motion: reduce)').matches && svg.pauseAnimations) {
      svg.setCurrentTime(item[1]);
      svg.pauseAnimations();
    }
  });

  // Brilho leve que acompanha o mouse (só em dispositivos com mouse)
  var glow = document.getElementById("cursorGlow");
  if (glow && window.matchMedia("(hover: hover)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var gx = 0, gy = 0, ticking = false;
    document.addEventListener("mousemove", function (e) {
      gx = e.clientX; gy = e.clientY;
      glow.classList.add("is-active");
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          glow.style.setProperty("--mx", gx + "px");
          glow.style.setProperty("--my", gy + "px");
          ticking = false;
        });
      }
    });
    document.documentElement.addEventListener("mouseleave", function () { glow.classList.remove("is-active"); });
  }

  // Formulário de contato -> redireciona para WhatsApp com a mensagem preenchida
  var form = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var phone = document.getElementById('phone').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !phone || !message) {
        formNote.style.color = '#c0392b';
        formNote.textContent = 'Por favor, preencha todos os campos.';
        return;
      }

      var text = 'Olá! Meu nome é ' + name + ' (telefone: ' + phone + '). ' + message;
      var url = 'https://wa.me/5575999928958?text=' + encodeURIComponent(text);
      formNote.style.color = '#2a7d2a';
      formNote.textContent = 'Redirecionando para o WhatsApp...';
      window.open(url, '_blank', 'noopener');
      form.reset();
    });
  }

});
