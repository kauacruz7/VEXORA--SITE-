/* VEXORA — comportamento da página: download configurável, cabeçalho, animações de entrada. */
(function () {
  'use strict';

  var cfg = Object.assign({ downloadUrl: '', version: '', fileSize: '', fileName: '' }, window.VEXORA_CONFIG || {});
  var url = String(cfg.downloadUrl || '').trim();
  /* só aceita endereço real: http(s) ou caminho relativo; textos de exemplo (ex.: URL_DO_ARQUIVO_ZIP) são ignorados */
  var configured = /^(https?:\/\/\S+|\.{0,2}\/\S+)$/i.test(url);

  /* ---------- versão e tamanho ---------- */
  document.querySelectorAll('[data-version]').forEach(function (el) { if (cfg.version) el.textContent = cfg.version; });
  if (cfg.fileSize) {
    document.querySelectorAll('[data-size]').forEach(function (el) { el.textContent = cfg.fileSize; });
    document.querySelectorAll('[data-size-row]').forEach(function (el) { el.hidden = false; });
  }

  /* ---------- download ---------- */
  var status = document.getElementById('download-status');
  var toastTimer;

  function notify(message) {
    var old = document.querySelector('.toast');
    if (old) old.remove();
    var el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.textContent = message;
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('is-visible'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-visible'); setTimeout(function () { el.remove(); }, 300); }, 4500);
  }

  var buttons = document.querySelectorAll('[data-download]');
  if (configured) {
    buttons.forEach(function (a) {
      a.setAttribute('href', url);
      a.setAttribute('download', cfg.fileName || '');
      a.setAttribute('rel', 'noopener');
    });
  } else {
    if (status) status.textContent = 'O download estará disponível em breve.';
    buttons.forEach(function (a) {
      a.addEventListener('click', function (event) {
        event.preventDefault();
        notify('O download do VEXORA estará disponível em breve.');
      });
    });
  }

  /* ---------- cabeçalho ---------- */
  var header = document.querySelector('.site-header');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- seção atual no menu ---------- */
  var links = {};
  document.querySelectorAll('[data-nav]').forEach(function (a) { links[a.getAttribute('data-nav')] = a; });
  if ('IntersectionObserver' in window) {
    var current = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].removeAttribute('aria-current'); });
        var link = links[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['inicio', 'recursos', 'download'].forEach(function (id) {
      var s = document.getElementById(id);
      if (s) current.observe(s);
    });

    /* ---------- entrada suave dos blocos ---------- */
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var items = document.querySelectorAll('.reveal');
    if (reduce) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var reveal = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      items.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 60 + 'ms'; reveal.observe(el); });
    }
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
