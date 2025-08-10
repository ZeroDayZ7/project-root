## ✅ Co można trzymać w `.github/`?

| Folder / Plik                      | Co robi                                                   | Dla kogo / kiedy używane                  |
| ---------------------------------- | --------------------------------------------------------- | ----------------------------------------- |
| `.github/workflows/`               | GitHub Actions (CI/CD, testy, deploye)                    | Automatyzacja                             |
| `.github/ISSUE_TEMPLATE/`          | Szablony zgłoszeń błędów i propozycji                     | Dla contributorów (łatwe tworzenie issue) |
| `.github/PULL_REQUEST_TEMPLATE.md` | Szablon PR (np. checklista, opis zmian)                   | Standaryzacja PR-ów                       |
| `.github/CODEOWNERS`               | Automatyczne przypisanie reviewerów do plików/katalogów   | Review proces, kontrola jakości           |
| `.github/FUNDING.yml`              | Linki do dotacji/sponsorów (np. GitHub Sponsors, Patreon) | Open source, finansowanie                 |
| `.github/CONTRIBUTING.md`          | Jak kontrybuować, wymagania, style kodowania              | Wytyczne dla osób spoza zespołu           |
| `.github/SECURITY.md`              | Jak zgłaszać luki bezpieczeństwa                          | Bezpieczne disclosure                     |
| `.github/CITATION.cff`             | Informacja jak cytować repo (dla naukowców)               | Projekty akademickie, bibliografia        |
| `.github/DEPENDENCY_GRAPH.yml`     | Konfiguracja dla GitHub Dependency Graph                  | Zależności i bezpieczeństwo               |

---

## 🧠 Przykład struktury `.github/` w profesjonalnym projekcie:

```
.github/
├── workflows/
│   ├── ci.yml
│   └── deploy.yml
├── ISSUE_TEMPLATE/
│   ├── bug_report.yml
│   └── feature_request.yml
├── PULL_REQUEST_TEMPLATE.md
├── CODEOWNERS
├── CONTRIBUTING.md
├── SECURITY.md
├── FUNDING.yml
```

---

## ✨ Jakie korzyści to daje?

* ✅ **Standaryzacja** — contributorzy wiedzą, jak działać.
* ✅ **Automatyzacja** — wszystko, co możliwe, dzieje się samo (CI/CD, review).
* ✅ **Bezpieczeństwo** — kontakt w razie luk, review zmian przez wybranych devów.
* ✅ **Profesjonalizm** — repo wygląda na dopracowane, zachęca do kontrybucji.

---

## 🔧 Bonus: CODEOWNERS – przykład

```txt
# Automatyczne przypisanie reviewerów
/docs/ @tech-writer-team
/src/auth/ @security-lead
*.ts @typescript-lead
```

---

## 🔐 Bonus: SECURITY.md – przykład

```md
# Zgłaszanie luk bezpieczeństwa

Jeśli znalazłeś/aś błąd bezpieczeństwa, prosimy NIE zgłaszać go w issues publicznych.
Zgłoś bezpośrednio na security@example.com. Odpowiemy w 48h.
```