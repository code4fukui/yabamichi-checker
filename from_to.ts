import { Point } from "./point.ts";

export class FromTo {
  from: Point;
  to: Point;

  constructor(from: Point, to: Point) {
    this.from = from;
    this.to = to;
  }

  async searchRoute() {
    const key = Deno.env.get("token");
    const url =
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${key}&start=${this.from.lng},${this.from.lat}&end=${this.to.lng},${this.to.lat}`;
    const resp = await fetch(url);
    const json = await resp.json();
    const coords = json.features[0].geometry.coordinates as number[][];
    return coords.map((a) => new Point(a[1], a[0]));
  }

    // 距離計算
  distance(unit = "K") {
    const lat1 = this.from.lat;
    const lon1 = this.from.lng;
    const lat2 = this.to.lat;
    const lon2 = this.to.lng;
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
}
