# tk
Another JavaScript micro game engine called **Tiknee** (pronounced "Tiny".. but I really like TK Burger so I needed something with a 'k' in it so that it could be called the "TK" engine.. this is clearly super important stuff to include in the description text and extremely relevant to the engine itself /s).

## Features:
+ Not much!
+ Dumb game loop!
+ Dirt simple "state management"!
+ 2 whole functions for drawing things (image + text)!
+ Uses the wonderful ZzFX sfx engine (https://github.com/KilledByAPixel/ZzFX)
+ ~100 lines of code!

## Tiknee Tutorial
1. Slap tk.js into a folder and make an HTML that looks something like this:

```
<!doctype html>
<html>
    <head>
        <title>My Game!</title>
    </head>
    <body>
        <div id="game"></div>
        <script src="tk.js"></script>
        <script src="exampleGame.js"></script>
    </body>
</html>
```

2. Modify tk.js config settings to set the game's width, height, and pixel scale - actual canvas size will be (width * scale) x (height * scale):

```
// Config ---------------------------------------------------------------------
gameWidth = 200;
gameHeight = 150;
gameScale = 3.0;
```

3. Make a new JavaScript file (exampleGame.js in the example above) for all of your game specific code:

```
// Load assets
star = LoadSprite("Star.png")

// Example state
ExampleState = (reason) =>
{
    // Example: How to handle state enter/exit logic
    if (reason == Enter)
    {
        console.log("Entering 'Example' state");
    }
    else if (reason == Exit)
    {
        console.log("Exiting 'Example' state");
    }

    // Example: Log touch position while being held
    if (touch.hold)
    {
        console.log("Touch Pos: " + touch.x + ", " + touch.y);
    }

    // Example: Change background color depending on where a new touch is pressed
    if (touch.down)
    {
        clearColor = (touch.x < gameWidth*0.5) ? "#888" : "#000";
    }

    // Example: Play SFX on touch released
    if (touch.up)
    {
        zzfx(...[,,895,,.01,.4,4,4.18,.7,.5,,,,.7,,.7,,.92,.02]);
    }

    // Example: Ugly/pixelated rendering!
    DrawSprite(star, 100, 90, 1.0, 1.0, performance.now() * 0.1);
    DrawText("TK Demo!", 100, 45, 32, "#F80", Math.sin(performance.now() * -0.02)*3.0, "Arial", "Bold", "center", "center");
}

// Start initial state
nextState = ExampleState;
```

4. Enjoy!