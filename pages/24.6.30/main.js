const backgroundCanvas = new myCanvas(
    res=[window.innerWidth, window.innerHeight],
    pos=[0,0],
    color=[0,0,0,1]
)

const mainCanvas = new myCanvas(
    res=[400, 400],
    pos=[(backgroundCanvas.width-res[0])/2, (backgroundCanvas.height-res[1])/2],
    color=[255, 255, 255, 1]
)

// Initialize and Start timer
let timer = new Timer(MS * 100)


mainCanvas.brush.ctx.lineWidth = 5
mainCanvas.brush.pather.connectAnchor = false

let increasePoints = (range=[0, 100]) => {
    min = range[0]
    max = range[1]
    range = max - min
    let numPoints = min + (timer.value % max)
    let timerSin = Math.sin(timer.value / timer.rate)
    numPoints = Math.floor(timerSin * (range/2)) + min + (range/2)
    mainCanvas.clear()
    mainCanvas.brush.draw("spiral", [r=200, swirl=20, numPoints=numPoints])
    mainCanvas.brush.ctx.stroke()
}

// Interval
let interval = () => {
    timer.interval()
    increasePoints(range=[20, 100])
}
setInterval(interval, timer.rate)