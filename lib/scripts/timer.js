const SECONDS = 1000
const MS = 1
class Timer {
    constructor(rate=MS) {
        this._rate = rate
        this.value = 0
        this.offValue = 0
        this.isPaused = false
        this.logger = false
    }
    set rate(num) {
        this._rate = num
    }
    get rate() {return this._rate}
    //
    reset() {
        this.value = 0
        this.offValue = 0
    }
    start() {
        if(this._interval) {
            clearInterval(this._interval)
        }
        this.isPaused = false
        this._interval = setInterval(() => {
            this.value++
            if(this.logger) console.log(this.value)
        }, this._rate)
    }
    pause() {
        if(this._interval) {
            clearInterval(this._interval)
        }
        this._interval = setInterval(() => {
            this.offValue--
            if(this.logger) console.log(this.value)
        }, this._rate)
    }
    stop() {
        if(this._interval) {
            clearInterval(this._interval)
            this.reset()
        }
    }
}