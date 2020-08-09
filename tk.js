// Config ---------------------------------------------------------------------
gameWidth = 200;
gameHeight = 150;
gameScale = 3.0;

// Initialization -------------------------------------------------------------
canvas = document.createElement("canvas");
canvas.setAttribute("width", gameWidth);
canvas.setAttribute("height", gameHeight);
canvas.style.width = `${gameWidth * gameScale}px`;
canvas.style.height = `${gameHeight * gameScale}px`;
canvas.style.backgroundColor = "black";
canvas.style.imageRendering = "pixelated";
document.getElementById("game").appendChild(canvas);
ctx = this.canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Input (mouse/touch only!) --------------------------------------------------
touch = { x: 0, y: 0, up: false, down: false, hold: false}
canvas.addEventListener("mousedown", e => { touch.up = false, touch.down = true; touch.hold = true; }, false);
canvas.addEventListener("mouseup", e => { touch.up = true; touch.down = false; touch.hold = false }, false);
canvas.addEventListener("mousemove", e => { SetTouchPos(e); e.preventDefault(); }, false );
canvas.addEventListener("touchstart", e => { SetTouchPos(e.touches[0]); touch.up = false; touch.down = true; touch.hold = true; e.preventDefault(); }, false );
canvas.addEventListener("touchend", e => { touch.up = true; touch.down = false; touch.hold = false; e.preventDefault(); }, false );
canvas.addEventListener("touchcancel", e => { touch.up = true; touch.down = false; touch.hold = false; e.preventDefault(); }, false );
canvas.addEventListener("touchmove", e => { SetTouchPos(e.touches[0]); e.preventDefault(); }, false );
SetTouchPos = (e) => { touch.x = (e.pageX - canvas.offsetLeft) / gameScale; touch.y = (e.pageY - canvas.offsetTop) / gameScale; }

// Rendering ------------------------------------------------------------------
LoadSprite = (name) =>
{
    sprite = new Image();
    sprite.src = name;
    return sprite;
}

DrawSprite = (image, x, y, xScale = 1.0, yScale = 1.0, angle = 0.0) =>
{
    let w = image.width * xScale;
    let h = image.height * yScale;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI/180);
    ctx.drawImage(image, -w*0.5, -h*0.5, w, h);
    ctx.restore();
}

DrawText = (text, x, y, fontSize = 12, fillStyle = "#FFF", angle = 0, fontName = "Arial", fontStyle = "", align = "left", baseline = "bottom") =>
{
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle * Math.PI/180);
    this.ctx.font = `${fontStyle} ${fontSize}px ${fontName}`;
    this.ctx.fillStyle = fillStyle;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = baseline;
    this.ctx.fillText(text, 0, 0);
    this.ctx.restore();
}

// Audio (ZzFX: https://github.com/KilledByAPixel/ZzFX) -----------------------
zzfxV=.3 // volume
zzfx=    // play sound
(t=1,a=.05,n=220,e=0,f=0,h=.1,M=0,r=1,z=0,o=0,i=0,s=0,u=0,x=0,c=0,d=0,X=0,b=1,m=0,l=44100,B=99+e*l,C=f*l,P=h*l,g=m*l,w=X*l,A=2*Math.PI,D=(t=>0<t?1:-1),I=B+g+C+P+w,S=(z*=500*A/l**2),V=(n*=(1+2*a*Math.random()-a)*A/l),j=D(c)*A/4,k=0,p=0,q=0,v=0,y=0,E=0,F=1,G=[],H=zzfxX.createBufferSource(),J=zzfxX.createBuffer(1,I,l))=>{for(H.connect(zzfxX.destination);q<I;G[q++]=E)++y>100*d&&(y=0,E=k*n*Math.sin(p*c*A/l-j),E=D(E=M?1<M?2<M?3<M?Math.sin((E%A)**3):Math.max(Math.min(Math.tan(E),1),-1):1-(2*E/A%2+2)%2:1-4*Math.abs(Math.round(E/A)-E/A):Math.sin(E))*Math.abs(E)**r*t*zzfxV*(q<B?q/B:q<B+g?1-(q-B)/g*(1-b):q<B+g+C?b:q<I-w?(I-q-w)/P*b:0),E=w?E/2+(w>q?0:(q<I-w?1:(q-I)/w)*G[q-w|0]/2):E),k+=1-x+1e9*(Math.sin(q)+1)%2*x,p+=1-x+1e9*(Math.sin(q)**2+1)%2*x,n+=z+=500*o*A/l**3,F&&++F>s*l&&(n+=i*A/l,V+=i*A/l,F=0),u&&++v>u*l&&(n=V,z=S,v=1,F=F||1);return J.getChannelData(0).set(G),H.buffer=J,H.start(),H},zzfxX=new AudioContext

// Main loop + State management -----------------------------------------------
state = null;
nextState = null;
Enter = 0; Tick = 1; Exit = 2;
clearColor = "#000";
GameLoop = () =>
{
    window.requestAnimationFrame(GameLoop);

    // Switch states?
    if (nextState != null)
    {
        if (state != null) { state(Exit); }
        state = nextState;
        nextState = null;
        if (state != null) { state(Enter); }
    }

    // Clear canvas
    ctx.rect(0, 0, gameWidth, gameHeight);
    ctx.fillStyle = clearColor;
    ctx.fill();

    // Run state
    if (state)
    {
        state(Tick);
    }

    // Clear per-frame input values
    touch.up = false;
    touch.down = false;
}

// Start it up!
window.requestAnimationFrame(GameLoop);