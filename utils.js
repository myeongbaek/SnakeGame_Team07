export function GenerateFruitPosition(trail, tileCount) {
  let x, y;
  while (true) {
    x = Math.floor(Math.random() * tileCount);
    y = Math.floor(Math.random() * tileCount);

    if (trail.some((pos) => pos.x === x && pos.y === y)) continue;
    return { x, y };
  }
}

export function GenerateFruitPositionDual(trail1, trail2, fruits, tileCount) {
  let x, y;
  while (true) {
    x = Math.floor(Math.random() * tileCount.x);
    y = Math.floor(Math.random() * tileCount.y);

    if (trail1.some((pos) => pos.x === x && pos.y === y)) continue;
    if (trail2.some((pos) => pos.x === x && pos.y === y)) continue;
    if (fruits.some((pos) => pos.x === x && pos.y === y)) continue;
    return { x, y };
  }
}

export function CompareRank(r1, r2) {
  return r2.score - r1.score;
}
