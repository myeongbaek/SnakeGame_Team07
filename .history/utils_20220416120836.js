export function GenerateFruitPosition(trail, tileCount) {
  let x, y;
  while (true) {
    x = Math.floor(Math.random() * tileCount);
    y = Math.floor(Math.random() * tileCount);

    let flag = true;
    for (var i = 0; i < trail.length; i++) {
      if (x == trail[i].x && y == trail[i].y) flag = false;
    }
    if (flag) break;
  }
  return { x, y };
}


export function CompareRank(r1, r2) {
  return r1.score - r2.score;
}