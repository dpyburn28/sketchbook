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
    ]
]
