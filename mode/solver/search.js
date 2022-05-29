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

export function possiblePath(sr, sc, dr, dc, obs, curr) {
    var board = twoDimensionArray(40, 40),
        vr = [-1, 1, 0, 0],
        vc = [0, 0, 1, -1],
        pos = [];

    for (var i = 0; i < obs.length; i++) {
        board[obs[i].y][obs[i].x] = "O";
    }
    for (var i = 0; i < 4; i++) {
        var rr = sr + vr[i];
        var cc = sc + vc[i];

        if (rr < 0 || cc < 0) continue;
        if (rr >= 40 || cc >= 40) continue;
        if (board[rr][cc] === "O") continue;

        pos.push({ x: vc[i], y: vr[i] });
    }

    if (pos.length !== 0) {
        for (var i = 0; i < pos.length; i++) {
            if (pos[i].x * curr.x + pos[i].y * curr.y === 0) return pos[i];
        }
        return pos[0];
    }
    else return curr;
}

export function farthestPath(sr, sc, dr, dc, obs, curr) {

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
        if (rr === dr && cc === dc) return null;
        pos.push({ x: cc, y: rr });
    }

    if (pos.length === 0) return null;
    else {
        var length = 0, temp = 0, result = curr;
        //Get farthest possible direction
        for (var i = 0; i < pos.length; i++) {
            temp = Math.abs(pos[i].y - dr) + Math.abs(pos[i].x - dc);
            if (length < temp && temp !== 1) {
                length = temp;
                result = { x: pos[i].x - sc, y: pos[i].y - sr };
            }
        }
        return result;
    }

}


export function shortestPath(sr, sc, dr, dc, obs) {

    var board = twoDimensionArray(40, 40),
        visited = twoDimensionArray(40, 40),
        vr = [-1, 1, 0, 0],
        vc = [0, 0, 1, -1],
        rq = [], cq = [], path = [],
        reached_end = false;

    // bfs 
    rq.push(sr); cq.push(sc);
    board[sr][sc] = { parent: { row: sr, col: sc }, cost: 0 };
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
        path.push(p);
        while (!(board[p.r][p.c].parent.r === sr && board[p.r][p.c].parent.c === sc)) {
            p = board[p.r][p.c].parent;
            path.push(p);
        }
        return { x: p.c - sc, y: p.r - sr };
    }
    else return null;
}


export function longestPath(sr, sc, dr, dc, obs, fr, fc, curr) {

    var board = twoDimensionArray(40, 40),
        vc = [-1, 1, 0, 0],
        vr = [0, 0, 1, -1],
        pos = [], path, r, c;



    for (var i = 0; i < obs.length; i++) board[obs[i].y][obs[i].x] = "O";

    path = shortestPath(sr, sc, dr, dc, obs);
    if (path !== null) {
        //최단 경로가 존재할 경우 4 방향에 대해 탐색한다.
        r = sr;
        c = sc;
        var rr, cc;
        for (var i = 0; i < 4; i++) {
            rr = r + vr[i];
            cc = c + vc[i];

            if (rr < 0 || cc < 0) continue;
            if (rr >= 40 || cc >= 40) continue;
            if (board[rr][cc] === "O") continue;
            if (rr === fr && cc === fc) return { x: vc[i], y: vr[i] };


            pos.push({ x: vc[i], y: vr[i], r: rr, c: cc });
        }
        var blockedNumber = 4, comparingNumber = 0, result = null;
        if (pos.length > 1) {
            for (var j = 0; j < pos.length; j++) {
                if (pos[j].x * curr.x + pos[j].y + curr.y === 0) {
                    comparingNumber = howManySurrounded(board, pos[j].r, pos[j].cc);
                    if (blockedNumber > comparingNumber) {
                        result = { x: pos[j].x, y: pos[j].y };
                        blockedNumber = comparingNumber;
                    }
                }
            }
            if (result !== null) return result;
            else return pos[0];
        }
        else {
            if (sr + path.y === dr && sr + path.x === dc) return null;
            else return path;
        }
    }
    else return null;
}

function howManySurrounded(board, r, c) {
    var vr = [-1, 1, 0, 0],
        vc = [0, 0, 1, -1],
        rr, cc, count = 0;

    for (var i = 0; i < 4; i++) {
        rr = r + vr[i];
        cc = c + vc[i];

        if (rr < 0 || cc < 0) { count++; continue; }
        if (rr >= 40 || cc >= 40) { count++; continue; }
        if (board[rr][cc] === 'O') { count++; continue; }
    }
    return count;
}

export function isThereYou(sr, sc, dr, dc) {
    var vr = [-1, 1, 0, 0],
        vc = [0, 0, 1, -1],
        rr, cc, result = null;

    for (var i = 0; i < 4; i++) {
        rr = sr + vr[i];
        cc = sc + vc[i];

        if (rr === dr && cc === dc) result = { x: vc[i], y: vr[i] };
    }
    return result;
}
