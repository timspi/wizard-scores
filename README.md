# Wizard scoreboard

No-nonsense scoreboard for the boardgame Wizard.
Available here: https://timspickermann.de/wizard-scores

Name the participating players in the correct order. Then, for each round, you can first set bids and after playing the round you can enter the wins. The app checks that the number of bids does not match, and the number of wins does match, the current number of cards. For each round, the app shows who has to give how many cards and which player starts with bidding and playing. The scores are calculated automatically:
- Correct number of bids: 20 points plus 10 points per win
- Wrong number of bids: -10 points per difference of wins/bids

There is a sorted list of players with their current scores and a full scoreboard with the points per round.

You can use this app with more players than Wizard allows and you can also play more rounds, for example when using two decks are other playing cards.

Check out the source code at https://github.com/timspi/wizard-scores


## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information.


### Android app

Capacitor is used to provide an Android app.

Sync the built code with the android app:

```bash
npx cap sync
```

Checkout the [Capacitor documentation](https://capacitorjs.com/docs/android).
