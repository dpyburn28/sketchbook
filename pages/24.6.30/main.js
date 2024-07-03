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
let timer = new Timer(MS * 50)


mainCanvas.brush.ctx.lineWidth = .05
mainCanvas.brush.pather.connectAnchor = false

let increasePoints = (range=[0, 100]) => {
    min = range[0]
    max = range[1]
    range = max - min
    let numPoints = min + (timer.value % max)
    let timerSin = Math.sin(timer.value / timer.rate)
    numPoints = Math.floor(timerSin * (range/2)) + min + (range/2)
    mainCanvas.brush.draw("spiral", [r=200, swirl=20, numPoints=numPoints])
    mainCanvas.brush.ctx.stroke()
}

// Interval
let interval = () => {
    timer.interval()
    mainCanvas.clear(.1)
    increasePoints(range=[0, 200])
}
setInterval(interval, timer.rate)