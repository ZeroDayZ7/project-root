package handler

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strconv"
	"user-service/internal/service"
)

type UserHandler struct {
    service *service.UserService
}

func NewUserHandler(service *service.UserService) *UserHandler {
    return &UserHandler{service: service}
}

func (h *UserHandler) CreateUser(w http.ResponseWriter, r *http.Request) {
    log.Printf("Odebrano żądanie POST /users od %s", r.RemoteAddr)
    // Odczytaj surową treść żądania
    bodyBytes, err := io.ReadAll(r.Body)
    if err != nil {
        log.Printf("Błąd odczytu treści żądania: %v", err)
        http.Error(w, "Cannot read request body", http.StatusBadRequest)
        return
    }
    // Przywróć body, aby można je było dekodować
    r.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
    log.Printf("Treść żądania: %s", string(bodyBytes))

    var input struct {
        Username string `json:"username"`
        Email    string `json:"email"`
    }
    if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
        log.Printf("Błąd dekodowania JSON: %v", err)
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    log.Printf("Tworzenie użytkownika: username=%s, email=%s", input.Username, input.Email)
    user, err := h.service.CreateUser(input.Username, input.Email)
    if err != nil {
        log.Printf("Błąd tworzenia użytkownika: %v", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    log.Printf("Utworzono użytkownika: id=%d", user.ID)
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
    log.Printf("Odebrano żądanie GET /users/%s od %s", r.URL.Path, r.RemoteAddr)

    idStr := r.URL.Path[len("/users/"):]
    id, err := strconv.Atoi(idStr)
    if err != nil {
        log.Printf("Błąd parsowania ID: %v", err)
        http.Error(w, "Invalid user ID", http.StatusBadRequest)
        return
    }

    user, err := h.service.GetUser(id)
    if err != nil {
        log.Printf("Błąd pobierania użytkownika o ID %d: %v", id, err)
        http.Error(w, err.Error(), http.StatusNotFound)
        return
    }

    log.Printf("Pobrano użytkownika: id=%d", user.ID)
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}