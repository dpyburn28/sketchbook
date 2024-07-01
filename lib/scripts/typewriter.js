class Typewriter{
    constructor(parent=document.body) {
        this._font = "arial"
        this._fontSize = 10
        this._words = []
        this._parent = parent
        this._container = document.createElement('div')
        this._parent.appendChild(this._container)
        this._container.classList = 'typewriter-container'
        this._paragraphs = []
        this._pCursor = 0
        this.width = this._parent.clientWidth
        this.height = this._parent.clientHeight
        this.textAlign = "center"
        this.textJustify = "center"
        this.textFill = "red"
        this.newParagraph()
    }
    // SETTERS
    set width(w) {
        this._width = w
    }
    set height(h) {
        this._height = h
    }
    set textAlign(align) {
        this._textAlign = align
    }
    set textJustify(justify) {
        this._textJustify = justify
    }
    set font(string) {
        this._font = string
    }
    set fontSize(size) {
        this._fontSize = size
    }
    set textFill(color) {
        this._textFill = color
    }
    set textStroke(color) {
        this._textStroke = color
    }
    // GETTERS
    get width() {return this._width}
    get height() {return this._height}
    get textAlign() {return this._textAlign}
    get font() {return this._font}
    get fontSize() {return this._fontSize}
    get textFill() {return this._textFill}
    get textStroke() {return this._textStroke}
    get textJustify() {return this._textJustify}
    //
    newParagraph() {
        this._paragraphs.push(new Paragraph(this))
    }
    textTo(pIndex, string) {
        let pElement = this._paragraphs[pIndex]
        pElement.addText(string)
    }
    typeTo(pIndex, string, rate) {
        let pElement = this._paragraphs[pIndex]
        let endTime = pElement.typeText(string, rate)
        return endTime
    }
    
}

class Paragraph {
    constructor(typewriter) {
        this.typewriter = typewriter
        this._parent = this.typewriter._container
        this._element = document.createElement('p')
        this._parent.appendChild(this._element)
        this._font = this.typewriter.font
        this._fontSize = this.typewriter.fontSize
        this._width = this.typewriter.width
        this._height = this.typewriter.height
        this._color = this.typewriter.textFill
        this._textAlign = this.typewriter.textAlign 
        this._textJustify = this.typewriter.textJustify
        this.setup()
    }
    // SETTERS
    set width(w) {
        this._width = w
        this.setup()
    }
    set height(h) {
        this._height = h
        this.setup()
    }
    set xPos(x) {
        this._xPos = x
        this.setup()
    }
    set yPos(y) {
        this._yPos = y
        this.setup()
    }
    set textAlign(string) {
        this._textAlign = string
        this.setup()
    }
    set textJustify(string) {
        this._textJustify = string
        this.setup()
    }
    set color(clr) {
        this._color = clr
        this.setup()
    }
    set font(string) {
        this._font = string
        this.setup()
    }
    set fontSize(size) {
        this._fontSize = size
        this.setup()
    }
    // GETTERS
    get width() {return this._width}
    get height() {return this._height}
    get xPos() {return this._xPos}
    get yPos() {return this._yPos}
    get textAlign() {return this._textAlign}
    get textJustify() {return this._textJustify}
    get color() {return this._color}
    get font() {return this._font}
    get fontSize() {return this._fontSize}
    // METHODS
    setup() {
        this._element.style.width = this.width
        this._element.style.height = this.height
        this._element.style.left = this.xPos
        this._element.style.top = this.yPos
        this._element.style.textAlign = this.textAlign
        this._element.style.color = this.color
        this._element.style.font = this.font
        this._element.style.fontSize = this.fontSize
        this._element.style.textJustify = this.textJustify
    }
    //
    addText(string) {
        this._element.innerHTML += string
    }
    typeText(string="hello", rate=100) {
        let pre = this._element.innerHTML
        let end = 0
        let interval = setInterval(() => {
            this._element.innerHTML = pre + string.slice(0, end)
            end++;
            if(end > string.length) {
                clearInterval(interval)
            }
        }, rate)
        let endTime = rate * (string.length+1)
        return endTime
    }

}