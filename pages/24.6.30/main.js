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
mainCanvas.brush.pos = [0,0]
mainCanvas.brush.paths.box()
mainCanvas.brush.ctx.stroke()