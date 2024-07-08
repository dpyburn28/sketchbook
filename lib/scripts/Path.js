//
// Notes:
//  Points are [x, y, isStroke, isFill]
//

class Path {
    constructor(pather) {
        this.pather = pather
        this.layer = this.pather.layer
        this.canvas = this.pather.canvas
        this.bounds = this.layer.bounds
        this.x = this.layer.bounds[0]
        this.y = this.layer.bounds[1]
        this.isStroke = this.layer.isStroke
        this.isFill = this.layer.isFill
        this.points = []
        this.isArc = false
        
    }
    // Setters
    set bounds(params) {
        if(params[0]) this.x = params[0]
        if(params[1]) this.y = params[1]
        if(params[2]) this.width = params[2]
        if(params[3]) this.height = params[3]
    }
    // Getters
    get bounds() {return [this.x, this.y, this.width, this.height]}
    // Methods
    setToArc(radius, start, end) {
        let size = this.width
        if(this.width > this.height) {
            size = this.height
        }
        this.isArc = true
        this.arcRadius = radius * (size/2)
        this.arcStart = start * (Math.PI*2)
        this.arcEnd = end * (Math.PI*2)
    }
    setByNormals(array) {
        this.points = []
        console.log(this.bounds)
        for(let i = 0; i < array.length; i++) {
            let pointNormals = array[i]
            let xNorm = pointNormals[0]; let yNorm = pointNormals[1];
            let x = this.x + (xNorm * this.width)
            let y = this.y + (yNorm * this.height)
            let myPoint = [x, y]
            if(pointNormals[2]) myPoint[2] = pointNormals[2]
            if(pointNormals[3]) myPoint[3] = pointNormals[3]
            if(pointNormals[4]) myPoint[4] = pointNormals[4]
            this.points.push(myPoint)
        }
    }
}