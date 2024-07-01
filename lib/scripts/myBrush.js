//
//
class myBrush {
    // CONSTRUCTOR
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.element.getContext("2d")
        this.isDrawing = false
        this.pallete = [[0,0,0,1], [0,0,0,1]]
        this.cursor = [this.canvas.width/2, this.canvas.height/2]
        this.pather = new Pather(this)
    }

    // SETTERS
    set cursor(pos) {this._cursor = pos}
    set cursorX(xPos) {this._cursor[0] = xPos}
    set cursorY(yPos) {this._cursor[1] = yPos}
    // GETTERS
    get cursor() {return this._cursor}
    get cursorX() {return this._cursor[0]}
    get cursorY() {return this._cursor[1]}
    // PATHS
    draw(pathID, scale = [1, 1]) {
        let anchor = this.cursor
        let path = this.pather.getPath(pathID, scale)
        let points = path(scale)
        //
        this.ctx.beginPath()
        this.ctx.moveTo(anchor[0], anchor[1])
        if(!this.pather.connectAnchor) {this.ctx.beginPath()}
        points.forEach(point => {
            let x = anchor[0] + point[0]
            let y = anchor[1] + point[1]
            this.ctx.lineTo(x, y)
        })

    }
}
//
//
class Pather {
    constructor(brush) {
        this.brush = brush
        this.canvas = this.brush.canvas
        this.ctx = this.brush.ctx
        this.connectAnchor = false
    }
    getPath(pathID) {
        let points;
        Paths.forEach(path => {
            if(path[0] == pathID) {
                points = path[1]
            }
        })
        return points
    }
}