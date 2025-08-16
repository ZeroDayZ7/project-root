package model

type User struct {
	ID               int    `json:"id"`
	Username         string `json:"username"`
	Email            string `json:"email"`
	Password         string `json:"-"` // Nie serializujemy hasła do JSON
	TwoFactorEnabled bool   `json:"two_factor_enabled"`
	TwoFactorSecret  string `json:"-"` // Sekret 2FA, nie serializowany
	CreatedAt        string `json:"created_at"`
}
