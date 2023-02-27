import { FromTo } from "./from_to.js";

export class Point {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  to(point) {
    return new FromTo(this, point);
  }
}
