class Paths {
    constructor(brush) {
        this.brush = brush
        this.canvas = this.brush.canvas
        this.ctx = this.brush.ctx
        this.connectToAnchor = false
        this.defPos = [this.canvas.width/2, this.canvas.height/2]
    }
    // Methods
    diamond(pos=this.defPos, scale=[1, 1]) {
        const width = 50 * scale[0]
        const height = 50 * scale[1]
        let x, y;
        let startPos = [x = pos[0], y = pos[1] - height]
        let points = [
            [x += width, y += height],
            [x -= width, y += height],
            [x -= width, y -= height],
            [x += width, y -= height]
        ]
        // Begin path Start
        this.ctx.beginPath()
        this.ctx.moveTo(pos[0], pos[1])
        this.ctx.lineTo(startPos[0], startPos[1])
        // Re-begin path to disconnect anchor
        if(!this.connectToAnchor) {this.ctx.beginPath()}
        // Draw path
        points.forEach(point => {
            this.ctx.lineTo(point[0], point[1])
        })
        this.ctx.closePath()
    }
    box(pos=this.defPos, scale=[1, 1]) {
        
    }
}