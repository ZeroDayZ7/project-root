package main

import (
	"log"
	"net/http"
	"user-service/config"
	"user-service/internal/handler"
	"user-service/internal/repository/postgres"
	"user-service/internal/service"
	"user-service/internal/shared/db"
)

func main() {
    // Wczytaj konfigurację
    config, err := config.LoadConfig()
    if err != nil {
        log.Fatal("Błąd konfiguracji:", err)
    }

    // Połącz z PostgreSQL
    db, err := db.NewDB(config.DBConn)
    if err != nil {
        log.Fatal("Błąd połączenia z bazą:", err)
    }
    defer db.Close()

    // Inicjalizuj warstwy
    repo := postgres.NewUserRepository(db)
    svc := service.NewUserService(repo)
    handler := handler.NewUserHandler(svc)

    // Ustaw router HTTP
    http.HandleFunc("/users", handler.CreateUser)
    http.HandleFunc("/users/", handler.GetUser)

    // Uruchom serwer
    addr := ":" + config.Port
    log.Printf("Serwer działa na %s", addr)
    log.Fatal(http.ListenAndServe(addr, nil))
}