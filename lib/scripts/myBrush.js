//
//
class myBrush {
    // CONSTRUCTOR
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.element.getContext("2d")
        this.isDrawing = false
        this.paths = new Paths(this)
        this.colors = [[0,0,0,1], [0,0,0,1]]
        this.pos = [this.canvas.width/2, this.canvas.height/2]
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
}