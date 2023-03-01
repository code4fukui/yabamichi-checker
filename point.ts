import { FromTo } from "./from_to.ts";
import { Geo3x3 } from "https://taisukef.github.io/Geo3x3/Geo3x3.ts";

// データ取得
const resp = await Deno.readTextFile("./data.json");
let data = JSON.parse(resp);
data = data.map((row: any) => {
  const safePos = Geo3x3.decode(row.geo);
  return {
    lat: safePos.lat,
    lng: safePos.lng,
    txt: row.txt,
  };
});

export class Point {
  constructor(
    public lat: number,
    public lng: number,
  ) {}

  to(point: Point) {
    return new FromTo(this, point);
  }

  // 危険地帯抽出
  searchSpot() {
    return data.filter((a: any) => {
      const point = new Point(a.lat, a.lng);
      const fromTo = this.to(point);
      const dist = fromTo.distance();
      return dist < 0.1;
    });
  }
}
