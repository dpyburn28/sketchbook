// Biiirdman
//

// Timer
const timer = new Timer(MS)

document.body.style.backgroundColor = colorString([255,255,255])

let res = [1080/(denom=2.5), 1920/denom]
let pos = [(window.innerWidth-res[0])/2,(window.innerHeight-res[1])/2]
let color = [255,255,255,1]
res=[window.innerWidth,window.innerHeight]
pos=[0,0]
const canv = new myCanvas(res, pos, color)

canv.isBordered = 0
canv.borderType = "solid"
canv.borderColor = [0,0,0]

canv.typewriter.font = {size:54, type:"arial"}
canv.typewriter.style.fillColor = [0,0,0]
canv.typewriter.style.strokeColor = [255, 255, 255]
canv.typewriter.style.lineWeight = 0
// canv.ctx.globalCompositeOperation ="hue"

let fontRange = canv.typewriter.font.size
let tempAlpha = 1

let presets = {
    demo: () => {
        canv.ctx.globalCompositeOperation ="source-atop"
        canv.typewriter.style.fillColor = [0,0,0]
        canv.typewriter.style.strokeColor = [255, 255, 255]
        canv.typewriter.font = {size:fontRange=50, type:"arial"}
        canv.color = [255, 255, 255]
        timer.rate = SECONDS/24
        tempAlpha = .001

    },
    daemon1: () => {
        canv.typewriter.style.strokeColor = [255, 255, 255]
        canv.typewriter.style.fillColor = [0,0,0]
        canv.typewriter.font = {size:fontRange=54, type:"arial"}
        canv.ctx.globalCompositeOperation ="difference"
        tempAlpha = .001
        timer.rate = MS*5
    },
    daemon2: () => {
        canv.typewriter.font = {size:fontRange=84, type:"arial"}
        canv.typewriter.style.fillColor = [0,0,0]
        canv.typewriter.style.strokeColor = [255, 255, 255]
        canv.ctx.globalCompositeOperation ="exclusion"
        tempAlpha = .001
        timer.rate = MS*20
    },
    daemon3: () => {
        presets.daemon1()
        canv.typewriter.style.strokeColor = [255, 255, 50]
        timer.rate = MS*10
    },
    value: () => {
        canv.typewriter.style.strokeColor = [255, 255, 255]
        canv.typewriter.style.fillColor = [0,0,0]
        canv.typewriter.font = {size:fontRange=54, type:"arial"}
        tempAlpha = .01
        timer.rate = MS*5
        canv.ctx.globalCompositeOperation = "luminosity"
    },
    void1:() => {
        canv.typewriter.style.strokeColor = [255, 255, 255]
        canv.typewriter.style.fillColor = [0,0,0]
        canv.typewriter.font = {size:fontRange=54, type:"arial"}
        canv.ctx.globalCompositeOperation = "source-atop"
        canv.color = [0, 0, 0]
        tempAlpha = 1
        timer.rate = MS*10
    },
    void2:() => {
        canv.typewriter.style.strokeColor = [255, 255, 255]
        canv.typewriter.style.fillColor = [255,255,255]
        canv.typewriter.font = {size:fontRange=54, type:"arial"}
        canv.ctx.globalCompositeOperation = "source-atop"
        canv.color = [0, 0, 0]
        tempAlpha = .05
        timer.rate = MS*1
    },
    starfall: () => {
        canv.typewriter.style.strokeColor = [255, 255, 255]
        canv.typewriter.style.fillColor = [0,0,0]
        canv.ctx.globalCompositeOperation = "source-atop"
        canv.color = [0, 0, 0]
        canv.typewriter.font = {size:fontRange=25}
        tempAlpha = .075
        timer.rate = MS*1
    },
    dayfall: () => {
        presets.starfall()
        canv.typewriter.font = {size:fontRange=10}
        tempAlpha = .001
    }
}
let myPresets = [
    presets.demo,
    presets.daemon1,
    presets.daemon2,
    presets.daemon3,
    presets.value,
    presets.void1,
    presets.void2,
    presets.starfall,
    presets.dayfall
]
let presetIndex = 0

let funcs = {
    sizeFunc:(func, t, range, offset=0) => {
        canv.typewriter.font.size = (offset + Math.abs(func(t)*range))
    },
    lineWeightFunc: (func, t, range, offset=0) => {
        canv.typewriter.style.lineWeight = offset + Math.abs(func(t)*range)
    },
    presetCycle: (t) => {
        if(t % 1000 < 10) {
            presetIndex++
            presetIndex = presetIndex % myPresets.length
            myPresets[presetIndex]()
            let temp = canv.ctx.globalCompositeOperation
            canv.ctx.globalCompositeOperation = "source-atop"
            canv.clear(1)
            canv.ctx.globalCompositeOperation = temp
            console.log(myPresets[presetIndex])
        }
        
    }
}


myPresets[7]()

let interval = () => {
    let t = timer.value
    // funcs.presetCycle(t)
    canv.clear(tempAlpha)
    funcs.sizeFunc((t)=>{return Math.sin(t)}, t, fontRange)
    funcs.lineWeightFunc((t)=>{return Math.cos(t)}, t, 2)
    canv.typewriter.type(t)
}
timer.startInterval(interval) 