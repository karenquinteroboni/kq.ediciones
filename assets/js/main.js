(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Menú móvil
  var toggle = $('.nav__toggle'), menu = $('#menu');
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  $$('#menu a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Pestañas de la galería
  $$('.tabs button').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.tabs button').forEach(function (x) { x.setAttribute('aria-selected', x === b); });
      ['xv', 'boda'].forEach(function (k) { $('#gal-' + k).hidden = k !== b.dataset.tab; });
    });
  });

  // Cuenta regresiva de la demostración (siempre 60 días hacia adelante)
  var target = Date.now() + 60 * 864e5 + 3 * 36e5;
  var pad = function (n) { return String(n).padStart(2, '0'); };
  function tick() {
    var t = Math.max(0, target - Date.now());
    var v = { d: Math.floor(t / 864e5), h: Math.floor(t / 36e5) % 24, m: Math.floor(t / 6e4) % 60, s: Math.floor(t / 1e3) % 60 };
    Object.keys(v).forEach(function (k) { var el = $('[data-cd=' + k + ']'); if (el) el.textContent = pad(v[k]); });
  }
  tick(); setInterval(tick, 1000);

  // Botones de paquete preseleccionan el formulario
  $$('[data-plan]').forEach(function (a) {
    a.addEventListener('click', function () {
      var sel = $('select[name=paquete]');
      Array.prototype.forEach.call(sel.options, function (o) { if (o.text.indexOf(a.dataset.plan) === 0) sel.value = o.value || o.text; });
    });
  });

  // Formulario → mensaje de WhatsApp
  $('#form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, d = function (n) { return f.elements[n].value.trim(); };
    var fecha = d('fecha');
    if (fecha) { var p = fecha.split('-'); fecha = p[2] + '/' + p[1] + '/' + p[0]; }
    var lines = ['Hola Karen, quiero cotizar una invitación digital.'];
    if (d('nombre')) lines.push('Nombre: ' + d('nombre'));
    lines.push('Celebración: ' + d('evento'));
    if (fecha) lines.push('Fecha: ' + fecha);
    if (d('ciudad')) lines.push('Ciudad: ' + d('ciudad'));
    lines.push('Paquete: ' + (d('paquete') || 'aún no lo sé'));
    if (d('idea')) lines.push('Idea: ' + d('idea'));
    window.open('https://wa.me/573041027425?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
  });

  // Aparición suave al hacer scroll
  var items = $$('.sec__head, .plan, .steps li, .feat__list li, .g, .faq details');
  if ('IntersectionObserver' in window) {
    items.forEach(function (el) { el.classList.add('rv'); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: .12 });
    items.forEach(function (el) { io.observe(el); });
  }

  $('#yr').textContent = new Date().getFullYear();
})();
