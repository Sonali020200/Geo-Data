package models

import "gorm.io/gorm"

type GeoData struct {
	gorm.Model
	UserID   string `json:"user_id"`
	FilePath string `json:"file_path"`
	Geometry string `json:"geometry"`
	Title    string `json:"title"`
}
