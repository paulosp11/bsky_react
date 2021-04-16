package main

//Product - query data
type Product struct {
	ID             string `json: "id"`
	BaseCurrency   string `json: "base_currency"`
	QuoteCurrency  string `json: "quote_currency"`
	BaseMinSize    string `json: "base_min_size"`
	BaseMaxSize    string `json: "base_max_size"`
	QuoteIncrement string `json: "quote_increment"`
	BaseIncrement  string `json: "base_increment"`
	DisplayName    string `json: "display_name"`
	MinMarketFunds string `json: "min_market_funds"`
	MaxMarketFunds string `json: "max_market_funds"`
	MarginEnabled  bool   `json: "margin_enabled"`
	PostOnly       bool   `json: "post_only"`
	LimitOnly      bool   `json: "limit_only"`
	CancelOnly     bool   `json: "cancel_only"`
	Status         string `json: "status"`
	StatusMessage  string `json: "status_message"`
}

// Ticker
type Ticker struct {
	TradeID string `json: "id"`
	Price   string `json: "price"`
	Time    string `json: "size"`
	Bid     string `json: "time"`
	Ask     string `json: "bid"`
	Volume  string `json: "ask"`
	Size    string `json: "volume"`
}

// TickerData for db
type TickerData struct {
	ID     string `json:"id,omitempty"`
	Price  string `json:"price,omitempty"`
	Time   string `json:"time,omitempty"`
	Bid    string `json:"bid,omitempty"`
	Ask    string `json:"ask,omitempty"`
	Volume string `json:"volume,omitempty"`
	Size   string `json:"size,omitempty"`
}

// UserFavorite is for toggling favorite
type UserFavs struct {
	ID     string `json:"id,omitempty"`
	UserID string `json:"user_id,omitempty"`
	CoinID string `json:"coin_id,omitempty"`
}

type UserID struct {
	UID string `json: "uid"`
}

type sDoneOnly struct {
	sDone bool `json:"sDone"`
}

// SuccessOnly for errors
type SuccessOnly struct {
	Success bool   `json:"success"`
	Message string `json:"message,omitempty"`
}
