# Betting-bot

This is a simple application to find betting pairs to make a bet.
It only searches for binary events like tennis
where only a winner and a looser.
It uses simple formulas to find pairs and betting forks.

## Installation

To install dependencies RUN `npm ci`

## Run

To run app run `npm run` command

## Config
You can configure app using .env file.
Copy `.env.example` content to `.env` file and fill with needed values.

#### Available config options
```dotenv
LOG_LEVEL
```

### Logging Levels

You can find logging levels on [Winston Logger home page](https://github.com/winstonjs/winston#logging-levels)
