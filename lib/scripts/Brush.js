// uses normalized values as input
class Brush {
    constructor(canvas) {
        this.canvas = canvas
        
        this.presets()
    }
    // Setters
    set strokeColor(color) {
        this.pallete[0] = color
    }
    set fillColor(color) {
        this.pallete[1] = color
    }
    // Getters
    get strokeColor() {
        let stroke = this.pallete[0]
        let value = this.value
        let r = stroke[0] * value
        let g = stroke[1] * value
        let b = stroke[2] * value
        return [r,g,b]
    }
    get fillColor() {
        let stroke = this.pallete[1]
        let value = this.value
        let r = stroke[0] * value
        let g = stroke[1] * value
        let b = stroke[2] * value
        return [r,g,b]
    }
    // Methods
    deNormalizer(nPoint) {
        let x = this.canvas.pos[0]
        let y = this.canvas.pos[1]
        let width = this.canvas.width
        let height = this.canvas.height
        let point = [
            x + (nPoint[0] * width),
            y + (nPoint[1] * height)
        ]
        return point
    }
    deNormalizeArray(nPointArray) {
        let pointArray = []
        nPointArray.forEach(nPoint => {
            pointArray.push(this.deNormalizer(nPoint))
        })
        return pointArray
    }
    pathArray(pointArray) {
        let ctx = this.canvas.ctx
        let p0 = pointArray[0]
        ctx.beginPath()
        ctx.moveTo(p0[0], p0[1])
        for(let i = 1; i < pointArray.length; i++) {
            let point = pointArray[i]
            ctx.lineTo(point[0], point[1])
        }
    }
    bristlePaths(basePath) {
        let bristlePaths = new Array()
        // Bristle path
        for(let i = 0; i < this.bristles.num; i++) {
            let bpath = new Array()
            let spread = this.bristles.spread
            let offsetX = spread-(Math.sin(Math.random()) * spread*2)
            let offsetY = spread-(Math.sin(Math.random()) * spread*2)
            // For all points in path
            for(let j = 0; j < basePath.length; j++) {
                let point = basePath[j]
                let x = point[0] + offsetX
                let y = point[1] + offsetY
                let bpoint = [x, y]
                bpath.push(bpoint)
            }
            bristlePaths.push(bpath)
        }
        return bristlePaths
    }
    setup() {
        let ctx = this.canvas.ctx
        ctx.lineWidth = this.weight
        ctx.strokeStyle = colorString(this.strokeColor)
        ctx.fillStyle = colorString(this.fillColor)
        ctx.lineCap = this.lineCap
        ctx.globalCompositeOperation = this.composite
        return ctx
    }
    line(pointNormals) {
        let ctx = this.setup()
        let points = this.deNormalizeArray(pointNormals)
        this.pathArray(points)
        this.close()
        if(this.tip == "bristles") {
            let bPaths = this.bristlePaths(points)
            bPaths.forEach(bpath => {
                this.pathArray(bpath)
                this.close()
            })
        }
    }
    curve(nPointsArray) {
        let ctx = this.setup()
        let points = this.deNormalizeArray(nPointsArray)
        ctx.beginPath()
        if(points.length < 3) {
            let p1 = points[0]
            let c1 = points[1]
            let p2 = points[2]
            ctx.bezierCurveTo(p1[0], p1[1], c1[0], c1[1], p2[0], p2[1])
        } else {
            let p1 = points[0]
            let c1 = points[1]
            let c2 = points[2]
            let p2 = points[3]
            ctx.bezierCurveTo(p1[0], p1[1], c1[0], c1[1], c2[0], c2[1], p2[0], p2[1])
        }
        
        this.close()
        if(this.tip == "bristles") {
            let bPaths = this.bristlePaths(points)
            bPaths.forEach(points => {
                ctx.beginPath()
                let p1 = points[0]
                let c1 = points[1]
                let c2 = points[2]
                let p2 = points[3]
                ctx.bezierCurveTo(p1[0], p1[1], c1[0], c1[1], c2[0], c2[1], p2[0], p2[1])
                this.close()
            })
        }
    }
    arc(nOrigin, r, start=0, end=Math.PI*2) {
        let ctx = this.setup()
        let origin = this.deNormalizer(nOrigin)
        ctx.beginPath()
        ctx.arc(origin[0], origin[1], r, start, end)
        this.close()
        if(this.tip=="bristles") {
            let bOrigins = this.bristlePaths([origin])
            bOrigins.forEach(origin => {
                origin = origin[0]
                ctx.beginPath()
                ctx.arc(origin[0], origin[1], r, start, end)
                this.close()
            })
        }
    }
    close() {
        if(this.closer) this.canvas.ctx.closePath()
        if(this.isPaint) this.canvas.ctx.fill()
        if(this.isInk) this.canvas.ctx.stroke()
        this.canvas.ctx.closePath()
    }
    presets(brushType) {
        switch(brushType) {
            default: 
                this.weight = 1
                this.pallete = [[0,0,0], [1,0,0]]
                this.lineCap = "round"
                this.isInk = true
                this.isPaint = false
                this.composite = "source-atop"
                this.distanceTraveled = 0
                this.value = 0
                this.closer = false
                this.bristles = {num:10, spread:10}
            case "pencil":
                this.weight = 1
                this.pallete = [[1,1,1], [1,1,1]]
                this.value = 150
                this.lineCap = "round"
                this.isInk = true
                this.isPaint = false
                this.composite = "source-atop"
                this.tip = "point"
                this.closer = false
                break;
            case "pen":
                this.weight = 2
                this.pallete = [[1,1,1], [1,1,1]]
                this.value = 0
                this.lineCap = "round"
                this.isInk = true
                this.isPaint = false
                this.composite = "source-atop"
                this.tip = "point"
                break;
            case "eraser":
                this.weight = 10
                this.value = this.canvas.value
                this.pallete = this.canvas.pallete

                this.lineCap = "square"
                this.isInk = true
                this.isPaint = true
                this.composite = "source-atop"
                break;
            case "polyPen":
                this.weight = 1
                this.lineCap = "square"
                this.isInk = true
                this.isPaint = true
                this.composite = "soure-atop"
                break;
            case "brush":
                this.weight = 3
                this.lineCap = "round"
                this.isInk = true
                this.isPaint = false
                this.composite = "hard-light"
                this.value = 100
                this.tip = "bristles"
                this.bristles = {num:10, spread:10}
                this.pallete = [[0,0,0], [1,1,1]]
                break;
        }
    }
}