# CamperConnect — makieta MVP w jeden wieczór: prompty dla agentów

**Wersja:** 1.0 (17.11.2026) · **Uzupełnia:** `CC_Makieta_MVP_Backlog.md` (zakres, widoki, dane, statusy, scenariusz demo)

Backlog opisuje, *co* ma powstać. Ten dokument opisuje, *jak* to zrobić w kilka godzin: jeden prompt przygotowujący wspólny fundament, pięć promptów uruchamianych równolegle i jeden prompt scalający.

---

## 1. Jak to działa

| Etap | Co się dzieje | Ile sesji | Orientacyjny czas |
|---|---|---|---|
| 0. Fundament | szkielet aplikacji, dane, wspólny stan, wspólne komponenty, trasy z pustymi widokami, publikacja | 1 | 30–45 min |
| 1. Budowa równoległa | pięciu agentów buduje po jednym obszarze, każdy we własnym katalogu i na własnej gałęzi | 5 naraz | 60–90 min |
| 2. Scalenie i demo | połączenie gałęzi, przejście scenariusza demo, poprawki, publikacja | 1 | 45–60 min |

Razem ok. 2,5–3,5 godziny, z czego Twoja praca to uruchomienie promptów, odpowiadanie na pytania agentów i przeklikanie wyniku. To szacunek, nie gwarancja — najwięcej niespodzianek bywa w etapie 2.

**Dlaczego to się nie rozjedzie:**
- Fundament ustala jeden model danych i jeden zestaw funkcji zmieniających stan. Agenci z niego korzystają i go nie zmieniają.
- Każdy agent pracuje tylko w swoim katalogu `src/features/<obszar>/`. Trasy są podpięte w fundamencie do pustych komponentów, które agent podmienia — nikt nie edytuje wspólnych plików.
- Widoki łączą się wyłącznie przez adresy (linki), a nie przez importowanie cudzych komponentów.

**Przed startem:**
1. Załóż repozytorium i dodaj do niego `docs/CC_Makieta_MVP_Backlog.md` oraz ten plik jako `docs/CC_Makieta_Prompty_Agenci.md`.
2. Uruchom prompt 0 i poczekaj, aż skończy i trafi do gałęzi `main`.
3. Uruchom prompty 1–5 jednocześnie, każdy w osobnej sesji Claude Code.
4. Gdy wszystkie skończą, uruchom prompt 6.

---

## 2. Wspólny kontrakt (ustala go prompt 0, obowiązuje wszystkich)

**Trasy i właściciele katalogów:**

| Adres | Widok | Katalog | Agent |
|---|---|---|---|
| `/` | K1 — strona wypożyczalni: pojazdy, kalendarz, prośba o termin | `src/features/klient/` | 1 |
| `/panel` | P1 — kalendarz floty | `src/features/panel/` | 2 |
| `/panel/rezerwacje` | P2 — lista próśb i rezerwacji | `src/features/panel/` | 2 |
| `/panel/rezerwacje/nowa` | P4 — ręczne dodanie rezerwacji | `src/features/panel/` | 2 |
| `/panel/rezerwacje/:id` | P3 — szczegóły rezerwacji | `src/features/panel/` | 2 |
| `/umowa/:id` | K2 — umowa do podpisu (klient, telefon) | `src/features/umowa/` | 3 |
| `/panel/rezerwacje/:id/umowa` | podgląd podpisanej umowy | `src/features/umowa/` | 3 |
| `/panel/rezerwacje/:id/wydanie` | M1 — protokół wydania (telefon) | `src/features/wydanie/` | 4 |
| `/panel/rezerwacje/:id/wydanie/podglad` | podgląd protokołu wydania | `src/features/wydanie/` | 4 |
| `/panel/rezerwacje/:id/zwrot` | M2 — protokół zwrotu (telefon) | `src/features/zwrot/` | 5 |
| `/panel/rezerwacje/:id/rozliczenie` | rozliczenie kaucji | `src/features/zwrot/` | 5 |

**Funkcje stanu (jedyny sposób zmiany danych):**
`utworzProsbe`, `dodajRezerwacjeRecznie`, `potwierdzRezerwacje` (z zadatkiem), `odrzucRezerwacje`, `wygasRezerwacje`, `wyslijUmowe`, `podpiszUmowe`, `zapiszProtokolWydania`, `zapiszProtokolZwrotu`, `rozliczKaucje`, `resetujDemo`.

**Wspólne komponenty w `src/shared/`:** znaczek statusu, pole podpisu palcem, pole dodawania zdjęcia, powłoka kreatora krok po kroku, widok do druku, okno modalne, formatowanie dat i kwot.

**Zasady dla agentów 1–5** (powtórzone w każdym prompcie):
- pracujesz tylko w swoim katalogu i na swojej gałęzi;
- nie zmieniasz plików w `src/shared/`, `src/store/`, `src/data/` ani pliku tras; jeśli czegoś tam brakuje, obejdź to lokalnie i opisz w podsumowaniu;
- do innych widoków prowadzisz linkami z tabeli tras;
- budujesz tylko to, co jest w Twoim zakresie w backlogu, bez dodatków.

---

## 3. Prompt 0 — Fundament (uruchom jako pierwszy, sam)

```text
Budujemy klikalną makietę MVP CamperConnect. Pełny opis jest w docs/CC_Makieta_MVP_Backlog.md,
a podział pracy w docs/CC_Makieta_Prompty_Agenci.md — przeczytaj oba pliki w całości.

Twoje zadanie to WYŁĄCZNIE fundament, na którym za chwilę pięciu agentów równolegle zbuduje widoki.
Liczy się szybkość i to, żeby agenci nie wchodzili sobie w drogę. Nie buduj żadnego widoku.

Zrób:
1. Aplikację Vite + React + TypeScript + Tailwind CSS + React Router. Bez backendu.
2. Model danych w src/store/types.ts: pojazd, rezerwacja, klient, zadatek, umowa, protokół wydania,
   protokół zwrotu, kaucja, cennik potrąceń, ustawienia wypożyczalni. Statusy rezerwacji dokładnie
   według punktu 5 backlogu.
3. Dane przykładowe w src/data/ według punktu 4 backlogu: 6 pojazdów, kilkanaście rezerwacji
   w różnych statusach w sezonie czerwiec–sierpień 2027, cennik potrąceń, wyposażenie, punkty szkolenia,
   wzór umowy z regulaminem. Dodaj zdjęcia zastępcze pojazdów i ujęć do protokołu. Termin 11–21.07.2027
   dla „Ducato alkowa" zostaw WOLNY — to najem do scenariusza demo. Dodaj też jedną rezerwację
   w statusie „Wydana" z kompletnym protokołem wydania, żeby dało się testować zwrot.
4. Stan aplikacji w src/store/: jeden store z zapisem do localStorage i funkcjami z sekcji
   „Wspólny kontrakt" w docs/CC_Makieta_Prompty_Agenci.md. Każda funkcja zmienia status zgodnie
   z punktem 5 backlogu i dopisuje wpis do listy „wysłane powiadomienia". Dodaj hooki do odczytu:
   pojazdy, rezerwacje, rezerwacja po id, zajętość pojazdu w zakresie dat.
5. Wspólne komponenty w src/shared/ z sekcji „Wspólny kontrakt". Pole podpisu ma działać palcem
   i myszką i zwracać obraz. Pole zdjęcia ma na telefonie otwierać aparat i zwracać obraz.
   Powłoka kreatora: pasek postępu, „Wstecz", „Dalej", blokada „Dalej" przekazywana z kroku.
6. Układ i trasy: nagłówek makiety z przełącznikiem „Strona wypożyczalni / Panel" i przyciskiem
   „Resetuj demo"; menu panelu (Kalendarz, Rezerwacje). Wszystkie trasy z tabeli w sekcji
   „Wspólny kontrakt" podpięte do pustych komponentów w odpowiednich katalogach src/features/<obszar>/
   — każdy pusty komponent wyświetla tylko nazwę widoku. Agenci będą podmieniać te pliki.
7. Plik docs/KONTRAKT.md: lista tras, sygnatury funkcji store'u i hooków, lista wspólnych komponentów
   z przykładami użycia. To będzie jedyne źródło prawdy dla agentów — ma być krótkie i dokładne.
8. Automatyczną publikację gałęzi main pod publicznym adresem (np. GitHub Pages) i sprawdzenie,
   że strona się otwiera.

Na koniec: aplikacja się buduje bez błędów, wszystkie trasy się otwierają, zmiany są w main.
W podsumowaniu podaj adres publikacji i wszystko, co odbiega od backlogu.
```

---

## 4. Prompty 1–5 — uruchom równocześnie, każdy w osobnej sesji

### Prompt 1 — Strona klienta: kalendarz i prośba o termin

```text
Pracujesz nad makietą MVP CamperConnect razem z czterema innymi agentami, każdy w swoim obszarze.
Przeczytaj docs/KONTRAKT.md oraz docs/CC_Makieta_MVP_Backlog.md (punkty 4, 5, 6 i epik E1).

Twój obszar: widok K1 pod adresem „/". Katalog: src/features/klient/. Gałąź: feature/klient.

Zbuduj zadania E1-1 do E1-4:
- lista 6 pojazdów ze zdjęciem, ceną za dobę i kaucją; wybór pojazdu;
- kalendarz miesięczny wybranego pojazdu z dniami wolnymi i zajętymi; wybór zakresu dat;
  zajętych dni nie da się wybrać; klient widzi tylko „wolne / zajęte";
- po wyborze dat: liczba dób, cena, zadatek, kaucja; formularz (imię i nazwisko, telefon, e-mail,
  wiadomość) z walidacją;
- wysłanie prośby funkcją store'u; ekran potwierdzenia: „Wstępna rezerwacja przyjęta. Termin
  zablokowany do [data]. Wypożyczalnia skontaktuje się z Tobą."
Na tym ekranie nie ma płatności ani automatycznego potwierdzenia.
Widok ma dobrze wyglądać na telefonie i na laptopie.

Zasady: pracujesz tylko w swoim katalogu i na swojej gałęzi. Nie zmieniasz src/shared/, src/store/,
src/data/ ani pliku tras; jeśli czegoś tam brakuje, obejdź to lokalnie i opisz w podsumowaniu.
Budujesz tylko swój zakres, bez dodatków. Liczy się szybkość: działająca ścieżka przed dopieszczaniem.

Na koniec: aplikacja się buduje, ścieżka działa w przeglądarce, zmiany wypchnięte na gałąź.
W podsumowaniu wypisz, co zrobione, co pominięte i czego brakowało we wspólnych plikach.
```

### Prompt 2 — Panel: kalendarz floty, rezerwacje, szczegóły

```text
Pracujesz nad makietą MVP CamperConnect razem z czterema innymi agentami, każdy w swoim obszarze.
Przeczytaj docs/KONTRAKT.md oraz docs/CC_Makieta_MVP_Backlog.md (punkty 4, 5, 6 i epik E2).

Twój obszar: widoki P1, P2, P3, P4 pod adresami /panel, /panel/rezerwacje, /panel/rezerwacje/:id,
/panel/rezerwacje/nowa. Katalog: src/features/panel/. Gałąź: feature/panel.

Zbuduj w tej kolejności:
1. E2-2 — lista: sekcja „Do potwierdzenia" (klient, telefon, pojazd, daty, „ważna do",
   „Potwierdź", „Odrzuć") i lista wszystkich rezerwacji z filtrem po statusie.
2. E2-3 i E2-4 — szczegóły rezerwacji: dane najmu i klienta, status, pasek kroków
   (prośba → potwierdzenie i zadatek → umowa → wydanie → zwrot → rozliczenie kaucji), następny krok
   jako główny przycisk. „Potwierdź" otwiera okno z zadatkiem (kwota, data, przelew/gotówka).
   Sekcja „Wysłane powiadomienia".
   Kroki umowy, wydania, zwrotu i rozliczenia NIE są Twoje — podepnij je linkami:
   „Wyślij umowę" wywołuje funkcję store'u i pokazuje link „Otwórz jako klient" do /umowa/:id
   oraz link do podglądu; „Rozpocznij wydanie", „Rozpocznij zwrot", „Rozlicz kaucję" i podglądy
   protokołów to linki do adresów z docs/KONTRAKT.md.
3. E2-1 — kalendarz floty: pojazdy w wierszach, dni w kolumnach, paski rezerwacji w kolorze statusu
   z nazwiskiem, przewijanie po miesiącach, klik otwiera szczegóły, licznik próśb do potwierdzenia.
   Jeśli oś czasu zajmuje za długo, zrób prostszą siatkę — ważne, żeby było widać całą flotę naraz.
4. E2-5 — przycisk „Symuluj upływ terminu" przy wstępnej rezerwacji.
5. E2-6 — ręczne dodanie rezerwacji z ostrzeżeniem o kolizji terminów (jeśli zostanie czas).
Panel projektuj pod laptop.

Zasady: pracujesz tylko w swoim katalogu i na swojej gałęzi. Nie zmieniasz src/shared/, src/store/,
src/data/ ani pliku tras; jeśli czegoś tam brakuje, obejdź to lokalnie i opisz w podsumowaniu.
Budujesz tylko swój zakres, bez dodatków. Liczy się szybkość: działająca ścieżka przed dopieszczaniem.

Na koniec: aplikacja się buduje, ścieżka działa w przeglądarce, zmiany wypchnięte na gałąź.
W podsumowaniu wypisz, co zrobione, co pominięte i czego brakowało we wspólnych plikach.
```

### Prompt 3 — Umowa online

```text
Pracujesz nad makietą MVP CamperConnect razem z czterema innymi agentami, każdy w swoim obszarze.
Przeczytaj docs/KONTRAKT.md oraz docs/CC_Makieta_MVP_Backlog.md (punkty 4, 5, 6 i epik E3).

Twój obszar: widok K2 pod adresem /umowa/:id oraz podgląd podpisanej umowy pod
/panel/rezerwacje/:id/umowa. Katalog: src/features/umowa/. Gałąź: feature/umowa.

Zbuduj zadania E3-2, E3-3, E3-4:
- widok klienta na telefon: podsumowanie najmu (pojazd, daty, cena, zadatek, kaucja);
- formularz danych najemcy i kierowcy: imię i nazwisko, adres, PESEL, numer dowodu, numer prawa
  jazdy — pola tekstowe, bez zdjęć dokumentów; przycisk „Wypełnij przykładowymi danymi" do demo;
- treść umowy, regulaminu i cennika potrąceń wypełniona danymi rezerwacji ze wzoru w src/data/,
  w tym zobowiązania przy zwrocie i zapis o szkodach ponad wypłatę z ubezpieczenia;
- pola wyboru „Zapoznałem się…", podpis palcem, „Podpisuję" — wywołuje funkcję store'u;
- ekran końcowy i podgląd podpisanej umowy jako widok do druku z danymi, podpisem i datą.
Jeśli umowa nie została jeszcze wysłana albo jest już podpisana, pokaż odpowiedni komunikat.
Wysłanie umowy z panelu robi inny agent — testuj na rezerwacji z danych przykładowych
w statusie „Umowa wysłana".

Zasady: pracujesz tylko w swoim katalogu i na swojej gałęzi. Nie zmieniasz src/shared/, src/store/,
src/data/ ani pliku tras; jeśli czegoś tam brakuje, obejdź to lokalnie i opisz w podsumowaniu.
Budujesz tylko swój zakres, bez dodatków. Liczy się szybkość: działająca ścieżka przed dopieszczaniem.

Na koniec: aplikacja się buduje, ścieżka działa w przeglądarce w szerokości telefonu, zmiany
wypchnięte na gałąź. W podsumowaniu wypisz, co zrobione, co pominięte i czego brakowało
we wspólnych plikach.
```

### Prompt 4 — Protokół wydania

```text
Pracujesz nad makietą MVP CamperConnect razem z czterema innymi agentami, każdy w swoim obszarze.
Przeczytaj docs/KONTRAKT.md oraz docs/CC_Makieta_MVP_Backlog.md (punkty 4, 5, 6 i epik E4).

Twój obszar: widok M1 pod adresem /panel/rezerwacje/:id/wydanie oraz podgląd pod
/panel/rezerwacje/:id/wydanie/podglad. Katalog: src/features/wydanie/. Gałąź: feature/wydanie.

Zbuduj kreator na telefon, używając wspólnej powłoki kreatora, w tej kolejności:
1. Wyposażenie: lista standardowa i dodatkowa z odhaczaniem, materiały eksploatacyjne.
2. Zdjęcia: wymagane ujęcia (przód, lewy bok, tył, prawy bok, dach, wnętrze, licznik, paliwo),
   dodawanie z aparatu lub pliku, licznik „x z 8", blokada „Dalej" poniżej 8,
   przycisk „Wypełnij przykładowymi zdjęciami" do demo.
3. Stan: przebieg i poziom paliwa.
4. Szkolenie klienta: punkty do odhaczenia.
5. Kaucja: kwota, forma, „przyjęta".
6. Podsumowanie i podpisy palcem obu stron; zapis funkcją store'u; ekran „Protokół podpisany,
   PDF wysłany do obu stron" z linkiem do szczegółów rezerwacji.
Potem, jeśli zostanie czas: E4-3 (istniejące uszkodzenia: miejsce, opis, zdjęcie zbliżenia)
i E4-6 (podgląd protokołu jako widok do druku ze znacznikiem czasu).
Testuj na rezerwacji z danych przykładowych w statusie „Umowa podpisana".

Zasady: pracujesz tylko w swoim katalogu i na swojej gałęzi. Nie zmieniasz src/shared/, src/store/,
src/data/ ani pliku tras; jeśli czegoś tam brakuje, obejdź to lokalnie i opisz w podsumowaniu.
Budujesz tylko swój zakres, bez dodatków. Liczy się szybkość: działająca ścieżka przed dopieszczaniem.

Na koniec: aplikacja się buduje, kreator przechodzi w szerokości telefonu, zmiany wypchnięte
na gałąź. W podsumowaniu wypisz, co zrobione, co pominięte i czego brakowało we wspólnych plikach.
```

### Prompt 5 — Protokół zwrotu i rozliczenie kaucji

```text
Pracujesz nad makietą MVP CamperConnect razem z czterema innymi agentami, każdy w swoim obszarze.
Przeczytaj docs/KONTRAKT.md oraz docs/CC_Makieta_MVP_Backlog.md (punkty 4, 5, 6 i epik E5).

Twój obszar: widok M2 pod adresem /panel/rezerwacje/:id/zwrot oraz rozliczenie kaucji pod
/panel/rezerwacje/:id/rozliczenie. Katalog: src/features/zwrot/. Gałąź: feature/zwrot.

Zbuduj kreator na telefon, używając wspólnej powłoki kreatora, w tej kolejności:
1. Zdjęcia przed/po: dla każdego ujęcia zdjęcie z protokołu wydania obok nowego;
   „Nowe uszkodzenie" z opisem; przycisk „Wypełnij przykładowymi zdjęciami" do demo.
2. Wyposażenie: lista z protokołu wydania z zaznaczaniem braków.
3. Stan: przebieg, paliwo, czystość, kaseta toalety.
4. Potrącenia: pozycje wyliczone automatycznie z cennika (brakujące paliwo: litry × stawka + opłata,
   braki wyposażenia, sprzątanie, kaseta), pozycja „do wyceny" dla nowych uszkodzeń,
   suma i kwota kaucji do zwrotu.
5. Podsumowanie i podpisy obu stron; zapis funkcją store'u; link do szczegółów rezerwacji.
Osobny widok rozliczenia kaucji (laptop): zestawienie potrąceń ze zdjęciami przed/po, pole na kwotę
wyceny dla pozycji „do wyceny", kwota do zwrotu, „Kaucja rozliczona" — wywołuje funkcję store'u.
Protokół wydania buduje inny agent — testuj na rezerwacji z danych przykładowych w statusie
„Wydana", która ma kompletny protokół wydania.

Zasady: pracujesz tylko w swoim katalogu i na swojej gałęzi. Nie zmieniasz src/shared/, src/store/,
src/data/ ani pliku tras; jeśli czegoś tam brakuje, obejdź to lokalnie i opisz w podsumowaniu.
Budujesz tylko swój zakres, bez dodatków. Liczy się szybkość: działająca ścieżka przed dopieszczaniem.

Na koniec: aplikacja się buduje, kreator przechodzi w szerokości telefonu, zmiany wypchnięte
na gałąź. W podsumowaniu wypisz, co zrobione, co pominięte i czego brakowało we wspólnych plikach.
```

---

## 5. Prompt 6 — Scalenie i demo (uruchom, gdy prompty 1–5 skończą)

```text
Pięciu agentów zbudowało widoki makiety MVP CamperConnect na gałęziach feature/klient,
feature/panel, feature/umowa, feature/wydanie, feature/zwrot. Przeczytaj
docs/CC_Makieta_MVP_Backlog.md i docs/KONTRAKT.md.

Twoje zadanie:
1. Scal wszystkie pięć gałęzi do main. Konflikty rozwiąż na korzyść kontraktu z docs/KONTRAKT.md.
2. Uruchom aplikację i przejdź w przeglądarce scenariusz demo z punktu 8 backlogu, od „Resetuj demo"
   do rozliczonej kaucji, na najmie: Ducato alkowa, 11–21.07.2027, Ania K. Kroki klienta i protokoły
   sprawdź w szerokości telefonu.
3. Napraw wszystko, co przerywa scenariusz: martwe linki między widokami, niezgodne statusy,
   brakujące dane przekazywane między krokami (np. zdjęcia z wydania w protokole zwrotu).
4. Ujednolić wygląd na tyle, żeby całość wyglądała jak jedna aplikacja: nagłówki, przyciski,
   kolory statusów, polskie teksty bez pozostałości po szablonie.
5. Dodaj w nagłówku makiety menu „Demo": przejście do gotowych stanów najmu demonstracyjnego
   (umowa podpisana / wydana / zwrócona), żeby nie klikać całości przy każdym pokazie.
6. Opublikuj main i sprawdź publiczny adres.

Nie dodawaj nowych funkcji. Na koniec podaj: adres publikacji, listę kroków scenariusza
ze statusem działa / nie działa, oraz listę znanych braków wobec backlogu.
```

---

## 6. Jeśli zabraknie czasu

- **Agent 2 się przeciąga:** zostaw listę i szczegóły rezerwacji, kalendarz floty uprość do siatki. Bez listy i szczegółów nie ma scenariusza.
- **Aparat sprawia kłopoty:** pokaż protokoły na przykładowych zdjęciach; przycisk „Wypełnij przykładowymi" jest w zakresie od początku właśnie po to.
- **Scalenie się sypie:** pokaż rozmówcy każdy obszar osobno na gotowych stanach z danych przykładowych, zamiast jednej ciągłej ścieżki.
- **Minimum na pokaz:** prośba o termin → potwierdzenie w panelu → podpis umowy → protokół zwrotu ze zdjęciami przed/po. Protokół wydania i rozliczenie kaucji można opowiedzieć.
