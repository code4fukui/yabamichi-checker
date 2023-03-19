import { Geo3x3 } from "https://taisukef.github.io/Geo3x3/Geo3x3.ts";

export interface Pos {
  lat: number;
  lng: number;
}

export interface PointData {
  pos: Pos;
  txt: string;
}

export interface Data {
  geo: string;
  txt: string;
}

/** データ取得 */
export async function loadData() {
  const resp = await Deno.readTextFile(`${Deno.cwd()}/data/data.json`);
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

/** 距離計算 */
export function distance(from: Pos, to: Pos, unit = "K") {
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
export async function searchRoute(from: Pos, to: Pos) {
  const key = Deno.env.get("OPENROUTE_KEY");
  if (!key) {
    console.error("open route service key is not defined");
  }
  const url =
    `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${from.lng},${from.lat}&end=${to.lng},${to.lat}`;
  const resp = await fetch(url);
  const json = await resp.json();
  const coords = json.features[0].geometry.coordinates as number[][];
  return coords.map((a) => ({ lat: a[1], lng: a[0] })) as Pos[];
}

export const pointData = await loadData();

/** 危険地帯抽出 */
export function searchSpot(pos: Pos) {
  return pointData.filter((a) => {
    const point = { lat: a.pos.lat, lng: a.pos.lng};
    const dist = distance(pos, point);
    return dist < 0.1;
  });
}