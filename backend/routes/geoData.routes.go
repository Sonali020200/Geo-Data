package routes

import (
	"encoding/json"
	"geo-data/models"
	"io/ioutil"
	"net/http"

	"gorm.io/gorm"
)

func CreateGeoData(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Unsupported HTTP method", http.StatusMethodNotAllowed)
			return
		}
		if err := r.ParseMultipartForm(10 << 20); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		userID := r.FormValue("user_id")
		title := r.FormValue("title")
		file, _, err := r.FormFile("file_path")
		if err != nil {
			http.Error(w, "File upload error: "+err.Error(), http.StatusInternalServerError)
			return
		}
		defer file.Close()

		fileBytes, err := ioutil.ReadAll(file)
		if err != nil {
			http.Error(w, "Error reading file: "+err.Error(), http.StatusInternalServerError)
			return
		}

		var geoJSON map[string]interface{}
		if err := json.Unmarshal(fileBytes, &geoJSON); err != nil {
			http.Error(w, "Error parsing JSON: "+err.Error(), http.StatusInternalServerError)
			return
		}

		geometry, err := json.Marshal(geoJSON["features"].([]interface{})[0].(map[string]interface{})["geometry"])
		if err != nil {
			http.Error(w, "Error processing geometry: "+err.Error(), http.StatusInternalServerError)
			return
		}

		filePath := r.FormValue("file_path")

		geoData := models.GeoData{
			UserID:   userID,
			FilePath: filePath,
			Geometry: string(geometry),
			Title:    title,
		}

		if err := db.Create(&geoData).Error; err != nil {
			http.Error(w, "Error saving geometry to database: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"success": true,
			"message": "Geometry saved successfully",
			"user_id": userID,
		})
	}
}

func ListGeoData(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Unsupported HTTP method", http.StatusMethodNotAllowed)
			return
		}

		var geodata []models.GeoData
		db.Find(&geodata)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(geodata)
	}
}

func GetGeoDataByUser(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		userID := r.URL.Query().Get("user_id")
		if userID == "" {
			http.Error(w, "User ID is required", http.StatusBadRequest)
			return
		}

		var geodata []models.GeoData
		result := db.Where("user_id = ?", userID).Find(&geodata)
		if result.Error != nil {
			http.Error(w, result.Error.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(geodata)
	}
}
