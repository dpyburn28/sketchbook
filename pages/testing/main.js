
let timer = new Timer(MS*100)

let canvas = new myCanvas(
    res=[window.innerWidth, window.innerHeight],
    pos=[0,0],
    color=[1,1,1]
)

let brush = canvas.brush = new Brush(canvas)

let p1 = [.25, .75]
let p2 = [.75, .75]
let c1 = [.75, .25]
let c2 = [.25, .25]

brush.presets("pencil")
brush.isPaint = false
// brush.weight = 30
brush.closer = true

brush.closer = false
// brush.curve([p1, c1, c2, p2])
brush.presets("brush")
let interval = () => {
    canvas.clear()
    brush.line([p1, c1, c2, p2])
}
timer.startInterval(interval)