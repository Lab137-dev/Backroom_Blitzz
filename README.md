# Backroom Blitzz — Belt Panic

A fast, simple retail backroom arcade game by Danny Morgan / LAB-137.

## Play

Open `index.html` in a browser. No installation, dependencies or build step.

Sort the front carton into Home, Decor or Clothing before it falls off the conveyor. Tap the three department buttons, use left/up/right arrow keys (or A/W/D), or swipe left/up/right on the floor. Correct throws build a score combo. Five mistakes end the shift. Resolve 88 cartons across 11 pallets to clear the truck. Pizza cartons award six seconds of slow motion when sorted correctly.

Space or Pause freezes the game. Switching away from the page automatically pauses. Sound is optional and off by default. Personal best is stored locally when browser storage is available.

The original crew-management prototype is preserved in `classic.html`.

## Checks

Run `node tests/arcade.cjs`. Covers correct and wrong sorting, dropped boxes, pause, pizza, full truck wins, losses, restart and drawing calls with a mock canvas. Browser visual and touch verification remains outstanding.
