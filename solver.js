function twoDimensionArray(m, n) {
    let arr = new Array(m); // create an empty array of length n
    for (var i = 0; i < m; i++) {
        arr[i] = new Array(n); // make each element an array
    }

    for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 40; j++) {
            arr[i][j] = false;
        }
    }

    return arr;
};

function farthest_path(state) {
    var start = state.playerPos, sr = start.y, sc = start.x,
        end = state.fruitPos, dr = end.y, dc = end.x,
        cur = state.velocity,
        obs = state.trail;

    var board = twoDimensionArray(40, 40),
        vr = [-1, 1, 0, 0],
        vc = [0, 0, 1, -1],
        pos = [];

    for (var i = 0; i < obs.length; i++) {
        board[obs[i].y][obs[i].x] = "O";
    }

    // Looking up the possible direction 
    for (var i = 0; i < 4; i++) {
        var rr = sr + vr[i];
        var cc = sc + vc[i];

        if (rr < 0 || cc < 0) continue;
        if (rr >= 40 || cc >= 40) continue;
        if (board[rr][cc] === "O") continue;
        if (dr[i] == -cur.y && dc[i] == -cur.x) continue;

        pos.push({ x: cc, y: rr });
    }

    if (pos.length === 0) return cur;
    else {
        var length = 0
        //Get farthest possible direction
        for (var i = 0; i < pos.length; i++) {
            var temp = Math.abs(pos[i].y - state.fruitPos.y) + Math.abs(pos[i].x - state.fruitPos.x);
            if (length < temp) {
                length = temp;
                result = { x: pos[i].x - sc, y: pos[i].y - sr };
            }
        }
        return result;
    }

}



export function shortest_path(state) {
    var start = state.playerPos, sr = start.y, sc = start.x,
        end = state.fruitPos, dr = end.y, dc = end.x,
        obs = state.trail;

    var board = twoDimensionArray(40, 40),
        visited = twoDimensionArray(40, 40),
        vr = [-1, 1, 0, 0],
        vc = [0, 0, 1, -1],
        rq = [], cq = [],
        reached_end = false;

    // bfs 
    rq.push(sr); cq.push(sc);
    board[sr][sc] = { cost: 0 };
    visited[sr][sc] = true;
    for (var i = 0; i < obs.length; i++) board[obs[i].y][obs[i].x] = "O";
    while (rq.length > 0) {
        var r = rq.shift();
        var c = cq.shift();

        if (r === dr && c === dc) {
            reached_end = true;
            break;
        }
        for (var i = 0; i < 4; i++) {

            var rr = r + vr[i];
            var cc = c + vc[i];

            if (rr < 0 || cc < 0) continue;
            if (rr >= 40 || cc >= 40) continue;
            if (board[rr][cc] === "O") continue;
            if (visited[rr][cc]) continue;

            rq.push(rr);
            cq.push(cc);
            board[rr][cc] = { parent: { r, c }, cost: board[r][c].cost + 1 };
            visited[rr][cc] = true;
        }
    }
    // 역추적
    if (reached_end) {
        var p = { r: dr, c: dc };
        while (!(board[p.r][p.c].parent.r === sr && board[p.r][p.c].parent.c === sc)) {
            p = board[p.r][p.c].parent;
        }
        return { x: p.c - sc, y: p.r - sr };
    }
    else return farthest_path(state);
}






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
