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
        this.marginX = 0
        this.marginY = 0
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
    newLine(w=0) {
        this.cursor.y += this.font.size + this.paddingY
        this.cursor.x = this.marginX + w
    }
    type(str, delay=.1) {
        this.cursor.x += this.marginX
        this.setup()
        if(delay) {
            console.log(str)
            let temp = ""
            for(let i = 0; i < str.length; i++) {
                setTimeout(()=>{
                    this.write(str[i])
                }, i*delay)
            }
        } else {
            this.write(str)
        }
    }
    write(str) {
        let x = this.cursor.x
        let y = this.cursor.y
        let h = this.font.size
        let w = this.ctx.measureText(str).width
        if(x+w > (this.canvas.width-this.marginX)) {
            this.newLine(w)
            x = this.cursor.x
            y = this.cursor.y
        }
        if(this.style.lineWeight) {
            this.ctx.strokeText(str, x, y+h)
        }
        this.ctx.fillText(str, x, y+h)
        this.cursor.x += w  

    }
}

