# KONTRAKT — makieta MVP CamperConnect

Jedyne źródło prawdy dla agentów 1–5. Zakres i ekrany: [`CC_Makieta_MVP_Backlog.md`](CC_Makieta_MVP_Backlog.md). **Wszystkie kwoty, daty i dane: [pkt 4.1 backlogu](CC_Makieta_MVP_Backlog.md#41-wartości-kanoniczne-najmu-demo)** (oraz pkt 4 — flota, cennik potrąceń, wyposażenie, instruktaż). **Treść umowy, regulaminu, cennika usług dodatkowych i kar oraz protokołu zdawczo-odbiorczego: [`CC_Dokumenty_Wypozyczalni.md`](CC_Dokumenty_Wypozyczalni.md)** — oparta na prawdziwych dokumentach wypożyczalni; nie wymyślaj własnych zapisów i nie wpisuj danych prawdziwej firmy.

Podgląd wszystkich komponentów na żywo: [`wzorzec.html`](../wzorzec.html). Wzorzec ekranu do kopiowania: `klient/strona.html` (w wersji z `main` sprzed pracy agenta 1).

## 1. Zasady

- Edytujesz **tylko** pliki ze swojego wiersza tabeli. Nowe pliki (np. `panel/kalendarz.css`, `zwrot/dane.js`) — tylko w swoim katalogu.
- **Nie zmieniasz** `assets/`, `index.html`, `wzorzec.html`, `docs/`. Czego brakuje — obejdź lokalnie i opisz w podsumowaniu.
- Bez frameworków, npm, kroku budowania i zewnętrznych CDN. Linki tylko względne (`../panel/rezerwacja.html?stan=wydana`) — działają z dysku i z GitHub Pages.
- Bez logiki: nic nie liczysz, wartości wpisujesz na sztywno. Teksty po polsku, daty `11.07.2027`, kwoty `1 950 zł` (spacja przed „zł”, spacja tysięcy).
- Nie zadajesz pytań — rozsądne założenie + opis w podsumowaniu.

## 2. Pliki i właściciele

| Plik | Ekran | Agent | `body class` | `data-cc-naglowek` / `data-cc-menu` |
|---|---|---|---|---|
| `index.html`, `wzorzec.html`, `assets/*`, `docs/*` | M0, wspólne | 0 / 6 | `uklad-klient` | `klient` |
| `klient/strona.html` | K1 | 1 | `uklad-klient` | `klient` |
| `klient/prosba-wyslana.html` | K1a | 1 | `uklad-klient` | `klient` |
| `panel/kalendarz.html` | P1 (`?stan=wstepna` domyślny \| `potwierdzona` \| `wygasla`) | 2 | `uklad-panel` | `panel` / `kalendarz` |
| `panel/rezerwacje.html` | P2 | 2 | `uklad-panel` | `panel` / `rezerwacje` |
| `panel/rezerwacja.html` | P3 (`?stan=`, 8 wariantów, domyślny `wstepna`) | 2 | `uklad-panel` | `panel` / `rezerwacje` |
| `panel/nowa.html` | P4 | 2 | `uklad-panel` | `panel` / `kalendarz` |
| `umowa/umowa.html` | K2 (telefon klienta) | 3 | `uklad-mobile` | `klient` |
| `umowa/umowa-podpisana.html` | K2a (widok do druku) | 3 | `uklad-klient` | `klient` |
| `wydanie/wydanie.html` | M1 (telefon) | 4 | `uklad-mobile` | `mobile` / `rezerwacje` |
| `wydanie/podglad.html` | M1a (widok do druku) | 4 | `uklad-panel` | `panel` / `rezerwacje` |
| `zwrot/zwrot.html` | M2 (telefon) | 5 | `uklad-mobile` | `mobile` / `rezerwacje` |
| `zwrot/rozliczenie.html` | M3 (laptop) | 5 | `uklad-panel` | `panel` / `rezerwacje` |

Warianty `stan` P3: `wstepna`, `potwierdzona`, `umowa-wyslana`, `umowa-podpisana`, `wydana`, `zwrocona`, `rozliczona`, `wygasla`. Przejścia — tabela scenariusza, pkt 8 backlogu.

Szkielet każdego pliku już istnieje — **zachowaj** `<head>`, klasę `body`, `<header data-cc-naglowek…>` i `<main class="tresc">`; resztę wypełniasz.

## 3. Szkielet strony

```html
<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>P3 · Rezerwacja R-2027-014 — CamperConnect</title>
  <link rel="icon" href="../assets/img/ikona.svg">
  <link rel="stylesheet" href="../assets/style.css">
  <script src="../assets/app.js"></script>          <!-- w <head>, BEZ defer -->
  <!-- opcjonalnie: <link rel="stylesheet" href="rezerwacja.css"> -->
</head>
<body class="uklad-panel" data-stan-domyslny="wstepna">
  <header data-cc-naglowek="panel" data-cc-menu="rezerwacje"></header>
  <main class="tresc">
    <div class="naglowek-ekranu"><div><h1>…</h1><p class="podtytul">…</p></div> <div class="rzad">…przyciski…</div></div>
    …
  </main>
  <script>
    CC.gotowe(function () { /* własny kod strony — po inicjalizacji komponentów */ });
  </script>
</body>
</html>
```

`data-cc-naglowek` generuje pasek makiety („← Mapa makiety”, przełącznik „Strona wypożyczalni / Panel”) i nagłówek aplikacji: `klient` — marka „Kamper na Mazury”; `panel` / `mobile` — „CamperConnect” + menu Kalendarz / Rezerwacje (`data-cc-menu` podświetla pozycję). Ścieżki liczone automatycznie z położenia strony.

## 4. Klasy CSS (`assets/style.css`)

| Obszar | Klasy |
|---|---|
| Układ | `uklad-klient` (1040 px), `uklad-panel` (1280 px, laptop), `uklad-mobile` (520 px, szare tło, telefon) — na `body`; `tresc` — na `main` |
| Nagłówek ekranu | `naglowek-ekranu` > `h1` + `p.podtytul` |
| Rozmieszczenie | `stos` (odstępy pionowe 16 px), `stos-maly` (8 px), `rzad`, `rzad-rozsuniety`, `siatka-2`, `siatka-3`, `siatka-auto` (kafle ≥220 px), `kolumny-panel` (2:1, np. treść + bok). Poniżej 760 px wszystko w jednej kolumnie |
| Tekst | `drugi-plan`, `wyszarzony`, `maly`, `pogrubiony`, `kwota` (cyfry tabelaryczne, bez łamania), `do-prawej`, `wysrodkowany` |
| Przyciski | `btn` + `btn-glowny` \| `btn-drugi` \| `btn-niebezpieczny` \| `btn-tekst`; rozmiar `btn-maly`, `btn-duzy`, `btn-blok` (100%); `disabled` lub `wylaczony`. Działa na `<a>` i `<button>` |
| Karty | `karta`, `karta-naglowek` (tytuł + akcja), `karta-zdjecie` (zdjęcie 16:10 u góry), `karta-wybrana`, `karta-klikalna`, `karta-plaska` |
| Dane | `dl.dane` > `dt`/`dd` (etykieta: wartość) |
| Komunikaty | `komunikat` (+ `komunikat-sukces` \| `-ostrzezenie` \| `-blad`); `potwierdzenie` > `potwierdzenie-ikona` + `h2` (ekran „wysłano”) |
| Formularze | `pole` > `span` + `input` (+ `span.pomoc`); `pole-wyboru` (checkbox/radio + tekst); `lista-wyboru` (ramka wokół wielu `pole-wyboru`); `przelaczniki` (radio jako segmenty). Inputy stylowane bez klas |
| Tabele | `tabela-ramka` > `table.tabela`; `tr.suma`; `td.kwota`/`th.kwota` (do prawej) |
| Statusy | `znaczek znaczek-<status>`; tła pasków kalendarza `tlo-<status>`, `tlo-wolne`, `tlo-zajete`; `legenda` > `span` > `i.tlo-…` + tekst. Dodatkowo `znaczek-ok` (zielony), `znaczek-neutralny` |
| Kroki najmu | `ol.kroki-najmu` > `li.zrobione` \| `li.biezace` \| `li.przerwane` (albo `data-cc-kroki`, niżej) |
| Kreator | `kreator`, `kreator-postep`, `kreator-nawigacja` — nadaje `app.js` |
| Zdjęcia | `zdjecia` (siatka kafli 2 / 4 kolumny), `przed-po` > `figure` > `img.miniatura` + `figcaption`, `miniatura` (4:3), `licznik-zdjec` |
| Podpis | `cc-podpis` (nadaje `app.js`); `img.podpis-obraz` — wyświetlenie zapisanego podpisu |
| Modal | `modal` > `modal-okno` (+ `modal-przyciski`); `modal-szerokie` na `.modal` |
| Druk | `dokument` (kartka A4 na ekranie i w druku), `dokument .podpisy` > `figure` > `img` + podpis; `tresc-przewijana` (przewijany tekst umowy; w druku rozwinięty); `nie-drukuj`, `tylko-druk`. W `@media print` znikają nagłówek makiety, przyciski, toasty, nawigacja kreatora |
| Zaślepka | `w-budowie` — usuń ze swojego ekranu |

Statusy (`<status>`): `wstepna` (żółty), `potwierdzona`, `umowa-wyslana`, `umowa-podpisana`, `wydana`, `zwrocona` (czerwony), `rozliczona` (szary), `wygasla` (wyszarzony, przerywana ramka). Zmienne kolorów: `--st-wstepna`, `--st-zajete`, `--st-rozliczona`, `--st-wygasla`, `--st-wolne`; paleta: `--glowny`, `--tekst`, `--tekst-2`, `--ramka`, `--powierzchnia`, `--powierzchnia-2`, `--sukces`, `--blad`, `--akcent`, `--promien`.

## 5. Atrybuty `data-*` (inicjowane automatycznie)

| Atrybut | Na czym | Efekt |
|---|---|---|
| `data-cc-naglowek="klient\|panel\|mobile"`, `data-cc-menu="kalendarz\|rezerwacje"` | `<header>` | wspólny nagłówek makiety |
| `data-stan-domyslny="wstepna"` | `<body>` | stan, gdy brak `?stan=` |
| `data-stan="wstepna wygasla"` | dowolny | widoczny tylko w wymienionych stanach (lista po spacji); `body[data-stan-aktywny]` do CSS |
| `data-cc-znaczek="wydana"` | `<span>` | znaczek statusu z polską nazwą |
| `data-cc-kroki="3"` (+ `data-cc-kroki-przerwane`) | `<ol>` | pasek 6 kroków najmu; 3 zrobione, 4. bieżący; z `-przerwane` kroki po zrobionych przekreślone (wariant `wygasla`) |
| `data-cc-modal="id"` | przycisk | otwiera `.modal#id` |
| `data-cc-zamknij` | przycisk w modalu | zamyka modal (też ×, Esc, klik w tło) |
| `data-cc-toast="tekst"` | przycisk / link | komunikat; na `<a href>` — komunikat, a po ~1 s przejście pod `href` |
| `data-cc-wypelnij="#selektor"` | przycisk | „Wypełnij przykładowymi”: polom z `data-przyklad="…"` wpisuje wartość, checkboxy/radio z `data-przyklad` zaznacza, polom zdjęć ustawia zdjęcie przykładowe. Bez wartości — najbliższy `form` / krok kreatora |
| `data-przyklad="…"` | `input`, `textarea`, `select`, checkbox, pole zdjęcia | wartość przykładowa |
| `data-cc-przejdz="adres.html"` (+ `data-cc-toast`) | `<form>` | po wysłaniu (i przejściu `required`) przejście pod adres |
| `data-cc-drukuj` | przycisk | `window.print()` |
| `data-cc-podpis="nazwa"` + `data-etykieta` | `<div>` | pole podpisu: canvas (palec/mysz), „Wyczyść” |
| `data-cc-zdjecie="nazwa"` + `data-etykieta` + `data-przyklad="../assets/img/…svg"` | `<div>` | kafel zdjęcia: aparat lub plik (`accept=image/* capture=environment`), podgląd, przycisk „Przykładowe”; wgrane zdjęcie pomniejszone do 480 px |
| `data-cc-zdjecia` (+ `data-wymagaj`) | kontener pól zdjęć | liczy zdjęcia w `[data-cc-licznik]` („x z 8”); z `data-wymagaj` blokuje „Dalej” kreatora, dopóki brak kompletu |
| `data-cc-kreator` | `<div id>` | kreator z bezpośrednich dzieci `<section data-krok="Tytuł">` |
| `data-krok="Tytuł"` | `section` | krok kreatora (tytuł w pasku postępu) |
| `data-blokuj-dalej` | `section[data-krok]` | „Dalej” nieaktywne |
| `data-dalej-tekst="Zatwierdź protokół"` | `section[data-krok]` | inny napis na „Dalej” |
| `data-bez-dalej` | `section[data-krok]` | ukrywa „Dalej” (np. własny przycisk w kroku) |
| `data-krok-koniec` | `section` w kreatorze | ekran końcowy; pokazywany po „Dalej” na ostatnim kroku (bez paska i nawigacji) |
| `data-cc-dalej`, `data-cc-wstecz`, `data-cc-koniec` | przycisk w kreatorze | własne przyciski nawigacji |

## 6. Funkcje `CC` (`assets/app.js`)

| Funkcja | Opis |
|---|---|
| `CC.gotowe(fn)` | uruchamia `fn` po inicjalizacji komponentów — używaj w skryptach strony |
| `CC.stan()` | zwraca bieżący stan (`?stan=` lub `data-stan-domyslny`) i odświeża widoczność `[data-stan]` |
| `CC.modal(id)` / `CC.zamknij(id?)` | otwiera / zamyka modal (bez `id` — wszystkie) |
| `CC.toast(tekst, ms?)` | komunikat na dole ekranu (domyślnie 2,6 s) |
| `CC.zapisz(klucz, wartosc)` → `true/false` | `localStorage` (JSON), błędy (np. brak miejsca) łapane, zwraca `false` |
| `CC.odczytaj(klucz, domyslna?)` | odczyt; przy braku lub błędzie zwraca `domyslna` (lub `null`) |
| `CC.usun(klucz)` | usuwa klucz |
| `CC.pomniejsz(plikLubUrl, 480)` → `Promise<dataURL>` | pomniejsza zdjęcie do JPEG ≤480 px; SVG zwraca bez zmian |
| `CC.podpis(nazwa)` | `{ obraz() → dataURL\|null, pusty(), wyczysc(), ustaw(dataURL) }`; zdarzenie `cc:podpis` (`detail: {nazwa, pusty}`) |
| `CC.zdjecie(nazwa)` | `{ obraz() → src\|null, jest(), ustaw(src), usun(), przyklad() }`; zdarzenie `cc:zdjecie` (`detail: {nazwa, obraz}`) |
| `CC.zdjecia(idKontenera?)` | `{ nazwa: src }` wszystkich ustawionych zdjęć — gotowe do `CC.zapisz` |
| `CC.wypelnij(selektorLubElement)` | to samo co `data-cc-wypelnij` |
| `CC.kreator(id?)` | `{ idz(n), dalej(), wstecz(), koniec(), blokuj(bool), nr() }`; zdarzenia `cc:krok` (`{nr, sekcja}`), `cc:przed-dalej` (można `preventDefault()`), `cc:koniec` |
| `CC.blokujDalej(bool, id?)` | blokuje / odblokowuje „Dalej” na bieżącym kroku |
| `CC.znaczek(status)` → HTML | znaczek do wstawienia z JS (np. w siatce kalendarza) |
| `CC.STATUSY`, `CC.KROKI_NAJMU` | nazwy statusów i 6 kroków najmu |
| `CC.sciezka('assets/img/x.svg')` | ścieżka względna od katalogu głównego makiety |

### Klucze `localStorage`

| Klucz | Zapisuje | Czyta | Wartość |
|---|---|---|---|
| `cc-umowa-podpis` | K2 | K2a | dataURL podpisu najemcy |
| `cc-wydanie-zdjecia` | M1 | M1a, M2, M3 | `{ przod, lewy-bok, tyl, prawy-bok, dach, wnetrze, licznik, paliwo }` → src (dataURL albo ścieżka `../assets/img/…`) |
| `cc-wydanie-podpisy` | M1 | M1a | `{ wydajacy, najemca }` → dataURL |
| `cc-zwrot-podpisy` | M2 | (opcjonalnie M3) | `{ odbierajacy, najemca }` → dataURL |

Gdy klucza brak — pokaż zdjęcia / podpisy przykładowe. Nazwy pól zdjęć (`data-cc-zdjecie`) używaj dokładnie jak w kluczach wyżej.

## 7. Zdjęcia zastępcze (`assets/img/`, 640×480 SVG)

- Pojazdy: `pojazd-ducato-alkowa.svg`, `pojazd-ducato-polintegra.svg`, `pojazd-hymer-exsis.svg`, `pojazd-ford-nugget.svg`, `pojazd-knaus-sport-450.svg`, `pojazd-niewiadow-n126.svg`.
- Protokół (Ducato alkowa, NGI 4K27): `protokol-przod.svg`, `protokol-lewy-bok.svg`, `protokol-tyl.svg`, `protokol-prawy-bok.svg`, `protokol-dach.svg`, `protokol-wnetrze.svg`, `protokol-licznik.svg` (48 230 km), `protokol-paliwo.svg` (8/8).
- Zwrot: `protokol-prawy-bok-rysa.svg` (rysa zaznaczona), `protokol-licznik-zwrot.svg` (49 870 km), `protokol-paliwo-zwrot.svg` (6/8).
- Podpisy przykładowe: `podpis-przyklad.svg` (najemca), `podpis-przyklad-2.svg` (wypożyczalnia).

## 8. Przykłady

**Modal (P2 — zadatek):**
```html
<button class="btn btn-glowny" data-cc-modal="zadatek">Potwierdź</button>
<div class="modal" id="zadatek"><div class="modal-okno">
  <h2>Odnotuj zadatek</h2>
  <label class="pole"><span>Kwota zadatku</span><input type="text" value="1 950 zł"></label>
  <div class="modal-przyciski">
    <button class="btn btn-drugi" data-cc-zamknij>Anuluj</button>
    <a class="btn btn-glowny" href="rezerwacja.html?stan=potwierdzona">Zapisz</a>
  </div>
</div></div>
```

**Warianty stanu (P3):**
```html
<body class="uklad-panel" data-stan-domyslny="wstepna">
…
<span data-stan="wstepna" data-cc-znaczek="wstepna"></span>
<span data-stan="wydana" data-cc-znaczek="wydana"></span>
<ol data-stan="wydana" data-cc-kroki="4"></ol>
<a data-stan="wydana" class="btn btn-glowny" href="../zwrot/zwrot.html">Rozpocznij zwrot</a>
<a data-stan="potwierdzona" class="btn btn-glowny" href="rezerwacja.html?stan=umowa-wyslana" data-cc-toast="Umowa wysłana do klienta">Wyślij umowę</a>
```

**Kreator z blokadą zdjęć i podpisami (M1 / M2):**
```html
<div data-cc-kreator id="protokol">
  <section data-krok="Wyposażenie">
    <div class="lista-wyboru">
      <label class="pole-wyboru"><input type="checkbox" data-przyklad> Stolik</label>
    </div>
  </section>
  <section data-krok="Zdjęcia">
    <div data-cc-zdjecia data-wymagaj>
      <div class="rzad-rozsuniety"><b>Zdjęcia: <span data-cc-licznik></span></b>
        <button type="button" class="btn btn-tekst btn-maly" data-cc-wypelnij>Wypełnij przykładowymi zdjęciami</button></div>
      <div class="zdjecia">
        <div data-cc-zdjecie="przod" data-etykieta="Przód" data-przyklad="../assets/img/protokol-przod.svg"></div>
        <!-- … lewy-bok, tyl, prawy-bok, dach, wnetrze, licznik, paliwo -->
      </div>
    </div>
  </section>
  <section data-krok="Podsumowanie i podpisy" data-dalej-tekst="Zatwierdź protokół">
    <div data-cc-podpis="wydajacy" data-etykieta="Podpis wydającego"></div>
    <div data-cc-podpis="najemca" data-etykieta="Podpis najemcy"></div>
  </section>
  <section data-krok-koniec>
    <div class="potwierdzenie"><div class="potwierdzenie-ikona">✓</div>
      <h2>Protokół podpisany, PDF wysłany do obu stron</h2>
      <a class="btn btn-glowny" href="../panel/rezerwacja.html?stan=wydana">Wróć do rezerwacji</a></div>
  </section>
</div>
<script>
  CC.gotowe(function () {
    document.getElementById('protokol').addEventListener('cc:koniec', function () {
      CC.zapisz('cc-wydanie-zdjecia', CC.zdjecia('protokol'));
      CC.zapisz('cc-wydanie-podpisy', { wydajacy: CC.podpis('wydajacy').obraz(), najemca: CC.podpis('najemca').obraz() });
    });
  });
</script>
```

**Formularz z „Wypełnij przykładowymi” i przejściem (K1, K2):**
```html
<button type="button" class="btn btn-tekst btn-maly" data-cc-wypelnij="#dane">Wypełnij przykładowymi danymi</button>
<form id="dane" data-cc-przejdz="umowa-podpisana.html">
  <label class="pole"><span>PESEL</span><input type="text" required data-przyklad="85010112345"></label>
  <label class="pole-wyboru"><input type="checkbox" required> <span>Zapoznałem się z umową…</span></label>
  <button class="btn btn-glowny btn-blok">Podpisuję</button>
</form>
```

**Widok do druku (K2a, M1a):**
```html
<div class="rzad nie-drukuj"><button class="btn btn-drugi" data-cc-drukuj>Drukuj / PDF</button></div>
<article class="dokument">
  <h1>Umowa najmu pojazdu nr R-2027-014</h1>
  …
  <div class="podpisy">
    <figure><img src="../assets/img/podpis-przyklad-2.svg" alt="">Wynajmujący</figure>
    <figure><img id="podpis-najemcy" src="../assets/img/podpis-przyklad.svg" alt="">Najemca · 14.03.2027</figure>
  </div>
</article>
<script>CC.gotowe(function () { var p = CC.odczytaj('cc-umowa-podpis'); if (p) document.getElementById('podpis-najemcy').src = p; });</script>
```

## 9. Uwagi

- Kreator najlepiej działa jako główna treść ekranu (pasek postępu przyklejony u góry, nawigacja u dołu ekranu). Kroki muszą być **bezpośrednimi dziećmi** `[data-cc-kreator]`.
- Komponenty działają po otwarciu pliku z dysku (`file://`) i na GitHub Pages. `localStorage` na `file://` w niektórych przeglądarkach jest wspólny dla wszystkich plików, na Pages — dla całej domeny; obie sytuacje są w porządku.
- Panel ma nagłówek z menu; ekrany telefonu właściciela (`mobile`) też — dla spójności z panelem.
