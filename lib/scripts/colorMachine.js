
function colorString(rgba) {
    if (!rgba[3]) { rgba[3]=1; }
    let r = rgba[0]
    let g = rgba[1]
    let b = rgba[2]
    let a = rgba[3]
    return `rgba(${r}, ${g}, ${b}, ${a})`
}