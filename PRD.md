# PRD: Aplikacja do sprawdzania historii pojazdu po VIN

## 1. Opis Projektu (Overview)
Prosta, nowoczesna aplikacja webowa pozwalająca użytkownikowi na wpisanie 17-znakowego numeru VIN i natychmiastowe uzyskanie rozkodowanych informacji o pojeździe (marka, model, rok produkcji, typ silnika, itp.). Aplikacja ma być stworzona w nurcie "vibe codingu", z naciskiem na estetykę i szybkość działania.

## 2. Cele (Goals)
- Stworzenie funkcjonalnego MVP (Minimum Viable Product).
- Minimalistyczny i bardzo czytelny interfejs użytkownika (UI).
- Płynne działanie na urządzeniach mobilnych i desktopach (Mobile-first).

## 3. Funkcjonalności (Features)
### MVP (Wersja podstawowa na start)
1. **Wyszukiwarka na stronie głównej:**
   - Duże, wyśrodkowane pole tekstowe (Input) na numer VIN.
   - Walidacja front-endowa: VIN musi mieć dokładnie 17 znaków (tylko litery i cyfry, bez I, O, Q).
   - Automatyczne zamienianie wpisywanych małych liter na wielkie.
2. **Integracja z API (Dekodowanie VIN):**
   - Wysłanie zapytania z numerem VIN do zewnętrznego API po kliknięciu "Sprawdź".
   - Obsługa stanu ładowania (skeleton lub spinner w trakcie czekania na dane).
3. **Ekran wyników:**
   - Wyświetlenie kluczowych danych w estetycznych kartach (np. Karta "Podstawowe informacje", Karta "Specyfikacja silnika").
4. **Obsługa błędów:**
   - Zgrabne komunikaty o błędach (np. "Niepoprawny numer VIN", "Brak danych dla tego pojazdu", "Błąd połączenia z serwerem").

### Funkcjonalności na przyszłość (V2)
- Możliwość wygenerowania raportu do pliku PDF.
- Zapisywanie historii ostatnich wyszukiwań w pamięci przeglądarki (Local Storage).
- Podłączenie płatnego API z pełną historią szkód i przebiegiem.

## 4. Przepływ Użytkownika (User Flow)
1. Użytkownik wchodzi na stronę główną.
2. Widzi zachęcający nagłówek (np. "Sprawdź co kryje Twój samochód") oraz pole wyszukiwania.
3. Wpisuje VIN i zatwierdza (Enter lub przycisk).
4. Interfejs pokazuje animację ładowania.
5. Wyniki pojawiają się na ekranie bez przeładowywania strony (Single Page Application).

## 5. Stos Technologiczny (Tech Stack) - Sugestia dla AI
*Ten stack jest idealny dla AI do wygenerowania nowoczesnej aplikacji z marszu.*
- **Framework:** Next.js (App Router) + React.
- **Język:** TypeScript (zapewni brak błędów z typami danych z API).
- **Stylizacja:** Tailwind CSS.
- **Komponenty UI:** shadcn/ui oraz Lucide Icons (dla nowoczesnego wyglądu).
- **Zewnętrzne API:** Darmowe [NHTSA VIN Decoder API](https://vpic.nhtsa.dot.gov/api/) (amerykańskie API rządowe - świetne, bezpłatne narzędzie na start, które nie wymaga klucza autoryzacyjnego) lub dowolne darmowe API z platformy RapidAPI (np. "VIN Decoder").
- **Hosting/Wdrożenie:** Vercel.

## 6. Zasady kodowania (Dla AI)
- Pisz czysty, modułowy kod. Każdy większy komponent UI trzymaj w osobnym pliku.
- Skup się na obsłudze błędów i pustych stanów (empty states).
- Używaj Server Actions z Next.js do ukrycia komunikacji z API po stronie serwera.
