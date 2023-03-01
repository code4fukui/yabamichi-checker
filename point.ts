import { FromTo } from "./from_to.ts";

export class Point {
  constructor(
    public lat: number,
    public lng: number,
  ) {}

  to(point: Point) {
    return new FromTo(this, point);
  }
}
