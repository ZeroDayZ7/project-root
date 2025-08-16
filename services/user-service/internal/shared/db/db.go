package db

import (
	"database/sql"
	"fmt"
	"user-service/internal/shared/logger"

	"go.uber.org/zap"

	_ "github.com/lib/pq"
)

func NewDB(connStr string, logger *logger.Logger) (*sql.DB, error) {
    logger.Info("Łączenie z bazą danych", zap.String("connStr", connStr))
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        logger.Error("Błąd połączenia z PostgreSQL", zap.Error(err))
        return nil, fmt.Errorf("błąd połączenia z PostgreSQL: %v", err)
    }
    if err := db.Ping(); err != nil {
        logger.Error("Błąd pingowania bazy", zap.Error(err))
        return nil, fmt.Errorf("błąd pingowania bazy: %v", err)
    }
    logger.Info("Połączenie z bazą danych nawiązane")
    return db, nil
}