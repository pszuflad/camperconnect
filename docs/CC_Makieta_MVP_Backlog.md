# CamperConnect — makieta MVP 1.1: zakres i backlog

**Wersja:** 1.0 (17.11.2026) · **Termin makiety:** 18.11.2026 (jeden dzień pracy) · **Podstawa:** `CC_MVP_Faza1.md` v1.1, `CC_Proces_Przed_Po.md` v1.1, `CC_Wywiad_Robert_Sekula.md`

Ten dokument jest wejściem do pracy z Claude Code. Opisuje, czym jest produkt, co dokładnie ma pokazać makieta, jakie ma mieć widoki i w jakiej kolejności je zbudować.

---

## 1. Kontekst w pięciu zdaniach

- CamperConnect to narzędzie dla małych wypożyczalni kamperów i przyczep kempingowych (flota 2–15 pojazdów), które dziś pracują na zeszycie, telefonie i papierze.
- MVP nie jest samoobsługową rezerwacją dla klienta. Wypożyczalnia prowadzi w nim cały najem, a decyzja „komu wynajmuję" zostaje u właściciela.
- MVP ma trzy elementy: kalendarz z wstępną rezerwacją potwierdzaną przez właściciela, umowa online, checklisty i fotoprotokół wydania i zwrotu.
- Makieta służy do rozmów z właścicielami wypożyczalni (pierwszy pokaz: środa/czwartek, 18–19.11.2026) i ma doprowadzić do podpisania porozumień pilotażowych.
- Makieta nie jest produktem: nie ma backendu, prawdziwych płatności, wysyłki e-maili ani logowania.

## 2. Cel makiety i priorytet: szybkość

**Makieta ma powstać jutro (18.11.2026).** Każda decyzja techniczna ma temu służyć.

- Liczy się klikalna ścieżka jednego najmu od prośby o termin do rozliczenia kaucji, a nie kompletność.
- Wszystko, co da się zasymulować, symulujemy (powiadomienia, PDF, podpis, wygasanie terminu).
- Najpierw cała ścieżka „po łebkach", potem dopracowanie. Lepiej siedem prostych ekranów niż trzy dopieszczone.
- Zadania z etykietą `P0` muszą być gotowe jutro. `P1` robimy tylko, jeśli zostanie czas. `P2` to pomysły na później.

**Po czym poznamy, że makieta jest gotowa:** da się bez tłumaczenia „co by tu było" przejść scenariusz demo z punktu 8, na laptopie (panel) i na telefonie (protokoły), pod publicznym adresem.

## 3. Założenia techniczne

Propozycja do potwierdzenia z Claude Code na starcie; jeśli jest szybsza droga, wybieramy szybszą.

- **Aplikacja frontendowa bez backendu.** Sugerowany zestaw: Vite + React + TypeScript + Tailwind CSS.
- **Dane przykładowe** w pliku w repozytorium; zmiany stanu w pamięci przeglądarki z zapisem do `localStorage`, plus przycisk „Resetuj demo".
- **Jedna aplikacja, dwa tryby:** „Strona wypożyczalni" (widok klienta) i „Panel wypożyczalni". Przełącznik trybu widoczny w nagłówku makiety.
- **Responsywność:** panel projektowany pod laptop; protokoły wydania i zwrotu oraz podpis umowy projektowane pod telefon (mobile-first).
- **Zdjęcia:** pole `input type="file"` z `capture`, żeby na telefonie otwierał się aparat; zdjęcia trzymane w pamięci. W danych przykładowych gotowe zdjęcia zastępcze.
- **Podpis:** rysowanie palcem lub myszką na `canvas`.
- **Symulacje:** powiadomienia e-mail/SMS jako lista „Wysłane powiadomienia" i komunikat na ekranie; PDF jako widok do druku; upływ czasu jako przycisk „Symuluj upływ terminu".
- **Język interfejsu:** polski. Format dat: `11.07.2027`, kwoty: `1 950 zł`.
- **Publikacja:** darmowy hosting statyczny (np. GitHub Pages, Vercel lub Netlify) — potrzebny publiczny link do pokazania na telefonie rozmówcy.

## 4. Dane przykładowe

Spójne z `CC_Proces_Przed_Po.md`, żeby makieta i opowieść o procesie mówiły o tym samym najmie.

- **Wypożyczalnia:** „Kamper na Mazury", właściciel Marek. Ważność wstępnej rezerwacji: 3 dni. Zadatek: 30%.
- **Flota (6 pojazdów):** 4 kampery (w tym „Ducato alkowa", 650 zł/doba, kaucja 5 000 zł) i 2 przyczepy kempingowe (ok. 200–250 zł/doba, kaucja 2 000 zł).
- **Sezon w danych:** czerwiec–sierpień 2027, kilkanaście rezerwacji w różnych statusach, żeby kalendarz nie był pusty.
- **Najem główny do demo:** Ania K., Ducato alkowa, 11–21.07.2027, 10 dób × 650 zł = 6 500 zł, zadatek 1 950 zł, kaucja 5 000 zł.
- **Cennik potrąceń:** paliwo 8 zł/l + 100 zł, sprzątanie 150 zł, brak klucza 60 zł, nieopróżniona kaseta 200 zł, klosz lampki 90 zł.
- **Wyposażenie standardowe:** stolik, 4 krzesła, kabel zasilający, wąż do wody, kliny, 2 komplety kluczy, butla gazowa ×2. Dodatkowe: grill, farelka, wentylator.
- **Punkty szkolenia:** prąd, woda, gaz, kaseta toalety, markiza, lodówka.

## 5. Statusy rezerwacji

Jedna rezerwacja przechodzi przez poniższe statusy; widać je na liście, w kalendarzu (kolor) i w szczegółach.

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

Klient w kalendarzu widzi tylko: wolne / zajęte (wstępna i wszystkie dalsze statusy wyglądają dla niego tak samo, jako zajęte).

## 6. Widoki makiety

### Strona klienta

**K1. Kalendarz i prośba o termin** (strona wypożyczalni)
- Lista pojazdów ze zdjęciem, ceną za dobę i kaucją.
- Kalendarz dostępności wybranego pojazdu: wolne / zajęte.
- Wybór dat, wyliczenie ceny (doby × stawka), informacja o zadatku i kaucji.
- Formularz: imię i nazwisko, telefon, e-mail, opcjonalna wiadomość.
- Po wysłaniu ekran potwierdzenia: „Wstępna rezerwacja przyjęta. Termin zablokowany do [data]. Wypożyczalnia skontaktuje się z Tobą."
- Na ekranie nie ma płatności ani automatycznego potwierdzenia.

**K2. Umowa do podpisu** (link z e-maila, telefon klienta)
- Podsumowanie najmu: pojazd, daty, cena, zadatek, kaucja.
- Formularz danych najemcy i kierowcy: imię i nazwisko, adres, PESEL, numer dowodu, numer prawa jazdy. Bez zdjęć dokumentów.
- Treść umowy, regulaminu i cennika potrąceń (przewijana), w tym zobowiązania przy zwrocie i zapis o szkodach ponad ubezpieczenie.
- Pola wyboru „Zapoznałem się…", podpis palcem, przycisk „Podpisuję".
- Ekran końcowy z podglądem podpisanej umowy (widok do druku jako „PDF").

### Panel wypożyczalni (laptop)

**P1. Kalendarz floty**
- Oś czasu: pojazdy w wierszach, dni w kolumnach, rezerwacje jako paski w kolorze statusu z nazwiskiem klienta.
- Kliknięcie paska otwiera szczegóły rezerwacji (P3).
- Przycisk „Dodaj rezerwację" (rezerwacja przyjęta przez telefon).
- Licznik próśb oczekujących na potwierdzenie.

**P2. Lista próśb i rezerwacji**
- Na górze prośby do rozpatrzenia: klient, telefon, pojazd, daty, „ważna do", przyciski „Potwierdź" i „Odrzuć".
- Niżej wszystkie rezerwacje z filtrem po statusie i pojeździe.

**P3. Szczegóły rezerwacji**
- Dane klienta i najmu, aktualny status.
- Pasek kroków najmu: prośba → potwierdzenie i zadatek → umowa → wydanie → zwrot → rozliczenie kaucji; zrobione kroki odhaczone, następny krok jako główny przycisk.
- Potwierdzenie z odnotowaniem zadatku: kwota, data, forma (przelew / gotówka).
- Umowa: „Wyślij umowę", status (wysłana / podpisana), podgląd.
- Protokoły: przyciski „Rozpocznij wydanie" i „Rozpocznij zwrot", podgląd podpisanych protokołów.
- Kaucja: przyjęta / do zwrotu / rozliczona, z kwotami.
- Lista wysłanych powiadomień (symulacja).

**P4. Dodanie rezerwacji ręcznie**
- Formularz: pojazd, daty, dane klienta, od razu jako wstępna lub potwierdzona.
- Ostrzeżenie przy kolizji terminów.

### Panel wypożyczalni (telefon)

**M1. Protokół wydania** — kreator krok po kroku
1. Wyposażenie: lista standardowa i dodatkowa, odhaczanie wydanych pozycji, materiały eksploatacyjne (butle, płyn do toalety).
2. Zdjęcia: wymagane ujęcia (przód, lewy bok, tył, prawy bok, dach, wnętrze, licznik, paliwo), minimum 8 zdjęć; oznaczenie istniejących uszkodzeń z opisem i zbliżeniem.
3. Stan: przebieg, poziom paliwa.
4. Szkolenie klienta: punkty do odhaczenia.
5. Kaucja: kwota, forma, „przyjęta".
6. Podsumowanie i podpisy palcem obu stron; komunikat „PDF wysłany do obu stron"; status rezerwacji „Wydana".

**M2. Protokół zwrotu** — kreator krok po kroku
1. Zdjęcia: przy każdym ujęciu zdjęcie z wydania obok nowego; przycisk „Nowe uszkodzenie" z opisem.
2. Wyposażenie: porównanie z listą z wydania, zaznaczenie braków.
3. Stan: przebieg, paliwo, czystość, kaseta.
4. Potrącenia: pozycje z cennika wyliczone automatycznie (np. paliwo: litry × stawka + opłata), pozycja „do wyceny" z polem na kwotę, suma, kwota kaucji do zwrotu.
5. Podsumowanie i podpisy obu stron; status „Zwrócona".
6. Rozliczenie kaucji w szczegółach rezerwacji: uzupełnienie wyceny, „Kaucja rozliczona", status „Rozliczona".

## 7. Czego w makiecie nie ma

Świadomie poza zakresem — nie budować, nawet jeśli wydaje się proste:

- płatności online i automatyczne potwierdzanie rezerwacji,
- przesyłanie zdjęć dokumentów, weryfikacja kierowcy, integracje CEPiK/KYC,
- kaucja w depozycie, preautoryzacja kart,
- logowanie, konta użytkowników, role, wiele wypożyczalni,
- prawdziwa wysyłka e-maili i SMS-ów, prawdziwe generowanie PDF, prawdziwy podpis elektroniczny,
- backend, baza danych, synchronizacja między urządzeniami,
- edytor wzorów umów, konfiguracja floty i cenników z poziomu panelu,
- marketplace, ubezpieczenia, wersje językowe.

## 8. Scenariusz demo (ścieżka do odegrania przed rozmówcą)

1. **Klient, wieczór:** na stronie wypożyczalni wybiera Ducato, 11–21.07, wysyła prośbę o termin (K1).
2. **Właściciel, rano:** w panelu widzi nową prośbę i żółty pasek w kalendarzu z datą ważności (P1, P2).
3. **Po rozmowie telefonicznej:** odnotowuje zadatek 1 950 zł i klika „Potwierdź"; pasek robi się czerwony (P3).
4. **Umowa:** klika „Wyślij umowę"; przełączamy się na telefon klienta, który uzupełnia dane, czyta cennik potrąceń i podpisuje (K2); w panelu status „Umowa podpisana".
5. **Wydanie:** na telefonie właściciela protokół wydania — wyposażenie, zdjęcia, szkolenie, kaucja, dwa podpisy (M1).
6. **Zwrot:** protokół zwrotu — zdjęcie prawego boku z wydania obok dzisiejszego z rysą, brak kompletu kluczy, paliwo 6/8; potrącenia wyliczone z cennika (M2).
7. **Rozliczenie:** dopisanie wyceny rysy, kaucja rozliczona (P3).
8. **Na koniec:** kalendarz floty z całym sezonem i pokaz, jak niepotwierdzona prośba wygasa i zwalnia termin.

## 9. Backlog

### Etykiety

- **Priorytet:** `P0` — musi być jutro; `P1` — jeśli zostanie czas; `P2` — później.
- **Widok:** `klient`, `panel`, `mobile`.
- **Typ:** `setup`, `ui`, `logika`, `dane`, `demo`.
- **Szacunek:** S (do 30 min), M (30–60 min), L (1–2 h) — czas pracy z Claude Code.

### Epik E0 — Fundament

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E0-1 | Projekt i publikacja | Repozytorium z aplikacją startową; automatyczna publikacja pod publicznym adresem; działa na telefonie | `P0` `setup` | S |
| E0-2 | Szkielet aplikacji i nawigacja | Przełącznik „Strona wypożyczalni / Panel"; menu panelu (Kalendarz, Rezerwacje); trasy dla wszystkich widoków z punktu 6, na razie puste | `P0` `setup` `ui` | S |
| E0-3 | Model danych i dane przykładowe | Typy: pojazd, rezerwacja, klient, umowa, protokół, cennik; dane z punktu 4; kilkanaście rezerwacji w różnych statusach | `P0` `dane` | M |
| E0-4 | Stan aplikacji i reset | Zmiany zapisują się w `localStorage`; przycisk „Resetuj demo" przywraca dane początkowe | `P0` `logika` | S |
| E0-5 | Statusy rezerwacji | Przejścia statusów z punktu 5 w jednym miejscu kodu; kolory i etykiety statusów współdzielone przez wszystkie widoki | `P0` `logika` | S |
| E0-6 | Symulacja powiadomień | Każda zmiana statusu dopisuje wpis „wysłano e-mail/SMS do…" i pokazuje krótki komunikat | `P1` `logika` `ui` | S |

### Epik E1 — Kalendarz i prośba o termin (klient)

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E1-1 | Lista pojazdów | Karty 6 pojazdów ze zdjęciem zastępczym, ceną za dobę i kaucją; wybór pojazdu | `P0` `klient` `ui` | S |
| E1-2 | Kalendarz dostępności | Widok miesiąca z dniami wolnymi i zajętymi dla wybranego pojazdu; wybór zakresu dat; zajętych dni nie da się wybrać | `P0` `klient` `ui` `logika` | M |
| E1-3 | Wyliczenie i formularz prośby | Po wyborze dat: liczba dób, cena, zadatek 30%, kaucja; formularz z walidacją wymaganych pól | `P0` `klient` `ui` | S |
| E1-4 | Wysłanie prośby | Powstaje rezerwacja „Wstępna" z datą ważności (dziś + 3 dni); ekran potwierdzenia z tą datą; termin od razu widoczny jako zajęty | `P0` `klient` `logika` | S |

### Epik E2 — Panel: kalendarz floty i rezerwacje

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E2-1 | Kalendarz floty | Oś czasu pojazdy × dni; paski rezerwacji w kolorach statusów z nazwiskiem; przewijanie po miesiącach; klik otwiera szczegóły | `P0` `panel` `ui` | L |
| E2-2 | Lista próśb i rezerwacji | Sekcja „Do potwierdzenia" z datą ważności; lista wszystkich rezerwacji; filtr po statusie | `P0` `panel` `ui` | M |
| E2-3 | Szczegóły rezerwacji z paskiem kroków | Dane najmu i klienta; pasek kroków z punktu 6 (P3); następny krok jako główny przycisk | `P0` `panel` `ui` | M |
| E2-4 | Potwierdzenie i zadatek | „Potwierdź" otwiera okno: kwota zadatku, data, forma; po zapisie status „Potwierdzona"; „Odrzuć" zwalnia termin | `P0` `panel` `logika` | S |
| E2-5 | Wygasanie prośby | Przycisk „Symuluj upływ terminu" zmienia niepotwierdzoną prośbę na „Wygasła" i zwalnia termin w obu kalendarzach | `P1` `panel` `logika` `demo` | S |
| E2-6 | Ręczne dodanie rezerwacji | Formularz z punktu 6 (P4); ostrzeżenie przy kolizji terminów | `P1` `panel` `ui` `logika` | M |
| E2-7 | Ustawienia wypożyczalni | Liczba dni ważności prośby i procent zadatku do zmiany w prostym oknie | `P2` `panel` `ui` | S |

### Epik E3 — Umowa online

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E3-1 | Wysłanie umowy z panelu | Przycisk „Wyślij umowę"; status „Umowa wysłana"; w makiecie przycisk „Otwórz jako klient" prowadzi do K2 | `P0` `panel` `logika` | S |
| E3-2 | Treść umowy z danych rezerwacji | Wzór umowy, regulaminu i cennika potrąceń wypełniony danymi najmu; zawiera zobowiązania przy zwrocie i zapis o szkodach ponad ubezpieczenie | `P0` `klient` `dane` `ui` | M |
| E3-3 | Dane najemcy i podpis | Formularz danych najemcy i kierowcy; pola wyboru; podpis palcem; „Podpisuję" ustawia status „Umowa podpisana" | `P0` `klient` `mobile` `ui` | M |
| E3-4 | Podgląd podpisanej umowy | Widok do druku z danymi, podpisem i datą; dostępny z K2 i ze szczegółów rezerwacji | `P1` `klient` `panel` `ui` | S |

### Epik E4 — Protokół wydania (telefon)

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E4-1 | Kreator i krok „Wyposażenie" | Kreator z paskiem postępu; lista standardowa i dodatkowa z odhaczaniem; materiały eksploatacyjne | `P0` `mobile` `ui` | M |
| E4-2 | Krok „Zdjęcia" | Lista wymaganych ujęć; dodanie zdjęcia z aparatu lub pliku; licznik „x z 8"; nie da się przejść dalej poniżej 8 (w demo przycisk „Wypełnij przykładowymi") | `P0` `mobile` `ui` `logika` | L |
| E4-3 | Istniejące uszkodzenia | Dodanie uszkodzenia: miejsce, opis, zdjęcie zbliżenia; lista uszkodzeń w podsumowaniu | `P1` `mobile` `ui` | M |
| E4-4 | Kroki „Stan", „Szkolenie", „Kaucja" | Przebieg i paliwo; punkty szkolenia do odhaczenia; kaucja: kwota, forma, przyjęta | `P0` `mobile` `ui` | M |
| E4-5 | Podsumowanie i podpisy | Podsumowanie całego protokołu; dwa podpisy palcem; status „Wydana"; komunikat o wysłaniu PDF | `P0` `mobile` `ui` `logika` | M |
| E4-6 | Podgląd protokołu wydania | Widok do druku ze zdjęciami, listami i podpisami, ze znacznikiem czasu | `P1` `panel` `ui` | S |

### Epik E5 — Protokół zwrotu i rozliczenie kaucji (telefon)

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E5-1 | Krok „Zdjęcia przed/po" | Dla każdego ujęcia zdjęcie z wydania obok nowego; „Nowe uszkodzenie" z opisem | `P0` `mobile` `ui` | L |
| E5-2 | Kroki „Wyposażenie" i „Stan" | Lista z wydania z zaznaczaniem braków; przebieg, paliwo, czystość, kaseta | `P0` `mobile` `ui` | M |
| E5-3 | Potrącenia z cennika | Automatyczne pozycje: brakujące paliwo, braki wyposażenia, sprzątanie, kaseta; pozycja „do wyceny"; suma i kwota do zwrotu | `P0` `mobile` `logika` | M |
| E5-4 | Podsumowanie i podpisy | Dwa podpisy; status „Zwrócona"; adnotacja „do wyceny", jeśli jest taka pozycja | `P0` `mobile` `ui` `logika` | S |
| E5-5 | Rozliczenie kaucji w panelu | Uzupełnienie kwoty wyceny; zestawienie potrąceń ze zdjęciami; „Kaucja rozliczona" ustawia status „Rozliczona" | `P0` `panel` `ui` `logika` | M |

### Epik E6 — Demo i wykończenie

| ID | Zadanie | Kryteria akceptacji | Etykiety | Szac. |
|---|---|---|---|---|
| E6-1 | Przejście scenariusza demo | Scenariusz z punktu 8 przechodzi od początku do końca bez błędów po „Resetuj demo" | `P0` `demo` | M |
| E6-2 | Test na telefonie | K1, K2, M1, M2 wygodne na ekranie telefonu; aparat i podpis palcem działają | `P0` `demo` `mobile` | S |
| E6-3 | Spójny wygląd | Jedna paleta, czytelne statusy, polskie teksty bez pozostałości po szablonie | `P1` `ui` | M |
| E6-4 | Gotowe stany do pokazu | Przyciski w trybie demo: „Przejdź do stanu: umowa podpisana / wydana / zwrócona", żeby nie klikać całości przy każdym pokazie | `P1` `demo` `logika` | S |

### Epik E7 — Po makiecie (nie na jutro)

| ID | Zadanie | Etykiety |
|---|---|---|
| E7-1 | Lista usterek per pojazd dla serwisanta, ułożona pod okienka między wynajmami | `P2` `panel` |
| E7-2 | Zgłoszenie usterki przez klienta w trakcie najmu (zdjęcie i opis z linku) | `P2` `klient` |
| E7-3 | Odnotowanie sprawdzenia kierowcy przy wydaniu (kto, kiedy, co obejrzał) | `P2` `mobile` |

## 10. Plan na jutro

Kolejność prowadzi najkrótszą drogą do pełnej ścieżki demo. Godziny są orientacyjne.

| Blok | Zadania | Wynik |
|---|---|---|
| 1. Start (ok. 1 h) | E0-1 – E0-5 | pusta aplikacja z danymi pod publicznym adresem |
| 2. Rezerwacja (ok. 2,5 h) | E1-1 – E1-4, E2-1 – E2-4 | klient wysyła prośbę, właściciel ją potwierdza, widać to w kalendarzu |
| 3. Umowa (ok. 1,5 h) | E3-1 – E3-3 | umowa wysłana i podpisana na telefonie |
| 4. Wydanie (ok. 2 h) | E4-1, E4-2, E4-4, E4-5 | podpisany protokół wydania |
| 5. Zwrot (ok. 2 h) | E5-1 – E5-5 | podpisany protokół zwrotu i rozliczona kaucja |
| 6. Domknięcie (ok. 1 h) | E6-1, E6-2 | scenariusz demo przechodzi na laptopie i telefonie |
| 7. Jeśli zostanie czas | E0-6, E2-5, E4-3, E6-4, E3-4, E4-6, E2-6, E6-3 | w tej kolejności |

Suma zadań `P0`: ok. 10 godzin pracy. Jeśli w połowie dnia widać opóźnienie, tniemy w tej kolejności: uproszczony kalendarz floty (lista zamiast osi czasu), zdjęcia tylko przykładowe bez aparatu, umowa bez formularza danych najemcy.

## 11. Zasady pracy z backlogiem

- Jedno zadanie = jedna zmiana w repozytorium, od razu opublikowana, żeby postęp było widać pod linkiem.
- Nie dodajemy funkcji spoza punktu 6. Pomysły w trakcie trafiają do epiku E7.
- Przy wątpliwości „czy to potrzebne w makiecie" rozstrzyga pytanie: czy bez tego da się odegrać scenariusz demo.
- Teksty w interfejsie pisane językiem właścicieli wypożyczalni: „wstępna rezerwacja", „zadatek", „kaucja", „wydanie", „zwrot", „potrącenia"; bez słów „platforma", „KYC", „widget".
