const Paths = [
    [
        "box",
        (scale=[1,1]) => {
            let x = 0
            let y = 0
            let w = 100 * scale[0]
            let h = 100 * scale[1]
            let points = [
                [x -= w/2, y -= h/2],
                [x += w, y],
                [x, y += h],
                [x -= w, y],
                [x, y -= h]
            ]
            return points
        }
    ],
    [
        "diamond",
        (scale=[1,1]) => {
            let x = y = 0
            let w = 100 * scale[0]
            let h = 100 * scale[1]
            let points = [
                [x, y -= (h/2)],
                [x += (w/2), y += (h/2)],
                [x -= (w/2), y += (h/2)],
                [x -= (w/2), y -= (h/2)],
                [x += (w/2), y -= (h/2)]
            ]
            return points
        }
    ],
    [
        "spiral",
        (args=[r=100, swirl=1, numPoints=100]) => {
            let r = args[0]
            let swirl = args[1]
            let numPoints = args[2]
            let points = []
            for(let i = 0; i < numPoints; i++) {
                let deg = (i * ((360*swirl)/numPoints))
                let theta = degreesToRadians(deg)
                let radius = (i * (r/numPoints))
                let point = polarToCartesian(radius, theta)
                points.push([point.x, point.y])
            }
            return points
        }
    ]
]
