

const canvas = new myCanvas(
    res=[window.innerWidth, window.innerHeight],
    pos=[0,0],
    color=[255,255,255]
)

// Grid Layer
let gridLayer = canvas.layerManager.newLayer()
gridLayer.pather.closePaths = false
gridLayer.lineWeight = 5
let stroke = true
let fill = false
gridLayer.pather.newPath([
    [0, .5, true, true],
    [1, .5, true, false, true],
    [.5, 0],
    [.5,1, true]
])

// Circle Layer
let circleLayer = canvas.layerManager.newLayer()
circleLayer.lineWeight = 5
circleLayer.pather.newPath([
    [.5, .5, true, true]
])
circleLayer.paths[0].setToArc(.5, 0, 1)

//
canvas.layerManager.drawLayers()








