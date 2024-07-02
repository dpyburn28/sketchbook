function polarToCartesian(radius, theta, origin=[0,0]) {
    let x = origin[0] + (radius * Math.cos(theta))
    let y = origin[1] + (radius * Math.sin(theta))
    cartesianCoord = { x:x, y:y }
    return cartesianCoord
}

function cartesianToPolar(x, y) {
    distance = Math.sqrt(x*x + y*y)
    radians = Math.atan2(y,x) //This takes y first
    polarCoord = { radius:distance, theta:radians }
    return polarCoord
}

function radiansToDegrees(radians) {
    return radians * (180 / Math.PI)
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180)
}