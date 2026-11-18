/* Dane protokołu zdawczo-odbiorczego (docs/CC_Dokumenty_Wypozyczalni.md, pkt 6) — wspólne dla M1 i M1a.
   Wpisane na sztywno; nic tu się nie liczy. */
window.WYDANIE = {
  wyposazenie: [
    { grupa: 'Klucze i dokumenty', pozycje: [
      ['Kluczyk do pojazdu', '2 kpl.'],
      ['Klucz do schowków', '1'],
      ['Dowód rejestracyjny', '1'],
      ['Potwierdzenie ubezpieczenia OC/AC z OWU', '1'],
      ['Zielona karta', '1']
    ] },
    { grupa: 'Na zewnątrz', pozycje: [
      ['Stopień wejściowy', '1'],
      ['Kabel zasilający 230 V', '2'],
      ['Przedłużacz', '1'],
      ['Butla z gazem', '2'],
      ['Wąż do wody', '1'],
      ['Konewka', '1'],
      ['Kliny poziomujące', '2'],
      ['Młotek', '1'],
      ['Śmietnik składany', '1'],
      ['Pasy ściągające', '2'],
      ['Markiza', '1'],
      ['Gaśnica', '1']
    ] },
    { grupa: 'Wnętrze', pozycje: [
      ['Koc', '4'],
      ['Farelka', '1'],
      ['Wentylator', '1'],
      ['Kuchenka elektryczna', '1'],
      ['Garnek', '1'],
      ['Patelnia', '1'],
      ['Sitko', '1'],
      ['Zestaw sztućców i talerzy', '1'],
      ['Zmiotka i szufelka', '1'],
      ['Kaseta toalety', '1']
    ] },
    { grupa: 'Dodatkowe płatne (cennik poz. 1–2)', niezamowione: true, pozycje: [
      ['Przedsionek z podłogą', 'niezamówiony'],
      ['Zestaw 4 krzeseł i stołu', 'niezamówiony']
    ] },
    { grupa: 'Materiały eksploatacyjne', pozycje: [
      ['Butle gazowe pełne', '✓'],
      ['Płyn do toalety chemicznej', '✓'],
      ['Woda w zbiorniku', '✓']
    ] }
  ],
  rozstawienie: [
    'Poziomowanie', 'Podłączenie do sieci elektrycznej', 'Napełnianie zbiornika wody', 'Pompa wody',
    'Opróżnianie kasety toalety', 'Uzupełnianie wody w spłuczce', 'Podłączenie butli gazowej', 'Kuchenka gazowa',
    'Ogrzewanie gazowe', 'Markiza i przedsionek', 'Zasady zwrotu kaucji', 'Wspólny przegląd zdjęć pojazdu'
  ],
  jazda: [
    'Zakręcenie butli gazowej', 'Zamknięcie okien, drzwi i wywietrzników', 'Blokada lodówki',
    'Zabezpieczenie stołu i szafek', 'Schowanie stopnia', 'Sprawdzenie świateł'
  ],
  zdjecia: [
    ['przod', 'Przód'], ['lewy-bok', 'Lewy bok'], ['tyl', 'Tył'], ['prawy-bok', 'Prawy bok'],
    ['dach', 'Dach'], ['wnetrze', 'Wnętrze'], ['licznik', 'Licznik'], ['paliwo', 'Paliwo']
  ]
};
