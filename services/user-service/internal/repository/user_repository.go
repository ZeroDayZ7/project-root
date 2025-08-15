package repository

import (
	"user-service/internal/model"
)

type UserRepository interface {
    Create(user *model.User) error
    GetByID(id int) (*model.User, error)
}