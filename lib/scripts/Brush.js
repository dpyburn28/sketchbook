// uses normalized values as input
class Brush {
    constructor(canvas) {
        this.canvas = canvas
        this.weight = 1
        this.pallete = [[0,0,0], [255,100,100]]
        this.lineCap = "round"
        this.isInk = true
        this.isPaint = false

    }
    setup() {
        let ctx = this.canvas.ctx
        ctx.lineWidth = this.weight
        ctx.strokeStyle = colorString(this.pallete[0])
        ctx.fillStyle = colorString(this.pallete[1])
        ctx.lineCap = this.lineCap
        return ctx
    }
    line(pointNormals) {
        let ctx = this.setup()
        let nAnchor = pointNormals.unshift()
        let p0 = [this.canvas.pos[0] + (this.canvas.width * nAnchor[0]), this.canvas.pos[1] + (this.canvas.height * nAnchor[1])]
        let p = p0
        ctx.beginPath()
        ctx.moveTo(p0[0], p0[1])
        pointNormals.forEach(nPoints => {
            let x = (this.canvas.width * nPoints[0])
            let y = (this.canvas.height * nPoints[1])
            ctx.lineTo(x, y)
        })
        this.close()
        
    }
    close() {
        this.canvas.ctx.closePath()
        if(this.isInk) this.canvas.ctx.stroke()
        if(this.isPaint) {
            console.log(this.canvas)
            this.canvas.ctx.fill()
        }
    }

}