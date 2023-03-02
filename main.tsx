/** @jsx h */
import { h, jsx, json, serve, serveStatic } from "./deps.ts";
import { Index } from "./index.tsx";
import { Select } from "./select.tsx";
import { Result } from "./result.tsx";
import { Point } from "./point.ts";

const result = async (req: Request) => {
  const { searchParams } = new URL(req.url)
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
  const dangerSpots: any[] = [];
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
  return jsx(<Result line={line} dangerSpots={dangerSpots} />);
}

serve({
  "/": () => jsx(<Index/>),
  "/select": () => jsx(<Select/>),
  "/result": async (req: Request) => await result(req),
  "/:filename+": serveStatic("public", { baseUrl: import.meta.url })
});
