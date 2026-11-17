# CamperConnect — makieta MVP 1.1: zakres i backlog

**Wersja:** 1.2 (17.11.2026) · **Termin makiety:** 18.11.2026 (jeden dzień pracy) · **Podstawa:** `CC_MVP_Faza1.md` v1.1, `CC_Proces_Przed_Po.md` v1.1, `CC_Wywiad_Robert_Sekula.md`, `CC_Dokumenty_Wypozyczalni.md` v1.0

Ten dokument jest wejściem do pracy z Claude Code. Opisuje, czym jest produkt, co dokładnie ma pokazać makieta, jakie ma mieć ekrany i w jakiej kolejności je zbudować.

**Zmiany w 1.1:** makieta to zestaw statycznych ekranów w czystym HTML + CSS + odrobina JavaScriptu, a nie aplikacja z logiką. Pokazujemy, jak ekrany wyglądają i co na nich jest; nic się naprawdę nie wylicza ani nie zapisuje. Dodane: mapa makiety (`index.html`), ekran „Prośba wysłana", wartości kanoniczne (pkt 4.1), warianty stanów ekranu szczegółów rezerwacji.

**Zmiany w 1.2:** umowa, regulamin, cennik i protokół oparte na prawdziwych dokumentach wypożyczalni (`CC_Dokumenty_Wypozyczalni.md`). Nowy cennik potrąceń, lista wyposażenia i punkty instruktażu; brak kluczyka 300 zł zamiast 60 zł, więc zmieniają się sumy potrąceń i zwrot kaucji; zwrot o 16:00; dodani kolejny kierowca, osoby korzystające, trasa, osoba kontaktowa i dopłata czynszu.

---

## 1. Kontekst w pięciu zdaniach

- CamperConnect to narzędzie dla małych wypożyczalni kamperów i przyczep kempingowych (flota 2–15 pojazdów), które dziś pracują na zeszycie, telefonie i papierze.
- MVP nie jest samoobsługową rezerwacją dla klienta. Wypożyczalnia prowadzi w nim cały najem, a decyzja „komu wynajmuję" zostaje u właściciela.
- MVP ma trzy elementy: kalendarz z wstępną rezerwacją potwierdzaną przez właściciela, umowa online, checklisty i fotoprotokół wydania i zwrotu.
- Makieta służy do rozmów z właścicielami wypożyczalni (pierwszy pokaz: środa/czwartek, 18–19.11.2026) i ma doprowadzić do podpisania porozumień pilotażowych.
- Makieta nie jest produktem: to klikalne ekrany z przykładowymi danymi — bez logiki, backendu, płatności, wysyłki e-maili i logowania.

## 2. Cel makiety i priorytet: szybkość

**Makieta ma powstać jutro (18.11.2026).** Każda decyzja techniczna ma temu służyć.

- Liczy się klikalna ścieżka jednego najmu od prośby o termin do rozliczenia kaucji: każdy ekran wygląda jak prawdziwy, a przycisk prowadzi do następnego ekranu.
- Niczego nie liczymy ani nie symulujemy w kodzie. Kwoty, daty, statusy i powiadomienia są wpisane na ekranach na sztywno, spójnie z punktem 4.1.
- Najpierw wszystkie ekrany „po łebkach", potem dopracowanie. Lepiej czternaście prostych ekranów niż pięć dopieszczonych.
- Zadania z etykietą `P0` muszą być gotowe jutro. `P1` robimy tylko, jeśli zostanie czas. `P2` to pomysły na później.

**Po czym poznamy, że makieta jest gotowa:** da się bez tłumaczenia „co by tu było" przeklikać scenariusz demo z punktu 8, na laptopie (panel) i na telefonie (protokoły, umowa), pod publicznym adresem. Każdy ekran pokazuje komplet informacji, które będą w produkcie.

## 3. Założenia techniczne

- **Czysty HTML + CSS + mały JavaScript.** Bez frameworków, bez npm, bez kroku budowania. Strona działa po otwarciu pliku z dysku i z hostingu statycznego.
- **Jeden ekran = jeden plik `.html`.** Przejścia między ekranami to zwykłe linki. Warianty stanu jednego ekranu wybiera parametr w adresie (np. `rezerwacja.html?stan=wydana`), a mały skrypt na tej stronie pokazuje odpowiednie elementy.
- **Wspólne pliki w `assets/`:**
  - `style.css` — paleta (zmienne CSS, jasna kolorystyka), typografia, przyciski, karty, formularze, tabele, znaczki statusów, kreator krok po kroku, okno modalne, komunikat (toast), widok do druku, układ panelu (laptop) i układ mobilny;
  - `app.js` — wspólny nagłówek makiety, okno modalne, komunikat, pole podpisu, pole zdjęcia, kreator, odczyt parametru `stan`;
  - `img/` — zdjęcia zastępcze pojazdów i ujęć do protokołów (proste SVG).
- **JavaScript tylko tam, gdzie daje wrażenie prawdziwej aplikacji:** podpis palcem lub myszką na `canvas`, aparat przez `input type="file" accept="image/*" capture="environment"` z podglądem, przełączanie kroków kreatora, okna modalne, komunikat „PDF wysłany", przełączanie wariantów stanu, rysowanie siatek kalendarzy z małej tablicy danych.
- **Bez logiki:** brak wyliczania dostępności, cen i potrąceń, brak walidacji poza atrybutem `required`, brak wykrywania kolizji, wygasania i przejść statusów, brak resetu.
- **`localStorage` (P1, opcjonalnie):** zdjęcia i podpisy zrobione w protokole wydania zapamiętane, żeby protokół zwrotu pokazał je obok nowych. Gdy pusto — zdjęcia przykładowe.
- **Responsywność:** panel projektowany pod laptop; strona klienta, umowa i protokoły — mobile-first.
- **Język interfejsu:** polski. Format dat: `11.07.2027`, kwoty: `1 950 zł`.
- **Publikacja:** GitHub Pages z gałęzi `main` (publiczne repozytorium). Każdy ekran to plik, więc nie ma problemu z adresami.

## 4. Dane przykładowe

Spójne z `CC_Proces_Przed_Po.md`, żeby makieta i opowieść o procesie mówiły o tym samym najmie.

- **Wypożyczalnia:** „Kamper na Mazury", Giżycko, właściciel Marek Wiśniewski. Ważność wstępnej rezerwacji: 3 dni. Zadatek: 30% w ciągu 3 dni od potwierdzenia, reszta czynszu 7 dni przed wydaniem, kaucja w dniu wydania. Dane do umowy: `CC_Dokumenty_Wypozyczalni.md`, pkt 2.
- **Flota (6 pojazdów):**

| Pojazd | Typ | Cena / doba | Kaucja |
|---|---|---|---|
| Ducato alkowa | kamper | 650 zł | 5 000 zł |
| Ducato półintegra | kamper | 600 zł | 5 000 zł |
| Hymer Exsis | kamper | 700 zł | 5 000 zł |
| Ford Nugget | kamper | 500 zł | 4 000 zł |
| Knaus Sport 450 | przyczepa | 250 zł | 2 000 zł |
| Niewiadów N126 | przyczepa | 200 zł | 2 000 zł |

- **Sezon w danych:** czerwiec–sierpień 2027, kilkanaście rezerwacji w różnych statusach na wszystkich pojazdach, żeby kalendarz nie był pusty. Termin 11–21.07.2027 dla Ducato alkowa jest zarezerwowany dla najmu demo.
- **Dokumenty wypożyczalni:** treść umowy, regulaminu, cennika i protokołu — `CC_Dokumenty_Wypozyczalni.md` (oparte na prawdziwych dokumentach, bez danych prawdziwej firmy).
- **Cennik usług dodatkowych i kar:** 30 pozycji — `CC_Dokumenty_Wypozyczalni.md`, pkt 5. Najważniejsze w demo: brak paliwa 8 zł/l + 100 zł (poz. 30), zgubienie kluczyka 300 zł (poz. 24), brudne wnętrze 100 zł (poz. 3), brudna kaseta 100 zł (poz. 5), sprzątanie po zwierzętach 250 zł (poz. 4), palenie 4 000 zł (poz. 11), rysy 150 zł/mb (poz. 19), inne naprawy według faktur (poz. 21).
- **Wyposażenie:** lista z protokołu zdawczo-odbiorczego w grupach: klucze i dokumenty, na zewnątrz, wnętrze, dodatkowe płatne, materiały eksploatacyjne — `CC_Dokumenty_Wypozyczalni.md`, pkt 6.
- **Instruktaż:** 12 punktów „rozstawienie i użytkowanie" i 6 punktów „przygotowanie do jazdy" — `CC_Dokumenty_Wypozyczalni.md`, pkt 6.

### 4.1. Wartości kanoniczne najmu demo

Wszystkie ekrany pokazują dokładnie te wartości.

| Pole | Wartość |
|---|---|
| Numer rezerwacji | R-2027-014 |
| Klient | Anna Kowalska („Ania K."), tel. 600 123 456, anna.kowalska@example.com |
| Wynajmujący | Kamper na Mazury Marek Wiśniewski, ul. Jeziorna 5, 11-500 Giżycko, NIP 000-000-00-00 |
| Wiadomość klienta | „Jedziemy z dwójką dzieci, czy można zabrać psa?" |
| Pojazd | Ducato alkowa, nr rej. NGI 4K27, bak 88 l |
| Termin | 11.07.2027 – 21.07.2027, 10 dób |
| Cena | 10 × 650 zł = 6 500 zł |
| Zadatek | 1 950 zł (30%), przelew, odnotowany 13.03.2027 (termin: 16.03.2027) |
| Pozostała część czynszu | 4 550 zł, termin 04.07.2027, wpłynęła 02.07.2027 |
| Kaucja | 5 000 zł, gotówka, przyjęta przy wydaniu |
| Prośba wysłana | 12.03.2027, 21:40; ważna do 15.03.2027 |
| Umowa wysłana / podpisana | 13.03.2027 / 14.03.2027, 19:12 |
| Dane najemcy | ul. Lipowa 12/4, 02-345 Warszawa; PESEL 85010112345; dowód ABC 123456; prawo jazdy 01234/12/1234, kat. B od 2012 |
| Kolejny kierowca | Tomasz Kowalski, prawo jazdy 04567/09/1234, kat. B od 2009 |
| Osoby korzystające | Tomasz Kowalski, dwoje dzieci (8 i 5 lat), pies |
| Trasa / kontakt | Mazury: Giżycko – Mikołajki – Ruciane-Nida; kontakt: Ewa Kowalska, 601 222 333 |
| Wydanie | 11.07.2027, 10:00; przebieg 48 230 km; paliwo 8/8 |
| Zwrot | 21.07.2027, 16:00; przebieg 49 870 km; paliwo 6/8 |
| Ustalenia przy zwrocie | nowa rysa na prawym boku; brak jednego kompletu kluczy; paliwo 6/8 (brakuje 22 l) |
| Potrącenia automatyczne | paliwo 22 l × 8 zł + 100 zł = 276 zł (cennik poz. 30); brak kompletu kluczyków 300 zł (poz. 24); razem 576 zł; wstępnie do zwrotu 4 424 zł |
| Pozycja „do wyceny" | rysa prawy bok, ok. 30 cm, do podkładu (poz. 21) — wycena w rozliczeniu: 400 zł |
| Rozliczenie | potrącenia 976 zł; zwrot kaucji 4 024 zł; rozliczona 23.07.2027 (termin zwrotu kaucji: 28.07.2027) |

## 5. Statusy rezerwacji

Statusy są elementem wyglądu: znaczek w kolorze, kolor paska w kalendarzu, legenda. Nie ma kodu, który je przestawia — każdy ekran pokazuje swój stan.

| Status | Kiedy | Kolor w kalendarzu |
|---|---|---|
| Wstępna | klient wysłał prośbę; blokuje termin do daty ważności | żółty |
| Wygasła / Odrzucona | minął termin bez potwierdzenia albo właściciel odrzucił; termin wraca jako wolny | brak (wolne) |
| Potwierdzona | właściciel potwierdził i odnotował zadatek | czerwony |
| Umowa wysłana | link do umowy poszedł do klienta | czerwony |
| Umowa podpisana | klient podpisał | czerwony |
| Wydana | podpisany protokół wydania | czerwony |
| Zwrócona | podpisany protokół zwrotu, kaucja do rozliczenia | czerwony |
| Rozliczona | kaucja rozliczona | szary |

Klient w kalendarzu widzi tylko: wolne / zajęte.

## 6. Ekrany makiety

**M0. Mapa makiety** (`index.html`)
- Krótko: czym jest CamperConnect; przycisk „Zacznij scenariusz demo" (prowadzi do K1).
- Spis wszystkich ekranów pogrupowany: strona klienta, panel (laptop), telefon właściciela; przy szczegółach rezerwacji linki do każdego wariantu stanu.
- Na każdym ekranie wspólny nagłówek makiety: „Mapa makiety", przełącznik „Strona wypożyczalni / Panel".

### Strona klienta

**K1. Kalendarz i prośba o termin** (`klient/strona.html`)
- Lista pojazdów ze zdjęciem, ceną za dobę i kaucją; wybrany „Ducato alkowa".
- Kalendarz miesięczny (lipiec 2027) z dniami wolnymi i zajętymi; zaznaczony zakres 11–21.07.
- Podsumowanie: 10 dób, 6 500 zł, zadatek 1 950 zł, kaucja 5 000 zł.
- Formularz: imię i nazwisko, telefon, e-mail, opcjonalna wiadomość; przycisk „Wypełnij przykładowymi danymi".
- Linia warunków (zadatek 30% w 3 dni od potwierdzenia, reszta 7 dni przed odbiorem, kaucja w dniu odbioru) i link „Regulamin wynajmu" (okno ze skrótem regulaminu).
- „Wyślij prośbę o termin" prowadzi do K1a. Na ekranie nie ma płatności ani automatycznego potwierdzenia.

**K1a. Prośba wysłana** (`klient/prosba-wyslana.html`)
- „Wstępna rezerwacja przyjęta. Termin zablokowany do 15.03.2027. Wypożyczalnia skontaktuje się z Tobą."
- Podsumowanie prośby. W makiecie link „Zobacz to w panelu wypożyczalni" do P2.

**K2. Umowa do podpisu** (`umowa/umowa.html`, link z e-maila, telefon klienta)
- Podsumowanie najmu: pojazd, daty, cena, zadatek, kaucja.
- Formularz według rozdziału V umowy: najemca (imię i nazwisko, adres, PESEL, numer dowodu, numer i kategoria prawa jazdy), kolejny kierowca, osoby korzystające z pojazdu, przewidywana trasa, osoba do kontaktu. Bez zdjęć dokumentów. Przycisk „Wypełnij przykładowymi danymi".
- Trzy przewijane dokumenty, każdy z własnym polem akceptacji: umowa najmu, regulamin wynajmu (zał. 1), cennik usług dodatkowych i kar (zał. 4); OWU jako link. Treść: `CC_Dokumenty_Wypozyczalni.md`, pkt 3–5 i 7.
- Pięć pól akceptacji, jeden podpis palcem („obejmuje umowę oraz załączniki nr 1 i 4"), przycisk „Podpisuję" prowadzi do K2a.

**K2a. Umowa podpisana** (`umowa/umowa-podpisana.html`)
- Potwierdzenie „Umowa podpisana, kopia PDF wysłana na e-mail" i podgląd umowy jako widok do druku z danymi, podpisem i datą (14.03.2027, 19:12), z regulaminem i cennikiem jako załącznikami. Ten sam widok otwierany z panelu (link z P3).
- W makiecie link „Wróć do panelu" do P3 w stanie „Umowa podpisana".

### Panel wypożyczalni (laptop)

**P1. Kalendarz floty** (`panel/kalendarz.html`)
- Oś czasu: 6 pojazdów w wierszach, dni w kolumnach (lipiec 2027, strzałki miesięcy przełączają czerwiec / lipiec / sierpień), rezerwacje jako paski w kolorze statusu z nazwiskiem klienta; legenda statusów.
- Kliknięcie paska najmu demo otwiera P3.
- Przycisk „Dodaj rezerwację" (P4) i licznik „1 prośba do potwierdzenia".
- Warianty: `?stan=wstepna` (żółty pasek Ani K. z „ważna do 15.03") — domyślny, `?stan=potwierdzona` (czerwony), `?stan=wygasla` (pasek znika, termin wolny).

**P2. Lista próśb i rezerwacji** (`panel/rezerwacje.html`)
- Na górze „Do potwierdzenia": klient, telefon, pojazd, daty, „ważna do", przyciski „Potwierdź" i „Odrzuć".
- „Potwierdź" otwiera okno: kwota zadatku (1 950 zł), data, forma (przelew / gotówka); „Zapisz" prowadzi do P3 w stanie „Potwierdzona".
- Niżej wszystkie rezerwacje sezonu z filtrem po statusie i pojeździe (filtr wizualny).

**P3. Szczegóły rezerwacji** (`panel/rezerwacja.html?stan=…`)
- Dane klienta i najmu, znaczek statusu.
- Pasek kroków najmu: prośba → potwierdzenie i zadatek → umowa → wydanie → zwrot → rozliczenie kaucji; zrobione kroki odhaczone, następny krok jako główny przycisk.
- Sekcje: płatności (zadatek 1 950 zł; pozostała część czynszu 4 550 zł do 04.07.2027 — „oczekuje" do stanu `umowa-podpisana`, od `wydana` „wpłynęła 02.07.2027"; kaucja); umowa (status, „Wyślij umowę", „Otwórz jako klient", podgląd, lista załączników 1–5); protokoły (przyciski „Rozpocznij wydanie", „Rozpocznij zwrot", podglądy); kaucja (przyjęta / do zwrotu / rozliczona, z kwotami); „Wysłane powiadomienia" (lista e-maili i SMS-ów adekwatna do stanu).
- Warianty `stan`: `wstepna`, `potwierdzona`, `umowa-wyslana`, `umowa-podpisana`, `wydana`, `zwrocona`, `rozliczona`, `wygasla`. Główny przycisk prowadzi do następnego ekranu scenariusza (pkt 8).

**P4. Dodanie rezerwacji ręcznie** (`panel/nowa.html`)
- Formularz: pojazd, daty, dane klienta, od razu jako wstępna lub potwierdzona.
- Widoczne przykładowe ostrzeżenie o kolizji terminów („Ducato alkowa jest zajęty 11–21.07.2027 — Anna Kowalska").

### Panel wypożyczalni (telefon)

**M1. Protokół wydania** (`wydanie/wydanie.html`) — kreator krok po kroku
1. Wyposażenie: lista z protokołu w grupach, z ilością i odhaczaniem, materiały eksploatacyjne; oświadczenie „akceptuję listę wydanego wyposażenia".
2. Zdjęcia: wymagane ujęcia (przód, lewy bok, tył, prawy bok, dach, wnętrze, licznik, paliwo); dodawanie z aparatu lub pliku z podglądem; licznik „x z 8"; „Dalej" nieaktywne poniżej 8; przycisk „Wypełnij przykładowymi zdjęciami".
3. Stan: przebieg, poziom paliwa.
4. Instruktaż: 12 + 6 punktów do odhaczenia; oświadczenie o odbytym instruktażu i otrzymaniu instrukcji — bez niego „Dalej" nieaktywne.
5. Kaucja i dokumenty: kaucja 5 000 zł, forma, „przyjęta"; czynsz opłacony w całości; „sprawdzono dowód i prawo jazdy" najemcy i kolejnego kierowcy.
6. Podsumowanie, oświadczenie najemcy o stanie technicznym i podpisy palcem obu stron; ekran „Protokół podpisany, PDF wysłany do obu stron" z linkiem do P3 w stanie „Wydana".

**M1a. Podgląd protokołu wydania** (`wydanie/podglad.html`) — widok do druku w układzie papierowego protokołu zdawczo-odbiorczego: lista wyposażenia z ilością, instruktaż, oświadczenia, zdjęcia, podpisy i znacznik czasu.

**M2. Protokół zwrotu** (`zwrot/zwrot.html`) — kreator krok po kroku
1. Zdjęcia: przy każdym ujęciu zdjęcie z wydania obok nowego; przy prawym boku widoczna rysa; przycisk „Nowe uszkodzenie" z opisem.
2. Wyposażenie: lista z wydania z ilością wydaną i zwróconą, zaznaczony brak kompletu kluczyków.
3. Stan: przebieg, paliwo 6/8; kontrola według cennika (czystość, zwierzę, kaseta, dym, zbiornik wody, terminowość) — w demo wszystko w porządku.
4. Potrącenia: pozycje z numerami z cennika i kwotami z pkt 4.1, pozycja „do wyceny", suma, kwota kaucji do zwrotu.
5. Podsumowanie i podpisy obu stron; link do P3 w stanie „Zwrócona".

**M3. Rozliczenie kaucji** (`zwrot/rozliczenie.html`, laptop)
- Zestawienie potrąceń z numerami pozycji cennika i zdjęciami przed/po, pole wyceny rysy (400 zł), kwota do zwrotu 4 024 zł, termin zwrotu kaucji 28.07.2027, „Kaucja rozliczona" prowadzi do P3 w stanie „Rozliczona".

## 7. Czego w makiecie nie ma

Świadomie poza zakresem — nie budować, nawet jeśli wydaje się proste:

- jakakolwiek logika: wyliczanie dostępności, cen, potrąceń, walidacja danych, wykrywanie kolizji, wygasanie, przejścia statusów, zapis stanu i reset,
- frameworki, npm, krok budowania,
- płatności online i automatyczne potwierdzanie rezerwacji,
- przesyłanie zdjęć dokumentów, weryfikacja kierowcy, integracje CEPiK/KYC,
- kaucja w depozycie, preautoryzacja kart,
- logowanie, konta użytkowników, role, wiele wypożyczalni,
- prawdziwa wysyłka e-maili i SMS-ów, prawdziwe generowanie PDF, prawdziwy podpis elektroniczny,
- backend, baza danych, synchronizacja między urządzeniami,
- edytor wzorów umów, konfiguracja floty i cenników z poziomu panelu,
- marketplace, ubezpieczenia, wersje językowe.

## 8. Scenariusz demo (ścieżka do przeklikania przed rozmówcą)

| # | Kto, kiedy | Ekrany | Przejście |
|---|---|---|---|
| 1 | Klient, wieczór | M0 → K1 → K1a | „Zacznij scenariusz demo", „Wyślij prośbę o termin" |
| 2 | Właściciel, rano | P1 `?stan=wstepna` → P2 | żółty pasek z datą ważności, licznik próśb |
| 3 | Po rozmowie telefonicznej | P2 (okno zadatku) → P3 `potwierdzona` → P1 `?stan=potwierdzona` | „Potwierdź", „Zapisz"; pasek czerwony |
| 4 | Umowa | P3 `umowa-wyslana` → K2 → K2a → P3 `umowa-podpisana` | „Wyślij umowę", „Otwórz jako klient", „Podpisuję" |
| 5 | Wydanie (telefon) | M1 → P3 `wydana` | „Rozpocznij wydanie", dwa podpisy |
| 6 | Zwrot (telefon) | M2 → P3 `zwrocona` | „Rozpocznij zwrot"; rysa, brak klucza, paliwo 6/8 |
| 7 | Rozliczenie | M3 → P3 `rozliczona` | „Rozlicz kaucję", wycena 400 zł, „Kaucja rozliczona" |
| 8 | Na koniec | P1 → P3 `wygasla` → P1 `?stan=wygasla` | cały sezon; niepotwierdzona prośba wygasa i zwalnia termin |

Na telefonie rozmówcy można otworzyć dowolny ekran z mapy makiety — każdy ekran jest samodzielny.

## 9. Backlog

### Etykiety

- **Priorytet:** `P0` — musi być jutro; `P1` — jeśli zostanie czas; `P2` — później.
- **Widok:** `klient`, `panel`, `mobile`.
- **Typ:** `setup`, `ui`, `js`, `dane`, `demo`.
- **Szacunek:** S (do 30 min), M (30–60 min), L (1–2 h) — czas pracy z Claude Code.

### Epik E0 — Fundament

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E0-1 | Projekt i publikacja | Struktura katalogów z pkt 3; publiczne repozytorium; GitHub Pages z `main`; strona otwiera się na telefonie | `P0` `setup` | S |
| E0-2 | Wspólny styl | `assets/style.css`: paleta, typografia, przyciski, karty, formularze, tabele, znaczki 8 statusów, kreator, modal, toast, widok do druku, układ panelu i mobilny | `P0` `ui` | M |
| E0-3 | Wspólne skrypty | `assets/app.js`: nagłówek makiety, modal, toast, podpis, zdjęcie, kreator, odczyt `stan` | `P0` `js` | M |
| E0-4 | Szkielet ekranów i mapa | Wszystkie pliki z pkt 6 z nagłówkiem i nazwą ekranu; `index.html` z mapą makiety; wzorcowy ekran do kopiowania | `P0` `setup` `ui` | S |
| E0-5 | Zdjęcia zastępcze i kontrakt | SVG pojazdów i 8 ujęć (plus prawy bok z rysą); `docs/KONTRAKT.md` | `P0` `dane` | S |

### Epik E1 — Strona klienta

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E1-1 | Lista pojazdów | Karty 6 pojazdów ze zdjęciem, ceną i kaucją; Ducato alkowa wybrany | `P0` `klient` `ui` | S |
| E1-2 | Kalendarz dostępności | Lipiec 2027, dni wolne / zajęte, zaznaczony zakres 11–21.07 | `P0` `klient` `ui` | S |
| E1-3 | Podsumowanie i formularz | Doby, cena, zadatek, kaucja; formularz z „Wypełnij przykładowymi danymi" | `P0` `klient` `ui` | S |
| E1-4 | Prośba wysłana | Ekran K1a z datą ważności i linkiem do panelu | `P0` `klient` `ui` | S |

### Epik E2 — Panel

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E2-1 | Lista próśb i rezerwacji | Sekcja „Do potwierdzenia", lista sezonu, filtry wizualne | `P0` `panel` `ui` | S |
| E2-2 | Okno zadatku | Modal z kwotą, datą i formą; „Zapisz" prowadzi do P3 `potwierdzona` | `P0` `panel` `ui` | S |
| E2-3 | Szczegóły rezerwacji | Wszystkie sekcje P3; pasek kroków; 8 wariantów `stan` z właściwym głównym przyciskiem i powiadomieniami | `P0` `panel` `ui` `js` | M |
| E2-4 | Kalendarz floty | Oś czasu 6 pojazdów × dni lipca, kilkanaście pasków, legenda, licznik próśb; warianty `stan` | `P0` `panel` `ui` | M |
| E2-5 | Przełączanie miesięcy | Czerwiec / lipiec / sierpień w kalendarzu floty | `P1` `panel` `js` | S |
| E2-6 | Ręczne dodanie rezerwacji | Formularz P4 z widocznym ostrzeżeniem o kolizji | `P1` `panel` `ui` | S |

### Epik E3 — Umowa online

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E3-1 | Ekran umowy | Podsumowanie najmu, formularz według rozdz. V umowy z „Wypełnij przykładowymi", treść umowy, regulaminu i cennika z `CC_Dokumenty_Wypozyczalni.md` | `P0` `klient` `mobile` `ui` | M |
| E3-2 | Podpis | Pięć pól akceptacji, podpis palcem, „Podpisuję" prowadzi do K2a | `P0` `klient` `mobile` `ui` | S |
| E3-3 | Umowa podpisana | K2a z widokiem do druku (dane, podpis, data) | `P1` `klient` `panel` `ui` | S |

### Epik E4 — Protokół wydania

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E4-1 | Wyposażenie | Kreator; lista z protokołu z ilością i odhaczaniem; materiały eksploatacyjne; oświadczenie najemcy | `P0` `mobile` `ui` | S |
| E4-2 | Zdjęcia | 8 ujęć, aparat lub plik, podgląd, licznik, blokada „Dalej", „Wypełnij przykładowymi" | `P0` `mobile` `ui` `js` | M |
| E4-3 | Stan, instruktaż, kaucja | Przebieg, paliwo; 18 punktów instruktażu z oświadczeniem blokującym „Dalej"; kaucja i dokumenty | `P0` `mobile` `ui` | S |
| E4-4 | Podsumowanie i podpisy | Podsumowanie, dwa podpisy, ekran „PDF wysłany" z linkiem do P3 `wydana` | `P0` `mobile` `ui` | S |
| E4-5 | Istniejące uszkodzenia | Miejsce, opis, zdjęcie zbliżenia | `P1` `mobile` `ui` | S |
| E4-6 | Podgląd protokołu | M1a jako widok do druku | `P1` `panel` `ui` | S |
| E4-7 | Zapamiętanie zdjęć i podpisów | Zdjęcia (pomniejszone) i podpisy w `localStorage` do pokazania w zwrocie | `P1` `mobile` `js` | S |

### Epik E5 — Protokół zwrotu i rozliczenie

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E5-1 | Zdjęcia przed/po | Każde ujęcie: z wydania obok nowego; rysa na prawym boku; „Nowe uszkodzenie" | `P0` `mobile` `ui` | M |
| E5-2 | Wyposażenie i stan | Lista z wydania z zaznaczonym brakiem kluczyków; przebieg, paliwo, kontrola według cennika | `P0` `mobile` `ui` | S |
| E5-3 | Potrącenia | Pozycje z numerami cennika i kwotami z pkt 4.1, „do wyceny", suma, zwrot kaucji | `P0` `mobile` `ui` | S |
| E5-4 | Podsumowanie i podpisy | Dwa podpisy, adnotacja „do wyceny", link do P3 `zwrocona` | `P0` `mobile` `ui` | S |
| E5-5 | Rozliczenie kaucji | M3 z zestawieniem i zdjęciami, „Kaucja rozliczona" prowadzi do P3 `rozliczona` | `P0` `panel` `ui` | S |
| E5-6 | Zdjęcia z wydania z `localStorage` | Jeśli są zapamiętane — pokazane zamiast przykładowych | `P1` `mobile` `js` | S |

### Epik E6 — Demo i wykończenie

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E6-1 | Przejście scenariusza | Każde przejście z pkt 8 prowadzi do właściwego ekranu; brak martwych linków | `P0` `demo` | S |
| E6-2 | Test na telefonie | K1, K2, M1, M2 wygodne na telefonie; aparat i podpis działają | `P0` `demo` `mobile` | S |
| E6-3 | Spójny wygląd | Jedna paleta, czytelne statusy, polskie teksty, wartości zgodne z pkt 4.1 | `P1` `ui` | S |

### Epik E7 — Po makiecie (nie na jutro)

| ID | Zadanie | Etykiety |
|---|---|---|
| E7-1 | Lista usterek per pojazd dla serwisanta, ułożona pod okienka między wynajmami | `P2` `panel` |
| E7-2 | Zgłoszenie usterki przez klienta w trakcie najmu (zdjęcie i opis z linku) | `P2` `klient` |
| E7-3 | Odnotowanie sprawdzenia kierowcy przy wydaniu (kto, kiedy, co obejrzał) | `P2` `mobile` |

## 10. Plan na jutro

Praca równoległa według `CC_Makieta_Prompty_Agenci.md`.

| Etap | Zadania | Wynik | Czas |
|---|---|---|---|
| 0. Fundament | E0-1 – E0-5 | szkielet wszystkich ekranów pod publicznym adresem | 30–40 min |
| 1. Ekrany równolegle | E1, E2, E3, E4, E5 (P0, potem P1) | wszystkie ekrany zbudowane | 45–75 min |
| 2. Domknięcie | E6-1 – E6-3 | scenariusz przeklikuje się na laptopie i telefonie | 30–45 min |

Jeśli widać opóźnienie, tniemy w tej kolejności: przełączanie miesięcy, P4, podgląd protokołu wydania, `localStorage`, aparat (zostają przykładowe zdjęcia).

## 11. Zasady pracy z backlogiem

- Nie dodajemy funkcji spoza punktu 6. Pomysły w trakcie trafiają do epiku E7.
- Przy wątpliwości „czy to potrzebne w makiecie" rozstrzyga pytanie: czy bez tego da się przeklikać scenariusz demo.
- Przy wątpliwości „liczyć czy wpisać" — wpisać na sztywno.
- Treść umowy, regulaminu, cennika i protokołu — wyłącznie z `CC_Dokumenty_Wypozyczalni.md`; nigdy dane prawdziwej wypożyczalni z oryginalnych PDF-ów.
- Teksty w interfejsie pisane językiem właścicieli wypożyczalni: „wstępna rezerwacja", „zadatek", „kaucja", „wydanie", „zwrot", „potrącenia"; bez słów „platforma", „KYC", „widget".
