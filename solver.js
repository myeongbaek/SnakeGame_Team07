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


