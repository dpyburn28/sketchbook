// Biiirdman
//

// Timer
const timer = new Timer(MS*50)

let res = [1080/(denom=3), 1920/denom]
let pos = [(window.innerWidth-res[0])/2,(window.innerHeight-res[1])/2]
let color = [255,255,255,1]
const canv = new myCanvas(res, pos, color)

canv.isBordered = 5

canv.typewriter.font = {size:54, type:"helvetica"}

let interval = () => {
    canv.clear(.005)
    canv.typewriter.type(timer.value)
}
timer.startInterval(interval) 