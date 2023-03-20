import { searchRoute, searchDangerSpots } from "../checker.js";
import { Button, Map } from "../components.jsx";

export const handler = {
  async GET(req, ctx) {
    const { searchParams } = new URL(req.url);

    const fromLat = searchParams.get("from_lat");
    const fromLng = searchParams.get("from_lng");
    const toLat = searchParams.get("to_lat");
    const toLng = searchParams.get("to_lng");
  
    if (!fromLat || !fromLng || !toLat || !toLng) {
      throw new Error();
    }
  
    const from = { lat: fromLat, lng: fromLng };
    const to = { lat: toLat, lng: toLng };
    const line = await searchRoute(from, to);
    const dangerSpots = searchDangerSpots(line);
    return ctx.render({ line, dangerSpots });
  }
};

export default function({ data }) {
  const DangerList = ({ dangerSpots }) => (
    <ol class="list-inside list-decimal m-5">
      {dangerSpots.map((d) => <li class="mt-2" dangerouslySetInnerHTML={{__html: d.txt}}></li>)}
    </ol>
  );

  return (
    <>
      <script type="module" src="result.js"></script>
      <h1 class="text-center text-red-500 text-5xl font-bold mt-8">ここが危ない！</h1>
      <div style="text-align: right;">
        <a id="show-ranking" class="text-blue-400 cursor-pointer">危険度ランキングを見る</a>
      </div>
      <Map
        data-line={JSON.stringify(data.line)}
        data-danger-spots={JSON.stringify(data.dangerSpots)} />
      <DangerList dangerSpots={data.dangerSpots}/>
      <div class="text-center">
        <a href="/">
          <Button>最初から</Button>
        </a>
      </div>
    </>
  );
}
