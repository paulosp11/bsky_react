package main

import (
	"cryptoapp/db"
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strings"

	uuid "github.com/gofrs/uuid"
	gocheckpasswd "github.com/ninja-software/go-check-passwd"
)

// List
func (c *dbDriver) getFavsList(w http.ResponseWriter, r *http.Request) {

	var (
		userID     UserID
		tickerList []TickerData
		tickerID   string
		price      string
		time       string
		bid        string
		ask        string
		volume     string
		size       string
	)

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&userID)

	rows, err := c.dbDriver.Queryx(`SELECT tickers.id, tickers.price, tickers.time, tickers.bid, tickers.ask, tickers.volume, tickers.size
		FROM tickers
		INNER JOIN favorites ON tickers.Id=favorites.ticker_id
		WHERE favorites.user_id=$1;`, userID.UID)

	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Println("Teste", userID.UID)

	for rows.Next() {
		err := rows.Scan(
			&tickerID, &price, &time, &bid, &ask, &volume, &size)
		if err != nil {
			fmt.Println(err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		t := TickerData{ID: tickerID, Price: price, Time: time, Bid: bid, Ask: ask, Volume: volume, Size: size}
		fmt.Println(t)
		fmt.Println("Test2")
		tickerList = append(tickerList, t)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tickerList)

}

// Post Favs
func (c *dbDriver) toggleFavs(w http.ResponseWriter, r *http.Request) {

	var (
		sDone   bool
		vCheck  string
		userFav UserFavs
	)

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&userFav)

	if err != nil {
		fmt.Println(err)
	}

	id, err := uuid.NewV4()

	fmt.Println(userFav.CoinID)

	vCheck = "insert"

	//Select
	var ftest string

	err = c.dbDriver.Get(&ftest, db.CheckFavouritesExists, userFav.UserID, userFav.CoinID)

	if err == nil {
		vCheck = "delete"
	}

	fmt.Println(vCheck)

	// Print User Favorite
	fmt.Println(userFav)

	// Print CoinID
	fmt.Println(userFav.CoinID)

	fmt.Println("Paulo is fuego!")

	if vCheck == "insert" {
		fmt.Println("Inserted")

		_, err = c.dbDriver.Exec(db.FavouritesInsert, id, userFav.UserID, userFav.CoinID)

		fmt.Println(userFav.CoinID)

		if err != nil {
			fmt.Println(err)
			sDone = false
			return
		}
	} else {
		fmt.Println("Deleted")

		_, err = c.dbDriver.Exec(db.FavouritesDelete, userFav.UserID, userFav.CoinID)

		if err != nil {
			fmt.Println(err)
			sDone = false
		}
	}
	issDone := &sDoneOnly{sDone: sDone}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(issDone)

}

//SignIn
func (c *dbDriver) lhandleSignIn(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var login db.UserInfo
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&login)
	if err != nil {
		fmt.Println(err)
		return
	}
	// fmt.Println("Hit signin handler...: ", login)
	// fmt.Println(login.Email, login.Password)
	var ftest string

	err = c.dbDriver.Get(&ftest, db.LoginSignin, login.Email, login.Password)

	if err != nil {
		fmt.Println("Signin Error!")
		json.NewEncoder(w).Encode("You failed!")
		return
	}

	fmt.Println(login.Email, "Successfully Logged in")

	json.NewEncoder(w).Encode(&SuccessWithID{IsSuccess: true, ID: ftest})

}

type SuccessWithID struct {
	IsSuccess bool   `json:"success"`
	ID        string `json:"id"`
}

func (c *dbDriver) lhandleSignUp(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var (
		register   db.Register
		success    bool
		errMessage string
	)
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&register)
	if err != nil {
		fmt.Println(err)
		return
	}

	uid, err := uuid.NewV4()

	var ftest string
	err = c.dbDriver.Get(&ftest, db.CheckUserExistsSignup, register.Username, register.Email)

	fmt.Println(err)

	fmt.Println(register.Email, register.Username)

	fmt.Print(validateEmail(register.Email))

	if err != nil {
		// check weak password
		if gocheckpasswd.IsCommon(register.Password) || len(register.Password) < 5 {
			fmt.Printf("%s is a commonly used password\n", register.Password)
			success = false
			errMessage = "Password too weak"

		} else if validateEmail(register.Email) == false {
			success = false
			errMessage = "Email format was wrong, correct email example: name@mail.com"

		} else {

			_, err := c.dbDriver.Exec(db.UsersInsert, uid, register.Username, register.Password, register.Email)
			success = true

			// username already exist
			if err != nil {
				fmt.Println(err)
				errMessage = "username: '" + register.Username + "' or email '" + register.Email + "' already exist"
				success = false
			}
		}
	} else {
		success = false
		errMessage = "Username: '" + register.Username + "' or Email '" + register.Email + "' already exist"
	}

	isSuccess := &SuccessOnly{Success: success, Message: errMessage}

	if isSuccess.Success == true {
		json.NewEncoder(w).Encode(&db.Register{ID: uid.String(), Email: register.Email, Password: register.Password, Username: register.Username, Success: true})
	} else {
		fmt.Println(isSuccess)
		json.NewEncoder(w).Encode(isSuccess)
	}

}

// get one ticker
func (c *dbDriver) getDetailTicker(w http.ResponseWriter, r *http.Request) {
	var tickData TickerData

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&tickData)
	if err != nil {
		fmt.Println(err)
		return
	}
	// get data from coinbase api
	err = c.dbDriver.QueryRow(`SELECT * FROM tickers WHERE id = $1`,
		tickData.ID).Scan(&tickData.ID, &tickData.Price, &tickData.Time, &tickData.Bid,
		&tickData.Ask, &tickData.Volume, &tickData.Size)

	if err != nil {
		fmt.Println(err)
		return
	}

	tickerData := &TickerData{
		ID: tickData.ID, Price: tickData.Price,
		Time: tickData.Time, Bid: tickData.Bid, Ask: tickData.Ask,
		Volume: tickData.Volume, Size: tickData.Size}

	json.NewEncoder(w).Encode(tickerData)

}

// validates email
func validateEmail(email string) bool {
	re := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
	return re.MatchString(strings.ToLower(email))
}
