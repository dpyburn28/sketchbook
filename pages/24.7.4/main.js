// Biiirdman
//

// Timer
const timer = new Timer(MS)

document.body.style.backgroundColor = colorString([255,255,255])

let res = [1080/(denom=3), 1920/denom]
let pos = [(window.innerWidth-res[0])/2,(window.innerHeight-res[1])/2]
let color = [255,255,255,1]
const canv = new myCanvas(res, pos, color)

canv.isBordered = 0
canv.borderType = "dotted"
canv.borderColor = [255,255,255]

canv.typewriter.font = {size:14, type:"helvetica"}
canv.typewriter.style.fillColor = [0,0,0]

let interval = () => {
    canv.clear(.1)
    canv.typewriter.font.size = 25 + (Math.random() * 25)
    canv.typewriter.type(timer.value)
}
timer.startInterval(interval) 