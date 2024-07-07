// Canvas Object
class myCanvas {
    // CONSTRUCTOR
    constructor(res, pos, color, element) {
        if(!element) { element = createCanvasElement() }
        if(!res) { res = [width=parent.width, height=parent.height] }
        if(!pos) { pos = [ x=0, y=0 ] }
        if(!color) { color = [ r=0, g=0, b=0 ] }
        this.element = element
        this.pallete = [[0,0,0], [255,0,0]]
        this.ctx = this.element.getContext("2d")
        this.parent = element.parentNode
        
        this.res = res
        this.pos = pos 
        this.color = color
        this._isBordered = false
        this.ctx.globalCompositeOperation = "source-over"
        this.pather = new Pather(this)
        this.layerManager = new LayerManager(this)
        this.typewriter = new Typewriter(this)
        this.imageLoader = new canvasImageLoader(this)
        this.brush = new myBrush(this)
        this.setup()
    }
    // SETTERS
    set isBordered(width) {
        this._isBordered = width
        this.element.style.border = width + "px solid"
    }
    set borderType(type) {
        this._borderType=type
        this.element.style.border = this.isBordered + "px " + type
    }
    set borderColor(color) {
        this.element.style.borderColor = colorString(color)
    }
    set pos(pos) { this._pos = pos }
    set res(res) { this._res = res }
    set width(w) { this._res[0] = w }
    set height(h) { this._res[1] = h }
    set color(color) { this._color = color }
    set element(element) {
        this._element = element
        this.parent = element.parentNode
        this.ctx = element.getContext("2d")
    }
    // GETTERS
    get isBordered() {return this._isBordered}
    get pos() { return this._pos }
    get res() { return this._res }
    get width() { return this._res[0] }
    get height() { return this._res[1] }
    get color() { return this._color }
    get element() { return this._element }
    get borderType() {return this._borderType}
    get borderColor() {return this.element.style.borderColor}
    // METHODS
    // Setup
    setup = () => {
        this._element.style.position = "absolute"
        this._element.width = this.width
        this._element.height = this.height
        this._element.style.left = pos[0] + "px"
        this._element.style.top = pos[1] + "px"
        this.ctx.globalCompositeOperation = this._blend
        this.clear()
    }
    // Clear
    clear = (tempAlpha) => {
        let color = this.color
        let alpha = color[3]
        if(tempAlpha) { color[3] = tempAlpha } // set color rgb(a) value to temp alpha if one is given
        this.ctx.fillStyle = colorString(color)
        this.ctx.fillRect(0, 0, this.width, this.height)
    }
}


// Functions
function createCanvasElement() {
    let canvas = document.createElement("canvas")
    document.body.appendChild(canvas)
    return canvas
}