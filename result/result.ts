import { Page } from "../common/page.ts";
import { Point } from "../openroute/point.ts";

/** 結果ページ */
export class Result extends Page {
  override ejs() {
    return "result/result.ejs";
  }

  async main(req: Request) {
    const { searchParams } = new URL(req.url);

    const fromLat = searchParams.get("from_lat");
    const fromLng = searchParams.get("from_lng");
    const toLat = searchParams.get("to_lat");
    const toLng = searchParams.get("to_lng");
    if (!fromLat || !fromLng || !toLat || !toLng) {
      throw new Error();
    }

    const from = new Point(Number(fromLat), Number(fromLng));
    const to = new Point(Number(toLat), Number(toLng));
    const line = await from.to(to).searchRoute();

    // 危険地帯表示
    const set = new Set();
    const dangerSpots = [];
    for (const pos of line) {
      const point = new Point(pos.lat, pos.lng);
      const spots = point.searchSpot();
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
}
