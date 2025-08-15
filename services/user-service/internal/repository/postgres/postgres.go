package postgres

import (
	"database/sql"
	"user-service/internal/model"
	"user-service/internal/repository"
)

type userRepository struct {
    db *sql.DB
}

func NewUserRepository(db *sql.DB) repository.UserRepository {
    return &userRepository{db: db}
}

func (r *userRepository) Create(user *model.User) error {
    query := `INSERT INTO users (username, email, created_at) VALUES ($1, $2, $3) RETURNING id`
    return r.db.QueryRow(query, user.Username, user.Email, user.CreatedAt).Scan(&user.ID)
}

func (r *userRepository) GetByID(id int) (*model.User, error) {
    user := &model.User{}
    query := `SELECT id, username, email, created_at FROM users WHERE id = $1`
    err := r.db.QueryRow(query, id).Scan(&user.ID, &user.Username, &user.Email, &user.CreatedAt)
    if err != nil {
        return nil, err
    }
    return user, nil
}