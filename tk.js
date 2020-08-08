var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d", { alpha: false });
var touch = { x: 0, y: 0, active: false}

canvas.addEventListener("mousedown", e => { touch.active = true }, false);
canvas.addEventListener("mouseup", e => { touch.active = false }, false);
canvas.addEventListener("mousemove", e => { SetTouchPos(e); e.preventDefault(); }, false );
canvas.addEventListener("touchstart", e => { SetTouchPos(e.touches[0]); touch.active = true; e.preventDefault(); }, false );
canvas.addEventListener("touchend", e => { touch.active = false; e.preventDefault(); }, false );
canvas.addEventListener("touchcancel", e => { touch.active = false; e.preventDefault(); }, false );
canvas.addEventListener("touchmove", e => { SetTouchPos(e.touches[0]); e.preventDefault(); }, false );

function SetTouchPos(event)
{
    touch.x = (event.pageX - canvas.offsetLeft) / 4.0; // Screen scale factor = 4 (see index.html)
    touch.y = (event.pageY - canvas.offsetTop) / 4.0;
}

function GameLoop()
{
    window.requestAnimationFrame(GameLoop);
}

window.requestAnimationFrame(GameLoop);