package main

import (
	"fmt"
	"geo-data/config"
	"geo-data/routes"
	"log"
	"net/http"
	"github.com/joho/godotenv"
)

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db, err := config.ConnectDB()
	if err != nil {
		fmt.Println("Error connecting to the database: ", err)
	}

	http.HandleFunc("/register", corsMiddleware(routes.Register))
	http.HandleFunc("/login", corsMiddleware(routes.Login))
	http.HandleFunc("/geodata", corsMiddleware(routes.CreateGeoData(db)))
	http.HandleFunc("/geodata/list", corsMiddleware(routes.ListGeoData(db)))
	http.HandleFunc("/geodata/user", corsMiddleware(routes.GetGeoDataByUser(db)))
	fmt.Println("Server starting on port 8080...")
	http.ListenAndServe(":8080", nil)
}
