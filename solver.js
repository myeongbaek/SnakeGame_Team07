import { twoDimensionArray } from "./utils";

class Path {
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
        for (i = 0; i < this.tile; i++) {
            for (j = 0; j < this.tile; j++) {
                this.visited[i][j] = false;
                this.board[i][j] = 0;
            }
        }
    }
};

class Queue {
    constructor() {
        this._arr = [];
    }
    enqueue(item) {
        this._arr.push(item);
    }
    dequeue() {
        return this._arr.shift();
    }
}

export function getShortestPath(sr, sc, dr, dc) {
    const path = new Path();
    const rq = new Queue();
    const cq = new Queue();

    rq.enqueue(sr);
    cq.enqueue(sc);
    path.visited[sr][sc] = true;
    while (rq.length() > 0) {
        r = rq.dequeue();
        c = cq.dequeue();
        if (r == dr && c == dc) {
            path.reached_end = true;
            break;
        }
        for (i = 0; i < 4; i++) {
            rr = r + path.dr[i];
            cc = c + path.dc[i];

            if (rr < 0 || cc < 0) continue;
            if (rr >= path.tile || cc >= path.tile) continue;
            if (path.visited[rr][cc]) continue;
            if (rr == dr && cc == dc) continue;

            rq.enqueue(rr);
            cq.enqueue(cc);
            path.visited[rr][cc] = true;
            path.nodes_in_next_layer++;
        }
        path.nodes_left_in_layer--;
        if (path.nodes_left_in_layer == 0) {
            path.nodes_left_in_layer = nodes_in_next_layer;
            path.nodes_in_next_layer = 0;
            path.move_count++;
        }
    }
    if (path.reached_end) return path.move_count;
    return -1;
}

