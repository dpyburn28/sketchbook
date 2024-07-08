// uses normalized values as input
class Brush {
    constructor(canvas) {
        this.canvas = canvas
        this.presets()
    }
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
    setColor() {
        for (let i = 0; i < this.pallete.length; i++) {
            let color = this.pallete[i]
            let value = 255 - this.value
            let r = color[0] * value
            let g = color[1] * value
            let b = color[2] * value
            this.pallete[i] = [r,g,b]
        }
    }
    setup() {
        this.setColor()
        let ctx = this.canvas.ctx
        ctx.lineWidth = this.weight
        ctx.strokeStyle = colorString(this.pallete[0])
        ctx.fillStyle = colorString(this.pallete[1])
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
            let numBristles = 10
            let r = this.bristleTightness
            for(let i = 0; i < numBristles; i++) {
                let bPoints = []
                let offsetX = r-(Math.sin(Math.random()) * r*2)
                let offsetY = r-(Math.sin(Math.random()) * r*2)
                for(let i = 0; i < points.length; i++) {
                    let point = points[i]
                    let x = point[0] + offsetX
                    let y = point[1] + offsetY
                    bPoints.push([x,y])
                }
                this.pathArray(bPoints)
                this.close()
            }
            
        }
    }
    curve(nPointsArray) {
        let ctx = this.setup()
        let nAnchor = nPointsArray.unshift()
        let p0 = [this.canvas.pos[0] + (this.canvas.width * nAnchor[0]), this.canvas.pos[1] + (this.canvas.height * nAnchor[1])]
        ctx.beginPath()
        for(let i = 0; i < nPointsArray.length; i++) {
            let nPoints = nPointsArray[i]
            let x = (this.canvas.width * nPoints[0])
            let y = (this.canvas.height * nPoints[1])
            nPointsArray[i] = [x, y]
        }
        let p1 = nPointsArray[0]
        let c1 = nPointsArray[1]
        let c2 = nPointsArray[2]
        let p2 = nPointsArray[3]
        ctx.bezierCurveTo(p1[0], p1[1], c1[0], c1[1], c2[0], c2[1], p2[0], p2[1])
        this.close()
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
                break;
            case "pencil":
                this.weight = 1
                this.pallete = [[1,1,1, 1], [1,1,1, 1]]
                this.value = 150
                this.lineCap = "round"
                this.isInk = true
                this.isPaint = false
                this.composite = "darken"
                this.tip = "point"
                this.closer = false
                break;
            case "pen":
                this.weight = 2
                this.pallete = [[1,1,1], [1,1,1]]
                this.value = 255
                this.lineCap = "round"
                this.isInk = true
                this.isPaint = false
                this.composite = "multiply"
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
                this.composite = "source-atop"
                this.value = 255
                this.tip = "bristles"
                this.bristleTightness = 10
                this.pallete = [[1,1,1], [1,1,1]]
        }
    }
}