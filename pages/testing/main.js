
let timer = new Timer(SECONDS/16)

let canvas = new myCanvas(
    res=[window.innerWidth, window.innerHeight],
    pos=[0,0],
    color=[1,1,1]
)

let brush = canvas.brush = new Brush(canvas)

let p1 = [.75, .75]
let p2 = [.75, .25]
let p3 = [.25, .25]
let p4 = [.25, .75]

brush.weight = 1
brush.closer = false

let draw = () => {
    brush.presets("brush")
    brush.weight = 1
    
    brush.bristles.num=5
    brush.bristles.spread=10
    brush.isPaint = false
    brush.isInk = true
    brush.closer = false
    brush.curve([p1, p2, p3, p4])
    brush.presets("pencil")
    brush.tip = "bristles"
    brush.line([p1, p2, p3, p4])

    
}
let interval = () => {
    canvas.clear()
    draw()
}
interval()
timer.startInterval(interval)