# CamperConnect — makieta MVP w jeden wieczór: prompty dla agentów

**Wersja:** 1.2 (17.11.2026) · **Uzupełnia:** `CC_Makieta_MVP_Backlog.md` v1.2 (zakres, ekrany, dane, statusy, scenariusz demo) i `CC_Dokumenty_Wypozyczalni.md` v1.0 (treść umowy, regulaminu, cennika, protokołu)

Backlog opisuje, *co* ma powstać. Ten dokument opisuje, *jak* to zrobić w 2–3 godziny: jeden prompt przygotowujący wspólny fundament, pięć promptów uruchamianych równolegle i jeden prompt domykający.

**Zmiany w 1.1:** czysty HTML + CSS + mały JavaScript zamiast Vite/React; brak wspólnego stanu i funkcji store'u; każdy ekran to osobny plik; agenci pracują w osobnych git worktree i nie zadają pytań.

**Zmiany w 1.2:** prompty 1–6 korzystają z prawdziwych dokumentów wypożyczalni przeniesionych do `docs/CC_Dokumenty_Wypozyczalni.md` (oryginalne PDF-y są w `.gitignore` i nie trafiają do worktree). Umowa, regulamin i cennik do akceptacji w K2, lista wyposażenia i instruktaż z protokołu w M1/M2, potrącenia z numerami pozycji cennika; nowe kwoty potrąceń i zwrotu kaucji (backlog, pkt 4.1).

---

## 1. Jak to działa

| Etap | Co się dzieje | Ile sesji | Orientacyjny czas |
|---|---|---|---|
| 0. Fundament | struktura plików, wspólny styl i skrypty, szkielety wszystkich ekranów, mapa makiety, publikacja | 1 | 30–40 min |
| 1. Budowa równoległa | pięciu agentów buduje po jednym obszarze, każdy we własnym katalogu, worktree i gałęzi | 5 naraz | 45–75 min |
| 2. Domknięcie | scalenie gałęzi, sprawdzenie linków scenariusza, ujednolicenie wyglądu, publikacja | 1 | 30–45 min |

**Dlaczego to się nie rozjedzie:**
- Fundament ustala wspólny styl (`assets/style.css`), wspólne skrypty (`assets/app.js`) i wartości kanoniczne (backlog, pkt 4.1). Agenci z nich korzystają i ich nie zmieniają.
- Każdy agent edytuje tylko pliki w swoim katalogu. Żadne dwa agenty nie dotykają tego samego pliku, więc scalanie jest bezkonfliktowe.
- Ekrany łączą się wyłącznie zwykłymi linkami z tabeli w sekcji 2.

### Przed startem

1. Uruchom prompt 0 w katalogu projektu (`camperconnect/`, gałąź `main`) i poczekaj, aż skończy. Commit ma trafić do `main`.
   **Zacommituj też aktualne `docs/`** (backlog 1.2, prompty 1.2, `CC_Dokumenty_Wypozyczalni.md`, `KONTRAKT.md`) — worktree powstają z `main`, więc agenci widzą tylko to, co jest w commicie.
2. W katalogu projektu utwórz pięć worktree — każdy agent dostaje osobny katalog roboczy i gałąź:
   ```bash
   for o in klient panel umowa wydanie zwrot; do
     git worktree add ../cc-$o -b feature/$o
   done
   ```
3. Otwórz pięć terminali i w każdym uruchom Claude Code w jego katalogu (`cd ../cc-klient && claude`, `cd ../cc-panel && claude` itd.). Wklej odpowiedni prompt 1–5.
4. Gdy wszystkie skończą, wróć do `camperconnect/` i uruchom prompt 6.

### Czy agenci będą o coś pytać?

- **O decyzje — nie.** Każdy prompt każe przyjmować rozsądne założenia i opisywać je w podsumowaniu, zamiast pytać.
- **O zgodę na polecenia — zależy od trybu uprawnień.** W zwykłym trybie Claude Code pyta o zgodę na edycję plików i polecenia powłoki. Żeby agenci pracowali bez przerw, uruchom je w trybie automatycznym (przełączanie Shift+Tab) albo dodaj do `.claude/settings.json` zgody na edycję plików i lokalne polecenia `git`. Prompt 0 i 6 publikują na GitHubie — tam zgoda na `gh`/`git push` jest potrzebna i słusznie.

---

## 2. Wspólny kontrakt (ustala go prompt 0, obowiązuje wszystkich)

**Pliki ekranów i właściciele:**

| Plik | Ekran | Agent |
|---|---|---|
| `index.html` | M0 — mapa makiety | 0 (fundament) |
| `klient/strona.html` | K1 — pojazdy, kalendarz, prośba o termin | 1 |
| `klient/prosba-wyslana.html` | K1a — prośba wysłana | 1 |
| `panel/kalendarz.html` | P1 — kalendarz floty (`?stan=wstepna\|potwierdzona\|wygasla`) | 2 |
| `panel/rezerwacje.html` | P2 — lista próśb i rezerwacji, okno zadatku | 2 |
| `panel/rezerwacja.html` | P3 — szczegóły rezerwacji (`?stan=…`, 8 wariantów) | 2 |
| `panel/nowa.html` | P4 — ręczne dodanie rezerwacji | 2 |
| `umowa/umowa.html` | K2 — umowa do podpisu (telefon) | 3 |
| `umowa/umowa-podpisana.html` | K2a — umowa podpisana, widok do druku | 3 |
| `wydanie/wydanie.html` | M1 — protokół wydania (telefon) | 4 |
| `wydanie/podglad.html` | M1a — podgląd protokołu wydania | 4 |
| `zwrot/zwrot.html` | M2 — protokół zwrotu (telefon) | 5 |
| `zwrot/rozliczenie.html` | M3 — rozliczenie kaucji (laptop) | 5 |

Warianty `stan` dla P3: `wstepna`, `potwierdzona`, `umowa-wyslana`, `umowa-podpisana`, `wydana`, `zwrocona`, `rozliczona`, `wygasla`. Linki między ekranami — według tabeli scenariusza w backlogu, pkt 8. Wszystkie linki względne (np. `../panel/rezerwacja.html?stan=wydana`), żeby działały z dysku i na GitHub Pages.

**Wspólne pliki (tylko agent 0 i 6):** `assets/style.css`, `assets/app.js`, `assets/img/`, `index.html`, `docs/`.

**Zasady dla agentów 1–5** (powtórzone w każdym prompcie):
- edytujesz tylko pliki ze swojego wiersza tabeli; nowe pliki (np. lokalny `.css` lub `.js`) tylko w swoim katalogu;
- nie zmieniasz `assets/`, `index.html` ani `docs/`; jeśli czegoś tam brakuje, obejdź to w swoim katalogu i opisz w podsumowaniu;
- wszystkie kwoty, daty i dane bierzesz z backlogu, pkt 4.1;
- treść umowy, regulaminu, cennika i protokołu bierzesz z `docs/CC_Dokumenty_Wypozyczalni.md` — nigdy danych prawdziwej wypożyczalni;
- bez logiki: nic nie liczysz, wartości wpisujesz na sztywno;
- nie zadajesz pytań — przy wątpliwości przyjmujesz rozsądne założenie i opisujesz je w podsumowaniu.

---

## 3. Prompt 0 — Fundament (uruchom jako pierwszy, sam)

```text
Budujemy klikalną makietę MVP CamperConnect w czystym HTML + CSS + małym JavaScripcie.
Pełny opis jest w docs/CC_Makieta_MVP_Backlog.md, a podział pracy w docs/CC_Makieta_Prompty_Agenci.md
— przeczytaj oba pliki w całości.

Twoje zadanie to WYŁĄCZNIE fundament, na którym za chwilę pięciu agentów równolegle zbuduje ekrany.
Liczy się szybkość i to, żeby agenci nie wchodzili sobie w drogę. Nie buduj treści ekranów.
Nie zadawaj mi pytań — przy wątpliwości przyjmij rozsądne założenie i opisz je w podsumowaniu.

Zrób:
1. Strukturę katalogów z sekcji 2 dokumentu z promptami. Bez frameworków, npm i kroku budowania.
2. assets/style.css: zmienne CSS z jasną, spokojną paletą; typografia systemowa; przyciski (główny,
   drugorzędny, niebezpieczny), karty, formularze, tabele, znaczki 8 statusów z pkt 5 backlogu
   (kolory: wstępna żółty, potwierdzone i dalsze czerwony, rozliczona szary, wygasła wyszarzona),
   pasek kroków najmu, kreator krok po kroku z paskiem postępu, okno modalne, toast, widok do druku
   (@media print), układ panelu pod laptop (menu: Kalendarz, Rezerwacje) i układ mobilny.
3. assets/app.js (bez zależności, jeden globalny obiekt CC), automatycznie inicjujący elementy
   po atrybutach data-*:
   - wspólny nagłówek makiety: link „Mapa makiety", przełącznik „Strona wypożyczalni / Panel",
     w panelu menu Kalendarz / Rezerwacje; ścieżki względne liczone z położenia strony;
   - CC.modal(id) / zamykanie, CC.toast(tekst);
   - pole podpisu: canvas działający palcem i myszką, przycisk „Wyczyść", odczyt obrazu;
   - pole zdjęcia: input type=file accept=image/* capture=environment z podglądem miniatury
     i możliwością ustawienia zdjęcia przykładowego;
   - kreator: sekcje-kroki, pasek postępu, „Wstecz"/„Dalej", możliwość zablokowania „Dalej"
     z poziomu kroku;
   - CC.stan(): odczyt parametru ?stan= i pokazywanie elementów oznaczonych data-stan;
   - CC.zapisz(klucz, wartosc) / CC.odczytaj(klucz) na localStorage z obsługą błędów oraz
     pomniejszanie zdjęcia do ok. 480 px przed zapisem.
4. assets/img/: proste zdjęcia zastępcze SVG 6 pojazdów oraz 8 ujęć protokołu (przód, lewy bok,
   tył, prawy bok, dach, wnętrze, licznik, paliwo) i dodatkowo prawy bok z widoczną rysą.
5. Szkielety wszystkich plików ekranów z tabeli: nagłówek, tytuł ekranu, podpięte assets.
   Jeden z nich (np. klient/strona.html) dopracuj jako wzorzec do kopiowania — z przykładami
   przycisków, karty i formularza. Agenci będą wypełniać te pliki.
6. index.html — mapa makiety według pkt 6 (M0) backlogu, z linkami do wszystkich ekranów
   i wszystkich wariantów stanu P3 oraz przyciskiem „Zacznij scenariusz demo".
7. docs/KONTRAKT.md: lista plików z właścicielami, klasy CSS, atrybuty data-* i funkcje CC
   z krótkimi przykładami HTML, link do wartości kanonicznych (pkt 4.1 backlogu).
   Krótko i dokładnie — to jedyne źródło prawdy dla agentów.
8. Publikację: utwórz przez gh publiczne repozytorium „camperconnect", wypchnij main i włącz
   GitHub Pages z gałęzi main (katalog /). Sprawdź, że adres odpowiada.

Na koniec: wszystkie pliki otwierają się bez błędów w konsoli, wszystkie linki z mapy działają,
commit jest w main. W podsumowaniu podaj adres publikacji i wszystko, co odbiega od backlogu.
```

---

## 4. Prompty 1–5 — uruchom równocześnie, każdy w osobnym worktree

Wspólna końcówka każdego promptu jest już w nim wklejona — kopiujesz cały blok.

### Prompt 1 — Strona klienta (`../cc-klient`)

```text
Pracujesz nad makietą MVP CamperConnect (czysty HTML + CSS + mały JS) razem z czterema innymi
agentami, każdy w swoim obszarze. Przeczytaj docs/KONTRAKT.md oraz docs/CC_Makieta_MVP_Backlog.md
(punkty 3, 4, 4.1, 5, 6, 8 i epik E1) i docs/CC_Dokumenty_Wypozyczalni.md (punkty 1, 4 i 7).

Twój obszar: klient/strona.html (K1) i klient/prosba-wyslana.html (K1a). Gałąź: feature/klient
(jesteś już na niej, w osobnym worktree).

Zbuduj E1-1 do E1-4:
- karty 6 pojazdów ze zdjęciem, ceną za dobę i kaucją; Ducato alkowa wybrany;
- kalendarz lipca 2027 z dniami wolnymi i zajętymi (klient widzi tylko „wolne / zajęte"),
  zaznaczony zakres 11–21.07;
- podsumowanie: 10 dób, 6 500 zł, zadatek 1 950 zł, kaucja 5 000 zł; pod nim linia warunków
  „Zadatek 30% w ciągu 3 dni od potwierdzenia, reszta do 7 dni przed odbiorem, kaucja w dniu
  odbioru" i link „Regulamin wynajmu" otwierający modal ze skrótem regulaminu (pkt 4 dokumentów:
  rozdziały I, III, V, VI, VIII, IX — po 2–3 punkty);
- formularz (imię i nazwisko, telefon, e-mail, wiadomość) z przyciskiem „Wypełnij przykładowymi
  danymi"; „Wyślij prośbę o termin" prowadzi do K1a;
- K1a: „Wstępna rezerwacja przyjęta. Termin zablokowany do 15.03.2027. Wypożyczalnia skontaktuje
  się z Tobą.", podsumowanie prośby i link „Zobacz to w panelu wypożyczalni" do panel/kalendarz.html.
Bez płatności i automatycznego potwierdzenia. Mobile-first, ale ma dobrze wyglądać też na laptopie.

Zasady: edytujesz tylko swoje pliki; nowe pliki tylko w klient/. Nie zmieniasz assets/, index.html
ani docs/ — jeśli czegoś brakuje, obejdź to w swoim katalogu i opisz w podsumowaniu. Wartości
z pkt 4.1 backlogu. Bez logiki — wszystko wpisane na sztywno. Nie zadawaj pytań: przy wątpliwości
przyjmij rozsądne założenie i opisz je w podsumowaniu. Liczy się szybkość.

Na koniec: pliki otwierają się bez błędów w konsoli, linki prowadzą tam, gdzie mówi pkt 8 backlogu,
zmiany zacommitowane na feature/klient. W podsumowaniu: co zrobione, co pominięte, jakie założenia
przyjąłeś i czego brakowało we wspólnych plikach.
```

### Prompt 2 — Panel: kalendarz floty, rezerwacje, szczegóły (`../cc-panel`)

```text
Pracujesz nad makietą MVP CamperConnect (czysty HTML + CSS + mały JS) razem z czterema innymi
agentami, każdy w swoim obszarze. Przeczytaj docs/KONTRAKT.md oraz docs/CC_Makieta_MVP_Backlog.md
(punkty 3, 4, 4.1, 5, 6, 8 i epik E2) i docs/CC_Dokumenty_Wypozyczalni.md (punkty 1, 2 i 7).

Twój obszar: panel/kalendarz.html (P1), panel/rezerwacje.html (P2), panel/rezerwacja.html (P3),
panel/nowa.html (P4). Gałąź: feature/panel (jesteś już na niej, w osobnym worktree).
Panel projektuj pod laptop.

Zbuduj w tej kolejności:
1. P3 — szczegóły najmu demo R-2027-014: dane klienta i najmu, znaczek statusu, pasek kroków
   (prośba → potwierdzenie i zadatek → umowa → wydanie → zwrot → rozliczenie kaucji), sekcje
   płatności (zadatek 1 950 zł; pozostała część czynszu 4 550 zł do 04.07.2027 — „oczekuje" do stanu
   umowa-podpisana, od wydana „wpłynęła 02.07.2027"; kaucja 5 000 zł, w zwrocona i rozliczona z
   terminem zwrotu 28.07.2027), umowy (z listą załączników 1–5), protokołów, kaucji, kierowców
   (najemca + kolejny kierowca) i „Wysłane powiadomienia". 8 wariantów ?stan= (wstepna,
   potwierdzona, umowa-wyslana, umowa-podpisana, wydana, zwrocona, rozliczona, wygasla) przez CC.stan();
   w każdym wariancie odpowiednie kroki odhaczone, właściwy główny przycisk i lista powiadomień.
   Główne przyciski prowadzą według pkt 8 backlogu, m.in.:
   wstepna → okno zadatku (jak w P2); potwierdzona → „Wyślij umowę" → ?stan=umowa-wyslana;
   umowa-wyslana → „Otwórz jako klient" ../umowa/umowa.html; umowa-podpisana → „Rozpocznij wydanie"
   ../wydanie/wydanie.html; wydana → „Rozpocznij zwrot" ../zwrot/zwrot.html; zwrocona → „Rozlicz
   kaucję" ../zwrot/rozliczenie.html. Podglądy: ../umowa/umowa-podpisana.html, ../wydanie/podglad.html.
   Wariant wstepna ma też „Symuluj upływ terminu" → ?stan=wygasla.
2. P2 — „Do potwierdzenia" z prośbą Ani K. (klient, telefon, pojazd, daty, „ważna do 15.03.2027",
   „Potwierdź", „Odrzuć"); „Potwierdź" otwiera modal zadatku (1 950 zł, data, przelew/gotówka,
   „Termin wpłaty: 3 dni od potwierdzenia (do 16.03.2027)"),
   „Zapisz" prowadzi do rezerwacja.html?stan=potwierdzona; poniżej lista kilkunastu rezerwacji sezonu
   z filtrami po statusie i pojeździe (wystarczy wizualnie; proste filtrowanie w JS mile widziane).
3. P1 — oś czasu: 6 pojazdów w wierszach, dni lipca 2027 w kolumnach, kilkanaście pasków w kolorach
   statusów z nazwiskami, legenda, licznik „1 prośba do potwierdzenia", „Dodaj rezerwację".
   Warianty ?stan=wstepna (domyślny, żółty pasek Ani K.), potwierdzona (czerwony), wygasla (brak paska).
   Klik w pasek Ani K. otwiera rezerwacja.html w odpowiednim stanie. Siatkę możesz rysować w JS
   z małej tablicy danych w swoim katalogu. Jeśli zostanie czas: przełączanie czerwiec/lipiec/sierpień.
4. P4 — formularz ręcznej rezerwacji z widocznym przykładowym ostrzeżeniem o kolizji terminów.

Zasady: edytujesz tylko swoje pliki; nowe pliki tylko w panel/. Nie zmieniasz assets/, index.html
ani docs/ — jeśli czegoś brakuje, obejdź to w swoim katalogu i opisz w podsumowaniu. Wartości
z pkt 4.1 backlogu. Bez logiki — wszystko wpisane na sztywno. Nie zadawaj pytań: przy wątpliwości
przyjmij rozsądne założenie i opisz je w podsumowaniu. Liczy się szybkość.

Na koniec: pliki otwierają się bez błędów w konsoli, linki prowadzą tam, gdzie mówi pkt 8 backlogu,
zmiany zacommitowane na feature/panel. W podsumowaniu: co zrobione, co pominięte, jakie założenia
przyjąłeś i czego brakowało we wspólnych plikach.
```

### Prompt 3 — Umowa online (`../cc-umowa`)

```text
Pracujesz nad makietą MVP CamperConnect (czysty HTML + CSS + mały JS) razem z czterema innymi
agentami, każdy w swoim obszarze. Przeczytaj docs/KONTRAKT.md oraz docs/CC_Makieta_MVP_Backlog.md
(punkty 3, 4, 4.1, 5, 6, 8 i epik E3) i w całości docs/CC_Dokumenty_Wypozyczalni.md.

Twój obszar: umowa/umowa.html (K2) i umowa/umowa-podpisana.html (K2a). Gałąź: feature/umowa
(jesteś już na niej, w osobnym worktree). Projektuj pod telefon.

Treść dokumentów jest w docs/CC_Dokumenty_Wypozyczalni.md — oparta na prawdziwej umowie, regulaminie
i cenniku działającej wypożyczalni. Zachowaj ich numerację i brzmienie, nie wymyślaj własnych zapisów
i nie zmieniaj kwot. Dane stron i najmu — pkt 2 tego pliku i pkt 4.1 backlogu.

Zbuduj E3-1 do E3-3:
- K2: podsumowanie najmu (pojazd, daty z godzinami, czynsz, zadatek wpłacony, pozostała część
  czynszu do 04.07.2027, kaucja w dniu odbioru);
- formularz według rozdziału V umowy: najemca (imię i nazwisko, adres, PESEL, seria i numer dowodu,
  numer i kategoria prawa jazdy), kolejny kierowca (imię i nazwisko, numer prawa jazdy), osoby
  korzystające z pojazdu, przewidywana trasa, osoba do kontaktu (imię i nazwisko, telefon);
  bez zdjęć dokumentów; przycisk „Wypełnij przykładowymi danymi" (pkt 2 dokumentów);
- trzy dokumenty jako osobne, przewijane sekcje (tresc-przewijana), każda z własnym polem akceptacji
  pod spodem: Umowa najmu nr R-2027-014 (pkt 3, cała), Regulamin wynajmu — zał. nr 1 (pkt 4),
  Cennik usług dodatkowych i kar — zał. nr 4 (pkt 5, tabela 30 pozycji); OWU — zał. nr 2 jako link
  z komunikatem „W makiecie bez pliku"; na telefonie sekcje mogą być zwijane;
- pięć pól akceptacji z pkt 7 dokumentów (wszystkie required), podpis palcem (komponent
  z assets/app.js) z dopiskiem „Podpis obejmuje umowę oraz załączniki nr 1 i 4", „Podpisuję"
  prowadzi do K2a; podpis zapisz przez CC.zapisz('cc-umowa-podpis', …);
- K2a: „Umowa podpisana, kopia PDF wysłana na e-mail" i widok do druku: umowa z wypełnionymi danymi,
  podpisami (najemcy z localStorage, inaczej przykładowy; wynajmującego przykładowy) i adnotacją
  „Podpisano elektronicznie 14.03.2027, 19:12", a za nią regulamin i cennik jako załączniki
  z tą samą adnotacją; link „Wróć do panelu" do ../panel/rezerwacja.html?stan=umowa-podpisana.

Zasady: edytujesz tylko swoje pliki; nowe pliki tylko w umowa/. Nie zmieniasz assets/, index.html
ani docs/ — jeśli czegoś brakuje, obejdź to w swoim katalogu i opisz w podsumowaniu. Wartości
z pkt 4.1 backlogu. Bez logiki — wszystko wpisane na sztywno. Nie zadawaj pytań: przy wątpliwości
przyjmij rozsądne założenie i opisz je w podsumowaniu. Liczy się szybkość.

Na koniec: pliki otwierają się bez błędów w konsoli i wygodnie w szerokości telefonu, linki prowadzą
tam, gdzie mówi pkt 8 backlogu, zmiany zacommitowane na feature/umowa. W podsumowaniu: co zrobione,
co pominięte, jakie założenia przyjąłeś i czego brakowało we wspólnych plikach.
```

### Prompt 4 — Protokół wydania (`../cc-wydanie`)

```text
Pracujesz nad makietą MVP CamperConnect (czysty HTML + CSS + mały JS) razem z czterema innymi
agentami, każdy w swoim obszarze. Przeczytaj docs/KONTRAKT.md oraz docs/CC_Makieta_MVP_Backlog.md
(punkty 3, 4, 4.1, 5, 6, 8 i epik E4) i docs/CC_Dokumenty_Wypozyczalni.md (punkty 1, 2 i 6).

Twój obszar: wydanie/wydanie.html (M1) i wydanie/podglad.html (M1a). Gałąź: feature/wydanie
(jesteś już na niej, w osobnym worktree). Projektuj pod telefon.

Protokół odwzorowuje prawdziwy protokół zdawczo-odbiorczy wypożyczalni (pkt 6 dokumentów): ta sama
lista wyposażenia z ilościami, te same punkty instruktażu i oświadczenia najemcy. Nie dopisuj
własnych pozycji.

Zbuduj kreator ze wspólnej powłoki kreatora, w tej kolejności:
1. Wyposażenie: lista z pkt 6 w grupach (klucze i dokumenty, na zewnątrz, wnętrze, dodatkowe płatne
   — niezamówione, materiały eksploatacyjne), przy każdej pozycji ilość i pole odhaczenia;
   na dole pole „Oświadczam, iż akceptuję listę wydanego wyposażenia." (najemca).
2. Zdjęcia: 8 wymaganych ujęć (przód, lewy bok, tył, prawy bok, dach, wnętrze, licznik, paliwo),
   dodawanie z aparatu lub pliku z podglądem, licznik „x z 8", „Dalej" zablokowane poniżej 8,
   przycisk „Wypełnij przykładowymi zdjęciami" (assets/img).
3. Stan: przebieg 48 230 km, paliwo 8/8.
4. Instruktaż: 12 punktów „Rozstawienie i użytkowanie" i 6 punktów „Przygotowanie do jazdy" z pkt 6
   do odhaczenia, pod nimi oświadczenie „Oświadczam, że odbyłem instruktaż użytkowania i otrzymałem
   Skróconą Instrukcję Obsługi." — dopóki niezaznaczone, „Dalej" zablokowane (CC.blokujDalej;
   regulamin IX: wydanie wyłącznie po instruktażu).
5. Kaucja i dokumenty: kaucja 5 000 zł, forma gotówka, „przyjęta"; „Czynsz opłacony w całości
   (zadatek 1 950 zł + 4 550 zł)"; pole wydającego „Sprawdzono dowód osobisty i prawo jazdy:
   Anna Kowalska, Tomasz Kowalski" (bez zdjęć dokumentów).
6. Podsumowanie, oświadczenie najemcy „Oświadczam, że stan techniczny pojazdu jest mi znany i nie
   zgłaszam zastrzeżeń innych niż wpisane w protokole." i dwa podpisy palcem (wydający, najemca);
   „Zatwierdź protokół" pokazuje ekran „Protokół podpisany, PDF wysłany do obu stron" z linkami do
   ../panel/rezerwacja.html?stan=wydana i do podglad.html.
Potem: E4-5 (istniejące uszkodzenia: miejsce, opis, zdjęcie zbliżenia), E4-6 (podglad.html jako
widok do druku w układzie papierowego protokołu: nagłówek „Protokół zdawczo-odbiorczy — wydanie",
strony i pojazd, dwukolumnowa tabela wyposażenia z ilością, instruktaż, oświadczenia, zdjęcia,
podpisy i znacznik czasu 11.07.2027, 10:00) i E4-7 (zdjęcia i podpisy zapisywane przez CC.zapisz
pod kluczami opisanymi w docs/KONTRAKT.md — jeśli ich tam nie ma, użyj „cc-wydanie-zdjecia"
i „cc-wydanie-podpisy" i opisz to w podsumowaniu).

Zasady: edytujesz tylko swoje pliki; nowe pliki tylko w wydanie/. Nie zmieniasz assets/, index.html
ani docs/ — jeśli czegoś brakuje, obejdź to w swoim katalogu i opisz w podsumowaniu. Wartości
z pkt 4.1 backlogu. Bez logiki — wszystko wpisane na sztywno. Nie zadawaj pytań: przy wątpliwości
przyjmij rozsądne założenie i opisz je w podsumowaniu. Liczy się szybkość.

Na koniec: pliki otwierają się bez błędów w konsoli, kreator przechodzi w szerokości telefonu,
linki prowadzą tam, gdzie mówi pkt 8 backlogu, zmiany zacommitowane na feature/wydanie.
W podsumowaniu: co zrobione, co pominięte, jakie założenia przyjąłeś i czego brakowało
we wspólnych plikach.
```

### Prompt 5 — Protokół zwrotu i rozliczenie kaucji (`../cc-zwrot`)

```text
Pracujesz nad makietą MVP CamperConnect (czysty HTML + CSS + mały JS) razem z czterema innymi
agentami, każdy w swoim obszarze. Przeczytaj docs/KONTRAKT.md oraz docs/CC_Makieta_MVP_Backlog.md
(punkty 3, 4, 4.1, 5, 6, 8 i epik E5) i docs/CC_Dokumenty_Wypozyczalni.md (punkty 1, 5 i 6).

Twój obszar: zwrot/zwrot.html (M2, telefon) i zwrot/rozliczenie.html (M3, laptop).
Gałąź: feature/zwrot (jesteś już na niej, w osobnym worktree).

Potrącenia opierają się na prawdziwym cenniku usług dodatkowych i kar wypożyczalni (pkt 5 dokumentów):
przy każdej pozycji podaj numer pozycji cennika („Cennik poz. 24"). Lista wyposażenia — jak
w protokole wydania (pkt 6).

Zbuduj kreator ze wspólnej powłoki kreatora, w tej kolejności:
1. Zdjęcia przed/po: dla każdego z 8 ujęć zdjęcie z wydania obok nowego (przykładowe z assets/img;
   przy prawym boku nowe zdjęcie z rysą); „Nowe uszkodzenie" z opisem („rysa na prawym boku,
   ok. 30 cm, do podkładu, wysokość drzwi"); przycisk „Wypełnij przykładowymi zdjęciami".
2. Wyposażenie: lista z pkt 6 w grupach z ilością wydaną i zwróconą; zaznaczony brak jednego
   kompletu kluczyków (wydano 2, zwrócono 1).
3. Stan: przebieg 49 870 km, paliwo 6/8; kontrola według cennika z pkt 6 (czystość wnętrza — poz. 3,
   zwierzę — poz. 4, kaseta toalety — poz. 5, zapach dymu — poz. 11, zbiornik wody — poz. 20,
   zwrot w terminie 21.07.2027, 16:00) — w demo wszystko „w porządku", z kwotą, która byłaby
   naliczona, widoczną obok.
4. Potrącenia: brak paliwa 22 l × 8 zł + 100 zł = 276 zł (poz. 30), brak kompletu kluczyków 300 zł
   (poz. 24), razem 576 zł; pozycja „Rysa prawy bok — do wyceny (poz. 21)"; kaucja 5 000 zł,
   wstępnie do zwrotu 4 424 zł, z adnotacją o pozycji do wyceny i zapisem, że najemca odpowiada
   też za szkody ujawnione po zwrocie (regulamin IX).
5. Podsumowanie i dwa podpisy palcem; „Zatwierdź protokół" pokazuje ekran końcowy z linkiem do
   ../panel/rezerwacja.html?stan=zwrocona.
Rozliczenie (laptop): zestawienie potrąceń z numerami pozycji cennika i zdjęciami przed/po, pole
wyceny rysy (400 zł, „lakierowanie miejscowe według wyceny — poz. 21"), potrącenia razem 976 zł,
zwrot kaucji 4 024 zł, termin zwrotu kaucji 28.07.2027 (7 dni od zwrotu), „Kaucja rozliczona"
prowadzi do ../panel/rezerwacja.html?stan=rozliczona.
Jeśli zostanie czas: E5-6 — gdy w localStorage są zdjęcia z wydania (klucze z docs/KONTRAKT.md,
a jeśli ich tam nie ma: „cc-wydanie-zdjecia"), pokaż je zamiast przykładowych.

Zasady: edytujesz tylko swoje pliki; nowe pliki tylko w zwrot/. Nie zmieniasz assets/, index.html
ani docs/ — jeśli czegoś brakuje, obejdź to w swoim katalogu i opisz w podsumowaniu. Wartości
z pkt 4.1 backlogu. Bez logiki — wszystko wpisane na sztywno. Nie zadawaj pytań: przy wątpliwości
przyjmij rozsądne założenie i opisz je w podsumowaniu. Liczy się szybkość.

Na koniec: pliki otwierają się bez błędów w konsoli, kreator przechodzi w szerokości telefonu,
linki prowadzą tam, gdzie mówi pkt 8 backlogu, zmiany zacommitowane na feature/zwrot.
W podsumowaniu: co zrobione, co pominięte, jakie założenia przyjąłeś i czego brakowało
we wspólnych plikach.
```

---

## 5. Prompt 6 — Domknięcie i demo (uruchom w `camperconnect/`, gdy prompty 1–5 skończą)

```text
Pięciu agentów zbudowało ekrany makiety MVP CamperConnect (czysty HTML + CSS + mały JS) na gałęziach
feature/klient, feature/panel, feature/umowa, feature/wydanie, feature/zwrot (worktree ../cc-*).
Przeczytaj docs/CC_Makieta_MVP_Backlog.md, docs/KONTRAKT.md i docs/CC_Dokumenty_Wypozyczalni.md.
Nie zadawaj mi pytań — przy
wątpliwości przyjmij rozsądne założenie i opisz je w podsumowaniu.

Twoje zadanie:
1. Scal wszystkie pięć gałęzi do main. Agenci edytowali rozłączne pliki, więc konfliktów
   nie powinno być; jeśli są — rozstrzygaj na korzyść docs/KONTRAKT.md.
2. Sprawdź scenariusz z pkt 8 backlogu: każde przejście prowadzi do właściwego pliku i wariantu
   stanu, brak martwych linków (sprawdź wszystkie href w plikach), brak błędów w konsoli.
   Uruchom lokalny serwer (python3 -m http.server) i jeśli masz dostęp do przeglądarki, przeklikaj
   scenariusz na laptopie i w szerokości telefonu.
3. Napraw wszystko, co przerywa scenariusz, i wartości niezgodne z pkt 4.1 backlogu (m.in. potrącenia
   576 / 976 zł, zwrot kaucji 4 424 / 4 024 zł, brak kluczyka 300 zł — także w wzorzec.html).
   Teksty umowy, regulaminu, cennika i protokołu mają się zgadzać z docs/CC_Dokumenty_Wypozyczalni.md.
   Sprawdź, że w żadnym pliku nie ma danych prawdziwej wypożyczalni: porównaj z oryginalnymi PDF-ami
   w katalogu głównym (nazwa firmy, osoby, NIP, adres, numer konta, numer rejestracyjny, VIN)
   i upewnij się, że PDF-y nie są w commicie.
4. Ujednolić wygląd na tyle, żeby całość wyglądała jak jedna aplikacja: nagłówki, przyciski,
   kolory statusów, polskie teksty bez pozostałości po szablonie. Lokalne style agentów, które
   powtarzają się w kilku obszarach, przenieś do assets/style.css.
5. Uzupełnij index.html, jeśli agenci dodali coś, czego mapa nie pokazuje.
6. Wypchnij main i sprawdź, że publiczny adres GitHub Pages pokazuje nową wersję.
   Usuń worktree (git worktree remove ../cc-*), gałęzie feature/* zostaw.

Nie dodawaj nowych funkcji. Na koniec podaj: adres publikacji, listę kroków scenariusza
ze statusem działa / nie działa oraz listę znanych braków wobec backlogu.
```

---

## 6. Jeśli zabraknie czasu

- **Agent 2 się przeciąga:** P3 i P2 są najważniejsze. Kalendarz floty może być prostą tabelą pojazdy × dni bez przewijania; P4 można pominąć.
- **Aparat sprawia kłopoty:** pokaż protokoły na przykładowych zdjęciach — przycisk „Wypełnij przykładowymi" jest w zakresie od początku właśnie po to.
- **Któryś obszar nie jest gotowy:** mapa makiety pozwala ominąć go w pokazie i przejść prosto do kolejnego ekranu.
- **Minimum na pokaz:** K1 → P2 → P3 → K2 → M2 → M3. Protokół wydania można opowiedzieć.
