import { Handlers, PageProps } from "$fresh/server.ts";
import { searchRoute, PointData, searchSpot } from "@/utils/checker.ts";
import type { Pos } from "@/utils/checker.ts";
import { Button } from "@/components/Button.tsx";

type PropData = {
  dangerSpots: PointData[];
  line: Pos[];
};

export const handler: Handlers<PropData> = {
  async GET(req, ctx) {
    const { searchParams } = new URL(req.url);

    const fromLat = searchParams.get("from_lat");
    const fromLng = searchParams.get("from_lng");
    const toLat = searchParams.get("to_lat");
    const toLng = searchParams.get("to_lng");

    if (!fromLat || !fromLng || !toLat || !toLng) {
      throw new Error();
    }

    const from = { lat: Number(fromLat), lng: Number(fromLng) };
    const to = { lat: Number(toLat), lng: Number(toLng) };
    const line = await searchRoute(from, to);

    // 危険地帯表示
    const set = new Set();
    const dangerSpots: PointData[] = [];
    for (const pos of line) {
      const point = { lat: pos.lat, lng: pos.lng };
      const spots = searchSpot(point);
      for (const spot of spots) {
        const key = JSON.stringify(spot);
        if (set.has(key)) {
          continue;
        }
        set.add(key);
        dangerSpots.push(spot);
      }
    }
    return ctx.render({ line, dangerSpots });
  }
}

export default function Result(props: PageProps<PropData>) {
  const line = props.data.line;
  const dangerSpots = props.data.dangerSpots;
  return (
    <>
      <script type="module" src="result.js"></script>
      <link rel="stylesheet" type="text/css" href="https://code4sabae.github.io/leaflet-mjs/leaflet.css" />
      <h1 class="text-center text-red-500 text-5xl font-bold mt-8">ここが危ない！</h1>
      <div style="text-align: right;">
        <a id="show-ranking" class="text-blue-400 cursor-pointer">危険度ランキングを見る</a>
      </div>
      <div
        id="map"
        class="w-full h-96"
        data-line={JSON.stringify(line)}
        data-danger-spots={JSON.stringify(dangerSpots)}
      ></div>
      <ol class="list-inside list-decimal m-5">
        {dangerSpots.map((d) => <li>{d.txt}</li>)}
      </ol>
      <div class="text-center">
        <a href="/">
          <Button>最初から</Button>
        </a>
      </div>
    </>
  );
}
