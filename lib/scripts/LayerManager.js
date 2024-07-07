class LayerManager {
    constructor(canvas) {
        this.canvas = canvas
        this.layers = []
    }
    newLayer(x, y, width, height) {
        this.layers.push(new Layer(this))
        let index = this.layers.length - 1
        if(x) this.layers[index].x = x
        if(y) this.layers[index].y = y
        if(width) this.layers[index].width = width
        if(height) this.layers[index].height = height
    }
    drawLayers() {
        this.layers.forEach(layer => {
            layer.draw()
        })
    }
}