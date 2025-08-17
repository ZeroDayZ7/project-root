package handler

import (
	"user-service/internal/service"
	"user-service/internal/shared/logger"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"go.uber.org/zap"
)

type UserHandler struct {
	service   *service.UserService
	logger    *logger.Logger
	validator *validator.Validate
}

func NewUserHandler(service *service.UserService, logger *logger.Logger) *UserHandler {
	return &UserHandler{
		service:   service,
		logger:    logger,
		validator: validator.New(),
	}
}

type CheckEmailRequest struct {
	Email string `json:"email" validate:"required,email"`
}

type CheckPasswordRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8"`
}

type Verify2FARequest struct {
	Email string `json:"email" validate:"required,email"`
	Code  string `json:"code" validate:"required,len=6"`
}

func (h *UserHandler) CheckEmail(c *fiber.Ctx) error {
	var input CheckEmailRequest
	if err := c.BodyParser(&input); err != nil {
		h.logger.Error("Błąd parsowania żądania", zap.Error(err), zap.String("endpoint", "/check-email"))
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Nieprawidłowy format danych"})
	}

	if err := h.validator.Struct(input); err != nil {
		h.logger.Error("Błąd walidacji", zap.Error(err), zap.String("endpoint", "/check-email"))
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	h.logger.Debug("Sprawdzanie emaila", zap.String("email", input.Email))
	exists, err := h.service.IsEmailExists(input.Email)
	if err != nil {
		h.logger.Error("Błąd sprawdzania emaila", zap.Error(err), zap.String("email", input.Email))
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	h.logger.Info("Email sprawdzony", zap.Bool("exists", exists), zap.String("email", input.Email))
	return c.JSON(fiber.Map{"success": exists})
}

func (h *UserHandler) CheckPassword(c *fiber.Ctx) error {
	var input CheckPasswordRequest
	if err := c.BodyParser(&input); err != nil {
		h.logger.Error("Błąd parsowania żądania", zap.Error(err), zap.String("endpoint", "/auth/check-password"))
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Nieprawidłowy format danych"})
	}

	if err := h.validator.Struct(input); err != nil {
		h.logger.Error("Błąd walidacji", zap.Error(err), zap.String("endpoint", "/auth/check-password"))
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	h.logger.Debug("Sprawdzanie hasła", zap.String("email", input.Email))
	valid, twoFactorEnabled, err := h.service.CheckPassword(input.Email, input.Password)
	if err != nil {
		h.logger.Error("Błąd sprawdzania hasła", zap.Error(err), zap.String("email", input.Email))
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	if !valid {
		h.logger.Info("Nieprawidłowe hasło", zap.String("email", input.Email))
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Nieprawidłowe hasło"})
	}

	h.logger.Info("Hasło poprawne", zap.String("email", input.Email), zap.Bool("2fa_enabled", twoFactorEnabled))
	return c.JSON(fiber.Map{
		"success":            true,
		"two_factor_enabled": twoFactorEnabled,
	})
}

func (h *UserHandler) Verify2FA(c *fiber.Ctx) error {
	var input Verify2FARequest
	if err := c.BodyParser(&input); err != nil {
		h.logger.Error("Błąd parsowania żądania", zap.Error(err), zap.String("endpoint", "/auth/verify-2fa"))
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Nieprawidłowy format danych"})
	}

	if err := h.validator.Struct(input); err != nil {
		h.logger.Error("Błąd walidacji", zap.Error(err), zap.String("endpoint", "/auth/verify-2fa"))
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	h.logger.Debug("Weryfikacja kodu 2FA", zap.String("email", input.Email))
	valid, err := h.service.Verify2FACode(input.Email, input.Code)
	if err != nil {
		h.logger.Error("Błąd weryfikacji 2FA", zap.Error(err), zap.String("email", input.Email))
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}

	if !valid {
		h.logger.Info("Nieprawidłowy kod 2FA", zap.String("email", input.Email))
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Nieprawidłowy kod 2FA"})
	}

	h.logger.Info("Kod 2FA poprawny", zap.String("email", input.Email))
	return c.JSON(fiber.Map{"success": true})
}
