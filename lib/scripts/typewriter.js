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
        this.style = {lineWeight: .25, fillColor:[0,0,0,1], strokeColor:[255,255,255,1]}
        this.paddingX = 0
        this.paddingY = 0
    }
    // Setters
    set font(fontObj) { 
        if(this._font){
            if(fontObj.size) {
                this._font.size = fontObj.size
            } else {}
            if(fontObj.type) {
                this._font.type = fontObj.type
            } else {}
            if(fontObj.lineWeight) {
                this._font.lineWeight = fontObj.lineWeight
            }
            this.ctx.font = `${this._font.size}px ${this._font.type}`
            let h = this._font.size
            let w = h/2
            let x = this.cursor.x
            let y = this.cursor.y
            this.cursor = {x:x, y:y, h:h, w:w}
        } else {
            this._font = fontObj
            this.font = this._font
        }
        
    }
    set style(styleObj) {
        if(this._style) {
            if(styleObj.fillColor) {
                this._style.fillColor = styleObj.fillColor
                this.ctx.fillStyle = colorString(this._style.fillColor)
            } else {}
            if(styleObj.strokeColor) {
                this._style.strokeColor = styleObj.strokeColor
                this.ctx.strokeStyle = colorString(this._style.strokeColor)
            } else {}
            if(styleObj.lineWeight) {
                this._style.lineWeight = styleObj.lineWeight
                this.ctx.lineWidth = this._style.lineWeight
            } else {}
        } else {
            this._style = styleObj
            this.style = this._style
        }
        
    }
    // Getters
    get font() { return this._font}
    get style() {return this._style}
    // Methods
    setup() {
        this.font = this._font
        this.style = this._style
    }
    type(str, delay) {
        this.setup()
        if(delay) {
            console.log(str)
            let fullStr = str
            str = fullStr[0]
            for(let i = 1; i < fullStr.length; i++) {
                let ctx = this.ctx
                let padding = [this.paddingX, this.paddingY]
                let cursor = this.cursor
                let lineWeight = this.style.lineWeight
                setTimeout(()=>{
                    str += fullStr[i]
                    console.log(str)
                    ctx.fillText(str, padding[0]+cursor.x, padding[1]+cursor.y + cursor.h)
                    if(lineWeight) {
                        ctx.strokeText(str, cursor.x, cursor.y + cursor.h)
                    }
                }, i*delay*timer.rate)
            }
        } else {
            this.ctx.fillText(str, this.paddingX+this.cursor.x, this.paddingY+this.cursor.y + this.cursor.h)
            if(this.style.lineWeight) {
                this.ctx.strokeText(str, this.cursor.x, this.cursor.y + this.cursor.h)
            }
        }
        
        let w = this.ctx.measureText(str).width
        let x = (this.cursor.x + w) % (this.canvas.width - w)
        let y = this.cursor.y
        if (x !== (this.cursor.x + this.cursor.w)) {y = (y + this.cursor.h) % (this.canvas.height-this.font.size)}
        this.cursor = {x, y, w}
    }
}

