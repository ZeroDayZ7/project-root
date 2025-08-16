package service

import "user-service/internal/repository/postgres"

type UserService struct {
	repo *postgres.UserRepository
}

func NewUserService(repo *postgres.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (s *UserService) IsEmailExists(email string) (bool, error) {
	return s.repo.EmailExists(email)
}
