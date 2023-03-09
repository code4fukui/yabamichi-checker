import { Point } from "./route.js";

// 結果ページ
export async function result(req) {
  const { searchParams } = new URL(req.url);
  const from = new Point(
    Number(searchParams.get("from_lat")),
    Number(searchParams.get("from_lng")),
  );
  const to = new Point(
    Number(searchParams.get("to_lat")),
    Number(searchParams.get("to_lng")),
  );
  const line = await from.to(to).searchRoute();

  // 危険地帯表示
  const set = new Set();
  const dangerSpots = [];
  for (const pos of line) {
    const point = new Point(pos.lat, pos.lng);
    const spots = await point.searchSpot();
    for (const spot of spots) {
      const key = JSON.stringify(spot);
      if (set.has(key)) {
        continue;
      }
      set.add(key);
      dangerSpots.push(spot);
    }
  }
  return { line, dangerSpots };
}
