// Biiirdman
//

// Timer
const timer = new Timer(MS*100)

let res = [1080/(denom=3), 1920/denom]
let pos = [(window.innerWidth-res[0])/2,(window.innerHeight-res[1])/2]
let color = [255,255,255,1]

const canv = new myCanvas(res, pos, color)
const brush = canv.brush
const ctx = brush.ctx

let setupCanv = () => {
    canv.isBordered = 5
    ctx.font = (fontSize=15) + "px serif"
    ctx.fillStyle = "black"
}
setupCanv()

let drawTimerValue = (pos) => {
    ctx.fillText(timer.value, pos[0], pos[1]+fontSize)
}

// Interval
let interval = () => {
    timer.interval()
    canv.clear()
    setupCanv()
    let num = 25
    for(let index = 0; index < num; index++) {
        drawTimerValue([0,index * fontSize])
    }
}
setInterval(interval, timer.rate)