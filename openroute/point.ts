import { pointData } from "./point_data.ts";
import { FromTo } from "./from_to.ts";

/** 一点 */
export class Point {
  constructor(
    public lat: number,
    public lng: number,
  ) {}

  /** FromTo型に変換 */
  to(point: Point) {
    return new FromTo(this, point);
  }

  /** 危険地帯抽出 */
  searchSpot() {
    return pointData.filter((a) => {
      const point = new Point(a.lat, a.lng);
      const fromTo = this.to(point);
      const dist = fromTo.distance();
      return dist < 0.1;
    });
  }
}
