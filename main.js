import { serve } from "https://deno.land/std@0.179.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.179.0/http/file_server.ts";
import { load } from "https://deno.land/std@0.179.0/dotenv/mod.ts";
import { renderFileToString } from "https://deno.land/x/dejs@0.10.3/mod.ts";
import { Geo3x3 } from "https://taisukef.github.io/Geo3x3/Geo3x3.ts";

const renderPage = async (tpl, params) => {
  const body = await renderFileToString(`${Deno.cwd()}/${tpl}`, params);
  return new Response(body, {
    headers: { "content-type": "text/html" },
  });
};

// 距離計算
const distance = (from, to, unit = "K") => {
  const lat1 = from.lat;
  const lon1 = from.lng;
  const lat2 = to.lat;
  const lon2 = to.lng;
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  } else {
    const theta = lon1 - lon2;
    let dist =
      Math.sin(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.cos(theta * Math.PI / 180);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    const miles = dist * 60 * 1.1515;
    unit = unit.toUpperCase();

    if (unit == "K") {
      return miles * 1.609344;
    } else if (unit == "N") {
      return miles * 0.8684;
    } else {
      return miles;
    }
  }
};

// ルート検索
const searchRoute = async (from, to) => {
  const key = Deno.env.get("OPENROUTE_KEY");
  if (!key) {
    console.error("open route service key is not defined");
  }
  const url =
    `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${from.lng},${from.lat}&end=${to.lng},${to.lat}`;
  const resp = await fetch(url);
  const json = await resp.json();
  const coords = json.features[0].geometry.coordinates;
  return coords.map((a) => ({ lat: a[1], lng: a[0] }));
}

const main = async () => {
  await load({ export: true });

  // データ取得
  const resp = await Deno.readTextFile(`${Deno.cwd()}/data.json`);
  const pointData = JSON.parse(resp)
    .flatMap((row) => {
      const safePos = Geo3x3.decode(row.geo);
      if (!safePos) {
        return [];
      }
      return {
        lat: safePos.lat,
        lng: safePos.lng,
        txt: row.txt,
      };
    });

  /** 危険地帯抽出 */
  const searchSpot = (pos) => {
    return pointData.filter((a) => {
      const point = { lat: a.lat, lng: a.lng};
      const dist = distance(pos, point);
      return dist < 0.1;
    });
  }

  const router = new Map();
  router.set("GET /", async () => await renderPage("index.ejs"));
  router.set("GET /select", async () => await renderPage("select.ejs"));
  router.set("GET /result", async ({ req }) => {
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
    const dangerSpots = [];
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
    return await renderPage("result.ejs", { line, dangerSpots });
  });
  
  serve(async (req) => {
    const { pathname } = new URL(req.url);
    const path = `${req.method} ${pathname}`;
    const handle = router.get(path);
    if (handle) {
      return await handle({ req });
    }
  
    return serveDir(req, { fsRoot: "./static/" });
  });  
};

await main();