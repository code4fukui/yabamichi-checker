import { FromTo } from "./from_to.js";
import { Geo3x3 } from "./deps.js";

// データ取得
const resp = await fetch("data.json");
let data = await resp.json();
data = data.map((row) => {
  const safePos = Geo3x3.decode(row.geo);
  return {
    lat: safePos.lat,
    lng: safePos.lng,
    txt: row.txt,
  };
});

export class Point {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  to(point) {
    return new FromTo(this, point);
  }

  // 危険地帯抽出
  async searchSpot() {
    return data.filter((a) => {
      const point = new Point(a.lat, a.lng);
      const fromTo = this.to(point);
      const dist = fromTo.distance();
      return dist < 0.1;
    });
  }
}
