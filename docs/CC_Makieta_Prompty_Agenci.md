# CamperConnect — makieta MVP w jeden wieczór: prompty dla agentów

**Wersja:** 1.1 (17.11.2026) · **Uzupełnia:** `CC_Makieta_MVP_Backlog.md` v1.1 (zakres, ekrany, dane, statusy, scenariusz demo)

Backlog opisuje, *co* ma powstać. Ten dokument opisuje, *jak* to zrobić w 2–3 godziny: jeden prompt przygotowujący wspólny fundament, pięć promptów uruchamianych równolegle i jeden prompt domykający.

**Zmiany w 1.1:** czysty HTML + CSS + mały JavaScript zamiast Vite/React; brak wspólnego stanu i funkcji store'u; każdy ekran to osobny plik; agenci pracują w osobnych git worktree i nie zadają pytań.

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
(punkty 3, 4, 4.1, 5, 6, 8 i epik E1).

Twój obszar: klient/strona.html (K1) i klient/prosba-wyslana.html (K1a). Gałąź: feature/klient
(jesteś już na niej, w osobnym worktree).

Zbuduj E1-1 do E1-4:
- karty 6 pojazdów ze zdjęciem, ceną za dobę i kaucją; Ducato alkowa wybrany;
- kalendarz lipca 2027 z dniami wolnymi i zajętymi (klient widzi tylko „wolne / zajęte"),
  zaznaczony zakres 11–21.07;
- podsumowanie: 10 dób, 6 500 zł, zadatek 1 950 zł, kaucja 5 000 zł;
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
(punkty 3, 4, 4.1, 5, 6, 8 i epik E2).

Twój obszar: panel/kalendarz.html (P1), panel/rezerwacje.html (P2), panel/rezerwacja.html (P3),
panel/nowa.html (P4). Gałąź: feature/panel (jesteś już na niej, w osobnym worktree).
Panel projektuj pod laptop.

Zbuduj w tej kolejności:
1. P3 — szczegóły najmu demo R-2027-014: dane klienta i najmu, znaczek statusu, pasek kroków
   (prośba → potwierdzenie i zadatek → umowa → wydanie → zwrot → rozliczenie kaucji), sekcje
   zadatku, umowy, protokołów, kaucji i „Wysłane powiadomienia". 8 wariantów ?stan= (wstepna,
   potwierdzona, umowa-wyslana, umowa-podpisana, wydana, zwrocona, rozliczona, wygasla) przez CC.stan();
   w każdym wariancie odpowiednie kroki odhaczone, właściwy główny przycisk i lista powiadomień.
   Główne przyciski prowadzą według pkt 8 backlogu, m.in.:
   wstepna → okno zadatku (jak w P2); potwierdzona → „Wyślij umowę" → ?stan=umowa-wyslana;
   umowa-wyslana → „Otwórz jako klient" ../umowa/umowa.html; umowa-podpisana → „Rozpocznij wydanie"
   ../wydanie/wydanie.html; wydana → „Rozpocznij zwrot" ../zwrot/zwrot.html; zwrocona → „Rozlicz
   kaucję" ../zwrot/rozliczenie.html. Podglądy: ../umowa/umowa-podpisana.html, ../wydanie/podglad.html.
   Wariant wstepna ma też „Symuluj upływ terminu" → ?stan=wygasla.
2. P2 — „Do potwierdzenia" z prośbą Ani K. (klient, telefon, pojazd, daty, „ważna do 15.03.2027",
   „Potwierdź", „Odrzuć"); „Potwierdź" otwiera modal zadatku (1 950 zł, data, przelew/gotówka),
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
(punkty 3, 4, 4.1, 5, 6, 8 i epik E3).

Twój obszar: umowa/umowa.html (K2) i umowa/umowa-podpisana.html (K2a). Gałąź: feature/umowa
(jesteś już na niej, w osobnym worktree). Projektuj pod telefon.

Zbuduj E3-1 do E3-3:
- K2: podsumowanie najmu (pojazd, daty, cena, zadatek, kaucja);
- formularz danych najemcy i kierowcy: imię i nazwisko, adres, PESEL, numer dowodu, numer prawa
  jazdy — bez zdjęć dokumentów; przycisk „Wypełnij przykładowymi danymi" (dane z pkt 4.1);
- przewijana treść umowy najmu, regulaminu i cennika potrąceń z danymi najmu demo, w tym
  zobowiązania przy zwrocie (paliwo, sprzątanie, kaseta, wyposażenie) i zapis o odpowiedzialności
  za szkody ponad wypłatę z ubezpieczenia; tekst ma brzmieć jak prawdziwa umowa, ale krótko;
- pola wyboru „Zapoznałem się z umową…", „Zapoznałem się z regulaminem i cennikiem potrąceń…",
  podpis palcem (komponent z assets/app.js), „Podpisuję" prowadzi do K2a;
- K2a: „Umowa podpisana, kopia PDF wysłana na e-mail" i umowa jako widok do druku z danymi,
  podpisem (jeśli zapisany w localStorage przez CC.zapisz — inaczej przykładowy) i datą 14.03.2027;
  link „Wróć do panelu" do ../panel/rezerwacja.html?stan=umowa-podpisana.

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
(punkty 3, 4, 4.1, 5, 6, 8 i epik E4).

Twój obszar: wydanie/wydanie.html (M1) i wydanie/podglad.html (M1a). Gałąź: feature/wydanie
(jesteś już na niej, w osobnym worktree). Projektuj pod telefon.

Zbuduj kreator ze wspólnej powłoki kreatora, w tej kolejności:
1. Wyposażenie: lista standardowa i dodatkowa z odhaczaniem, materiały eksploatacyjne.
2. Zdjęcia: 8 wymaganych ujęć (przód, lewy bok, tył, prawy bok, dach, wnętrze, licznik, paliwo),
   dodawanie z aparatu lub pliku z podglądem, licznik „x z 8", „Dalej" zablokowane poniżej 8,
   przycisk „Wypełnij przykładowymi zdjęciami" (assets/img).
3. Stan: przebieg 48 230 km, paliwo 8/8.
4. Szkolenie klienta: punkty do odhaczenia.
5. Kaucja: 5 000 zł, forma, „przyjęta".
6. Podsumowanie i dwa podpisy palcem (wydający, najemca); „Zatwierdź protokół" pokazuje ekran
   „Protokół podpisany, PDF wysłany do obu stron" z linkami do ../panel/rezerwacja.html?stan=wydana
   i do podglad.html.
Potem: E4-5 (istniejące uszkodzenia: miejsce, opis, zdjęcie zbliżenia), E4-6 (podglad.html jako
widok do druku ze zdjęciami, listami, podpisami i znacznikiem czasu 11.07.2027, 10:00) i E4-7
(zdjęcia i podpisy zapisywane przez CC.zapisz pod kluczami opisanymi w docs/KONTRAKT.md — jeśli
ich tam nie ma, użyj „cc-wydanie-zdjecia" i „cc-wydanie-podpisy" i opisz to w podsumowaniu).

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
(punkty 3, 4, 4.1, 5, 6, 8 i epik E5).

Twój obszar: zwrot/zwrot.html (M2, telefon) i zwrot/rozliczenie.html (M3, laptop).
Gałąź: feature/zwrot (jesteś już na niej, w osobnym worktree).

Zbuduj kreator ze wspólnej powłoki kreatora, w tej kolejności:
1. Zdjęcia przed/po: dla każdego z 8 ujęć zdjęcie z wydania obok nowego (przykładowe z assets/img;
   przy prawym boku nowe zdjęcie z rysą); „Nowe uszkodzenie" z opisem („rysa na prawym boku,
   ok. 30 cm, wysokość drzwi"); przycisk „Wypełnij przykładowymi zdjęciami".
2. Wyposażenie: lista z wydania z zaznaczaniem braków; zaznaczony brak jednego kompletu kluczy.
3. Stan: przebieg 49 870 km, paliwo 6/8, czystość, kaseta.
4. Potrącenia: paliwo 22 l × 8 zł + 100 zł = 276 zł, brak klucza 60 zł, razem 336 zł; pozycja
   „Rysa prawy bok — do wyceny"; kaucja 5 000 zł, wstępnie do zwrotu 4 664 zł, z adnotacją
   o pozycji do wyceny.
5. Podsumowanie i dwa podpisy palcem; „Zatwierdź protokół" pokazuje ekran końcowy z linkiem do
   ../panel/rezerwacja.html?stan=zwrocona.
Rozliczenie (laptop): zestawienie potrąceń ze zdjęciami przed/po, pole wyceny rysy (400 zł),
potrącenia razem 736 zł, zwrot kaucji 4 264 zł, „Kaucja rozliczona" prowadzi do
../panel/rezerwacja.html?stan=rozliczona.
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
Przeczytaj docs/CC_Makieta_MVP_Backlog.md i docs/KONTRAKT.md. Nie zadawaj mi pytań — przy
wątpliwości przyjmij rozsądne założenie i opisz je w podsumowaniu.

Twoje zadanie:
1. Scal wszystkie pięć gałęzi do main. Agenci edytowali rozłączne pliki, więc konfliktów
   nie powinno być; jeśli są — rozstrzygaj na korzyść docs/KONTRAKT.md.
2. Sprawdź scenariusz z pkt 8 backlogu: każde przejście prowadzi do właściwego pliku i wariantu
   stanu, brak martwych linków (sprawdź wszystkie href w plikach), brak błędów w konsoli.
   Uruchom lokalny serwer (python3 -m http.server) i jeśli masz dostęp do przeglądarki, przeklikaj
   scenariusz na laptopie i w szerokości telefonu.
3. Napraw wszystko, co przerywa scenariusz, i wartości niezgodne z pkt 4.1 backlogu.
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
