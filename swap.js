export function swapSameBuilding(a, pool) {
  const building = a.unit.split("-")[0]; // e.g., "B"
  const cand = pool.find(
    (b) => b.unit.startsWith(building) && b.window === a.window && b.flex
  );
  if (!cand) return { swapped: false };
  const tmp = a.window;
  a.window = cand.window;
  cand.window = tmp;
  return { swapped: true, a, b: cand, log: `Swapped: ${a.unit} ↔ ${cand.unit} (${a.window})` };
}
