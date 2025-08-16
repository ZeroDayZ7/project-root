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