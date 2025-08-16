package postgres

import (
	"database/sql"
	"user-service/internal/shared/logger"

	"go.uber.org/zap"
)

type UserRepository struct {
    db     *sql.DB
    logger *logger.Logger
}

func NewUserRepository(db *sql.DB, logger *logger.Logger) *UserRepository {
    return &UserRepository{db: db, logger: logger}
}

func (r *UserRepository) EmailExists(email string) (bool, error) {
    r.logger.Debug("Wykonywanie zapytania SQL", zap.String("query", "SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)"), zap.String("email", email))
    var exists bool
    err := r.db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)", email).Scan(&exists)
    if err != nil {
        r.logger.Error("Błąd zapytania SQL", zap.Error(err), zap.String("email", email))
        return false, err
    }
    return exists, nil
}c