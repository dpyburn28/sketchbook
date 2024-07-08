
let timer = new Timer(SECONDS)

let canvas = new myCanvas(
    res=[window.innerWidth, window.innerHeight],
    pos=[0,0],
    color=[255,255,255]
)

let brush = canvas.brush = new Brush(canvas)

let p1 = [.5, .75]
let p2 = [.75, .75]
let p3 = [.75, .5]
let p4 = [.5, .5]

brush.presets("pencil")
brush.isPaint = false
brush.weight = 30
brush.line([p1, p2, p3, p4])

brush.presets("eraser")
brush.weight = 8
brush.isPaint = false
brush.line([p1, p2, p3, p4])

brush.presets("pen")
brush.isPaint = false
brush.line([p1, p2, p3, p4])