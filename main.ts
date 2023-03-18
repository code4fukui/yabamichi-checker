import { serve } from "https://deno.land/std@0.179.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.179.0/http/file_server.ts";
import { load } from "https://deno.land/std@0.179.0/dotenv/mod.ts";
import { renderFileToString, Params } from "https://deno.land/x/dejs@0.10.3/mod.ts";
import { Geo3x3 } from "https://taisukef.github.io/Geo3x3/Geo3x3.ts";

interface Pos {
  lat: number;
  lng: number;
}

interface PointData {
  pos: Pos;
  txt: string;
}

interface Data {
  geo: string;
  txt: string;
}

async function renderPage(tpl: string, params: Params = {}) {
  const body = await renderFileToString(`${Deno.cwd()}/${tpl}`, params);
  return new Response(body, {
    headers: { "content-type": "text/html" },
  });
}

/** 距離計算 */
function distance(from: Pos, to: Pos, unit = "K") {
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
}

// ルート検索
async function searchRoute(from: Pos, to: Pos) {
  const key = Deno.env.get("OPENROUTE_KEY");
  if (!key) {
    console.error("open route service key is not defined");
  }
  const url =
    `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${from.lng},${from.lat}&end=${to.lng},${to.lat}`;
  const resp = await fetch(url);
  const json = await resp.json();
  const coords = json.features[0].geometry.coordinates as number[][];
  return coords.map((a) => ({ lat: a[1], lng: a[0] }));
}

/** 危険地帯抽出 */
function searchSpot(pos: Pos) {
  return pointData.filter((a) => {
    const point = { lat: a.pos.lat, lng: a.pos.lng};
    const dist = distance(pos, point);
    return dist < 0.1;
  });
}

async function result(req: Request) {
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
}

/** データ取得 */
async function loadData() {
  const resp = await Deno.readTextFile(`${Deno.cwd()}/data.json`);
  return (JSON.parse(resp) as Data[])
    .flatMap((row) => {
      const safePos = Geo3x3.decode(row.geo);
      if (!safePos) {
        return [];
      }
      return {
        pos: {
          lat: safePos.lat,
          lng: safePos.lng,
        },
        txt: row.txt,
      };
    }) as PointData[];
}

async function handler(req: Request) {
  const { pathname } = new URL(req.url);
  const path = `${req.method} ${pathname}`;
  switch (path) {
    case "GET /": return await renderPage("index.ejs");
    case "GET /select": return await renderPage("select.ejs");
    case "GET /result": return await result(req);
  }
  return serveDir(req, { fsRoot: "./static/" });
}

async function loadEnv() {
  await load({ export: true });
}

loadEnv();
const pointData = await loadData();
serve(handler);
