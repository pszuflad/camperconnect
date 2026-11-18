/*
 * Treść umowy, regulaminu i cennika dla K2 (umowa.html) i K2a (umowa-podpisana.html).
 * Jedno źródło tekstu dla obu ekranów — przepisane z docs/CC_Dokumenty_Wypozyczalni.md (pkt 2–5).
 * Wstawia HTML do elementów <div data-dokument="umowa|regulamin|cennik">.
 * Ładuj na końcu <body>, przed CC.gotowe — działa synchronicznie, bez zależności.
 */
(function () {
  var D = {};

  D.umowa = [
    '<p>zawarta w dniu <b>14.03.2027</b> w Giżycku pomiędzy:</p>',
    '<p><b>Wynajmującym:</b> Kamper na Mazury Marek Wiśniewski, ul. Jeziorna 5, 11-500 Giżycko, NIP 000-000-00-00, reprezentowanym przez Marka Wiśniewskiego,</p>',
    '<p>a</p>',
    '<p><b>Najemcą:</b> Anna Kowalska, ul. Lipowa 12/4, 02-345 Warszawa, PESEL 85010112345, dowód osobisty ABC 123456, prawo jazdy 01234/12/1234, kat. B od 2012,</p>',
    '<p>zwanymi razem Stronami.</p>',

    '<h2>I. Przedmiot umowy</h2><ol>',
    '<li>Wynajmujący oddaje Najemcy w najem pojazd: Fiat Ducato alkowa, nr rej. NGI 4K27, VIN ZFA25000000K27014 („Przedmiot najmu”).</li>',
    '<li>Warunkiem zawarcia umowy jest wpłata opłaty rezerwacyjnej (zadatku) w wysokości 1 950 zł przelewem.</li>',
    '<li>Przedmiot najmu wyposażony jest w urządzenia wskazane przez producenta oraz w wyposażenie wymienione w Protokole wydania.</li>',
    '<li>Najemca potwierdzi przy wydaniu, że stan techniczny Przedmiotu najmu jest mu znany i nie zgłasza zastrzeżeń innych niż wpisane w Protokole wydania, oraz że został przeszkolony z obsługi i otrzymał Skróconą Instrukcję Obsługi.</li>',
    '<li>Najemca oświadcza, że zapoznał się z Regulaminem i Ogólnymi Warunkami Ubezpieczenia, stanowiącymi załączniki do umowy.</li>',
    '</ol>',

    '<h2>II. Czas trwania najmu, odbiór oraz zwrot</h2><ol>',
    '<li>Najem trwa od 11.07.2027, godz. 10:00 do 21.07.2027, godz. 16:00.</li>',
    '<li>Odbiór i zwrot następują w siedzibie Wynajmującego, chyba że Strony ustalą inaczej.</li>',
    '<li>Wynajmujący może żądać natychmiastowego zwrotu Przedmiotu najmu w razie jego uszkodzenia, wyrządzenia szkody, naruszenia umowy lub Regulaminu albo utraty uprawnień do kierowania — w terminie 24 godzin od wezwania (także e-mailem lub telefonicznie).</li>',
    '<li>Jeżeli Najemca nie zwróci Przedmiotu najmu w terminie bez zgody Wynajmującego, Wynajmujący powiadomi organy ścigania.</li>',
    '<li>Za każdą rozpoczętą dobę opóźnienia w zwrocie Najemca zapłaci karę umowną równą potrójnej stawce dobowej (1 950 zł), chyba że Strony uzgodniły przedłużenie najmu.</li>',
    '</ol>',

    '<h2>III. Wynagrodzenie</h2><ol>',
    '<li>Czynsz najmu wynosi 650 zł brutto za dobę.</li>',
    '<li>Całkowite wynagrodzenie wynosi 6 500 zł brutto (słownie: sześć tysięcy pięćset złotych) i obejmuje przygotowanie pojazdu do podróży.</li>',
    '<li>Wynagrodzenie płatne jest z góry, najpóźniej na 7 dni przed wydaniem, na rachunek 00 1020 0000 0000 0000 0000 0000. Brak wpłaty w terminie uprawnia Wynajmującego do odmowy wydania i anulowania rezerwacji; opłata rezerwacyjna nie podlega wówczas zwrotowi.</li>',
    '<li>Niezależnie od wynagrodzenia Najemca wpłaca kaucję 5 000 zł zabezpieczającą należności i roszczenia Wynajmującego — w dniu odbioru, gotówką lub przelewem zaksięgowanym najpóźniej w dniu odbioru.</li>',
    '<li>Kaucja jest zwracana w terminie 7 dni od zwrotu Przedmiotu najmu, jeżeli jego stan jest zgodny z Protokołem wydania, po potrąceniu należności według Cennika.</li>',
    '</ol>',

    '<h2>IV. Ubezpieczenie</h2><ol>',
    '<li>Przedmiot najmu jest ubezpieczony w zakresie OC i AC; potwierdzenie ubezpieczenia i Ogólne Warunki Ubezpieczenia Najemca otrzymuje wraz z dowodem rejestracyjnym.</li>',
    '<li>Ubezpieczenie nie obejmuje szkód powstałych wskutek niewłaściwej eksploatacji ani wyłączonych w OWU lub Regulaminie. Za szkody nieobjęte ubezpieczeniem lub przewyższające wypłatę ubezpieczyciela odpowiada Najemca.</li>',
    '</ol>',

    '<h2>V. Kierowcy</h2><ol>',
    '<li>Kierowca główny: Anna Kowalska, prawo jazdy 01234/12/1234.</li>',
    '<li>Kolejny kierowca: Tomasz Kowalski, prawo jazdy 04567/09/1234.</li>',
    '<li>Osoby korzystające z pojazdu: Tomasz Kowalski, dwoje dzieci; pies.</li>',
    '<li>Przewidywana trasa i miejsce pobytu: Mazury (Giżycko – Mikołajki – Ruciane-Nida).</li>',
    '<li>Osoba do kontaktu w czasie najmu: Ewa Kowalska, tel. 601 222 333.</li>',
    '</ol>',

    '<h2>VI. Oświadczenia Najemcy</h2><ol>',
    '<li>Najemca zapoznał się z Regulaminem, akceptuje go w całości, poinstruuje pozostałych użytkowników i odpowiada za przestrzeganie go przez nich.</li>',
    '<li>Najemca zapoznał się z Cennikiem usług dodatkowych i kar i akceptuje jego warunki.</li>',
    '<li>Najemca zapoznał się z Ogólnymi Warunkami Ubezpieczenia.</li>',
    '<li>Oświadczenia o stanie technicznym pojazdu i odbytym instruktażu Najemca składa w Protokole wydania.</li>',
    '</ol>',

    '<h2>VII. Postanowienia końcowe</h2><ol>',
    '<li>Zmiany umowy wymagają formy pisemnej lub elektronicznej pod rygorem nieważności.</li>',
    '<li>Spory rozstrzyga sąd właściwy dla siedziby Wynajmującego.</li>',
    '<li>W sprawach nieuregulowanych stosuje się przepisy Kodeksu cywilnego.</li>',
    '<li>Załączniki stanowią integralną część umowy.</li>',
    '</ol>',

    '<h2>Załączniki</h2><ol class="dok-zalaczniki">',
    '<li>Regulamin wynajmu</li>',
    '<li>Ogólne Warunki Ubezpieczenia (PDF ubezpieczyciela — w makiecie bez pliku)</li>',
    '<li>Skrócona Instrukcja Obsługi (wręczana przy wydaniu)</li>',
    '<li>Cennik usług dodatkowych i kar</li>',
    '<li>Protokół wydania i zwrotu</li>',
    '</ol>'
  ].join('');

  D.regulamin = [
    '<p class="dok-wstep">Regulamin określa prawa i obowiązki Najemcy oraz Wynajmującego, stanowi Załącznik nr 1 do Umowy Najmu i staje się wiążący z chwilą jej podpisania.</p>',

    '<h2>I. Przedmiot najmu i warunki zawarcia umowy</h2><ul>',
    '<li>Pojazd wynajmowany jest wyłącznie w celach rekreacyjnych; opis pojazdu, wyposażenia i stanu zawiera protokół wydania podpisany przez Strony.</li>',
    '<li>Najemcą może być osoba, która ukończyła 23 lata, ma prawo jazdy kat. B od co najmniej 2 lat i ważny dowód osobisty lub paszport. Przy zestawie (samochód + przyczepa) powyżej 3 500 kg DMC — kat. B+E, B96 lub C+E (dotyczy przyczep).</li>',
    '<li>Kierować może tylko Najemca lub Kolejny Kierowca wskazany w umowie; w dniu podpisania umowy przedstawiają dokument tożsamości i prawo jazdy.</li>',
    '<li>W umowie Najemca wskazuje osoby korzystające z pojazdu. Podnajem i oddanie pojazdu do używania osobom trzecim wymaga pisemnej zgody Wynajmującego.</li>',
    '</ul>',

    '<h2>II. Ubezpieczenie i odpowiedzialność</h2><ul>',
    '<li>Każdy pojazd ma ubezpieczenie OC i AC; Najemca otrzymuje OWU.</li>',
    '<li>Najemca odpowiada w całości m.in. za szkody: umyślne lub z rażącego niedbalstwa (zagubienie kluczyków, dokumentów, uszkodzenie wnętrza i wyposażenia), po alkoholu lub środkach odurzających, przy ucieczce z miejsca zdarzenia, spowodowane przez osobę nieuprawnioną, wynikające z nieprzestrzegania przepisów i instrukcji, oraz gdy ubezpieczyciel odmówi wypłaty.</li>',
    '<li>Gdy odszkodowanie nie pokrywa pełnej szkody, Najemca wyrównuje różnicę. Odpowiada także za mandaty i opłaty powstałe w czasie najmu, również ujawnione po zwrocie.</li>',
    '</ul>',

    '<h2>III. Obowiązki Najemcy</h2><ul>',
    '<li>Korzystanie z pojazdu zgodnie z umową, Regulaminem i instrukcją; zabezpieczenie przed kradzieżą; przechowywanie dokumentów i kluczy poza pojazdem.</li>',
    '<li>Zakazy: kierowanie po alkoholu lub środkach odurzających; <b>palenie tytoniu i e-papierosów w pojeździe</b>; udział w imprezach samochodowych i przewóz materiałów niebezpiecznych; przekraczanie dopuszczalnej liczby osób i ładowności; przeróbki pojazdu; wyjazd poza UE bez pisemnej zgody; wjazd na tereny objęte działaniami wojennymi.</li>',
    '<li>W czasie jazdy zawór butli gazowej zakręcony.</li>',
    '<li><b>Uwaga:</b> czas całkowitego spalenia pojazdu wynosi ok. 10 minut. W przypadku zaprószenia ognia należy natychmiast opuścić pojazd, nie ratując pozostawionych rzeczy.</li>',
    '</ul>',

    '<h2>IV. Obowiązki Wynajmującego</h2><ul>',
    '<li>Wydanie pojazdu czystego, sprawnego, z pełną dokumentacją — co potwierdza protokół wydania; przekazanie instrukcji obsługi i OWU.</li>',
    '</ul>',

    '<h2>V. Rezerwacja, zawarcie umowy i płatności</h2><ul>',
    '<li>Rezerwacja osobiście, telefonicznie lub elektronicznie; Wynajmujący potwierdza ją e-mailem. Rezerwacja nie jest zawarciem umowy.</li>',
    '<li>Opłata rezerwacyjna (zadatek) — 30% czynszu w ciągu 3 dni od potwierdzenia; brak wpłaty oznacza rezygnację z rezerwacji.</li>',
    '<li>Pozostała część czynszu — na 7 dni przed rozpoczęciem najmu; brak wpłaty oznacza rezygnację, a opłata rezerwacyjna nie podlega zwrotowi.</li>',
    '<li>Zmiana terminu — za zgodą Wynajmującego, przy dostępności pojazdu, zgłoszona co najmniej 30 dni przed najmem, w formie aneksu.</li>',
    '</ul>',

    '<h2>VI. Kaucja</h2><ul>',
    '<li>Kaucja w wysokości zależnej od pojazdu, płatna najpóźniej w dniu wydania.</li>',
    '<li>Wynajmujący potrąca z kaucji należności nieuregulowane w dniu zwrotu — według Cennika usług dodatkowych i kar (załącznik nr 4). Kradzież lub szkoda całkowita oraz złamanie zakazu palenia — utrata całej kaucji.</li>',
    '<li>Utrata kaucji lub jej części także przy szkodach nieobjętych AC: wnętrze, instalacje, meble, tapicerka, markiza, przedsionek, meble turystyczne, zastawa.</li>',
    '<li>Gdy kaucja nie pokrywa szkód — dopłata w ciągu 14 dni od zawiadomienia. Gdy stan przy zwrocie zgodny z protokołem wydania — zwrot kaucji w ciągu 7 dni.</li>',
    '</ul>',

    '<h2>VII. Wypadek, kolizja, szkoda, awaria</h2><ul>',
    '<li>Przy kolizji, wypadku lub kradzieży — niezwłoczne wezwanie Policji, protokół (uczestnicy, świadkowie, pojazdy, polisy, podpisy) i niezwłoczne powiadomienie Wynajmującego.</li>',
    '</ul>',

    '<h2>VIII. Rozwiązanie umowy przez Najemcę</h2><ul>',
    '<li>Na piśmie. Ponad 90 dni przed najmem — Wynajmujący zatrzymuje 50% opłaty rezerwacyjnej; później — całą. Bez potrąceń, jeśli Najemca wskaże klienta na swoje miejsce.</li>',
    '</ul>',

    '<h2>IX. Wydanie i zwrot pojazdu</h2><ul>',
    '<li>Wydanie na podstawie protokołu, <b>wyłącznie po instruktażu</b> prowadzonym przez Wynajmującego.</li>',
    '<li>Zwrot w terminie i miejscu z umowy, na podstawie protokołu zwrotu podpisanego przez obie Strony; pojazd wyczyszczony wewnątrz i z zewnątrz. Wcześniejszy zwrot nie obniża czynszu.</li>',
    '<li>Przedłużenie najmu — zgłoszone co najmniej 3 dni przed zwrotem, przy dostępności, według cennika.</li>',
    '<li>Niezwrócenie pojazdu w ciągu 6 godzin po terminie bez powiadomienia — traktowane jako przywłaszczenie: zawiadomienie Policji i utrata całej kaucji.</li>',
    '<li>Zwrot w dzień wolny od pracy lub w godz. 17:00–20:00 — za zgodą Wynajmującego, opłata 100 zł.</li>',
    '<li>Najemca odpowiada też za szkody z okresu najmu ujawnione po zwrocie.</li>',
    '</ul>',

    '<h2>X. Prawo właściwe</h2><ul>',
    '<li>Prawo polskie, Kodeks cywilny, sąd właściwy dla siedziby Wynajmującego.</li>',
    '</ul>',

    '<h2>XI. Dane osobowe</h2><ul>',
    '<li>Wynajmujący jest administratorem danych (RODO) Najemcy, kierowców i osób korzystających, w zakresie: imię, nazwisko, adres, PESEL, dane dowodu i prawa jazdy — wyłącznie w celu wykonania umowy i ubezpieczenia. Najemca sprawdza zgodność danych w umowie.</li>',
    '</ul>',

    '<h2>XII. Wyjazd za granicę</h2><ul>',
    '<li>Wyłącznie za pisemną zgodą Wynajmującego; zakaz podróży do regionów objętych wojną oraz do Rosji, Białorusi, Ukrainy i Mołdawii; wymogi wyposażenia innych państw Najemca spełnia na własny koszt.</li>',
    '</ul>'
  ].join('');

  var cennik = [
    ['Najem przedsionka lub markizy', '10 zł / dzień'],
    ['Najem zestawu 4 krzeseł i stołu turystycznego', '10 zł / dzień'],
    ['Oddanie brudnej, nieposprzątanej wewnątrz przyczepy / pojazdu', '100 zł'],
    ['Sprzątanie po zwierzętach z praniem pokrowców', '250 zł'],
    ['Oddanie brudnej kasety toalety chemicznej (nawet częściowo z fekaliami)', '100 zł'],
    ['Zalanie pomieszczenia toalety fekaliami lub innymi płynami', '1 500 zł'],
    ['Podstawienie pojazdu w Polsce', '3 zł / km (w dwie strony)'],
    ['Odebranie pojazdu w Polsce', '3 zł / km (w dwie strony)'],
    ['Podstawienie w dni świąteczne i wolne od pracy', '6 zł / km (w dwie strony)'],
    ['Odebranie w dni świąteczne i wolne od pracy', '6 zł / km (w dwie strony)'],
    ['Złamanie zakazu palenia (także e-papierosów)', '4 000 zł'],
    ['Prowadzenie pod wpływem alkoholu lub innych niedozwolonych substancji', '5 000 zł'],
    ['Niepowiadomienie Policji o zdarzeniu drogowym z innym pojazdem', '2 500 zł'],
    ['Pranie ubrudzonych materacy, siedzeń, oparć, pokrowców', 'od 50 zł / element'],
    ['Wymiana narożnika tylnego zderzaka', 'od 300 zł / narożnik'],
    ['Wymiana tylnego zderzaka bez lamp', 'od 1 900 zł'],
    ['Wymiana tylnego zderzaka z lampami', 'od 2 900 zł'],
    ['Polerowanie okien po szkodach od gałęzi', 'od 100 zł / okno'],
    ['Polerowanie rys na lakierze', '150 zł / metr bieżący'],
    ['Wlanie do zbiornika wody czystej innej substancji', '500 zł'],
    ['Inne naprawy', 'według faktur za części i usługę'],
    ['Inne naprawy wnętrza, karoserii, braki wyposażenia', 'koszt naprawy + 2 500 zł rekompensaty, jeśli pojazd nie nadaje się do kolejnego najmu'],
    ['Wszczęcie procedury poszukiwania niezwróconego pojazdu', '5 000 zł'],
    ['Zgubienie / nieoddanie kluczyków, dowodu rejestracyjnego, tablic, pilota, potwierdzenia ubezpieczenia', '300 zł / każda rzecz'],
    ['Dojazd z zapasowym kluczykiem (Polska i Europa) lub inny wyjazd do Najemcy', '5 zł / km (w dwie strony) + 50 zł / rozpoczętą godzinę'],
    ['Zgubienie lub zniszczenie pilota movera (przyczepy)', '1 000 zł'],
    ['Uszkodzenie movera (przyczepy)', '5 000 zł'],
    ['Zniszczenie przedsionka (suwaki, dziury, stelaż)', '1 000 zł'],
    ['Uszkodzenia wskutek nadmiernej prędkości', 'według wyceny serwisu i faktury'],
    ['Brak paliwa przy zwrocie (kampery)', '8 zł / l + 100 zł za tankowanie']
  ];

  D.cennik =
    '<p class="dok-wstep">Kwoty brutto.</p>' +
    '<div class="tabela-ramka"><table class="tabela dok-cennik"><thead><tr><th>Nr</th><th>Pozycja</th><th class="dok-kwota">Kwota</th></tr></thead><tbody>' +
    cennik.map(function (p, i) {
      return '<tr><td>' + (i + 1) + '</td><td>' + p[0] + '</td><td class="dok-kwota">' + p[1] + '</td></tr>';
    }).join('') +
    '</tbody></table></div>' +
    '<p class="dok-oswiadczenie">Niniejszym oświadczam, że zapoznałem się i akceptuję warunki niniejszego cennika.</p>';

  Array.prototype.forEach.call(document.querySelectorAll('[data-dokument]'), function (e) {
    var tresc = D[e.getAttribute('data-dokument')];
    // twarde spacje w kwotach: „1 950 zł” nie łamie się między wierszami
    if (tresc) e.innerHTML = tresc.replace(/(\d) (\d{3})/g, '$1\u00a0$2').replace(/ zł/g, '\u00a0zł');
  });
})();
