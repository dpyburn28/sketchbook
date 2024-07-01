//
//
class myBrush {
    // CONSTRUCTOR
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d")
        this.isDrawing = false
        this.colors = [[0,0,0,1], [0,0,0,1]]
    }

    // SETTERS
    set weight(width) { this.ctx.lineWidth = width }
    set colors(colors=[[0,0,0], [255,255,255]]) {
        this._colors = colors
        this.ctx.strokeStyle = colorString(this._colors[0])
        this.ctx.fillStyle = colorString(this._colors[1])
    }
    // GETTERS
    get weight() { return this.ctx.lineWidth }
    get colors() { return this._colors }
    // PATHS
    stroke(points = []) {
        let anchor = points[0]
        this.ctx.beginPath()
        this.ctx.moveTo(anchor[0], anchor[1])
        points.forEach(point => {
            this.ctx.lineTo(point[0], point[1])
            anchor = point
        })
        this.ctx.stroke()
    }

    poly(points = []) {
        this.stroke(points)
        this.ctx.closePath()
        this.ctx.stroke()
        this.ctx.fill()
    }

    horizontalLine(y=this.canvas.height/2, x=0, length=this.canvas.width) {
        this.stroke([[x, y], [x+length, y]])
    }

    verticalLine(x=this.canvas.width/2, y=0, length=this.canvas.height) {
        this.stroke([[x, y], [x, y+length]])
    }

    // INTERVALS
    spiral(radius=[0, 100], pos=[this.canvas.width/2, this.canvas.height/2], speed=0, swirl=.1, duration) {
        let start = 0
        let end = (Math.PI / 180)
        let r = radius[0]
        let interval = setInterval(() => {
            this.isDrawing = true
            r = (r + swirl) % radius[1]
            start += (Math.PI/180)
            end += (Math.PI/180)
            this.ctx.beginPath()
            this.ctx.arc(pos[0], pos[1], radius[0] + r, start, end)
            this.ctx.stroke()
        }, speed)
        if(duration) {
            setTimeout(() => {
                this.isDrawing = false
                clearInterval(interval)
            }, duration)
        }
        return interval
    }

    flower(radius=[0, 100], pos=[this.canvas.width/2, this.canvas.height/2], speed=0, swirl=1, duration) {
        let start = 0
        let end = (Math.PI / 180)
        let r = radius[0]
        this.ctx.beginPath()
        let interval = setInterval(() => {
            this.isDrawing = true
            r = (r + swirl) % radius[1]
            start += (Math.PI/180)
            end += (Math.PI/180)
            this.ctx.arc(pos[0], pos[1], radius[0] + r, start, end)
            this.ctx.stroke()
        }, speed)
        if(duration) {
            this.isDrawing = false
            setTimeout(() => {
                clearInterval(interval)
            }, duration)
        }
        return interval
    }
}