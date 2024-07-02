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
let timer = new Timer(MS)
timer.start()

mainCanvas.brush.ctx.lineWidth = 1
mainCanvas.brush.pather.connectAnchor = true

let increasePoints = () => {
    let numPoints = Math.sin(timer.value)
    console.log(numPoints)
    mainCanvas.clear()
    mainCanvas.brush.draw("spiral", [r=200, swirl=20, numPoints=numPoints])
    mainCanvas.brush.ctx.stroke()
}
setInterval(increasePoints, 100)


