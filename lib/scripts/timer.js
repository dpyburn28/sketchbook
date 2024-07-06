const SECONDS = 1000
const MS = 1
class Timer {
    constructor(rate=MS) {
        this.counterMethod = () => {
            this.value++
            if(this.logger) {console.log(this.value)}
        }
        this.rate = rate
        this.value = 0
        this.offValue = 0
        this.isPlaying = false
        this.logger = false
    }
    set rate(num) {
        this._rate = num
        this.stop()
        this.startInterval()
    }
    get rate() {return this._rate}
    //
    startInterval(intervalFunc) {
        this.isPlaying = true
        let interval = () => {
            if(intervalFunc) {intervalFunc()}
            this.counterMethod()
        }
        this.interval = interval
        setInterval(this.interval, this.rate)
        return this.interval
    }
    reset() {
        this.value = 0
        this.offValue = 0
    }
    pause() {
        this.isPlaying = false
        this.interval = () => {
            this.offValue--
            if(this.logger) {console.log(this.value)}
        }
    }
    stop() {
        this.isPlaying = false
        if(this.interval) {
            clearInterval(this.interval)
            this.reset()
        }
    }
}