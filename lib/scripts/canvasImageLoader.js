class canvasImageLoader {
    constructor(myCanvas) {
        this.parent = myCanvas
        this.canvas = myCanvas._element
        this.ctx = this.canvas.getContext("2d")
    }
    putImage(src, pos=[this.canvas.width/2, this.canvas.height/2]) {
        let image = new Image()
        image.src = src
        let width = image.width
        let height = image.height
        let x = pos[0] - width/2
        let y = pos[1] - height/2
        console.log(image)
        image.onload = () => {
            this.ctx.drawImage(image, x, y, width, height)
        }
        return image
    }
    cycle(imgArray, cycles=10, rate=1000) {
        let image = new Image()
        let index = 0
        let cycle = 0
        let pos = [this.canvas.width/2, this.canvas.height/2]
        image.src = imgArray[index]
        image.onload = () => {
            let width = image.width
            let height = image.height
            let x = pos[0] - width/2
            let y = pos[1] - height/2
            this.ctx.drawImage(image, x, y, width, height)
        }
        index++
        let interval = setInterval(() => {
            image.src = imgArray[index]
            let width = image.width
            let height = image.height
            let x = pos[0] - width/2
            let y = pos[1] - height/2
            this.parent.clear()
            this.ctx.drawImage(image, x, y, width, height)
            index++;
            if(index >= imgArray.length) {
                cycle++
            }
            if(cycle >= cycles) {
                clearInterval(interval)
            }
            index = index % imgArray.length
        }, rate)
        
        let endTime = (rate * imgArray.length) * cycles
        return endTime
    }
}