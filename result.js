import { Page } from "./page.js";
import { Point } from "./route.js";
import { escape } from "https://deno.land/x/html_escape@v1.1.5/escape.ts";

// 結果ページ
export class Result extends Page {
  async contents() {
    const { searchParams } = new URL(this.req.url);
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

    let da = "";
    for (const d of dangerSpots) {
      da += `<li>${d.txt}</li>`;
    }

    return `
      <script type="module" src="./result.js"></script>
      ここが危ない！
      <div
        id="map"
        data-line='${escape(JSON.stringify(line))}'
        data-danger-spots='${escape(JSON.stringify(dangerSpots))}'
      ></div>
      <ol style='text-align: left'>
        ${da}
      </ol>
      <a href="/"><button>最初から</button></a>
    `;
  }
}
