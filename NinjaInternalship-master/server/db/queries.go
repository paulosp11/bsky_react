package db

//Users
const (
	CheckUserExistsSignup = `SELECT id from users WHERE username = $1 AND email = $2`

	LoginQuery  = `SELECT * from users WHERE email = $1`
	UsersInsert = `INSERT INTO users (id, username, password, email) VALUES ($1, $2, $3, $4)`
)

//Login
const (
	LoginSignin = `SELECT id from users WHERE email = $1 and password = $2`
)

//Favourites
const (
	CheckFavouritesExists = `SELECT id from favorites WHERE user_id = $1 and ticker_id = $2`

	FavouritesList = `SELECT id from favorites WHERE user_id = $1`

	FavouritesQuery = `SELECT   t.id, 
								t.price, 
								t.time, 
								t.bid, 
								t.ask, 
								t.volume, 
								t.size 
					    FROM tickers t
						LEFT JOIN favorites f ON t.Id = f.ticker_id
						WHERE f.user_id = $1`

	FavouritesInsert = `INSERT INTO favorites (id, user_id, ticker_id) 
	VALUES ($1, $2, $3)`

	FavouritesDelete = `DELETE FROM favorites WHERE user_id = $1 AND ticker_id = $2`
)
