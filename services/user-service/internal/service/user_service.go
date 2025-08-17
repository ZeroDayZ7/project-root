package service

import (
	"user-service/internal/repository/postgres"
	"user-service/internal/shared/logger"

	"go.uber.org/zap"
)

type UserService struct {
	repo   *postgres.UserRepository
	logger *logger.Logger
}

func NewUserService(repo *postgres.UserRepository, logger *logger.Logger) *UserService {
	return &UserService{repo: repo, logger: logger}
}

func (s *UserService) IsEmailExists(email string) (bool, error) {
	s.logger.Debug("Wywołanie IsEmailExists", zap.String("email", email))
	exists, err := s.repo.EmailExists(email)
	if err != nil {
		s.logger.Error("Błąd w repozytorium", zap.Error(err), zap.String("email", email))
		return false, err
	}
	s.logger.Info("Sprawdzono istnienie emaila", zap.String("email", email), zap.Bool("exists", exists))
	return exists, nil
}

func (s *UserService) CheckPassword(email, password string) (bool, bool, error) {
	s.logger.Debug("Sprawdzanie hasła", zap.String("email", email))
	storedPassword, twoFactorEnabled, _, err := s.repo.GetUserByEmail(email)
	if err != nil {
		s.logger.Error("Błąd pobierania danych użytkownika", zap.Error(err), zap.String("email", email))
		return false, false, err
	}

	valid, err := VerifyPassword(password, storedPassword, s.logger)
	if err != nil {
		s.logger.Error("Błąd weryfikacji hasła", zap.Error(err), zap.String("email", email))
		return false, false, err
	}
	if !valid {
		s.logger.Info("Nieprawidłowe hasło", zap.String("email", email))
		return false, twoFactorEnabled, nil
	}

	s.logger.Info("Hasło poprawne", zap.String("email", email), zap.Bool("2fa_enabled", twoFactorEnabled))
	return true, twoFactorEnabled, nil
}

func (s *UserService) Verify2FACode(email, code string) (bool, error) {
	s.logger.Debug("Weryfikacja kodu 2FA", zap.String("email", email))
	_, twoFactorEnabled, twoFactorSecret, err := s.repo.GetUserByEmail(email)
	if err != nil {
		s.logger.Error("Błąd pobierania danych 2FA", zap.Error(err), zap.String("email", email))
		return false, err
	}
	if !twoFactorEnabled {
		s.logger.Warn("2FA nie jest włączone", zap.String("email", email))
		return false, nil
	}
	// Uproszczona walidacja (dla TOTP użyj github.com/pquerna/otp)
	valid := code == twoFactorSecret
	if !valid {
		s.logger.Info("Nieprawidłowy kod 2FA", zap.String("email", email))
		return false, nil
	}
	s.logger.Info("Kod 2FA poprawny", zap.String("email", email))
	return true, nil
}
