package main

import (
	"fmt"
	"net/http"

	_ "github.com/lib/pq"
)

func main() {
	port := "8083"
	dbConn, err := connect()

	if err != nil {
		fmt.Println(err)
		return
	}

	r := SetupRouter(dbConn)
	http.ListenAndServe(":"+port, r)

}
