CREATE TABLE favorites (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    ticker_id TEXT NOT NULL
);

CREATE TABLE tickers (
    id text NOT NULL PRIMARY KEY,
    price text NOT NULL,
    bid text NOT NULL,
    ask text NOT NULL,
    volume text NOT NULL,
    size text NOT NULL,
    time text NOT NULL
);

CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL,
    EMAIL TEXT UNIQUE NOT NULL,
    PASSWORD TEXT NOT NULL,
    USERNAME TEXT NOT NULL
);