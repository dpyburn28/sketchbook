
let timer = new Timer(SECONDS/8)

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

let demoDevDoor = () => {
    let doorFrame = () => {
        brush.presets("pen")
        brush.tip = "bristles"
        brush.closer = false
        brush.bristles = {num: 20, spread: 20}
        brush.line([p1, p2, p3, p4])
    }
    let doorFill = () => {
        brush.presets("pen")
        brush.isPaint = true
        brush.value = 125
        brush.pallete[1][1]=0
        brush.pallete[1][0]=0
        brush.weight = 10
        brush.closer = true
        brush.tip = "bristles"
        brush.composite = "hard-light"
        brush.isInk = true
        brush.bristles = {num:10, spread:10}
        brush.line([p1, p2, p3, p4])
    }
    let circles = () => {
        brush.presets("pencil")
        brush.tip = "bristles"
        brush.bristles = {num: 10, spread: 15}
        brush.arc(p2, 100)
        brush.arc(p1, 100)
        brush.arc(p3, 100)
        brush.arc(p4, 100)
    }
    let arch = () => {
        brush.presets("pen")
        brush.tip = "bristles"
        brush.bristles = {num: 2, spread: 10}
        brush.curve([p1, p1, p4, p1])
    }
    circles()
    // doorFill()
    doorFrame()
    arch()
}

let grid = () => {
    let horizontalLine = [[0, .5], [1, .5]]
    let verticalLine = [[.5, 0], [.5, 1]]
    brush.presets("pencil")
    brush.line(verticalLine)
    brush.line(horizontalLine)
}

let draw = () => {
    // demoDevDoor()
    grid()
}
let interval = () => {
    canvas.clear()
    draw()
}
interval()
timer.startInterval(interval)