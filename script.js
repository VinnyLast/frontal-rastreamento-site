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

  // Vídeo institucional: carrega e toca só quando visível; pausa ao sair
  var video = document.getElementById('heroVideo');
  var playBtn = document.getElementById('videoPlay');
  if (video) {
    var loaded = false;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var loadSources = function () {
      if (loaded) return;
      loaded = true;
      video.querySelectorAll('source[data-src]').forEach(function (s) {
        s.src = s.getAttribute('data-src');
      });
      video.load();
    };
    var play = function () {
      loadSources();
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    };

    if (reduceMotion) {
      if (playBtn) {
        playBtn.hidden = false;
        playBtn.addEventListener('click', function () {
          playBtn.hidden = true;
          play();
        });
      }
    } else if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { play(); } else { video.pause(); }
        });
      }, { threshold: 0.25 }).observe(video);
    } else {
      play();
    }
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
