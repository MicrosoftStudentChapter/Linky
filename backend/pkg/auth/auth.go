package auth

import (
	// "fmt"
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET"))
var users = map[string]string{}

type Claims struct {
	Username string "json:username"
	jwt.StandardClaims
}

func GenerateJWT(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")
	if username == "" {
		http.Error(w, "Username is required", http.StatusBadRequest)
		return
	}

	expirationTime := time.Now().Add(30 * time.Minute)
	claims := &Claims{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
			IssuedAt:  time.Now().Unix(),
			Issuer:    "Linky",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		http.Error(w, "Could not generate token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"token": "` + tokenString + `"}`))
	// return tokenString
}

func ValidateJWT(w http.ResponseWriter, r *http.Request) {
	tokenString := r.URL.Query().Get("token")
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			http.Error(w, "Invalid token signature", http.StatusUnauthorized)
			return
		}
		http.Error(w, "Invalid token", http.StatusBadRequest)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token", http.StatusUnauthorized)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"username":  claims.Username,
		"id":        claims.Id,
		"issuer":    claims.Issuer,
		"expiresAt": claims.ExpiresAt,
		"issuedAt":  claims.IssuedAt,
	})

	// return claims, nil
}

func Register(w http.ResponseWriter, r *http.Request) {
	var userData struct {
		Username string `json:"user"`
		Password string `json:"pass"`
	}

	if err := json.NewDecoder(r.Body).Decode(&userData); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if _, exists := users[userData.Username]; exists {
		http.Error(w, "User already exists", http.StatusBadRequest)
		return
	}

	users[userData.Username] = userData.Password

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "User registered successfully"})
}

func ShowUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}
