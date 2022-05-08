export function GenerateFruitPosition(trail, tileCount) {
  let x, y;
  while (true) {
    x = Math.floor(Math.random() * tileCount);
    y = Math.floor(Math.random() * tileCount);

    if (trail.includes({ x, y })) continue;
    return { x, y };
  }
}

export function GenerateFruitPositionDual(trail1, trail2, tileCount) {
  let x, y;
  while (true) {
    x = Math.floor(Math.random() * tileCount.x);
    y = Math.floor(Math.random() * tileCount.y);

    if (trail1.includes({ x, y })) continue;
    if (trail2.includes({ x, y })) continue;
    return { x, y };
  }
}

export function CompareRank(r1, r2) {
  return r2.score - r1.score;
}
