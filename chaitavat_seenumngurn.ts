type Portal = { location: number; destination: number };

function quickestPath({ portals }: { portals: Portal[] }): number {
  const FINAL_BLOCK = 200;
  const MAX_STEPS = 11;

  const portalMap = new Map<number, number>();
  for (const { location, destination } of portals) {
    portalMap.set(location, destination);
  }

  // BFS: [position, turns]
  const queue: [number, number][] = [[1, 0]];
  const visited = new Set<number>();
  visited.add(1);

  while (queue.length > 0) {
    const [current, turns] = queue.shift()!;

    for (let step = 1; step <= MAX_STEPS; step++) {
      let next = current + step;

      if (next > FINAL_BLOCK) {
        continue;
      }

      if (portalMap.has(next)) {
        next = portalMap.get(next)!;
      }

      if (next === FINAL_BLOCK) {
        return turns + 1;
      }

      if (!visited.has(next)) {
        visited.add(next);
        queue.push([next, turns + 1]);
      }
    }
  }

  // Unreachable
  return -1;
}

const portals: Portal[] = [
  { location: 55, destination: 38 },
  { location: 14, destination: 35 },
  { location: 91, destination: 48 },
  { location: 30, destination: 8 },
  { location: 31, destination: 70 },
  { location: 63, destination: 83 },
  { location: 3, destination: 39 },
  { location: 47, destination: 86 },
  { location: 71, destination: 93 },
  { location: 21, destination: 4 },
  { location: 44, destination: 65 },
  { location: 96, destination: 66 },
  { location: 79, destination: 42 },
  { location: 87, destination: 54 },
  { location: 90, destination: 119 },
  { location: 120, destination: 149 },
  { location: 150, destination: 179 },
  { location: 180, destination: 200 },
];

console.log(quickestPath({ portals }));
