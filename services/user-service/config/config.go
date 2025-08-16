package config

import (
	"fmt"
	"os"
	"user-service/internal/shared/logger"

	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

type Config struct {
    DBConn string
    Port   string
    Env    string
}

func LoadConfig(log *logger.Logger) (Config, error) {
    log.Info("Wczytywanie pliku .env")
    err := godotenv.Load()
    if err != nil && !os.IsNotExist(err) {
        log.Error("Błąd wczytywania .env", zap.Error(err))
        return Config{}, fmt.Errorf("błąd wczytywania .env: %v", err)
    }

    config := Config{
        DBConn: os.Getenv("DB_PATH"),
        Port:   os.Getenv("PORT"),
        Env:    os.Getenv("ENV"),
    }

    if config.DBConn == "" {
        log.Error("Zmienna DB_PATH jest wymagana")
        return Config{}, fmt.Errorf("zmienna DB_PATH jest wymagana")
    }
    if config.Port == "" {
        log.Error("Zmienna PORT jest wymagana")
        return Config{}, fmt.Errorf("zmienna PORT jest wymagana")
    }
    if config.Env == "" {
        log.Warn("Zmienna ENV nie ustawiona, ustawiam domyślnie na development")
        config.Env = "development"
    }

    log.Info("Konfiguracja wczytana", zap.String("env", config.Env), zap.String("port", config.Port))
    return config, nil
}