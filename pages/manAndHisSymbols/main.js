


const timer = new Timer(SECONDS)
timer.logger = false
let t = 0

const Surface = new myCanvas(
    res=[window.innerWidth,window.innerHeight],
    pos=[0,0],
    color=[0,0,0]
)

const Page = new myCanvas(
    res=[500,600],
    pos=[(window.innerWidth - res[0])/2, (window.innerHeight - res[1])/2],
    color=[255,255,255]
)

let quill = Page.typewriter

quill.ctx.globalCompositeOperation = "multiply"
quill.marginX = 10
quill.marginY = 0
quill.paddingY = 10
quill.paddingX = 0

quill.style.fillColor = [0,0,0]
quill.style.strokeColor = [255,255,255]
quill.style.lineWeight = .1
quill.font.size = 18
quill.font.type = "roboto"

let intrvl = timer.rate

let head = () => {
    let intro = "excerpts from Carl Jung's essay"
    let title = "APPROACHING THE UNCONCIOUS"
    let citation = "from the collection of essays MAN AND HIS SYMBOLS"
    setTimeout(()=> {
        quill.newLine()
        quill.style.fillColor = [0,0,0]
        quill.style.strokeColor = [255,255,255]
        quill.style.lineWeight = .1
        quill.font.size = 18
        let str = intro
        let delay = intrvl/str.length
        quill.type(intro, delay)
        quill.paddingY = 0
    },t+=intrvl)
    setTimeout(()=>{
        quill.newLine()
        str = title
        delay = intrvl/str.length
        quill.font.size = 20
        quill.style.fillColor = [255,0,0]
        quill.style.strokeColor = [0,0,0]
        quill.type(str, delay)
    }, t+=intrvl)
    setTimeout(()=>{
        quill.newLine()
        str = citation
        delay = intrvl/str.length
        quill.font.size = 12
        quill.style.fillColor = [0,0,0]
        quill.style.strokeColor = [0,0,0]
        quill.paddingY = 10
        quill.type(str, delay)
    }, t+=intrvl)
}

let chapter = () => {
    let subTitle = "Chapter Four"
    let title = "The analysis of dreams"
    setTimeout(()=>{
        quill.newLine()
        str = subTitle
        delay = intrvl/str.length
        quill.font.size = 10
        quill.paddingY = 0
        quill.style.fillColor = [0,0,0]
        quill.style.strokeColor = [0,0,0]
        quill.style.lineWeight = 0
        quill.type(str, delay)
    }, t+=intrvl)
    setTimeout(()=>{
        quill.newLine()
        str = title
        delay = intrvl/str.length
        quill.font.size = 20
        quill.paddingY = 10
        quill.style.fillColor = [0,0,150]
        quill.style.strokeColor = [255,255,255]
        quill.style.lineWeight = .5
        quill.type(str, delay)
        
    }, t+=intrvl)
}

let introParagraph = () => {
    const entries = [
        "I begin this essay by noting the difference between a sign and a symbol.",
        "The sign is always less than the concept it represents,",
        "while a symbol always stands for something more than its obvious or immediate meaning.",
        "Symbols, moreover, are natural and spontanious products.",
        "No genius has ever sat down with a pen or a brush in his hand and said:",
        "'Now I am going to invent a symbol.'",
        "No one can take a more or less rational thought, reached as a logical conclusion or by deliberate intent, and then give it 'symbolic' form.",
        "No matter what fascinating trappings one may put upon an idea of this kind,",
        "it will still remain a sign, linked to the concious thought behind it,",
        "not a symbol that hints at something not yet known.",
        "In dreams, symbols occur spontaneously, for dreams happen and are not invented;",
        "they are, therefore the main source of all our knowledge about symbolism."
    ]
    entries.forEach(entry => {
        setTimeout(()=>{
            quill.newLine()
            str = entry
            delay = intrvl/str.length
            quill.font.size = 11
            quill.paddingY = 5
            quill.style.fillColor = [0,0,0]
            quill.style.strokeColor = [255,255,255]
            quill.style.lineWeight = 0
            switch(entries.indexOf(entry)){
                default:
                    break;
                case 1:
                case 2:
                case 8:
                case 11:
                    quill.style.fillColor = [0,0,150]
                    quill.style.lineWeight = .5
                    break;
            }
            quill.type(str, delay)
        }, t+=intrvl)
    })
}

main()
function main() {
    head()
    chapter()
    introParagraph()
    head()
    chapter()
    introParagraph()
}



