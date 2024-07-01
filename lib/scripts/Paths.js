class Paths {
    constructor(brush) {
        this.brush = brush
        this.canvas = this.brush.canvas
        this.ctx = this.brush.ctx
        this.connectToAnchor = false
    }
    //
    diamond(pos=[this.canvas.width/2, this.canvas.height/2], scale=1) {
        const width = 50 * scale
        const height = 100 * scale
        let x, y;
        let startPos = [x = pos[0], y = pos[1] - height]
        let points = [
            [x += width, y += height],
            [x -= width, y += height],
            [x -= width, y -= height],
            [x += width, y -= height]
        ]
        this.ctx.beginPath()
        this.ctx.moveTo(pos[0], pos[1])
        this.ctx.lineTo(startPos[0], startPos[1])
        if(!this.connectToAnchor) {this.ctx.beginPath()}
        points.forEach(point => {
            this.ctx.lineTo(point[0], point[1])
        })
        this.ctx.closePath()
    }
}