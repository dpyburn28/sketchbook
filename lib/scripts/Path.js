class Path {
    constructor(pather) {
        this.pather = pather
        this.layer = this.pather.layer
        this.canvas = this.pather.canvas
        this.bounds = this.layer.bounds
        this.points = []
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
    setByNormals(array) {
        this.points = []
        for(let i = 0; i < array.length; i++) {
            let pointNormals = array[i]
            let xNorm = pointNormals[0]; let yNorm = pointNormals[1];
            let x = this.x + (xNorm * this.width)
            let y = this.y + (yNorm * this.height)
            this.points.push(x, y)
        }
    }
}