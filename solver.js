import * as search from "./search.js";

export function getDirection(state) {
    var start = state.playerPos, sr = start.y, sc = start.x,
        end = state.fruitPos, dr = end.y, dc = end.x,
        obs = state.trail, curr = state.velocity;

    var path = null, vpath = null;

    //step1 : get the shortest path to fruit
    path = search.shortestPath(sr, sc, dr, dc, obs);
    if (state.score < 3) return path;

    //step2 : get virtual snake from the step1 and get the longest path to tail
    if (path !== null)
        vpath = search.longestPath(sr + path.y, sc + path.x, obs[0].y, obs[0].x, obs.slice(1,), curr);

    //step3 : if virtual snake exist, return the direction of the path from step1
    if (vpath !== null) {
        console.log("step3");
        return path;
    }
    else {
        //step 4 : get the longest path to tail
        path = search.longestPath(sr, sc, obs[0].y, obs[0].x, obs.slice(1,), curr);

        if (path !== null) {
            console.log("step4");
            return path;
        }
        else {
            //step 5 : get the farthest direction from the fruit
            console.log("step5");
            path = search.farthestPath(sr, sc, dr, dc, obs, curr);
            return path;
        }
    }




}