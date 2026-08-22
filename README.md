# LegendsTimer — Metin2 Resp Timer

Timery respawnu do Metin2 z podziałem na kanały **CH1–CH5** i **polskim lektorem AI**,
który z wyprzedzeniem do **5 minut** czyta **nazwę + miejsce + kanał**.

🔗 **https://kayaitchem.github.io/LegendsTimer/**

## Funkcje

- **Nieograniczona liczba timerów** — przycisk „+ Dodaj timer", każdy z własnym kompletem CH1–CH5
- **Pola tekstowe** — `Nazwa` (np. boss) i `Miejsce` (np. mapa/lokacja) dla każdego timera
- **Lektor PL** — Web Speech API, wybór głosu systemowego (np. *Microsoft Paulina*, *Microsoft Adam*)
- **Ostrzeżenie** — konfigurowalne: 30 s / 1 / 2 / 3 / 4 / **5 min** przed końcem (domyślnie 5 min)
- **Gong** — generowany w przeglądarce (bez plików zewnętrznych), 1× przy ostrzeżeniu, 2× przy respie
- **Wspólne timery na żywo** — cała ekipa widzi to samo, zmiany lecą poniżej sekundy (opcjonalne, patrz niżej)
- **Pokoje** — `#nazwa-pokoju` w adresie, każda ekipa ma swoje timery
- **Zapis stanu** — timery i wpisane teksty przeżywają odświeżenie strony (`localStorage`)
- **Motyw Metin2** — złoto, krew, ciemne drewno, font Cinzel

## Stany kanału

| Kolor | Znaczenie |
|---|---|
| szary `PUSTY` | kanał nieustawiony |
| czerwony | odliczanie, przed progiem ostrzeżenia |
| pomarańczowy | ostrzeżenie — zapala się razem z lektorem |
| złoty (pulsuje) | ostatnia minuta |
| zielony `+0:00` | resp — liczy czas od końca |
| niebieski `UP` | 5 min po respie |

## Obsługa

1. Wpisz **nazwę**, **miejsce** i **liczbę minut**.
2. Kliknij kanał (`CH1`–`CH5`), żeby wystartować odliczanie.
3. `RESET` czyści pojedynczy kanał, `✕` usuwa cały timer.
4. Przycisk **Test głosu** sprawdza, czy lektor działa.

## Wymagania lektora

Lektor korzysta z głosów zainstalowanych w systemie. Jeśli lista „Głos" jest pusta:

- **Windows** → Ustawienia → Czas i język → Mowa → Dodaj głosy → *Polski*
- Najlepiej działa w **Chrome / Edge**. Firefox ma słabsze wsparcie Web Speech API.
- Dźwięk włącza się po pierwszym kliknięciu na stronie (wymóg przeglądarek).

## Wspólne timery dla całej ekipy

Domyślnie strona działa **lokalnie** — timery widzi tylko właściciel przeglądarki.
Żeby włączyć wspólne timery w czasie rzeczywistym, wystarczy darmowa baza
**Firebase Realtime Database** (plan Spark, bez karty).

1. Załóż projekt na https://console.firebase.google.com → **Realtime Database** → *Create Database*
   → lokalizacja **europe-west1** → tryb **testowy**.
2. *Project settings* → *Your apps* → **Web** → skopiuj obiekt `firebaseConfig`.
3. Wklej `apiKey`, `authDomain`, `databaseURL` i `projectId` do bloku
   `window.FIREBASE_CONFIG` na górze `index.html`.

Po wgraniu pliku plakietka w lewym górnym rogu paska zmieni się z *Tryb lokalny*
na **Na żywo · nazwa-pokoju · N osób**.

### Pokoje

Adres `.../LegendsTimer/#gildia-xyz` to osobny, niezależny zestaw timerów.
Przycisk **Kopiuj link dla ekipy** kopiuje adres z aktualnym pokojem.

### Reguły bazy

Tryb testowy wygasa po 30 dniach. Trwałe reguły dla tej aplikacji
(*Realtime Database* → *Rules*):

```json
{
  "rules": {
    "rooms": {
      "$room": { ".read": true, ".write": true }
    }
  }
}
```

Każdy, kto zna nazwę pokoju, może odczytywać i zmieniać jego timery —
dlatego warto wybrać nazwę, której nikt nie zgadnie.

### Co jest wspólne, a co prywatne

| Wspólne (chmura) | Prywatne (Twoja przeglądarka) |
|---|---|
| nazwa, miejsce, minuty | wybrany głos lektora |
| momenty zakończenia kanałów | głośność, wyprzedzenie ostrzeżenia |
| | włącznik lektora i gongu |

Lektor odzywa się **u każdego osobno** — nie tylko u osoby, która ustawiła timer.
Czas liczony jest zegarem serwera, więc przestawiony zegar w czyimś komputerze
niczego nie psuje.

## Uruchomienie lokalne

Otwórz `index.html` w przeglądarce — to jeden samodzielny plik, bez zależności i bez budowania.

## Licencja

MIT
