package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
    DBConn string
    Port   string
    Env    string
}

func LoadConfig() (Config, error) {
    err := godotenv.Load()
    if err != nil && !os.IsNotExist(err) {
        return Config{}, fmt.Errorf("błąd wczytywania .env: %v", err)
    }

    config := Config{
        DBConn: os.Getenv("DB_PATH"),
        Port:   os.Getenv("PORT"),
        Env:    os.Getenv("ENV"),
    }

    if config.DBConn == "" {
        return Config{}, fmt.Errorf("zmienna DB_PATH jest wymagana")
    }
    if config.Port == "" {
        return Config{}, fmt.Errorf("zmienna PORT jest wymagana")
    }
    if config.Env == "" {
        config.Env = "development"
    }

    return config, nil
}