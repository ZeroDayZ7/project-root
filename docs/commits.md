### Co do przedrostków (prefixów) w commitach:

Popularna konwencja to tzw. **Conventional Commits**, które ułatwiają późniejsze generowanie changelogów i porządkowanie historii. Najczęściej używane prefixy to:

* `feat:` — nowa funkcjonalność (feature)
* `fix:` — poprawka błędu (bugfix)
* `chore:` — zadania porządkowe, konfiguracja, zmiany niewpływające na kod aplikacji
* `docs:` — zmiany w dokumentacji
* `style:` — zmiany dotyczące formatowania, spacji, itp.
* `refactor:` — zmiany w kodzie, które nie dodają funkcjonalności ani nie naprawiają błędów
* `test:` — dodanie lub poprawa testów

---

### Przykład commit po angielsku z prefixem:

```
feat: add emojis to logs and include emoji documentation file
```

Lub jeśli chcesz commitować po polsku (np. w projekcie wewnętrznym):

```
feat: dodano emoji do logów oraz plik z emoji do dokumentacji
```