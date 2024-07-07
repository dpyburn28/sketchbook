

const canvas = new myCanvas(
    res=[window.innerWidth, window.innerHeight],
    pos=[0,0],
    color=[255,255,255]
)
canvas.layerManager.newLayer()
let pather = canvas.layerManager.layers[0].pather
pather.newPath([[.5, .5], [.25, .25]])
canvas.layerManager.layers[0].path = () => {
    let layer = canvas.layerManager.layers[0]
    let w = layer.width/2; let h = layer.height/2;
    let x = layer.x + (w/2); let y = layer.y + (h/2);
    layer.ctx.beginPath()
    layer.ctx.moveTo(x, y)
    layer.ctx.lineTo(x += w, y)
    layer.ctx.lineTo(x, y+=h)
    layer.ctx.lineTo(x-=w, y)
    layer.ctx.lineTo(x, y-=h)
    layer.ctx.closePath()
    if(layer.isFill) layer.ctx.fill()
    if(layer.isStroke) layer.ctx.stroke()
}
canvas.layerManager.layers[0].isStroke = false
canvas.layerManager.drawLayers()








