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
    draw() {
        console.log(Paths.diamond(this.cursor))
        let diamond = new Path()
        console.log(this.canvas)
        diamond.draw(this.canvas)
    }
}
//
class Path {
    constructor(pather, pathID) {
        this.pather = pather
        this.id = pathID
        this.points = this.pather.getPathPoints(this.id)
        console.log(this.points)
        this.connectAnchor = false
    }
    draw() {
        const ctx = this.pather.ctx
        ctx.beginPath()
        ctx.moveTo(this.brush.cursor[0], this.brush.cursor[1])
        if(!this.connectAnchor) {ctx.beginPath()}
        this.points.forEach(point => {
            ctx.lineTo(point[0], point[1])
        })
        ctx.closePath()
    }
}
//
class Pather {
    constructor(canvas) {
        this.canvas = canvas
        this.brush = this.canvas.brush
        this.ctx = this.brush.ctx
    }
    getPathPoints(pathID) {
        let points;
        Paths.forEach(path => {
            if(path[1] == [pathID]) {
                points = path[0]
            }
        })
        return points
    }
}