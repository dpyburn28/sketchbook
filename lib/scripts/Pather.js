class Pather {
    constructor(layer) {
        this.layer = layer
        this.canvas = this.layer.canvas
        this.ctx = this.canvas.ctx
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
        for(let i = 1; i < points.length; i++) {
            let point = points[i]
            this.ctx.lineTo(point[0], point[1])
        }
        this.ctx.stroke()
    }
    
}