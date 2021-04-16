package main

import (
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/jmoiron/sqlx"
)

// SetupRouter setup routing here
func SetupRouter(dbConn *sqlx.DB) chi.Router {
	r := chi.NewRouter()
	c := &dbDriver{dbDriver: dbConn}
	go c.insertTickers()

	// Basic CORS
	// for more ideas, see: https://developer.github.com/v3/#cross-origin-resource-sharing
	cors := cors.New(cors.Options{
		// AllowedOrigins: []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	})

	r.Use(cors.Handler)
	r.Post("/api/favourite/toggle", c.toggleFavs)
	r.Post("/api/favourite/list", c.getFavsList)
	r.Post("/api/users/signin", c.lhandleSignIn)
	r.Post("/api/users/signup", c.lhandleSignUp)
	r.Post("/api/get/ticker", c.getDetailTicker)

	return r
}
