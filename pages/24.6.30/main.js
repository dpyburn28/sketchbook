const backgroundCanvas = new myCanvas(
    res=[window.innerWidth, window.innerHeight],
    pos=[0,0],
    color=[255,255,255,1]
)

const mainCanvas = new myCanvas(
    res=[400, 400],
    pos=[(backgroundCanvas.width-res[0])/2, (backgroundCanvas.height-res[1])/2],
    color=[255, 255, 255, 1]
)

// Initialize and Start timer
let timer = new Timer(MS * 30)



mainCanvas.brush.pather.connectAnchor = false

let sinWavePoints = (range=[0, 60]) => {
    let numPoints = sine(range)
    console.log(numPoints)
    mainCanvas.brush.draw("spiral", [r=200, swirl=20, numPoints=numPoints])
    mainCanvas.brush.ctx.stroke()
}
let cosWavePoints = (range=[0, 100]) => {
    let numPoints = cose(range)
    console.log(numPoints)
    mainCanvas.brush.draw("spiral", [r=200, swirl=20, numPoints=numPoints])
    mainCanvas.brush.ctx.stroke()
}

// Interval
let interval = () => {
    timer.interval()
    mainCanvas.clear(1)
    mainCanvas.brush.ctx.strokeStyle = "rgba(0,0,0)"
    mainCanvas.brush.ctx.lineWidth = 1
    cosWavePoints(range=[0, 300])
    mainCanvas.brush.ctx.strokeStyle = "rgba(255,255,255)"
    mainCanvas.brush.ctx.lineWidth = 3
    sinWavePoints(range=[50, 300])
    
}
setInterval(interval, timer.rate)

// Functions
function sine(range=[0, 100], offset=0,) {
    let min = range[0]
    let max = range[1]
    range = max - min
    let value = (timer.value/timer.rate) % max
    let sinValue = (Math.sin(value)*(range/2)) + min + (range/2) + offset
    return Math.floor(sinValue)
}
function cose(range=[0, 100], offset=0,) {
    let min = range[0]
    let max = range[1]
    range = max - min
    let value = (timer.value/timer.rate) % max
    let sinValue = (Math.cos(value)*(range/2)) + min + (range/2) + offset
    return Math.floor(sinValue)
}