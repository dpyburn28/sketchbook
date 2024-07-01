const Paths = [
    [
        "diamond",
        () => {
            let x = 0
            let y = 0
            let w = 100
            let h = 100
            let points = [
                [x -= w/2, y += h/2],
                [x += w, y],
                [x, y += h],
                [x -= w, h],
                [x, y -= h]
            ]
            return points
        }
    ]
]
