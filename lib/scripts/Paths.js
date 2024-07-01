class Paths {
    constructor(brush) {
        this.brush = brush
        this.canvas = this.brush.canvas
        this.ctx = this.brush.ctx
        this.connectToAnchor = false
        this.defPos = [this.canvas.width/2, this.canvas.height/2]
    }
    // Methods
    diamond(scale=[1, 1]) {
        const width = 50 * scale[0]
        const height = 50 * scale[1]
        let cursor = this.brush.pos
        let x, y;
        let startPos = [x = cursor[0], y = cursor[1] - height]
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
        // draw path from points
        this.drawPoints(points)
        this.ctx.closePath()
    }
    box(scale=[1, 1]) {
        const width = 50 * scale[0]
        const height = 50 * scale[1]
        let cursor = this.brush.pos
        let x, y;
        let points = [
            [x = cursor[0] - (width/2), y = cursor[1] - (height/2)],
            [x += width, y],
            [x, y += height],
            [x -= width, y],
            [x, y -= height]
        ]
        //
        this.ctx.beginPath()
        this.ctx.moveTo(pos[0], pos[1])
        //
        this.drawPoints(points)
    }
    //
    drawPoints(points) {
        if(!this.connectToAnchor) {this.ctx.beginPath()}
        points.forEach(point => {
            this.ctx.lineTo(point[0], point[1])
            this.brush.pos = point
        })

    }
}