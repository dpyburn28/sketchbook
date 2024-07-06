


const timer = new Timer(MS*500)
timer.logger = false
let t = 0

const Surface = new myCanvas(
    res=[window.innerWidth,window.innerHeight],
    pos=[0,0],
    color=[0,0,0]
)

const Page = new myCanvas(
    res=[400,500],
    pos=[(window.innerWidth - res[0])/2, (window.innerHeight - res[1])/2],
    color=[255,255,255]
)

let quill = Page.typewriter

quill.marginX = 10
quill.marginY = 10
quill.paddingY = 5

quill.style.fillColor = [0,0,0]
quill.style.strokeColor = [255,255,255]
quill.style.lineWeight = .1
quill.font.size = 18

let intro = "excerpts from Carl Jung's essay"
let title = "APPROACHING THE UNCONCIOUS"
let citation = "from the collection of essays MAN AND HIS SYMBOLS"
let intrvl = timer.rate
let str = intro
let delay = intrvl/str.length
quill.type(intro, delay)
setTimeout(()=>{
    str = title
    delay = intrvl/str.length
    quill.font.size = 20
    quill.style.fillColor = [255,0,0]
    quill.style.strokeColor = [0,0,0]
    quill.type(str, delay)
}, t+=intrvl)
setTimeout(()=>{
    str = citation
    delay = intrvl/str.length
    quill.font.size = 12
    quill.style.fillColor = [0,0,0]
    quill.style.strokeColor = [0,0,0]
    quill.type(str, delay)
}, t+=intrvl)

let chapter = "Chapter Four"
let chTitle = "The analysis of dreams"
setTimeout(()=>{
    str = chapter
    delay = intrvl/str.length
    quill.font.size = 10
    quill.paddingY = 0
    quill.style.fillColor = [0,0,0]
    quill.style.strokeColor = [0,0,0]
    quill.style.lineWeight = 0
    quill.type(str, delay)
}, t+=intrvl)
setTimeout(()=>{
    str = chTitle
    delay = intrvl/str.length
    quill.font.size = 18
    quill.paddingY = 10
    quill.style.fillColor = [0,0,0]
    quill.style.strokeColor = [100,150,255]
    quill.style.lineWeight = .25
    quill.type(str, delay)
}, t+=intrvl)

let introParagraphs = [
    "I begin this essay by noting the difference between a sign and a symbol."
]
introParagraphs.forEach(paragraph => {
    setTimeout(()=>{
        str = paragraph
        delay = intrvl/str.length
        quill.font.size = 12
        quill.paddingY = 5
        quill.style.fillColor = [0,0,0]
        quill.style.strokeColor = [0,0,255]
        quill.style.lineWeight = 0
        quill.type(str, delay)
    }, t+=intrvl)
})


