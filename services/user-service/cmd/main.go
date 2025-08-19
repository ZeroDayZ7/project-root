package main

import (
<<<<<<< HEAD
=======
	"log"
>>>>>>> main
	"user-service/config"
	"user-service/internal/handler"
	"user-service/internal/repository/postgres"
	"user-service/internal/router"
	"user-service/internal/service"
	"user-service/internal/shared/db"
<<<<<<< HEAD
	"user-service/internal/shared/logger"

	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"
)

func main() {
	log, err := logger.NewLogger("development")
	if err != nil {
		panic("Błąd inicjalizacji loggera: " + err.Error())
	}
	defer log.Sync()

	log.Info("Uruchamianie serwera", zap.String("version", "1.0.0"))

	cfg, err := config.LoadConfig(log)
	if err != nil {
		log.Error("Błąd ładowania konfiguracji", zap.Error(err))
		return
	}

	dbConn, err := db.NewDB(cfg.DBConn, log)
	if err != nil {
		log.Error("Błąd połączenia z bazą danych", zap.Error(err))
		return
	}
	defer dbConn.Close()
	log.Info("Połączono z bazą danych")

	repo := postgres.NewUserRepository(dbConn, log)
	svc := service.NewUserService(repo, log)
	h := handler.NewUserHandler(svc, log)

	app := fiber.New(fiber.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			if e, ok := err.(*fiber.Error); ok {
				log.Error("Błąd HTTP", zap.Error(err), zap.String("path", c.Path()))
				return c.Status(e.Code).JSON(fiber.Map{"error": e.Message})
			}
			log.Error("Błąd serwera", zap.Error(err), zap.String("path", c.Path()))
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Wewnętrzny błąd serwera"})
		},
	})

	router.SetupRoutes(app, h, log)

	log.Info("Serwer uruchomiony", zap.String("port", cfg.Port))
	if err := app.Listen(":" + cfg.Port); err != nil {
		log.Error("Błąd uruchamiania serwera", zap.Error(err))
	}
=======

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatal("Błąd konfiguracji:", err)
	}

	dbConn, err := db.NewDB(cfg.DBConn)
	if err != nil {
		log.Fatal("Błąd połączenia z bazą:", err)
	}
	defer dbConn.Close()

	repo := postgres.NewUserRepository(dbConn)
	svc := service.NewUserService(repo)
	h := handler.NewUserHandler(svc)

	app := fiber.New()
	app.Use(logger.New())

	app.Post("/check-email", h.CheckEmail)

	log.Printf("Serwer działa na :%s", cfg.Port)
	log.Fatal(app.Listen(":" + cfg.Port))
>>>>>>> main
}
