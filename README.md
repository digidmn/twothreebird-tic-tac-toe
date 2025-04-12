# TwoThreeBird Tic Tac Toe

A responsive and well-organized Tic Tac Toe game built with vanilla HTML, CSS, and JavaScript, with automated tests and CI/CD setup.

## Features

- Clean, responsive UI that works on both desktop and mobile devices
- Game logic to track turns, detect wins and ties
- Unit tests for game logic and UI components
- End-to-end tests to verify full user flows
- CI/CD pipeline with GitHub Actions
- Automatic deployment to GitHub Pages

## Prerequisites

- Node.js v20.14.0 (specified in `.nvmrc` file)
- npm package manager

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/twothreebird-tic-tac-toe.git
cd twothreebird-tic-tac-toe
```

2. Use the correct Node.js version (if using nvm):
```bash
nvm use
```

3. Install dependencies:
```bash
npm install
```

4. Install Playwright browsers (for E2E tests):
```bash
npx playwright install --with-deps
```

## Development

Run the development server:
```bash
npm run dev
```

This will start the Vite dev server at http://localhost:5173

## Build

To build the production version:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Testing

### Unit Tests

Run unit tests with Vitest:
```bash
npm test
```

Run unit tests in watch mode:
```bash
npm run test:watch
```

### End-to-End Tests

Run end-to-end tests with Playwright:
```bash
npm run test:e2e
```

Run end-to-end tests with UI:
```bash
npm run test:e2e:ui
```

## Primary Project Structure

```
twothreebird-tic-tac-toe/
├── .github/workflows/        # GitHub Actions workflows
├── src/
│   ├── js/                   # JavaScript files
│   │   ├── game.js           # Game logic
│   │   └── ui.js             # UI handling
│   │   └── particles.js      # Particle background handling
│   ├── css/                  # CSS styles
│   └── index.html            # Main HTML file
├── tests/
│   ├── unit/                 # Unit tests
│   └── e2e/                  # End-to-end tests
├── .nvmrc                    # Node version specification
├── package.json              # Project configuration
├── playwright.config.js      # Playwright configuration
├── vite.config.js            # Vite configuration
├── vitest.config.js          # Vitest configuration
└── README.md                 # Project documentation
```

## CI/CD Pipeline

The project uses GitHub Actions for CI/CD:

1. On every push to the `main` branch and on pull requests:
- Runs unit tests with Vitest
- Runs end-to-end tests with Playwright in headless mode

2. On successful tests on the `main` branch:
- Builds the application
- Deploys it to GitHub Pages

## How The Game Works

1. The game displays a 3×3 grid.
2. Players take turns placing X or O marks in empty squares.
3. Player X always goes first.
4. The first player to get 3 of their marks in a row (horizontally, vertically, or diagonally) wins.
5. If all squares are filled and no player has 3 marks in a row, the game ends in a tie.
6. The Reset button allows starting a new game at any time.

## Technologies Used

- Vanilla JavaScript, HTML, and CSS (no frameworks)
- Vite for build tooling and development server
- Vitest for unit testing
- Playwright for end-to-end testing
- GitHub Actions for CI/CD