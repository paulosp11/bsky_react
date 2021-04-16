package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// get product

func getProducts() []*Product {
	// api call
	resp, err := http.Get("https://api.pro.coinbase.com//products")
	// checking error
	if err != nil {
		fmt.Println(err)
	}
	defer resp.Body.Close()

	// create a var to hold resp of json data
	var prods []*Product // holds json data
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&prods)
	if err != nil {
		panic(err)
	}
	// fmt.Println("\n", reflect.TypeOf(prods))

	return prods
}

// refresh tickers
func (c *dbDriver) refreshTickers(tData *TickerData, id string) {
	row := c.dbDriver.QueryRow("select price from tickers where id = $1", id)

	switch err := row.Scan(&tData.ID); err {
	case sql.ErrNoRows:
		// fmt.Println("THERE IS NO ID")
		_, err = c.dbDriver.Exec(`INSERT INTO tickers (id, price, time, bid, ask, volume, size) VALUES ($1, $2, $3, $4, $5, $6, $7);`, id, tData.Price, tData.Time, tData.Bid, tData.Ask, tData.Volume, tData.Size) // OK
		if err != nil {
			panic(err)

		}
	case nil:
		// fmt.Println("THERE IS ID ")
		_, err = c.dbDriver.Exec(`UPDATE tickers SET price = $2, time = $3, bid = $4, ask = $5, volume = $6, size = $7 WHERE id = $1;`, id, tData.Price, tData.Time, tData.Bid, tData.Ask, tData.Volume, tData.Size) // OK
		// fmt.Println(`INSERT INTO tickers (id, price, time, bid, ask, volume, size) VALUES ($1, $2, $3, $4, $5, $6, $7)`, id, tData.Price, tData.Time, tData.Bid, tData.Ask, tData.Volume, tData.Size)                //OK

		if err != nil {
			panic(err)

		}
	default:
		panic(err)
	}

}
func (c *dbDriver) insertTickers() {

	n := 0

	for {
		go c.getTicker(getProducts()[n].ID)

		if n >= len(getProducts())-1 {
			n = 0
		} else {
			n++
		}
		time.Sleep(2 * time.Second)
	}
}

// get ticker
func (c *dbDriver) getTicker(id string) {

	resp, err := http.Get("https://api.pro.coinbase.com/products/" + id + "/ticker")

	if err != nil {

	}
	defer resp.Body.Close()

	var ticker *Ticker
	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(&ticker)
	if err != nil {
		panic(err)
	}
	TickerData := &TickerData{ID: id, Price: ticker.Price, Time: ticker.Time, Bid: ticker.Bid, Ask: ticker.Ask, Volume: ticker.Volume, Size: ticker.Size}

	c.refreshTickers(TickerData, id)
}
