import { Handlers, PageProps } from "$fresh/server.ts";
import { searchRoute, PointData, searchDangerSpots } from "@/utils/checker.ts";
import type { Pos } from "@/utils/checker.ts";
import { Button } from "@/components/Button.tsx";
import { DangerList } from "@/components/DangerList.tsx";
import { Map } from "@/components/Map.tsx";

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
    const dangerSpots = searchDangerSpots(line);
    return ctx.render({ line, dangerSpots });
  }
}

export default function Result(props: PageProps<PropData>) {
  const line = props.data.line;
  const dangerSpots = props.data.dangerSpots;
  return (
    <>
      <script type="module" src="result.js"></script>
      <h1 class="text-center text-red-500 text-5xl font-bold mt-8">ここが危ない！</h1>
      <div style="text-align: right;">
        <a id="show-ranking" class="text-blue-400 cursor-pointer">危険度ランキングを見る</a>
      </div>
      <Map
        data-line={JSON.stringify(line)}
        data-danger-spots={JSON.stringify(dangerSpots)} />
      <DangerList dangerSpots={dangerSpots}/>
      <div class="text-center">
        <a href="/">
          <Button>最初から</Button>
        </a>
      </div>k
    </>
  );
}
