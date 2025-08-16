package service

import (
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"strings"
	"user-service/internal/shared/logger"

	"go.uber.org/zap"
	"golang.org/x/crypto/argon2"
)

// Parametry Argon2
const (
	memory      = 64 * 1024 // 64 MB
	iterations  = 3
	parallelism = 2
	saltLength  = 16
	keyLength   = 32
)

// HashPassword hashuje hasło za pomocą Argon2
func HashPassword(password string, logger *logger.Logger) (string, error) {
	logger.Debug("Hashowanie hasła")
	salt := make([]byte, saltLength)
	if _, err := rand.Read(salt); err != nil {
		logger.Error("Błąd generowania soli", zap.Error(err))
		return "", err
	}

	hash := argon2.IDKey([]byte(password), salt, iterations, memory, parallelism, keyLength)
	encodedSalt := base64.RawStdEncoding.EncodeToString(salt)
	encodedHash := base64.RawStdEncoding.EncodeToString(hash)
	logger.Debug("Hasło zahashowane", zap.String("encoded_salt", encodedSalt))
	return encodedSalt + "$" + encodedHash, nil
}

// VerifyPassword sprawdza hasło wobec zapisanego hasha
func VerifyPassword(password, encoded string, logger *logger.Logger) (bool, error) {
	logger.Debug("Sprawdzanie hasła")
	parts := strings.Split(encoded, "$")
	if len(parts) != 2 {
		logger.Error("Nieprawidłowy format hasła w bazie", zap.String("encoded", encoded))
		return false, errors.New("nieprawidłowy format hasła w bazie")
	}

	salt, err := base64.RawStdEncoding.DecodeString(parts[0])
	if err != nil {
		logger.Error("Błąd dekodowania soli", zap.Error(err))
		return false, err
	}
	hash, err := base64.RawStdEncoding.DecodeString(parts[1])
	if err != nil {
		logger.Error("Błąd dekodowania hasha", zap.Error(err))
		return false, err
	}

	computedHash := argon2.IDKey([]byte(password), salt, iterations, memory, parallelism, keyLength)
	isValid := subtle.ConstantTimeCompare(hash, computedHash) == 1
	if isValid {
		logger.Info("Hasło poprawne")
	} else {
		logger.Info("Nieprawidłowe hasło")
	}
	return isValid, nil
}
