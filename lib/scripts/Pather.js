class Pather {
    constructor(layer) {
        this.layer = layer
        this.canvas = this.layer.canvas
        this.ctx = this.canvas.ctx
        this.closePaths = false
    }
    newPath(points, calcType="normals") {
        let path = new Path(this)
        switch(calcType){
            default:
                break;
            case "normals":
                path.setByNormals(points)
                break;
        }
        this.layer.paths.push(path)
        
    }
    drawPath(path) {
        let points = path.points
        this.ctx.beginPath()
        this.ctx.moveTo(points[0][0], points[0][1])
        if(path.isArc) {
            let origin = points[0]
            this.ctx.arc(origin[0], origin[1], path.arcRadius, path.arcStart, path.arcEnd)
            if(origin) this.ctx.stroke()
            if(origin) this.ctx.fill()
        } else {
            for(let i = 1; i < points.length; i++) {
                let point = points[i]
                this.ctx.lineTo(point[0], point[1])
                if(point[2]) this.ctx.stroke()
                if(point[3]) this.ctx.fill()
                if(point[4]) {
                    this.ctx.closePath()
                    if(this.closePaths) this.ctx.stroke()
                    this.ctx.beginPath()
                    point = points[i+1]
                    this.ctx.moveTo(point[0], point[1])
                }
            }
            this.ctx.closePath()
            if(this.closePaths) this.ctx.stroke()
        }
        
    }
    
}