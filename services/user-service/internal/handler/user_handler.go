package handler

import (
	"user-service/internal/service"
	"user-service/internal/shared/logger"

	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"
)

type UserHandler struct {
    service *service.UserService
    logger  *logger.Logger
}

func NewUserHandler(service *service.UserService, logger *logger.Logger) *UserHandler {
    return &UserHandler{service: service, logger: logger}
}

// POST /check-email
func (h *UserHandler) CheckEmail(c *fiber.Ctx) error {
    var input struct {
        Email string `json:"email"`
    }

    if err := c.BodyParser(&input); err != nil {
        h.logger.Error("Błąd parsowania żądania", zap.Error(err), zap.String("endpoint", "/check-email"))
        return fiber.NewError(fiber.StatusBadRequest, "Nieprawidłowy format danych")
    }

    h.logger.Debug("Sprawdzanie emaila", zap.String("email", input.Email))

    exists, err := h.service.IsEmailExists(input.Email)
    if err != nil {
        h.logger.Error("Błąd sprawdzania emaila", zap.Error(err), zap.String("email", input.Email))
        return fiber.NewError(fiber.StatusInternalServerError, err.Error())
    }

    h.logger.Info("Email sprawdzony", zap.Bool("exists", exists), zap.String("email", input.Email))
    return c.JSON(fiber.Map{"success": exists})
}