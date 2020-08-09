// Load assets
star = LoadSprite("Star.png")

TestState = (reason) =>
{
    if (reason == Enter)
    {
        console.log("Entering 'Main Menu' state");
    }
    else if (reason == Exit)
    {
        console.log("Exiting 'Main Menu' state");
    }

    // Example: Log touch position while being held
    if (touch.hold)
    {
        console.log("Touch Pos: " + touch.x + ", " + touch.y);
    }

    // Example: Change background color depending on where touch is pressed
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
nextState = TestState;