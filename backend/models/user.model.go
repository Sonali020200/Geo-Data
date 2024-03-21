package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Fullname string `json:"fullname"`
	Email    string `gorm:"unique" json:"email"`
	Password string `json:"password"`
}
