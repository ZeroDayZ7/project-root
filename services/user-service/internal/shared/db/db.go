package db

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

func NewDB(connStr string) (*sql.DB, error) {
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        return nil, fmt.Errorf("błąd połączenia z PostgreSQL: %v", err)
    }
    if err := db.Ping(); err != nil {
        return nil, fmt.Errorf("błąd pingowania bazy: %v", err)
    }
    return db, nil
}