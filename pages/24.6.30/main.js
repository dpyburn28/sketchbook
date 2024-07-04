


// Initialize and Start timer
let timer = new Timer(MS * 30)

roundTo = 100
const sin = (value=(timer.value * timer.rate)) => {return Math.sin(value)}
sin.toString = () => {
    return "sin(θ = " + Math.floor(sin()*roundTo) + ")"
}
const cos = (value=(timer.value * timer.rate)) => {return Math.cos(value)}
cos.toString = () => {
    return "cos(θ = "  + Math.floor(cos()*roundTo) + ")"
}
const tan = (value=(timer.value * timer.rate)) => {return Math.tan(value)}
tan.toString = () => {
    return "tan(θ = "  + Math.floor(tan()*roundTo) + ")"
}
const backgroundCanvas = new myCanvas(
    res=[window.innerWidth, window.innerHeight],
    pos=[0,0],
    color=[255,255,255,1]
)

const mainCanvas = new myCanvas(
    res=res,
    pos=[(backgroundCanvas.width-res[0])/2, (backgroundCanvas.height-res[1])/2],
    color=[255, 255, 255, 1]
)
mainCanvas.brush.pather.connectAnchor = false
mainCanvas.brush.ctx.lineCap = "round"
let ctx = mainCanvas.brush.ctx

let spirals = {
    typeA: (radius=200) => {
        waveArgs = [cos, range=300, offset=50]
        swirlArgs = [radius, swirl=100]
        styleArgs = [weight=2, colors=[stroke=[255,0,0,1], fill=[255,0,0,1]], true, true]
        let args = [waveArgs, swirlArgs, styleArgs]
        spiral(waveArgs, swirlArgs, styleArgs)
        waveArgs = [tan, range, 50]
        swirlArgs = [radius, swirl]
        styleArgs = [weight/10, colors=[stroke=[255,0,0,1], fill=[255,0,0,1]], true, true]
        spiral(waveArgs, swirlArgs, styleArgs)
        return args
    },
    typeB: (radius=250) => {
        waveArgs = [cos, range=100, offset=0]
        swirlArgs = [radius, swirl=50]
        styleArgs = [weight=5, colors=[stroke=[20,0,0,1], fill=[0,0,0,1]], true, true]
        let args = [waveArgs, swirlArgs, styleArgs]
        spiral(waveArgs, swirlArgs, styleArgs)
        waveArgs = [tan, range, 0]
        swirlArgs = [radius, swirl]
        styleArgs = [weight/25, colors=[stroke=[20,0,0,1], fill=[0,0,0,1]], true, true]
        spiral(waveArgs, swirlArgs, styleArgs)
        return args
    },
    typeC: (radius=250) => {
        waveArgs = [cos, range, 0]
        swirlArgs = [radius, 1]
        styleArgs = [weight, colors=[stroke=[20,0,0,1], fill=[0,0,0,1]], true, true]
        spiral(waveArgs, swirlArgs, styleArgs)
        return [waveArgs, swirlArgs, styleArgs]
    },
    typeD: (radius=200) => {
        waveArgs = [sin, 30, 2]
        swirlArgs = [radius, 3]
        styleArgs = [3, colors=[stroke=[20,0,0,1], fill=[0,0,0,1]], false, true]
        spiral(waveArgs, swirlArgs, styleArgs)
        return [waveArgs, swirlArgs, styleArgs]
    },
    typeE: (radius=200) => {
        waveArgs = [sin, 50, 15]
        swirlArgs = [radius, 10]
        styleArgs = [1, colors=[stroke=[20,0,0,1], fill=[0,0,0,1]], false, true]
        spiral(waveArgs, swirlArgs, styleArgs)
        return [waveArgs, swirlArgs, styleArgs]
    }
}

// Interval
let displayParameters = true
let interval = () => {
    timer.interval()
    mainCanvas.clear(1)
    let mySpirals = [
        spirals.typeA, 
        spirals.typeB,
        spirals.typeC,
        spirals.typeD,
        spirals.typeE
    ]
    let rows = 1
    let columns = mySpirals.length
    let cellWidth = mainCanvas.width / columns
    let cellHeight = mainCanvas.height / rows
    mySpirals.forEach(spiral => {
        let index = mySpirals.indexOf(spiral)
        let c = cellWidth * index
        let r = cellHeight * index
        y = r + cellHeight/2
        x = c + cellWidth/2
        mainCanvas.brush.cursorX = x
        let args = spiral(cellWidth/2)
        if(displayParameters) {drawParameters(args, [c, y], 14, index)}
    })
    
}
setInterval(interval, timer.rate)



// Functions
function spiral(waveArgs=[wave=sin, range=300, offset=0], spiralArgs=[radius=200, swirl=20], styleArgs=[weight=1, colors=[[0,0,0], [0,0,0]], closed=false, fill=false]) {
    let ctx = mainCanvas.brush.ctx
    ctx.lineWidth = styleArgs[0]
    mainCanvas.brush.colors = styleArgs[1]
    mainCanvas.brush.pather.closePath = styleArgs[2]
    mainCanvas.brush.pather.isFill = styleArgs[3]
    wavePoints(waveArgs, spiralArgs)
}
function wavePoints(waveArgs=[type=sin, range, offset], spiralArgs) {
    let numPoints = wave(waveArgs[0], waveArgs[1], waveArgs[2])
    spiralArgs.push(numPoints)
    mainCanvas.brush.draw("spiral", spiralArgs)
    mainCanvas.brush.ctx.stroke()
}
function wave(func=Math.sin, range=100, offset=100) {
    let value = (timer.value/timer.rate) % (offset + range)
    let waveValue = Math.floor((func(value)*range/2) + offset + (range/2))
    return waveValue
}

function drawParameters(args, pos, size, spiralIndex) {
    let ctx = mainCanvas.brush.ctx
    ctx.font = size + "px serif"
    let waveArgs = args[0]
    let swirlArgs = args[1]
    swirlArgs.pop()
    let styleArgs = args[2]
    let y = 0
    ctx.fillStyle="red"
    ctx.fillText("waveArgs", pos[0], size)
    waveArgs.forEach(arg => {
        ctx.fillStyle = "black"
        let index = waveArgs.indexOf(arg)
        let str;
        switch(index) {
            case 0:
                str = "func: "
                break;
            case 1:
                str = "θRange: "
                break
            case 2:
                str = "θOffset: "
        }
        ctx.fillText(str + arg, pos[0], y = (size)+size + (index * size))
    })
    ctx.fillStyle="red"
    ctx.fillText("swirlArgs", pos[0], y = y + size)
    swirlArgs.forEach(arg => {
        ctx.fillStyle = "black"
        let index = swirlArgs.indexOf(arg)
        let str;
        switch(index) {
            case 0:
                str = "radius: "
                break;
            case 1:
                str = "swrl: "
                break;
        }
        ctx.fillText(str + arg, pos[0], y+size + (index * size))
    })
    ctx.fillStyle = "red"
    ctx.fillText("styleArgs", pos[0], y+size + (swirlArgs.length * size))
    let index = 0
    styleArgs.forEach(arg => {
        ctx.fillStyle = "black"
        console.log(arg)
        let str;
        switch(index) {
            case 0:
                str = "lineWeight: " + arg
                break;
            case 1:
                y+=size
                str = "strokeColor: [r=" + arg[0][0] + ",g=" + arg[0][1] + ",b=" + arg[0][2] + ",a=" + arg[0][3] + "]"
                ctx.fillText(str, pos[0], (size * 2) + y+size + (index * size))
                str = "fillColor: [r=" + arg[1][0] + ",g=" + arg[1][1] + ",b=" + arg[1][2] + ",a=" + arg[1][3] + "]"
                break;
            case 2:
                str = "closePath: " + arg
                break;
            case 3: 
                str = "fill: " + arg
                break;
        }
        index++
        ctx.fillText(str, pos[0], (size * 2) + y+size + (index * size))
    })
}