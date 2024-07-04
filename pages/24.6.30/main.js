


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
        styleArgs = [weight=2, colors=[stroke=[0,0,0,1], fill=[255,0,0,1]], true, true]
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
        styleArgs = [weight=5, colors=[stroke=[255,0,0,1], fill=[0,0,0,1]], true, true]
        let args = [waveArgs, swirlArgs, styleArgs]
        spiral(waveArgs, swirlArgs, styleArgs)
        waveArgs = [tan, range, 0]
        swirlArgs = [radius, swirl]
        styleArgs = [weight/25, colors=[stroke=[255,255,255,1], fill=[0,0,0,1]], true, true]
        spiral(waveArgs, swirlArgs, styleArgs)
        return args
    },
    typeC: (radius=250) => {
        waveArgs = [cos, range, 0]
        swirlArgs = [radius, 1]
        styleArgs = [weight, colors=[stroke=[20,0,0,1], fill=[255,0,0,1]], false, false]
        spiral(waveArgs, swirlArgs, styleArgs)
        let args = [waveArgs, swirlArgs, styleArgs]
        return args
    },
    typeD: (radius=200) => {
        waveArgs = [sin, 30, 2]
        swirlArgs = [radius, 3]
        styleArgs = [3, colors=[stroke=[255,255,255,1], fill=[0,0,0,1]], false, true]
        spiral(waveArgs, swirlArgs, styleArgs)
        return [waveArgs, swirlArgs, styleArgs]
    },
    typeE: (radius=200) => {
        waveArgs = [sin, 50, 15]
        swirlArgs = [radius, 10]
        styleArgs = [1, colors=[stroke=[255,255,255,1], fill=[0,0,0,1]], false, true]
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
        mainCanvas.brush.cursorY = (mainCanvas.height/2) - 50
        let args = spiral(cellWidth/2)
        if(displayParameters) {drawParameters(args, [c + 25, y], 14, index)}
    })
    //
    x = 25
    y = mainCanvas.height - mainCanvas.height/2 + 100
    let size = 14
    let temp;
    temp = drawFunction(spiral, pos=[x, y], size)
    temp = drawFunction(wavePoints, [x, temp[1]], size)
    temp = drawFunction(wave, [x, temp[1]], size)
    temp = drawFunction(mainCanvas.brush.draw, [temp[0] + 10, y], size)
    drawFunction(Paths[2][1], [temp[0] + 400, y], size)
}
setInterval(interval, timer.rate)



// Functions
function spiral(waveArgs, spiralArgs, styleArgs) {
    let ctx = mainCanvas.brush.ctx;
    ctx.lineWidth = styleArgs[0];
    mainCanvas.brush.pallete = styleArgs[1];
    mainCanvas.brush.pather.closePath = styleArgs[2];
    mainCanvas.brush.pather.isFill = styleArgs[3];
    wavePoints(waveArgs, spiralArgs);
};
function wavePoints(waveArgs, spiralArgs) {
    let numPoints = wave(waveArgs[0], waveArgs[1], waveArgs[2]);
    spiralArgs.push(numPoints);
    mainCanvas.brush.draw("spiral", spiralArgs);
    mainCanvas.brush.ctx.stroke();
};
function wave(func, range, offset) {
    let value = (timer.value/timer.rate) % (offset + range);
    let waveValue = Math.floor((func(value)*range/2) + offset + (range/2));
    return waveValue;
};

function drawParameters(args, pos, size, spiralIndex) {
    let ctx = mainCanvas.brush.ctx
    ctx.font = size + "px serif"
    let waveArgs = args[0]
    let swirlArgs = args[1]
    let styleArgs = args[2]
    let y = 10
    ctx.fillStyle="red"
    ctx.fillText("waveArgs", pos[0], y+=size)
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
        ctx.fillText(str + arg, pos[0], y += size)
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
            case 2:
                str= "numPoints: "
        }
        ctx.fillText(str + arg, pos[0], y+=size)
    })
    ctx.fillStyle = "red"
    ctx.fillText("styleArgs", pos[0], y+=size)
    let index = 0
    styleArgs.forEach(arg => {
        ctx.fillStyle = "black"
        let str;
        switch(index) {
            case 0:
                str = "lineWeight: " + arg
                break;
            case 1:
                y+=size
                str = "strokeColor: [r=" + arg[0][0] + " g=" + arg[0][1] + " b=" + arg[0][2] + " a=" + arg[0][3] + "]"
                ctx.fillText(str, pos[0], y)
                str = "fillColor: [r=" + arg[1][0] + " g=" + arg[1][1] + " b=" + arg[1][2] + " a=" + arg[1][3] + "]"
                break;
            case 2:
                str = "closePath: " + arg
                break;
            case 3: 
                str = "fill: " + arg
                break;
        }
        index++
        ctx.fillText(str, pos[0], y += size)
    })
}

function drawFunction(func, pos, size) {
    let ctx = mainCanvas.brush.ctx
    let str = func.toString()
    let name = str.slice(0, str.indexOf("("))
    let parameters = str.slice(str.indexOf("("), str.indexOf(")") + 1)
    let body = str.slice(str.indexOf("{"))
    let lines = body.split(";")
    w = 0
    h = pos[1]
    let y = pos[1]
    ctx.font = size + "px serif"
    ctx.fillStyle = "red"
    if(name=="draw") {name="brush.draw"}
    if(name) ctx.fillText(name, pos[0], y += size);
    else {ctx.fillText(name="Paths.spiral", pos[0], y += size)};
    w = ctx.measureText(name).width
    h += size
    ctx.fillStyle = "blue"
    ctx.fillText(parameters="parameters " + parameters, pos[0], y += size)
    let paramWidth = ctx.measureText(parameters).width
    if(paramWidth > w) {w = paramWidth}
    h += size
    ctx.fillStyle = "black"
    lines.forEach(line => {
        // console.log(line)
        let index = lines.indexOf(line)
        ctx.fillText(line, pos[0], y += size)
        let lineWidth = ctx.measureText(line).width
        if(lineWidth > w) {w = lineWidth}
        h += size
    })
    return [w, h]
}