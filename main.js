// Init game
star = LoadSprite("Star.png")

MainMenu = () =>
{
    // Example: Play SFX on new touch
    if (touch.down)
    {
        zzfx(...[,,895,,.01,.4,4,4.18,.7,.5,,,,.7,,.7,,.92,.02]);
    }

    // Example: Log touch position each frame that it's being held
    if (touch.hold)
    {
        console.log("Touch Pos: " + touch.x + ", " + touch.y);
    }

    // Example: Ugly/pixelated rendering!
    DrawSprite(star, 100, 75);
    DrawText("TK Demo!", 30, 60, -15, 16);
}

// Start initial state
nextState = MainMenu;