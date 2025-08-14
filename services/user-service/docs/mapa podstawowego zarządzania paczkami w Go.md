## 🔹 1. Inicjalizacja modułu

Tworzysz nowy projekt Go i inicjalizujesz moduł:

```bash
go mod init github.com/twojnick/myproject
```

* Tworzy `go.mod` z nazwą modułu.
* To odpowiednik `pnpm init`.

---

## 🔹 2. Dodawanie paczek

### a) Pobranie konkretnej paczki

```bash
go get github.com/gin-gonic/gin@latest
```

* Pobiera paczkę do cache Go i dodaje wpis w `go.mod`.
* Możesz określić wersję (`@v1.9.0`) lub `latest`.

### b) Import w kodzie

```go
import "github.com/gin-gonic/gin"
```

* Paczka musi być użyta w kodzie, inaczej `tidy` ją usunie.

---

## 🔹 3. Aktualizacja paczek

```bash
go get -u ./...
```

* Aktualizuje wszystkie zależności do nowszych wersji (minor/patch).
* Możesz też aktualizować jedną paczkę:

```bash
go get -u github.com/gin-gonic/gin
```

---

## 🔹 4. Usuwanie paczek

1. Usuń **wszystkie importy** paczki z kodu.
2. W katalogu projektu:

```bash
go mod tidy
```

* Usuwa z `go.mod` i `go.sum` paczki, których już nikt nie używa.
* Działa jak `pnpm remove`.

---

## 🔹 5. Czyszczenie cache (opcjonalnie)

```bash
go clean -modcache
```

* Czyści cały cache Go (`GOPATH/pkg/mod`).
* Rzadko potrzebne, np. gdy paczka jest uszkodzona.

---

## 🔹 6. Sprawdzanie statusu

* Lista paczek w `go.mod` → po prostu otwórz plik.
* Weryfikacja zależności:

```bash
go list -m all
```

* To pokazuje wszystkie paczki aktualnie używane przez Twój projekt.

---

### 📌 Podsumowanie analogii do Node/pnpm

| Node/pnpm             | Go                                |
| --------------------- | --------------------------------- |
| `pnpm init`           | `go mod init`                     |
| `pnpm add express`    | `go get github.com/gin-gonic/gin` |
| `pnpm remove express` | usuń import + `go mod tidy`       |
| `pnpm update`         | `go get -u ./...`                 |
| `pnpm install`        | `go mod tidy` (dodaje brakujące)  |
| `pnpm prune`          | `go mod tidy`                     |
