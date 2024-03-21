package models

import "gorm.io/gorm"

type Shape struct {
	gorm.Model
	UserID      uint `gorm:"index"`
	ShapeType   string
	Coordinates string
}