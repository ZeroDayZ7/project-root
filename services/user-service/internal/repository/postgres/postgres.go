package postgres

import (
	"database/sql"
	"user-service/internal/model"

	_ "github.com/lib/pq"
)

type UserRepository struct {
    db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
    return &UserRepository{db: db}
}

func (r *UserRepository) Create(user *model.User) error {
    query := `INSERT INTO users (username, email, created_at) VALUES ($1, $2, $3) RETURNING id`
    return r.db.QueryRow(query, user.Username, user.Email, user.CreatedAt).Scan(&user.ID)
}

func (r *UserRepository) GetByID(id int) (*model.User, error) {
    query := `SELECT id, username, email, created_at FROM users WHERE id = $1`
    row := r.db.QueryRow(query, id)
    user := &model.User{}
    err := row.Scan(&user.ID, &user.Username, &user.Email, &user.CreatedAt)
    if err != nil {
        return nil, err
    }
    return user, nil
}