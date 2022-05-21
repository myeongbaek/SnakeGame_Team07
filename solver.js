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

function getPossibleDrection(state) {
    var sr = state.playerPos.y;
    var sc = state.playerPos.x;
    var dr = [-1, 1, 0, 0];
    var dc = [0, 0, 1, -1];
    var obs = state.trail;
    var cur = state.velocity;
    var pos = [];
    var result;

    var board = twoDimensionArray(40, 40);
    for (var i = 0; i < obs.length; i++) {
        board[obs[i].y][obs[i].x] = 3;
    }

    for (var i = 0; i < 4; i++) {
        var rr = sr + dr[i];
        var cc = sc + dc[i];

        if (rr < 0 || cc < 0) continue;
        if (rr >= 40 || cc >= 40) continue;
        if (board[rr][cc] === 3) continue;
        if (dr[i] == -cur.y && dc[i] == -cur.x) continue;

        pos.push({ x: cc, y: rr });
    }

    if (pos.length === 0) return cur;
    else {
        var length = 0

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

function getGreedyDirection(state) {
    var sr = state.playerPos.y;
    var sc = state.playerPos.x;
    var dr = state.fruitPos.y;
    var dc = state.fruitPos.x;
    var obs = state.trail;
    var cur = state.velocity;
    var tile = state.tileCount;

    var base = {
        board: twoDimensionArray(40, 40),
        visited: twoDimensionArray(40, 40),

        dr: [-1, 1, 0, 0],
        dc: [0, 0, 1, -1],
    }
    var board = base.board;



    var pos = [];
    var result;

    for (var i = 0; i < obs.length; i++) {
        board[obs[i].y][obs[i].x] = 3;
    }
    for (var i = 0; i < 4; i++) {
        var rr = sr + base.dr[i];
        var cc = sc + base.dc[i];

        if (rr < 0 || cc < 0) continue;
        if (rr >= tile || cc >= tile) continue;
        if (board[rr][cc] === 3) continue;
        if (base.dr[i] == -cur.y && base.dc[i] == -cur.x) continue;

        pos.push({ x: cc, y: rr });
    }

    if (pos.length === 0) return cur;
    else {
        var length = 100;
        for (var i = 0; i < pos.length; i++) {
            var temp = Math.abs(pos[i].y - dr) + Math.abs(pos[i].x - dc);
            if (length > temp) {
                length = temp;
                result = { x: pos[i].x - sc, y: pos[i].y - sr };
            }
        }
        return result;
    }

}


export function ShortestPath(state) {
    var sr = state.playerPos.y;
    var sc = state.playerPos.x;
    var dr = state.fruitPos.y;
    var dc = state.fruitPos.x;
    var obs = state.trail;

    var reached_end = false;

    var base = {
        board: twoDimensionArray(40, 40),
        visited: twoDimensionArray(40, 40),
        parent: twoDimensionArray(40, 40),
        dr: [-1, 1, 0, 0],
        dc: [0, 0, 1, -1],
    }

    var parent = base.parent;

    var rq = [];
    var cq = [];


    rq.push(sr);
    cq.push(sc);
    base.visited[sr][sc] = true;
    for (var i = 0; i < obs.length; i++) {
        base.board[obs[i].y][obs[i].x] = 3;
    }
    // bfs 
    while (rq.length > 0) {
        var r = rq.shift();
        var c = cq.shift();

        if (r === dr && c === dc) {
            reached_end = true;
            break;
        }
        for (var i = 0; i < 4; i++) {

            var rr = r + base.dr[i];
            var cc = c + base.dc[i];

            if (rr < 0 || cc < 0) continue;
            if (rr >= 40 || cc >= 40) continue;
            if (base.visited[rr][cc]) continue;
            if (base.board[rr][cc] === 3) continue;

            rq.push(rr);
            cq.push(cc);
            if (!parent[rr][cc]) parent[rr][cc] = { row: r, col: c };
            base.visited[rr][cc] = true;
        }
    }
    if (reached_end) {
        var index = { row: dr, col: dc };
        while (true) {
            if (parent[index.row][index.col].row === sr && parent[index.row][index.col].col === sc) break;
            else { index = parent[index.row][index.col]; }
        }
        var result = { x: (index.col - sc), y: (index.row - sr) };
        return result;
    }
    else return getPossibleDrection(state);
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
