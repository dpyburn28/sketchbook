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
mainCanvas.brush.cursor = [mainCanvas.width/2,mainCanvas.height/2]
mainCanvas.brush.draw()
mainCanvas.brush.ctx.stroke()
