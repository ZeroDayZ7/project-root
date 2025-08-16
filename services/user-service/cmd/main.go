package main

import (
	"log"
	"user-service/config"
	"user-service/internal/handler"
	"user-service/internal/repository/postgres"
	"user-service/internal/service"
	"user-service/internal/shared/db"

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
}
