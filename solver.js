function twoDimensionArray(m, n) {
    let arr = new Array(m); // create an empty array of length n
    for (var i = 0; i < m; i++) {
        arr[i] = new Array(n); // make each element an array
    }
    return arr;
}

class Base {
    tile = 40;
    board = twoDimensionArray(40, 40);
    visited = twoDimensionArray(40, 40);
    reached_end = false;

    move_count = 0;
    nodes_left_in_layer = 1;
    nodes_in_next_layer = 0;

    dr = [-1, 1, 0, 0];
    dc = [0, 0, 1, -1];

    constructor() {
        for (var i = 0; i < this.tile; i++) {
            for (var j = 0; j < this.tile; j++) {
                this.visited[i][j] = false;
                this.board[i][j] = 0;
            }
        }
        this.tile = 40;
        this.reached_end = false;
    }
};



function getShortestPath(sr, sc, dr, dc, obstacle) {
    const base = new Base();
    const rq = [];
    const cq = [];
    const dq = [];

    rq.push(sr);
    cq.push(sc);
    base.visited[sr][sc] = true;
    for (var i = 0; i < obstacle.length; i++) {
        base.board[obstacle[i].x][obstacle[i].y] = 3;
    }

    while (rq.length > 0) {
        r = rq.shift();
        c = cq.shift();


        if (r === dr && c === dc) {
            base.reached_end = true;
            break;
        }
        for (var i = 0; i < 4; i++) {

            rr = r + base.dr[i];
            cc = c + base.dc[i];


            if (rr < 0 || cc < 0) continue;
            if (rr >= base.tile || cc >= base.tile) continue;
            if (base.visited[rr][cc]) continue;
            if (base.board[rr][cc] === 3) continue;



            rq.push(rr);
            cq.push(cc);
            base.visited[rr][cc] = true;
            console.log(rr + ", " + cc);
            base.nodes_in_next_layer++;


        }
        base.nodes_left_in_layer--;
        if (base.nodes_left_in_layer == 0) {
            base.nodes_left_in_layer = base.nodes_in_next_layer;
            base.nodes_in_next_layer = 0;
            base.move_count++;
        }
    }
    if (base.reached_end) {
        var i = dr, j = dc;
        while (i !== sr && j !== sc) {
            var row, col;
            for (var k = 0; k < 4; k++) {

                row = i + base.dr[k];
                col = j + base.dc[k];

                if (base.visited[row][col]) {
                    dq.push[k];
                    i = row;
                    j = col;
                    break;
                }
            }

        }
        console.log(dq);
        return base.move_count;
    }
    return { x: 1, y: 0 };
}

function getGreedyDirection(sr, sc, dr, dc, obs, cur) {

    base = new Base();
    board = base.board;
    dir = [];

    for (var i = 0; i < obs.length; i++) {
        board[obs[i].x][obs[i].y] = 3;
    }
    for (var i = 0; i < 4; i++) {
        rr = sr + base.dr[i];
        cc = sc + base.dc[i];

        if (rr < 0 || cc < 0) continue;
        if (rr >= base.tile || cc >= base.tile) continue;
        if (base.board[rr][cc] === 3) continue;
        if (cur.x === base.dr[i] && cur.y === base.dc[i]) continue;

        dir.push({ x: base.dr[i], y: base.dc[i] });
    }

    if (dir.length === 0) return null;
    else return dir[0];

}


console.log(getGreedyDirection(1, 1, 2, 2, [{ x: 1, y: 2 }], { x: -1, y: 0 }));

