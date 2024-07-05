// biirdman
//
//

class Typewriter{
    // Constructor
    constructor(myCanvas, obj) {
        this.cursor = {x: 0, y:0}
        this.canvas = myCanvas
        this.ctx = this.canvas.ctx
        this.font = {size:12, type:"serif"}
        this.style = {strokeWeight: 0, fillColor:[0,0,0,1], strokeColor:[0,0,0,0]}
        
    }
    // Setters
    set font(fontObj) { 
        this._font = fontObj
        this.ctx.font = `${this._font.size}px ${this._font.type}`
        let h = this._font.size
        let w = h/2
        let x = this.cursor.x
        let y = this.cursor.y
        this.cursor = {x:x, y:y, h:h, w:w}
    }
    set style(styleObj) {
        this._style = styleObj
        if(this._style.fillColor) this.ctx.fillStyle = colorString(this._style.fillColor)
        if(this._style.strokeColor) this.ctx.strokeStyle = colorString(this._style.strokeColor)
        if(this._style.strokeWeight) this.ctx.strokeWeight = this._style.strokeWeight
    }
    // Getters
    get font() { return this._font}
    get style() {return this._style}
    // Methods
    setup() {
        this.font = this._font
        this.style = this._style
    }
    type(str) {
        this.setup()
        this.ctx.fillText(str, this.cursor.x, this.cursor.y + this.cursor.h)
        let w = this.ctx.measureText(str).width
        let x = (this.cursor.x + w) % (this.canvas.width - w)
        let y = this.cursor.y
        if (x !== (this.cursor.x + this.cursor.w)) {y = (y + this.cursor.h) % (this.canvas.height-this.font.size)}
        
        this.cursor = {x, y, w}
    }
}

