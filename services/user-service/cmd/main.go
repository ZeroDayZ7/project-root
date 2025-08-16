package main

import (
	"user-service/config"
	"user-service/internal/handler"
	"user-service/internal/repository/postgres"
	"user-service/internal/service"
	"user-service/internal/shared/db"
	"user-service/internal/shared/logger"

	"github.com/gofiber/fiber/v2"
	fiberlogger "github.com/gofiber/fiber/v2/middleware/logger"
	"go.uber.org/zap"
)

func main() {
    // Inicjalizacja loggera
    log, err := logger.NewLogger("development")
    if err != nil {
        panic("Błąd inicjalizacji loggera: " + err.Error())
    }
    defer log.Sync()

    log.Info("Uruchamianie serwera", zap.String("version", "1.0.0"))

    // Ładowanie konfiguracji
    cfg, err := config.LoadConfig(log)
    if err != nil {
        log.Error("Błąd ładowania konfiguracji", zap.Error(err))
        return
    }
    log.Info("Konfiguracja wczytana", zap.String("env", cfg.Env), zap.String("port", cfg.Port))

    // Połączenie z bazą danych
    dbConn, err := db.NewDB(cfg.DBConn, log)
    if err != nil {
        log.Error("Błąd połączenia z bazą danych", zap.Error(err))
        return
    }
    defer dbConn.Close()
    log.Info("Połączono z bazą danych")

    // Inicjalizacja warstw
    repo := postgres.NewUserRepository(dbConn, log)
    svc := service.NewUserService(repo, log)
    h := handler.NewUserHandler(svc, log)

    // Inicjalizacja Fiber
    app := fiber.New()
    app.Use(fiberlogger.New())

    // Endpointy
    app.Post("/check-email", h.CheckEmail)

    log.Info("Serwer uruchomiony", zap.String("port", cfg.Port))
    if err := app.Listen(":" + cfg.Port); err != nil {
        log.Error("Błąd uruchamiania serwera", zap.Error(err))
    }
}