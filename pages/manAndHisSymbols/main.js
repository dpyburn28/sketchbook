


const timer = new Timer(SECONDS)
timer.logger = true


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

quill.paddingX = 10
quill.paddingY = 10
quill.type("hello",2)
