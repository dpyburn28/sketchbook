let FPS = 60;
let centerX = 0;
let centerY = 0;
let canvas;
let canvasContainer;
let frameCount = 0;
let size = 100;

function setup() {
    frameRate(FPS);
    canvasContainer = document.getElementById("canvas-container");
    canvas = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    canvas.parent("canvas-container");
    centerX = canvasContainer.offsetWidth/2;
    centerY = canvasContainer.offsetHeight/2;
    
}

function draw() {
    
    windowResized();
    let weight=60;
    
    let amp = 1;
    
    if(checkOverlap(amp)) {
        
        amp = 70;
        weight=20;
        
        

    } 

    let pointX = sin(frameCount)*amp;
    let pointY = cos(frameCount)*amp;
    
    
    stroke('navy');
    
    
    
    strokeWeight(weight);
    point(centerX + pointX, centerY + pointY);
    stroke('crimson');
    point(mouseX - pointX, mouseY - pointY);
    stroke('black');
    strokeWeight(1);
    fill(255, 255, 255, 255);
    ellipse(mouseX, mouseY, 10, 10);
    frameCount+=.5;
}
function checkOverlap(amp) {
    let pointX = sin(frameCount)*amp;
    let pointY = cos(frameCount)*amp;
    if (mouseX - pointX < centerX + pointX + 30 && mouseX - pointX > centerX + pointX - 30 && mouseY - pointY < centerY + pointY + 30 && mouseY - pointY > centerY + pointY - 30) {
        return true;
    }
    return false;
}

function windowResized() {
    
    let canvasContainer = document.getElementById("canvas-container");
    resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    centerX = canvasContainer.offsetWidth/2;
    centerY = canvasContainer.offsetHeight/2;
    
}
