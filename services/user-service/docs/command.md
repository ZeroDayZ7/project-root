| Komenda               | Opis                                                               | Przykład                        |
| --------------------- | ------------------------------------------------------------------ | ------------------------------- |
| `go version`          | Sprawdza zainstalowaną wersję Go.                                  | `go version`                    |
| `go env`              | Wyświetla zmienne środowiskowe Go (np. `GOPATH`, `GOROOT`).        | `go env`                        |
| `go mod init <nazwa>` | Inicjuje nowy moduł Go w bieżącym folderze (tworzy plik `go.mod`). | `go mod init myapp`             |
| `go mod tidy`         | Dodaje brakujące zależności i usuwa nieużywane.                    | `go mod tidy`                   |
| `go get <pakiet>`     | Pobiera i instaluje zewnętrzny pakiet.                             | `go get github.com/gorilla/mux` |
| `go build`            | Kompiluje projekt do pliku wykonywalnego (binarki).                | `go build`                      |
| `go run <plik.go>`    | Uruchamia kod bez wcześniejszej kompilacji.                        | `go run main.go`                |
| `go test`             | Uruchamia testy w katalogu.                                        | `go test`                       |
| `go install`          | Kompiluje i instaluje aplikację w `$GOPATH/bin`.                   | `go install`                    |
| `go clean`            | Usuwa pliki tymczasowe po kompilacji.                              | `go clean`                      |

---

💡 **Minimalny przykład uruchomienia serwera w Go**

```go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "Hello, Go server!")
    })

    fmt.Println("Server running on http://localhost:8080")
    http.ListenAndServe(":8080", nil)
}
```

Uruchomienie:

```bash
go run main.go
```