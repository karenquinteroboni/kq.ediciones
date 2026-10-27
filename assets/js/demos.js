/* Demos de recorrido: invitaciones de ejemplo con datos ficticios. */
(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var img = function (n) { return 'assets/img/' + n + '.webp'; };
  var bg = function (n) { return '../img/' + n + '.webp'; }; // las variables CSS resuelven la ruta desde la hoja de estilos

  var MAP = '<div class="d-map" role="img" aria-label="Mapa de ejemplo"><span>●</span><small>Mapa de ejemplo</small></div>';
  var CD = '<div class="d-clock"><div><b data-dcd="d">00</b><small>días</small></div><div><b data-dcd="h">00</b><small>horas</small></div><div><b data-dcd="m">00</b><small>min</small></div><div><b data-dcd="s">00</b><small>seg</small></div></div>';
  var WA = '<button class="d-btn" type="button" data-toast="En tu invitación, este botón abre WhatsApp con la confirmación ya escrita.">Confirmar por WhatsApp</button>';

  /* Cada <section data-step> es un paso del recorrido (label, caption y paquete). */
  var T = {
    premium: {
      theme: 't-sara', openLabel: 'Toca el sello para abrir',
      open: '<span class="d-eye">Mis</span><span class="d-roman">XV</span><span class="d-script">Mariana</span><span class="d-date">12 · 12 · 2026</span><button class="d-seal" type="button" aria-label="Abrir invitación">XV</button>',
      body:
        '<section class="ds photo hero" data-step="Portada" data-cap="La primera pantalla: tu nombre, la fecha y tu mejor foto con una capa de color para que el texto se lea." style="--img:url(' + bg('xv-04') + ')"><span class="d-eye">Mis</span><span class="d-roman big">XV</span><h4 class="d-script lg">Mariana<br>Ejemplo Gómez</h4><span class="d-date">12 · 12 · 2026</span></section>' +
        '<section class="ds" data-step="Bienvenida" data-cap="Un saludo con tus palabras, para que cada invitado sienta que es parte de la celebración."><span class="d-orn">✦</span><span class="d-eye">Bienvenida</span><h4 class="d-script">¡Bienvenidos a la magia de mis XV años!</h4><p>Con mucha ilusión quiero darte la bienvenida a una noche muy especial. Me hace feliz que seas parte de ella.</p></section>' +
        '<section class="ds alt" data-step="Mi historia" data-cap="Un espacio para contar tu historia con el tono que prefieras."><span class="d-eye">Mi historia</span><h4 class="d-script">Una historia escrita con amor</h4><p>Aquí va la historia de la quinceañera, en sus propias palabras. Puede incluir recuerdos, agradecimientos o un mensaje para los invitados.</p></section>' +
        '<section class="ds count" data-step="Cuenta regresiva" data-cap="Un reloj en vivo que cuenta los días, horas y minutos para el evento."><span class="d-eye">12 de diciembre · 7:00 p. m.</span><h4 class="d-script">La magia está por comenzar</h4>' + CD + '</section>' +
        '<section class="ds alt" data-step="El evento" data-cap="Fecha, hora y lugar, en un solo bloque fácil de leer."><span class="d-eye">El evento</span><h4 class="d-script">Una noche para recordar</h4><ul class="d-facts"><li><small>Fecha</small><b>Sábado 12 de diciembre</b></li><li><small>Hora</small><b>7:00 p. m.</b></li><li><small>Lugar</small><b>Salón Jardín del Roble</b></li></ul></section>' +
        '<section class="ds" data-step="Ubicación" data-cap="Mapa y botón «Cómo llegar» para que nadie se pierda."><span class="d-eye">Ubicación</span><h4 class="d-script">Salón Jardín del Roble</h4><p class="sm">Dirección del evento · Tu ciudad</p>' + MAP + '<button class="d-btn" type="button" data-toast="En tu invitación, este botón abre la ruta en Google Maps.">Cómo llegar</button></section>' +
        '<section class="ds alt" data-step="Dress code" data-cap="Indica el código de vestuario y los colores que prefieres reservar."><span class="d-eye">Dress code</span><h4 class="d-script">Código de vestuario</h4><div class="d-two"><div><i>✦</i><b>Invitados</b><small>Atuendo elegante</small></div><div><i>♛</i><b>Reservado</b><small>El color verde es para la quinceañera</small></div></div></section>' +
        '<section class="ds" data-step="Lluvia de sobres" data-cap="Un mensaje delicado para quienes quieran tener un detalle."><i class="d-ico">✉</i><span class="d-eye">Lluvia de sobres</span><h4 class="d-script">Tu presencia es mi mejor regalo</h4><p>Si deseas tener un detalle conmigo, agradeceré una lluvia de sobres.</p></section>' +
        '<section class="ds alt" data-step="Galería" data-cap="Tus fotos, para deslizar con el dedo."><span class="d-eye">Galería</span><h4 class="d-script">Momentos</h4><div class="d-gal"><img src="' + img('xv-02') + '" alt="" loading="lazy"><img src="' + img('xv-03') + '" alt="" loading="lazy"><img src="' + img('xv-06') + '" alt="" loading="lazy"><img src="' + img('xv-05') + '" alt="" loading="lazy"></div><small class="d-hint">Desliza →</small></section>' +
        '<section class="ds rsvp" data-step="Confirmar asistencia" data-cap="Solo en Premium: cada invitado busca su nombre, elige cuántos asisten y confirma. Prueba con «Ana» o «Rojas».">' +
          '<span class="d-eye">Reserva la fecha</span><h4 class="d-script">¿Nos acompañas?</h4><p class="sm">Busca tu nombre para confirmar tu asistencia.</p>' +
          '<div class="d-rsvp" data-rsvp><div data-r="search"><label>Escribe tu nombre<input type="search" data-q placeholder="Ej. Ana Pérez" autocomplete="off"></label><ul class="d-list" data-list></ul></div>' +
          '<div data-r="pick" hidden><p class="d-who" data-who></p><label>¿Cuántas personas asistirán?<select data-n></select></label><label>Plato fuerte<select data-dish><option>Pollo en salsa de champiñones</option><option>Lomo en reducción de vino</option><option>Opción vegetariana</option></select></label><button class="d-btn" type="button" data-go>Confirmar asistencia</button><button class="d-link" type="button" data-back>No soy yo · buscar otro nombre</button></div>' +
          '<div data-r="done" hidden><p class="d-who">¡Gracias! Tu asistencia quedó registrada.</p><p class="sm">Ejemplo: en una invitación real, la respuesta llega a tu lista de invitados.</p><button class="d-link" type="button" data-back>Probar de nuevo</button></div></div></section>' +
        '<section class="ds alt bye" data-step="Despedida" data-cap="Un cierre con tu mensaje y tu logo o monograma."><span class="d-orn">✦</span><h4 class="d-script">Gracias por ser parte de mi historia</h4><p>Con amor, Mariana</p></section>'
    },
    xv: {
      theme: 't-sofia', openLabel: '',
      open: '<span class="d-eye">Mis XV</span><span class="d-script lg">Camila Ejemplo</span><span class="d-date">20 · 11 · 2026</span><button class="d-btn d-openbtn" type="button">Abrir invitación</button>',
      body:
        '<section class="ds photo hero" data-step="Portada" data-cap="Foto a pantalla completa, nombre en caligrafía y fecha." style="--img:url(' + bg('demo-xv-negro') + ')"><span class="d-eye">Mis XV</span><h4 class="d-script lg">Camila<br>Ejemplo</h4><span class="d-date">20 · 11 · 2026</span></section>' +
        '<section class="ds light" data-step="Mi celebración" data-cap="Un texto de presentación breve, con el estilo de tu evento."><span class="d-orn">✦</span><span class="d-eye">Mi celebración</span><h4 class="d-title">Una noche para recordar</h4><p>Quiero compartir contigo una noche de música, baile y recuerdos que nunca olvidaré.</p></section>' +
        '<section class="ds photo" data-step="Cuenta regresiva" data-cap="La cuenta regresiva corre en vivo sobre una foto del evento." style="--img:url(' + bg('demo-mesa') + ')"><span class="d-eye">20 de noviembre · 7:00 p. m.</span><h4 class="d-title">La fiesta está por comenzar</h4>' + CD + '</section>' +
        '<section class="ds light" data-step="Mi historia" data-cap="Tu historia o un mensaje personal."><span class="d-eye">Mi historia</span><h4 class="d-title">Quince años de sueños</h4><p>Este texto es un ejemplo. Aquí cuentas quién eres, lo que has vivido y lo que quieres compartir con tus invitados.</p></section>' +
        '<section class="ds photo" data-step="El evento" data-cap="Fecha, hora y lugar sobre una foto de ambientación." style="--img:url(' + bg('demo-techo') + ')"><span class="d-eye">El evento</span><h4 class="d-title">La noche comienza</h4><ul class="d-facts"><li><small>Fecha</small><b>Viernes 20 de noviembre</b></li><li><small>Hora</small><b>7:00 p. m.</b></li><li><small>Lugar</small><b>Salón Las Acacias</b></li></ul></section>' +
        '<section class="ds light" data-step="Ubicación" data-cap="Mapa y botón para abrir la ruta."><span class="d-eye">Ubicación</span><h4 class="d-title">Donde nos encontramos</h4><p class="sm">Dirección del evento · Tu ciudad</p>' + MAP + '<button class="d-btn" type="button" data-toast="En tu invitación, este botón abre la ruta en Google Maps.">Cómo llegar</button></section>' +
        '<section class="ds photo" data-step="Dress code" data-cap="Código de vestuario con fondo fotográfico." style="--img:url(' + bg('demo-recuerdos') + ')"><span class="d-eye">Una indicación especial</span><h4 class="d-script lg">Dress code</h4><p><b>Elegante</b><br>El color negro es para la quinceañera.</p></section>' +
        '<section class="ds light" data-step="Lluvia de sobres" data-cap="Un mensaje amable para quienes quieran dar un detalle."><i class="d-ico">✉</i><span class="d-eye">Un detalle especial</span><h4 class="d-title">Lluvia de sobres</h4><p>Tu compañía es mi mejor regalo. Si deseas tener un detalle conmigo, lo recibiré con gratitud.</p></section>' +
        '<section class="ds photo" data-step="Confirmar" data-cap="El invitado confirma por WhatsApp con un mensaje ya escrito." style="--img:url(' + bg('demo-techo') + ')"><span class="d-eye">Reserva la fecha</span><h4 class="d-title">¿Nos acompañas?</h4><p>Confirma tu asistencia con un toque.</p>' + WA + '</section>' +
        '<section class="ds light bye" data-step="Despedida" data-cap="Cierre con agradecimiento."><span class="d-orn">✦</span><h4 class="d-title">Gracias por ser parte de esta noche</h4></section>'
    },
    boda: {
      theme: 't-boda', openLabel: '',
      open: '<img class="d-flora" src="' + img('demo-flora') + '" alt=""><span class="d-eye">Nos casamos</span><span class="d-script lg">Laura &amp; Andrés</span><span class="d-date">05 · 12 · 2026</span><button class="d-btn d-openbtn" type="button">Abrir invitación</button>',
      body:
        '<section class="ds photo hero" data-step="Portada" data-cap="Una foto de los novios a pantalla completa con sus nombres." style="--img:url(' + bg('demo-boda-abrazo') + ')"><span class="d-eye">Nos casamos</span><h4 class="d-script lg">Laura &amp;<br>Andrés</h4><span class="d-date">05 · 12 · 2026</span></section>' +
        '<section class="ds blush" data-step="Nuestra boda" data-cap="Un saludo cálido para quienes recibirán la invitación."><img class="d-flora" src="' + img('demo-flora') + '" alt=""><span class="d-eye">Con amor</span><h4 class="d-script">Nuestra boda</h4><p>Con la bendición de nuestras familias, queremos invitarte a compartir el día más importante de nuestras vidas.</p></section>' +
        '<section class="ds lav" data-step="Nuestra historia" data-cap="La historia de la pareja, con sus fotos."><span class="d-eye">Laura &amp; Andrés</span><h4 class="d-script">Nuestra historia</h4><p>Este texto es un ejemplo. Aquí la pareja cuenta cómo se conoció, cómo creció su amor y por qué quiere celebrarlo contigo.</p></section>' +
        '<section class="ds photo" data-step="El evento" data-cap="Fecha, hora y lugar, con una foto de fondo." style="--img:url(' + bg('demo-boda-romantico') + ')"><span class="d-eye">Laura &amp; Andrés</span><h4 class="d-script">El evento</h4><ul class="d-facts"><li><small>Fecha</small><b>Sábado 5 de diciembre</b></li><li><small>Ceremonia</small><b>4:00 p. m.</b></li><li><small>Recepción</small><b>6:00 p. m.</b></li></ul></section>' +
        '<section class="ds count blush" data-step="Cuenta regresiva" data-cap="El reloj en vivo hasta el día de la boda."><span class="d-eye">5 de diciembre · 4:00 p. m.</span><h4 class="d-script">Faltan</h4>' + CD + '</section>' +
        '<section class="ds blush" data-step="Ubicación" data-cap="Ceremonia y recepción con su mapa."><span class="d-eye">Ubicación</span><h4 class="d-script">Donde nos encontramos</h4><p class="sm">Parroquia y salón de ejemplo · Tu ciudad</p>' + MAP + '<button class="d-btn" type="button" data-toast="En tu invitación, este botón abre la ruta en Google Maps.">Cómo llegar</button></section>' +
        '<section class="ds photo" data-step="Dress code" data-cap="Indicaciones de vestuario sobre una foto de la ceremonia." style="--img:url(' + bg('demo-boda-iglesia') + ')"><span class="d-eye">Una indicación especial</span><h4 class="d-script lg">Dress code</h4><p><b>Formal</b><br>Pedimos evitar el blanco y el marfil.</p></section>' +
        '<section class="ds lav" data-step="Galería" data-cap="La galería de la pareja, para deslizar."><span class="d-eye">Nuestros momentos</span><h4 class="d-script">Galería</h4><div class="d-gal"><img src="' + img('demo-boda-atardecer') + '" alt="" loading="lazy"><img src="' + img('demo-boda-velo') + '" alt="" loading="lazy"><img src="' + img('demo-boda-romantico') + '" alt="" loading="lazy"></div><small class="d-hint">Desliza →</small></section>' +
        '<section class="ds blush" data-step="Lluvia de sobres" data-cap="Un mensaje delicado para quienes deseen dar un detalle."><i class="d-ico">✉</i><span class="d-eye">Un detalle especial</span><h4 class="d-script">Lluvia de sobres</h4><p>Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros, lo recibiremos con gratitud.</p></section>' +
        '<section class="ds photo" data-step="Confirmar" data-cap="Confirmación por WhatsApp con un mensaje ya escrito." style="--img:url(' + bg('demo-boda-abrazo') + ')"><span class="d-eye">Reserva la fecha</span><h4 class="d-script">¿Nos acompañas?</h4>' + WA + '</section>'
    }
  };

  var GUESTS = [
    { name: 'Ana Pérez', max: 2 },
    { name: 'Familia Rojas', max: 4 },
    { name: 'Carlos Medina', max: 1 }
  ];
  var norm = function (s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); };

  function build(panel) {
    var key = panel.dataset.demo, cfg = T[key];
    panel.innerHTML =
      '<div class="demo__side">' +
        '<p class="demo__badge" data-badge></p>' +
        '<h3 data-title class="demo__title"></h3>' +
        '<p class="demo__cap" data-cap aria-live="polite"></p>' +
        '<div class="demo__ctrl"><button class="btn btn--clay btn--sm" type="button" data-play>▶ Reproducir recorrido</button><button class="btn btn--forest btn--sm" type="button" data-restart>Reiniciar</button></div>' +
        '<ol class="demo__steps" data-steps></ol>' +
      '</div>' +
      '<div class="demo__stage"><div class="dphone ' + cfg.theme + '">' +
        '<span class="dphone__tag">Demostración · datos de ejemplo</span>' +
        '<button class="dmenu-btn" type="button" aria-label="Abrir menú" aria-expanded="false"><i></i><i></i><i></i></button>' +
        '<nav class="dmenu" data-menu aria-hidden="true"></nav>' +
        '<div class="dscroll" data-scroll>' + cfg.body + '</div>' +
        '<div class="dopen" data-open>' + cfg.open + '<small class="d-hint">' + cfg.openLabel + '</small></div>' +
        '<div class="dtoast" data-toast-box role="status"></div>' +
      '</div></div>';
    return cfg;
  }

  function init(panel) {
    var cfg = build(panel);
    $('[data-badge]', panel).textContent = panel.dataset.badge;
    $('[data-title]', panel).textContent = panel.dataset.title;
    var scroll = $('[data-scroll]', panel), open = $('[data-open]', panel), box = $('[data-toast-box]', panel);
    var secs = $$('section[data-step]', scroll), list = $('[data-steps]', panel), menu = $('[data-menu]', panel), mbtn = $('.dmenu-btn', panel);
    var capEl = $('[data-cap]', panel), playBtn = $('[data-play]', panel);
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null, cur = -1, opened = false;

    // Pasos: "Apertura" + secciones
    var labels = ['Apertura'].concat(secs.map(function (s) { return s.dataset.step; }));
    var caps = ['El invitado ve primero una pantalla de apertura y la abre con un toque.'].concat(secs.map(function (s) { return s.dataset.cap; }));
    list.innerHTML = labels.map(function (l, i) { return '<li><button type="button" data-i="' + i + '"><span>' + (i + 1) + '</span>' + l + '</button></li>'; }).join('');
    menu.innerHTML = '<p class="d-eye">Menú</p>' + secs.map(function (s, i) { return '<a href="#" data-m="' + (i + 1) + '">' + s.dataset.step + '</a>'; }).join('');

    function setCur(i) {
      if (i === cur) return; cur = i;
      $$('button', list).forEach(function (b, k) { b.classList.toggle('on', k === i); if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
      capEl.textContent = caps[i];
    }
    function showOpening() { opened = false; open.classList.remove('gone'); scroll.scrollTop = 0; setCur(0); }
    function openIt() { opened = true; open.classList.add('gone'); }
    function go(i, smooth) {
      if (i === 0) { showOpening(); return; }
      if (!opened) openIt();
      var el = secs[i - 1];
      scroll.scrollTo({ top: el.offsetTop, behavior: smooth && !reduce ? 'smooth' : 'auto' });
      setCur(i);
    }
    function stop() { clearInterval(timer); timer = null; playBtn.textContent = '▶ Reproducir recorrido'; }
    function play() {
      stop(); playBtn.textContent = '❚❚ Pausar';
      var i = 0; showOpening();
      var tick = function () {
        i++;
        if (i > labels.length - 1) { stop(); return; }
        go(i, true);
      };
      setTimeout(function () { if (!timer) return; var b = $('.d-seal, .d-openbtn', open); if (b) b.classList.add('press'); }, 1200);
      timer = setInterval(tick, 3400);
    }

    list.addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; stop(); go(+b.dataset.i, true); });
    menu.addEventListener('click', function (e) { var a = e.target.closest('a'); if (!a) return; e.preventDefault(); stop(); closeMenu(); go(+a.dataset.m, true); });
    function closeMenu() { menu.classList.remove('on'); mbtn.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-hidden', 'true'); }
    mbtn.addEventListener('click', function () { var o = menu.classList.toggle('on'); mbtn.setAttribute('aria-expanded', o); menu.setAttribute('aria-hidden', !o); });
    $('[data-restart]', panel).addEventListener('click', function () { stop(); closeMenu(); showOpening(); });
    playBtn.addEventListener('click', function () { if (timer) stop(); else play(); });
    open.addEventListener('click', function (e) { if (e.target.closest('button')) { stop(); openIt(); go(1, true); } });

    // Sección activa al desplazar
    var raf = 0;
    scroll.addEventListener('scroll', function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        if (!opened) return;
        var y = scroll.scrollTop + scroll.clientHeight * .4, k = 0;
        secs.forEach(function (s, n) { if (s.offsetTop <= y) k = n; });
        setCur(k + 1);
      });
    }, { passive: true });

    // Avisos de botones de ejemplo
    var tt;
    panel.addEventListener('click', function (e) {
      var b = e.target.closest('[data-toast]'); if (!b) return;
      box.textContent = b.dataset.toast; box.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { box.classList.remove('on'); }, 3200);
    });

    // RSVP (solo Premium)
    var r = $('[data-rsvp]', panel);
    if (r) {
      var q = $('[data-q]', r), ul = $('[data-list]', r), views = { search: $('[data-r=search]', r), pick: $('[data-r=pick]', r), done: $('[data-r=done]', r) };
      var show = function (k) { Object.keys(views).forEach(function (x) { views[x].hidden = x !== k; }); };
      var chosen = null;
      q.addEventListener('input', function () {
        var v = norm(q.value.trim());
        var m = v.length < 2 ? [] : GUESTS.filter(function (g) { return norm(g.name).indexOf(v) > -1; });
        ul.innerHTML = m.map(function (g, i) { return '<li><button type="button" data-g="' + GUESTS.indexOf(g) + '">' + g.name + '</button></li>'; }).join('') || (v.length > 1 ? '<li class="none">No encontramos ese nombre (prueba con «Ana» o «Rojas»).</li>' : '');
      });
      ul.addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        chosen = GUESTS[+b.dataset.g];
        $('[data-who]', r).textContent = chosen.name + ' · hasta ' + chosen.max + (chosen.max > 1 ? ' cupos' : ' cupo');
        var n = $('[data-n]', r); n.innerHTML = ''; for (var i = 1; i <= chosen.max; i++) n.innerHTML += '<option>' + i + '</option>';
        show('pick');
      });
      r.addEventListener('click', function (e) {
        if (e.target.closest('[data-go]')) show('done');
        if (e.target.closest('[data-back]')) { q.value = ''; ul.innerHTML = ''; show('search'); }
      });
    }
    showOpening();
  }

  // Pestañas de demos
  $$('.tour').forEach(init);
  var tabs = $$('[data-dtab]');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t); });
      $$('.tour').forEach(function (d) {
        var on = d.dataset.demo === t.dataset.dtab; d.hidden = !on;
        if (!on) { var p = $('[data-play]', d); if (p && /Pausar/.test(p.textContent)) p.click(); }
      });
    });
  });

  // Cuenta regresiva de las demos
  var target = Date.now() + 45 * 864e5 + 5 * 36e5;
  var pad = function (n) { return String(n).padStart(2, '0'); };
  function tick() {
    var t = Math.max(0, target - Date.now());
    var v = { d: Math.floor(t / 864e5), h: Math.floor(t / 36e5) % 24, m: Math.floor(t / 6e4) % 60, s: Math.floor(t / 1e3) % 60 };
    $$('[data-dcd]').forEach(function (el) { el.textContent = pad(v[el.dataset.dcd]); });
  }
  tick(); setInterval(tick, 1000);
})();
