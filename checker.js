import { Geo3x3 } from "https://taisukef.github.io/Geo3x3/Geo3x3.ts";

import data from "./data.json" assert { type: "json" };

const pointData = data.flatMap((row) => {
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
});

/** 距離計算 */
function distance(from, to, unit = "K") {
  const lat1 = from.lat;
  const lon1 = from.lng;
  const lat2 = to.lat;
  const lon2 = to.lng;
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  } else {
    const theta = lon1 - lon2;
    let dist = Math.sin(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) +
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
export async function searchRoute(from, to) {
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

/** 危険地帯抽出 */
function searchSpot(pos) {
  return pointData.filter((a) => {
    const point = { lat: a.pos.lat, lng: a.pos.lng };
    const dist = distance(pos, point);
    return dist < 0.1;
  });
}

export function searchDangerSpots(line) {
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
  return dangerSpots;
}
