let FPS = 1;
let centerX = 0;
let centerY = 0;
let canvas;
let canvasContainer;
let frameCount = 0;
let html = document.documentElement;



function setup() {

    let button1 = document.getElementById("colorButton1");
    let button2 = document.getElementById("colorButton2");
    let button3 = document.getElementById("colorButton3");
    button1.addEventListener("click", function() {
        console.log("button1 clicked");
        html.style.setProperty("background-color", "darkred");
        html.style.setProperty("color", "white");
    });
    button2.addEventListener("click", function() {
        console.log("button2 clicked");
        html.style.setProperty("background-color", "black");
        html.style.setProperty("color", "white");
    });
    button3.addEventListener("click", function() {
        console.log("button3 clicked");
        html.style.setProperty("background-color", "white");
        html.style.setProperty("color", "darkred");
    });
    

    


    updateValue();
    frameRate(FPS);
    canvasContainer = document.getElementById("canvas-container");
    canvas = createCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    canvas.parent("canvas-container");
    centerX = canvasContainer.offsetWidth/2;
    centerY = canvasContainer.offsetHeight/2;
    background('slategray')
}

function draw() {

    let colors = [color("#0A0908"), color("#49111C"), color("#F2F4F3"), color("#A9927D"), color("#5E503F")];

    let lineCircle = {
        color: random(colors),
        size: 200,
        drawSpeed: 1000,
        weight: random() * 5
    };
    
    drawLineCircle(lineCircle.color, lineCircle.size, lineCircle.drawSpeed, lineCircle.weight, colors);
    
    
    preLoop();

}

function preLoop() {
    frameCount += (1/FPS);
}

function drawLineCircle(color, size, drawSpeed, lineWeight, colors) {

    // CIRCLE VARIABLES
    let circleSize = size || 100;
    let defaultColor = color || 0;
    let speed = drawSpeed || 1;
    let weight = lineWeight || 1;

    // LINE INSIDE POINT
    // center of canvas
    let point1 = {
        x: centerX + (sin(frameCount*speed)*slider.value), 
        y: centerY + (cos(frameCount*speed)*slider.value)
    };

    // LINE OUTSIDE POINT
    // wave function * amplitude + center
    let offsetX = sin(frameCount * speed * 3000) * 190;
    let offsetY = tan(frameCount * speed * 3000) * 90;

    let point2 = {
        x: ( cos(frameCount * speed) * circleSize ) + point1.x + offsetX,
        y: ( sin(frameCount * speed) * circleSize ) + point1.y + offsetY
    };

    // FINAL SETUP
    stroke(color || defaultColor);
    strokeWeight(weight);

    // DRAW
    line(point1.x, point1.y, point2.x, point2.y);
    fill(random(colors));
    strokeWeight(.1);
    ellipse(point1.x, point1.y, 10, 10);
}

function updateValue() {
    let slider = document.getElementById("slider");
    console.log("Slider value: " + slider.value);
    let number = document.getElementById("number");
    number.innerHTML = slider.value;

    
  }


function windowResized() {
    
    let canvasContainer = document.getElementById("canvas-container");
    resizeCanvas(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
    centerX = canvasContainer.offsetWidth/2;
    centerY = canvasContainer.offsetHeight/2;
    
}

