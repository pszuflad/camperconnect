/* CamperConnect — makieta MVP. Wspólne skrypty (właściciel: agent 0 / 6). Opis API: docs/KONTRAKT.md
 * Ładuj w <head> BEZ defer:  <script src="../assets/app.js"></script>
 * Elementy z atrybutami data-cc-* inicjują się same po DOMContentLoaded.
 * Własny kod strony uruchamiaj w CC.gotowe(function () { ... }).
 */
(function () {
  'use strict';

  var skrypt = document.currentScript;
  var CC = window.CC = {};

  /* ---------- ścieżki ---------- */
  // Prefiks względny do katalogu głównego makiety, liczony z położenia strony względem assets/app.js.
  CC.root = (function () {
    try {
      var rootPath = new URL('../', skrypt.src).pathname;
      var dir = location.pathname.replace(/[^/]*$/, '');
      if (dir.indexOf(rootPath) !== 0) return new URL('../', skrypt.src).href;
      var glebokosc = dir.slice(rootPath.length).split('/').filter(Boolean).length;
      return glebokosc ? new Array(glebokosc + 1).join('../') : './';
    } catch (e) { return './'; }
  })();
  CC.sciezka = function (p) { return CC.root + String(p).replace(/^\//, ''); };

  CC.STATUSY = {
    'wstepna': 'Wstępna',
    'potwierdzona': 'Potwierdzona',
    'umowa-wyslana': 'Umowa wysłana',
    'umowa-podpisana': 'Umowa podpisana',
    'wydana': 'Wydana',
    'zwrocona': 'Zwrócona',
    'rozliczona': 'Rozliczona',
    'wygasla': 'Wygasła'
  };
  CC.KROKI_NAJMU = ['Prośba', 'Potwierdzenie i zadatek', 'Umowa', 'Wydanie', 'Zwrot', 'Rozliczenie kaucji'];

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html != null) e.innerHTML = html;
    return e;
  }
  function zdarzenie(cel, nazwa, detail) {
    cel.dispatchEvent(new CustomEvent(nazwa, { bubbles: true, detail: detail }));
  }
  function pobierz(cel, atr) { return typeof cel === 'string' ? (document.getElementById(cel) || $('[' + atr + '="' + cel + '"]')) : cel; }
  CC.$ = $; CC.$$ = $$;

  var kolejka = [], gotowy = false;
  CC.gotowe = function (fn) { if (gotowy) fn(); else kolejka.push(fn); };

  /* ---------- nagłówek makiety ---------- */
  // <header data-cc-naglowek="klient|panel|mobile" data-cc-menu="kalendarz|rezerwacje"></header>
  function naglowek(h) {
    var obszar = h.getAttribute('data-cc-naglowek') || 'klient';
    var menu = h.getAttribute('data-cc-menu') || '';
    var r = CC.root;
    var panel = obszar !== 'klient';
    var html =
      '<div class="cc-makieta"><div class="cc-makieta-wnetrze">' +
        '<div><span class="cc-makieta-etykieta">Makieta</span><a href="' + r + 'index.html">← Mapa makiety</a></div>' +
        '<nav class="cc-przelacznik" aria-label="Przełącznik widoku">' +
          '<a href="' + r + 'klient/strona.html"' + (panel ? '' : ' class="aktywny"') + '>Strona wypożyczalni</a>' +
          '<a href="' + r + 'panel/kalendarz.html"' + (panel ? ' class="aktywny"' : '') + '>Panel</a>' +
        '</nav>' +
      '</div></div>' +
      '<div class="cc-aplikacja"><div class="cc-aplikacja-wnetrze">';
    if (panel) {
      html +=
        '<a class="cc-marka" href="' + r + 'panel/kalendarz.html"><span class="cc-marka-znak">CC</span>CamperConnect <small>· Kamper na Mazury</small></a>' +
        '<nav class="cc-menu" aria-label="Menu panelu">' +
          '<a href="' + r + 'panel/kalendarz.html"' + (menu === 'kalendarz' ? ' class="aktywny"' : '') + '>Kalendarz</a>' +
          '<a href="' + r + 'panel/rezerwacje.html"' + (menu === 'rezerwacje' ? ' class="aktywny"' : '') + '>Rezerwacje</a>' +
        '</nav>' +
        '<span class="cc-uzytkownik">Marek Wiśniewski</span>';
    } else {
      html +=
        '<a class="cc-marka" href="' + r + 'klient/strona.html"><span class="cc-marka-znak">KM</span>Kamper na Mazury <small>· Giżycko</small></a>' +
        '<span class="cc-uzytkownik">tel. 600 000 000</span>';
    }
    html += '</div></div>';
    h.innerHTML = html;
  }

  /* ---------- modal ---------- */
  // <div class="modal" id="zadatek"><div class="modal-okno">… <button data-cc-zamknij>…</button></div></div>
  // otwieranie: <button data-cc-modal="zadatek"> albo CC.modal('zadatek'); zamykanie: CC.zamknij()
  CC.modal = function (id) {
    var m = pobierz(id, 'id');
    if (!m) return console.warn('CC.modal: brak #' + id);
    if (!$('.modal-zamknij', m)) {
      var okno = $('.modal-okno', m) || m;
      var x = el('button', { type: 'button', 'class': 'modal-zamknij', 'aria-label': 'Zamknij', 'data-cc-zamknij': '' }, '×');
      okno.insertBefore(x, okno.firstChild);
    }
    m.hidden = false;
    m.classList.add('otwarty');
    document.body.classList.add('modal-otwarty');
    var pole = $('input, select, textarea, button:not(.modal-zamknij)', m);
    if (pole) setTimeout(function () { pole.focus(); }, 30);
    zdarzenie(m, 'cc:modal', { otwarty: true });
  };
  CC.zamknij = function (id) {
    var lista = id ? [pobierz(id, 'id')] : $$('.modal.otwarty');
    lista.forEach(function (m) { if (m) { m.classList.remove('otwarty'); zdarzenie(m, 'cc:modal', { otwarty: false }); } });
    if (!$('.modal.otwarty')) document.body.classList.remove('modal-otwarty');
  };

  /* ---------- toast ---------- */
  CC.toast = function (tekst, ms) {
    var box = $('.cc-toasty');
    if (!box) { box = el('div', { 'class': 'cc-toasty', role: 'status', 'aria-live': 'polite' }); document.body.appendChild(box); }
    var t = el('div', { 'class': 'cc-toast' });
    t.textContent = tekst;
    box.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('widoczny'); });
    setTimeout(function () { t.classList.remove('widoczny'); setTimeout(function () { t.remove(); }, 250); }, ms || 2600);
  };

  /* ---------- localStorage ---------- */
  CC.zapisz = function (klucz, wartosc) {
    try { localStorage.setItem(klucz, JSON.stringify(wartosc)); return true; }
    catch (e) { console.warn('CC.zapisz: nie udało się zapisać „' + klucz + '”', e); return false; }
  };
  CC.odczytaj = function (klucz, domyslna) {
    try { var v = localStorage.getItem(klucz); return v == null ? (domyslna === undefined ? null : domyslna) : JSON.parse(v); }
    catch (e) { return domyslna === undefined ? null : domyslna; }
  };
  CC.usun = function (klucz) { try { localStorage.removeItem(klucz); } catch (e) { /* brak */ } };

  // Pomniejsza obraz (File, Blob, dataURL albo adres) do maks. `maks` px dłuższego boku. Zwraca Promise<dataURL JPEG>.
  // Pliki SVG i adresy, których nie da się narysować, zwraca bez zmian.
  CC.pomniejsz = function (zrodlo, maks) {
    maks = maks || 480;
    return new Promise(function (ok) {
      function zUrl(url) {
        if (/\.svg(\?|$)/i.test(url) || /^data:image\/svg/i.test(url)) return ok(url);
        var img = new Image();
        img.onload = function () {
          try {
            var s = Math.min(1, maks / Math.max(img.naturalWidth, img.naturalHeight));
            var c = document.createElement('canvas');
            c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
            c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
            ok(c.toDataURL('image/jpeg', 0.75));
          } catch (e) { ok(url); }
        };
        img.onerror = function () { ok(url); };
        img.src = url;
      }
      if (zrodlo instanceof Blob) {
        var r = new FileReader();
        r.onload = function () { zUrl(r.result); };
        r.onerror = function () { ok(null); };
        r.readAsDataURL(zrodlo);
      } else zUrl(String(zrodlo));
    });
  };

  /* ---------- stan ?stan= ---------- */
  // <body data-stan-domyslny="wstepna">; <div data-stan="wstepna wygasla">…</div> — widoczne tylko w tych stanach.
  CC.stan = function () {
    var s = new URLSearchParams(location.search).get('stan') || document.body.getAttribute('data-stan-domyslny') || '';
    document.body.setAttribute('data-stan-aktywny', s);
    $$('[data-stan]').forEach(function (e) {
      var lista = e.getAttribute('data-stan').split(/[\s,]+/).filter(Boolean);
      e.hidden = lista.indexOf(s) === -1;
    });
    return s;
  };

  /* ---------- znaczek statusu i pasek kroków ---------- */
  // <span data-cc-znaczek="wydana"></span>  →  <span class="znaczek znaczek-wydana">Wydana</span>
  CC.znaczek = function (status) { return '<span class="znaczek znaczek-' + status + '">' + (CC.STATUSY[status] || status) + '</span>'; };
  function znaczek(e) {
    var s = e.getAttribute('data-cc-znaczek');
    e.className = 'znaczek znaczek-' + s;
    if (!e.textContent.trim()) e.textContent = CC.STATUSY[s] || s;
  }
  // <ol data-cc-kroki="2"></ol>  →  pasek 6 kroków najmu, 2 pierwsze zrobione, 3. bieżący.
  // data-cc-kroki="6" — wszystkie zrobione; data-cc-kroki-przerwane — kroki po zrobionych przekreślone (np. wygasła).
  function kroki(e) {
    var n = parseInt(e.getAttribute('data-cc-kroki'), 10) || 0;
    var przerwane = e.hasAttribute('data-cc-kroki-przerwane');
    e.classList.add('kroki-najmu');
    e.innerHTML = CC.KROKI_NAJMU.map(function (t, i) {
      var k = i < n ? 'zrobione' : (i === n && !przerwane ? 'biezace' : (przerwane ? 'przerwane' : ''));
      return '<li' + (k ? ' class="' + k + '"' : '') + '>' + t + '</li>';
    }).join('');
  }

  /* ---------- podpis ---------- */
  // <div data-cc-podpis="najemca" data-etykieta="Podpis najemcy"></div>
  // API: CC.podpis('najemca') → { obraz(), pusty(), wyczysc(), ustaw(dataURL) }; zdarzenie 'cc:podpis'.
  var podpisy = {};
  function podpis(box) {
    var nazwa = box.getAttribute('data-cc-podpis') || ('podpis' + Object.keys(podpisy).length);
    box.classList.add('cc-podpis');
    box.innerHTML =
      '<div class="cc-podpis-naglowek"><span></span><button type="button" class="btn btn-tekst btn-maly">Wyczyść</button></div>' +
      '<canvas></canvas><div class="cc-podpis-pomoc">Podpisz palcem lub myszką</div>';
    $('span', box).textContent = box.getAttribute('data-etykieta') || 'Podpis';
    var c = $('canvas', box), ctx = c.getContext('2d'), rysuje = false, pusty = true, ostatni = null;

    function rozmiar() {
      var r = c.getBoundingClientRect();
      if (!r.width) return;
      var kopia = pusty ? null : c.toDataURL();
      var dpr = window.devicePixelRatio || 1;
      c.width = Math.round(r.width * dpr); c.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineWidth = 2.4; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#1a2a5a';
      if (kopia) rysujObraz(kopia);
    }
    function rysujObraz(src) {
      var img = new Image();
      img.onload = function () { var r = c.getBoundingClientRect(); ctx.drawImage(img, 0, 0, r.width, r.height); };
      img.src = src;
    }
    function punkt(ev) { var r = c.getBoundingClientRect(); return { x: ev.clientX - r.left, y: ev.clientY - r.top }; }
    function oznacz(v) {
      pusty = v; box.classList.toggle('podpisany', !v);
      $('.cc-podpis-pomoc', box).textContent = v ? 'Podpisz palcem lub myszką' : '✓ Podpisano';
      zdarzenie(box, 'cc:podpis', { nazwa: nazwa, pusty: v });
    }
    c.addEventListener('pointerdown', function (ev) {
      ev.preventDefault(); rysuje = true; ostatni = punkt(ev);
      try { c.setPointerCapture(ev.pointerId); } catch (e) { /* brak */ }
      ctx.beginPath(); ctx.arc(ostatni.x, ostatni.y, 1.1, 0, Math.PI * 2); ctx.fillStyle = ctx.strokeStyle; ctx.fill();
    });
    c.addEventListener('pointermove', function (ev) {
      if (!rysuje) return;
      var p = punkt(ev);
      ctx.beginPath(); ctx.moveTo(ostatni.x, ostatni.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      ostatni = p;
    });
    function koniec() { if (rysuje) { rysuje = false; if (pusty) oznacz(false); else zdarzenie(box, 'cc:podpis', { nazwa: nazwa, pusty: false }); } }
    c.addEventListener('pointerup', koniec);
    c.addEventListener('pointercancel', koniec);
    c.addEventListener('pointerleave', koniec);

    var api = {
      element: box,
      pusty: function () { return pusty; },
      obraz: function () { return pusty ? null : c.toDataURL('image/png'); },
      wyczysc: function () { ctx.clearRect(0, 0, c.width, c.height); oznacz(true); },
      ustaw: function (src) { if (!src) return; api.wyczysc(); rysujObraz(src); oznacz(false); }
    };
    $('button', box).addEventListener('click', api.wyczysc);
    rozmiar();
    if (window.ResizeObserver) new ResizeObserver(rozmiar).observe(c);
    else window.addEventListener('resize', rozmiar);
    box.cc = api;
    podpisy[nazwa] = api;
  }
  CC.podpis = function (nazwa) { var b = pobierz(nazwa, 'data-cc-podpis'); return (b && b.cc) || podpisy[nazwa] || null; };

  /* ---------- zdjęcie ---------- */
  // <div data-cc-zdjecia data-wymagaj>               (grupa; data-wymagaj blokuje „Dalej” kreatora, dopóki brak kompletu)
  //   <span data-cc-licznik></span>                   (tekst „x z N”)
  //   <div class="zdjecia">
  //     <div data-cc-zdjecie="przod" data-etykieta="Przód" data-przyklad="../assets/img/protokol-przod.svg"></div>
  // API: CC.zdjecie('przod') → { obraz(), jest(), ustaw(src), usun(), przyklad() }; zdarzenie 'cc:zdjecie'.
  var zdjecia = {};
  function zdjecie(box) {
    var nazwa = box.getAttribute('data-cc-zdjecie') || ('zdjecie' + Object.keys(zdjecia).length);
    var przyklad = box.getAttribute('data-przyklad');
    box.classList.add('cc-zdjecie');
    box.innerHTML =
      '<button type="button" class="cc-zdjecie-podglad"><span><span class="ikona">📷</span>Zrób zdjęcie</span></button>' +
      '<div class="cc-zdjecie-stopka"><span></span>' +
        (przyklad ? '<button type="button" class="btn btn-tekst" data-przykladowe>Przykładowe</button>' : '') +
      '</div>' +
      '<input type="file" accept="image/*" capture="environment">';
    $('.cc-zdjecie-stopka > span', box).textContent = box.getAttribute('data-etykieta') || nazwa;
    var podglad = $('.cc-zdjecie-podglad', box), input = $('input', box), src = null;
    var pusty = podglad.innerHTML;

    var api = {
      element: box,
      jest: function () { return !!src; },
      obraz: function () { return src; },
      ustaw: function (s) {
        src = s || null;
        podglad.innerHTML = src ? '<img alt="">' : pusty;
        if (src) $('img', podglad).src = src;
        box.classList.toggle('jest', !!src);
        zdarzenie(box, 'cc:zdjecie', { nazwa: nazwa, obraz: src });
      },
      usun: function () { api.ustaw(null); },
      przyklad: function () { if (przyklad) api.ustaw(przyklad); }
    };
    podglad.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function () {
      var f = input.files && input.files[0];
      if (!f) return;
      CC.pomniejsz(f, 480).then(function (d) { if (d) api.ustaw(d); input.value = ''; });
    });
    var bp = $('[data-przykladowe]', box);
    if (bp) bp.addEventListener('click', api.przyklad);
    box.cc = api;
    zdjecia[nazwa] = api;
  }
  CC.zdjecie = function (nazwa) { var b = pobierz(nazwa, 'data-cc-zdjecie'); return (b && b.cc) || zdjecia[nazwa] || null; };
  // Zwraca { nazwa: obraz } dla wszystkich pól zdjęć w kontenerze (domyślnie cały dokument) — gotowe do CC.zapisz.
  CC.zdjecia = function (kontener) {
    var wynik = {};
    $$('[data-cc-zdjecie]', kontener && pobierz(kontener, 'id')).forEach(function (b) { if (b.cc && b.cc.jest()) wynik[b.getAttribute('data-cc-zdjecie')] = b.cc.obraz(); });
    return wynik;
  };
  function grupaZdjec(g) {
    function licz() {
      var pola = $$('[data-cc-zdjecie]', g), jest = pola.filter(function (b) { return b.cc && b.cc.jest(); }).length;
      $$('[data-cc-licznik]', g).forEach(function (l) {
        l.textContent = jest + ' z ' + pola.length; l.classList.add('licznik-zdjec'); l.classList.toggle('komplet', jest === pola.length);
      });
      if (g.hasAttribute('data-wymagaj')) {
        var krok = g.closest('[data-krok]');
        if (krok) { krok.toggleAttribute('data-blokuj-dalej', jest < pola.length); odswiezKreator(krok.closest('[data-cc-kreator]')); }
      }
      return jest;
    }
    g.addEventListener('cc:zdjecie', licz);
    licz();
  }

  /* ---------- „Wypełnij przykładowymi” ---------- */
  // <button data-cc-wypelnij="#formularz">  — pola z data-przyklad="…" dostają tę wartość,
  // pola wyboru z data-przyklad są zaznaczane, pola zdjęć dostają zdjęcie przykładowe.
  // Bez wartości atrybutu: najbliższy <form>, [data-krok] albo cały dokument.
  CC.wypelnij = function (kontener) {
    var k = typeof kontener === 'string' ? $(kontener) : (kontener || document);
    $$('[data-przyklad]', k).forEach(function (p) {
      if (p.hasAttribute('data-cc-zdjecie')) { if (p.cc) p.cc.przyklad(); return; }
      if (p.type === 'checkbox' || p.type === 'radio') p.checked = true;
      else if ('value' in p) p.value = p.getAttribute('data-przyklad');
      p.dispatchEvent(new Event('input', { bubbles: true }));
      p.dispatchEvent(new Event('change', { bubbles: true }));
    });
  };

  /* ---------- kreator ---------- */
  // <div data-cc-kreator id="protokol">
  //   <section data-krok="Wyposażenie">…</section>
  //   <section data-krok="Zdjęcia" data-blokuj-dalej>…</section>       (Dalej nieaktywne)
  //   <section data-krok="Podpisy" data-dalej-tekst="Zatwierdź protokół">…</section>
  //   <section data-krok-koniec>Protokół podpisany…</section>            (ekran końcowy, poza paskiem postępu)
  // </div>
  // Na ostatnim kroku „Dalej” pokazuje ekran końcowy (jeśli jest). API: CC.kreator(id?) → { idz(n), dalej(), wstecz(), koniec(), blokuj(bool), nr() }
  // Zdarzenia: 'cc:krok' {nr, sekcja}, 'cc:koniec'. Przed przejściem dalej: 'cc:przed-dalej' (cancelable).
  function kreator(k) {
    var kroki = $$(':scope > [data-krok]', k), nr = 0;
    k.classList.add('kreator');
    var postep = el('div', { 'class': 'kreator-postep' },
      '<div class="kreator-postep-tekst"><span>Krok <b data-nr></b> z ' + kroki.length + '</span><b data-tytul></b></div>' +
      '<div class="kreator-postep-pasek"><i></i></div>');
    var nav = el('div', { 'class': 'kreator-nawigacja' },
      '<button type="button" class="btn btn-drugi" data-cc-wstecz>← Wstecz</button>' +
      '<button type="button" class="btn btn-glowny" data-cc-dalej>Dalej →</button>');
    k.insertBefore(postep, k.firstChild);
    k.appendChild(nav);
    var koniecEkran = $(':scope > [data-krok-koniec]', k);
    if (koniecEkran) k.appendChild(koniecEkran);

    var api = {
      element: k,
      nr: function () { return nr; },
      idz: function (n) {
        nr = Math.max(0, Math.min(kroki.length - 1, n));
        k.classList.remove('zakonczony');
        kroki.forEach(function (s, i) { s.classList.toggle('aktywny', i === nr); });
        odswiez();
        window.scrollTo(0, Math.max(0, k.getBoundingClientRect().top + window.scrollY - 8));
        zdarzenie(k, 'cc:krok', { nr: nr, sekcja: kroki[nr] });
      },
      dalej: function () {
        if (kroki[nr].hasAttribute('data-blokuj-dalej')) return;
        var ev = new CustomEvent('cc:przed-dalej', { bubbles: true, cancelable: true, detail: { nr: nr, sekcja: kroki[nr] } });
        if (!k.dispatchEvent(ev)) return;
        if (nr < kroki.length - 1) api.idz(nr + 1); else api.koniec();
      },
      wstecz: function () { if (nr > 0) api.idz(nr - 1); },
      koniec: function () {
        if (koniecEkran) { k.classList.add('zakonczony'); window.scrollTo(0, 0); }
        zdarzenie(k, 'cc:koniec', {});
      },
      blokuj: function (v) { kroki[nr].toggleAttribute('data-blokuj-dalej', v !== false); odswiez(); }
    };
    function odswiez() {
      var s = kroki[nr];
      $('[data-nr]', postep).textContent = nr + 1;
      $('[data-tytul]', postep).textContent = s.getAttribute('data-krok');
      $('i', postep).style.width = ((nr + 1) / kroki.length * 100) + '%';
      var w = $('[data-cc-wstecz]', nav), d = $('[data-cc-dalej]', nav);
      w.style.visibility = nr === 0 ? 'hidden' : '';
      d.disabled = s.hasAttribute('data-blokuj-dalej');
      d.textContent = s.getAttribute('data-dalej-tekst') || (nr === kroki.length - 1 ? 'Zakończ' : 'Dalej →');
      d.hidden = s.hasAttribute('data-bez-dalej');
    }
    api.odswiez = odswiez;
    k.cc = api;
    api.idz(0);
    window.scrollTo(0, 0);
  }
  function odswiezKreator(k) { if (k && k.cc) k.cc.odswiez(); }
  CC.kreator = function (id) { var k = id ? pobierz(id, 'id') : $('[data-cc-kreator]'); return k && k.cc; };
  // Blokuje / odblokowuje „Dalej” na bieżącym kroku pierwszego (lub wskazanego) kreatora.
  CC.blokujDalej = function (v, id) { var a = CC.kreator(id); if (a) a.blokuj(v); };

  /* ---------- obsługa kliknięć (delegacja) ---------- */
  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('[data-cc-modal],[data-cc-zamknij],[data-cc-toast],[data-cc-wypelnij],[data-cc-dalej],[data-cc-wstecz],[data-cc-koniec],[data-cc-drukuj]');
    if (!t) {
      if (ev.target.classList && ev.target.classList.contains('modal')) CC.zamknij(ev.target.id);
      return;
    }
    var k = t.closest('[data-cc-kreator]');
    if (t.hasAttribute('data-cc-modal')) { ev.preventDefault(); CC.modal(t.getAttribute('data-cc-modal')); }
    if (t.hasAttribute('data-cc-zamknij')) { ev.preventDefault(); var m = t.closest('.modal'); CC.zamknij(m && m.id); }
    if (t.hasAttribute('data-cc-wypelnij')) {
      ev.preventDefault();
      CC.wypelnij(t.getAttribute('data-cc-wypelnij') || t.closest('form,[data-krok]') || document);
    }
    if (t.hasAttribute('data-cc-dalej') && k && k.cc) k.cc.dalej();
    if (t.hasAttribute('data-cc-wstecz') && k && k.cc) k.cc.wstecz();
    if (t.hasAttribute('data-cc-koniec') && k && k.cc) k.cc.koniec();
    if (t.hasAttribute('data-cc-drukuj')) window.print();
    if (t.hasAttribute('data-cc-toast')) {
      CC.toast(t.getAttribute('data-cc-toast'));
      var href = t.getAttribute('href');
      if (t.tagName === 'A' && href && href.charAt(0) !== '#') { ev.preventDefault(); setTimeout(function () { location.href = t.href; }, 1100); }
    }
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') CC.zamknij(); });
  // Formularz z data-cc-przejdz="adres" po wysłaniu (i przejściu walidacji required) przechodzi pod adres.
  document.addEventListener('submit', function (ev) {
    var f = ev.target, cel = f.getAttribute('data-cc-przejdz');
    if (cel == null) return;
    ev.preventDefault();
    if (f.hasAttribute('data-cc-toast')) { CC.toast(f.getAttribute('data-cc-toast')); setTimeout(function () { location.href = cel; }, 1100); }
    else if (cel) location.href = cel;
  });

  /* ---------- start ---------- */
  function start() {
    $$('[data-cc-naglowek]').forEach(naglowek);
    $$('.modal').forEach(function (m) { if (!m.classList.contains('otwarty')) m.hidden = false; });
    $$('[data-cc-znaczek]').forEach(znaczek);
    $$('[data-cc-kroki]').forEach(kroki);
    $$('[data-cc-podpis]').forEach(podpis);
    $$('[data-cc-zdjecie]').forEach(zdjecie);
    $$('[data-cc-kreator]').forEach(kreator);
    $$('[data-cc-zdjecia]').forEach(grupaZdjec);
    CC.stan();
    gotowy = true;
    kolejka.splice(0).forEach(function (fn) { try { fn(); } catch (e) { console.error(e); } });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
