//EventListener
document.addEventListener( 'mousemove', onMouseMove, false );
document.addEventListener( 'keyup', onKeyUp, false );
document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'mousewheel', onMousewheel, false );
document.addEventListener( 'DOMMouseScroll', onMousewheel, false );
window.addEventListener( 'resize', onWindowResize, false );


//Vars
let pressed_keys = [];
let fl_active = false;
let fl_type = 2;
let fl_data = {
    'x' : -1,
    'y' : -1,
    'size' : 150,
    'default' : 150,
    'height' : 1.0
};

//Functions
let draw;
let drawCanvas2D = function(ctx)
{
    if(fl_type >= 0) drawBackground(ctx);
    if(fl_type >= 1) drawSimpleFl(ctx);
    if(fl_type >= 2) drawRealShadow(ctx);
};

//Canvas
let canvas_fl = createCanvas();

//Drawing Context Initialisation
let ctx = false;
if(typeof initWebGL === "function")
{
    ctx = initWebGL(canvas_fl);
}
if(!ctx)
{
    ctx = initCanvas2D();
}

function initCanvas2D()
{
    console.log("JS Flashlight using Canvas 2D");
    let ctx = canvas_fl.getContext("2d");
    draw = drawCanvas2D;
    return ctx;
}

function onMousewheel(e)
{
    if(fl_active)
    {
        let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if (e.shiftKey && !e.altKey) fl_data.size += delta * 4;
        else if (e.altKey && !e.shiftKey) fl_data.height +=  0.05 * delta;
        else if(e.shiftKey && e.altKey)
        {
            fl_data.size -= delta * 1.1;
            fl_data.height +=  0.2 * delta
        }
        else{
            draw(ctx);
            return;
        }
        e.preventDefault();
        draw(ctx);
    }

}

function onKeyUp(e)
{
    pressed_keys[e.keyCode] = 0;
    if(e.key === "g")
    {
        let style = window.getComputedStyle(canvas_fl),
            opacity = style.getPropertyValue('opacity');
        if (opacity == 0)
        {
            canvas_fl.style.opacity = '1';
            fl_active = true;
        }
        else
        {
            canvas_fl.style.opacity = '0';
            setTimeout(function () {
                fl_active = false;
            }, 500);
        }
    }
}
function onKeyDown(e)
{
    pressed_keys[e.keyCode] = 1;
    swapFlModes(e.key);
}

function isKeyDown(keyCode)
{
    return pressed_keys[keyCode.charCodeAt(0)] === 1;
}

function swapFlModes(key)
{
    switch(key)
    {
        case '0': fl_type = 0;fl_data.height = 1.0; break;
        case '1': fl_type = 1;fl_data.height = 1.0; break;
        case '2': fl_type = 2;fl_data.height = 1.0; break;
        case '3': fl_type = 3;fl_data.height = window.innerHeight/window.innerWidth; break;
        case '4': fl_type = 4;fl_data.height = window.innerHeight/window.innerWidth; break;
        case '5': fl_type = 5;fl_data.height = window.innerHeight/window.innerWidth; break;
        case '6': fl_type = 6;fl_data.height = window.innerHeight/window.innerWidth; break;
        case '7': fl_type = 7;fl_data.height = 1.0; break;
        case '8': fl_type = 8;fl_data.height = 1.0; break;
    }
    draw(ctx);
}

function onMouseMove(e)
{
    if(fl_active)
    {
        fl_data.x = e.clientX;
        fl_data.y = e.clientY;
        draw(ctx);
    }
}

function drawRealShadow(ctx)
{
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-over';
    let fl = ctx.createRadialGradient(fl_data.x, fl_data.y, 0, fl_data.x, fl_data.y, fl_data.size);

    fl.addColorStop(0, "#0000");
    fl.addColorStop(0.83, "#0000");
    fl.addColorStop(0.88, "#00f1");
    fl.addColorStop(0.93,"#1c3f8644");
    fl.addColorStop(0.96,"#795e8688");
    fl.addColorStop(1,"#795e8600");

    ctx.fillStyle = fl;
    ctx.arc(fl_data.x,fl_data.y,fl_data.size,0,2*Math.PI, false);
    ctx.fill();
}

function drawSimpleFl(ctx)
{
    ctx.beginPath();
    ctx.globalCompositeOperation = 'destination-out';

    let grd = ctx.createRadialGradient(fl_data.x, fl_data.y,  0, fl_data.x, fl_data.y, fl_data.size);
    grd.addColorStop(0, "white");
    grd.addColorStop(0.78, "white");
    grd.addColorStop(1, "transparent");
    ctx.fillStyle = grd;
    ctx.arc(fl_data.x,fl_data.y,fl_data.size,0,2*Math.PI, false);
    ctx.fill();
}

function drawBackground(ctx)
{
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect( 0, 0, canvas_fl.width, canvas_fl.height);
    ctx.fillStyle = '#666b';
    ctx.fillRect( 0, 0, canvas_fl.width, canvas_fl.height);
}

function onWindowResize(e)
{
    canvas_fl.width = window.innerWidth;
    canvas_fl.height = window.innerHeight;
    draw(ctx);
}

function createCanvas()
{
    let canvas_fl = document.createElement('canvas');
    canvas_fl.style.position = 'fixed';
    canvas_fl.style.left = "0";
    canvas_fl.style.top = "0";
    canvas_fl.style.opacity = "0";
    canvas_fl.style.transition = 'all 0.5s ease-in-out';
    canvas_fl.style.zIndex = "2147483647";
    canvas_fl.style.pointerEvents = 'none';
    canvas_fl.style.background = 'transparent';
    canvas_fl.width = window.innerWidth;
    canvas_fl.height = window.innerHeight;
    document.body.appendChild( canvas_fl );
    return canvas_fl;
}
