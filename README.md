# Simon Says

A browser-based memory game built with vanilla HTML, CSS, and JavaScript. The computer plays a growing sequence of colors, and you repeat it back — one wrong click ends the game.

## How to Play

1. Click anywhere on the page (or press any key) to start.
2. Watch the sequence of colors flash on screen.
3. Click the four color buttons in the same order.
4. Get it right → the sequence grows by one color and repeats (now including the new one).
5. Get it wrong → game over. Your final level is shown, and your high score is saved.
6. After a short cooldown, start a new game the same way.

## Features

- **Growing sequence** — each level replays the *entire* sequence from the start, not just the newest color, so you always get a fresh chance to memorize it.
- **Input lock** — clicks are ignored while the computer is showing the sequence, preventing accidental/early input from corrupting your turn.
- **Restart cooldown** — a short pause after game over stops you from accidentally restarting before you've seen the result.
- **Persistent high score** — your best level is saved in the browser via `localStorage` and shown on screen, surviving page refreshes.
- **Visual + color feedback** — buttons flash when played (by computer or player); the background flashes red on a wrong click.

## Tech

- No frameworks or libraries — plain JavaScript, CSS Grid for layout, `localStorage` for persistence.
- All game timing (flash duration, replay speed, cooldowns) is controlled by named constants near the top of the script for easy tuning.

## File Structure

- `simon-says-v2.html` — the full game (HTML, CSS, and JS in one file).
