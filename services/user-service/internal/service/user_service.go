package service

import (
	"time"
	"user-service/internal/model"
	"user-service/internal/repository"
)

type UserService struct {
    repo repository.UserRepository
}

func NewUserService(repo repository.UserRepository) *UserService {
    return &UserService{repo: repo}
}

func (s *UserService) CreateUser(username, email string) (*model.User, error) {
    user := &model.User{
        Username:  username,
        Email:     email,
        CreatedAt: time.Now().Format(time.RFC3339),
    }
    err := s.repo.Create(user)
    if err != nil {
        return nil, err
    }
    return user, nil
}

func (s *UserService) GetUser(id int) (*model.User, error) {
    return s.repo.GetByID(id)
}