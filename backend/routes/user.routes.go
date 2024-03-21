package routes

import (
	"encoding/json"
	"geo-data/auth"
	"geo-data/config"
	"geo-data/models"
	"net/http"
)

func Register(w http.ResponseWriter, r *http.Request) {
	db, err := config.ConnectDB()
	if err != nil {
		http.Error(w, "Server error, unable to connect to the database", http.StatusInternalServerError)
		return
	}

	var user models.User
	err = json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Error decoding registration information", http.StatusBadRequest)
		return
	}

	user.Password, err = auth.HashPassword(user.Password)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}

	result := db.Create(&user)
	if result.Error != nil {
		http.Error(w, "Registration failed: "+result.Error.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

func Login(w http.ResponseWriter, r *http.Request) {
	db, err := config.ConnectDB()
	if err != nil {
		http.Error(w, "Server error, unable to connect to the database", http.StatusInternalServerError)
		return
	}

	var creds models.User
	err = json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		http.Error(w, "Error decoding login information", http.StatusBadRequest)
		return
	}

	var user models.User
	result := db.Where("email = ?", creds.Email).First(&user)
	if result.Error != nil {
		http.Error(w, "Invalid login credentials", http.StatusBadRequest)
		return
	}

	if !auth.CheckPasswordHash(creds.Password, user.Password) {
		http.Error(w, "Invalid login credentials", http.StatusUnauthorized)
		return
	}

	token, err := auth.GenerateToken(user)
	if err != nil {
		http.Error(w, "Error generating token", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{"message": "Login Successful", "token": token,"userId":  user.ID})
}
