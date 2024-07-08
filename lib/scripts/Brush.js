// uses normalized values as input
class Brush {
    constructor(canvas) {
        this.canvas = canvas
        this.presets()
    }
    setup() {
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
        let nAnchor = pointNormals.unshift()
        let p0 = [this.canvas.pos[0] + (this.canvas.width * nAnchor[0]), this.canvas.pos[1] + (this.canvas.height * nAnchor[1])]
        ctx.beginPath()
        let lastPoint = [p0[0], p0[1]]
        ctx.moveTo(p0[0], p0[1])
        for(let i = 0; i < pointNormals.length; i++) {
            let nPoints = pointNormals[i]
            let x = (this.canvas.width * nPoints[0])
            let y = (this.canvas.height * nPoints[1])
            ctx.lineTo(x, y)
        }
        this.close()
        
    }
    close() {
        this.canvas.ctx.closePath()
        if(this.isPaint) this.canvas.ctx.fill()
        if(this.isInk) this.canvas.ctx.stroke()
    }
    presets(brushType) {
        switch(brushType) {
            default: 
                this.weight = 1
                this.pallete = [[0,0,0], [255,0,0]]
                this.lineCap = "round"
                this.isInk = true
                this.isPaint = false
                this.composite = "source-atop"
                this.distanceTraveled = 0
                break;
            case "pencil":
                this.weight = 1
                this.pallete = [[0,0,0, .85], [0,0,0, .75]]
                this.lineCap = "round"
                this.isInk = true
                this.isPaint = false
                this.composite = "darken"
                break;
            case "pen":
                this.weight = 2
                this.pallete = [[0,0,0], [0,0,0]]
                this.lineCap = "round"
                this.isInk = true
                this.isPaint = false
                this.composite = "multiply"
                break;
            case "eraser":
                this.weight = 10
                this.pallete[0] = this.pallete[1] = this.canvas.color
                this.lineCap = "square"
                this.isInk = true
                this.isPaint = true
                this.composite = "lighten"
                break;
        }
    }
}