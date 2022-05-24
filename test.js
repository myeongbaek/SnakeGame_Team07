
var trail = [{ x: 6, y: 6 }, { x: 7, y: 6 }, { x: 8, y: 6 }, { x: 9, y: 6 }, { x: 10, y: 6 },
{ x: 11, y: 6 }, { x: 11, y: 5 }, { x: 10, y: 5 }, { x: 9, y: 5 }, { x: 8, y: 5 },
{ x: 8, y: 4 }, { x: 9, y: 4 }, { x: 10, y: 4 }, { x: 11, y: 4 },
];
console.log(trail.at(1).y);


// var state1 = {
//     playerPos: {
//         x: 11,
//         y: 4,
//     },
//     score: 9,
//     gridSize: 15,
//     tileCount: 40,
//     trail: [{ x: 6, y: 6 }, { x: 7, y: 6 }, { x: 8, y: 6 }, { x: 9, y: 6 }, { x: 10, y: 6 },
//     { x: 11, y: 6 }, { x: 11, y: 5 }, { x: 10, y: 5 }, { x: 9, y: 5 }, { x: 8, y: 5 },
//     { x: 8, y: 4 }, { x: 9, y: 4 }, { x: 10, y: 4 }, { x: 11, y: 4 },
//     ],
//     tail: 14,
//     velocity: {
//         x: 1,
//         y: 0,
//     },
//     fruitPos: { x: 29, y: 9 },
// };

// console.log(ShortestPath(state1));

// var state2 = {
//     playerPos: {
//         x: 5,
//         y: 20,
//     },
//     score: 0,
//     gridSize: 15,
//     tileCount: 40,
//     trail: [],
//     tail: 5,
//     velocity: {
//         x: 0,
//         y: -1,
//     },
//     fruitPos: { x: 5, y: 5 },
// };
// console.log(ShortestPath(state1));

        // if (this.state.playerPos.x > this.state.fruitPos.x)
        //     this.state.velocity.x !== 1
        //         ? this.setState({ velocity: { x: -1, y: 0 } })
        //         : null;
        // else if (this.state.playerPos.x < this.state.fruitPos.x)
        //     this.state.velocity.x !== -1
        //         ? this.setState({ velocity: { x: 1, y: 0 } })
        //         : null;
        // else if (this.state.playerPos.y > this.state.fruitPos.y)
        //     this.state.velocity.y !== -1
        //         ? this.setState({ velocity: { x: 0, y: -1 } })
        //         : null;
        // else if (this.state.playerPos.y < this.state.fruitPos.y)
        //     this.state.velocity.y !== 1
        //         ? this.setState({ velocity: { x: 0, y: 1 } })
        //         : null;
