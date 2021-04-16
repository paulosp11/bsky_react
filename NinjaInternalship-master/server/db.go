package main

import (
	"fmt"

	"github.com/jmoiron/sqlx"
)

type dbDriver struct {
	dbDriver *sqlx.DB
}

func connect() (*sqlx.DB, error) {
	var db *sqlx.DB
	var err error
	const (
		host = "localhost"
		//port = 6434
		port = 5432
		user = "cryptopaulo"
		//user     = "cryptoapp"
		password = "dev"
		dbname   = "cryptopaulo"
		//dbname = "cryptoapp"
	)
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err = sqlx.Connect("postgres", psqlInfo)

	if err != nil {
		panic(err)
	}

	if db != nil {
		fmt.Println(db)
	}

	err = db.Ping()

	return db, err
}
