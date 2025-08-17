package router

import (
	"time"
	"user-service/internal/handler"
	"user-service/internal/shared/logger"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	fiberlogger "github.com/gofiber/fiber/v2/middleware/logger"
	"go.uber.org/zap"
)

func SetupRoutes(app *fiber.App, h *handler.UserHandler, logger *logger.Logger) {
	// Middleware logowania dla wszystkich żądań
	app.Use(fiberlogger.New(fiberlogger.Config{
		Format:     "${time} ${method} ${path} ${status} ${latency}\n",
		TimeFormat: "2006-01-02 15:04:05",
	}))

	// Grupa /auth z limiterem
	auth := app.Group("/auth")
	auth.Use(limiter.New(limiter.Config{
		Max:        10,
		Expiration: 1 * time.Minute,
		KeyGenerator: func(c *fiber.Ctx) string {
			return c.IP()
		},
		LimitReached: func(c *fiber.Ctx) error {
			logger.Warn("Przekroczono limit żądań", zap.String("ip", c.IP()), zap.String("path", c.Path()))
			return c.Status(fiber.StatusTooManyRequests).JSON(fiber.Map{
				"error": "Zbyt wiele żądań",
			})
		},
	}))

	// Endpointy auth
	auth.Post("/check-password", h.CheckPassword)
	auth.Post("/verify-2fa", h.Verify2FA)

	// Endpointy użytkownika
	app.Post("/check-email", h.CheckEmail)
}
