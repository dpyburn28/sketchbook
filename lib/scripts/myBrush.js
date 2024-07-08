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
    draw(pathID, args) {
        let anchor = this.cursor;
        let path = this.pather.getPath(pathID, args);
        let points = path(args);
        this.ctx.strokeStyle= colorString(this.pallete[0]);
        this.ctx.beginPath();
        this.ctx.moveTo(anchor[0], anchor[1]);
        if(!this.pather.connectAnchor) {this.ctx.beginPath()};
        points.forEach(point => {this.ctx.lineTo(anchor[0] + point[0], anchor[1] + point[1])});
        if(this.pather.closePath) {this.ctx.closePath()};
        this.ctx.fillStyle = colorString(this.pallete[1]);
        this.ctx.globalCompositeOperation = "multiply";
        if(this.pather.isFill) this.ctx.fill();
        this.ctx.globalCompositeOperation = "source-atop";
    };
}
//
//
