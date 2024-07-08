class Layer {
    constructor(layerManager) {
        this.layerManager = layerManager
        this.canvas = this.layerManager.canvas
        this.ctx = this.canvas.ctx
        this.pallete = this.canvas.pallete
        this.lineWeight = 10
        this.composite = "source-atop"
        this.metaStyle = {
            lineWeight: 10,
            pallete: [[0, 0, 0, 1], [0, 0, 0, .25]],
            composite: "multiply",
            isFill:false
        }
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.x = 0
        this.y = 0
        this.isDrawBounds = true
        this.isVisible = true
        this.isStroke = true
        this.isFill = true
        this.paths = []
        this.pather = new Pather(this)
    }
    // Setters
    set bounds(params) {
        if(params[0]) this.x = params[0]
        if(params[1]) this.y = params[1]
        if(params[2]) this.width = params[2]
        if(params[3]) this.height = params[3]
    }
    // Getters
    get bounds() { return [this.x, this.y, this.width, this.height] }
    // Methods
    setupMeta() {
        this.ctx.globalCompositeOperation = this.metaStyle.composite
        this.ctx.lineWidth = this.metaStyle.lineWeight
        this.ctx.fillStyle = colorString(this.metaStyle.pallete[1])
        this.ctx.strokeStyle = colorString(this.metaStyle.pallete[0])
    }
    setup() {
        this.ctx.strokeStyle = colorString(this.pallete[0])
        this.ctx.fillStyle = colorString(this.pallete[1])
        this.ctx.lineWidth = this.lineWeight
        this.ctx.globalCompositeOperation = this.composite
    }
    drawBounds() {
        this.setupMeta()
        let bounds = this.bounds
        if(this.metaStyle.isFill) this.ctx.fillRect(bounds[0], bounds[1], bounds[2], bounds[3])
        this.ctx.strokeRect(bounds[0], bounds[1], bounds[2], bounds[3])
        
    }
    drawPaths() {
        if(this.isVisible) {
            this.setup()
            this.paths.forEach(path => {
                this.pather.drawPath(path)
            })
        }
        if(this.isDrawBounds) this.drawBounds()
    }

}