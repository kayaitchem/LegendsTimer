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

## Uruchomienie lokalne

Otwórz `index.html` w przeglądarce — to jeden samodzielny plik, bez zależności i bez budowania.

## Licencja

MIT
