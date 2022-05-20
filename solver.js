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
}


export function getGreedyDirection(state) {
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
            if (rr >= base.tile || cc >= base.tile) continue;
            if (base.visited[rr][cc]) continue;
            if (base.board[rr][cc] === 3) continue;

            rq.push(rr);
            cq.push(cc);
            parent[rr][cc] = { r, c };
            base.visited[rr][cc] = true;
        }
    }
    if (base.reached_end) {
        var i = dr, j = dc;

        while (!(parent[i][j].r === sr && parent[i][j].c === sc)) {
            i = parent[i][j].r;
            j = parent[i][j].c;
        }
        return { x: j, y: i };
    }
    else return state.velocity;
}


