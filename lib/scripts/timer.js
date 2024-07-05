const SECONDS = 1000
const MS = 1
class Timer {
    constructor(rate=MS) {
        this.rate = rate
        this.value = 0
        this.offValue = 0
        this.isPaused = false
        this.logger = false
        this.interval = () => {
            this.value++
            if(this.logger) {console.log(this.value)}
        }
    }
    set rate(num) {
        this._rate = num
    }
    get rate() {return this._rate}
    //
    startInterval(intervalFunc=this.interval) {
        let interval;
        if(intervalFunc == this.interval) {interval = setInterval(this.interval, this.rate)}
        else {
            interval = setInterval(() => {
                this.interval()
                intervalFunc()
            }, this.rate)
        }
        return interval
    }
    reset() {
        this.value = 0
        this.offValue = 0
    }
    pause() {
        this.interval = () => {
            this.offValue--
            if(this.logger) {console.log(this.value)}
        }
    }
    stop() {
        if(this.interval) {
            clearInterval(this._interval)
            this.reset()
        }
    }
}