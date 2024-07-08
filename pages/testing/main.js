
let timer = new Timer(SECONDS)

let canvas = new myCanvas(
    res=[window.innerWidth, window.innerHeight],
    pos=[0,0],
    color=[255,255,255]
)

let brush = canvas.brush = new Brush(canvas)
brush.isPaint = true
brush.weight = .5
brush.lineCap = "round"

let p1 = [.5, 1]
let p2 = [1, .5]
let ground = (height) => {
    let p1 = [0, 1-height]
    let p2 = [1, 1-height]
    brush.line([p1, p2])
    let hHatch = (numShadows) => {
        for(let i = 0; i < numShadows; i++) {
            let hMod = ((height/numShadows)*i)
            p1[1] = p2[1] = (1-height) + hMod
            brush.line([p1, p2])
        }
    }
    hHatch(30)
    let vHatch = (numShadows) => {
        for(let i = 0; i < numShadows; i++) {
            let hMod = ((1/numShadows)*i)
            p1[1] = (1-height)
            p2[1] = 1
            p1[0] = p2[0] = hMod
            brush.line([p1, p2])
        }
    }
    vHatch(40)
    let fill = () => {
        let p3 = [1, 1]
        let p4 = [0, 0]
        brush.isPaint = true
        brush.line([p1, p2, p3, p4])
    }
}
let interval = () => {
    ground(.25)
}
timer.startInterval(interval)